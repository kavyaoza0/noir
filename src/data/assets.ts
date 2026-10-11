/**
 * Centralized Asset Manifest for NOIR / FORM
 * All high-fidelity visual assets, video sources, and project datasets
 * are documented and accessible from here.
 */

export interface VideoAsset {
  id: string;
  title: string;
  src: string;
  poster: string;
  aspectRatio: string;
  durationApprox: number;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  discipline: string;
  client: string;
  image: string;
  description: string;
  palette: string;
  metrics: string;
}

export const ASSET_MANIFEST = {
  images: {
    heroSculpture: '/hero_sculpture_dark_1791569264816.jpg',
    editorialFashion: '/editorial_fashion_noir_1791569278412.jpg',
    architecturalStudy: '/architectural_light_study_1791569291165.jpg',
    glassPrism: '/glass_prism_macro_1791569316900.jpg',
    spatialGrid: '/spatial_light_grid_1791569326800.jpg',
  },
  videos: {
    sequenceOne: {
      id: 'vid-01-kinetic-light',
      title: 'Synapse Field — Kinetic Light Architecture',
      src: '/cinematic_reel.mp4',
      poster: '/cinematic_poster.jpg',
      aspectRatio: '16:9',
      durationApprox: 10.0,
      description: 'Generative spatial light installation, kinetic LED matrix, and atmospheric illumination suspended in a dark void.',
    } as VideoAsset,
    sequenceTwo: {
      id: 'vid-02-chromatic-drift',
      title: 'Chromatic Flux — High Speed Motion Study',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: '/src/assets/images/spatial_light_grid_1791569326800.jpg',
      aspectRatio: '16:9',
      durationApprox: 15.0,
      description: 'Atmospheric light choreography and nocturnal illumination in dynamic acceleration.',
    } as VideoAsset,
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'prj-01',
    title: 'KINETIC MONOLITH',
    year: '2026',
    discipline: 'Spatial Web & WebGL Installation',
    client: 'Venice Biennale Digital Pavilion',
    image: ASSET_MANIFEST.images.heroSculpture,
    description: 'An interactive 3D generative sculpture exploring gravity, fluid chromium, and real-time observer physics.',
    palette: '#D6FF38 · Metallic Silver · Void Black',
    metrics: '60 FPS WebGL · 180k Concurrent Observers',
  },
  {
    id: 'prj-02',
    title: 'AETHER / PRISM',
    year: '2025',
    discipline: 'Creative Direction & Optical Engine',
    client: 'Maison Lumière Paris',
    image: ASSET_MANIFEST.images.glassPrism,
    description: 'Refractive dispersion design system translating physical optical glass mathematics into digital interactions.',
    palette: 'Spectral Dispersion · Obsidian',
    metrics: '9 International Design Trophies',
  },
  {
    id: 'prj-03',
    title: 'BRUTALIST VOID',
    year: '2025',
    discipline: 'Architectural Editorial & Cinematography',
    client: 'ArchDaily Archive Series',
    image: ASSET_MANIFEST.images.architecturalStudy,
    description: 'A monochrome study of concrete geometries and directional sunbeams slicing through monumental darkness.',
    palette: 'Concrete Gray · High Noon White',
    metrics: 'Editorial Feature · 35mm Leica Film Grade',
  },
  {
    id: 'prj-04',
    title: 'NEO NOIR SILHOUETTE',
    year: '2024',
    discipline: 'Avant-Garde Fashion & Interactive Lookbook',
    client: 'Atelier Kanto',
    image: ASSET_MANIFEST.images.editorialFashion,
    description: 'Experimental garment forms sculpted like origami against raw architectural monoliths.',
    palette: 'Matte Charcoal · Bone White',
    metrics: 'Global Campaign · Interactive 3D Fabric Viewer',
  },
  {
    id: 'prj-05',
    title: 'SYNAPSE FIELD',
    year: '2024',
    discipline: 'Generative Light Installation',
    client: 'Tokyo Media Arts Center',
    image: ASSET_MANIFEST.images.spatialGrid,
    description: 'Laser projection grid hanging in mid-air fog, reacting to physical acoustic vibrations.',
    palette: 'Cyan Luminescence · Deep Indigo',
    metrics: 'Permanent Gallery Exhibition · 420m² Footprint',
  },
];

export const CAPABILITIES_DATA = [
  {
    number: '01',
    title: 'Interactive Web & Spatial Systems',
    description: 'We construct web experiences that refuse conventional templates. Real-time WebGL, fluid physics, and scroll-orchestrated kinetic storytelling that command attention.',
    tags: ['WebGL & Three.js', 'GSAP Orchestration', 'Shader Programming', 'Fluid Physics'],
  },
  {
    number: '02',
    title: 'Cinematic Art Direction & Film',
    description: 'From avant-garde high-fashion campaigns to sci-fi visual effects, we direct lighting, composition, and kinetic movement with editorial rigor.',
    tags: ['Creative Direction', 'Scroll-Driven Film', '3D Motion Design', 'Lighting Studies'],
  },
  {
    number: '03',
    title: 'Generative Typography & Identity',
    description: 'Words that bend, breathe, and react. We create bespoke digital typography engines and design systems engineered for future interfaces.',
    tags: ['Variable Font Systems', 'Kinetic Layouts', 'Dynamic Wordmarks', 'Micro-Interactions'],
  },
  {
    number: '04',
    title: 'Acoustic Architecture & Sound Design',
    description: 'Interactive audio landscapes synthesized in browser. Subtle micro-tonal haptic feedback that renders digital interactions visceral.',
    tags: ['Web Audio API', 'Procedural Drones', 'Haptic Harmonics', 'Adaptive Soundscapes'],
  },
];
