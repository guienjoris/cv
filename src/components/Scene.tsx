"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Sky, OrbitControls } from "@react-three/drei";
import { Character } from "./Character";
import { Stations } from "./Stations";
import { JungleEnvironment } from "./JungleEnvironment";

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 4, 6], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow color="#fffae6" />
      {/* Ciel tropical */}
      <Sky sunPosition={[100, 10, 100]} turbidity={0.5} rayleigh={1.5} />
      
      <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={2} maxDistance={20} />
      
      <Character />
      <Stations />
      
      <JungleEnvironment />
      
      <Environment preset="forest" />
    </Canvas>
  );
}
