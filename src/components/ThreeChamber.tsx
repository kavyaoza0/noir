import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCw } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeChamber() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // Torus Knot with organic curvature
    const geometry = new THREE.TorusKnotGeometry(1.68, 0.46, 180, 40, 2, 3);

    // Pure Liquid Chrome Physical Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1f1f26,
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd6ff38, 3.5); // Signature chartreuse rim
    rimLight.position.set(-7, -4, -4);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0x818cf8, 1.8, 15);
    softFill.position.set(0, 5, -3);
    scene.add(softFill);

    // Mouse / Touch Interaction (Smooth drag inertia)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      soundEngine.playClick(900);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const x = (e.clientX / window.innerWidth - 0.5) * 0.6;
        const y = (e.clientY / window.innerHeight - 0.5) * 0.6;
        targetRotationY = x;
        targetRotationX = y;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // ScrollTrigger to rotate and scale along with user scroll
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        mesh.rotation.z = self.progress * Math.PI * 2.2;
        mesh.position.y = (self.progress - 0.5) * 1.5;
        mesh.scale.setScalar(1 + Math.sin(self.progress * Math.PI) * 0.18);
      },
    });

    // Visibility check to pause render loop when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animate Loop
    let animId: number;
    const animate = () => {
      if (isVisible) {
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.06 + 0.002;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.06 + 0.004;
        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      scrollTriggerInstance.kill();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.clip-headline-line');
      initClipPathHeadline(lines as unknown as HTMLElement, {
        trigger: sectionRef.current || undefined,
        stagger: 0.12,
        duration: 1.2,
      });
    }
  }, []);

  return (
    <section
      id="three-chamber"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 overflow-hidden border-b border-white/5 select-none"
    >
      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-4 sm:pb-6 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">03 / FORM FOLLOWS TOUCH</span>
          <span aria-hidden="true">·</span>
          <span>LIQUID CHROME</span>
        </div>
        <div>
          <span className="text-[#d6ff38] font-bold">REAL-TIME WEBGL</span>
        </div>
      </div>

      {/* Main Stage: Simple, Monumental, Shopify Editions Inspired */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto z-10 py-6">
        {/* Left: Refined Human Editorial Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
              Atelier Prototype 01
            </span>
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
            >
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Form</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block text-[#d6ff38]">Follows</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Touch</span>
              </span>
            </h2>
            <p className="text-sm sm:text-base font-['Plus_Jakarta_Sans'] text-white/80 leading-relaxed pt-1 sm:pt-2">
              Sculpted in pure liquid chrome. We engineered this physical topology to react to the
              subtle inertia of your pointer and scroll velocity. When software has mass, every
              interaction feels alive.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1.5 sm:space-y-2">
            <div className="text-[10px] sm:text-[11px] font-mono text-white/40 uppercase">Material Specification</div>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-white/70 leading-relaxed">
              98% Specular Chromium · Clearcoat Reflectivity · 60 FPS Compositor Shaders
            </p>
          </div>
        </div>

        {/* Right: Full-Focus 3D Sculpture Canvas */}
        <div className="lg:col-span-7 relative h-[45vh] sm:h-[55vh] lg:h-[75vh] flex items-center justify-center">
          <div
            ref={mountRef}
            data-cursor="drag3d"
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Floating Minimal Reticle */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none flex items-center gap-2 text-xs font-mono text-white/40">
            <RotateCw className="w-3.5 h-3.5 text-[#d6ff38] animate-spin" style={{ animationDuration: '6s' }} />
            <span>DRAG FREELY TO ROTATE</span>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans'] text-white/40 z-10">
        <span>HANDMADE CURVATURE · NOIR / FORM</span>
        <span>SCROLL TO PROCEED</span>
      </div>
    </section>
  );
}
