"use client";

import React from "react";

export default function ZapEasterEgg() {
  return (
    <div 
      className="bg-yellow-300 border-4 border-black px-4 py-2 text-xl font-black italic shadow-[4px_4px_0_#000] cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform"
      onDoubleClick={() => window.dispatchEvent(new Event('hulk-smash'))}
      title="Double click me for a surprise!"
    >
      ZAP!
    </div>
  );
}
