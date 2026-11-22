import React, { useState } from "react";
import {
  Palette,
  Layout,
  Smartphone,
  Type,
  Sparkles,
  Check,
  Eye,
  Sliders,
  Copy,
  Layers,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Box,
  CornerDownRight,
  Sun,
  Moon,
  Compass,
  Monitor
} from "lucide-react";
import {
  DesignSystemConfig,
  ColorPaletteTemplate,
  TitleFontFamily,
  Title3DEffectType,
  NavbarStyleType
} from "../types";
import {
  CURATED_COLOR_PALETTES,
  DEFAULT_DESIGN_SYSTEM,
  NAVBAR_STYLE_PRESETS
} from "../constants/designSystemTemplates";

interface DesignStyleConfiguratorProps {
  designConfig: DesignSystemConfig;
  onDesignConfigChange: (config: DesignSystemConfig) => void;
  clientName?: string;
  onOpenPreview?: (tab?: "sections" | "navbars" | "features" | "design") => void;
}

export default function DesignStyleConfigurator({
  designConfig,
  onDesignConfigChange,
  clientName,
  onOpenPreview
}: DesignStyleConfiguratorProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "layout" | "navbars" | "mobile" | "typography" | "effects3d">("colors");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);

  const colors = designConfig.colors;

  const updateConfig = (partial: Partial<DesignSystemConfig>) => {
    onDesignConfigChange({
      ...designConfig,
      ...partial
    });
  };

  const handleSelectPalette = (palette: ColorPaletteTemplate) => {
    updateConfig({
      paletteId: palette.id,
      colors: {
        primary: palette.primary,
        secondary: palette.secondary,
        background: palette.background,
        surface: palette.surface,
        text: palette.text,
        accent: palette.accent
      }
    });
  };

  const handleCustomColorChange = (key: keyof typeof designConfig.colors, val: string) => {
    updateConfig({
      paletteId: "custom",
      colors: {
        ...designConfig.colors,
        [key]: val
      }
    });
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Helper for title font class
  const getFontFamilyClass = (fontFamily: TitleFontFamily) => {
    switch (fontFamily) {
      case "Space Grotesk": return "font-space-grotesk";
      case "Playfair Display": return "font-playfair";
      case "Cinzel": return "font-cinzel";
      case "Plus Jakarta Sans": return "font-plus-jakarta";
      case "Syne": return "font-syne";
      case "Bebas Neue": return "font-bebas";
      case "JetBrains Mono": return "font-jetbrains";
      case "Cormorant Garamond": return "font-cormorant";
      default: return "font-sans";
    }
  };

  // Helper for 3D effect class
  const get3DEffectClass = (effectType: Title3DEffectType) => {
    switch (effectType) {
      case "perspective_tilt": return "text-3d-perspective";
      case "isometric_layered":
        return isDarkBg(colors.background) ? "text-3d-isometric" : "text-3d-isometric-light";
      case "metallic_emboss": return "text-3d-metallic";
      case "neon_glow_3d": return "text-3d-neon";
      case "glass_relief_3d": return "text-3d-glass";
      case "floating_elevation": return "text-3d-floating";
      default: return "";
    }
  };

  function isDarkBg(hex: string) {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6) return true;
    const r = parseInt(cleanHex.substr(0, 2), 16);
    const g = parseInt(cleanHex.substr(2, 2), 16);
    const b = parseInt(cleanHex.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128;
  }

  const previewText = designConfig.title3DEffect.previewText || clientName || "NEXT-GEN DIGITAL CRAFT";

  const fontOptions: { id: TitleFontFamily; name: string; tag: string; description: string; sample: string }[] = [
    {
      id: "Space Grotesk",
      name: "Space Grotesk",
      tag: "Modern Geometric",
      description: "Edgy cyber tech feel, distinct characters & contemporary geometry.",
      sample: "FUTURE SYSTEMS 2026"
    },
    {
      id: "Playfair Display",
      name: "Playfair Display",
      tag: "Editorial Luxury",
      description: "High-contrast transitional serif with classical editorial elegance.",
      sample: "Artisanal Heritage"
    },
    {
      id: "Cinzel",
      name: "Cinzel",
      tag: "High-End Roman",
      description: "Inspired by first-century Roman inscriptions, majestic & authoritative.",
      sample: "MAJESTIC ATELIER"
    },
    {
      id: "Plus Jakarta Sans",
      name: "Plus Jakarta Sans",
      tag: "Clean Humanist",
      description: "Ultra-crisp modern sans with high legibility across all screen densities.",
      sample: "Precision Engineering"
    },
    {
      id: "Syne",
      name: "Syne",
      tag: "Avant-Garde Studio",
      description: "Bold unconventional display geometry crafted for creative brands.",
      sample: "CREATIVE UNBOUND"
    },
    {
      id: "Bebas Neue",
      name: "Bebas Neue",
      tag: "Heavy Impact",
      description: "Condensed all-caps powerhouse ideal for bold headlines and posters.",
      sample: "BOLD STATEMENT"
    },
    {
      id: "JetBrains Mono",
      name: "JetBrains Mono",
      tag: "Cybernetic Monospace",
      description: "Technical, developer-first monospace with distinct code-grade aesthetic.",
      sample: "INITIALIZE_CORE();"
    },
    {
      id: "Cormorant Garamond",
      name: "Cormorant Garamond",
      tag: "Literary Romantic",
      description: "Traditional delicate curves, graceful proportions, and poetic grace.",
      sample: "Elegance in Detail"
    }
  ];

  const effect3DOptions: { id: Title3DEffectType; name: string; badge: string; desc: string }[] = [
    {
      id: "none",
      name: "Crisp Flat 2D",
      badge: "Clean Minimalist",
      desc: "Pure vector glyphs with zero extra distortion or artificial depth."
    },
    {
      id: "perspective_tilt",
      name: "3D Perspective Tilt",
      badge: "Dynamic Spatial",
      desc: "Rotates the heading along 3D X/Y planes with a soft spatial drop shadow."
    },
    {
      id: "isometric_layered",
      name: "Layered Isometric Offset",
      badge: "Sharp Stepped",
      desc: "Multi-stage stacked drop layers creating a bold dimensional hard-edge block."
    },
    {
      id: "metallic_emboss",
      name: "Metallic Chiseled Bevel",
      badge: "Luxury Lustre",
      desc: "Chrome / platinum specular gradient reflection with chiseled light bevels."
    },
    {
      id: "neon_glow_3d",
      name: "Luminous 3D Neon Glow",
      badge: "Vibrant Aura",
      desc: "Multi-layered chromatic radiant glow radiating outwards from text strokes."
    },
    {
      id: "glass_relief_3d",
      name: "Glassmorphic 3D Relief",
      badge: "Frosted Depth",
      desc: "Etched translucent highlights with top rim refraction and deep backdrop blur."
    },
    {
      id: "floating_elevation",
      name: "Floating Soft Elevation",
      badge: "Ambient Lift",
      desc: "Multi-stage deep ambient shadow making the headline visually hover off the canvas."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Sub-Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-500" />
            Visual Design & Styling Engine
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure color palettes, layout patterns, mobile app presentation, title typography, and 3D effects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenPreview && (
            <button
              type="button"
              id="btn-preview-navbars-header"
              onClick={() => onOpenPreview("navbars")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span>👁️ Probar Navbars en Vivo</span>
            </button>
          )}

          <button
            type="button"
            id="btn-toggle-mobile-sim"
            onClick={() => setShowMobileSimulator(!showMobileSimulator)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              showMobileSimulator
                ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                : "bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200"
            }`}
          >
            {showMobileSimulator ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{showMobileSimulator ? "Hide Phone Frame" : "📱 View Mobile App Look"}</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-1 bg-zinc-100/80 p-1 rounded-xl overflow-x-auto no-scrollbar border border-zinc-200/80">
        <button
          type="button"
          id="tab-design-colors"
          onClick={() => setActiveTab("colors")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "colors"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-amber-500" />
          <span>Colors & Swatches</span>
        </button>

        <button
          type="button"
          id="tab-design-layout"
          onClick={() => setActiveTab("layout")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "layout"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-amber-500" />
          <span>Layout Architecture</span>
        </button>

        <button
          type="button"
          id="tab-design-navbars"
          onClick={() => setActiveTab("navbars")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "navbars"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Navbar Styles</span>
        </button>

        <button
          type="button"
          id="tab-design-mobile"
          onClick={() => setActiveTab("mobile")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "mobile"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-500" />
          <span>Mobile App Look</span>
        </button>

        <button
          type="button"
          id="tab-design-typography"
          onClick={() => setActiveTab("typography")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "typography"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Type className="w-3.5 h-3.5 text-amber-500" />
          <span>Title Font Style</span>
        </button>

        <button
          type="button"
          id="tab-design-effects3d"
          onClick={() => setActiveTab("effects3d")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "effects3d"
              ? "bg-white text-zinc-900 shadow-2xs font-bold"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>3D Title Effect</span>
        </button>
      </div>

      {/* LIVE INTERACTIVE HERO TITLE & COLOR PREVIEW STRIP */}
      <div
        className="rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden border shadow-sm"
        style={{
          backgroundColor: colors.background,
          borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
          color: colors.text
        }}
      >
        {/* Subtle background ambient mesh */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: colors.accent }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                Live Preview
              </span>
              <span className="text-[11px] opacity-70">
                Font: <strong style={{ color: colors.accent }}>{designConfig.titleFontStyle.fontFamily}</strong> • 3D:{" "}
                <strong style={{ color: colors.primary }}>
                  {effect3DOptions.find(e => e.id === designConfig.title3DEffect.effectType)?.name}
                </strong>
              </span>
            </div>

            {/* Rendered Live Title */}
            <h2
              className={`text-xl sm:text-2xl md:text-3xl leading-tight font-bold transition-all ${getFontFamilyClass(
                designConfig.titleFontStyle.fontFamily
              )} ${get3DEffectClass(designConfig.title3DEffect.effectType)}`}
              style={{
                color: designConfig.title3DEffect.effectType === "metallic_emboss" ? undefined : colors.primary
              }}
            >
              {previewText}
            </h2>

            <p className="text-xs opacity-75 line-clamp-1">
              Engineered with precision for Lovable.app, React, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Swatch Bar in Live Banner */}
          <div className="flex items-center gap-2 shrink-0 bg-black/20 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <div className="flex -space-x-1.5">
              <div
                className="w-5 h-5 rounded-full border-2 border-white/40 shadow-xs cursor-pointer"
                style={{ backgroundColor: colors.primary }}
                title={`Primary: ${colors.primary}`}
                onClick={() => handleCopyHex(colors.primary)}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white/40 shadow-xs cursor-pointer"
                style={{ backgroundColor: colors.secondary }}
                title={`Secondary: ${colors.secondary}`}
                onClick={() => handleCopyHex(colors.secondary)}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white/40 shadow-xs cursor-pointer"
                style={{ backgroundColor: colors.accent }}
                title={`Accent: ${colors.accent}`}
                onClick={() => handleCopyHex(colors.accent)}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white/40 shadow-xs cursor-pointer"
                style={{ backgroundColor: colors.surface }}
                title={`Surface: ${colors.surface}`}
                onClick={() => handleCopyHex(colors.surface)}
              />
            </div>
            <div className="text-[10px] pl-1 font-mono opacity-80">
              {copiedHex ? `Copied ${copiedHex}!` : "Click swatch to copy"}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE APP LOOK SIMULATOR FRAME MODAL / DRAWER */}
      {showMobileSimulator && (
        <div className="p-5 bg-zinc-900 text-white rounded-2xl border border-zinc-700 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white">
                Mobile App Look & Native Shell Simulator
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowMobileSimulator(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Close Simulator
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-2">
            {/* Simulated iPhone Frame */}
            <div
              className="w-[280px] h-[520px] rounded-[38px] border-4 border-zinc-700 p-2.5 shadow-2xl flex flex-col justify-between relative overflow-hidden"
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
            >
              {/* Dynamic Island / Top Notch */}
              <div className="w-24 h-4 bg-zinc-900 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-end px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
              </div>

              {/* Simulated Mobile Top App Bar */}
              <div
                className="px-3 py-2 rounded-xl flex items-center justify-between mb-2 shrink-0 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                }}
              >
                <div className="text-[11px] font-bold truncate max-w-[120px]" style={{ color: colors.primary }}>
                  {clientName || "Brand App"}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                  <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center text-[8px]">
                    ☰
                  </div>
                </div>
              </div>

              {/* Simulated Mobile Feed / Content */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
                {/* Mobile Hero Card */}
                <div
                  className="p-3 rounded-2xl border space-y-1.5"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                  }}
                >
                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                    style={{ backgroundColor: colors.primary, color: colors.background }}
                  >
                    Featured
                  </span>
                  <h3
                    className={`text-xs font-bold leading-tight ${getFontFamilyClass(
                      designConfig.titleFontStyle.fontFamily
                    )}`}
                    style={{ color: colors.primary }}
                  >
                    {previewText}
                  </h3>
                  <p className="text-[9px] opacity-75 leading-tight">
                    Custom mobile-first layout with smooth touch transitions.
                  </p>
                  <button
                    type="button"
                    className="w-full py-1.5 text-[10px] font-bold rounded-lg mt-1 text-center shadow-xs"
                    style={{ backgroundColor: colors.primary, color: colors.background }}
                  >
                    Get Started &rarr;
                  </button>
                </div>

                {/* Mobile 2-Card Bento Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="p-2.5 rounded-xl border text-[9px] space-y-1"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                    }}
                  >
                    <div className="w-4 h-4 rounded-md" style={{ backgroundColor: colors.secondary }} />
                    <span className="font-bold block truncate">Fast Delivery</span>
                  </div>
                  <div
                    className="p-2.5 rounded-xl border text-[9px] space-y-1"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                    }}
                  >
                    <div className="w-4 h-4 rounded-md" style={{ backgroundColor: colors.accent }} />
                    <span className="font-bold block truncate">Top Security</span>
                  </div>
                </div>
              </div>

              {/* Simulated Native Bottom Navigation Bar (iOS / Android App Shell) */}
              <div
                className="mt-2 pt-1.5 pb-1 px-3 rounded-2xl flex items-center justify-around shrink-0 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: isDarkBg(colors.background) ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }}
              >
                <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: colors.primary }} />
                  <span className="text-[7px] font-bold" style={{ color: colors.primary }}>Home</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-400" />
                  <span className="text-[7px]">Explore</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-400" />
                  <span className="text-[7px]">Orders</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-400" />
                  <span className="text-[7px]">Account</span>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-20 h-1 bg-zinc-500 rounded-full mx-auto mt-1 shrink-0" />
            </div>

            {/* Mobile Mode Controls */}
            <div className="space-y-3 max-w-sm text-xs">
              <div>
                <h5 className="font-bold text-amber-400 text-xs mb-1">
                  Mobile Presentation Mode
                </h5>
                <p className="text-[11px] text-zinc-300">
                  This tells Lovable.app to generate explicit mobile app shells, bottom navigation bars, and touch optimizations.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: "Native App Shell (Bottom Bar + Safe Area)",
                    title: "📱 Native App Shell (Bottom Bar + PWA)",
                    desc: "Fixed bottom navigation dock with iOS safe-area insets and haptic feel."
                  },
                  {
                    id: "Adaptive Responsive Web",
                    title: "🌐 Adaptive Responsive Web",
                    desc: "Classic fluid responsive layout with slide-out hamburger drawer."
                  },
                  {
                    id: "Bottom Sheet & Action Drawers",
                    title: "📄 Bottom Sheet / Action Drawers",
                    desc: "All modals and filters slide up smoothly from the bottom screen edge."
                  }
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => updateConfig({
                      mobileAppLook: {
                        ...designConfig.mobileAppLook,
                        mode: m.id as any
                      }
                    })}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      designConfig.mobileAppLook.mode === m.id
                        ? "bg-amber-950/40 border-amber-400 text-white ring-1 ring-amber-400"
                        : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    <div className="font-bold text-xs">{m.title}</div>
                    <div className="text-[10px] text-zinc-400">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: COLORS & SWATCHES */}
      {activeTab === "colors" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              1. Choose a Curated Theme Palette:
            </label>
            <p className="text-xs text-zinc-500">
              Click any palette to instantly apply matched foreground, background, accent, and surface tones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {CURATED_COLOR_PALETTES.map((pal) => {
              const isSelected = designConfig.paletteId === pal.id;
              return (
                <div
                  key={pal.id}
                  id={`palette-card-${pal.id}`}
                  onClick={() => handleSelectPalette(pal)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/40 shadow-xs ring-1 ring-amber-400/40"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-900 truncate">
                        {pal.name}
                      </span>
                      {isSelected && (
                        <span className="p-0.5 rounded-full bg-amber-500 text-white shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-zinc-400 block mb-2">
                      {pal.category}
                    </span>

                    {/* Color Swatch Bars */}
                    <div className="flex h-6 rounded-lg overflow-hidden border border-zinc-200 shadow-2xs mb-2">
                      <div className="flex-1" style={{ backgroundColor: pal.primary }} title={`Primary: ${pal.primary}`} />
                      <div className="flex-1" style={{ backgroundColor: pal.secondary }} title={`Secondary: ${pal.secondary}`} />
                      <div className="flex-1" style={{ backgroundColor: pal.accent }} title={`Accent: ${pal.accent}`} />
                      <div className="flex-1" style={{ backgroundColor: pal.background }} title={`Background: ${pal.background}`} />
                      <div className="flex-1" style={{ backgroundColor: pal.surface }} title={`Surface: ${pal.surface}`} />
                    </div>

                    <p className="text-[10px] text-zinc-500 leading-tight line-clamp-2">
                      {pal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CUSTOM COLOR PALETTE REFINEMENT */}
          <div className="bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-600" />
                Refine Specific Hex Colors
              </h4>
              <span className="text-[10px] text-zinc-400 font-mono">
                Active: {designConfig.paletteId}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: "Primary Brand", key: "primary" as const, val: colors.primary },
                { label: "Secondary", key: "secondary" as const, val: colors.secondary },
                { label: "Accent / Glow", key: "accent" as const, val: colors.accent },
                { label: "Background", key: "background" as const, val: colors.background },
                { label: "Surface Card", key: "surface" as const, val: colors.surface },
                { label: "Text Contrast", key: "text" as const, val: colors.text }
              ].map((item) => (
                <div key={item.key} className="space-y-1 bg-white p-2 rounded-xl border border-zinc-200">
                  <label className="block text-[10px] font-bold text-zinc-600 truncate">
                    {item.label}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={item.val}
                      onChange={(e) => handleCustomColorChange(item.key, e.target.value)}
                      className="w-6 h-6 rounded-md border border-zinc-300 cursor-pointer p-0 shrink-0"
                    />
                    <input
                      type="text"
                      value={item.val}
                      onChange={(e) => handleCustomColorChange(item.key, e.target.value)}
                      className="w-full text-[10px] font-mono p-1 border border-zinc-200 rounded text-zinc-800 focus:outline-hidden uppercase"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAYOUT ARCHITECTURE & CORNERS */}
      {activeTab === "layout" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              2. Core Layout Architecture & Density Pattern:
            </label>
            <p className="text-xs text-zinc-500">
              Select how visual sections, content grids, and structural containers are organized across the screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              {
                id: "Modern Bento Grid Showcase",
                name: "Modern Bento Grid Showcase",
                badge: "High Density",
                desc: "Modular rounded bento cells displaying diverse media, metrics, and cards harmoniously."
              },
              {
                id: "Split Editorial Canvas",
                name: "Split Editorial Canvas",
                badge: "Storytelling",
                desc: "Asymmetrical 50/50 and 60/40 splits pairing sticky titles with rich interactive galleries."
              },
              {
                id: "Classic High-Trust Grid",
                name: "Classic High-Trust Grid",
                badge: "Corporate & SaaS",
                desc: "Traditional balanced 3-column and 4-column cards with structured hierarchy."
              },
              {
                id: "Full-Bleed Immersive Showcase",
                name: "Full-Bleed Immersive Showcase",
                badge: "Media Heavy",
                desc: "Edge-to-edge canvas with expansive ambient video backdrops and full-width sections."
              },
              {
                id: "Card-in-Card Framed Depth",
                name: "Card-in-Card Framed Depth",
                badge: "Layered 3D",
                desc: "Nested surfaces with hairline borders and subtle elevation creating clean visual depth."
              },
              {
                id: "Minimalist High-Contrast Type",
                name: "Minimalist High-Contrast Type",
                badge: "Swiss Brutalist",
                desc: "Generous whitespace, oversized headings, and minimal clutter focusing purely on content."
              }
            ].map((layout) => {
              const isSelected = designConfig.layoutStyle === layout.id;
              return (
                <div
                  key={layout.id}
                  onClick={() => updateConfig({ layoutStyle: layout.id })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-400"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-zinc-900">{layout.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                        {layout.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal">{layout.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Corner Rounding & Container Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Corner Rounding (Border Radius)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "Sharp Corners (0px)", label: "Sharp (0px)", desc: "Brutalist / Technical" },
                  { id: "Subtle Rounded (8px)", label: "Subtle (8px)", desc: "Crisp Corporate" },
                  { id: "Smooth Modern (16px)", label: "Modern (16px)", desc: "Standard Modern App" },
                  { id: "Pill / Soft Curved (24px)", label: "Pill Soft (24px)", desc: "Friendly Consumer" }
                ].map((rad) => (
                  <button
                    key={rad.id}
                    type="button"
                    onClick={() => updateConfig({ cornerRounding: rad.id })}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      designConfig.cornerRounding === rad.id
                        ? "bg-white border-amber-500 font-bold text-amber-950 shadow-2xs ring-1 ring-amber-300"
                        : "bg-white/60 border-zinc-200 text-zinc-700 hover:bg-white"
                    }`}
                  >
                    <div className="font-bold text-[11px]">{rad.label}</div>
                    <div className="text-[9px] text-zinc-400">{rad.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Container Width & Canvas Constraint
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "Standard Contained (max-w-7xl)", label: "Standard (max-w-7xl)", desc: "Balanced Desktop" },
                  { id: "Full-Bleed Dynamic Width", label: "Full-Bleed Width", desc: "Edge-to-edge canvas" },
                  { id: "Compact Editorial (max-w-5xl)", label: "Compact (max-w-5xl)", desc: "Focused reading" },
                  { id: "Ultra-Wide 4K (max-w-screen-2xl)", label: "Ultra-Wide (2xl)", desc: "Expansive layouts" }
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => updateConfig({ containerWidth: w.id })}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      designConfig.containerWidth === w.id
                        ? "bg-white border-amber-500 font-bold text-amber-950 shadow-2xs ring-1 ring-amber-300"
                        : "bg-white/60 border-zinc-200 text-zinc-700 hover:bg-white"
                    }`}
                  >
                    <div className="font-bold text-[11px]">{w.label}</div>
                    <div className="text-[9px] text-zinc-400">{w.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NAVBAR STYLES */}
      {activeTab === "navbars" && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-500" />
                Navigation Bar Architecture & Header Design:
              </label>
              <p className="text-xs text-zinc-500">
                Choose the navigation system for your website: floating glassmorphic docks, minimal sticky bars, luxury wordmarks, or mobile bottom tabs.
              </p>
            </div>
            {onOpenPreview && (
              <button
                type="button"
                id="btn-preview-navbars-tab-cta"
                onClick={() => onOpenPreview("navbars")}
                className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xs cursor-pointer transition-all shrink-0 self-start sm:self-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver en el Simulador en Vivo</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {NAVBAR_STYLE_PRESETS.map((nav) => {
              const isSelected = (designConfig.navbarStyle || "Floating Glassmorphic Pill") === nav.id;
              return (
                <div
                  key={nav.id}
                  id={`navbar-card-${nav.id.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => updateConfig({ navbarStyle: nav.id as NavbarStyleType })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-400"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-900">
                        {nav.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-zinc-400 block mb-2">
                      {nav.category}
                    </span>
                    <p className="text-[10px] text-zinc-500 leading-normal mb-3">
                      {nav.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 font-bold text-zinc-600">
                      {nav.badge}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-amber-600">
                        Activo
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-800">
                Estilo Seleccionado: {designConfig.navbarStyle || "Floating Glassmorphic Pill"}
              </span>
              <p className="text-[11px] text-zinc-500">
                La barra se integrará con rutas semánticas (#services, #portfolio, #contact) y soporte táctil móvil.
              </p>
            </div>
            {onOpenPreview && (
              <button
                type="button"
                onClick={() => onOpenPreview("navbars")}
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white hover:bg-amber-50 text-amber-900 font-semibold cursor-pointer shrink-0 text-xs flex items-center gap-1.5"
              >
                <Eye className="w-3 h-3 text-amber-600" />
                <span>Simular Menús y Responsive</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MOBILE APP LOOK */}
      {activeTab === "mobile" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              3. Mobile App Look & Touchscreen Architecture:
            </label>
            <p className="text-xs text-zinc-500">
              Customize how the website transitions on smartphones — choose between native iOS/Android PWA app shells, bottom tab bars, and swipeable sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                id: "Native App Shell (Bottom Bar + Safe Area)",
                title: "📱 Native App Shell (Bottom Tab Bar + Safe Area)",
                badge: "Recommended for Mobile",
                desc: "Emulates a native mobile app with a fixed bottom navigation bar (Home, Services, Pricing, Contact), top status bar integration, and iOS safe-area insets."
              },
              {
                id: "Adaptive Responsive Web",
                title: "🌐 Adaptive Responsive Web",
                badge: "Standard Web",
                desc: "Traditional responsive fluid collapse with top sticky hamburger menu and full-screen mobile slide-over drawers."
              },
              {
                id: "Bottom Sheet & Action Drawers",
                title: "📄 Bottom Sheet & Action Drawers",
                badge: "App-Like Interactivity",
                desc: "All filters, contact dialogs, and product previews slide up smoothly from the bottom edge like native iOS action sheets."
              },
              {
                id: "Desktop-First Full Responsive",
                title: "🖥️ Desktop-First Full Responsive",
                badge: "Expansive",
                desc: "Clean desktop scaling with horizontal card scrolls and compact touch targets."
              }
            ].map((m) => {
              const isSelected = designConfig.mobileAppLook.mode === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => updateConfig({
                    mobileAppLook: {
                      ...designConfig.mobileAppLook,
                      mode: m.id as any
                    }
                  })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-400"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-zinc-900">{m.title}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200 space-y-3">
            <h4 className="text-xs font-bold text-zinc-800">
              Mobile Navigation & Touch Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "Bottom Tab Bar (iOS/Android)", label: "Bottom Tab Bar (iOS/Android Style)", desc: "Fixed at screen bottom with 4-5 core tabs" },
                { id: "Floating Action Dock Pill", label: "Floating Action Dock Pill", desc: "Translucent pill floating over content" },
                { id: "Slide-In Fullscreen Drawer", label: "Slide-In Fullscreen Drawer", desc: "Full backdrop blur navigation overlay" },
                { id: "Minimal Top App Bar", label: "Minimal Top App Bar", desc: "Clean compact header with quick CTAs" }
              ].map((nav) => (
                <div
                  key={nav.id}
                  onClick={() => updateConfig({
                    mobileAppLook: {
                      ...designConfig.mobileAppLook,
                      navigationStyle: nav.id as any
                    }
                  })}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    designConfig.mobileAppLook.navigationStyle === nav.id
                      ? "bg-white border-amber-500 font-bold text-amber-950 shadow-2xs ring-1 ring-amber-300"
                      : "bg-white/60 border-zinc-200 text-zinc-700 hover:bg-white"
                  }`}
                >
                  <div className="font-bold text-xs">{nav.label}</div>
                  <div className="text-[10px] text-zinc-400">{nav.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TITLE TYPOGRAPHY STYLE */}
      {activeTab === "typography" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              4. Title & Heading Typography Pairings:
            </label>
            <p className="text-xs text-zinc-500">
              Select the display typeface for primary titles, section headers, and hero value propositions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {fontOptions.map((font) => {
              const isSelected = designConfig.titleFontStyle.fontFamily === font.id;
              return (
                <div
                  key={font.id}
                  id={`font-card-${font.id.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => updateConfig({
                    titleFontStyle: {
                      ...designConfig.titleFontStyle,
                      fontFamily: font.id
                    }
                  })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-400"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-zinc-900">{font.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-amber-600" />}
                    </div>
                    <span className="text-[9px] font-semibold uppercase text-zinc-400 block mb-2">
                      {font.tag}
                    </span>

                    {/* Live Font Sample Render */}
                    <div
                      className={`text-sm py-2 px-1 text-zinc-900 border-y border-zinc-100 font-bold truncate ${getFontFamilyClass(
                        font.id
                      )}`}
                    >
                      {font.sample}
                    </div>

                    <p className="text-[10px] text-zinc-500 leading-tight mt-2">
                      {font.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typography Details (Casing, Weight, Letter-spacing) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200">
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Title Weight
              </label>
              <select
                value={designConfig.titleFontStyle.weight}
                onChange={(e) => updateConfig({
                  titleFontStyle: {
                    ...designConfig.titleFontStyle,
                    weight: e.target.value as any
                  }
                })}
                className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800"
              >
                <option value="SemiBold 600">SemiBold 600</option>
                <option value="Bold 700">Bold 700 (Standard)</option>
                <option value="ExtraBold 800">ExtraBold 800</option>
                <option value="Black 900">Black 900 (Ultra Heavy)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Title Casing
              </label>
              <select
                value={designConfig.titleFontStyle.casing}
                onChange={(e) => updateConfig({
                  titleFontStyle: {
                    ...designConfig.titleFontStyle,
                    casing: e.target.value as any
                  }
                })}
                className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800"
              >
                <option value="Sentence case">Sentence case</option>
                <option value="Title Case">Title Case</option>
                <option value="UPPERCASE (Spaced)">UPPERCASE (All Caps)</option>
                <option value="lowercase (minimal)">lowercase (minimal)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Letter Spacing (Tracking)
              </label>
              <select
                value={designConfig.titleFontStyle.letterSpacing}
                onChange={(e) => updateConfig({
                  titleFontStyle: {
                    ...designConfig.titleFontStyle,
                    letterSpacing: e.target.value as any
                  }
                })}
                className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800"
              >
                <option value="Tight (-0.03em)">Tight (-0.03em Modern)</option>
                <option value="Normal (0em)">Normal (0em)</option>
                <option value="Wide (+0.05em)">Wide (+0.05em)</option>
                <option value="Ultra-Wide (+0.15em)">Ultra-Wide (+0.15em Spaced)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 3D EFFECT FOR TITLES */}
      {activeTab === "effects3d" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              5. 3D & Dimensional Visual Treatments for Titles:
            </label>
            <p className="text-xs text-zinc-500">
              Apply rich spatial depth, isometric offsets, metallic chiseled relief, or luminous neon 3D glow to key headlines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {effect3DOptions.map((eff) => {
              const isSelected = designConfig.title3DEffect.effectType === eff.id;
              return (
                <div
                  key={eff.id}
                  id={`3d-effect-${eff.id}`}
                  onClick={() => updateConfig({
                    title3DEffect: {
                      ...designConfig.title3DEffect,
                      effectType: eff.id
                    }
                  })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-400"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-zinc-900">{eff.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                        {eff.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-1">{eff.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3D Preview Playground Text Editor */}
          <div className="bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Live 3D Title Playground Text
              </label>
              <span className="text-[10px] text-zinc-400">
                Type anything to see it render live in the banner above
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  id="input-3d-preview-text"
                  value={designConfig.title3DEffect.previewText}
                  onChange={(e) => updateConfig({
                    title3DEffect: {
                      ...designConfig.title3DEffect,
                      previewText: e.target.value
                    }
                  })}
                  placeholder="e.g. BOLD DIGITAL HORIZON"
                  className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <select
                  value={designConfig.title3DEffect.intensity}
                  onChange={(e) => updateConfig({
                    title3DEffect: {
                      ...designConfig.title3DEffect,
                      intensity: e.target.value as any
                    }
                  })}
                  className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800"
                >
                  <option value="Subtle">Intensity: Subtle</option>
                  <option value="Medium">Intensity: Medium</option>
                  <option value="Dramatic">Intensity: Dramatic</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
