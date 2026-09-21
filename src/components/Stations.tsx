"use client";

import { Html } from "@react-three/drei";
import { cvData } from "../data/cv";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A single station along the path
function Station({ position, title, children, color = "#a855f7" }: { position: [number, number, number], title: string, children: React.ReactNode, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false); // Controls visibility of HTML

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.1 + 0.5;
    }
  });

  return (
    <group position={position}>
      {/* 3D Indicator (Cristal cliquable retiré, on utilise le bouton HTML) */}
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 1 : 0.4} 
          wireframe={hovered} 
        />
      </mesh>
      
      {/* Base platform (Rocher) */}
      <mesh position={[0, -0.4, 0]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* Bouton HTML permanent pour ouvrir */}
      {!active && (
        <Html center position={[0, 1.5, 0]} zIndexRange={[10, 0]}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActive(true);
            }} 
            className="px-4 py-2 bg-slate-800/90 text-white font-bold rounded-full border border-emerald-500/50 hover:bg-emerald-600 hover:scale-105 transition-all shadow-lg pointer-events-auto whitespace-nowrap"
          >
            Ouvrir {title}
          </button>
        </Html>
      )}

      {/* HTML Content Overlay - Only shows when active */}
      {active && (
        <Html 
          center
          zIndexRange={[1000, 100]}
        >
          <div className="w-[320px] max-h-[80vh] flex flex-col bg-slate-900/95 text-white p-6 rounded-2xl backdrop-blur-xl border-2 border-emerald-500/50 shadow-2xl pointer-events-auto">
            <div className="flex justify-between items-start mb-4 shrink-0">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                {title}
              </h2>
              <button onClick={() => setActive(false)} className="text-slate-400 hover:text-white bg-slate-800/50 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {children}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function Stations() {
  return (
    <group>
      {/* Intro Station */}
      <Station position={[0, 0, -5]} title="Profil" color="#3b82f6">
        <p className="text-sm leading-relaxed">{cvData.profile.summary}</p>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm font-semibold text-slate-300">📍 {cvData.profile.contact.location}</p>
          <p className="text-sm font-semibold text-slate-300">📧 {cvData.profile.contact.email}</p>
        </div>
      </Station>

      {/* Experience Station */}
      <Station position={[0, 0, -15]} title="Expériences" color="#10b981">
        {cvData.experiences.map(exp => (
          <div key={exp.id} className="mb-4 last:mb-0">
            <h3 className="font-bold text-lg text-emerald-400">{exp.title}</h3>
            <p className="text-sm text-slate-400">{exp.company} • {exp.period}</p>
            <ul className="list-disc list-inside mt-2 text-xs text-slate-300 space-y-1">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </Station>

      {/* Education Station */}
      <Station position={[0, 0, -25]} title="Formations" color="#f59e0b">
        {cvData.education.map(edu => (
          <div key={edu.id} className="mb-4 last:mb-0">
            <h3 className="font-bold text-amber-400">{edu.degree}</h3>
            <p className="text-sm text-slate-400">{edu.institution} • {edu.period}</p>
            {edu.description && <p className="mt-1 text-xs text-slate-300">{edu.description}</p>}
          </div>
        ))}
      </Station>

      {/* Skills Station */}
      <Station position={[0, 0, -35]} title="Compétences" color="#ec4899">
        <div className="flex flex-wrap gap-2">
          {cvData.skills.flatMap(cat => cat.items).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs border border-teal-500/30">
              {skill}
            </span>
          ))}
        </div>
      </Station>
    </group>
  );
}
