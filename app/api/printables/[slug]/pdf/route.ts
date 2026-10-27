import { NextRequest, NextResponse } from "next/server";
import { getPrintableBySlug } from "@/lib/api/printables";
import { generatePrintablePdf } from "@/lib/pdf/generate-printable-pdf";


interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Printable slug is required" },
        { status: 400 }
      );
    }

    const printable = await getPrintableBySlug(slug);

    if (!printable) {
      return NextResponse.json(
        { error: `Printable with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    // Generate the combined 2-Page PDF (Page 1: Blog Companion, Page 2: Authentic Worksheet)
    const pdfBuffer = await generatePrintablePdf({ printable });

    const safeFilename = `OrionKids-${printable.slug}-Worksheet.pdf`;
    const isPreview =
      request.nextUrl.searchParams.get("preview") === "true" ||
      request.nextUrl.searchParams.get("inline") === "true";

    const dispositionType = isPreview ? "inline" : "attachment";
    const isDev = process.env.NODE_ENV === "development";
    const cacheHeader = isPreview || isDev
      ? "no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0"
      : "public, max-age=3600, stale-while-revalidate=1800";

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${dispositionType}; filename="${safeFilename}"`,
        "Cache-Control": cacheHeader,
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("[PrintablePDFRoute] Failed to generate PDF:", error);
    return NextResponse.json(
      {
        error: "Failed to generate printable PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
