"use client";

import React, { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [phase, setPhase] = useState<"text1" | "text2" | "gate" | "done">("text1");

  useEffect(() => {
    // Phase 1: "Selamat Datang" (0 - 2s)
    const t1 = setTimeout(() => setPhase("text2"), 2000);
    // Phase 2: "Welcome" (2s - 4s)
    const t2 = setTimeout(() => setPhase("gate"), 4000);
    // Phase 3: Gate opening (4s - 5.2s)
    const t3 = setTimeout(() => setPhase("done"), 5500); // 5.5s to be safe before unmounting

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden gate-wrapper">
      {/* Left Gate */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-black border-r-4 border-white gate-left z-10 overflow-hidden">
        {/* Halftone pattern inside gate for comic feel */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#fff 15%, transparent 16%), radial-gradient(#fff 15%, transparent 16%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px"
          }}
        />
        {/* Text container positioned at the exact right edge of this half */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-white text-6xl md:text-[9rem] font-bold font-comic tracking-tighter drop-shadow-[4px_4px_0_var(--accent-primary)] z-20 whitespace-nowrap">
          {phase === "text1" && <span className="animate-text-intro block">SELAMAT DATANG</span>}
          {phase === "text2" && <span className="animate-text-intro block">WELCOME!</span>}
        </div>
      </div>

      {/* Right Gate */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-black border-l-4 border-white gate-right z-10 overflow-hidden">
        {/* Halftone pattern inside gate for comic feel */}
         <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#fff 15%, transparent 16%), radial-gradient(#fff 15%, transparent 16%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px"
          }}
        />
        {/* Text container positioned at the exact left edge of this half */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-white text-6xl md:text-[9rem] font-bold font-comic tracking-tighter drop-shadow-[4px_4px_0_var(--accent-secondary)] z-20 whitespace-nowrap">
          {phase === "text1" && <span className="animate-text-intro block">SELAMAT DATANG</span>}
          {phase === "text2" && <span className="animate-text-intro block">WELCOME!</span>}
        </div>
      </div>
    </div>
  );
}
