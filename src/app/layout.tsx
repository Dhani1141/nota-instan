import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Generator Nota Pembelian — Surya Elektronik Baru",
  description:
    "Aplikasi generator nota pembelian otomatis berformat PDF untuk Surya Elektronik Baru. Buat nota profesional dalam hitungan detik.",
  keywords: ["nota pembelian", "invoice generator", "nota elektronik", "pdf nota"],
  authors: [{ name: "Surya Elektronik Baru" }],
  openGraph: {
    title: "Generator Nota Pembelian",
    description: "Buat nota pembelian profesional secara otomatis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${comicNeue.variable} font-comic antialiased`}>
        {children}
      </body>
    </html>
  );
}
