import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurora · The Digital Twin Real Estate Platform",
  description:
    "A cinematic, AI-powered digital twin of an entire smart city — explore districts, towers and residences with live investment intelligence. A concept experience.",
  keywords: [
    "proptech",
    "digital twin",
    "real estate",
    "smart city",
    "luxury property",
  ],
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} dark`}>
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
