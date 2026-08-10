"use client";

import React, { useState, useEffect } from "react";

export default function HulkSmash() {
  const [stage, setStage] = useState<"idle" | "smashing" | "smashed" | "fixing" | "fixed">("idle");

  useEffect(() => {
    const handleTrigger = () => {
      if (stage !== "idle" && stage !== "fixed") return;
      
      // Sequence
      setStage("smashing");
      
      setTimeout(() => {
        setStage("smashed");
        document.body.classList.add('shake-active');
        
        setTimeout(() => {
          setStage("fixing");
          
          setTimeout(() => {
            setStage("fixed");
            document.body.classList.remove('shake-active');
            setTimeout(() => {
              setStage("idle");
            }, 1000);
          }, 2000);
        }, 2000); // stay smashed for 2s
      }, 500); // 0.5s for smash down
    };

    window.addEventListener("hulk-smash", handleTrigger);
    return () => window.removeEventListener("hulk-smash", handleTrigger);
  }, [stage]);

  if (stage === "idle") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smashDown {
          0% { transform: translateY(-100%) scale(2); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes swingInFix {
          0% { transform: translate(150vw, -50vh) rotate(45deg); }
          50% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-150vw, -50vh) rotate(-45deg); }
        }
        body.shake-active {
          animation: globalShake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes globalShake {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(0px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(2px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}} />

      {/* The Glass Cracks */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: stage === "smashed" || stage === "fixing" ? 1 : 0,
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 100%)',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 50 L20 10 M50 50 L80 15 M50 50 L10 40 M50 50 L90 60 M50 50 L30 90 M50 50 L70 95 M50 50 L15 70 M50 50 L85 85" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 50 L45 40 L30 20 M50 50 L60 45 L80 30 M50 50 L40 60 L20 80 M50 50 L65 65 L85 75" stroke="#ccc" strokeWidth="0.3" strokeOpacity="0.6" fill="none" />
          <circle cx="50" cy="50" r="2" fill="#fff" opacity="0.9"/>
          <circle cx="50" cy="50" r="5" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
        </svg>
      </div>

      {/* Hulk Fist */}
      {stage === "smashing" && (
        <div 
          className="absolute inset-0 flex justify-center items-center"
          style={{ animation: 'smashDown 0.5s cubic-bezier(0.8, 0, 1, 1) forwards' }}
        >
          <div className="w-64 h-64 bg-green-600 rounded-full border-8 border-black shadow-[10px_10px_0_#000] flex items-center justify-center">
             <span className="text-white font-black text-6xl uppercase tracking-widest transform -rotate-12">SMASH!</span>
          </div>
        </div>
      )}

      {/* Spiderman Fixing */}
      {stage === "fixing" && (
        <div 
          className="absolute inset-0 flex justify-center items-center"
          style={{ animation: 'swingInFix 2s ease-in-out forwards' }}
        >
          <div className="relative flex flex-col items-center">
            {/* Web string */}
            <div className="absolute bottom-full left-1/2 w-1 h-[200vh] bg-white transform -translate-x-1/2 origin-bottom rotate-12"></div>
            {/* Spidey head (chibi) */}
            <div className="w-32 h-32 bg-red-600 rounded-full border-4 border-black relative overflow-hidden shadow-[4px_4px_0_#000]">
              {/* Eyes */}
              <div className="absolute top-1/4 left-2 w-12 h-16 bg-white border-4 border-black rounded-full transform -rotate-12">
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-1/4 right-2 w-12 h-16 bg-white border-4 border-black rounded-full transform rotate-12">
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 bg-white px-4 py-2 border-4 border-black font-black text-xl whitespace-nowrap rotate-3 shadow-[4px_4px_0_#000]">
              Whoops, biar Spidey yang benerin! 🕸️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
