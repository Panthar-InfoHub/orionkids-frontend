import fs from "fs/promises";
import path from "path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  clip,
  endPath,
  rectangle,
  PDFFont,
  PDFImage,
  PDFPage,
} from "pdf-lib";
import { PrintableItem } from "@/types/printables";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

// =============================================================================
// ORIONKIDS BRAND DESIGN TOKENS & TYPOGRAPHY SYSTEM
// =============================================================================

const COLORS = {
  // Brand Primaries
  navy: rgb(0.039, 0.114, 0.239), // #0A1D3D Primary Navy
  navyDeep: rgb(0.024, 0.071, 0.157), // Deeper navy for headers
  gold: rgb(1.0, 0.78, 0.173), // #FFC72C Golden Yellow
  goldMuted: rgb(0.9, 0.7, 0.15), // Muted gold for accents
  white: rgb(1, 1, 1), // #FFFFFF

  // Tints & Soft Fills
  softBlue: rgb(0.878, 0.949, 0.996), // #E0F2FE Category pill
  blueText: rgb(0.008, 0.518, 0.78), // #0284C7
  softMint: rgb(0.851, 0.984, 0.937), // #D9FBEF Grade pill
  mintText: rgb(0.02, 0.588, 0.412), // #059669
  softPurple: rgb(0.933, 0.914, 0.996), // #EDE9FE Subcategory pill
  purpleText: rgb(0.486, 0.227, 0.929), // #7C3AED

  // Editorial Neutrals & Borders
  cardBg: rgb(0.973, 0.98, 0.988), // #F8FAFC Soft editorial fill
  cardBorder: rgb(0.886, 0.91, 0.941), // #E2E8F0 Subtle border
  cardBorderDark: rgb(0.79, 0.83, 0.89), // Slightly darker card border
  textDark: rgb(0.118, 0.161, 0.231), // #1E293B Dark Slate Body
  textMuted: rgb(0.278, 0.333, 0.412), // #475569 Muted Slate
  textLight: rgb(0.443, 0.502, 0.588), // #718096 Secondary Muted
  divider: rgb(0.902, 0.922, 0.949), // #E5E7EB Hairline divider
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// =============================================================================
// TEXT SANITIZATION & MEASUREMENT HELPERS
// =============================================================================

/**
 * Sanitizes input text to WinAnsi ASCII range safe for pdf-lib standard fonts.
 * Normalizes unicode quotes, em-dashes, ellipsis, bullets, and accents so text
 * never crashes Helvetica font encoding.
 */
export function cleanText(input: string = ""): string {
  if (!input) return "";
  return input
    .normalize("NFKD")
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
    .replace(/[\u2012\u2013\u2014\u2015\u2212]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u2022\u2023\u25E6\u2043\u2219\u00B7]/g, "*")
    .replace(/[\u2605\u2606\u2726\u2727\u2B50]/g, "*")
    .replace(/[\u2192\u2794\u279C\u21D2]/g, "->")
    .replace(/[\u2190\u21D0]/g, "<-")
    .replace(/[\u2713\u2714]/g, "[v]")
    .replace(/[\u2715\u2716\u00D7]/g, "x")
    .replace(/\u00A9/g, "(c)")
    .replace(/\u00AE/g, "(R)")
    .replace(/\u2122/g, "(TM)")
    .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ")
    .replace(/[^\x20-\x7E\n]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Wraps text into lines fitting within maxWidth points using font metrics.
 */
export function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const sanitized = cleanText(text);
  if (!sanitized) return [];

  const words = sanitized.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Measures wrapped text lines and calculates total height based on line height.
 */
export function measureWrappedText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
  lineHeight: number = fontSize * 1.35
): { lines: string[]; totalHeight: number; lineHeight: number } {
  const lines = wrapText(text, font, fontSize, maxWidth);
  const totalHeight = lines.length > 0 ? lines.length * lineHeight : 0;
  return { lines, totalHeight, lineHeight };
}

/**
 * Draws wrapped text lines downwards starting at startY.
 * Returns the final Y position after rendering all lines.
 */
export function drawWrappedText(
  page: PDFPage,
  lines: string[],
  x: number,
  startY: number,
  font: PDFFont,
  fontSize: number,
  lineHeight: number,
  color = COLORS.textDark
): number {
  let currentY = startY;
  for (const line of lines) {
    page.drawText(line, {
      x,
      y: currentY,
      size: fontSize,
      font,
      color,
    });
    currentY -= lineHeight;
  }
  return currentY;
}

// =============================================================================
// IMAGE RESOLUTION & PLACEMENT ENGINE
// =============================================================================

export interface LoadedImageMeta {
  embeddedImage: PDFImage;
  naturalWidth: number;
  naturalHeight: number;
  aspectRatio: number; // width / height
}

/**
 * Safely resolves and embeds a local image from the public directory.
 * Supports PNG and JPEG. Returns null if missing or invalid.
 */
async function loadAndEmbedImage(
  pdfDoc: PDFDocument,
  imageRelativePath?: string
): Promise<LoadedImageMeta | null> {
  if (!imageRelativePath) return null;

  try {
    const cleanRelative = decodeURIComponent(
      imageRelativePath.replace(/^\//, "").trim()
    );
    const publicPath = path.join(process.cwd(), "public", cleanRelative);
    const imageBytes = await fs.readFile(publicPath);

    const isPng = cleanRelative.toLowerCase().endsWith(".png");
    const embeddedImage = isPng
      ? await pdfDoc.embedPng(imageBytes)
      : await pdfDoc.embedJpg(imageBytes);

    const naturalWidth = embeddedImage.width;
    const naturalHeight = embeddedImage.height;
    const aspectRatio = naturalWidth / Math.max(naturalHeight, 1);

    return {
      embeddedImage,
      naturalWidth,
      naturalHeight,
      aspectRatio,
    };
  } catch (err) {
    console.warn(`[PDFGenerator] Image embed skipped (${imageRelativePath}):`, err);
    return null;
  }
}

export type ImageLayoutMode =
  | "two-column-left" // Layout A: Small/Square/Portrait image on left, text on right
  | "two-column-right" // Layout C: Text on left, image on right
  | "landscape-banner" // Layout B: Wide landscape banner across width
  | "text-only"; // Layout D: No valid image, full-width editorial text

/**
 * Decides the optimal layout mode based on image aspect ratio and content balance.
 * Uses two-column layout for all standard photography (16:9, 3:2, 4:3, square, and portrait)
 * so that faces, teachers, children, and classroom materials are 100% visible with zero cropping.
 * Only genuine ultra-panoramic illustrations (>= 2.2:1) use the landscape banner.
 */
export function determineLayoutMode(
  imageMeta: LoadedImageMeta | null,
  alignmentPreference?: "left" | "right" | "auto"
): ImageLayoutMode {
  if (!imageMeta) {
    return "text-only";
  }

  // Only genuinely ultra-wide panoramic illustrations (>= 2.2:1) use landscape banner
  if (imageMeta.aspectRatio >= 2.2) {
    return "landscape-banner";
  }

  // All standard educational photos (16:9, 3:2, 4:3, square, portrait) look vastly better
  // in two-column because the entire image is displayed with zero cropping alongside its text.
  if (alignmentPreference === "right") {
    return "two-column-right";
  }

  return "two-column-left";
}

// =============================================================================
// MAIN GENERATOR OPTIONS & ENTRY POINT
// =============================================================================

export interface GeneratePdfOptions {
  printable: PrintableItem;
  imageAlignment?: "left" | "right" | "auto";
}

/**
 * Generates a unified 2-page print-ready educational document:
 * - Page 1: Content-Aware Companion Guide with intelligent image-and-text layout,
 *           dynamic vertical budgeting, and OrionKids premium visual identity.
 * - Page 2: Preserved authentic vector worksheet from /public/OrionKids_Worksheets/.
 */
export async function generatePrintablePdf({
  printable,
  imageAlignment = "auto",
}: GeneratePdfOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Load standard Helvetica font family
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Standard A4 dimensions (in points)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36; // 0.5 inch margins
  const contentWidth = pageWidth - margin * 2; // 523.28 pt

  // Resolve linked blog data with robust fallback
  const companionBlog =
    (printable.blogSlug
      ? BLOG_POSTS.find((b) => b.slug === printable.blogSlug)
      : undefined) ??
    (printable.blogSlug
      ? BLOG_POSTS.find((b) => b.slug.startsWith(printable.blogSlug!.slice(0, 20)))
      : undefined) ??
    BLOG_POSTS[0];

  // Resolve candidate image path
  const candidateImagePath =
    printable.coverImage ||
    printable.cardImage ||
    printable.image ||
    (printable.blogSlug ? companionBlog?.imageUrl : undefined);

  const imageMeta = await loadAndEmbedImage(pdfDoc, candidateImagePath);

  // Determine layout mode
  const effectiveAlignment =
    imageAlignment === "auto"
      ? (printable.slug && printable.slug.charCodeAt(printable.slug.length - 1) % 2 === 1 ? "right" : "left")
      : imageAlignment;

  const layoutMode = determineLayoutMode(imageMeta, effectiveAlignment);

  // ===========================================================================
  // PAGE 1: COMPANION BRIEFING & DISCUSSION GUIDE
  // ===========================================================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Page background: clean crisp white
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: COLORS.white,
  });

  // Top Golden Accent Stripe (Full page bleed)
  const topStripeHeight = 6;
  page1.drawRectangle({
    x: 0,
    y: pageHeight - topStripeHeight,
    width: pageWidth,
    height: topStripeHeight,
    color: COLORS.gold,
  });

  // ---------------------------------------------------------------------------
  // 1. Compact Navy Masthead Header Banner
  // ---------------------------------------------------------------------------
  const headerHeight = 54;
  const headerY = pageHeight - topStripeHeight - headerHeight;

  page1.drawRectangle({
    x: margin,
    y: headerY,
    width: contentWidth,
    height: headerHeight,
    color: COLORS.navy,
  });

  // Masthead Brand Name & Star Emblem
  page1.drawText("ORIONKIDS", {
    x: margin + 16,
    y: headerY + 31,
    size: 18,
    font: fontBold,
    color: COLORS.white,
  });

  page1.drawText("LEARNING COMPANION", {
    x: margin + 16,
    y: headerY + 18,
    size: 8,
    font: fontBold,
    color: COLORS.gold,
  });

  page1.drawText("Classroom-Tested Activity Guide * www.orionkids.in", {
    x: margin + 16,
    y: headerY + 8,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.75, 0.83, 0.93),
  });

  // Masthead Right: Page Indicator Badge
  const badgeText = "PAGE 1 OF 2 : BRIEFING";
  const badgeWidth = fontBold.widthOfTextAtSize(badgeText, 7.5) + 14;
  const badgeHeight = 20;
  const badgeX = margin + contentWidth - badgeWidth - 14;
  const badgeY = headerY + (headerHeight - badgeHeight) / 2;

  page1.drawRectangle({
    x: badgeX,
    y: badgeY,
    width: badgeWidth,
    height: badgeHeight,
    color: rgb(0.08, 0.18, 0.36),
    borderColor: rgb(0.16, 0.28, 0.5),
    borderWidth: 0.75,
  });

  page1.drawText(badgeText, {
    x: badgeX + 7,
    y: badgeY + 6,
    size: 7.5,
    font: fontBold,
    color: COLORS.gold,
  });

  // ---------------------------------------------------------------------------
  // 2. Metadata Badges (Category, Grade Range, Subcategory)
  // ---------------------------------------------------------------------------
  // Space below header banner
  const pillHeight = 17;
  const pillY = headerY - 12 - pillHeight;
  let pillX = margin;

  const categoryLabel = cleanText(
    printable.category || companionBlog?.categoryBadge || "COGNITIVE DEVELOPMENT"
  ).toUpperCase();
  const gradeLabel = cleanText(
    printable.ageRange || printable.gradeLevel || "ALL GRADES"
  ).toUpperCase();
  const subcategoryLabel = printable.subcategory
    ? cleanText(printable.subcategory).toUpperCase()
    : null;

  // Category Pill (Soft Blue)
  const catPillWidth = fontBold.widthOfTextAtSize(categoryLabel, 7.5) + 14;
  page1.drawRectangle({
    x: pillX,
    y: pillY,
    width: catPillWidth,
    height: pillHeight,
    color: COLORS.softBlue,
  });
  page1.drawText(categoryLabel, {
    x: pillX + 7,
    y: pillY + 5,
    size: 7.5,
    font: fontBold,
    color: COLORS.blueText,
  });
  pillX += catPillWidth + SPACING.sm;

  // Grade Level Pill (Soft Mint)
  const gradePillWidth = fontBold.widthOfTextAtSize(gradeLabel, 7.5) + 14;
  page1.drawRectangle({
    x: pillX,
    y: pillY,
    width: gradePillWidth,
    height: pillHeight,
    color: COLORS.softMint,
  });
  page1.drawText(gradeLabel, {
    x: pillX + 7,
    y: pillY + 5,
    size: 7.5,
    font: fontBold,
    color: COLORS.mintText,
  });
  pillX += gradePillWidth + SPACING.sm;

  // Subcategory Pill (Soft Purple, if available)
  if (subcategoryLabel) {
    const subPillWidth = fontBold.widthOfTextAtSize(subcategoryLabel, 7.5) + 14;
    if (pillX + subPillWidth <= margin + contentWidth) {
      page1.drawRectangle({
        x: pillX,
        y: pillY,
        width: subPillWidth,
        height: pillHeight,
        color: COLORS.softPurple,
      });
      page1.drawText(subcategoryLabel, {
        x: pillX + 7,
        y: pillY + 5,
        size: 7.5,
        font: fontBold,
        color: COLORS.purpleText,
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Document Title & Curator Metadata
  // ---------------------------------------------------------------------------
  // Clear vertical gap between pill bottoms and title ascenders:
  // Title font size 15 has an ascender height of ~12pt.
  // pillY is the bottom of the pill rectangle.
  // Setting titleBaselineY = pillY - 14 (gap) - 12 (ascender) = pillY - 26 ensures zero overlap!
  const titleFontSize = 15;
  const titleLineHeight = 19;
  const titleStartY = pillY - 26;

  const displayTitle = printable.title || companionBlog?.title || "Educational Activity";
  const titleLines = wrapText(displayTitle, fontBold, titleFontSize, contentWidth);

  let cursorY = drawWrappedText(
    page1,
    titleLines,
    margin,
    titleStartY,
    fontBold,
    titleFontSize,
    titleLineHeight,
    COLORS.navy
  );

  // Space between title and curator meta
  cursorY -= 4;

  const authorName = companionBlog?.author?.name ? cleanText(companionBlog.author.name) : null;
  const authorMeta = authorName
    ? `Curated by ${authorName} * Companion: "${cleanText(companionBlog!.title)}" * ${cleanText(companionBlog!.readTime || "5 min read")}`
    : `OrionKids Cognitive Development Research * Printable Companion Guide`;

  const metaLines = wrapText(authorMeta, fontOblique, 8, contentWidth);
  cursorY = drawWrappedText(
    page1,
    metaLines.slice(0, 1),
    margin,
    cursorY,
    fontOblique,
    8,
    11,
    COLORS.textMuted
  );

  // Clear breathing room before the content/image section
  cursorY -= 16;

  // ---------------------------------------------------------------------------
  // 4. Content Section: Intelligent Image & Text Composition (Layouts A, B, C, D)
  // ---------------------------------------------------------------------------
  const overviewText =
    printable.description ||
    companionBlog?.excerpt ||
    "This activity helps children practice cognitive flexibility, divergent thinking, and creative problem-solving through structured playful exploration.";

  // Safe bottom threshold reserving room for footer and spacing
  const footerReservedHeight = 28;
  const footerMarginBottom = 22;
  const safeContentMinY = footerMarginBottom + footerReservedHeight + SPACING.md; // ~62 pt

  if (layoutMode === "two-column-left" || layoutMode === "two-column-right") {
    // =========================================================================
    // LAYOUT A / C: COMPACT TWO-COLUMN LAYOUT (Proportional Fit, Zero Cropping)
    // =========================================================================
    const imgColWidth = 195;
    const colGap = 18;
    const textColWidth = contentWidth - imgColWidth - colGap; // 310.28 pt

    const isLeft = layoutMode === "two-column-left";
    const imgX = isLeft ? margin : margin + textColWidth + colGap;
    const textX = isLeft ? margin + imgColWidth + colGap : margin;

    // Calculate natural image dimensions with full PROPORTIONAL FIT (CONTAIN)
    // Avoids cutting off faces, heads, or important details!
    const naturalAspect = imageMeta!.aspectRatio;
    const imgPad = 5;
    const maxImgHeight = 165;

    let imgW = imgColWidth - imgPad * 2;
    let imgH = imgW / naturalAspect;

    if (imgH > maxImgHeight) {
      imgH = maxImgHeight;
      imgW = imgH * naturalAspect;
    }

    const cardActualWidth = imgW + imgPad * 2;
    const cardActualHeight = imgH + imgPad * 2;
    const cardX = imgX + (imgColWidth - cardActualWidth) / 2;
    const cardY = cursorY - cardActualHeight;

    // Image Card Framing with soft clean backdrop
    page1.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardActualWidth,
      height: cardActualHeight,
      color: COLORS.cardBg,
      borderColor: COLORS.cardBorder,
      borderWidth: 1,
    });

    // Center image cleanly inside container with zero cropping
    const drawImgX = cardX + imgPad;
    const drawImgY = cardY + imgPad;

    page1.drawImage(imageMeta!.embeddedImage, {
      x: drawImgX,
      y: drawImgY,
      width: imgW,
      height: imgH,
    });

    // Subtle crisp border around image
    page1.drawRectangle({
      x: drawImgX,
      y: drawImgY,
      width: imgW,
      height: imgH,
      borderColor: COLORS.cardBorderDark,
      borderWidth: 0.5,
    });

    // Right/Left Text Column: Activity Overview & Structured Highlights
    let textY = cursorY - 4;

    // Section Header Pill / Label
    page1.drawText("ACTIVITY OVERVIEW", {
      x: textX,
      y: textY,
      size: 9,
      font: fontBold,
      color: COLORS.navy,
    });

    // Mini Gold Accent Bar beside header
    page1.drawRectangle({
      x: textX,
      y: textY - 4,
      width: 32,
      height: 2,
      color: COLORS.gold,
    });

    textY -= 17;

    // Activity Overview Description Text
    const descFontSize = 9;
    const descLineHeight = 13;
    const descLines = wrapText(overviewText, fontRegular, descFontSize, textColWidth);
    const renderedLines = descLines.slice(0, 4); // Clean 3-4 lines
    textY = drawWrappedText(
      page1,
      renderedLines,
      textX,
      textY,
      fontRegular,
      descFontSize,
      descLineHeight,
      COLORS.textDark
    );

    textY -= 10;

    // Tags & Cognitive Skill Highlights
    const tags = printable.tags?.slice(0, 3) || [
      "Creature Design",
      "Creative Writing",
      "Divergent Thinking",
    ];

    if (tags.length > 0) {
      page1.drawText("KEY SKILL FOCUS:", {
        x: textX,
        y: textY,
        size: 7.5,
        font: fontBold,
        color: COLORS.textMuted,
      });

      textY -= 14;

      let tagX = textX;
      for (const tag of tags) {
        const cleanTag = cleanText(tag);
        const tagTextWidth = fontBold.widthOfTextAtSize(cleanTag, 7.5);
        const tagPillWidth = tagTextWidth + 10;

        if (tagX + tagPillWidth > textX + textColWidth) break;

        page1.drawRectangle({
          x: tagX,
          y: textY - 2,
          width: tagPillWidth,
          height: 14,
          color: COLORS.softBlue,
        });

        page1.drawText(cleanTag, {
          x: tagX + 5,
          y: textY + 2,
          size: 7.5,
          font: fontBold,
          color: COLORS.blueText,
        });

        tagX += tagPillWidth + 6;
      }
      textY -= 13;
    }

    // Companion Insight or Secondary Context Note
    if (companionBlog?.excerpt && companionBlog.excerpt !== printable.description) {
      const insightHeader = "EDUCATIONAL CONTEXT:";
      page1.drawText(insightHeader, {
        x: textX,
        y: textY,
        size: 7.5,
        font: fontBold,
        color: COLORS.textMuted,
      });
      textY -= 12;

      const insightLines = wrapText(cleanText(companionBlog.excerpt), fontRegular, 8, textColWidth);
      textY = drawWrappedText(
        page1,
        insightLines.slice(0, 2),
        textX,
        textY,
        fontRegular,
        8,
        11,
        COLORS.textMuted
      );
      textY -= 8;
    }

    // Classroom Implementation Note at bottom of column
    page1.drawText("Target: Home & Classroom * Low-Ink Design * 15-20 Min", {
      x: textX,
      y: textY,
      size: 7.5,
      font: fontOblique,
      color: COLORS.textLight,
    });

    // Safely advance cursorY past whichever column is taller
    const bottomOfSection = Math.min(cardY, textY - 8);
    cursorY = bottomOfSection - SPACING.md;
  } else if (layoutMode === "landscape-banner") {
    // =========================================================================
    // LAYOUT B: LANDSCAPE HERO BANNER (Wide Panoramic Image >= 1.7:1)
    // =========================================================================
    const naturalAspect = imageMeta!.aspectRatio;
    const maxBannerHeight = 150;
    const bannerHeight = Math.min(contentWidth / naturalAspect, maxBannerHeight);
    const bannerY = cursorY - bannerHeight;

    // Framing container with subtle editorial border
    page1.drawRectangle({
      x: margin,
      y: bannerY,
      width: contentWidth,
      height: bannerHeight,
      color: COLORS.cardBg,
      borderColor: COLORS.cardBorder,
      borderWidth: 1,
    });

    // Proportional fit with contain - never crop faces or details!
    let drawW = contentWidth;
    let drawH = contentWidth / naturalAspect;

    if (drawH > bannerHeight) {
      drawH = bannerHeight;
      drawW = bannerHeight * naturalAspect;
    }

    const drawX = margin + (contentWidth - drawW) / 2;
    const drawY = bannerY + (bannerHeight - drawH) / 2;

    page1.drawImage(imageMeta!.embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });

    page1.drawRectangle({
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
      borderColor: COLORS.cardBorderDark,
      borderWidth: 0.5,
    });

    cursorY = bannerY - SPACING.lg;

    // Overview Heading & Text Underneath Landscape Image
    page1.drawText("ACTIVITY OVERVIEW", {
      x: margin,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: COLORS.navy,
    });

    // Gold accent under header
    page1.drawRectangle({
      x: margin,
      y: cursorY - 3,
      width: 32,
      height: 2,
      color: COLORS.gold,
    });

    cursorY -= 15;

    const descFontSize = 9;
    const descLineHeight = 13;
    const descLines = wrapText(overviewText, fontRegular, descFontSize, contentWidth);
    cursorY = drawWrappedText(
      page1,
      descLines.slice(0, 3),
      margin,
      cursorY,
      fontRegular,
      descFontSize,
      descLineHeight,
      COLORS.textDark
    );

    cursorY -= 14;

    // Quick tags for landscape layout
    const tags = printable.tags?.slice(0, 4) || [];
    if (tags.length > 0) {
      let tagX = margin;
      for (const tag of tags) {
        const cleanTag = cleanText(tag);
        const tagTextWidth = fontBold.widthOfTextAtSize(cleanTag, 7.5);
        const tagPillWidth = tagTextWidth + 10;

        if (tagX + tagPillWidth > margin + contentWidth) break;

        page1.drawRectangle({
          x: tagX,
          y: cursorY - 2,
          width: tagPillWidth,
          height: 14,
          color: COLORS.softBlue,
        });

        page1.drawText(cleanTag, {
          x: tagX + 5,
          y: cursorY + 2,
          size: 7.5,
          font: fontBold,
          color: COLORS.blueText,
        });

        tagX += tagPillWidth + 6;
      }
      cursorY -= 20;
    } else {
      cursorY -= SPACING.md;
    }
  } else {
    // =========================================================================
    // LAYOUT D: TEXT-ONLY EDITORIAL LAYOUT (No Image / Missing Image)
    // =========================================================================
    // Uses full content width cleanly with zero empty frames or awkward gaps
    page1.drawText("ACTIVITY OVERVIEW & EDUCATIONAL CONTEXT", {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: fontBold,
      color: COLORS.navy,
    });

    page1.drawRectangle({
      x: margin,
      y: cursorY - 4,
      width: 42,
      height: 2,
      color: COLORS.gold,
    });

    cursorY -= 16;

    const descFontSize = 9.5;
    const descLineHeight = 13.5;
    const descLines = wrapText(overviewText, fontRegular, descFontSize, contentWidth);
    cursorY = drawWrappedText(
      page1,
      descLines.slice(0, 5),
      margin,
      cursorY,
      fontRegular,
      descFontSize,
      descLineHeight,
      COLORS.textDark
    );

    cursorY -= SPACING.sm;

    // Key Competency Cards (3-column layout)
    const colWidth = (contentWidth - 16) / 3;
    const cardHeight = 44;
    const cardY = cursorY - cardHeight;

    const highlightPillars = [
      { title: "CORE FOCUS", desc: categoryLabel },
      { title: "GRADE LEVEL", desc: gradeLabel },
      { title: "APPROACH", desc: "Hands-on Discovery" },
    ];

    for (let i = 0; i < highlightPillars.length; i++) {
      const colX = margin + i * (colWidth + 8);
      page1.drawRectangle({
        x: colX,
        y: cardY,
        width: colWidth,
        height: cardHeight,
        color: COLORS.cardBg,
        borderColor: COLORS.cardBorder,
        borderWidth: 1,
      });

      page1.drawText(highlightPillars[i].title, {
        x: colX + 8,
        y: cardY + 28,
        size: 7.5,
        font: fontBold,
        color: COLORS.navy,
      });

      page1.drawText(highlightPillars[i].desc, {
        x: colX + 8,
        y: cardY + 12,
        size: 8,
        font: fontRegular,
        color: COLORS.textDark,
      });
    }

    cursorY = cardY - SPACING.md;
  }

  // ---------------------------------------------------------------------------
  // 5. Parent & Educator Discussion Prompts (Dynamic Measured Height Card)
  // ---------------------------------------------------------------------------
  const rawDiscoveries =
    printable.discussionGuide ||
    companionBlog?.keyDiscoveries || [
      "Ask: What was the most challenging part of this worksheet and how did you solve it?",
      "Encourage the process rather than correctness: mistakes build neurological connections.",
      "Promotes sustained focus, pattern recognition, and self-directed inquiry.",
    ];

  const discoveries = rawDiscoveries.slice(0, 3);

  // Pre-measure each discussion prompt dynamically
  const promptItemLines: string[][] = [];
  const promptTextWidth = contentWidth - 42;
  for (const disc of discoveries) {
    const lines = wrapText(cleanText(disc), fontRegular, 8.5, promptTextWidth);
    promptItemLines.push(lines);
  }

  const discHeaderHeight = 24;
  const promptTopPadding = 12; // Distance from header to first prompt
  const promptItemSpacing = 7; // Distance between successive prompts
  const promptBottomPadding = 10; // Clean padding at bottom of card
  const promptLineHeight = 11.5;

  let totalPromptContentHeight = 0;
  for (let i = 0; i < promptItemLines.length; i++) {
    const lines = promptItemLines[i];
    totalPromptContentHeight += lines.length * promptLineHeight;
    if (i < promptItemLines.length - 1) {
      totalPromptContentHeight += promptItemSpacing;
    }
  }

  const calculatedBoxHeight =
    discHeaderHeight + promptTopPadding + totalPromptContentHeight + promptBottomPadding;

  // Space Budgeting: Verify card fits comfortably above footer safe clearance
  let finalBoxHeight = calculatedBoxHeight;
  const availableVerticalSpace = cursorY - safeContentMinY;

  if (availableVerticalSpace < finalBoxHeight) {
    // If tight on space, adaptively clamp
    finalBoxHeight = Math.max(availableVerticalSpace - 4, 75);
  }

  const boxY = cursorY - finalBoxHeight;

  // Discussion Card Container
  page1.drawRectangle({
    x: margin,
    y: boxY,
    width: contentWidth,
    height: finalBoxHeight,
    color: COLORS.cardBg,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
  });

  // Discussion Card Header Strip
  page1.drawRectangle({
    x: margin,
    y: cursorY - discHeaderHeight,
    width: contentWidth,
    height: discHeaderHeight,
    color: COLORS.navy,
  });

  page1.drawText("PARENT & EDUCATOR DISCUSSION GUIDE  *  COGNITIVE SPARKS", {
    x: margin + 12,
    y: cursorY - discHeaderHeight + 7.5,
    size: 8,
    font: fontBold,
    color: COLORS.gold,
  });

  const discBadge = "REFLECT & CONNECT";
  const discBadgeWidth = fontBold.widthOfTextAtSize(discBadge, 7) + 10;
  page1.drawRectangle({
    x: margin + contentWidth - discBadgeWidth - 10,
    y: cursorY - discHeaderHeight + 4.5,
    width: discBadgeWidth,
    height: 15,
    color: rgb(0.08, 0.18, 0.36),
  });
  page1.drawText(discBadge, {
    x: margin + contentWidth - discBadgeWidth - 5,
    y: cursorY - discHeaderHeight + 8,
    size: 7,
    font: fontBold,
    color: COLORS.white,
  });

  // Render Prompt Items inside Card
  let promptY = cursorY - discHeaderHeight - promptTopPadding;

  for (let i = 0; i < promptItemLines.length; i++) {
    const lines = promptItemLines[i];
    const marker = `0${i + 1}`;

    // Ensure prompt doesn't draw below the card bottom
    if (promptY - lines.length * promptLineHeight < boxY + 2) break;

    // Number marker badge
    page1.drawText(marker, {
      x: margin + 12,
      y: promptY,
      size: 8,
      font: fontBold,
      color: COLORS.mintText,
    });

    // Content lines
    let lineY = promptY;
    for (const line of lines) {
      page1.drawText(line, {
        x: margin + 30,
        y: lineY,
        size: 8.5,
        font: fontRegular,
        color: COLORS.textDark,
      });
      lineY -= promptLineHeight;
    }

    promptY = lineY - promptItemSpacing;
  }

  // ---------------------------------------------------------------------------
  // 6. Clean Page 1 Footer Navigation Banner (Guaranteed Safe Clearance)
  // ---------------------------------------------------------------------------
  const footerY = footerMarginBottom;
  const footerHeight = footerReservedHeight;

  // Golden Yellow Banner
  page1.drawRectangle({
    x: margin,
    y: footerY,
    width: contentWidth,
    height: footerHeight,
    color: COLORS.gold,
  });

  page1.drawText("PAGE 2 : PRINTABLE ACTIVITY WORKSHEET ->", {
    x: margin + 14,
    y: footerY + 10.5,
    size: 8.5,
    font: fontBold,
    color: COLORS.navy,
  });

  page1.drawText("(c) OrionKids Education  *  Classroom & Home Edition", {
    x: margin + contentWidth - 215,
    y: footerY + 10.5,
    size: 7.5,
    font: fontRegular,
    color: COLORS.navy,
  });

  // ===========================================================================
  // PAGE 2: AUTHENTIC VECTOR WORKSHEET (Zero-Loss Original Preservation)
  // ===========================================================================
  const rawWorksheet =
    printable.worksheetFile || "OrionKids_01_Join_the_Stars_Orion.pdf";
  const cleanFilename = rawWorksheet.replace(/^\/?(OrionKids_Worksheets\/)?/, "");

  try {
    const worksheetPath = path.join(
      process.cwd(),
      "public",
      "OrionKids_Worksheets",
      cleanFilename
    );
    const worksheetBuffer = await fs.readFile(worksheetPath);
    const worksheetDoc = await PDFDocument.load(worksheetBuffer);

    // Copy page 0 of the authentic worksheet faithfully
    const copiedPages = await pdfDoc.copyPages(worksheetDoc, [0]);
    pdfDoc.addPage(copiedPages[0]);
  } catch (err) {
    console.error(
      `[PDFGenerator] Failed to load worksheet '${cleanFilename}':`,
      err
    );

    // Graceful fallback for Page 2
    const fallbackPage = pdfDoc.addPage([pageWidth, pageHeight]);
    fallbackPage.drawRectangle({
      x: 0,
      y: pageHeight - 6,
      width: pageWidth,
      height: 6,
      color: COLORS.gold,
    });
    fallbackPage.drawText("OrionKids Activity Worksheet", {
      x: margin,
      y: pageHeight - 50,
      size: 16,
      font: fontBold,
      color: COLORS.navy,
    });
    fallbackPage.drawText(`Worksheet: ${cleanText(printable.title)}`, {
      x: margin,
      y: pageHeight - 80,
      size: 12,
      font: fontRegular,
      color: COLORS.textMuted,
    });
  }

  // Compile and return the final 2-page print-ready PDF
  const finalPdfBytes = await pdfDoc.save();
  return finalPdfBytes;
}
