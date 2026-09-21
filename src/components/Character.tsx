"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Character() {
  const group = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  
  // Touches du clavier
  const [keys, setKeys] = useState({ forward: false, backward: false });
  
  // Chargement de la photo pour le visage
  const faceTexture = useTexture('/moi.jpg');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setKeys((k) => ({ ...k, forward: true }));
      if (e.key === "ArrowDown") setKeys((k) => ({ ...k, backward: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setKeys((k) => ({ ...k, forward: false }));
      if (e.key === "ArrowDown") setKeys((k) => ({ ...k, backward: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    const speed = 5;
    const isMoving = keys.forward || keys.backward;
    
    if (isMoving) {
      // Obtenir la direction de la caméra
      const cameraDir = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDir);
      cameraDir.y = 0; // On reste sur le plan XZ
      cameraDir.normalize();
      
      const moveDir = new THREE.Vector3();
      if (keys.forward) moveDir.add(cameraDir);
      if (keys.backward) moveDir.sub(cameraDir);
      if (moveDir.length() > 0) moveDir.normalize();
      
      const oldPos = group.current.position.clone();
      const newPos = oldPos.clone().add(moveDir.multiplyScalar(speed * delta));
      
      // Limites de la rivière
      newPos.x = THREE.MathUtils.clamp(newPos.x, -3, 3);
      newPos.z = THREE.MathUtils.clamp(newPos.z, -45, 0);
      
      const deltaPos = newPos.clone().sub(oldPos);
      group.current.position.copy(newPos);
      
      // Faire suivre la caméra et l'orbit control
      if (state.controls) {
        // @ts-ignore
        state.controls.target.add(deltaPos);
      }
      state.camera.position.add(deltaPos);
      
      // Rotation du personnage
      // Le visage est sur le -Z local de l'objet, donc l'angle cible est inversé de PI
      if (moveDir.length() > 0) {
        const targetAngle = Math.atan2(moveDir.x, moveDir.z) + Math.PI;
        
        let angleDiff = targetAngle - group.current.rotation.y;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        group.current.rotation.y += angleDiff * 10 * delta;
      }
    }
    
    // Léger mouvement de flottaison sur la rivière
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.5;
    
    // Animation de marche/nage
    const time = state.clock.elapsedTime * 8;
    if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current) {
      if (isMoving) {
        leftArmRef.current.rotation.x = Math.sin(time) * 0.5;
        rightArmRef.current.rotation.x = -Math.sin(time) * 0.5;
        leftLegRef.current.rotation.x = -Math.sin(time) * 0.5;
        rightLegRef.current.rotation.x = Math.sin(time) * 0.5;
      } else {
        // Retour position initiale (doux)
        leftArmRef.current.rotation.x = THREE.MathUtils.damp(leftArmRef.current.rotation.x, 0, 4, delta);
        rightArmRef.current.rotation.x = THREE.MathUtils.damp(rightArmRef.current.rotation.x, 0, 4, delta);
        leftLegRef.current.rotation.x = THREE.MathUtils.damp(leftLegRef.current.rotation.x, 0, 4, delta);
        rightLegRef.current.rotation.x = THREE.MathUtils.damp(rightLegRef.current.rotation.x, 0, 4, delta);
      }
    }
  });

  // Matériaux
  const skinColor = "#fcd34d";
  const shirtColor = "#ef4444";
  const pantsColor = "#3b82f6";

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      {/* Tête */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Visage (Photo) */}
      <mesh position={[0, 1.6, -0.251]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial map={faceTexture} />
      </mesh>
      
      {/* Torse */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.3]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Bras Gauche */}
      <mesh ref={leftArmRef} position={[-0.4, 1.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Bras Droit */}
      <mesh ref={rightArmRef} position={[0.4, 1.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Jambe Gauche */}
      <mesh ref={leftLegRef} position={[-0.15, 0.4, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>

      {/* Jambe Droite */}
      <mesh ref={rightLegRef} position={[0.15, 0.4, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      
      {/* Point lumineux pour l'éclairer un peu */}
      <pointLight position={[0, 2, 2]} intensity={0.5} distance={5} />
    </group>
  );
}
