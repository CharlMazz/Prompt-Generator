export type QuestionType =
  | "text"
  | "textarea"
  | "url"
  | "url-list"
  | "multi-select"
  | "select"
  | "features-select"
  | "file-upload";

export interface Question {
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: QuestionType;
  options?: string[];
  category: "Client & Branding" | "Inspiration" | "Features & Tech" | "Content & Pages";
  required?: boolean;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface MediaFile {
  id: string;
  name: string;
  size: number;
  type: string;
  description: string; // Dynamic description of how to use it in the prompt
  dataUrl?: string; // Preview image
}

export interface CustomPreset {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface SavedPromptTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  createdAt: number;
  clientName: string;
  clientAddress?: string;
  clientUrl: string;
  clientSocials?: SocialLinks;
  referenceUrls: string[];
  features: string[];
  selectedSections: SelectedSectionConfig[];
  askMeColorsAndTheme?: boolean;
  designConfig?: DesignSystemConfig;
  answers: { questionId: string; value: string | string[] }[];
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface SectionEnhancementOption {
  id: string;
  label: string;
  description: string;
}

export interface SectionSubmodule {
  id: string;
  label: string;
  description: string;
}

export interface SectionTemplate {
  id: string;
  name: string;
  category: "Core" | "Commercial" | "Social Proof" | "Informational";
  description: string;
  iconName: string;
  defaultLayout: string;
  layoutOptions: string[];
  submodules: SectionSubmodule[];
  enhancementOptions: SectionEnhancementOption[];
}

export interface SelectedSectionConfig {
  sectionId: string;
  name: string;
  selectedLayout: string;
  enabledSubmodules: string[];
  enabledEnhancements: string[];
  customNotes?: string;
}

export interface ColorPaletteTemplate {
  id: string;
  name: string;
  category: "Dark Mode" | "Light Clean" | "Luxury & Editorial" | "Vibrant & Creative";
  description: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
}

export type TitleFontFamily =
  | "Space Grotesk"
  | "Playfair Display"
  | "Cinzel"
  | "Plus Jakarta Sans"
  | "Syne"
  | "Bebas Neue"
  | "JetBrains Mono"
  | "Cormorant Garamond";

export type Title3DEffectType =
  | "none"
  | "perspective_tilt"
  | "isometric_layered"
  | "metallic_emboss"
  | "neon_glow_3d"
  | "glass_relief_3d"
  | "floating_elevation";

export type NavbarStyleType =
  | "Floating Glassmorphic Pill"
  | "Sticky Edge-to-Edge Minimal"
  | "Centered Luxury Wordmark"
  | "Split Brand & Action Header"
  | "Mega-Menu Multi-Column"
  | "Bottom Tab Bar (iOS / Android)"
  | "Floating Action Dock Pill"
  | "Slide-In Fullscreen Overlay Drawer";

export interface DesignSystemConfig {
  paletteId: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
  layoutStyle: string;
  navbarStyle?: NavbarStyleType;
  containerWidth: string;
  cornerRounding: string;
  backgroundTexture: string;
  mobileAppLook: {
    mode: "Native App Shell (Bottom Bar + Safe Area)" | "Adaptive Responsive Web" | "Bottom Sheet & Action Drawers" | "Desktop-First Full Responsive";
    navigationStyle: "Bottom Tab Bar (iOS/Android)" | "Floating Action Dock Pill" | "Slide-In Fullscreen Drawer" | "Minimal Top App Bar";
    showAppLikeHeader: boolean;
    touchOptimizedButtons: boolean;
  };
  titleFontStyle: {
    fontFamily: TitleFontFamily;
    weight: "SemiBold 600" | "Bold 700" | "ExtraBold 800" | "Black 900";
    casing: "Sentence case" | "Title Case" | "UPPERCASE (Spaced)" | "lowercase (minimal)";
    letterSpacing: "Tight (-0.03em)" | "Normal (0em)" | "Wide (+0.05em)" | "Ultra-Wide (+0.15em)";
  };
  title3DEffect: {
    effectType: Title3DEffectType;
    intensity: "Subtle" | "Medium" | "Dramatic";
    previewText: string;
  };
}

