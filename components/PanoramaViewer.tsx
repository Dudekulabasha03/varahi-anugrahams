"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface PanoramaViewerProps {
  imageSrc: string;
  roomName: string;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ imageSrc, roomName }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);

    // 3. Inverted Panorama Sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert faces inward

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc, () => {
      renderer.render(scene, camera);
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 5. Orbit & Drag variables
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event: MouseEvent) => {
      isUserInteracting = true;
      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: MouseEvent) => {
      if (!isUserInteracting) return;
      lon = (onPointerDownMouseX - event.clientX) * 0.15 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.15 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    // Wheel zoom
    const onWheel = (event: WheelEvent) => {
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(fov, 40, 95);
      camera.updateProjectionMatrix();
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });

    // Touch support
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isUserInteracting = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isUserInteracting) {
        lon = (touchStartX - e.touches[0].clientX) * 0.2 + onPointerDownLon;
        lat = (e.touches[0].clientY - touchStartY) * 0.2 + onPointerDownLat;
      }
    };
    const onTouchEnd = () => {
      isUserInteracting = false;
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    // 6. Animation
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && !isUserInteracting) {
        lon += 0.06;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc, autoRotate]);

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden bg-forest-950 flex flex-col items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 360 Tour Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-full border text-xs transition-colors flex items-center gap-1.5 ${
            autoRotate
              ? "bg-gold-400 text-forest-950 border-gold-400 font-bold"
              : "glass-panel text-gold-300 border-gold-400/40"
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Rotate</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 pointer-events-none">
        <span className="glass-panel px-3 py-1.5 rounded-full border border-gold-400/30 text-gold-300">
          Mode B: 360&deg; Panorama Viewer &bull; {roomName}
        </span>
        <span className="hidden sm:inline glass-panel px-3 py-1.5 rounded-full text-stone-400">
          Drag to look around 360&deg; &bull; Scroll to zoom
        </span>
      </div>
    </div>
  );
};
