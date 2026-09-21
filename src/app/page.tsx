import { Scene } from "@/components/Scene";
import { TutorialOverlay } from "@/components/TutorialOverlay";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-slate-900 relative">
      <TutorialOverlay />
      <Scene />
      
      {/* Bouton de téléchargement du CV */}
      <a 
        href="/cv.pdf" 
        download 
        className="absolute bottom-6 right-6 z-50 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full shadow-lg shadow-emerald-500/20 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Télécharger mon CV
      </a>
    </main>
  );
}
