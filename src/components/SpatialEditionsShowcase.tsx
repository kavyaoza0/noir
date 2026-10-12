import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCw } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function SpatialEditionsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Three.js refs
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobile = width < 768;
    camera.position.set(0, 0, isMobile ? 8.2 : 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;

    mount.appendChild(renderer.domElement);

    // Master kinetic rings group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    groupRef.current = masterGroup;

    // Harmonic Concentric Kinetic Rings with sculpted titanium chrome material
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x323548, // Rich dark titanium body clearly visible on desktop while preserving specular contrast
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
    });

    const rings: THREE.Mesh[] = [];
    const ringCount = 4;
    for (let i = 0; i < ringCount; i++) {
      const radius = 1.25 + i * 0.42;
      const tube = 0.072 - i * 0.007; // Well-proportioned thickness so whole ring body and specular sheen are visible
      const ringGeo = new THREE.TorusGeometry(radius, Math.max(0.045, tube), 40, 120);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = (i * Math.PI) / 3.2;
      ring.rotation.y = (i * Math.PI) / 4.2;
      masterGroup.add(ring);
      rings.push(ring);
    }

    // Studio Lighting — balanced for brilliant "lightning" specular glints and distinct ring structure
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Primary bright directional key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Electric chartreuse rim light hitting the front/edge curves
    const rimLight = new THREE.DirectionalLight(0xd6ff38, 5.2);
    rimLight.position.set(-6, -3, 4);
    scene.add(rimLight);

    // Specular highlight point light (creates the brilliant moving "lightning" traveling crest)
    const specularLight = new THREE.PointLight(0xffffff, 4.5, 20);
    specularLight.position.set(1.5, 4.5, 4.5);
    scene.add(specularLight);

    // Dimensional indigo fill light
    const fillLight = new THREE.PointLight(0x818cf8, 2.8, 16);
    fillLight.position.set(0, -4, -3);
    scene.add(fillLight);

    // Pointer Interaction (Smooth drag)
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
        const x = (e.clientX / window.innerWidth - 0.5) * 0.7;
        const y = (e.clientY / window.innerHeight - 0.5) * 0.7;
        targetRotationY = x;
        targetRotationX = y;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // GSAP ScrollTrigger — exactly like Form Follows Touch: as you scroll, it moves!
    const scrollInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        if (masterGroup) {
          masterGroup.rotation.z = p * Math.PI * 2.5;
          masterGroup.rotation.y = p * Math.PI * 2.0;
          masterGroup.scale.setScalar(0.95 + Math.sin(p * Math.PI) * 0.22);
        }
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
    observer.observe(mount);

    // Animation Loop
    let animId: number;
    const animate = () => {
      if (isVisible) {
        if (masterGroup) {
          masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.06 + 0.002;
          masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.06 + 0.003;

          rings.forEach((r, idx) => {
            r.rotation.z += 0.007 * (idx % 2 === 0 ? 1 : -1);
            r.rotation.x += 0.003 * (idx % 2 === 0 ? -1 : 1);
          });
        }

        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.position.z = w < 768 ? 8.2 : 7.2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      scrollInstance.kill();
      mount.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.clip-headline-line');
      initClipPathHeadline(lines as unknown as HTMLElement, {
        trigger: containerRef.current || undefined,
        stagger: 0.12,
        duration: 1.2,
      });
    }
  }, []);

  return (
    <section
      id="editions-showcase"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-white/5 select-none"
    >
      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest pb-4 sm:pb-6 border-b border-white/10 z-20">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">04 / HARMONIC INERTIA PHYSICS</span>
          <span aria-hidden="true">·</span>
          <span>KINETIC CURVATURE</span>
        </div>
        <div>
          <span className="text-[#d6ff38] font-bold">PHYSICAL SIMULATION</span>
        </div>
      </div>

      {/* Main Stage: Just like Form Follows Touch */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto z-10 py-6">
        {/* Left: 3D Kinetic Rings Stage */}
        <div className="lg:col-span-7 relative h-[45vh] sm:h-[55vh] lg:h-[75vh] flex items-center justify-center">
          <div
            ref={canvasMountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            data-cursor="drag3d"
          />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-[10px] sm:text-xs font-mono text-white/40 flex items-center gap-2 pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 text-[#d6ff38] animate-spin" style={{ animationDuration: '6s' }} />
            <span>DRAG FREELY TO ROTATE</span>
          </div>
        </div>

        {/* Right: Human Editorial Story */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-mono text-[#d6ff38] tracking-widest uppercase block">
              Continuous Motion
            </span>
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl font-['Syne'] font-extrabold text-white tracking-tight uppercase leading-[0.98]"
            >
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Harmonic</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block text-[#d6ff38]">Inertia</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Physics</span>
              </span>
            </h2>
            <p className="text-sm sm:text-base font-['Plus_Jakarta_Sans'] text-white/80 leading-relaxed pt-1 sm:pt-2">
              Motion tuned to human pacing. When you scroll, the rings rotate and expand with natural
              mass. When you pause, momentum settles gently. No mechanical jarring, just pure fluid grace.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.025] border border-white/10 space-y-2">
            <p className="text-sm font-['Plus_Jakarta_Sans'] italic text-white/90 leading-relaxed">
              “Motion should feel like breathing. When easing is tuned with human care, digital objects
              acquire weight and presence.”
            </p>
          </div>

          <div className="pt-2 flex items-center gap-8 text-xs font-mono text-white/50">
            <div>
              <span className="text-white block font-bold text-sm">60 FPS</span>
              <span>Smooth Physics</span>
            </div>
            <div>
              <span className="text-white block font-bold text-sm">Zero</span>
              <span>Input Latency</span>
            </div>
            <div>
              <span className="text-[#d6ff38] block font-bold text-sm">Harmonic</span>
              <span>Spring Mass</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans'] text-white/40 z-20">
        <span>CONCENTRIC TOPOLOGY · NOIR / FORM</span>
        <span>SCROLL TO ADVANCE</span>
      </div>
    </section>
  );
}
