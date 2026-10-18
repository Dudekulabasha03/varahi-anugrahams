"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeVillaModelProps {
  activeFloor: "Ground Floor" | "First Floor" | "Terrace Level";
  onSelectRoom: (roomId: string) => void;
}

export const ThreeVillaModel: React.FC<ThreeVillaModelProps> = ({ activeFloor, onSelectRoom }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061f14);
    scene.fog = new THREE.FogExp2(0x061f14, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 10, 14);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Warm architectural illumination)
    const ambientLight = new THREE.AmbientLight(0xfff6dd, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xd5ae43, 1.8);
    sunLight.position.set(10, 15, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Ground point light (cove glow)
    const warmGlow = new THREE.PointLight(0xd5ae43, 1.2, 20);
    warmGlow.position.set(0, 2, 0);
    scene.add(warmGlow);

    // 5. Materials
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a3322,
      roughness: 0.9,
    });

    const concreteStoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9b1a5,
      roughness: 0.4,
      metalness: 0.1,
    });

    const woodFinMaterial = new THREE.MeshStandardMaterial({
      color: 0x8c5e32,
      roughness: 0.6,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.8,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });

    const lawnMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f7850,
      roughness: 0.9,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5ae43,
      metalness: 0.8,
      roughness: 0.2,
    });

    // 6. Villa Hierarchy Groups
    const villaGroup = new THREE.Group();
    scene.add(villaGroup);

    // Site base ground
    const baseGeo = new THREE.CylinderGeometry(8, 8, 0.4, 32);
    const baseMesh = new THREE.Mesh(baseGeo, groundMaterial);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    villaGroup.add(baseMesh);

    // 30 FT Avenue Road indicator
    const roadGeo = new THREE.PlaneGeometry(5, 14);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x222624, roughness: 0.8 });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(5.5, -0.01, 0);
    villaGroup.add(roadMesh);

    // Level 1: Ground Floor
    const gfGroup = new THREE.Group();
    const gfMain = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.2, 7), concreteStoneMaterial);
    gfMain.position.set(0, 1.1, 0);
    gfMain.castShadow = true;
    gfMain.receiveShadow = true;
    gfGroup.add(gfMain);

    // Arched car porch cut-out representation
    const porchGeo = new THREE.BoxGeometry(2.4, 1.8, 3.2);
    const porchMesh = new THREE.Mesh(porchGeo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
    porchMesh.position.set(1.4, 0.9, 2.2);
    gfGroup.add(porchMesh);

    // Circular Porthole Window
    const portholeGeo = new THREE.TorusGeometry(0.35, 0.05, 16, 32);
    const portholeMesh = new THREE.Mesh(portholeGeo, goldTrimMaterial);
    portholeMesh.position.set(-0.8, 1.2, 3.52);
    gfGroup.add(portholeMesh);

    villaGroup.add(gfGroup);

    // Level 2: First Floor (with curved architectural balcony & timber fins)
    const ffGroup = new THREE.Group();
    const ffMain = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.0, 6.6), concreteStoneMaterial);
    ffMain.position.set(0, 3.2, 0);
    ffMain.castShadow = true;
    ffGroup.add(ffMain);

    // Curved front balcony cylinder
    const balconyGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.2, 32, 1, false, 0, Math.PI);
    const balconyMesh = new THREE.Mesh(balconyGeo, concreteStoneMaterial);
    balconyMesh.rotation.y = Math.PI / 2;
    balconyMesh.position.set(-1.2, 3.0, 3.2);
    ffGroup.add(balconyMesh);

    // Vertical Timber Fins on the curved bay
    for (let i = 0; i < 9; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.8, 0.15), woodFinMaterial);
      const angle = (i / 8) * Math.PI;
      fin.position.set(
        -1.2 + Math.cos(angle) * 1.5,
        3.2,
        3.2 + Math.sin(angle) * 1.5
      );
      ffGroup.add(fin);
    }

    // Glass sliding panels
    const glassPanel = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), glassMaterial);
    glassPanel.position.set(1.2, 3.2, 3.32);
    ffGroup.add(glassPanel);

    villaGroup.add(ffGroup);

    // Level 3: Rooftop Terrace (23 x 30 ft Garden & Pergola)
    const terraceGroup = new THREE.Group();
    // Grass lawn slab
    const lawnMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.15, 6.2), lawnMaterial);
    lawnMesh.position.set(0, 4.3, 0);
    terraceGroup.add(lawnMesh);

    // Timber Pergola structure
    const pergolaBeamMat = woodFinMaterial;
    for (let j = 0; j < 5; j++) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.12), pergolaBeamMat);
      beam.position.set(-0.8, 5.2, -1.2 + j * 0.6);
      terraceGroup.add(beam);
    }
    // Pergola 4 columns
    const col1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9), pergolaBeamMat);
    col1.position.set(-2.1, 4.75, -1.2);
    const col2 = col1.clone();
    col2.position.set(0.5, 4.75, -1.2);
    const col3 = col1.clone();
    col3.position.set(-2.1, 4.75, 1.2);
    const col4 = col1.clone();
    col4.position.set(0.5, 4.75, 1.2);
    terraceGroup.add(col1, col2, col3, col4);

    // Water fountain feature block
    const fountainMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.3, 16), goldTrimMaterial);
    fountainMesh.position.set(1.4, 4.45, -0.6);
    terraceGroup.add(fountainMesh);

    villaGroup.add(terraceGroup);

    // Highlight floors based on activeFloor
    if (activeFloor === "Ground Floor") {
      gfMain.material = new THREE.MeshStandardMaterial({
        color: 0xd5ae43,
        roughness: 0.3,
      });
    } else if (activeFloor === "First Floor") {
      ffMain.material = new THREE.MeshStandardMaterial({
        color: 0xd5ae43,
        roughness: 0.3,
      });
    }

    // 7. Interactive Mouse Drag Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      villaGroup.rotation.y += deltaX * 0.008;
      villaGroup.rotation.x = Math.max(-0.2, Math.min(0.4, villaGroup.rotation.x + deltaY * 0.004));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        villaGroup.rotation.y += deltaX * 0.008;
        touchStartX = e.touches[0].clientX;
      }
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    // 8. Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isDragging) {
        villaGroup.rotation.y += 0.002; // Gentle continuous architectural rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize handler
    const onResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeFloor]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden bg-forest-950 flex flex-col items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Navigation Controls Hint */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 pointer-events-none">
        <span className="glass-panel px-3 py-1.5 rounded-full border border-gold-400/30 text-gold-300">
          Mode C: Real-Time Three.js 3D Architectural Model
        </span>
        <span className="hidden sm:inline glass-panel px-3 py-1.5 rounded-full text-stone-400">
          Drag with mouse or swipe on mobile to rotate 360&deg;
        </span>
      </div>
    </div>
  );
};
