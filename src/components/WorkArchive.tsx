import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/assets';
import { soundEngine } from '../utils/sound';
import { initClipPathHeadline } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function WorkArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll + 300}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.clip-headline-line');
        initClipPathHeadline(lines as unknown as HTMLElement, {
          trigger: containerRef.current || undefined,
          stagger: 0.12,
          duration: 1.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenModal = (project: ProjectItem) => {
    soundEngine.playClick(850);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    soundEngine.playClick(450);
    setSelectedProject(null);
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-between py-12 border-b border-white/5"
    >
      {/* Top Header Row */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between text-xs font-mono text-white/50 tracking-widest">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-white font-semibold">05 / SELECTED WORKS ARCHIVE</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">HORIZONTAL ARCHIVE</span>
        </div>
        <div className="hidden sm:block text-right">
          <span>{PROJECTS_DATA.length} ARCHIVAL ENTRIES (2024–2026)</span>
        </div>
      </div>

      {/* Horizontally scrolling track */}
      <div className="my-auto overflow-visible">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 md:gap-14 px-4 sm:px-8 md:px-12 w-max"
        >
          {/* Introductory Card */}
          <div className="w-[260px] sm:w-[320px] md:w-[380px] shrink-0 flex flex-col justify-center pr-4 sm:pr-6">
            <span className="text-[11px] sm:text-xs font-mono text-[#d6ff38] tracking-widest uppercase mb-3 sm:mb-4 block">
              Curated Output
            </span>
            <h3
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl font-['Syne'] font-extrabold text-white leading-[1.05] uppercase"
            >
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Artifacts of</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block text-[#d6ff38]">Spatial</span>
              </span>
              <span className="block overflow-hidden">
                <span className="clip-headline-line block">Exploration</span>
              </span>
            </h3>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] text-white/60 leading-relaxed">
              Every commission represents a customized technological pipeline. Drag or scroll horizontally
              to examine case studies.
            </p>
          </div>

          {/* Project Cards */}
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="group relative w-[270px] sm:w-[380px] md:w-[460px] aspect-[4/3] shrink-0 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] cursor-pointer transition-all duration-300 hover:border-[#d6ff38]/60 hover:shadow-2xl hover:shadow-[#d6ff38]/10"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

              {/* Card Meta Content */}
              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-[#d6ff38] tracking-widest font-bold">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#d6ff38] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-white/60 tracking-wider mb-1 uppercase">
                    {project.client} · {project.year}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-['Syne'] font-bold text-white uppercase tracking-tight group-hover:text-[#d6ff38] transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-xs font-['Plus_Jakarta_Sans'] text-white/70 line-clamp-2">
                    {project.discipline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track Meta */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-xs font-mono text-white/40">
        <span>CLICK ANY PROJECT TO INSPECT DOSSIER</span>
        <span>SCROLL HORIZONTALLY →</span>
      </div>

      {/* Fullscreen Lightbox / Modal Dossier */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c10] border border-white/15 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#d6ff38] hover:text-black text-white flex items-center justify-center transition-colors"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Pane */}
            <div className="md:w-1/2 aspect-video md:aspect-auto relative bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent md:hidden" />
            </div>

            {/* Right Information Pane */}
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#d6ff38] tracking-widest uppercase mb-2">
                  <span>{selectedProject.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.year}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-['Syne'] font-extrabold text-white tracking-tight uppercase">
                  {selectedProject.title}
                </h3>

                <p className="mt-2 text-xs font-mono text-white/50 tracking-wider">
                  {selectedProject.discipline}
                </p>

                <p className="mt-6 text-sm font-['Plus_Jakarta_Sans'] text-white/80 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mt-8 space-y-4 pt-6 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-white/40 block mb-1">COLOR MATRIX</span>
                    <span className="text-white/80">{selectedProject.palette}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1">IMPACT & METRICS</span>
                    <span className="text-[#d6ff38] font-semibold">{selectedProject.metrics}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">ARCHIVE ID: {selectedProject.id}</span>
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-xs font-semibold text-black bg-[#d6ff38] hover:bg-white rounded-md transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
