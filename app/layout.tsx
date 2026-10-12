import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
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
      className={`${outfit.variable} ${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
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
