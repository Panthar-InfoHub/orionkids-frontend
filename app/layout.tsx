import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Inter, Space_Grotesk, Lora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://orionkids.in"
  ),
  title: "OrionKids | Stronger Thinking. Brighter Tomorrows.",
  description:
    "Playful cognitive assessment, thoughtful insights and practical next steps for kids in Classes 1–4. Where every kid is a star.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${inter.variable} ${spaceGrotesk.variable} ${lora.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans bg-white text-[#0A1D3D]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
