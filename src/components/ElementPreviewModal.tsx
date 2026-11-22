import React, { useState, useEffect } from "react";
import {
  X,
  Eye,
  Layers,
  Layout,
  Sparkles,
  Palette,
  Type,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Sun,
  Moon,
  RefreshCw,
  Play,
  Pause,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Search,
  Star,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Clock,
  ArrowRight,
  Plus,
  Info,
  Filter,
  Maximize2,
  CheckSquare,
  Square,
  Home,
  Briefcase,
  Compass,
  FolderKanban,
  CreditCard,
  MessageSquare,
  Users,
  BookOpen,
  HelpCircle,
  Video,
  Award,
  Zap,
  Globe,
  SlidersHorizontal,
  MousePointerClick,
  Menu,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  ArrowUpDown,
  ShoppingBag
} from "lucide-react";
import {
  SectionTemplate,
  SelectedSectionConfig,
  DesignSystemConfig,
  Title3DEffectType,
  TitleFontFamily,
  NavbarStyleType
} from "../types";
import { DEFAULT_SECTION_TEMPLATES } from "../constants/sectionTemplates";
import {
  CURATED_COLOR_PALETTES,
  NAVBAR_STYLE_PRESETS,
  NavbarStylePreset
} from "../constants/designSystemTemplates";

export interface InteractiveFeatureItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  highlights: string[];
  benefits: string;
  techDetails: string;
}

export const PRESET_FEATURES_LIST: InteractiveFeatureItem[] = [
  {
    id: "Animated Slides",
    name: "Animated Slides & Carousels",
    category: "Media Presentation",
    description: "Paneles de carrusel fluidos y de alto rendimiento para destacar productos, testimonios o galerías visuales con desplazamiento táctil.",
    badge: "Demo Interactiva",
    highlights: [
      "Soporte táctil deslizable (touch swipe) y auto-play con pausa al pasar el cursor",
      "Controles accesibles por teclado e indicadores de posición dinámicos",
      "Transiciones aceleradas por hardware GPU sin salto de layout (zero CLS)"
    ],
    benefits: "Captura la atención inmediata del visitante en la sección hero y aumenta el tiempo de permanencia hasta un 40%.",
    techDetails: "CSS transforms acelerados por GPU y temporizador React seguro con pausa/reanudación."
  },
  {
    id: "Entry Animations",
    name: "Staggered Entry Animations",
    category: "Micro-interacciones",
    description: "Efectos visuales de aparición en cascada con retrasos progresivos entre elementos y cero layout shift.",
    badge: "Repetición en Vivo",
    highlights: [
      "Efecto cascada (staggered delay) entre tarjetas hijas de 50ms a 300ms",
      "Disparo fluido mediante IntersectionObserver garantizando 60 fps estables",
      "Curvas cúbicas bezier personalizables para un acabado editorial de lujo"
    ],
    benefits: "Guía sutilmente la lectura hacia las llamadas a la acción (CTA) y transmite máxima sofisticación tecnológica.",
    techDetails: "Keyframes @keyframes fadeIn combinados con cubic-bezier easing y will-change."
  },
  {
    id: "Video Background Overlay",
    name: "Cinematic Video Background Overlay",
    category: "Hero Atmosphere",
    description: "Bucle de video ambiental continuo con capa de contraste oscuro para máxima legibilidad tipográfica.",
    badge: "Reproductor de Medios",
    highlights: [
      "Bucle de video silencioso (muted autoplay) con optimización de consumo de red",
      "Capa de scrim de contraste oscuro garantizando estándar WCAG AA de legibilidad",
      "Imagen de poster estática de respaldo ultraligera para carga instantánea"
    ],
    benefits: "Sumerge al visitante en la narrativa de marca de inmediato, transmitiendo dinamismo y sofisticación.",
    techDetails: "HTML5 video element con object-cover, overlay radial/lineal y fallback poster image."
  },
  {
    id: "Interactive Parallax",
    name: "Interactive Parallax Depth",
    category: "Profundidad Espacial",
    description: "Desplazamientos de perspectiva 3D dinámicos y reactivos a la velocidad del ratón y el cursor.",
    badge: "Mueve el Cursor",
    highlights: [
      "Profundidad 3D reactiva en tiempo real al puntero del mouse o giroscopio móvil",
      "Separación de capas en ejes Z con perspectiva espacial de 800px",
      "Física de amortiguación suave (dampening) sin sobrecarga de CPU"
    ],
    benefits: "Convierte una página corporativa monótona en un showroom digital táctil y memorable.",
    techDetails: "CSS 3D perspective con rotateX/rotateY calculados mediante deltas normalizados del cursor."
  },
  {
    id: "Light/Dark Switch",
    name: "Light / Dark Appearance Toggle",
    category: "Motor de Temas",
    description: "Selector deslizante para personalizar la estética con persistencia de preferencia local.",
    badge: "Switch en Vivo",
    highlights: [
      "Cambio instantáneo de tokens CSS custom properties sin parpadeos de estilo",
      "Persistencia automática de la preferencia del usuario en localStorage",
      "Sincronización automática con la preferencia del sistema operativo del visitante"
    ],
    benefits: "Ofrece comodidad de lectura nocturna protegiendo la fatiga visual de usuarios habituales.",
    techDetails: "Clases dark en elemento raíz HTML con variables de color sincronizadas."
  },
  {
    id: "Dynamic Contact Form",
    name: "Dynamic Multi-Step Contact Form",
    category: "Conversión de Leads",
    description: "Campos de entrada pulidos, validación reactiva en cliente y estado de confirmación celebratorio.",
    badge: "Formulario Funcional",
    highlights: [
      "Validación reactiva campo por campo en tiempo real con mensajes amigables",
      "Chips interactivos de selección rápida de presupuesto y tipo de servicio",
      "Animación de confirmación y pantalla de éxito celebratoria post-envío"
    ],
    benefits: "Multiplica la tasa de conversión al eliminar la fricción típica de formularios pesados.",
    techDetails: "Controlled React state con validación sintáctica de email y feedback animado."
  },
  {
    id: "Live Filterable Grid",
    name: "Live Filterable Content Grid",
    category: "Portafolio y Tienda",
    description: "Filtrado client-side por categorías con cero recargas de página y transiciones animadas.",
    badge: "Pestañas Interactivas",
    highlights: [
      "Filtrado instantáneo por categorías sin recarga de página (0ms de latencia)",
      "Transiciones animadas suaves entre elementos filtrados (FLIP animation)",
      "Contadores dinámicos de proyectos por categoría y estado vacío informativo"
    ],
    benefits: "Permite a los prospectos evaluar casos de éxito relevantes en su sector en un solo clic.",
    techDetails: "Filtrado en memoria client-side con transiciones de escala y opacidad."
  },
  {
    id: "Responsive Mega-Menu",
    name: "Responsive Mega-Menu & Drawer",
    category: "Sistema de Navegación",
    description: "Arquitectura desplegable en múltiples columnas, teasers promocionales y cajón móvil.",
    badge: "Clic para Abrir",
    highlights: [
      "Arquitectura de enlaces en múltiples columnas organizadas por jerarquía",
      "Banner promocional integrado con teasers de productos o llamadas a la acción",
      "Transición fluida a cajón lateral (drawer) deslizable en dispositivos móviles"
    ],
    benefits: "Estructura arquitecturas web con muchos servicios sin sobrecargar la barra superior.",
    techDetails: "Backdrop blur de alta definición y control de foco accesible (ARIA compliant)."
  },
  {
    id: "Navigation Bar Styles",
    name: "Adaptive Navigation Bar Styles",
    category: "Sistema de Navegación",
    description: "8 variantes arquitectónicas: Glassmorphic Flotante, Sticky Minimal, Luxury Wordmark, Dock móvil, etc.",
    badge: "Selector de Navbar",
    highlights: [
      "8 variantes arquitectónicas: Glassmorphic, Sticky, Luxury, Dock móvil, etc.",
      "Detección inteligente de scroll (fondo transparente en top, desenfoque al deslizar)",
      "Dock inferior optimizado para pulgares en navegación móvil táctil"
    ],
    benefits: "Asegura que la navegación principal esté siempre visible y adaptada a la identidad de marca.",
    techDetails: "Backdrop-filter CSS y dock anclado condicionalmente al viewport."
  }
];

export function getFeatureIcon(featureId: string) {
  switch (featureId) {
    case "Animated Slides":
      return <Sliders className="w-3.5 h-3.5 text-amber-400" />;
    case "Entry Animations":
      return <Sparkles className="w-3.5 h-3.5 text-sky-400" />;
    case "Video Background Overlay":
      return <Video className="w-3.5 h-3.5 text-emerald-400" />;
    case "Interactive Parallax":
      return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    case "Light/Dark Switch":
      return <Sun className="w-3.5 h-3.5 text-amber-300" />;
    case "Dynamic Contact Form":
      return <Mail className="w-3.5 h-3.5 text-rose-400" />;
    case "Live Filterable Grid":
      return <Filter className="w-3.5 h-3.5 text-cyan-400" />;
    case "Responsive Mega-Menu":
      return <Menu className="w-3.5 h-3.5 text-indigo-400" />;
    case "Navigation Bar Styles":
      return <Compass className="w-3.5 h-3.5 text-teal-400" />;
    default:
      return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
  }
}

interface ElementPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSections: SelectedSectionConfig[];
  onSelectedSectionsChange: (sections: SelectedSectionConfig[]) => void;
  chosenFeatures: string[];
  onToggleFeature: (featureName: string) => void;
  designConfig: DesignSystemConfig;
  onDesignConfigChange?: (config: DesignSystemConfig) => void;
  clientName?: string;
  initialTab?: "sections" | "navbars" | "features" | "design";
  initialSectionId?: string;
  initialFeatureName?: string;
}

export default function ElementPreviewModal({
  isOpen,
  onClose,
  selectedSections,
  onSelectedSectionsChange,
  chosenFeatures,
  onToggleFeature,
  designConfig,
  onDesignConfigChange,
  clientName = "Acme Studio",
  initialTab = "sections",
  initialSectionId,
  initialFeatureName
}: ElementPreviewModalProps) {
  // Modal navigation tabs
  const [activeTab, setActiveTab] = useState<"sections" | "navbars" | "features" | "design">(initialTab);
  
  // Device viewport simulator
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");

  // Navigation Bar Style state
  const [selectedNavbarStyle, setSelectedNavbarStyle] = useState<NavbarStyleType>(
    designConfig.navbarStyle || "Floating Glassmorphic Pill"
  );
  const [showNavbarOnSectionPreview, setShowNavbarOnSectionPreview] = useState<boolean>(true);
  const [navbarMegaMenuOpen, setNavbarMegaMenuOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState<string>("home");
  const [navbarAppliedNotice, setNavbarAppliedNotice] = useState<boolean>(false);

  // Sections view state
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    return initialSectionId || (selectedSections.length > 0 ? selectedSections[0].sectionId : "home");
  });

  // Local draft of current section config for live manipulation in modal
  const [localLayout, setLocalLayout] = useState<string>("");
  const [localSubmodules, setLocalSubmodules] = useState<string[]>([]);
  const [localEnhancements, setLocalEnhancements] = useState<string[]>([]);
  const [appliedNotice, setAppliedNotice] = useState(false);

  // Full-page continuous scroll vs single-section view mode
  const [previewDisplayMode, setPreviewDisplayMode] = useState<"full_page" | "single_section">("full_page");

  // Smooth scroll down and up navigation handlers
  const handleScrollDownPage = (containerId: string = "sample-preview-viewport-scroll") => {
    const innerViewport = document.getElementById(containerId);
    const outerCanvas = document.getElementById("sample-preview-canvas");
    if (innerViewport && innerViewport.scrollHeight > innerViewport.clientHeight) {
      innerViewport.scrollBy({ top: 480, behavior: "smooth" });
    } else if (outerCanvas) {
      outerCanvas.scrollBy({ top: 480, behavior: "smooth" });
    }
  };

  const handleScrollToTopPage = (containerId: string = "sample-preview-viewport-scroll") => {
    const innerViewport = document.getElementById(containerId);
    const outerCanvas = document.getElementById("sample-preview-canvas");
    if (innerViewport) {
      innerViewport.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (outerCanvas) {
      outerCanvas.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(`preview-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Features view state
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  
  // Floating window tooltip state for hovered feature
  const [hoveredFeature, setHoveredFeature] = useState<{
    feature: InteractiveFeatureItem;
    x: number;
    y: number;
  } | null>(null);

  const handleFeatureMouseEnter = (feat: InteractiveFeatureItem, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isRightNearEdge = rect.right + 390 > (typeof window !== "undefined" ? window.innerWidth : 1200);
    setHoveredFeature({
      feature: feat,
      x: isRightNearEdge ? Math.max(16, rect.left - 390) : rect.right + 14,
      y: rect.top
    });
  };

  const handleFeatureMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredFeature) {
      setHoveredFeature((prev) => prev ? {
        ...prev,
        y: e.clientY - 20
      } : null);
    }
  };

  const handleFeatureMouseLeave = () => {
    setHoveredFeature(null);
  };
  
  // Interactive Feature Demo States
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const [animationReplayKey, setAnimationReplayKey] = useState(0);
  const [gridFilter, setGridFilter] = useState("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Design preview state
  const [previewHeadlineText, setPreviewHeadlineText] = useState("NEXT GENERATION ARCHITECTURE");
  const [previewFont, setPreviewFont] = useState<TitleFontFamily>(designConfig.titleFontStyle?.fontFamily || "Space Grotesk");
  const [preview3DEffect, setPreview3DEffect] = useState<Title3DEffectType>(designConfig.title3DEffect?.effectType || "floating_elevation");
  const [previewPaletteId, setPreviewPaletteId] = useState<string>(designConfig.paletteId || "obsidian-cyan");
  const [previewRounding, setPreviewRounding] = useState<string>("rounded-2xl");

  // Sync state whenever modal opens or section/feature selection changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialSectionId) setActiveSectionId(initialSectionId);
    if (initialFeatureName) {
      const idx = PRESET_FEATURES_LIST.findIndex(
        (f) =>
          f.id.toLowerCase() === initialFeatureName.toLowerCase() ||
          f.name.toLowerCase().includes(initialFeatureName.toLowerCase()) ||
          initialFeatureName.toLowerCase().includes(f.id.toLowerCase())
      );
      if (idx !== -1) {
        setActiveFeatureIndex(idx);
      }
    }
  }, [initialTab, initialSectionId, initialFeatureName, isOpen]);

  // When active section changes, load its layout and modules into local draft
  useEffect(() => {
    const existing = selectedSections.find((s) => s.sectionId === activeSectionId);
    const tmpl = DEFAULT_SECTION_TEMPLATES.find((t) => t.id === activeSectionId);
    if (existing) {
      setLocalLayout(existing.selectedLayout);
      setLocalSubmodules([...existing.enabledSubmodules]);
      setLocalEnhancements([...existing.enabledEnhancements]);
    } else if (tmpl) {
      setLocalLayout(tmpl.defaultLayout);
      setLocalSubmodules(tmpl.submodules.map((m) => m.id));
      setLocalEnhancements(tmpl.enhancementOptions.slice(0, 2).map((e) => e.id));
    }
  }, [activeSectionId, selectedSections]);

  // Auto-play carousel for Animated Slides demo
  useEffect(() => {
    if (!isCarouselPlaying || activeTab !== "features") return;
    const timer = setInterval(() => {
      setCarouselSlide((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, [isCarouselPlaying, activeTab]);

  if (!isOpen) return null;

  // Find active template
  const currentTemplate = DEFAULT_SECTION_TEMPLATES.find((t) => t.id === activeSectionId) || DEFAULT_SECTION_TEMPLATES[0];
  const isSectionInProject = selectedSections.some((s) => s.sectionId === activeSectionId);

  // Apply changes from modal draft to project state
  const handleApplyToProject = () => {
    const exists = selectedSections.some((s) => s.sectionId === activeSectionId);
    let next: SelectedSectionConfig[];
    if (exists) {
      next = selectedSections.map((s) => {
        if (s.sectionId === activeSectionId) {
          return {
            ...s,
            selectedLayout: localLayout,
            enabledSubmodules: localSubmodules,
            enabledEnhancements: localEnhancements
          };
        }
        return s;
      });
    } else {
      next = [
        ...selectedSections,
        {
          sectionId: currentTemplate.id,
          name: currentTemplate.name,
          selectedLayout: localLayout,
          enabledSubmodules: localSubmodules,
          enabledEnhancements: localEnhancements
        }
      ];
    }
    onSelectedSectionsChange(next);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2400);
  };

  const toggleLocalSubmodule = (id: string) => {
    setLocalSubmodules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleLocalEnhancement = (id: string) => {
    setLocalEnhancements((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Special Interactive Features list
  const featuresList = PRESET_FEATURES_LIST;

  // Helper for font class
  const getFontFamilyClass = (family: TitleFontFamily) => {
    switch (family) {
      case "Space Grotesk": return "font-space-grotesk";
      case "Playfair Display": return "font-playfair";
      case "Cinzel": return "font-cinzel";
      case "Plus Jakarta Sans": return "font-plus-jakarta";
      case "Syne": return "font-syne";
      case "Bebas Neue": return "font-bebas";
      case "JetBrains Mono": return "font-jetbrains";
      case "Cormorant Garamond": return "font-cormorant";
      default: return "font-space-grotesk";
    }
  };

  // Helper for 3D effect class
  const get3DEffectClass = (effect: Title3DEffectType) => {
    switch (effect) {
      case "perspective_tilt": return "text-3d-perspective";
      case "isometric_layered": return "text-3d-isometric";
      case "metallic_emboss": return "text-3d-metallic";
      case "neon_glow_3d": return "text-3d-neon";
      case "glass_relief_3d": return "text-3d-glass";
      case "floating_elevation": return "drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]";
      default: return "";
    }
  };

  const activePalette = CURATED_COLOR_PALETTES.find((p) => p.id === previewPaletteId) || CURATED_COLOR_PALETTES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-zinc-100">
        
        {/* MODAL TOP BAR: TITLE, TABS, DEVICE SWITCHER & CLOSE */}
        <header className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Vista Previa de Elementos Modificables
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  En Vivo
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400">
                Visualiza con fidelidad cómo luce cada cambio de layout, submódulo, efecto o estilo antes de compilar
              </p>
            </div>
          </div>

          {/* Center Category Switcher */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("sections")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "sections"
                  ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Páginas y Secciones</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
                {DEFAULT_SECTION_TEMPLATES.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("navbars")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "navbars"
                  ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Barra de Navegación</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
                {NAVBAR_STYLE_PRESETS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "features"
                  ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Efectos y Módulos</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
                {featuresList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("design")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "design"
                  ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Estilo y Tipografía 3D</span>
            </button>
          </div>

          {/* Right Controls: Device Simulator & Close */}
          <div className="flex items-center gap-2">
            {/* Viewport switch */}
            <div className="hidden sm:flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                title="Desktop View (1440px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewport("tablet")}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === "tablet" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                title="Mobile View (390px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Dark/Light mode preview toggle */}
            <button
              type="button"
              onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
              title={`Cambiar a modo ${previewTheme === "dark" ? "Claro" : "Oscuro"}`}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              {previewTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MODAL MAIN BODY: SIDEBAR + LIVE PREVIEW VIEWPORT */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          
          {/* ========================================================================= */}
          {/* TAB 1: PÁGINAS Y SECCIONES (PAGES & SECTIONS) */}
          {/* ========================================================================= */}
          {activeTab === "sections" && (
            <>
              {/* Left Configuration Sidebar */}
              <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
                
                {/* Section Selector Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-amber-500" />
                      1. Elige qué sección previsualizar:
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    {DEFAULT_SECTION_TEMPLATES.map((tmpl) => {
                      const isActive = tmpl.id === activeSectionId;
                      const isInProject = selectedSections.some((s) => s.sectionId === tmpl.id);
                      return (
                        <button
                          key={tmpl.id}
                          onClick={() => setActiveSectionId(tmpl.id)}
                          className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? "bg-amber-500/20 border-amber-500/80 text-white font-semibold ring-1 ring-amber-500/50"
                              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                          }`}
                        >
                          <span className="truncate pr-1">{tmpl.name.split("/")[0].trim()}</span>
                          {isInProject && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Incluido en el proyecto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layout Style Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      2. Estilo de Layout Modificable:
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {currentTemplate.layoutOptions.length} opciones
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentTemplate.layoutOptions.map((opt) => {
                      const isSelected = localLayout === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => setLocalLayout(opt)}
                          className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500 text-amber-200 font-semibold"
                              : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                          }`}
                        >
                          <span className="leading-tight">{opt}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            isSelected ? "bg-amber-500 border-amber-600 text-zinc-950" : "border-zinc-700 bg-zinc-900"
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submodules Toggle */}
                {currentTemplate.submodules.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      3. Submódulos & Bloques incluidos:
                    </label>
                    <div className="space-y-1.5">
                      {currentTemplate.submodules.map((mod) => {
                        const isChecked = localSubmodules.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            onClick={() => toggleLocalSubmodule(mod.id)}
                            className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                              isChecked
                                ? "bg-zinc-900 border-zinc-700 text-zinc-200"
                                : "bg-zinc-950/30 border-zinc-850 text-zinc-500"
                            }`}
                          >
                            <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? "bg-amber-500 border-amber-600 text-zinc-950" : "border-zinc-700 bg-zinc-900"
                            }`}>
                              {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="font-semibold leading-tight">{mod.label}</div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">{mod.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Enhancements Toggle */}
                {currentTemplate.enhancementOptions.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      4. Efectos & Mejoras Visuales:
                    </label>
                    <div className="space-y-1.5">
                      {currentTemplate.enhancementOptions.map((enh) => {
                        const isChecked = localEnhancements.includes(enh.id);
                        return (
                          <div
                            key={enh.id}
                            onClick={() => toggleLocalEnhancement(enh.id)}
                            className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                              isChecked
                                ? "bg-amber-950/30 border-amber-700/60 text-amber-200"
                                : "bg-zinc-950/30 border-zinc-850 text-zinc-500"
                            }`}
                          >
                            <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? "bg-amber-500 border-amber-600 text-zinc-950" : "border-zinc-700 bg-zinc-900"
                            }`}>
                              {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="font-semibold leading-tight">{enh.label}</div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">{enh.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action button to apply modification to project */}
                <div className="pt-3 border-t border-zinc-800 mt-auto">
                  <button
                    type="button"
                    onClick={handleApplyToProject}
                    className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aplicar esta configuración al proyecto</span>
                  </button>
                  {appliedNotice && (
                    <p className="text-[11px] text-emerald-400 font-semibold text-center mt-1.5 animate-fade-in">
                      ✓ Configuración aplicada a {currentTemplate.name}!
                    </p>
                  )}
                </div>

              </div>

              {/* Right Preview Canvas */}
              <div
                id="sample-preview-canvas"
                className="flex-1 bg-zinc-950/80 p-4 sm:p-6 overflow-y-auto scroll-smooth flex flex-col items-center relative focus:outline-hidden"
              >
                {/* Canvas Status Bar */}
                <div className="w-full max-w-5xl mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-200">{currentTemplate.name}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-medium">Layout: {localLayout}</span>
                  </div>

                  {/* Mode switcher: Página Completa con Scroll vs Solo Esta Sección */}
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      id="btn-mode-full-page"
                      onClick={() => setPreviewDisplayMode("full_page")}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                        previewDisplayMode === "full_page"
                          ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      title="Navega y desplázate por toda la página web continua con todas las secciones"
                    >
                      <Layers className="w-3 h-3" />
                      <span>Página Completa (Scroll)</span>
                    </button>
                    <button
                      type="button"
                      id="btn-mode-single-section"
                      onClick={() => setPreviewDisplayMode("single_section")}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                        previewDisplayMode === "single_section"
                          ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      title="Enfocar únicamente la sección activa actual"
                    >
                      <Layout className="w-3 h-3" />
                      <span>Solo Esta Sección</span>
                    </button>
                  </div>

                  {/* Navbar Style Selector in Section Canvas */}
                  <div className="flex items-center gap-2 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-zinc-800">
                    <span className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-500" />
                      Navbar:
                    </span>
                    <select
                      value={selectedNavbarStyle}
                      onChange={(e) => setSelectedNavbarStyle(e.target.value as NavbarStyleType)}
                      className="bg-zinc-950 border border-zinc-700 text-amber-300 text-[11px] rounded px-1.5 py-0.5 font-semibold focus:outline-hidden cursor-pointer"
                    >
                      {NAVBAR_STYLE_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNavbarOnSectionPreview(!showNavbarOnSectionPreview)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                        showNavbarOnSectionPreview
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      {showNavbarOnSectionPreview ? "Visible" : "Ocultar"}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span>{localSubmodules.length} submódulos activos</span>
                    <span>•</span>
                    <span className="text-amber-400">{localEnhancements.length} mejoras activas</span>
                  </div>
                </div>

                {/* Quick Section Navigation Jumper Bar (when in full_page mode) */}
                {previewDisplayMode === "full_page" && (
                  <div className="w-full max-w-5xl mb-3 flex items-center justify-between gap-2 bg-zinc-900/70 border border-zinc-800/80 px-3 py-1.5 rounded-xl text-xs overflow-x-auto no-scrollbar">
                    <span className="text-[10px] uppercase font-bold text-amber-400/90 flex items-center gap-1 shrink-0">
                      <ArrowUpDown className="w-3 h-3 text-amber-500" />
                      Navegar Secciones:
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                      {(selectedSections.length > 0
                        ? selectedSections
                        : DEFAULT_SECTION_TEMPLATES.map((t) => ({
                            sectionId: t.id,
                            name: t.name,
                            selectedLayout: t.defaultLayout,
                            enabledSubmodules: t.submodules.map((m) => m.id),
                            enabledEnhancements: t.enhancementOptions.slice(0, 2).map((e) => e.id)
                          }))
                      ).map((sec) => (
                        <button
                          key={sec.sectionId}
                          type="button"
                          onClick={() => handleScrollToSection(sec.sectionId)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                            sec.sectionId === activeSectionId
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                              : "bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                          }`}
                        >
                          <span>{sec.name ? sec.name.split("/")[0].trim() : sec.sectionId.toUpperCase()}</span>
                          <span className="text-[8px] text-zinc-500">↓</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleScrollToSection("footer")}
                        className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white text-[10px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Pie de Página</span>
                        <span className="text-[8px] text-zinc-500">↓</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-2 border-l border-zinc-800">
                      <button
                        type="button"
                        id="btn-scroll-down-header"
                        onClick={() => handleScrollDownPage()}
                        className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Desplazar vista hacia abajo"
                      >
                        <span>Bajar</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Viewport Container */}
                <div
                  id="sample-preview-viewport-scroll"
                  className={`w-full transition-all duration-300 rounded-2xl border shadow-2xl overflow-y-auto scroll-smooth flex flex-col justify-between ${
                    viewport === "desktop"
                      ? "max-w-5xl max-h-[76vh]"
                      : viewport === "tablet"
                      ? "max-w-[768px] max-h-[76vh]"
                      : "max-w-[390px] h-[680px] max-h-[680px] rounded-[38px] border-4 border-zinc-700"
                  } ${
                    previewTheme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                      : "bg-white border-zinc-200 text-zinc-900"
                  }`}
                >
                  {/* Mock Browser/Device Header */}
                  <div className={`sticky top-0 z-20 px-4 py-2 border-b flex items-center justify-between text-[11px] select-none shrink-0 ${
                    previewTheme === "dark"
                      ? "bg-zinc-950/95 backdrop-blur-md border-zinc-800 text-zinc-400"
                      : "bg-zinc-100/95 backdrop-blur-md border-zinc-200 text-zinc-500"
                  }`}>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-zinc-800/40 font-mono text-[10px] text-zinc-400 truncate max-w-xs">
                      https://preview.{clientName.toLowerCase().replace(/\s+/g, "")}.com/#{currentTemplate.id}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-amber-500/80 flex items-center gap-1.5">
                      <span>{viewport}</span>
                      {previewDisplayMode === "full_page" && (
                        <span className="text-[8px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold">
                          Scroll Activo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Optional Top Navigation Bar Render */}
                  {showNavbarOnSectionPreview && selectedNavbarStyle !== "Bottom Tab Bar (iOS / Android)" && (
                    <div className="sticky top-[37px] z-10 border-b border-zinc-800/40 shrink-0">
                      {renderNavigationBarPreview({
                        style: selectedNavbarStyle,
                        clientName,
                        theme: previewTheme,
                        isMobile: viewport === "mobile",
                        activePalette,
                        megaMenuOpen: navbarMegaMenuOpen,
                        setMegaMenuOpen: setNavbarMegaMenuOpen,
                        drawerOpen: mobileDrawerOpen,
                        setDrawerOpen: setMobileDrawerOpen,
                        activeBottomTab,
                        setActiveBottomTab
                      })}
                    </div>
                  )}

                  {/* Render Section Live Preview Content */}
                  {previewDisplayMode === "full_page" ? (
                    <div className="flex flex-col divide-y divide-zinc-800/30">
                      {(selectedSections.length > 0
                        ? selectedSections
                        : DEFAULT_SECTION_TEMPLATES.map((t) => ({
                            sectionId: t.id,
                            name: t.name,
                            selectedLayout: t.defaultLayout,
                            enabledSubmodules: t.submodules.map((m) => m.id),
                            enabledEnhancements: t.enhancementOptions.slice(0, 2).map((e) => e.id)
                          }))
                      ).map((sec, idx) => {
                        const isCurrentActive = sec.sectionId === activeSectionId;
                        return (
                          <section
                            key={sec.sectionId}
                            id={`preview-section-${sec.sectionId}`}
                            className={`p-6 sm:p-8 relative transition-all duration-200 ${
                              isCurrentActive
                                ? previewTheme === "dark"
                                  ? "bg-amber-500/5 ring-1 ring-amber-500/30"
                                  : "bg-amber-50/60 ring-1 ring-amber-400/30"
                                : ""
                            }`}
                          >
                            {/* Visual Section Ribbon */}
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/30 text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span className="font-bold uppercase tracking-wider opacity-60">
                                  0{idx + 1}. {sec.name ? sec.name.split("/")[0].trim() : sec.sectionId.toUpperCase()}
                                </span>
                                {isCurrentActive && (
                                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-zinc-950 font-bold uppercase text-[8px]">
                                    Editando en panel
                                  </span>
                                )}
                              </div>
                              {!isCurrentActive && (
                                <button
                                  type="button"
                                  onClick={() => setActiveSectionId(sec.sectionId)}
                                  className="text-amber-500 hover:text-amber-400 font-semibold cursor-pointer flex items-center gap-1 hover:underline"
                                >
                                  <span>Configurar sección</span>
                                  <span>&rarr;</span>
                                </button>
                              )}
                            </div>

                            {/* Live rendered section */}
                            {renderSectionLivePreview({
                              sectionId: sec.sectionId,
                              layout: isCurrentActive ? localLayout : sec.selectedLayout,
                              submodules: isCurrentActive ? localSubmodules : sec.enabledSubmodules,
                              enhancements: isCurrentActive ? localEnhancements : sec.enabledEnhancements,
                              clientName,
                              theme: previewTheme
                            })}

                            {/* Scroll indicator on the first section (Hero) */}
                            {idx === 0 && (
                              <div className="pt-6 flex flex-col items-center justify-center text-center">
                                <button
                                  type="button"
                                  onClick={() => handleScrollDownPage()}
                                  className="group flex flex-col items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                                >
                                  <span className="text-[10px] font-semibold tracking-wide uppercase opacity-75 group-hover:opacity-100">
                                    Desplázate hacia abajo para ver las demás secciones
                                  </span>
                                  <div className="w-5 h-8 rounded-full border-2 border-zinc-600 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
                                    <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
                                  </div>
                                </button>
                              </div>
                            )}
                          </section>
                        );
                      })}

                      {/* Full Polished Website Mock Footer in Full Page Mode */}
                      <footer
                        id="preview-section-footer"
                        className={`p-6 sm:p-8 border-t ${
                          previewTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-zinc-400" : "bg-zinc-100 border-zinc-200 text-zinc-600"
                        }`}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 text-xs">
                          <div className="space-y-2 sm:col-span-1">
                            <span className={`font-bold text-sm ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                              {clientName}
                            </span>
                            <p className="text-[11px] opacity-75">
                              Experiencias digitales de vanguardia diseñadas para máxima conversión.
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <span className={`font-bold uppercase text-[10px] tracking-wider ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                              Secciones
                            </span>
                            <div className="space-y-1 text-[11px]">
                              <div><a href="#preview-section-home" onClick={(e) => { e.preventDefault(); handleScrollToSection("home"); }} className="hover:text-amber-400">Inicio</a></div>
                              <div><a href="#preview-section-services" onClick={(e) => { e.preventDefault(); handleScrollToSection("services"); }} className="hover:text-amber-400">Servicios</a></div>
                              <div><a href="#preview-section-portfolio" onClick={(e) => { e.preventDefault(); handleScrollToSection("portfolio"); }} className="hover:text-amber-400">Portafolio</a></div>
                              <div><a href="#preview-section-contact" onClick={(e) => { e.preventDefault(); handleScrollToSection("contact"); }} className="hover:text-amber-400">Contacto</a></div>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <span className={`font-bold uppercase text-[10px] tracking-wider ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                              Legal & Privacidad
                            </span>
                            <div className="space-y-1 text-[11px] opacity-80">
                              <div>Términos de Servicio</div>
                              <div>Política de Privacidad</div>
                              <div>Seguridad de Datos</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className={`font-bold uppercase text-[10px] tracking-wider ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                              Newsletter
                            </span>
                            <div className="flex gap-1.5">
                              <input
                                type="email"
                                placeholder="tu@correo.com"
                                className={`text-[11px] px-2.5 py-1 rounded-lg border w-full ${
                                  previewTheme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-300 text-zinc-900"
                                }`}
                              />
                              <button className="bg-amber-500 text-zinc-950 font-bold px-2 py-1 rounded-lg text-xs cursor-pointer">
                                OK
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-[10px] opacity-60 gap-2">
                          <span>© {new Date().getFullYear()} {clientName}. Todos los derechos reservados.</span>
                          <span>Desarrollado con arquitectura Lovable.app & Next-Gen Stack</span>
                        </div>
                      </footer>
                    </div>
                  ) : (
                    /* Single Section View Mode */
                    <div className="p-6 md:p-8 min-h-[460px] flex flex-col justify-center flex-1">
                      {renderSectionLivePreview({
                        sectionId: currentTemplate.id,
                        layout: localLayout,
                        submodules: localSubmodules,
                        enhancements: localEnhancements,
                        clientName,
                        theme: previewTheme
                      })}
                    </div>
                  )}

                  {/* Optional Bottom Mobile Tab Bar Render */}
                  {showNavbarOnSectionPreview && (viewport === "mobile" || selectedNavbarStyle === "Bottom Tab Bar (iOS / Android)") && (
                    <div className="sticky bottom-0 z-20 border-t border-zinc-800/40 shrink-0 mt-auto bg-zinc-950/95 backdrop-blur-md">
                      {renderNavigationBarPreview({
                        style: "Bottom Tab Bar (iOS / Android)",
                        clientName,
                        theme: previewTheme,
                        isMobile: true,
                        activePalette,
                        megaMenuOpen: false,
                        setMegaMenuOpen: () => {},
                        drawerOpen: mobileDrawerOpen,
                        setDrawerOpen: setMobileDrawerOpen,
                        activeBottomTab,
                        setActiveBottomTab
                      })}
                    </div>
                  )}
                </div>

                {/* Floating Scroll Navigation Toolbar in Preview Canvas */}
                <div className="sticky bottom-4 right-4 ml-auto z-30 flex items-center gap-1.5 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 p-1.5 rounded-full shadow-2xl animate-fade-in text-xs font-semibold">
                  <button
                    type="button"
                    id="btn-scroll-top-canvas"
                    onClick={() => handleScrollToTopPage()}
                    title="Volver al inicio de la página"
                    className="p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-zinc-700" />
                  <button
                    type="button"
                    id="btn-scroll-down-canvas"
                    onClick={() => handleScrollDownPage()}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-full font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                  >
                    <span>Desplazar abajo</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB: BARRAS DE NAVEGACIÓN (NAVBAR STYLES) */}
          {/* ========================================================================= */}
          {activeTab === "navbars" && (
            <>
              {/* Left Navbar Presets Sidebar */}
              <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-500" />
                      1. Elige un Estilo de Navegación:
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {NAVBAR_STYLE_PRESETS.length} variantes
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mb-3">
                    Personaliza cómo interactúan los visitantes con tu marca: cabeceras flotantes con blur, menús desplegables o docks nativos móviles.
                  </p>

                  <div className="space-y-2">
                    {NAVBAR_STYLE_PRESETS.map((nav) => {
                      const isSelected = selectedNavbarStyle === nav.id;
                      return (
                        <div
                          key={nav.id}
                          onClick={() => setSelectedNavbarStyle(nav.id as NavbarStyleType)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between gap-1.5 ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500/80 text-white font-semibold ring-1 ring-amber-500/50"
                              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-zinc-100">{nav.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-medium">
                              {nav.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 leading-normal">
                            {nav.description}
                          </p>
                          <span className="text-[9px] text-zinc-500 uppercase font-semibold">
                            Categoría: {nav.category}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Apply navigation style to project */}
                {onDesignConfigChange && (
                  <div className="pt-3 border-t border-zinc-800 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        onDesignConfigChange({
                          ...designConfig,
                          navbarStyle: selectedNavbarStyle,
                          mobileAppLook: {
                            ...designConfig.mobileAppLook,
                            navigationStyle: selectedNavbarStyle.includes("Bottom")
                              ? "Bottom Tab Bar (iOS/Android)"
                              : selectedNavbarStyle.includes("Dock")
                              ? "Floating Action Dock Pill"
                              : selectedNavbarStyle.includes("Drawer")
                              ? "Slide-In Fullscreen Drawer"
                              : designConfig.mobileAppLook.navigationStyle
                          }
                        });
                        setNavbarAppliedNotice(true);
                        setTimeout(() => setNavbarAppliedNotice(false), 2400);
                      }}
                      className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Aplicar este estilo al proyecto</span>
                    </button>
                    {navbarAppliedNotice && (
                      <p className="text-[11px] text-emerald-400 font-semibold text-center mt-1.5 animate-fade-in">
                        ✓ Estilo "{selectedNavbarStyle}" guardado en el proyecto!
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Right Navbar Interactive Viewport */}
              <div
                id="sample-preview-canvas-navbar"
                className="flex-1 bg-zinc-950/80 p-4 sm:p-6 overflow-y-auto scroll-smooth flex flex-col items-center relative focus:outline-hidden"
              >
                {/* Status Bar */}
                <div className="w-full max-w-5xl mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-200">Estilo Activo: {selectedNavbarStyle}</span>
                    <span>•</span>
                    <span className="text-amber-400">Interactivo con desplazamiento en vivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-400">
                      Desplázate hacia abajo para ver el comportamiento sticky y blur
                    </span>
                    <button
                      type="button"
                      onClick={() => handleScrollDownPage("sample-preview-navbar-viewport")}
                      className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Desplazar abajo</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Viewport Frame */}
                <div
                  id="sample-preview-navbar-viewport"
                  className={`w-full transition-all duration-300 rounded-2xl border shadow-2xl overflow-y-auto scroll-smooth flex flex-col justify-between ${
                    viewport === "desktop"
                      ? "max-w-5xl max-h-[76vh]"
                      : viewport === "tablet"
                      ? "max-w-[768px] max-h-[76vh]"
                      : "max-w-[390px] h-[680px] max-h-[680px] rounded-[38px] border-4 border-zinc-700"
                  } ${
                    previewTheme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                      : "bg-white border-zinc-200 text-zinc-900"
                  }`}
                >
                  {/* Browser / Device Header */}
                  <div className={`sticky top-0 z-20 px-4 py-2 border-b flex items-center justify-between text-[11px] select-none shrink-0 ${
                    previewTheme === "dark"
                      ? "bg-zinc-950/95 backdrop-blur-md border-zinc-800 text-zinc-400"
                      : "bg-zinc-100/95 backdrop-blur-md border-zinc-200 text-zinc-500"
                  }`}>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-zinc-800/40 font-mono text-[10px] text-zinc-400 truncate max-w-xs">
                      https://preview.{clientName.toLowerCase().replace(/\s+/g, "")}.com
                    </div>
                    <div className="text-[10px] uppercase font-bold text-amber-500/80 flex items-center gap-1.5">
                      <span>{viewport}</span>
                      <span className="text-[8px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold">
                        Scroll Ready
                      </span>
                    </div>
                  </div>

                  {/* Render Top Navbar (if not exclusively bottom tab bar) */}
                  {selectedNavbarStyle !== "Bottom Tab Bar (iOS / Android)" && (
                    <div className="sticky top-[37px] z-10 border-b border-zinc-800/40 shrink-0">
                      {renderNavigationBarPreview({
                        style: selectedNavbarStyle,
                        clientName,
                        theme: previewTheme,
                        isMobile: viewport === "mobile",
                        activePalette,
                        megaMenuOpen: navbarMegaMenuOpen,
                        setMegaMenuOpen: setNavbarMegaMenuOpen,
                        drawerOpen: mobileDrawerOpen,
                        setDrawerOpen: setMobileDrawerOpen,
                        activeBottomTab,
                        setActiveBottomTab
                      })}
                    </div>
                  )}

                  {/* Scrollable Website Content Area for Navbar Demonstration */}
                  <div className="flex flex-col divide-y divide-zinc-800/30">
                    {/* Section 1: Contextual Hero */}
                    <div className="p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Demostración de Navegación en Scroll
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-lg">
                        Experiencia de Navegación Diseñada para {clientName}
                      </h2>
                      <p className={`text-xs max-w-md ${previewTheme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Visualiza la jerarquía, contraste dinámico, backdrop-blur y respuesta táctil al desplazarte hacia abajo por las diferentes secciones.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl pt-4">
                        <div className={`p-3 rounded-xl border text-left ${previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                          <div className="text-xs font-bold text-amber-500">Transición Suave</div>
                          <div className="text-[10px] opacity-75 mt-0.5">Adaptable a scroll con blur y contraste dinámico.</div>
                        </div>
                        <div className={`p-3 rounded-xl border text-left ${previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                          <div className="text-xs font-bold text-amber-500">Zero Pill Slop</div>
                          <div className="text-[10px] opacity-75 mt-0.5">Tipografía limpia con microinteracciones sutiles.</div>
                        </div>
                        <div className={`p-3 rounded-xl border text-left ${previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                          <div className="text-xs font-bold text-amber-500">Mobile Ready</div>
                          <div className="text-[10px] opacity-75 mt-0.5">Soporte nativo táctil con drawer y docks inferiores.</div>
                        </div>
                      </div>

                      {/* Scroll Down Prompt Button */}
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => handleScrollDownPage("sample-preview-navbar-viewport")}
                          className="group flex flex-col items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          <span className="text-[10px] font-semibold tracking-wide uppercase opacity-75 group-hover:opacity-100">
                            Desplázate hacia abajo para probar la barra en acción
                          </span>
                          <div className="w-5 h-8 rounded-full border-2 border-zinc-600 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
                            <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Architecture & Capabilities Bento Grid */}
                    <div className="p-8 sm:p-10 space-y-6">
                      <div className="text-center max-w-lg mx-auto space-y-1">
                        <span className="text-[10px] uppercase font-bold text-amber-500">Pilares de Diseño</span>
                        <h3 className={`text-xl font-bold ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                          Sistemas Digitales de Alto Rendimiento
                        </h3>
                        <p className={`text-xs ${previewTheme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                          Observa cómo la barra superior mantiene visibilidad y legibilidad sobre diferentes tonalidades de fondo.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {[
                          { title: "Velocidad Extrema", stat: "99+", desc: "Optimización a 60 FPS sin saltos de layout." },
                          { title: "Accesibilidad WCAG", stat: "AA", desc: "Contraste de color certificado en modo oscuro y claro." },
                          { title: "Touch Native", stat: "100%", desc: "Zonas de pulsación confortables para dedos en smartphones." }
                        ].map((card) => (
                          <div
                            key={card.title}
                            className={`p-4 rounded-xl border space-y-2 ${
                              previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"
                            }`}
                          >
                            <div className="text-2xl font-extrabold text-amber-500">{card.stat}</div>
                            <h4 className={`text-xs font-bold ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>{card.title}</h4>
                            <p className="text-[10px] opacity-75 leading-relaxed">{card.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Live Testimonials & Proof */}
                    <div className="p-8 sm:p-10 space-y-5">
                      <div className="text-center max-w-md mx-auto">
                        <span className="text-[10px] uppercase font-bold text-amber-500">Confianza de Marca</span>
                        <h3 className={`text-xl font-bold ${previewTheme === "dark" ? "text-white" : "text-zinc-900"}`}>
                          Validado por Equipos Exigentes
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className={`p-4 rounded-xl border space-y-2 ${previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                          <p className="text-xs italic opacity-90">
                            "La navegación fluida y los efectos de blur elevan la percepción de nuestra marca de forma inmediata."
                          </p>
                          <div className="text-[10px] font-bold text-amber-400 pt-1 border-t border-zinc-800">
                            Gabriel Torres • Chief Brand Officer
                          </div>
                        </div>
                        <div className={`p-4 rounded-xl border space-y-2 ${previewTheme === "dark" ? "bg-zinc-950/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                          <p className="text-xs italic opacity-90">
                            "Impecable comportamiento en mobile: el menú y el dock inferior se sienten como una app nativa."
                          </p>
                          <div className="text-[10px] font-bold text-amber-400 pt-1 border-t border-zinc-800">
                            Mariana Ortiz • Product Designer
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Call to Action Banner */}
                    <div className={`p-8 sm:p-10 text-center space-y-3 ${previewTheme === "dark" ? "bg-amber-500/10" : "bg-amber-50"}`}>
                      <h3 className={`text-xl font-extrabold ${previewTheme === "dark" ? "text-white" : "text-zinc-950"}`}>
                        ¿Listo para implementar este estilo en tu proyecto?
                      </h3>
                      <p className={`text-xs max-w-md mx-auto ${previewTheme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Haz clic en "Aplicar este estilo al proyecto" en la barra lateral para sincronizarlo con el prompt final.
                      </p>
                    </div>

                    {/* Section 5: Polished Footer */}
                    <footer
                      className={`p-6 sm:p-8 text-xs ${
                        previewTheme === "dark" ? "bg-zinc-950 text-zinc-400 border-t border-zinc-800" : "bg-zinc-100 text-zinc-600 border-t border-zinc-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] opacity-70">
                        <span>© {new Date().getFullYear()} {clientName}. Demostración interactiva de navegación.</span>
                        <span>Desplazamiento vertical fluido verificado ✓</span>
                      </div>
                    </footer>
                  </div>

                  {/* Render Bottom Navbar if Mobile or Bottom Tab Bar selected */}
                  {(viewport === "mobile" || selectedNavbarStyle === "Bottom Tab Bar (iOS / Android)") && (
                    <div className="sticky bottom-0 z-20 border-t border-zinc-800/40 shrink-0 mt-auto bg-zinc-950/95 backdrop-blur-md">
                      {renderNavigationBarPreview({
                        style: "Bottom Tab Bar (iOS / Android)",
                        clientName,
                        theme: previewTheme,
                        isMobile: true,
                        activePalette,
                        megaMenuOpen: false,
                        setMegaMenuOpen: () => {},
                        drawerOpen: mobileDrawerOpen,
                        setDrawerOpen: setMobileDrawerOpen,
                        activeBottomTab,
                        setActiveBottomTab
                      })}
                    </div>
                  )}
                </div>

                {/* Floating Scroll Navigation Toolbar in Navbar Canvas */}
                <div className="sticky bottom-4 right-4 ml-auto z-30 flex items-center gap-1.5 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 p-1.5 rounded-full shadow-2xl animate-fade-in text-xs font-semibold">
                  <button
                    type="button"
                    id="btn-scroll-top-navbar"
                    onClick={() => handleScrollToTopPage("sample-preview-navbar-viewport")}
                    title="Volver al inicio de la página"
                    className="p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-zinc-700" />
                  <button
                    type="button"
                    id="btn-scroll-down-navbar"
                    onClick={() => handleScrollDownPage("sample-preview-navbar-viewport")}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-full font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                  >
                    <span>Desplazar abajo</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: EFECTOS Y MÓDULOS ESPECIALES (SPECIAL FEATURES) */}
          {/* ========================================================================= */}
          {activeTab === "features" && (
            <>
              {/* Features List Sidebar */}
              <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0 overflow-y-auto p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Efectos Interactivos Disponibles:
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {chosenFeatures.length} activos
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Pasa el cursor sobre cualquier efecto para ver la ficha flotante explicativa o haz clic para interactuar en vivo.
                  </p>
                </div>

                <div className="space-y-2">
                  {featuresList.map((feat, idx) => {
                    const isSelectedInList = activeFeatureIndex === idx;
                    const isInProject = chosenFeatures.includes(feat.id);
                    return (
                      <div
                        key={feat.id}
                        id={`preview-feat-card-${feat.id.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => setActiveFeatureIndex(idx)}
                        onMouseEnter={(e) => handleFeatureMouseEnter(feat, e)}
                        onMouseMove={handleFeatureMouseMove}
                        onMouseLeave={handleFeatureMouseLeave}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between gap-2 group relative overflow-hidden ${
                          isSelectedInList
                            ? "bg-amber-500/15 border-amber-500/90 text-white shadow-xs ring-1 ring-amber-500/50"
                            : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                      >
                        {isSelectedInList && (
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500" />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded bg-zinc-800/80 border border-zinc-750 shrink-0">
                                {getFeatureIcon(feat.id)}
                              </div>
                              <span className="font-bold text-zinc-100 truncate">{feat.name}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-amber-400 font-semibold border border-zinc-700 shrink-0">
                                {feat.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400 leading-tight line-clamp-2 mt-0.5">
                              {feat.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-zinc-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {isSelectedInList ? (
                              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                                <Eye className="w-3 h-3 text-amber-500" />
                                <span>En Vista Previa</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-zinc-500 flex items-center gap-1 group-hover:text-amber-400/90 transition-colors">
                                <Eye className="w-3 h-3 text-zinc-500 group-hover:text-amber-400" />
                                <span>Haz clic para probar</span>
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFeature(feat.id);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 cursor-pointer ${
                              isInProject
                                ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-2xs"
                                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                            }`}
                          >
                            {isInProject ? "✓ Añadido" : "+ Añadir"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feature Live Interactive Demonstration Viewport */}
              <div
                id="sample-preview-canvas-features"
                className="flex-1 bg-zinc-950/80 p-4 sm:p-6 overflow-y-auto scroll-smooth flex flex-col items-center focus:outline-hidden"
              >
                {(() => {
                  const currentActiveFeature = featuresList[activeFeatureIndex] || featuresList[0];
                  return (
                    <div className="w-full max-w-4xl space-y-4 py-2 min-h-0">
                      {/* Top Canvas Navigation & Feature Switcher Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-zinc-800 bg-zinc-900/60 p-3 rounded-2xl border">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveFeatureIndex((prev) => (prev - 1 + featuresList.length) % featuresList.length)}
                            title="Ver efecto anterior"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFeatureIndex((prev) => (prev + 1) % featuresList.length)}
                            title="Ver siguiente efecto"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                            Efecto {activeFeatureIndex + 1} de {featuresList.length}
                          </span>
                        </div>

                        {/* Quick Jump Buttons for All 9 Features */}
                        <div className="flex items-center gap-1 flex-wrap">
                          {featuresList.map((f, i) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setActiveFeatureIndex(i)}
                              title={f.name}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                activeFeatureIndex === i
                                  ? "bg-amber-500 text-zinc-950 shadow-xs"
                                  : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-750"
                              }`}
                            >
                              0{i + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Header info about the current demo */}
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-3">
                        <div>
                          <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            {currentActiveFeature.category}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                            {currentActiveFeature.name}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
                            {currentActiveFeature.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => onToggleFeature(currentActiveFeature.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${
                              chosenFeatures.includes(currentActiveFeature.id)
                                ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                            }`}
                          >
                            {chosenFeatures.includes(currentActiveFeature.id) ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>✓ Incluido en el Proyecto</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>+ Incluir en el Proyecto</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Feature Interactive Mock */}
                      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl min-h-[360px] flex flex-col justify-center">
                        {renderFeatureInteractiveDemo({
                          featureId: currentActiveFeature.id,
                          carouselSlide,
                          setCarouselSlide,
                          isCarouselPlaying,
                          setIsCarouselPlaying,
                          animationReplayKey,
                          setAnimationReplayKey,
                          gridFilter,
                          setGridFilter,
                          formSubmitted,
                          setFormSubmitted,
                          formName,
                          setFormName,
                          formEmail,
                          setFormEmail,
                          formMsg,
                          setFormMsg,
                          megaMenuOpen,
                          setMegaMenuOpen,
                          parallaxOffset,
                          setParallaxOffset,
                          clientName,
                          previewTheme,
                          setPreviewTheme,
                          selectedNavbarStyle,
                          setSelectedNavbarStyle,
                          activePalette,
                          activeBottomTab,
                          setActiveBottomTab
                        })}
                      </div>

                      {/* Feature Deep Dive Info Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                          <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Capacidades de Interacción Clave:</span>
                          </div>
                          <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                            {currentActiveFeature.highlights?.map((h, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-tight">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                          <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                            <Info className="w-3.5 h-3.5 text-amber-400" />
                            <span>Implementación & Conversión:</span>
                          </div>
                          <p className="text-[11px] text-zinc-300 leading-relaxed">
                            {currentActiveFeature.benefits}
                          </p>
                          <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400">
                            <span className="font-semibold text-zinc-300">Detalle Técnico: </span>
                            {currentActiveFeature.techDetails}
                          </div>
                        </div>
                      </div>

                      {/* Floating Scroll Navigation Toolbar in Preview Canvas */}
                      <div className="sticky bottom-4 right-4 ml-auto z-30 flex items-center gap-1.5 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 p-1.5 rounded-full shadow-2xl animate-fade-in text-xs font-semibold">
                        <button
                          type="button"
                          id="btn-scroll-top-features-canvas"
                          onClick={() => handleScrollToTopPage("sample-preview-canvas-features")}
                          title="Volver al inicio de la demostración"
                          className="p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <div className="h-4 w-px bg-zinc-700" />
                        <button
                          type="button"
                          id="btn-scroll-down-features-canvas"
                          onClick={() => handleScrollDownPage("sample-preview-canvas-features")}
                          className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-full font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                        >
                          <span>Desplazar abajo</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ESTILO VISUAL, TIPOGRAFÍA 3D Y COLORES (DESIGN & 3D) */}
          {/* ========================================================================= */}
          {activeTab === "design" && (
            <>
              {/* Left Controls */}
              <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
                
                {/* 3D Effect Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1. Efecto 3D en Títulos:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "floating_elevation", name: "Floating Elevation" },
                      { id: "neon_glow_3d", name: "Neon Glow 3D" },
                      { id: "metallic_emboss", name: "Metallic Emboss" },
                      { id: "isometric_layered", name: "Isometric Layered" },
                      { id: "perspective_tilt", name: "Perspective Tilt" },
                      { id: "glass_relief_3d", name: "Glass Relief 3D" }
                    ].map((eff) => {
                      const isSelected = preview3DEffect === eff.id;
                      return (
                        <button
                          key={eff.id}
                          onClick={() => setPreview3DEffect(eff.id as Title3DEffectType)}
                          className={`p-2 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500 text-white font-semibold"
                              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {eff.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Font Family Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-amber-500" />
                    2. Familia Tipográfica:
                  </label>
                  <div className="space-y-1">
                    {[
                      "Space Grotesk",
                      "Playfair Display",
                      "Cinzel",
                      "Plus Jakarta Sans",
                      "Syne",
                      "Bebas Neue",
                      "JetBrains Mono",
                      "Cormorant Garamond"
                    ].map((fontName) => {
                      const isSelected = previewFont === fontName;
                      return (
                        <button
                          key={fontName}
                          onClick={() => setPreviewFont(fontName as TitleFontFamily)}
                          className={`w-full p-2 rounded-lg text-left border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500 text-amber-200 font-semibold"
                              : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                          }`}
                        >
                          <span className={getFontFamilyClass(fontName as TitleFontFamily)}>{fontName}</span>
                          {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Palette Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-500" />
                    3. Paleta de Colores:
                  </label>
                  <div className="space-y-1.5">
                    {CURATED_COLOR_PALETTES.map((pal) => {
                      const isSelected = previewPaletteId === pal.id;
                      return (
                        <div
                          key={pal.id}
                          onClick={() => setPreviewPaletteId(pal.id)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-zinc-900 border-amber-500 text-white shadow-xs"
                              : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                          }`}
                        >
                          <div>
                            <span className="block font-semibold">{pal.name}</span>
                            <span className="block text-[10px] text-zinc-500">{pal.category}</span>
                          </div>
                          <div className="flex items-center space-x-1 shrink-0">
                            <div className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: pal.primary }} />
                            <div className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: pal.secondary }} />
                            <div className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: pal.accent }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Corner Rounding Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <label className="text-xs font-bold text-zinc-300">
                    4. Radio de Bordes (Borders):
                  </label>
                  <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold">
                    {[
                      { label: "Sharp 0px", value: "rounded-none" },
                      { label: "Subtle 6px", value: "rounded-md" },
                      { label: "Smooth 16px", value: "rounded-2xl" },
                      { label: "Full Pill", value: "rounded-full" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setPreviewRounding(item.value)}
                        className={`p-1.5 border text-center transition-all ${
                          previewRounding === item.value
                            ? "bg-amber-500 text-zinc-950 border-amber-500"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Design to Project */}
                {onDesignConfigChange && (
                  <div className="pt-2 border-t border-zinc-800 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        onDesignConfigChange({
                          ...designConfig,
                          paletteId: activePalette.id,
                          colors: {
                            primary: activePalette.primary,
                            secondary: activePalette.secondary,
                            background: activePalette.background,
                            surface: activePalette.surface,
                            text: activePalette.text,
                            accent: activePalette.accent
                          },
                          titleFontStyle: {
                            ...designConfig.titleFontStyle,
                            fontFamily: previewFont
                          },
                          title3DEffect: {
                            ...designConfig.title3DEffect,
                            effectType: preview3DEffect
                          }
                        });
                        setAppliedNotice(true);
                        setTimeout(() => setAppliedNotice(false), 2000);
                      }}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Guardar Estilo en el Proyecto</span>
                    </button>
                    {appliedNotice && (
                      <p className="text-[10px] text-emerald-400 text-center font-bold mt-1">
                        ✓ Estilos sincronizados con el proyecto
                      </p>
                    )}
                  </div>
                )}

              </div>

              {/* Right Canvas: Live 3D Title + Mock UI Component Demo */}
              <div
                id="sample-preview-canvas-design"
                className="flex-1 bg-zinc-950/80 p-6 overflow-y-auto scroll-smooth flex flex-col items-center space-y-6"
              >
                
                {/* 3D Headline Studio Box */}
                <div
                  className="w-full max-w-3xl p-8 rounded-3xl border transition-all text-center flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundColor: activePalette.background,
                    borderColor: `${activePalette.primary}33`,
                    color: activePalette.text
                  }}
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    Previsualización de Efecto 3D y Tipografía
                  </span>

                  {/* Interactive Headline Input */}
                  <div className="w-full max-w-md">
                    <input
                      type="text"
                      value={previewHeadlineText}
                      onChange={(e) => setPreviewHeadlineText(e.target.value)}
                      placeholder="Escribe tu título aquí..."
                      className="w-full text-center text-xs p-1.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  {/* The Live Rendered 3D Headline */}
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-all duration-300 py-4 ${getFontFamilyClass(
                      previewFont
                    )} ${get3DEffectClass(preview3DEffect)}`}
                    style={{
                      color: preview3DEffect === "neon_glow_3d" ? activePalette.accent : activePalette.text
                    }}
                  >
                    {previewHeadlineText || "ARQUITECTURA DIGITAL"}
                  </h1>

                  <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                    Efecto activo: <strong className="text-white">{preview3DEffect}</strong> • Fuente: <strong className="text-white">{previewFont}</strong> • Paleta: <strong className="text-white">{activePalette.name}</strong>
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      className={`px-4 py-2 font-bold text-xs shadow-md transition-all ${previewRounding}`}
                      style={{
                        backgroundColor: activePalette.primary,
                        color: activePalette.background
                      }}
                    >
                      Botón de Acción
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-xs border transition-all ${previewRounding}`}
                      style={{
                        borderColor: activePalette.accent,
                        color: activePalette.accent
                      }}
                    >
                      Ver Portafolio
                    </button>
                  </div>
                </div>

                {/* Component Surface Mock using palette & rounding */}
                <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    className={`p-4 border transition-all ${previewRounding}`}
                    style={{
                      backgroundColor: activePalette.surface,
                      borderColor: `${activePalette.primary}22`,
                      color: activePalette.text
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center font-bold" style={{ backgroundColor: `${activePalette.primary}25`, color: activePalette.primary }}>
                      01
                    </div>
                    <h4 className="text-xs font-bold mb-1">Estructura Modular</h4>
                    <p className="text-[11px] opacity-70">
                      Componentes desacoplados y adaptables a cualquier dispositivo.
                    </p>
                  </div>

                  <div
                    className={`p-4 border transition-all ${previewRounding}`}
                    style={{
                      backgroundColor: activePalette.surface,
                      borderColor: `${activePalette.accent}33`,
                      color: activePalette.text
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center font-bold" style={{ backgroundColor: `${activePalette.accent}25`, color: activePalette.accent }}>
                      02
                    </div>
                    <h4 className="text-xs font-bold mb-1">Tokens de Color</h4>
                    <p className="text-[11px] opacity-70">
                      Primary: {activePalette.primary} • Accent: {activePalette.accent}
                    </p>
                  </div>

                  <div
                    className={`p-4 border transition-all ${previewRounding}`}
                    style={{
                      backgroundColor: activePalette.surface,
                      borderColor: `${activePalette.secondary}22`,
                      color: activePalette.text
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center font-bold" style={{ backgroundColor: `${activePalette.secondary}25`, color: activePalette.secondary }}>
                      03
                    </div>
                    <h4 className="text-xs font-bold mb-1">Radio de Bordes</h4>
                    <p className="text-[11px] opacity-70">
                      Clase aplicada: <code className="font-mono">{previewRounding}</code>
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

      </div>

      {/* Floating Window (Hover Description Popover) */}
      {hoveredFeature && (
        <div
          role="tooltip"
          aria-label={hoveredFeature.feature.name}
          className="fixed z-[100] w-80 sm:w-96 max-w-[calc(100vw-32px)] pointer-events-none transition-all duration-150 animate-fade-in"
          style={{
            left: Math.min(hoveredFeature.x, typeof window !== "undefined" ? Math.max(16, window.innerWidth - 390) : 600),
            top: Math.max(20, Math.min(hoveredFeature.y, typeof window !== "undefined" ? Math.max(20, window.innerHeight - 440) : 200))
          }}
        >
          <div className="bg-zinc-950/95 backdrop-blur-xl border border-amber-500/50 rounded-2xl p-4 shadow-2xl text-zinc-100 ring-2 ring-amber-500/20 relative overflow-hidden">
            {/* Top gradient glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
            
            {/* Header: Category + Badge */}
            <div className="flex items-center justify-between gap-2 mb-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs">
                  {getFeatureIcon(hoveredFeature.feature.id)}
                </div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  {hoveredFeature.feature.category}
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-amber-400 border border-zinc-700">
                {hoveredFeature.feature.badge}
              </span>
            </div>

            {/* Feature Name */}
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>{hoveredFeature.feature.name}</span>
            </h4>

            {/* Detailed Description */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {hoveredFeature.feature.description}
            </p>

            {/* Highlights bullet list */}
            {hoveredFeature.feature.highlights && hoveredFeature.feature.highlights.length > 0 && (
              <div className="bg-zinc-900/80 rounded-xl p-2.5 border border-zinc-800 space-y-1.5 mb-3 text-[11px]">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Capacidades Principales</span>
                </div>
                {hoveredFeature.feature.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Impact / Benefits */}
            {hoveredFeature.feature.benefits && (
              <div className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-800/40 rounded-lg p-2 mb-3">
                <strong className="text-amber-400 font-semibold block text-[10px] uppercase mb-0.5">Impacto en Conversión & UX:</strong>
                {hoveredFeature.feature.benefits}
              </div>
            )}

            {/* Footer with inclusion status */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
              <span className={chosenFeatures.includes(hoveredFeature.feature.id) ? "text-emerald-400 font-semibold flex items-center gap-1" : "text-zinc-400"}>
                {chosenFeatures.includes(hoveredFeature.feature.id) ? "✓ Añadido al proyecto" : "+ No incluido aún"}
              </span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <span>Haz clic para previsualizar</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// RENDER SECTION LIVE PREVIEW HELPER
// =========================================================================
function renderSectionLivePreview({
  sectionId,
  layout,
  submodules,
  enhancements,
  clientName,
  theme
}: {
  sectionId: string;
  layout: string;
  submodules: string[];
  enhancements: string[];
  clientName: string;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const bgCard = isDark ? "bg-zinc-850/80 border-zinc-800" : "bg-zinc-50 border-zinc-200";
  const textMuted = isDark ? "text-zinc-400" : "text-zinc-500";
  const textTitle = isDark ? "text-white" : "text-zinc-900";

  switch (sectionId) {
    case "home":
      return (
        <div className="space-y-6">
          {/* Glassmorphic Nav Enhancement */}
          {enhancements.includes("glassmorphism_nav") && (
            <div className={`p-2.5 px-4 rounded-xl border backdrop-blur-md flex items-center justify-between shadow-xs ${
              isDark ? "bg-zinc-900/60 border-zinc-700/60" : "bg-white/70 border-zinc-300/80"
            }`}>
              <span className="font-bold text-xs tracking-tight text-amber-500">{clientName}</span>
              <div className="flex items-center gap-3 text-[11px] font-medium opacity-80">
                <span>Servicios</span>
                <span>Proyectos</span>
                <span>Precios</span>
              </div>
              <button className="px-2.5 py-1 bg-amber-500 text-zinc-950 font-bold rounded-lg text-[10px]">
                Contacto
              </button>
            </div>
          )}

          {/* Hero Content Based on Layout */}
          {layout.includes("Bento") ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`md:col-span-2 p-6 rounded-2xl border ${bgCard} flex flex-col justify-between space-y-4`}>
                <div className="space-y-2">
                  {enhancements.includes("floating_badge") && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      ⭐️ 4.9/5 Calificación de más de 800 clientes
                    </span>
                  )}
                  <h2 className={`text-2xl sm:text-3xl font-extrabold ${textTitle} leading-tight`}>
                    Construyendo el futuro digital de {clientName}
                  </h2>
                  <p className={`text-xs ${textMuted} max-w-md`}>
                    Soluciones integrales de alto impacto diseñadas con precisión técnica y estética refinada.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button className="px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs">
                    Comenzar Ahora
                  </button>
                  <button className={`px-4 py-2 border rounded-xl text-xs ${isDark ? "border-zinc-700 text-zinc-300" : "border-zinc-300 text-zinc-700"}`}>
                    Ver Casos de Éxito
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {submodules.includes("stats_counter") && (
                  <div className={`p-4 rounded-2xl border ${bgCard}`}>
                    <div className="text-2xl font-extrabold text-amber-400">99.8%</div>
                    <div className="text-[11px] font-semibold text-zinc-300">Satisfacción Verificada</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">En más de 140 implementaciones</div>
                  </div>
                )}
                {submodules.includes("featured_preview") && (
                  <div className={`p-4 rounded-2xl border ${bgCard}`}>
                    <div className="text-[10px] font-bold uppercase text-amber-500">Destacado</div>
                    <div className="text-xs font-bold text-zinc-200 mt-1">Plataforma Cloud v3</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Arquitectura escalable para enterprise</div>
                  </div>
                )}
              </div>
            </div>
          ) : layout.includes("Video") ? (
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black min-h-[300px] flex items-center justify-center p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10" />
              <div className="relative z-20 max-w-xl space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                  Full-Width Ambient Video
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  Innovación sin precedentes para {clientName}
                </h2>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  La intersección perfecta entre diseño editorial, ingeniería de software y resultados comerciales.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button className="px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" /> Reproducir Reel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Split Headline + CTA Default */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                {enhancements.includes("floating_badge") && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Nueva Colección 2026
                  </div>
                )}
                <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${textTitle} leading-tight`}>
                  Elevando la experiencia de <span className="text-amber-500">{clientName}</span>
                </h1>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  Diseñado para convertir visitantes en clientes leales mediante flujos intuitivos, navegación fluida y rendimiento instantáneo.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-2">
                    <span>Explorar Ahora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button className={`px-4 py-2.5 border rounded-xl text-xs font-semibold ${isDark ? "border-zinc-700 text-zinc-200" : "border-zinc-300 text-zinc-800"}`}>
                    Agendar Demo
                  </button>
                </div>
              </div>

              {/* Right column showcase preview */}
              <div className={`p-5 rounded-2xl border ${bgCard} space-y-3`}>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-700/50">
                  <span className="text-xs font-bold text-amber-400">Resumen de Métricas</span>
                  <span className="text-[10px] text-zinc-400">Actualizado hoy</span>
                </div>
                {submodules.includes("stats_counter") && (
                  <div className="grid grid-cols-2 gap-2 text-center py-2">
                    <div className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-800">
                      <div className="text-lg font-bold text-white">+240%</div>
                      <div className="text-[9px] text-zinc-400">Conversión Web</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-800">
                      <div className="text-lg font-bold text-amber-400">&lt; 0.4s</div>
                      <div className="text-[9px] text-zinc-400">Velocidad de Carga</div>
                    </div>
                  </div>
                )}
                {submodules.includes("social_proof_bar") && (
                  <div className="pt-2 text-[10px] text-zinc-400 text-center border-t border-zinc-800/80">
                    Marcas que confían en nosotros: <strong>STRIPE</strong> • <strong>VERCEL</strong> • <strong>FIGMA</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Proof Bar submodule */}
          {submodules.includes("social_proof_bar") && !layout.includes("Split") && (
            <div className={`py-3 px-4 rounded-xl border text-center text-xs ${bgCard}`}>
              <span className="text-[11px] opacity-70">Marcas aliadas: </span>
              <strong className="font-bold tracking-wider mx-2">TECHCRUNCH</strong> • 
              <strong className="font-bold tracking-wider mx-2">FORBES</strong> • 
              <strong className="font-bold tracking-wider mx-2">WIRED</strong> • 
              <strong className="font-bold tracking-wider mx-2">BLOOMBERG</strong>
            </div>
          )}
        </div>
      );

    case "services":
      return (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
              Nuestros Servicios & Soluciones
            </span>
            <h2 className={`text-2xl font-bold ${textTitle}`}>
              Capacidades estratégicas para hacer crecer tu marca
            </h2>
          </div>

          {/* Category Tabs submodule */}
          {submodules.includes("service_tabs") && (
            <div className="flex items-center justify-center gap-1.5 pb-2">
              {["Todos", "Desarrollo", "Diseño UI/UX", "Estrategia"].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    i === 0
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : isDark ? "bg-zinc-800 text-zinc-400" : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: "Desarrollo Web Full-Stack",
                desc: "Aplicaciones web modernas con React, Next.js y APIs seguras.",
                deliverables: ["Código TypeScript optimizado", "Integración con bases de datos", "Despliegue automatizado"]
              },
              {
                title: "Diseño UI/UX & Sistemas",
                desc: "Interfaces estéticas orientadas a la conversión y retención.",
                deliverables: ["Figma design system completo", "Prototipado interactivo", "Microinteracciones fluidas"]
              },
              {
                title: "Optimización de Rendimiento",
                desc: "Auditoría integral, SEO técnico y velocidad de carga instantánea.",
                deliverables: ["100/100 Google Lighthouse", "Estrategia CDN global", "SEO semántico completo"]
              }
            ].map((srv, idx) => (
              <div
                key={srv.title}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${bgCard} ${
                  enhancements.includes("hover_zoom") ? "hover:scale-[1.02] hover:border-amber-400/80 cursor-pointer" : ""
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{srv.title}</h4>
                  <p className={`text-[10px] ${textMuted}`}>{srv.desc}</p>
                </div>

                {submodules.includes("deliverables_list") && (
                  <div className="space-y-1 pt-2 border-t border-zinc-800/80">
                    <span className="text-[9px] uppercase font-bold text-zinc-400">Entregables:</span>
                    {srv.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                {submodules.includes("booking_cta") && (
                  <button className="w-full py-1.5 bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 text-xs font-semibold rounded-lg transition-colors">
                    Solicitar Presupuesto
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Enhancement: Price Estimator */}
          {enhancements.includes("price_estimator") && (
            <div className={`p-4 rounded-xl border ${bgCard} flex flex-col sm:flex-row items-center justify-between gap-3`}>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Estimador Interactivo de Proyecto
                </span>
                <p className={`text-[10px] ${textMuted}`}>
                  Calcula el costo aproximado según el alcance y tiempo de entrega requerido.
                </p>
              </div>
              <button className="px-3.5 py-1.5 bg-amber-500 text-zinc-950 font-bold rounded-lg text-xs shrink-0">
                Calcular Cotización
              </button>
            </div>
          )}
        </div>
      );

    case "pricing":
      return (
        <div className="space-y-5">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
              Planes de Inversión
            </span>
            <h2 className={`text-2xl font-bold ${textTitle}`}>
              Precios transparentes sin costos ocultos
            </h2>
          </div>

          {/* Billing Switcher submodule */}
          {submodules.includes("billing_toggle") && (
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-zinc-400">Mensual</span>
              <div className="w-9 h-5 bg-amber-500 rounded-full relative p-0.5 cursor-pointer">
                <div className="w-4 h-4 bg-zinc-950 rounded-full ml-auto" />
              </div>
              <span className="text-white font-bold flex items-center gap-1">
                Anual <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">Ahorra 20%</span>
              </span>
            </div>
          )}

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Starter", price: "$490", desc: "Para proyectos iniciales y MVPs rápidos", popular: false },
              { name: "Professional", price: "$1,290", desc: "Nuestra solución más demandada para empresas en crecimiento", popular: true },
              { name: "Enterprise", price: "$2,890", desc: "Infraestructura a medida con soporte prioritario 24/7", popular: false }
            ].map((plan) => {
              const isPop = plan.popular && submodules.includes("popular_badge");
              return (
                <div
                  key={plan.name}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 relative ${
                    isPop
                      ? "bg-zinc-900 border-amber-500 ring-2 ring-amber-500/40 shadow-xl"
                      : bgCard
                  }`}
                >
                  {isPop && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[9px] uppercase tracking-wider">
                      Más Popular
                    </span>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-[10px] text-zinc-400">/mes</span>
                    </div>
                    <p className={`text-[10px] ${textMuted}`}>{plan.desc}</p>
                  </div>

                  {submodules.includes("feature_checklist") && (
                    <div className="space-y-1.5 text-[10px] text-zinc-300 pt-2 border-t border-zinc-800">
                      <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Diseño Responsive Completo</div>
                      <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Soporte e iteraciones activas</div>
                      <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> SEO técnico de alto nivel</div>
                    </div>
                  )}

                  <button
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      isPop
                        ? "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                  >
                    Seleccionar Plan
                  </button>
                </div>
              );
            })}
          </div>

          {/* Guarantee Seal Enhancement */}
          {enhancements.includes("guarantee_badge") && (
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de satisfacción de 30 días • Cancelación en cualquier momento</span>
            </div>
          )}
        </div>
      );

    case "portfolio":
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-500">Portafolio</span>
              <h3 className={`text-xl font-bold ${textTitle}`}>Proyectos Seleccionados</h3>
            </div>
            {submodules.includes("category_filters") && (
              <div className="flex items-center gap-1 text-[10px]">
                <span className="px-2.5 py-1 bg-amber-500 text-zinc-950 font-bold rounded-md">Todos</span>
                <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-md">Fintech</span>
                <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-md">E-Commerce</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Plataforma Fintech Orion", cat: "Banca Digital", stat: "+180% Registros" },
              { title: "Studio E-Commerce Luxury", cat: "Moda & Retail", stat: "3.2x Ventas" }
            ].map((p) => (
              <div key={p.title} className={`p-4 rounded-xl border ${bgCard} space-y-3`}>
                <div className="h-28 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-600 text-xs font-mono">
                  [Imagen de Proyecto en Alta Fidelidad]
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.title}</h4>
                    <span className="text-[10px] text-zinc-400">{p.cat}</span>
                  </div>
                  {submodules.includes("results_metrics") && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      {p.stat}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "testimonials":
      return (
        <div className="space-y-4">
          <div className="text-center max-w-md mx-auto">
            <span className="text-[10px] uppercase font-bold text-amber-500">Opiniones</span>
            <h3 className={`text-xl font-bold ${textTitle}`}>Lo que dicen nuestros clientes</h3>
          </div>

          {submodules.includes("rating_summary") && (
            <div className="flex items-center justify-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-zinc-500">• más de 120 opiniones verificadas</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "Carolina Méndez", role: "Directora de Operaciones", quote: "Trabajar con ellos transformó completamente nuestra conversión online. El diseño es impecable." },
              { name: "Alejandro Silva", role: "Founder & CEO", quote: "Puntualidad, calidad gráfica excepcional y código limpio listo para producción." }
            ].map((t) => (
              <div key={t.name} className={`p-4 rounded-xl border ${bgCard} space-y-2`}>
                <p className={`text-xs italic ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-zinc-400">{t.role}</div>
                  </div>
                  {submodules.includes("verified_badge") && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-bold">
                      ✓ Verificado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="space-y-4">
          <div className="text-center max-w-md mx-auto">
            <span className="text-[10px] uppercase font-bold text-amber-500">Contacto</span>
            <h3 className={`text-xl font-bold ${textTitle}`}>Conversemos sobre tu proyecto</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Form */}
            {submodules.includes("inquiry_form") && (
              <div className={`p-4 rounded-xl border ${bgCard} space-y-2.5`}>
                <div>
                  <label className="text-[10px] font-semibold text-zinc-300">Nombre completo</label>
                  <input type="text" placeholder="Tu nombre" className="w-full text-xs p-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-zinc-300">Correo corporativo</label>
                  <input type="email" placeholder="nombre@empresa.com" className="w-full text-xs p-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-zinc-300">Mensaje o requerimiento</label>
                  <textarea rows={2} placeholder="Cuéntanos sobre tu idea..." className="w-full text-xs p-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white" />
                </div>
                <button className="w-full py-1.5 bg-amber-500 text-zinc-950 font-bold rounded-lg text-xs">
                  Enviar Mensaje
                </button>
              </div>
            )}

            {/* Address & Hours */}
            <div className="space-y-3">
              {submodules.includes("address_hours") && (
                <div className={`p-4 rounded-xl border ${bgCard} space-y-1 text-xs`}>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> Estudio Principal
                  </div>
                  <p className="text-[11px] text-zinc-400">Av. Libertador 450, Piso 8, Ciudad Empresarial</p>
                  <p className="text-[10px] text-zinc-500">Lunes a Viernes • 09:00 - 18:00 hrs</p>
                </div>
              )}

              {submodules.includes("chat_buttons") && (
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                  <button className="p-2.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Correo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case "about":
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                Sobre Nosotros & Nuestra Misión
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${textTitle} leading-tight`}>
                Pasión por la excelencia artesanal e ingeniería de vanguardia
              </h2>
              <p className={`text-xs ${textMuted} leading-relaxed`}>
                Fundados con la visión de fusionar estética de alto nivel y robustez técnica, creamos experiencias memorables para marcas que lideran su categoría.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className={`p-3 rounded-xl border ${bgCard}`}>
                  <div className="text-xl font-bold text-amber-400">8+</div>
                  <div className="text-[10px] text-zinc-400">Años de Trayectoria</div>
                </div>
                <div className={`p-3 rounded-xl border ${bgCard}`}>
                  <div className="text-xl font-bold text-emerald-400">100%</div>
                  <div className="text-[10px] text-zinc-400">Satisfacción Garantizada</div>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-2xl border ${bgCard} space-y-4`}>
              <div className="h-40 rounded-xl bg-gradient-to-tr from-amber-500/20 via-zinc-800 to-zinc-900 border border-zinc-700/60 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
                <span className="text-xs font-bold text-white">Nuestra Filosofía de Trabajo</span>
                <span className="text-[10px] text-zinc-400 mt-1 max-w-xs">
                  Cada detalle cuenta: tipografía cuidada, jerarquía espacial, microinteracciones fluidas y rendimiento extremo.
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`p-6 rounded-2xl border text-center space-y-2 ${bgCard}`}>
          <h3 className="text-base font-bold text-white">{sectionId.toUpperCase()}</h3>
          <p className="text-xs text-zinc-400">
            Layout seleccionado: <strong className="text-amber-400">{layout}</strong>
          </p>
          <div className="text-[11px] text-zinc-500">
            {submodules.length} submódulos y {enhancements.length} mejoras activas.
          </div>
        </div>
      );
  }
}

// =========================================================================
// RENDER FEATURE INTERACTIVE DEMO HELPER
// =========================================================================
function renderFeatureInteractiveDemo({
  featureId,
  carouselSlide,
  setCarouselSlide,
  isCarouselPlaying,
  setIsCarouselPlaying,
  animationReplayKey,
  setAnimationReplayKey,
  gridFilter,
  setGridFilter,
  formSubmitted,
  setFormSubmitted,
  formName,
  setFormName,
  formEmail,
  setFormEmail,
  formMsg,
  setFormMsg,
  megaMenuOpen,
  setMegaMenuOpen,
  parallaxOffset,
  setParallaxOffset,
  clientName,
  previewTheme,
  setPreviewTheme,
  selectedNavbarStyle,
  setSelectedNavbarStyle,
  activePalette,
  activeBottomTab,
  setActiveBottomTab
}: any) {
  switch (featureId) {
    case "Navigation Bar Styles":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800">
            <div>
              <div className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                Estilo Actual: <span className="text-amber-400 font-extrabold">{selectedNavbarStyle}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Selecciona una variante de barra de navegación para interactuar con sus menús y estados en tiempo real.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {NAVBAR_STYLE_PRESETS.map((p) => {
                const isActive = selectedNavbarStyle === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedNavbarStyle && setSelectedNavbarStyle(p.id as NavbarStyleType)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-zinc-950 font-bold shadow-xs"
                        : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    }`}
                  >
                    {p.name.replace("Dropdown", "").trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive frame showcasing the navbar */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl">
            {/* Top Bar Preview */}
            {selectedNavbarStyle !== "Bottom Tab Bar (iOS / Android)" && (
              <div className="border-b border-zinc-800/60">
                {renderNavigationBarPreview({
                  style: selectedNavbarStyle,
                  clientName,
                  theme: previewTheme,
                  isMobile: false,
                  activePalette: activePalette || { primary: "#06B6D4", background: "#090D16", accent: "#22D3EE" },
                  megaMenuOpen,
                  setMegaMenuOpen,
                  drawerOpen: false,
                  setDrawerOpen: () => {},
                  activeBottomTab,
                  setActiveBottomTab
                })}
              </div>
            )}

            <div className="p-8 sm:p-12 text-center space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {NAVBAR_STYLE_PRESETS.find(p => p.id === selectedNavbarStyle)?.category || "Navegación Interactiva"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {selectedNavbarStyle}
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                {NAVBAR_STYLE_PRESETS.find(p => p.id === selectedNavbarStyle)?.description}
              </p>
              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-zinc-500">
                <span>✓ Hover con micro-interacciones</span>
                <span>•</span>
                <span>✓ Conectado a anclajes semánticos (#services, #contact)</span>
              </div>
            </div>

            {/* Bottom Tab Bar (if selected) */}
            {selectedNavbarStyle === "Bottom Tab Bar (iOS / Android)" && (
              <div className="border-t border-zinc-800/60">
                {renderNavigationBarPreview({
                  style: "Bottom Tab Bar (iOS / Android)",
                  clientName,
                  theme: previewTheme,
                  isMobile: true,
                  activePalette: activePalette || { primary: "#06B6D4", background: "#090D16", accent: "#22D3EE" },
                  megaMenuOpen: false,
                  setMegaMenuOpen: () => {},
                  drawerOpen: false,
                  setDrawerOpen: () => {},
                  activeBottomTab,
                  setActiveBottomTab
                })}
              </div>
            )}
          </div>
        </div>
      );

    case "Animated Slides":
      return (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-950 h-56 flex items-center justify-center p-6 text-center shadow-lg">
            {/* Carousel Slides */}
            {carouselSlide === 0 && (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold uppercase">
                  Slide 01 • Innovación
                </span>
                <h3 className="text-2xl font-extrabold text-white">Arquitectura Digital de Vanguardia</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Experiencias fluidas construidas para cautivar usuarios desde el primer segundo.
                </p>
              </div>
            )}
            {carouselSlide === 1 && (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold uppercase">
                  Slide 02 • Rendimiento
                </span>
                <h3 className="text-2xl font-extrabold text-white">Velocidad Instantánea & SEO</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Carga optimizada en menos de 0.5 segundos y máxima puntuación Core Web Vitals.
                </p>
              </div>
            )}
            {carouselSlide === 2 && (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                  Slide 03 • Conversión
                </span>
                <h3 className="text-2xl font-extrabold text-white">Resultados Medibles y Retención</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Diseñado para impulsar ventas con flujos de navegación sin fricción.
                </p>
              </div>
            )}

            {/* Carousel Nav Arrows */}
            <button
              onClick={() => setCarouselSlide((prev: number) => (prev === 0 ? 2 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCarouselSlide((prev: number) => (prev + 1) % 3)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCarouselSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    carouselSlide === i ? "w-6 bg-amber-500" : "bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Control interactivo de carrusel deslizable con soporte touch y auto-play.</span>
            <button
              onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-semibold cursor-pointer"
            >
              {isCarouselPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isCarouselPlaying ? "Pausar" : "Reanudar"} Auto-play</span>
            </button>
          </div>
        </div>
      );

    case "Entry Animations":
      return (
        <div className="space-y-4 text-center">
          <div key={animationReplayKey} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { delay: "0ms", title: "Entrada Escalada", desc: "Aparece con suave escala inicial y opacidad." },
              { delay: "150ms", title: "Fade-In Suave", desc: "Transición de opacidad de 0 a 100% sin sobresaltos." },
              { delay: "300ms", title: "Slide Superior", desc: "Desplazamiento vertical sutil de 12px a posición final." }
            ].map((card, idx) => (
              <div
                key={card.title}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 text-left transition-all animate-fade-in"
                style={{
                  animationDelay: card.delay,
                  animationFillMode: "both"
                }}
              >
                <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold mb-2">
                  0{idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{card.title}</h4>
                <p className="text-[10px] text-zinc-400">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setAnimationReplayKey((k: number) => k + 1)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Repetir Animación de Entrada</span>
            </button>
          </div>
        </div>
      );

    case "Video Background Overlay":
      return (
        <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-black min-h-[260px] flex items-center justify-center p-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
          {/* Simulated Ambient Particle/Video Canvas */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,#f59e0b_0%,transparent_60%)] animate-pulse" />
          
          <div className="relative z-20 space-y-3 max-w-md">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
              Ambiente Visual Cinematográfico
            </span>
            <h3 className="text-2xl font-extrabold text-white">Textura en Movimiento Continuo</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Mantiene la legibilidad del texto en contraste WCAG AA mientras aporta profundidad visual y sofisticación.
            </p>
          </div>
        </div>
      );

    case "Interactive Parallax":
      return (
        <div
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 15;
            const y = (e.clientY - rect.top - rect.height / 2) / 15;
            setParallaxOffset({ x, y });
          }}
          onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
          className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 min-h-[260px] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-100"
          style={{
            perspective: 800
          }}
        >
          <div
            className="p-6 rounded-2xl border border-amber-500/40 bg-zinc-900/90 shadow-2xl space-y-2 transition-transform duration-75"
            style={{
              transform: `rotateY(${parallaxOffset.x}deg) rotateX(${-parallaxOffset.y}deg)`
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-bold">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Efecto Parallax 3D Interactivo</h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              Mueve tu cursor sobre esta tarjeta para sentir la profundidad reactiva en tiempo real.
            </p>
          </div>
        </div>
      );

    case "Light/Dark Switch":
      return (
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          previewTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white" : "bg-slate-100 border-slate-300 text-slate-900"
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-700/40">
            <div>
              <h4 className="text-sm font-bold">Modo de Apariencia Activo</h4>
              <p className="text-xs opacity-70">
                Actualmente en modo <strong className="uppercase">{previewTheme}</strong>
              </p>
            </div>
            <button
              onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold cursor-pointer transition-all ${
                previewTheme === "dark"
                  ? "bg-amber-500 text-zinc-950 border-amber-400"
                  : "bg-slate-800 text-white border-slate-700"
              }`}
            >
              {previewTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Cambiar a {previewTheme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
            </button>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-lg border ${previewTheme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"}`}>
              <div className="font-bold">Contraste WCAG Garantizado</div>
              <div className="text-[10px] opacity-70 mt-0.5">Mínimo 4.5:1 en todos los textos legibles.</div>
            </div>
            <div className={`p-3 rounded-lg border ${previewTheme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"}`}>
              <div className="font-bold">Persistencia Local</div>
              <div className="text-[10px] opacity-70 mt-0.5">Recuerda la elección del visitante entre visitas.</div>
            </div>
          </div>
        </div>
      );

    case "Dynamic Contact Form":
      return (
        <div className="max-w-md mx-auto w-full p-5 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-3">
          {formSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
              <p className="text-[10px] text-zinc-300">
                Gracias {formName || "por tu mensaje"}. Te responderemos en menos de 24 horas.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-2 text-[10px] text-amber-400 underline cursor-pointer"
              >
                Probar formulario nuevamente
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-2.5"
            >
              <div>
                <label className="text-[10px] font-bold text-zinc-300">Tu Nombre</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej: Sofia Gómez"
                  className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-300">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="sofia@empresa.com"
                  className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-300">Mensaje</label>
                <textarea
                  rows={2}
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs cursor-pointer shadow-md"
              >
                Enviar Consulta de Prueba
              </button>
            </form>
          )}
        </div>
      );

    case "Live Filterable Grid":
      const projects = [
        { name: "Banco Nova", cat: "fintech" },
        { name: "Aura Boutique", cat: "ecommerce" },
        { name: "Neural Analytics", cat: "ai" },
        { name: "Crypto Vault", cat: "fintech" },
        { name: "Vanguard Studio", cat: "ecommerce" },
        { name: "Synth Agent", cat: "ai" }
      ];
      const filtered = gridFilter === "all" ? projects : projects.filter((p) => p.cat === gridFilter);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1.5">
            {[
              { id: "all", label: "Todos (6)" },
              { id: "fintech", label: "Fintech (2)" },
              { id: "ecommerce", label: "E-Commerce (2)" },
              { id: "ai", label: "AI & ML (2)" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setGridFilter(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  gridFilter === btn.id
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-1 animate-fade-in"
              >
                <div className="h-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-amber-500/80 text-xs">
                  {item.cat.toUpperCase()}
                </div>
                <div className="text-xs font-bold text-white">{item.name}</div>
                <div className="text-[10px] text-zinc-500">Categoría: {item.cat}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Responsive Mega-Menu":
      return (
        <div className="space-y-4">
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-between">
            <span className="font-bold text-xs text-amber-400">{clientName}</span>
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explorar Menú</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? "rotate-90" : ""}`} />
            </button>
          </div>

          {megaMenuOpen && (
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in shadow-2xl">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400">Servicios</span>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="hover:text-white cursor-pointer">• Consultoría Estratégica</div>
                  <div className="hover:text-white cursor-pointer">• Ingeniería de Software</div>
                  <div className="hover:text-white cursor-pointer">• Diseño de Interfaces</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400">Recursos</span>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="hover:text-white cursor-pointer">• Documentación API</div>
                  <div className="hover:text-white cursor-pointer">• Casos de Estudio</div>
                  <div className="hover:text-white cursor-pointer">• Blog & Artículos</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[9px] uppercase font-bold text-emerald-400">Lanzamiento</span>
                <div className="text-xs font-bold text-white">Starter Kit 2026</div>
                <div className="text-[10px] text-zinc-400">Descarga nuestras guías gratuitas.</div>
              </div>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="text-center text-xs text-zinc-400 py-8">
          Demostración interactiva en preparación para {featureId}.
        </div>
      );
  }
}

// =========================================================================
// RENDER NAVIGATION BAR PREVIEW HELPER
// =========================================================================
function renderNavigationBarPreview({
  style,
  clientName,
  theme,
  isMobile,
  activePalette,
  megaMenuOpen,
  setMegaMenuOpen,
  drawerOpen,
  setDrawerOpen,
  activeBottomTab,
  setActiveBottomTab
}: {
  style: NavbarStyleType;
  clientName: string;
  theme: "dark" | "light";
  isMobile: boolean;
  activePalette: any;
  megaMenuOpen: boolean;
  setMegaMenuOpen: (open: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  activeBottomTab: string;
  setActiveBottomTab: (tab: string) => void;
}) {
  const isDark = theme === "dark";

  switch (style) {
    case "Floating Glassmorphic Pill":
      return (
        <div className="w-full pt-3 px-3 sm:px-6 relative z-30">
          <div
            className={`max-w-4xl mx-auto px-4 sm:px-5 py-2.5 rounded-full border shadow-xl flex items-center justify-between backdrop-blur-xl transition-all ${
              isDark
                ? "bg-zinc-900/80 border-white/10 text-white"
                : "bg-white/85 border-zinc-200 text-zinc-900 shadow-md"
            }`}
          >
            {/* Brand Wordmark */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: activePalette.primary }} />
              <span className="font-extrabold text-xs sm:text-sm tracking-tight">{clientName}</span>
            </div>

            {/* Nav Links */}
            {!isMobile && (
              <nav className="flex items-center gap-5 text-xs font-medium opacity-85">
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Servicios</span>
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Proyectos</span>
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Precios</span>
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Nosotros</span>
              </nav>
            )}

            {/* Right Action Button or Mobile Menu Toggle */}
            <div className="flex items-center gap-2">
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="p-1.5 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 cursor-pointer"
                >
                  <Menu className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: activePalette.primary, color: activePalette.background }}
                >
                  Iniciar Proyecto &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      );

    case "Sticky Edge-to-Edge Minimal":
      return (
        <header
          className={`w-full px-4 sm:px-8 py-3 border-b flex items-center justify-between transition-colors z-30 ${
            isDark ? "bg-zinc-950/95 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`}
        >
          {/* Zone 1: Single text element wordmark */}
          <span className="text-sm sm:text-base font-bold tracking-tight">{clientName}</span>

          {/* Zone 2: Clean unboxed text links with hover underline */}
          {!isMobile ? (
            <nav className="flex items-center gap-6 text-xs font-medium opacity-80">
              <span className="hover:opacity-100 hover:underline cursor-pointer">Soluciones</span>
              <span className="hover:opacity-100 hover:underline cursor-pointer">Casos de Éxito</span>
              <span className="hover:opacity-100 hover:underline cursor-pointer">Metodología</span>
              <span className="hover:opacity-100 hover:underline cursor-pointer">Contacto</span>
            </nav>
          ) : (
            <span className="text-[10px] uppercase font-bold text-zinc-400">Minimal Top</span>
          )}

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2">
            {isMobile ? (
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                style={{ backgroundColor: activePalette.primary, color: activePalette.background }}
              >
                Solicitar Demo
              </button>
            )}
          </div>
        </header>
      );

    case "Centered Luxury Wordmark":
      return (
        <header
          className={`w-full px-4 sm:px-8 py-3.5 border-b grid grid-cols-3 items-center z-30 ${
            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-[#FAF7F2] border-zinc-200 text-zinc-900"
          }`}
        >
          {/* Left side links */}
          <div className="flex items-center gap-4 text-xs font-medium tracking-wide">
            {!isMobile ? (
              <>
                <span className="hover:text-amber-500 cursor-pointer transition-colors">Colección</span>
                <span className="hover:text-amber-500 cursor-pointer transition-colors">Manifiesto</span>
                <span className="hover:text-amber-500 cursor-pointer transition-colors">Proyectos</span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Center: Prestigious wordmark */}
          <div className="text-center font-playfair text-base sm:text-lg font-bold tracking-widest uppercase truncate px-2">
            {clientName}
          </div>

          {/* Right side: Currency/Language + CTA */}
          <div className="flex items-center justify-end gap-3 text-xs">
            {!isMobile && (
              <span className="text-[10px] font-mono text-zinc-400 cursor-pointer">EUR / USD</span>
            )}
            <button
              type="button"
              className="px-3 py-1 text-xs border rounded-md font-medium tracking-wider uppercase transition-colors cursor-pointer"
              style={{ borderColor: activePalette.accent, color: activePalette.accent }}
            >
              Inquire
            </button>
          </div>
        </header>
      );

    case "Split Brand & Action Header":
      return (
        <header
          className={`w-full px-5 py-3 border-b flex items-center justify-between z-30 ${
            isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: activePalette.primary, color: activePalette.background }}
              >
                ▲
              </div>
              <span className="font-bold text-sm">{clientName}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                v2.6
              </span>
            </div>

            {!isMobile && (
              <nav className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="hover:text-white cursor-pointer">Plataforma</span>
                <span className="hover:text-white cursor-pointer">Integraciones</span>
                <span className="hover:text-white cursor-pointer">Seguridad</span>
                <span className="hover:text-white cursor-pointer">Precios</span>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <span className="text-xs text-zinc-400 hover:text-white cursor-pointer px-2">
                Iniciar Sesión
              </span>
            )}
            <button
              type="button"
              className="px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              style={{ backgroundColor: activePalette.primary, color: activePalette.background }}
            >
              Comenzar Gratis &rarr;
            </button>
          </div>
        </header>
      );

    case "Mega-Menu Multi-Column":
      return (
        <div className="w-full relative z-30">
          <header
            className={`w-full px-5 py-3 border-b flex items-center justify-between ${
              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            <div className="flex items-center gap-6">
              <span className="font-extrabold text-sm">{clientName}</span>
              {!isMobile && (
                <nav className="flex items-center gap-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      megaMenuOpen ? "bg-amber-500/20 text-amber-300" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>Productos & Soluciones</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  <span className="text-zinc-400 hover:text-white cursor-pointer">Precios</span>
                  <span className="text-zinc-400 hover:text-white cursor-pointer">Documentación</span>
                </nav>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                style={{ backgroundColor: activePalette.primary, color: activePalette.background }}
              >
                Acceso Clientes
              </button>
            </div>
          </header>

          {/* Mega-menu dropdown panel */}
          {megaMenuOpen && (
            <div
              className={`absolute top-full left-0 w-full p-6 border-b shadow-2xl animate-fade-in grid grid-cols-1 sm:grid-cols-3 gap-6 z-40 ${
                isDark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Módulos Core</span>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• Cloud Architecture v3</div>
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• Motor de Pagos Seguros</div>
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• SDK Multiplataforma</div>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Por Industria</span>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• Fintech & Banca Digital</div>
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• E-Commerce & Retail</div>
                  <div className="font-semibold hover:text-amber-400 cursor-pointer">• Salud & Biotech</div>
                </div>
              </div>
              <div className={`p-3.5 rounded-xl border space-y-1.5 ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Novedad</span>
                <h4 className="text-xs font-bold">Guía de Migración Lovable</h4>
                <p className="text-[10px] opacity-70">Aprende a transformar prompts en código ejecutable en segundos.</p>
              </div>
            </div>
          )}
        </div>
      );

    case "Bottom Tab Bar (iOS / Android)":
      return (
        <div
          className={`w-full py-2 px-6 border-t flex items-center justify-around z-30 transition-all ${
            isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200 shadow-lg"
          }`}
        >
          {[
            { id: "home", label: "Inicio", icon: <Home className="w-4 h-4" /> },
            { id: "services", label: "Servicios", icon: <Briefcase className="w-4 h-4" /> },
            { id: "portfolio", label: "Proyectos", icon: <FolderKanban className="w-4 h-4" /> },
            { id: "contact", label: "Contacto", icon: <Mail className="w-4 h-4" /> }
          ].map((tab) => {
            const isActive = activeBottomTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveBottomTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  isActive ? "text-amber-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.icon}
                <span className="text-[9px]">{tab.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />}
              </button>
            );
          })}
        </div>
      );

    case "Floating Action Dock Pill":
      return (
        <div className="w-full flex justify-center py-2.5 px-4 z-30 pointer-events-auto">
          <div
            className={`px-5 py-2 rounded-full border shadow-2xl flex items-center gap-5 backdrop-blur-2xl ${
              isDark ? "bg-zinc-900/90 border-white/10 text-white" : "bg-white/90 border-zinc-300 text-zinc-900 shadow-md"
            }`}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs opacity-75 hover:opacity-100 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Servicios</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs opacity-75 hover:opacity-100 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </button>
          </div>
        </div>
      );

    case "Slide-In Fullscreen Overlay Drawer":
      return (
        <div className="w-full relative z-30">
          <header
            className={`w-full px-5 py-3 border-b flex items-center justify-between ${
              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            <span className="font-extrabold text-sm">{clientName}</span>
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Menú</span>
            </button>
          </header>

          {drawerOpen && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-8 flex flex-col justify-between text-white animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-widest text-amber-400 uppercase">{clientName}</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-4 my-auto">
                {["01. INICIO", "02. SERVICIOS & ALCANCE", "03. CASOS DE ESTUDIO", "04. CONTACTO DIRECTO"].map((item) => (
                  <div
                    key={item}
                    onClick={() => setDrawerOpen(false)}
                    className="text-2xl sm:text-3xl font-extrabold hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </nav>

              <div className="text-xs text-zinc-400 flex items-center justify-between pt-4 border-t border-zinc-800">
                <span>hello@{clientName.toLowerCase().replace(/\s+/g, "")}.com</span>
                <span>Instagram • LinkedIn • X</span>
              </div>
            </div>
          )}
        </div>
      );

    default:
      return (
        <header
          className={`w-full px-5 py-3 border-b flex items-center justify-between ${
            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`}
        >
          <span className="font-bold text-sm">{clientName}</span>
          <span className="text-xs text-zinc-400">{style}</span>
        </header>
      );
  }
}
