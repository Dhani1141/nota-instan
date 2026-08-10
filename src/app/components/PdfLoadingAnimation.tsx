"use client";
import React from "react";

export default function PdfLoadingAnimation({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm overflow-hidden font-comic">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes swingLoad {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
      `}} />
      {/* Swinging Spidey */}
      <div 
        className="relative mb-4 origin-top"
        style={{ animation: 'swingLoad 2s ease-in-out infinite' }}
      >
        <div className="w-1 h-32 bg-black absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
        <div className="w-32 h-32 bg-red-600 rounded-full border-4 border-black relative shadow-[4px_4px_0_#000]">
          {/* Eyes */}
          <div className="absolute top-1/4 left-2 w-12 h-16 bg-white border-4 border-black rounded-full transform -rotate-12">
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-black rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/4 right-2 w-12 h-16 bg-white border-4 border-black rounded-full transform rotate-12">
            <div className="absolute bottom-1 left-1 w-6 h-6 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-yellow-300 border-4 border-black px-6 py-3 shadow-[6px_6px_0_#000] transform -rotate-2 flex flex-col items-center">
        <h2 className="text-2xl font-black uppercase tracking-widest animate-pulse">
          Mengompres PDF...
        </h2>
        <p className="font-bold text-gray-800">Spidey sedang mengecilkan ukuran PDF Anda! 🕸️</p>
      </div>
    </div>
  );
}
