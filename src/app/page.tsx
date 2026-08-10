import type { Metadata } from "next";
import { Printer, FileText, Zap } from "lucide-react";
import NotaFormWrapper from "@/app/components/NotaFormWrapper";
import IntroAnimation from "@/app/components/IntroAnimation";
import Spiderman from "@/app/components/Spiderman";

export const metadata: Metadata = {
  title: "Generator Nota Pembelian — Surya Elektronik Baru",
  description:
    "Aplikasi generator nota pembelian otomatis berformat PDF untuk Surya Elektronik Baru.",
};

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Spiderman />
      <main className="min-h-screen relative overflow-hidden font-comic">
        
        {/* Comic Decorative Elements */}
        <div className="absolute top-10 left-10 transform -rotate-12 select-none pointer-events-none z-0">
          <div className="bg-white border-4 border-black px-4 py-2 text-2xl font-black italic shadow-[4px_4px_0_#000]">
            BAM!
          </div>
        </div>
        <div className="absolute top-40 right-10 transform rotate-12 select-none pointer-events-none z-0">
          <div className="bg-yellow-300 border-4 border-black px-4 py-2 text-xl font-black italic shadow-[4px_4px_0_#000]">
            ZAP!
          </div>
        </div>
        
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="relative z-10 border-b-4 border-black bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* Logo icon */}
              <div className="flex items-center justify-center w-12 h-12 border-4 border-black bg-[var(--accent-primary)] shadow-[4px_4px_0_#000] transform -rotate-3">
                <FileText className="w-6 h-6 text-white" strokeWidth={3} />
              </div>

              {/* Brand text */}
              <div>
                <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-black drop-shadow-[2px_2px_0_var(--accent-secondary)]">
                  Nota Generator
                </h1>
                <p className="text-sm font-bold text-gray-700">
                  Surya Elektronik Baru
                </p>
              </div>
            </div>

            {/* Status badges */}
            <div className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border-2 border-black bg-yellow-300 shadow-[2px_2px_0_#000] uppercase">
                <Zap className="w-4 h-4" />
                Auto-Calc
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border-2 border-black bg-green-400 shadow-[2px_2px_0_#000] uppercase">
                <Printer className="w-4 h-4" />
                Ready
              </span>
            </div>
          </div>
        </header>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center mb-8">
            <h2 className="inline-block bg-white border-4 border-black px-6 py-2 text-2xl font-black uppercase transform -rotate-1 shadow-[4px_4px_0_#000] mb-4">
              Buat Nota Baru!
            </h2>
            <p className="text-black font-bold text-lg bg-white inline-block px-3 py-1 border-2 border-black shadow-[2px_2px_0_#000]">
              Isi form di bawah &rarr; kalkulasi otomatis &rarr; cetak PDF.
            </p>
          </div>

          {/* Form component (client) */}
          <NotaFormWrapper />
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="relative z-10 mt-12 py-6 text-center border-t-4 border-black bg-white">
          <p className="text-sm font-bold text-black uppercase">
            &copy; 2024 Surya Elektronik Baru &middot; Terpercaya &bull; Sejak 2024
          </p>
        </footer>
      </main>
    </>
  );
}
