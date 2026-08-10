import React from "react";

export default function Spiderman() {
  return (
    <div 
      className="fixed top-0 right-[5%] md:right-[15%] z-0 pointer-events-none origin-top animate-swing drop-shadow-[4px_4px_0_#000]"
    >
      {/* Web line */}
      <div className="w-1 bg-white border-x-2 border-black h-24 sm:h-32 mx-auto" />
      
      {/* Chibi Spidey SVG */}
      <svg width="100" height="140" viewBox="0 0 100 140" className="mx-auto -mt-2">
         {/* Spider Web handle */}
         <circle cx="50" cy="10" r="5" fill="#fff" stroke="#000" strokeWidth="3" />

         <g>
           {/* Legs (upside down, reaching up to the web at y=10) */}
           {/* Left leg */}
           <path d="M 38 50 L 45 10" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" />
           <path d="M 38 50 L 45 10" fill="none" stroke="#00e5ff" strokeWidth="10" strokeLinecap="round" />
           <circle cx="45" cy="10" r="8" fill="#ff1744" stroke="#000" strokeWidth="3" /> {/* Red Boot */}
           
           {/* Right leg */}
           <path d="M 62 50 L 55 10" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" />
           <path d="M 62 50 L 55 10" fill="none" stroke="#00e5ff" strokeWidth="10" strokeLinecap="round" />
           <circle cx="55" cy="10" r="8" fill="#ff1744" stroke="#000" strokeWidth="3" /> {/* Red Boot */}
         </g>

         {/* Body */}
         <rect x="32" y="45" width="36" height="40" rx="15" fill="#00e5ff" stroke="#000" strokeWidth="4" />
         {/* Red chest/suit */}
         <rect x="38" y="45" width="24" height="30" rx="8" fill="#ff1744" stroke="#000" strokeWidth="3" />
         
         {/* Spider logo on chest */}
         <circle cx="50" cy="60" r="3" fill="#000" />
         <path d="M 45 55 L 50 60 L 55 55 M 45 65 L 50 60 L 55 65" fill="none" stroke="#000" strokeWidth="2" />

         <g>
           {/* Left Arm hanging down */}
           <path d="M 32 60 Q 15 80 25 105" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" />
           <path d="M 32 60 Q 15 80 25 105" fill="none" stroke="#00e5ff" strokeWidth="10" strokeLinecap="round" />
           <circle cx="25" cy="105" r="8" fill="#ff1744" stroke="#000" strokeWidth="3" /> {/* Glove */}
           
           {/* Right Arm hanging down */}
           <path d="M 68 60 Q 85 80 75 105" fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" />
           <path d="M 68 60 Q 85 80 75 105" fill="none" stroke="#00e5ff" strokeWidth="10" strokeLinecap="round" />
           <circle cx="75" cy="105" r="8" fill="#ff1744" stroke="#000" strokeWidth="3" /> {/* Glove */}
         </g>

         {/* Head (Upside down, eyes at the bottom) */}
         <ellipse cx="50" cy="95" rx="35" ry="30" fill="#ff1744" stroke="#000" strokeWidth="4" />
         
         {/* Web pattern on face (subtle) */}
         <path d="M 50 65 L 50 125 M 20 95 L 80 95 M 25 75 L 75 115 M 25 115 L 75 75" fill="none" stroke="#000" strokeWidth="1" opacity="0.3" />

         {/* Eyes (Big white comic eyes, angled downwards since he's upside down) */}
         {/* Left Eye */}
         <path d="M 25 105 Q 40 120 45 90 Q 30 85 25 105" fill="#fff" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
         {/* Right Eye */}
         <path d="M 75 105 Q 60 120 55 90 Q 70 85 75 105" fill="#fff" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
