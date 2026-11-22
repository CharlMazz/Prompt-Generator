import React, { useState } from "react";
import {
  X,
  Plus,
  RefreshCw,
  Sparkles,
  Layers,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  FileCode,
  CheckCircle2,
  Bookmark,
  ArrowRight
} from "lucide-react";
import { SavedPromptTemplate, DesignSystemConfig, SelectedSectionConfig } from "../types";
import { DEFAULT_DESIGN_SYSTEM } from "../constants/designSystemTemplates";
import { DEFAULT_INITIAL_SECTIONS } from "../constants/sectionTemplates";

export interface StarterArchetype {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  clientName: string;
  clientUrl: string;
  designConfig: DesignSystemConfig;
  selectedSections: SelectedSectionConfig[];
  chosenFeatures: string[];
}

export const STARTER_ARCHETYPES: StarterArchetype[] = [
  {
    id: "blank",
    name: "Clean Blank Canvas",
    category: "Fresh Slate",
    tagline: "Empty form fields & default baseline settings",
    description: "Start completely from scratch without pre-filled copy, ready for your own client details and custom specifications.",
    icon: <FileCode className="w-5 h-5 text-amber-500" />,
    clientName: "",
    clientUrl: "",
    designConfig: DEFAULT_DESIGN_SYSTEM,
    selectedSections: DEFAULT_INITIAL_SECTIONS,
    chosenFeatures: [
      "Animated Slides",
      "Entry Animations",
      "Video Background Overlay"
    ]
  },
  {
    id: "saas",
    name: "Modern SaaS & AI Platform",
    category: "Software & Tech",
    tagline: "High-conversion tech hero, pricing tiers & feature matrix",
    description: "Tailored for developer tools, B2B platforms, and AI assistants with dark neon accents and interactive value metrics.",
    icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
    clientName: "Synthetix AI",
    clientUrl: "https://synthetix.example.com",
    designConfig: {
      paletteId: "obsidian-cyan",
      colors: {
        primary: "#06B6D4",
        secondary: "#3B82F6",
        background: "#090D16",
        surface: "#111827",
        text: "#F9FAFB",
        accent: "#22D3EE"
      },
      layoutStyle: "Tech Modern Dark Glass",
      containerWidth: "Standard Max-Width (1280px)",
      cornerRounding: "Smooth Rounded (16px)",
      backgroundTexture: "Subtle Grid Dot Matrix",
      mobileAppLook: {
        mode: "Bottom Sheet & Action Drawers",
        navigationStyle: "Minimal Top App Bar",
        showAppLikeHeader: true,
        touchOptimizedButtons: true
      },
      titleFontStyle: {
        fontFamily: "Space Grotesk",
        weight: "Bold 700",
        casing: "UPPERCASE (Spaced)",
        letterSpacing: "Wide (+0.05em)"
      },
      title3DEffect: {
        effectType: "perspective_tilt",
        intensity: "Dramatic",
        previewText: "AUTOPILOT FOR YOUR WORKFLOW"
      },
      navbarStyle: "Floating Glassmorphic Pill"
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Interactive SaaS Hero",
        selectedLayout: "High-Conversion SaaS Hero (Mockup Right)",
        enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar", "stats_counter", "featured_preview"],
        enabledEnhancements: ["scroll_animations", "glassmorphism_nav"],
        customNotes: "Live interactive telemetry dashboard mockup."
      },
      {
        sectionId: "features",
        name: "Core Platform Capabilities",
        selectedLayout: "Bento Grid System",
        enabledSubmodules: ["bento_grid", "feature_comparison", "metrics_callout"],
        enabledEnhancements: ["interactive_tooltips", "micro_interactions"],
        customNotes: "Bento cards showcasing latency benchmarks and API integration."
      },
      {
        sectionId: "pricing",
        name: "Transparent Pricing Tiers",
        selectedLayout: "Monthly/Annual Switcher Cards",
        enabledSubmodules: ["toggle_frequency", "feature_checklist", "enterprise_card"],
        enabledEnhancements: ["popular_badge_pulse", "currency_selector"],
        customNotes: "Highlight Developer Free tier vs Growth vs Enterprise."
      },
      {
        sectionId: "contact",
        name: "Interactive Demo Request",
        selectedLayout: "Two-Column Split Form + Office Info",
        enabledSubmodules: ["input_fields", "budget_chips", "calendly_embed"],
        enabledEnhancements: ["instant_validation"],
        customNotes: "Include demo scheduling widget."
      }
    ],
    chosenFeatures: [
      "Animated Slides",
      "Entry Animations",
      "Light/Dark Switch",
      "Dynamic Contact Form",
      "Navigation Bar Styles"
    ]
  },
  {
    id: "architecture",
    name: "Luxury Architecture & Design",
    category: "Design & Heritage",
    tagline: "Swiss typography, full-bleed imagery & spatial depth",
    description: "Crafted for architectural practices, industrial designers, and luxury creators prioritizing editorial finesse.",
    icon: <Building2 className="w-5 h-5 text-amber-400" />,
    clientName: "Atelier Völker",
    clientUrl: "https://atelier-voelker.example.ch",
    designConfig: {
      paletteId: "monochrome-swiss",
      colors: {
        primary: "#18181B",
        secondary: "#71717A",
        background: "#FAFAFA",
        surface: "#FFFFFF",
        text: "#09090B",
        accent: "#52525B"
      },
      layoutStyle: "Minimalist High-Contrast Type",
      containerWidth: "Full-Bleed Dynamic Width",
      cornerRounding: "Sharp Corners (0px)",
      backgroundTexture: "Clean Solid",
      mobileAppLook: {
        mode: "Bottom Sheet & Action Drawers",
        navigationStyle: "Minimal Top App Bar",
        showAppLikeHeader: true,
        touchOptimizedButtons: true
      },
      titleFontStyle: {
        fontFamily: "Syne",
        weight: "Black 900",
        casing: "UPPERCASE (Spaced)",
        letterSpacing: "Ultra-Wide (+0.15em)"
      },
      title3DEffect: {
        effectType: "isometric_layered",
        intensity: "Dramatic",
        previewText: "GEOMETRY OF SILENCE"
      },
      navbarStyle: "Centered Luxury Wordmark"
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Architectural Showcase Hero",
        selectedLayout: "Full-Width Ambient Video Hero",
        enabledSubmodules: ["hero_banner", "value_props", "stats_counter"],
        enabledEnhancements: ["scroll_animations", "glassmorphism_nav"],
        customNotes: "Full-screen video reel of completed concrete & glass residences."
      },
      {
        sectionId: "portfolio",
        name: "Monograph Project Index",
        selectedLayout: "Categorized Filterable Masonry Grid",
        enabledSubmodules: ["filter_pills", "project_cards", "hover_zoom", "stats_counter"],
        enabledEnhancements: ["lightbox_modal", "category_counts"],
        customNotes: "Filter by Residential, Cultural, and Landscape Urbanism."
      },
      {
        sectionId: "about",
        name: "Studio Philosophy & Heritage",
        selectedLayout: "Split Editorial Image + Brand Manifesto",
        enabledSubmodules: ["story_timeline", "core_values", "founder_spotlight", "certifications"],
        enabledEnhancements: ["counter_years"],
        customNotes: "Highlight Swiss precision, sustainable materials, and RIBA awards."
      }
    ],
    chosenFeatures: [
      "Video Background Overlay",
      "Interactive Parallax",
      "Live Filterable Grid",
      "Navigation Bar Styles"
    ]
  },
  {
    id: "ecommerce",
    name: "E-Commerce Flagship Store",
    category: "Retail & Goods",
    tagline: "Dynamic product carousel, reviews & sticky conversion dock",
    description: "Optimized for direct-to-consumer lifestyle brands with instant visual impact and seamless mobile cart actions.",
    icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
    clientName: "Luminary Goods",
    clientUrl: "https://luminary-goods.example.com",
    designConfig: {
      paletteId: "warm-editorial",
      colors: {
        primary: "#D97706",
        secondary: "#B45309",
        background: "#0F172A",
        surface: "#1E293B",
        text: "#F8FAFC",
        accent: "#F59E0B"
      },
      layoutStyle: "Editorial Luxury Serif",
      containerWidth: "Standard Max-Width (1280px)",
      cornerRounding: "Smooth Rounded (16px)",
      backgroundTexture: "Subtle Grid Dot Matrix",
      mobileAppLook: {
        mode: "Native App Shell (Bottom Bar + Safe Area)",
        navigationStyle: "Minimal Top App Bar",
        showAppLikeHeader: true,
        touchOptimizedButtons: true
      },
      titleFontStyle: {
        fontFamily: "Playfair Display",
        weight: "Bold 700",
        casing: "Title Case",
        letterSpacing: "Tight (-0.03em)"
      },
      title3DEffect: {
        effectType: "metallic_emboss",
        intensity: "Subtle",
        previewText: "CRAFTED FOR GENERATIONS"
      },
      navbarStyle: "Floating Action Dock Pill"
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Editorial Brand Hero",
        selectedLayout: "High-Conversion SaaS Hero (Mockup Right)",
        enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar"],
        enabledEnhancements: ["scroll_animations", "glassmorphism_nav"],
        customNotes: "Feature the flagship collection with glowing CTA."
      },
      {
        sectionId: "portfolio",
        name: "Curated Product Showcase",
        selectedLayout: "Categorized Filterable Masonry Grid",
        enabledSubmodules: ["filter_pills", "project_cards", "hover_zoom"],
        enabledEnhancements: ["lightbox_modal", "category_counts"],
        customNotes: "Showcase limited edition apparel and ceramics."
      },
      {
        sectionId: "testimonials",
        name: "Verified Customer Reviews",
        selectedLayout: "Interactive Testimonial Carousel",
        enabledSubmodules: ["author_avatar", "star_rating", "verified_buyer_badge"],
        enabledEnhancements: ["auto_scroll"],
        customNotes: "Include Trustpilot 4.9/5 star average badge."
      }
    ],
    chosenFeatures: [
      "Animated Slides",
      "Live Filterable Grid",
      "Dynamic Contact Form",
      "Responsive Mega-Menu"
    ]
  },
  {
    id: "hospitality",
    name: "Artisan Café & Hospitality",
    category: "Food & Venue",
    tagline: "Atmospheric imagery, culinary menu & table reservations",
    description: "Designed for boutique coffee houses, bistros, and dining experiences with warm earthy tones and quick reservations.",
    icon: <UtensilsCrossed className="w-5 h-5 text-amber-500" />,
    clientName: "Café Miel & Canela",
    clientUrl: "https://mielcanela.example.com",
    designConfig: {
      paletteId: "warm-editorial",
      colors: {
        primary: "#B45309",
        secondary: "#78350F",
        background: "#FFFBEB",
        surface: "#FEF3C7",
        text: "#451A03",
        accent: "#F59E0B"
      },
      layoutStyle: "Warm Creative Neo-Brutalist",
      containerWidth: "Standard Max-Width (1280px)",
      cornerRounding: "Pill Full Rounded (9999px)",
      backgroundTexture: "Clean Solid",
      mobileAppLook: {
        mode: "Bottom Sheet & Action Drawers",
        navigationStyle: "Minimal Top App Bar",
        showAppLikeHeader: true,
        touchOptimizedButtons: true
      },
      titleFontStyle: {
        fontFamily: "Playfair Display",
        weight: "Bold 700",
        casing: "Title Case",
        letterSpacing: "Normal (0em)"
      },
      title3DEffect: {
        effectType: "floating_elevation",
        intensity: "Dramatic",
        previewText: "AROMA CRAFTED BY HAND"
      },
      navbarStyle: "Floating Glassmorphic Pill"
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Artisan Café Hero",
        selectedLayout: "Split Editorial Image + Brand Manifesto",
        enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar"],
        enabledEnhancements: ["scroll_animations"],
        customNotes: "Warm morning sunlight atmosphere with specialty espresso."
      },
      {
        sectionId: "services",
        name: "Seasonal Tasting Menu",
        selectedLayout: "3-Column Feature Grid with Icons",
        enabledSubmodules: ["service_cards", "pricing_hints", "cta_booking"],
        enabledEnhancements: ["popular_tag"],
        customNotes: "List artisan coffees, fresh sourdough pastries, and brunch plates."
      },
      {
        sectionId: "contact",
        name: "Table Reservation & Map",
        selectedLayout: "Two-Column Split Form + Office Info",
        enabledSubmodules: ["input_fields", "business_hours", "google_maps_embed"],
        enabledEnhancements: ["instant_validation"],
        customNotes: "Include opening hours and reservation time slots."
      }
    ],
    chosenFeatures: [
      "Animated Slides",
      "Dynamic Contact Form",
      "Interactive Parallax"
    ]
  }
];

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: (archetypeId: string, saveCurrentBackup: boolean) => void;
  currentClientName?: string;
  hasExistingData: boolean;
}

export default function NewProjectModal({
  isOpen,
  onClose,
  onConfirmReset,
  currentClientName,
  hasExistingData
}: NewProjectModalProps) {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>("blank");
  const [saveBackup, setSaveBackup] = useState<boolean>(hasExistingData);

  if (!isOpen) return null;

  const handleStart = () => {
    onConfirmReset(selectedArchetypeId, saveBackup);
    onClose();
  };

  const selectedArchetype = STARTER_ARCHETYPES.find((a) => a.id === selectedArchetypeId) || STARTER_ARCHETYPES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden text-zinc-100 max-h-[90vh]">
        
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm font-semibold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Start a New Site Project
                <span className="text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  Reset Settings
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Reset your workflow and configuration to begin assembling another website specification.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 min-h-0">
          
          {/* Backup Checkbox Warning */}
          {hasExistingData && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 flex items-start gap-3">
              <input
                type="checkbox"
                id="check-save-backup"
                checked={saveBackup}
                onChange={(e) => setSaveBackup(e.target.checked)}
                className="mt-0.5 rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500 cursor-pointer w-4 h-4"
              />
              <div className="text-xs space-y-0.5 flex-1">
                <label htmlFor="check-save-backup" className="font-semibold text-zinc-200 cursor-pointer flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  Save current project into Template Library before resetting
                </label>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Automatically archives your current settings (client: <span className="text-amber-300 font-medium">{currentClientName || "Untitled Project"}</span>) into your local templates so you can restore or reference it anytime.
                </p>
              </div>
            </div>
          )}

          {/* Archetype Starter Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
              <span>Choose your Starting Point:</span>
              <span className="text-[11px] text-zinc-500 font-normal">
                {STARTER_ARCHETYPES.length} curated archetypes
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STARTER_ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetypeId === arch.id;
                return (
                  <div
                    key={arch.id}
                    id={`starter-archetype-${arch.id}`}
                    onClick={() => setSelectedArchetypeId(arch.id)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/40"
                        : "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700 shrink-0">
                            {arch.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">
                              {arch.name}
                            </h4>
                            <span className="text-[10px] text-amber-400 font-medium">
                              {arch.category}
                            </span>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-amber-500 border-amber-600 text-zinc-950" : "border-zinc-700 bg-zinc-900"
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                        {arch.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500">
                      <span>{arch.selectedSections.length} sections included</span>
                      <span>{arch.chosenFeatures.length} interactive features</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Preview Box of selected Archetype */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3.5 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-300">
                Selected: <strong className="text-white">{selectedArchetype.name}</strong>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {selectedArchetype.id === "blank" ? "Zero pre-fills" : "Curated defaults"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {selectedArchetype.tagline}. Starting with this archetype will reset step progress back to Step 1.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <footer className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            id="btn-confirm-reset-new-site"
            onClick={handleStart}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Settings & Start New Site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </footer>

      </div>
    </div>
  );
}
