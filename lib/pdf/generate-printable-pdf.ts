import fs from "fs/promises";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { PrintableItem } from "@/types/printables";

export interface GeneratePdfOptions {
  printable: PrintableItem;
}

/**
 * Generates and returns the authentic single-page vector worksheet for the given printable.
 * Directly serves the original vector PDF from /public/OrionKids_Worksheets/ with robust fallback.
 */
export async function generatePrintablePdf({
  printable,
}: GeneratePdfOptions): Promise<Uint8Array> {
  const rawWorksheet =
    printable.worksheetFile || "OrionKids_01_Join_the_Stars_Orion.pdf";
  const cleanFilename = rawWorksheet.replace(/^\/?(OrionKids_Worksheets\/)?/, "");

  // Candidate paths where the authentic worksheet PDF resides
  const candidatePaths = [
    path.join(process.cwd(), "public", "OrionKids_Worksheets", cleanFilename),
    path.join(process.cwd(), "public", cleanFilename),
  ];

  for (const candidatePath of candidatePaths) {
    try {
      const buffer = await fs.readFile(candidatePath);
      const loadedDoc = await PDFDocument.load(buffer);
      const pageCount = loadedDoc.getPageCount();

      // If the PDF file contains multiple pages, extract only the 2nd page (the actual worksheet)
      if (pageCount > 1) {
        const singlePageDoc = await PDFDocument.create();
        const targetPageIndex = pageCount >= 2 ? 1 : 0;
        const [extractedPage] = await singlePageDoc.copyPages(loadedDoc, [targetPageIndex]);
        singlePageDoc.addPage(extractedPage);
        return await singlePageDoc.save();
      }

      return new Uint8Array(buffer);
    } catch {
      // Continue to next candidate path
    }
  }

  console.error(
    `[PDFGenerator] Failed to find worksheet file '${cleanFilename}', generating 1-page fallback.`
  );

  // Fallback: Generate a clean single-page branded worksheet if file is missing
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595.28; // Standard A4 width in pt
  const pageHeight = 841.89; // Standard A4 height in pt
  const margin = 36;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Golden brand stripe at top
  page.drawRectangle({
    x: 0,
    y: pageHeight - 6,
    width: pageWidth,
    height: 6,
    color: rgb(1.0, 0.78, 0.173), // Gold
  });

  // Header Title
  page.drawText("OrionKids Activity Worksheet", {
    x: margin,
    y: pageHeight - 50,
    size: 20,
    font: fontBold,
    color: rgb(0.039, 0.114, 0.239), // Navy
  });

  page.drawText(printable.title, {
    x: margin,
    y: pageHeight - 80,
    size: 13,
    font: fontBold,
    color: rgb(0.024, 0.071, 0.157),
  });

  if (printable.description) {
    page.drawText(printable.description.slice(0, 120), {
      x: margin,
      y: pageHeight - 105,
      size: 10,
      font: fontRegular,
      color: rgb(0.278, 0.333, 0.412),
    });
  }

  // Footer note
  page.drawText("© OrionKids Education  •  Authentic Classroom & Home Activity", {
    x: margin,
    y: 30,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.443, 0.502, 0.588),
  });

  return await pdfDoc.save();
}
