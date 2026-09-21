import { Scene } from "@/components/Scene";
import { TutorialOverlay } from "@/components/TutorialOverlay";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-slate-900 relative">
      <TutorialOverlay />
      <Scene />
    </main>
  );
}
