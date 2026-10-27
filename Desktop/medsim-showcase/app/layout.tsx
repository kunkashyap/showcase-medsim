import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedSim Organ Gallery",
  description:
    "Sunlight-readable gallery of 3D anatomical models with an immersive virtual dome viewer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${atkinson.variable} font-body bg-page text-ink antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:min-h-touch focus:bg-accent focus:px-4 focus:py-3 focus:text-[22px] focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
