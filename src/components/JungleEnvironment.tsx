"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Tronc */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 3, 7]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      {/* Feuillage */}
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[1.5, 3, 7]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[1.2, 2.5, 7]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function JungleEnvironment() {
  const riverRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (riverRef.current) {
      riverRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Rivière principale */}
      <mesh ref={riverRef} position={[0, -0.2, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 80, 10, 50]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Terrain global (un grand disque pour le sol à 360°) */}
      <mesh position={[0, -0.6, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color="#4d7c0f" roughness={1} />
      </mesh>

      {/* Arbres lointains pour créer une forêt à 360° */}
      {Array.from({ length: 150 }).map((_, i) => {
        // Répartition en anneau lointain
        const angle = Math.random() * Math.PI * 2;
        const radius = 25 + Math.random() * 30; // Entre 25 et 55 unités de distance
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 20; // Centré sur le milieu de la rivière
        const scale = 1 + Math.random() * 1.5;
        
        // Eviter de mettre des arbres lointains directement sur la rivière devant ou derrière
        if (Math.abs(x) < 4 && z > -60 && z < 10) return null;
        
        return <Tree key={`bg-${i}`} position={[x, -0.6, z]} scale={scale} />;
      })}

      {/* Arbres de proximité le long de la rivière */}
      {Array.from({ length: 40 }).map((_, i) => {
        const z = 5 - (Math.random() * 60);
        const x = Math.random() > 0.5 ? 4 + Math.random() * 4 : -4 - Math.random() * 4;
        const scale = 0.8 + Math.random() * 0.6;
        return <Tree key={`near-${i}`} position={[x, -0.5, z]} scale={scale} />;
      })}
    </group>
  );
}
