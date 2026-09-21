"use client";
import { useEffect, useState } from "react";

export function TutorialOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleClose = () => {
      setVisible(false);
    };
    
    window.addEventListener("keydown", handleClose, { once: true });
    
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-1000">
      <div className="relative text-center text-white bg-slate-800/90 p-8 rounded-3xl border border-emerald-500/50 shadow-2xl">
        <button 
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-700/50 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
        
        <h1 className="text-4xl font-bold mb-4 text-emerald-400">Bienvenue dans la Jungle !</h1>
        <p className="text-xl mb-6">Explorez mon parcours interactif.</p>
        
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 animate-pulse">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <span className="text-lg">Utilisez les flèches Haut/Bas pour avancer</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 animate-pulse">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <span className="text-lg">Cliquez et glissez pour tourner la caméra</span>
          </div>
        </div>
      </div>
    </div>
  );
}
