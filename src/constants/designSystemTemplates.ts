import { ColorPaletteTemplate, DesignSystemConfig } from "../types";

export const CURATED_COLOR_PALETTES: ColorPaletteTemplate[] = [
  {
    id: "obsidian-cyan",
    name: "Obsidian & Electric Cyan",
    category: "Dark Mode",
    description: "Deep galactic space obsidian with vibrant cyan highlights and crisp monospace typography.",
    primary: "#06B6D4",
    secondary: "#3B82F6",
    background: "#090D16",
    surface: "#111827",
    text: "#F3F4F6",
    accent: "#22D3EE"
  },
  {
    id: "espresso-cream",
    name: "Roasted Espresso & Cashmere Cream",
    category: "Luxury & Editorial",
    description: "Warm rich organic roasted coffee tones paired with soft oat cream and delicate champagne gold accents.",
    primary: "#B45309",
    secondary: "#D97706",
    background: "#1C1410",
    surface: "#2A1F1A",
    text: "#FDF8F3",
    accent: "#FBBF24"
  },
  {
    id: "nordic-slate",
    name: "Nordic Slate & Arctic Blue",
    category: "Light Clean",
    description: "High-trust crisp Scandinavian minimalism with icy cobalt touches and high-contrast charcoal text.",
    primary: "#2563EB",
    secondary: "#0284C7",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",
    accent: "#38BDF8"
  },
  {
    id: "emerald-gold",
    name: "Emerald Velvet & Imperial Gold",
    category: "Luxury & Editorial",
    description: "Sophisticated deep British racing green with lustrous warm gold borders and high-end prestige.",
    primary: "#D97706",
    secondary: "#059669",
    background: "#06231A",
    surface: "#0D382B",
    text: "#F4FBF7",
    accent: "#F59E0B"
  },
  {
    id: "sunset-indigo",
    name: "Sunset Coral & Deep Indigo",
    category: "Vibrant & Creative",
    description: "Punchy modern creative studio palette blending warm energetic coral with deep cosmic indigo.",
    primary: "#F43F5E",
    secondary: "#6366F1",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    accent: "#FB7185"
  },
  {
    id: "monochrome-swiss",
    name: "Swiss Monochrome & Pure Bone",
    category: "Light Clean",
    description: "Ultra-clean stark architectural contrast with pure neutral grayscale and jet-black primary elements.",
    primary: "#18181B",
    secondary: "#71717A",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    text: "#09090B",
    accent: "#52525B"
  },
  {
    id: "midnight-violet",
    name: "Cyber Violet & Neon Iris",
    category: "Dark Mode",
    description: "Luminous futuristic purple aura with violet gradients and sleek dark glass surfaces.",
    primary: "#8B5CF6",
    secondary: "#C084FC",
    background: "#0D0A1A",
    surface: "#181432",
    text: "#F5F3FF",
    accent: "#A855F7"
  },
  {
    id: "terracotta-sand",
    name: "Warm Terracotta & Sunlit Sand",
    category: "Luxury & Editorial",
    description: "Earthy Mediterranean warmth with clay red highlights, natural linen beige, and olive undertones.",
    primary: "#EA580C",
    secondary: "#CA8A04",
    background: "#FAF7F2",
    surface: "#FFFFFF",
    text: "#292524",
    accent: "#F97316"
  }
];

export const DEFAULT_DESIGN_SYSTEM: DesignSystemConfig = {
  paletteId: "obsidian-cyan",
  colors: {
    primary: "#06B6D4",
    secondary: "#3B82F6",
    background: "#090D16",
    surface: "#111827",
    text: "#F3F4F6",
    accent: "#22D3EE"
  },
  layoutStyle: "Modern Bento Grid Showcase",
  navbarStyle: "Floating Glassmorphic Pill",
  containerWidth: "Standard Contained (max-w-7xl)",
  cornerRounding: "Smooth Modern (16px)",
  backgroundTexture: "Subtle Vignette + Fine Noise Grid",
  mobileAppLook: {
    mode: "Native App Shell (Bottom Bar + Safe Area)",
    navigationStyle: "Bottom Tab Bar (iOS/Android)",
    showAppLikeHeader: true,
    touchOptimizedButtons: true
  },
  titleFontStyle: {
    fontFamily: "Space Grotesk",
    weight: "Bold 700",
    casing: "Sentence case",
    letterSpacing: "Tight (-0.03em)"
  },
  title3DEffect: {
    effectType: "perspective_tilt",
    intensity: "Medium",
    previewText: "NEXT-GEN DIGITAL CRAFT"
  }
};

export interface NavbarStylePreset {
  id: string;
  name: string;
  category: "Desktop & Responsive" | "Mobile App Shell" | "Creative & Editorial";
  description: string;
  badge: string;
}

export const NAVBAR_STYLE_PRESETS: NavbarStylePreset[] = [
  {
    id: "Floating Glassmorphic Pill",
    name: "Floating Glassmorphic Pill",
    category: "Desktop & Responsive",
    description: "Floating rounded pill dock with translucent backdrop blur, brand wordmark, center links and glowing action button.",
    badge: "Modern Standard"
  },
  {
    id: "Sticky Edge-to-Edge Minimal",
    name: "Sticky Edge-to-Edge Minimal",
    category: "Desktop & Responsive",
    description: "Strict 1-row 3-zone architecture with hairline border, single brand text mark, and hover-underline text links.",
    badge: "Clean & High Trust"
  },
  {
    id: "Centered Luxury Wordmark",
    name: "Centered Luxury Wordmark",
    category: "Creative & Editorial",
    description: "Prestigious editorial layout featuring a centered display wordmark with symmetrical split navigation links.",
    badge: "Prestige & Editorial"
  },
  {
    id: "Split Brand & Action Header",
    name: "Split Brand & Action Header",
    category: "Desktop & Responsive",
    description: "High-conversion SaaS layout with brand logo on left, clean navigation links, and dual action CTAs on right.",
    badge: "SaaS & Commercial"
  },
  {
    id: "Mega-Menu Multi-Column",
    name: "Mega-Menu Multi-Column Dropdown",
    category: "Desktop & Responsive",
    description: "Rich dropdown architecture revealing multi-column link matrices, featured cards, and category showcases on hover.",
    badge: "E-Commerce & Portals"
  },
  {
    id: "Bottom Tab Bar (iOS / Android)",
    name: "Native Bottom Tab Bar (iOS / Android)",
    category: "Mobile App Shell",
    description: "Fixed at screen bottom with 4-5 touch-optimized icon tabs, active pill indicator, and safe-area padding.",
    badge: "Mobile PWA"
  },
  {
    id: "Floating Action Dock Pill",
    name: "Floating Action Dock Pill",
    category: "Mobile App Shell",
    description: "Translucent action dock floating above screen bottom with quick shortcuts and expanded menu trigger.",
    badge: "Touch Dock"
  },
  {
    id: "Slide-In Fullscreen Overlay Drawer",
    name: "Slide-In Fullscreen Overlay Drawer",
    category: "Creative & Editorial",
    description: "Full-viewport slide-over drawer triggered by hamburger icon with large typography, social links and contact info.",
    badge: "Atmospheric"
  }
];
