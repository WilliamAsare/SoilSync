import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoilSync — AI Soil Intelligence for African Farmers",
  description:
    "Snap a photo of your soil and get instant AI-powered crop recommendations, shelf-life predictions, and transport coordination. Grow the right crops, reduce waste, and maximize profits.",
  keywords: ["soil analysis", "African farming", "crop planning", "AI agriculture", "soil health"],
  openGraph: {
    title: "SoilSync — AI Soil Intelligence for African Farmers",
    description: "AI-powered soil analysis, crop planning, and logistics for African farmers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
