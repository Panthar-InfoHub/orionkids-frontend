import fs from "fs/promises";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { PrintableItem } from "@/types/printables";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

/**
 * Sanitizes input text to standard WinAnsi ASCII range.
 * pdf-lib standard fonts (Helvetica) throw exceptions on Unicode characters
 * such as curly quotes, em-dashes, or non-Latin glyphs.
 */
function cleanText(input: string = ""): string {
  return input
    .replace(/[‘’`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[•★✦]/g, "*")
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/[^\x20-\x7E\n]/g, " ")
    .trim();
}

/**
 * Utility to wrap text lines to fit within a given maximum point width.
 */
function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
): string[] {
  const sanitized = cleanText(text);
  const words = sanitized.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

interface GeneratePdfOptions {
  printable: PrintableItem;
}

/**
 * Generates a unified 2-page PDF:
 * - Page 1: OrionKids Branded Blog Companion, Cover Imagery, and Educator/Parent Takeaways
 * - Page 2: The authentic vector worksheet from /public/OrionKids_Worksheets/
 */
export async function generatePrintablePdf({
  printable,
}: GeneratePdfOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Load standard Helvetica fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Standard A4 dimensions (in points)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  // Resolve linked blog data
  const companionBlog = printable.blogSlug
    ? BLOG_POSTS.find((b) => b.slug === printable.blogSlug)
    : BLOG_POSTS[0];

  // =========================================================================
  // PAGE 1: BLOG COMPANION & DISCUSSION GUIDE
  // =========================================================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Page background: pristine white
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(1, 1, 1),
  });

  // Top Accent Stripe (Golden Yellow)
  page1.drawRectangle({
    x: 0,
    y: pageHeight - 8,
    width: pageWidth,
    height: 8,
    color: rgb(1, 0.78, 0.17), // #FFC72C
  });

  // Navy Brand Masthead Header Banner
  const headerHeight = 72;
  const headerY = pageHeight - 8 - headerHeight;
  page1.drawRectangle({
    x: margin,
    y: headerY,
    width: contentWidth,
    height: headerHeight,
    color: rgb(0.04, 0.11, 0.24), // #0A1D3D
  });

  // Brand Name & Star Logo
  page1.drawText("ORIONKIDS", {
    x: margin + 18,
    y: headerY + 42,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page1.drawText("LEARNING COMPANION", {
    x: margin + 18,
    y: headerY + 24,
    size: 9,
    font: fontBold,
    color: rgb(1, 0.78, 0.17), // #FFC72C
  });

  page1.drawText("Classroom-Tested Activity Guide * www.orionkids.in", {
    x: margin + 18,
    y: headerY + 12,
    size: 8,
    font: fontRegular,
    color: rgb(0.79, 0.85, 0.94),
  });

  // Page Indicator Badge in Header (Right side)
  const badgeText = "PAGE 1 OF 2 : BRIEFING";
  const badgeWidth = fontBold.widthOfTextAtSize(badgeText, 8) + 16;
  page1.drawRectangle({
    x: margin + contentWidth - badgeWidth - 16,
    y: headerY + 24,
    width: badgeWidth,
    height: 22,
    color: rgb(0.08, 0.2, 0.4),
  });

  page1.drawText(badgeText, {
    x: margin + contentWidth - badgeWidth - 8,
    y: headerY + 31,
    size: 8,
    font: fontBold,
    color: rgb(1, 0.78, 0.17),
  });

  // -------------------------------------------------------------------------
  // Category Pill & Target Grade Level
  // -------------------------------------------------------------------------
  let cursorY = headerY - 24;

  const categoryLabel = cleanText(
    companionBlog?.categoryBadge || printable.category || "COGNITIVE DEVELOPMENT"
  ).toUpperCase();
  const gradeLabel = cleanText(printable.ageRange || printable.gradeLevel || "ALL GRADES").toUpperCase();

  const catPillWidth = fontBold.widthOfTextAtSize(categoryLabel, 8) + 14;
  page1.drawRectangle({
    x: margin,
    y: cursorY - 14,
    width: catPillWidth,
    height: 18,
    color: rgb(0.88, 0.95, 1.0), // Soft Blue
  });

  page1.drawText(categoryLabel, {
    x: margin + 7,
    y: cursorY - 9,
    size: 8,
    font: fontBold,
    color: rgb(0.01, 0.52, 0.78), // #0284C7
  });

  const gradePillWidth = fontBold.widthOfTextAtSize(gradeLabel, 8) + 14;
  page1.drawRectangle({
    x: margin + catPillWidth + 8,
    y: cursorY - 14,
    width: gradePillWidth,
    height: 18,
    color: rgb(0.85, 0.97, 0.92), // Soft Emerald
  });

  page1.drawText(gradeLabel, {
    x: margin + catPillWidth + 15,
    y: cursorY - 9,
    size: 8,
    font: fontBold,
    color: rgb(0.02, 0.59, 0.41), // #059669
  });

  // -------------------------------------------------------------------------
  // Document Title (Clean Wrapped Typography)
  // -------------------------------------------------------------------------
  cursorY -= 32;

  const displayTitle = companionBlog?.title || printable.title;
  const titleLines = wrapText(displayTitle, fontBold, 15, contentWidth);
  for (const line of titleLines) {
    page1.drawText(line, {
      x: margin,
      y: cursorY,
      size: 15,
      font: fontBold,
      color: rgb(0.04, 0.11, 0.24),
    });
    cursorY -= 19;
  }

  // Author & Reading Meta
  cursorY -= 2;
  const authorMeta = companionBlog?.author?.name
    ? `Curated by ${cleanText(companionBlog.author.name)} * ${cleanText(companionBlog.readTime || "5 min read")} companion`
    : `OrionKids Cognitive Development Research * Printable Companion`;

  page1.drawText(authorMeta, {
    x: margin,
    y: cursorY,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.4, 0.45, 0.55),
  });

  cursorY -= 16;

  // -------------------------------------------------------------------------
  // Blog Cover Image Embed (Crisp Photographic Reference)
  // -------------------------------------------------------------------------
  const coverRelative =
    printable.coverImage ||
    companionBlog?.imageUrl ||
    "/images/blog/blog 1.jpeg";

  let imageEmbedSuccess = false;
  const imageHeight = 175;
  const imageWidth = contentWidth;

  try {
    const publicPath = path.join(
      process.cwd(),
      "public",
      coverRelative.replace(/^\//, "")
    );
    const imageBytes = await fs.readFile(publicPath);

    let embeddedImage;
    if (coverRelative.endsWith(".png")) {
      embeddedImage = await pdfDoc.embedPng(imageBytes);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imageBytes);
    }

    // Draw image card background frame
    page1.drawRectangle({
      x: margin,
      y: cursorY - imageHeight,
      width: imageWidth,
      height: imageHeight,
      color: rgb(0.95, 0.97, 1.0),
    });

    page1.drawImage(embeddedImage, {
      x: margin,
      y: cursorY - imageHeight,
      width: imageWidth,
      height: imageHeight,
    });

    // Dark subtle border around image
    page1.drawRectangle({
      x: margin,
      y: cursorY - imageHeight,
      width: imageWidth,
      height: imageHeight,
      borderWidth: 1,
      borderColor: rgb(0.85, 0.89, 0.95),
      color: rgb(0, 0, 0),
      opacity: 0,
    });

    imageEmbedSuccess = true;
  } catch (err) {
    console.warn("[PDFGenerator] Image embed fallback:", err);
  }

  if (imageEmbedSuccess) {
    cursorY -= imageHeight + 16;
  } else {
    cursorY -= 12;
  }

  // -------------------------------------------------------------------------
  // Activity Overview / Excerpt Section
  // -------------------------------------------------------------------------
  const excerptText =
    companionBlog?.excerpt ||
    printable.description ||
    "This activity helps children practice cognitive flexibility, spatial reasoning, and creative problem-solving.";

  const excerptLines = wrapText(excerptText, fontRegular, 9.5, contentWidth);
  for (const line of excerptLines.slice(0, 3)) {
    page1.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.2, 0.25, 0.35),
    });
    cursorY -= 13;
  }

  cursorY -= 10;

  // -------------------------------------------------------------------------
  // Key Cognitive Discoveries / Parent Discussion Sparks (Card Box)
  // -------------------------------------------------------------------------
  const boxHeight = 135;
  page1.drawRectangle({
    x: margin,
    y: cursorY - boxHeight,
    width: contentWidth,
    height: boxHeight,
    color: rgb(0.97, 0.98, 1.0), // Ice Blue Tint
    borderColor: rgb(0.04, 0.11, 0.24),
    borderWidth: 1.5,
  });

  // Box Top Header
  page1.drawRectangle({
    x: margin,
    y: cursorY - 24,
    width: contentWidth,
    height: 24,
    color: rgb(0.04, 0.11, 0.24),
  });

  page1.drawText("COGNITIVE INSIGHTS & DISCUSSION SPARKS FOR PARENTS", {
    x: margin + 14,
    y: cursorY - 17,
    size: 8.5,
    font: fontBold,
    color: rgb(1, 0.78, 0.17),
  });

  let boxContentY = cursorY - 42;
  const discoveries =
    printable.discussionGuide ||
    companionBlog?.keyDiscoveries || [
      "Ask: What was the most challenging part of this worksheet and how did you solve it?",
      "Encourage the process rather than correctness: mistakes build neurological connections.",
      "Promotes sustained focus, pattern recognition, and self-directed inquiry.",
    ];

  for (let i = 0; i < Math.min(discoveries.length, 3); i++) {
    const rawDisc = cleanText(discoveries[i]);
    const bulletLines = wrapText(rawDisc, fontRegular, 8.5, contentWidth - 36);

    page1.drawText(`[${i + 1}]`, {
      x: margin + 14,
      y: boxContentY,
      size: 8.5,
      font: fontBold,
      color: rgb(0.02, 0.59, 0.41),
    });

    for (let j = 0; j < bulletLines.length; j++) {
      page1.drawText(bulletLines[j], {
        x: margin + 32,
        y: boxContentY - j * 11,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.15, 0.2, 0.3),
      });
    }

    boxContentY -= Math.max(bulletLines.length * 11 + 6, 22);
  }

  // -------------------------------------------------------------------------
  // Page 1 Footer Navigation Banner
  // -------------------------------------------------------------------------
  const footerY = 24;
  page1.drawRectangle({
    x: margin,
    y: footerY,
    width: contentWidth,
    height: 32,
    color: rgb(1, 0.78, 0.17), // Yellow banner
  });

  page1.drawText(
    "TURN TO PAGE 2 FOR THE PRINTABLE ACTIVITY WORKSHEET ->",
    {
      x: margin + 16,
      y: footerY + 11,
      size: 9,
      font: fontBold,
      color: rgb(0.04, 0.11, 0.24),
    }
  );

  page1.drawText("(c) OrionKids Education Inc. * All Rights Reserved", {
    x: margin + contentWidth - 190,
    y: footerY + 11,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.04, 0.11, 0.24),
  });

  // =========================================================================
  // PAGE 2: AUTHENTIC VECTOR WORKSHEET FROM PUBLIC DIRECTORY
  // =========================================================================
  const worksheetFilename =
    printable.worksheetFile || "OrionKids_01_Join_the_Stars_Orion.pdf";

  try {
    const worksheetPath = path.join(
      process.cwd(),
      "public",
      "OrionKids_Worksheets",
      worksheetFilename
    );
    const worksheetBuffer = await fs.readFile(worksheetPath);
    const worksheetDoc = await PDFDocument.load(worksheetBuffer);

    // Copy page 0 of the authentic worksheet
    const copiedPages = await pdfDoc.copyPages(worksheetDoc, [0]);
    pdfDoc.addPage(copiedPages[0]);
  } catch (err) {
    console.error(`[PDFGenerator] Failed to load worksheet ${worksheetFilename}:`, err);

    // Fallback Page 2 if file load fails
    const fallbackPage = pdfDoc.addPage([pageWidth, pageHeight]);
    fallbackPage.drawText("OrionKids Activity Worksheet", {
      x: margin,
      y: pageHeight - 50,
      size: 16,
      font: fontBold,
      color: rgb(0.04, 0.11, 0.24),
    });
    fallbackPage.drawText(
      `Worksheet: ${cleanText(printable.title)}`,
      {
        x: margin,
        y: pageHeight - 80,
        size: 12,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      }
    );
  }

  // Compile and return the final 2-page PDF
  const finalPdfBytes = await pdfDoc.save();
  return finalPdfBytes;
}
