import React, { useState, useEffect } from "react";
import {
  Globe,
  Link as LinkIcon,
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Settings,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Layout,
  Terminal,
  Compass,
  FileText,
  MousePointerClick,
  CheckCircle2,
  Trash2,
  Sliders,
  Building,
  MapPin,
  Share2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Palette,
  Bookmark,
  FolderPlus,
  Eye,
  X
} from "lucide-react";
import { Question, Answer, MediaFile, SocialLinks, SelectedSectionConfig, DesignSystemConfig, SavedPromptTemplate } from "./types";
import MediaUploader from "./components/MediaUploader";
import QuestionCustomizer from "./components/QuestionCustomizer";
import PromptPreview from "./components/PromptPreview";
import WorkflowStepper from "./components/WorkflowStepper";
import SectionConfigurator from "./components/SectionConfigurator";
import TemplateLibraryModal from "./components/TemplateLibraryModal";
import ElementPreviewModal, { PRESET_FEATURES_LIST, InteractiveFeatureItem } from "./components/ElementPreviewModal";
import NewProjectModal, { STARTER_ARCHETYPES } from "./components/NewProjectModal";
import { DEFAULT_INITIAL_SECTIONS } from "./constants/sectionTemplates";
import { DEFAULT_DESIGN_SYSTEM } from "./constants/designSystemTemplates";

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "q_brand_colors",
    label: "What specific colors or aesthetic vibe fits the business?",
    description: "Define preferred palettes, modern slate/gold, minimalist monochrome, warm tones, or dark mode focus.",
    placeholder: "e.g., Luxury espresso black paired with soft cream and organic gold elements",
    type: "text",
    category: "Client & Branding"
  },
  {
    id: "q_brand_industry",
    label: "What is the core industry, mission, or audience?",
    description: "Helps tailor the copywriting tone and presentation layouts.",
    placeholder: "e.g., Artisanal direct-to-consumer coffee brand targeting sophisticated urban professionals",
    type: "textarea",
    category: "Client & Branding"
  },
  {
    id: "q_target_pages",
    label: "What specific sections or sitemap do you want?",
    description: "List the essential sections or page paths.",
    placeholder: "e.g., Home hero, Product exploration gallery, About source farming story, Interactive blog, Contact",
    type: "textarea",
    category: "Content & Pages"
  },
  {
    id: "q_custom_copy",
    label: "Is there any custom slogan or header copy to integrate?",
    description: "Provide headline specifications.",
    placeholder: "e.g., Headline: 'Aroma Crafted By Hand'. Slogan: 'Eco-sourced elite roasting delivered to your doorstep.'",
    type: "textarea",
    category: "Content & Pages"
  },
  {
    id: "q_extra_instructions",
    label: "Any additional backend / UI logic requests?",
    description: "E.g., currency converter, dark/light mode toggle behavior, booking appointment calendars.",
    placeholder: "e.g., Calendar selector to reserve custom roasting slots.",
    type: "text",
    category: "Features & Tech"
  }
];

interface WebsitePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  clientName: string;
  clientAddress?: string;
  clientUrl: string;
  clientSocials?: SocialLinks;
  referenceUrls: string[];
  features: string[];
  selectedSections?: SelectedSectionConfig[];
  designConfig?: DesignSystemConfig;
  answers: { questionId: string; value: string }[];
}

const PRESETS: WebsitePreset[] = [
  {
    id: "dtc-cafe",
    name: "Artisanal Coffee Shop",
    badge: "DTC & Retail",
    description: "Warm cream & deep espresso aesthetic with sliding product carousels.",
    clientName: "Sensory Brews Co.",
    clientAddress: "148 Roasters Way, Seattle, WA 98101",
    clientUrl: "https://sensorybrews.com",
    clientSocials: {
      instagram: "https://instagram.com/sensorybrewsco",
      facebook: "https://facebook.com/sensorybrews"
    },
    referenceUrls: ["https://dribbble.com/shots/coffeebar-concept", "https://awwwards.com/coffee-shop-minimal"],
    features: ["Animated Slides", "Entry Animations", "Video Background Overlay", "Live Filterable Grid"],
    designConfig: {
      paletteId: "espresso-cream",
      colors: {
        primary: "#B45309",
        secondary: "#D97706",
        background: "#1C1410",
        surface: "#2A1F1A",
        text: "#FDF8F3",
        accent: "#FBBF24"
      },
      layoutStyle: "Split Editorial Canvas",
      containerWidth: "Standard Contained (max-w-7xl)",
      cornerRounding: "Smooth Modern (16px)",
      backgroundTexture: "Fine Dot Grid / Mesh Texture",
      mobileAppLook: {
        mode: "Native App Shell (Bottom Bar + Safe Area)",
        navigationStyle: "Bottom Tab Bar (iOS/Android)",
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
        effectType: "floating_elevation",
        intensity: "Medium",
        previewText: "AROMA CRAFTED BY HAND"
      }
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Home / Landing Hero",
        selectedLayout: "Split Headline + Dynamic CTA Hero",
        enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar", "stats_counter"],
        enabledEnhancements: ["scroll_animations", "glassmorphism_nav", "floating_badge"],
        customNotes: "Aroma Crafted by Hand headline with direct shop CTA."
      },
      {
        sectionId: "services",
        name: "Single-Origin Coffee Menu",
        selectedLayout: "Interactive Filterable Service Cards",
        enabledSubmodules: ["service_tabs", "deliverables_list", "booking_cta"],
        enabledEnhancements: ["hover_zoom", "price_estimator"],
        customNotes: "Filter by Roast level: Light, Medium, Dark, Espresso."
      },
      {
        sectionId: "about",
        name: "Our Ethical Origin Story",
        selectedLayout: "Storytelling Chronological Timeline",
        enabledSubmodules: ["story_timeline", "core_values", "founder_spotlight"],
        enabledEnhancements: ["counter_years", "video_story"],
        customNotes: "Showcase high altitude direct trade farming partners."
      },
      {
        sectionId: "testimonials",
        name: "Customer Reviews",
        selectedLayout: "Infinite Auto-Scrolling Carousel",
        enabledSubmodules: ["rating_summary", "verified_badge", "pull_quote"],
        enabledEnhancements: ["infinite_marquee", "platform_badges"],
        customNotes: "Highlight verified subscriber quotes and coffee critic praise."
      },
      {
        sectionId: "contact",
        name: "Roastery Cafe & Orders",
        selectedLayout: "Split Inquiry Form & Interactive Location Map",
        enabledSubmodules: ["inquiry_form", "address_hours", "map_embed", "chat_buttons"],
        enabledEnhancements: ["success_animation"],
        customNotes: "Include cafe opening hours and Seattle roastery map pin."
      }
    ],
    answers: [
      { questionId: "q_brand_colors", value: "Warm roasted espresso black paired with soft cashmere cream, oat gold accents, and organic serif typography" },
      { questionId: "q_brand_industry", value: "Artisanal direct-to-consumer coffee roasting company focusing on single-origin, low-acid beans sourced ethically from high-altitude farms. Target audience is suburban coffee enthusiasts and premium kitchen collectors." },
      { questionId: "q_target_pages", value: "1. Immersive Hero section with ambient steam video\n2. Origin Story scrolling timeline\n3. Single-Origin interactive shop catalog\n4. Subscription Tier custom cards\n5. Brewing guides blog posts grid" },
      { questionId: "q_custom_copy", value: "Hero Title: 'AROMA CRAFTED BY HAND'\nHero Subtitle: 'Eco-sourced premium roasting delivered to your door within 48 hours of heat application.'" },
      { questionId: "q_extra_instructions", value: "A persistent shopping cart slide-out drawer on the desktop right header, plus a mini-brewing calculation widget based on cup volume selected." }
    ]
  },
  {
    id: "b2b-saas",
    name: "AI SaaS Platform",
    badge: "Tech & Software",
    description: "Next-gen obsidian dark mode dashboard with glowing neon accents.",
    clientName: "TaskMatrix AI",
    clientAddress: "500 Howard Street, Suite 300, San Francisco, CA 94105",
    clientUrl: "https://taskmatrix.ai",
    clientSocials: {
      twitter: "https://x.com/taskmatrix_ai",
      linkedin: "https://linkedin.com/company/taskmatrix"
    },
    referenceUrls: ["https://v0.dev/explore", "https://linear.app"],
    features: ["Light/Dark Switch", "Entry Animations", "Dynamic Contact Form", "Interactive Parallax"],
    designConfig: {
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
      containerWidth: "Standard Contained (max-w-7xl)",
      cornerRounding: "Smooth Modern (16px)",
      backgroundTexture: "Fine Dot Grid / Mesh Texture",
      mobileAppLook: {
        mode: "Native App Shell (Bottom Bar + Safe Area)",
        navigationStyle: "Bottom Tab Bar (iOS/Android)",
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
        intensity: "Medium",
        previewText: "AUTOPILOT FOR YOUR WORKFLOW"
      }
    },
    selectedSections: [
      {
        sectionId: "home",
        name: "Platform Overview Hero",
        selectedLayout: "Modern Bento Grid Showcase",
        enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar", "stats_counter", "featured_preview"],
        enabledEnhancements: ["scroll_animations", "glassmorphism_nav", "interactive_particles"],
        customNotes: "Live interactive CLI simulator showing automated agent pipelines."
      },
      {
        sectionId: "services",
        name: "Enterprise Solutions",
        selectedLayout: "Comparison Matrix Grid",
        enabledSubmodules: ["service_tabs", "deliverables_list", "workflow_steps"],
        enabledEnhancements: ["hover_zoom", "price_estimator"],
        customNotes: "Break down developer APIs, workflow automations, and AI copilots."
      },
      {
        sectionId: "pricing",
        name: "Flexible Pricing Tiers",
        selectedLayout: "3-Tier Cards with Monthly/Annual Toggle",
        enabledSubmodules: ["billing_toggle", "popular_badge", "feature_checklist", "custom_enterprise"],
        enabledEnhancements: ["guarantee_badge", "faq_embed", "currency_selector"],
        customNotes: "Starter, Pro, and Enterprise with annual 20% discount toggle."
      },
      {
        sectionId: "testimonials",
        name: "Loved by 10,000+ Engineers",
        selectedLayout: "Trustpilot / Google Reviews Grid",
        enabledSubmodules: ["rating_summary", "verified_badge", "pull_quote"],
        enabledEnhancements: ["platform_badges"],
        customNotes: "Feature quotes from CTOs and engineering directors."
      },
      {
        sectionId: "faq",
        name: "Frequently Asked Questions",
        selectedLayout: "Clean Expandable Accordion List",
        enabledSubmodules: ["accordions", "topic_groups", "support_cta"],
        enabledEnhancements: ["faq_search", "voting_buttons"],
        customNotes: "Cover data security, SOC-2 compliance, and API rate limits."
      },
      {
        sectionId: "contact",
        name: "Request Enterprise Demo",
        selectedLayout: "Multi-Step Guided Inquiry Wizard",
        enabledSubmodules: ["inquiry_form", "chat_buttons"],
        enabledEnhancements: ["file_attachment", "success_animation"],
        customNotes: "Fast response form with Calendly calendar embed."
      }
    ],
    answers: [
      { questionId: "q_brand_colors", value: "Space obsidian black canvas, translucent glass panels with thin white border strokes, electric turquoise highlights, and crisp monospaced coordinates." },
      { questionId: "q_brand_industry", value: "Cybernetic workspace productivity SaaS that automatically models and visualizes teamwork flows using light generative AI models." },
      { questionId: "q_target_pages", value: "1. Premium landing page with layout grids\n2. Live interactive pricing grid with year/month toggle\n3. Dynamic command-bar mockup showcase\n4. Interactive API playground segment\n5. Clean SaaS Contact forum" },
      { questionId: "q_custom_copy", value: "Hero Title: 'AUTOPILOT FOR YOUR WORKFLOW'\nHero Subtitle: 'Visualize team productivity and eliminate bottleneck delays automatically.'" },
      { questionId: "q_extra_instructions", value: "A live mock CLI terminal widget on the home hero section where visitors can type sample commands and watch instant workflow charts render." }
    ]
  },
  {
    id: "creative-arch",
    name: "Architecture Studio",
    badge: "Creative Agency",
    description: "High-contrast Swiss layout featuring bold type and clean negative space.",
    clientName: "Concrete & Glass Studio",
    clientAddress: "Bahnhofstrasse 42, 8001 Zürich, Switzerland",
    clientUrl: "https://concreteandglass.net",
    clientSocials: {
      instagram: "https://instagram.com/concreteandglass",
      linkedin: "https://linkedin.com/company/concreteglass"
    },
    referenceUrls: ["https://behance.net/architecture-swiss", "https://framersimplified.com"],
    features: ["Interactive Parallax", "Video Background Overlay", "Entry Animations", "Live Filterable Grid"],
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
      }
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
        sectionId: "about",
        name: "Studio Philosophy & Heritage",
        selectedLayout: "Split Editorial Image + Brand Manifesto",
        enabledSubmodules: ["story_timeline", "core_values", "founder_spotlight", "certifications"],
        enabledEnhancements: ["counter_years"],
        customNotes: "Highlight Swiss precision, sustainable materials, and RIBA awards."
      },
      {
        sectionId: "portfolio",
        name: "Selected Architectural Works",
        selectedLayout: "Filterable Masonry Project Grid",
        enabledSubmodules: ["category_filters", "project_modal", "results_metrics", "live_links"],
        enabledEnhancements: ["lightbox_zoom", "before_after_slider", "tech_stack_pills"],
        customNotes: "High-resolution project gallery with blueprint overlay toggles."
      },
      {
        sectionId: "testimonials",
        name: "Client Stories & Press",
        selectedLayout: "Prominent Quote Spotlight + Video Card",
        enabledSubmodules: ["rating_summary", "verified_badge", "pull_quote"],
        enabledEnhancements: ["platform_badges"],
        customNotes: "Press excerpts from Architectural Digest and Dezeen."
      },
      {
        sectionId: "contact",
        name: "Inquire & Studio Location",
        selectedLayout: "Split Inquiry Form & Interactive Location Map",
        enabledSubmodules: ["inquiry_form", "address_hours", "map_embed", "chat_buttons"],
        enabledEnhancements: ["file_attachment", "success_animation"],
        customNotes: "Zürich studio consultation bookings and blueprint upload dropzone."
      }
    ],
    answers: [
      { questionId: "q_brand_colors", value: "High-contrast editorial stark theme: pure bone white backgrounds, rich charcoal dark primary paragraphs, asymmetrical borders, and space grostesk typography" },
      { questionId: "q_brand_industry", value: "Avant-garde architecture and custom interior modeling agency specialized in minimalist residential houses using glass and raw concrete." },
      { questionId: "q_target_pages", value: "1. Striking minimal header\n2. Masonry portfolio showcase with instant filtering\n3. Architectural blueprint layout\n4. Interactive contact inquiry" },
      { questionId: "q_custom_copy", value: "Hero Title: 'GEOMETRY OF SILENCE'\nHero Subtitle: 'We design custom spaces that capture quietude, light balance, and structural truth.'" },
      { questionId: "q_extra_instructions", value: "A smooth custom page transition effect and a hover magnifying glass overlay on projects." }
    ]
  }
];

export default function App() {
  // Wizard steps definitions
  const steps = [
    { id: "identity", label: "Client Identity", icon: <Globe className="w-4 h-4" /> },
    { id: "sections", label: "Pages & Sections", icon: <Layout className="w-4 h-4" /> },
    { id: "features", label: "Special Features", icon: <Layers className="w-4 h-4" /> },
    { id: "details", label: "Specifications", icon: <FileText className="w-4 h-4" /> },
    { id: "assets", label: "Brand Assets", icon: <FolderIcon /> }
  ];

  function FolderIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"></path></svg>
    );
  }

  // --- STATE SYSTEM ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientUrl, setClientUrl] = useState("");
  const [clientSocials, setClientSocials] = useState<SocialLinks>({
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    tiktok: ""
  });
  const [referenceUrls, setReferenceUrls] = useState<string[]>([""]);
  const [designConfig, setDesignConfig] = useState<DesignSystemConfig>(DEFAULT_DESIGN_SYSTEM);
  const [selectedSections, setSelectedSections] = useState<SelectedSectionConfig[]>(DEFAULT_INITIAL_SECTIONS);
  const [chosenFeatures, setChosenFeatures] = useState<string[]>([
    "Animated Slides",
    "Entry Animations",
    "Video Background Overlay"
  ]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [askMeColorsAndTheme, setAskMeColorsAndTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem("lovable_ask_colors_theme");
    return saved !== null ? saved === "true" : true;
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false);

  // --- ELEMENT PREVIEW MODAL STATE ---
  const [isElementPreviewOpen, setIsElementPreviewOpen] = useState(false);
  const [elementPreviewTab, setElementPreviewTab] = useState<"sections" | "navbars" | "features" | "design">("sections");
  const [elementPreviewSectionId, setElementPreviewSectionId] = useState<string>("home");
  const [elementPreviewFeatureName, setElementPreviewFeatureName] = useState<string | undefined>(undefined);
  const [hoveredWizardFeature, setHoveredWizardFeature] = useState<{
    feature: InteractiveFeatureItem;
    x: number;
    y: number;
  } | null>(null);

  const handleOpenElementPreview = (
    tab: "sections" | "navbars" | "features" | "design" = "sections",
    sectionId?: string,
    featureName?: string
  ) => {
    setElementPreviewTab(tab);
    if (sectionId) setElementPreviewSectionId(sectionId);
    if (featureName) setElementPreviewFeatureName(featureName);
    setIsElementPreviewOpen(true);
  };

  // --- TEMPLATE LIBRARY STATE ---
  const [savedTemplates, setSavedTemplates] = useState<SavedPromptTemplate[]>(() => {
    try {
      const saved = localStorage.getItem("lovable_saved_templates");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const handleSaveTemplate = (templateData: Omit<SavedPromptTemplate, "id" | "createdAt">) => {
    const newTemplate: SavedPromptTemplate = {
      ...templateData,
      id: "tpl_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      createdAt: Date.now()
    };
    const updated = [newTemplate, ...savedTemplates];
    setSavedTemplates(updated);
    localStorage.setItem("lovable_saved_templates", JSON.stringify(updated));
  };

  const handleDeleteTemplate = (id: string) => {
    const updated = savedTemplates.filter(t => t.id !== id);
    setSavedTemplates(updated);
    localStorage.setItem("lovable_saved_templates", JSON.stringify(updated));
  };

  const handleLoadTemplate = (template: SavedPromptTemplate) => {
    if (template.clientName !== undefined) setClientName(template.clientName);
    if (template.clientAddress !== undefined) setClientAddress(template.clientAddress);
    if (template.clientUrl !== undefined) setClientUrl(template.clientUrl);
    if (template.clientSocials !== undefined) setClientSocials(template.clientSocials);
    if (template.referenceUrls && template.referenceUrls.length > 0) setReferenceUrls(template.referenceUrls);
    if (template.features) setChosenFeatures(template.features);
    if (template.selectedSections) setSelectedSections(template.selectedSections);
    if (template.askMeColorsAndTheme !== undefined) setAskMeColorsAndTheme(template.askMeColorsAndTheme);
    if (template.designConfig) setDesignConfig(template.designConfig);
    if (template.answers) setAnswers(template.answers);
    setActivePresetId(template.id);
  };

  const handleImportTemplates = (imported: SavedPromptTemplate[]) => {
    const existingIds = new Set(savedTemplates.map(t => t.id));
    const newItems = imported.map(item => ({
      ...item,
      id: existingIds.has(item.id) ? "tpl_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7) : item.id,
      createdAt: item.createdAt || Date.now()
    }));
    const updated = [...newItems, ...savedTemplates];
    setSavedTemplates(updated);
    localStorage.setItem("lovable_saved_templates", JSON.stringify(updated));
  };
  
  // AI Generation States
  const [aiGeneratedPrompt, setAiGeneratedPrompt] = useState("");
  const [isGeneratingAiPrompt, setIsGeneratingAiPrompt] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiWarning, setAiWarning] = useState<string | null>(null);

  // --- PERSISTENCE EFFECT ---
  useEffect(() => {
    // Load custom questions
    const savedQuestions = localStorage.getItem("lovable_questions");
    if (savedQuestions) {
      try {
        setQuestions(JSON.parse(savedQuestions));
      } catch (e) {
        setQuestions(DEFAULT_QUESTIONS);
      }
    } else {
      setQuestions(DEFAULT_QUESTIONS);
    }

    // Load responses
    const savedAnswers = localStorage.getItem("lovable_answers");
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {}
    }

    // Loaded defaults
    const savedClientName = localStorage.getItem("lovable_client_name");
    if (savedClientName) setClientName(savedClientName);

    const savedClientAddress = localStorage.getItem("lovable_client_address");
    if (savedClientAddress) setClientAddress(savedClientAddress);

    const savedClientUrl = localStorage.getItem("lovable_client_url");
    if (savedClientUrl) setClientUrl(savedClientUrl);

    const savedSocials = localStorage.getItem("lovable_client_socials");
    if (savedSocials) {
      try {
        setClientSocials(JSON.parse(savedSocials));
      } catch (e) {}
    }

    const savedRefs = localStorage.getItem("lovable_reference_urls");
    if (savedRefs) {
      try {
        setReferenceUrls(JSON.parse(savedRefs));
      } catch (e) {}
    }

    const savedDesign = localStorage.getItem("lovable_design_config");
    if (savedDesign) {
      try {
        setDesignConfig(JSON.parse(savedDesign));
      } catch (e) {}
    }

    const savedSections = localStorage.getItem("lovable_selected_sections");
    if (savedSections) {
      try {
        setSelectedSections(JSON.parse(savedSections));
      } catch (e) {}
    }

    const savedFeatures = localStorage.getItem("lovable_chosen_features");
    if (savedFeatures) {
      try {
        setChosenFeatures(JSON.parse(savedFeatures));
      } catch (e) {}
    }
  }, []);

  // Save changes automatically
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("lovable_questions", JSON.stringify(questions));
    }
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("lovable_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("lovable_client_name", clientName);
  }, [clientName]);

  useEffect(() => {
    localStorage.setItem("lovable_client_address", clientAddress);
  }, [clientAddress]);

  useEffect(() => {
    localStorage.setItem("lovable_client_url", clientUrl);
  }, [clientUrl]);

  useEffect(() => {
    localStorage.setItem("lovable_client_socials", JSON.stringify(clientSocials));
  }, [clientSocials]);

  useEffect(() => {
    localStorage.setItem("lovable_reference_urls", JSON.stringify(referenceUrls));
  }, [referenceUrls]);

  useEffect(() => {
    localStorage.setItem("lovable_design_config", JSON.stringify(designConfig));
  }, [designConfig]);

  useEffect(() => {
    localStorage.setItem("lovable_selected_sections", JSON.stringify(selectedSections));
  }, [selectedSections]);

  useEffect(() => {
    localStorage.setItem("lovable_chosen_features", JSON.stringify(chosenFeatures));
  }, [chosenFeatures]);

  useEffect(() => {
    localStorage.setItem("lovable_ask_colors_theme", String(askMeColorsAndTheme));
  }, [askMeColorsAndTheme]);

  // --- DYNAMIC QUESTION ANSWERS ACTIONS ---
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => {
      const filtered = prev.filter((ans) => ans.questionId !== questionId);
      return [...filtered, { questionId, value }];
    });
  };

  const getAnswerValue = (questionId: string): string => {
    const ans = answers.find((item) => item.questionId === questionId);
    return ans && typeof ans.value === "string" ? ans.value : "";
  };

  // --- REFERENCE LINK LIST ACTIONS ---
  const handleAddRefUrl = () => {
    setReferenceUrls([...referenceUrls, ""]);
  };

  const handleRemoveRefUrl = (index: number) => {
    setReferenceUrls(referenceUrls.filter((_, idx) => idx !== index));
  };

  const handleRefUrlChange = (index: number, val: string) => {
    const updated = [...referenceUrls];
    updated[index] = val;
    setReferenceUrls(updated);
  };

  // --- RESET QUESTIONNAIRE OVERVIEW ---
  const handleResetQuestions = () => {
    if (window.confirm("Are you sure you want to reset all steps and questions to the initial sample questions? This will wipe your custom configurations.")) {
      setQuestions(DEFAULT_QUESTIONS);
      setAnswers([]);
      localStorage.removeItem("lovable_questions");
      localStorage.removeItem("lovable_answers");
    }
  };

  // --- APPLY PRESET TEMPLATE DATA ---
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const applyPreset = (preset: WebsitePreset) => {
    if (preset.clientName) setClientName(preset.clientName);
    if (preset.clientAddress !== undefined) setClientAddress(preset.clientAddress);
    if (preset.clientSocials !== undefined) setClientSocials(preset.clientSocials);
    setClientUrl(preset.clientUrl);
    setReferenceUrls(preset.referenceUrls);
    setChosenFeatures(preset.features);
    if (preset.selectedSections) {
      setSelectedSections(preset.selectedSections);
    }
    if (preset.designConfig) {
      setDesignConfig(preset.designConfig);
    }
    setActivePresetId(preset.id);
    
    // Prefill answer system
    const newAnswers = [...answers];
    preset.answers.forEach((presetAns) => {
      const existingIdx = newAnswers.findIndex((a) => a.questionId === presetAns.questionId);
      if (existingIdx !== -1) {
        newAnswers[existingIdx] = { questionId: presetAns.questionId, value: presetAns.value };
      } else {
        newAnswers.push({ questionId: presetAns.questionId, value: presetAns.value });
      }
    });
    setAnswers(newAnswers);
  };

  // --- NEW SITE PROJECT MANAGER ---
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleResetNewSite = (archetypeId: string, saveCurrentBackup: boolean) => {
    // 1. If backup requested and user has data, archive to templates
    if (saveCurrentBackup) {
      const backupTitle = clientName && clientName.trim() !== ""
        ? `${clientName} (Backup)`
        : `Site Project Backup ${new Date().toLocaleDateString()}`;
      handleSaveTemplate({
        name: backupTitle,
        badge: "Auto-Archived",
        description: `Snapshot archived prior to resetting project on ${new Date().toLocaleString()}.`,
        clientName: clientName || "Untitled Client",
        clientAddress: clientAddress || undefined,
        clientUrl: clientUrl || "",
        clientSocials,
        referenceUrls,
        features: chosenFeatures,
        selectedSections,
        askMeColorsAndTheme,
        designConfig,
        answers
      });
    }

    // 2. Determine target archetype
    const archetype = STARTER_ARCHETYPES.find((a) => a.id === archetypeId);

    if (archetype && archetype.id !== "blank") {
      setClientName(archetype.clientName);
      setClientAddress("");
      setClientUrl(archetype.clientUrl);
      setClientSocials({
        instagram: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        youtube: "",
        tiktok: ""
      });
      setReferenceUrls([""]);
      setDesignConfig(archetype.designConfig);
      setSelectedSections(archetype.selectedSections);
      setChosenFeatures(archetype.chosenFeatures);
      setQuestions(DEFAULT_QUESTIONS);
      setAnswers([]);
      setMediaFiles([]);
      setActivePresetId(archetype.id);
    } else {
      // Clean blank canvas
      setClientName("");
      setClientAddress("");
      setClientUrl("");
      setClientSocials({
        instagram: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        youtube: "",
        tiktok: ""
      });
      setReferenceUrls([""]);
      setDesignConfig(DEFAULT_DESIGN_SYSTEM);
      setSelectedSections(DEFAULT_INITIAL_SECTIONS);
      setChosenFeatures([
        "Animated Slides",
        "Entry Animations",
        "Video Background Overlay"
      ]);
      setQuestions(DEFAULT_QUESTIONS);
      setAnswers([]);
      setMediaFiles([]);
      setActivePresetId(null);
    }

    // Reset workflow progress
    setCurrentStep(0);
    setCompletedSteps([]);
    setAiGeneratedPrompt("");
    setAiError(null);
    setAiWarning(null);
    setIsCustomizerOpen(false);
    setIsElementPreviewOpen(false);

    // Clear saved progress from localStorage
    localStorage.removeItem("lovable_client_name");
    localStorage.removeItem("lovable_client_address");
    localStorage.removeItem("lovable_client_url");
    localStorage.removeItem("lovable_client_socials");
    localStorage.removeItem("lovable_reference_urls");
    localStorage.removeItem("lovable_answers");
    localStorage.removeItem("lovable_design_config");
    localStorage.removeItem("lovable_selected_sections");
    localStorage.removeItem("lovable_chosen_features");

    showToast(
      archetype && archetype.id !== "blank"
        ? `✨ Starter archetype "${archetype.name}" loaded! All settings reset.`
        : "✨ New site project initialized! All settings have been reset to a clean slate."
    );
  };

  // --- FEATURE TOGGLE MANAGER ---
  const presetFeatures = [
    { name: "Animated Slides", desc: "Fluid, high-performance carousel panels to feature products." },
    { name: "Entry Animations", desc: "Staggered fade, slide-in viewport scroll micro-interactions." },
    { name: "Video Background Overlay", desc: "Hero or background section loops with dim overlays." },
    { name: "Interactive Parallax", desc: "Page sections moving dynamically based on viewport speed." },
    { name: "Light/Dark Switch", desc: "Sleek sliding toggle to customize the view aesthetic." },
    { name: "Dynamic Contact Form", desc: "Polished input fields, client validation, success states." },
    { name: "Live Filterable Grid", desc: "Categorized layout gallery allowing on-the-fly filtering." },
    { name: "Responsive Mega-Menu", desc: "Sleek dropdown architecture and mobile slide drawers." },
    { name: "Navigation Bar Styles", desc: "Adaptive navbar with glassmorphic floating pill, minimal sticky, luxury wordmark, or mobile bottom dock." }
  ];

  const toggleFeature = (name: string) => {
    if (chosenFeatures.includes(name)) {
      setChosenFeatures(chosenFeatures.filter((f) => f !== name));
    } else {
      setChosenFeatures([...chosenFeatures, name]);
    }
  };

  // --- STEP TRACKERS ---
  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStep(index);
  };

  // --- TRIGGER GEMINI PROMPT RE-BUILDER via Backend ---
  const triggerGeminiEnhance = async () => {
    setIsGeneratingAiPrompt(true);
    setAiError(null);
    setAiWarning(null);
    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          questions,
          clientName,
          clientAddress,
          clientUrl,
          clientSocials,
          referenceUrls,
          chosenFeatures,
          mediaFiles,
          selectedSections,
          designConfig,
          askMeColorsAndTheme
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to contact backend API service.");
      }
      setAiGeneratedPrompt(data.prompt);
      if (data.warning) {
        setAiWarning(data.warning);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsGeneratingAiPrompt(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* Visual Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 px-5 py-4 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm font-semibold">
              <Sparkles className="w-5 h-5 fill-white/10" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-zinc-950 flex items-center gap-1.5 leading-tight">
                Lovable Prompt Builder
                <span className="text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200/50">
                  Step-by-Step
                </span>
              </h1>
              <p className="text-[11px] text-zinc-500 font-medium">
                Assemble and polish professional website specifications in seconds
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="btn-new-site-project"
              onClick={() => setIsNewProjectModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-amber-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-950 transition-all cursor-pointer shadow-xs"
              title="Start a new site project and reset settings"
            >
              <Plus className="w-4 h-4 text-amber-600 stroke-[2.5]" />
              <span>New Site</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full">
                Reset
              </span>
            </button>

            <button
              type="button"
              id="btn-open-element-preview-nav"
              onClick={() => handleOpenElementPreview("sections")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-amber-300 bg-amber-50/90 hover:bg-amber-100 text-amber-950 transition-all cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Vista Previa de Elementos</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full">
                En vivo
              </span>
            </button>

            <button
              type="button"
              id="btn-open-template-library-nav"
              onClick={() => setIsTemplateLibraryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-all cursor-pointer shadow-xs"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Template Library</span>
              {savedTemplates.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                  {savedTemplates.length}
                </span>
              )}
            </button>

            <button
              type="button"
              id="btn-toggle-customizer"
              onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isCustomizerOpen
                  ? "bg-amber-50 border-amber-300 text-amber-800"
                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600"
              }`}
            >
              <Settings className={`w-4 h-4 ${isCustomizerOpen ? "rotate-90" : ""} transition-transform duration-200`} />
              <span>Customize Steps</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-0">
        
        {/* LEFT COLUMN: Input/Stepper Wizard Component (Grid 7/12) */}
        <section className={`lg:col-span-7 flex flex-col space-y-5 h-full ${isCustomizerOpen ? "lg:col-span-12" : ""}`}>
          
          {/* Customizer Sidebar Draw/Block */}
          {isCustomizerOpen ? (
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-zinc-900">Custom Questionnaire Designer</h2>
                <button
                  onClick={() => setIsCustomizerOpen(false)}
                  className="text-xs text-amber-600 hover:underline font-semibold"
                >
                  Close Customizer &rarr;
                </button>
              </div>
              <QuestionCustomizer
                questions={questions}
                onQuestionsChange={setQuestions}
                onResetQuestions={handleResetQuestions}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-zinc-200/80 shadow-xs flex flex-col flex-1 min-h-[480px]">
              
              {/* Top Pipeline Stepper */}
              <WorkflowStepper
                steps={steps}
                currentStepIndex={currentStep}
                completedSteps={completedSteps}
                onStepSelect={handleJumpToStep}
              />

              {/* Central Active Screen Form */}
              <div className="flex-1 py-6">
                
                {/* STEP 0: CLIENT IDENTITY & INSPIRATION URLS */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-amber-500" />
                        Client Space & Background
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Provide reference URLs about the business or existing domain presence.
                      </p>
                    </div>

                    {/* New Interactive Suggestion presets */}
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/70 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                          Need suggestions? Apply a Quick Preset
                        </h4>
                        <button
                          type="button"
                          id="btn-open-template-library-step0"
                          onClick={() => setIsTemplateLibraryOpen(true)}
                          className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                          <span>Template Library ({savedTemplates.length} saved) &rarr;</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-normal">
                        Select an industry profile template to instantly pre-fill links, sitemaps, interactive premium features, and design specs. You can customize them afterwards!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {PRESETS.map((pst) => {
                          const isSelected = activePresetId === pst.id;
                          return (
                            <button
                              key={pst.id}
                              type="button"
                              onClick={() => applyPreset(pst)}
                              className={`p-3 text-left rounded-lg border text-xs transition-all flex flex-col justify-between h-full group cursor-pointer ${
                                isSelected
                                  ? "bg-amber-100 border-amber-400 text-amber-900 shadow-xs scale-98"
                                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700"
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="font-bold truncate group-hover:text-amber-800 transition-colors">
                                    {pst.name}
                                  </span>
                                  <span className="text-[8px] font-bold px-1.5 py-0.5 bg-zinc-150 group-hover:bg-amber-200/40 text-zinc-600 rounded-sm scale-95 uppercase">
                                    {pst.badge}
                                  </span>
                                </div>
                                <p className="text-[10px] text-zinc-500 group-hover:text-amber-800/80 leading-normal">
                                  {pst.description}
                                </p>
                              </div>
                              <span className={`text-[9px] font-bold mt-2.5 inline-block ${
                                isSelected ? "text-amber-700" : "text-amber-600 group-hover:underline"
                              }`}>
                                {isSelected ? "✓ Preset Loaded" : "Load Preset →"}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-zinc-500">Want to save your current configuration?</span>
                        <button
                          type="button"
                          onClick={() => setIsTemplateLibraryOpen(true)}
                          className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <FolderPlus className="w-3.5 h-3.5" />
                          <span>Save as Reusable Template</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div id="wrapper-client-name">
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          What is the client or company name?
                        </label>
                        <div className="relative rounded-md shadow-xs max-w-xl">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-4 w-4 text-zinc-400" />
                          </div>
                          <input
                            type="text"
                            id="input-client-name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Acme Corporation or Sensory Brews Co."
                            className="block w-full pl-9 pr-3 py-2 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div id="wrapper-client-address">
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          What is the client physical address or location?
                        </label>
                        <div className="relative rounded-md shadow-xs max-w-xl">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 text-zinc-400" />
                          </div>
                          <input
                            type="text"
                            id="input-client-address"
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                            placeholder="e.g. 148 Roasters Way, Seattle, WA 98101"
                            className="block w-full pl-9 pr-3 py-2 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div id="wrapper-client-link">
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          What is the link/URL of the client?
                        </label>
                        <div className="relative rounded-md shadow-xs max-w-xl">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-4 w-4 text-zinc-400" />
                          </div>
                          <input
                            type="url"
                            id="input-client-url"
                            value={clientUrl}
                            onChange={(e) => setClientUrl(e.target.value)}
                            placeholder="https://clientbusiness.com"
                            className="block w-full pl-9 pr-3 py-2 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div id="wrapper-client-socials" className="space-y-2.5 pt-2 border-t border-zinc-200/60">
                        <div className="flex items-center gap-1.5">
                          <Share2 className="w-3.5 h-3.5 text-amber-600" />
                          <label className="block text-xs font-semibold text-zinc-700">
                            Customer Social Media Profiles
                          </label>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Provide links to the client's social media channels (used for footers, contact cards, and header icons).
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Instagram className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-instagram"
                              value={clientSocials.instagram || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, instagram: e.target.value }))}
                              placeholder="Instagram link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>

                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Facebook className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-facebook"
                              value={clientSocials.facebook || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, facebook: e.target.value }))}
                              placeholder="Facebook link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>

                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Linkedin className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-linkedin"
                              value={clientSocials.linkedin || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, linkedin: e.target.value }))}
                              placeholder="LinkedIn link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>

                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Twitter className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-twitter"
                              value={clientSocials.twitter || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, twitter: e.target.value }))}
                              placeholder="X / Twitter link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>

                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Youtube className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-youtube"
                              value={clientSocials.youtube || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, youtube: e.target.value }))}
                              placeholder="YouTube link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>

                          <div className="relative rounded-md shadow-xs">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
                              <Globe className="h-3.5 w-3.5" />
                            </div>
                            <input
                              type="url"
                              id="input-social-tiktok"
                              value={clientSocials.tiktok || ""}
                              onChange={(e) => setClientSocials(prev => ({ ...prev, tiktok: e.target.value }))}
                              placeholder="TikTok link"
                              className="block w-full pl-8 pr-2.5 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div id="wrapper-theme-links" className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-zinc-700">
                            What links do you want to use for sample of the theme and style?
                          </label>
                          <button
                            type="button"
                            id="btn-add-ref-url"
                            onClick={handleAddRefUrl}
                            className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Ref Link
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Provide links to websites, design portfolios, or styles that the client admires.
                        </p>

                        <div className="space-y-2 max-w-xl">
                          {referenceUrls.map((url, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <LinkIcon className="h-3.5 w-3.5 text-zinc-400" />
                                </div>
                                <input
                                  type="url"
                                  id={`input-ref-url-${index}`}
                                  value={url}
                                  onChange={(e) => handleRefUrlChange(index, e.target.value)}
                                  placeholder="https://awwwards.com/site/reference"
                                  className="block w-full pl-9 pr-3 py-1.5 text-xs border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                                />
                              </div>
                              {referenceUrls.length > 1 && (
                                <button
                                  type="button"
                                  id={`btn-remove-ref-${index}`}
                                  onClick={() => handleRemoveRefUrl(index)}
                                  className="p-1.5 text-zinc-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ask me the colors and theme option card */}
                      <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 space-y-2 max-w-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-zinc-900">Colors & Theme Consultation</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer" title="Ask me the colors and theme in final prompt">
                            <input
                              type="checkbox"
                              checked={askMeColorsAndTheme}
                              onChange={(e) => setAskMeColorsAndTheme(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-zinc-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-500"></div>
                          </label>
                        </div>
                        <p className="text-[11px] text-zinc-600 leading-normal">
                          Option <strong>"Ask me the colors and theme"</strong> is {askMeColorsAndTheme ? "enabled" : "disabled"}. The final generated prompt will explicitly instruct Lovable to ask you for your brand colors and theme before finalizing styles.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: PAGES & SECTIONS SELECTION + TAB ENHANCEMENTS */}
                {currentStep === 1 && (
                  <SectionConfigurator
                    selectedSections={selectedSections}
                    onSelectedSectionsChange={setSelectedSections}
                    onOpenPreview={(secId) => handleOpenElementPreview("sections", secId)}
                  />
                )}

                {/* STEP 2: INTERACTIVE SPECIAL FEATURES */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-amber-500" />
                          Premium Layout Modules
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Select interactive effects and premium features you want in specific for this build.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          id="btn-preview-navbars-step"
                          onClick={() => handleOpenElementPreview("navbars")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                          <span>👁️ Probar Navbars en Vivo</span>
                        </button>
                        <button
                          type="button"
                          id="btn-preview-features-step"
                          onClick={() => handleOpenElementPreview("features")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Probar Efectos en Vivo</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[340px] overflow-y-auto pr-2">
                      {presetFeatures.map((feat) => {
                        const isSelected = chosenFeatures.includes(feat.name);
                        const featureDetails = PRESET_FEATURES_LIST.find((p) => p.id === feat.name || p.name.includes(feat.name));
                        return (
                          <div
                            key={feat.name}
                            id={`feat-card-${feat.name.replace(/\s+/g, "-").toLowerCase()}`}
                            onClick={() => toggleFeature(feat.name)}
                            onMouseEnter={(e) => {
                              if (featureDetails) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHoveredWizardFeature({
                                  feature: featureDetails,
                                  x: rect.right + 12,
                                  y: rect.top
                                });
                              }
                            }}
                            onMouseLeave={() => setHoveredWizardFeature(null)}
                            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                              isSelected
                                ? "border-amber-500 bg-amber-50/50 shadow-xs"
                                : "border-zinc-200 hover:border-zinc-300 bg-white"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-900 transition-colors">
                                  {feat.name}
                                </span>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? "bg-amber-500 border-amber-600 text-white" : "border-zinc-300 bg-white"
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                </div>
                              </div>
                              <p className="text-[10px] text-zinc-500 leading-normal line-clamp-2">{feat.desc}</p>
                            </div>

                            <div className="pt-2 mt-2 border-t border-zinc-150 flex items-center justify-between text-[10px]">
                              <span className="text-[9px] font-semibold text-zinc-400">
                                {featureDetails?.badge || "Demo en vivo"}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenElementPreview(
                                    feat.name === "Navigation Bar Styles" ? "navbars" : "features",
                                    undefined,
                                    feat.name
                                  );
                                }}
                                className="text-[10px] text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                              >
                                <Eye className="w-3 h-3 text-amber-600" />
                                <span>Ver vista previa →</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Floating Window for Step 2 Features on Mouse Hover */}
                    {hoveredWizardFeature && (
                      <div
                        role="tooltip"
                        className="fixed z-[100] w-80 sm:w-88 pointer-events-none transition-all duration-150 animate-fadeIn"
                        style={{
                          left: Math.min(hoveredWizardFeature.x, typeof window !== "undefined" ? Math.max(16, window.innerWidth - 360) : 600),
                          top: Math.max(20, Math.min(hoveredWizardFeature.y, typeof window !== "undefined" ? Math.max(20, window.innerHeight - 380) : 200))
                        }}
                      >
                        <div className="bg-zinc-950/95 backdrop-blur-xl border border-amber-500/50 rounded-2xl p-4 shadow-2xl text-zinc-100 ring-2 ring-amber-500/20 relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
                          <div className="flex items-center justify-between gap-2 mb-2 pt-1">
                            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                              {hoveredWizardFeature.feature.category}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-amber-400 border border-zinc-700">
                              {hoveredWizardFeature.feature.badge}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white mb-1">
                            {hoveredWizardFeature.feature.name}
                          </h4>
                          <p className="text-[11px] text-zinc-300 leading-relaxed mb-2.5">
                            {hoveredWizardFeature.feature.description}
                          </p>
                          {hoveredWizardFeature.feature.highlights && (
                            <div className="bg-zinc-900/80 rounded-xl p-2 border border-zinc-800 space-y-1 mb-2.5 text-[10px]">
                              {hoveredWizardFeature.feature.highlights.slice(0, 2).map((h, i) => (
                                <div key={i} className="flex items-start gap-1 text-zinc-300">
                                  <span className="text-amber-400 font-bold">•</span>
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px]">
                            <span className={chosenFeatures.includes(hoveredWizardFeature.feature.id) ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
                              {chosenFeatures.includes(hoveredWizardFeature.feature.id) ? "✓ Seleccionado" : "+ Clic para seleccionar"}
                            </span>
                            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                              <span>Vista previa en vivo</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: DYNAMIC QUESTIONNAIRE RESPONSES */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-500" />
                        Aesthetic & Functional Custom Questions
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Provide deep design specifications. You can dynamically customize these questions with the button above.
                      </p>
                    </div>

                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                      {questions.length === 0 ? (
                        <div className="text-center py-8 border border-dashed rounded-xl bg-zinc-50 text-zinc-400">
                          <p className="text-xs font-semibold">No general questions configured yet.</p>
                          <button
                            onClick={() => setIsCustomizerOpen(true)}
                            className="mt-2 text-xs font-bold text-amber-600 hover:underline"
                          >
                            Open Customizer to add workflow steps
                          </button>
                        </div>
                      ) : (
                        questions.map((q) => (
                          <div key={q.id} id={`q-input-group-${q.id}`} className="space-y-1.5">
                            <label className="block text-xs font-semibold text-zinc-700">
                              {q.label}
                            </label>
                            {q.description && (
                              <p className="text-[10px] text-zinc-400">{q.description}</p>
                            )}

                            {q.type === "textarea" ? (
                              <textarea
                                id={`ans-textarea-${q.id}`}
                                rows={3}
                                value={getAnswerValue(q.id)}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                placeholder={q.placeholder || "Provide details..."}
                                className="w-full text-xs bg-white border border-zinc-300 focus:ring-1 focus:ring-amber-200 focus:border-amber-400 focus:outline-hidden p-2 rounded-lg text-zinc-850"
                              />
                            ) : q.type === "multi-select" && q.options ? (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {q.options.map((option) => {
                                  const currentActiveAnswers = answers.find(a => a.questionId === q.id)?.value || [];
                                  const isSelected = Array.isArray(currentActiveAnswers)
                                    ? currentActiveAnswers.includes(option)
                                    : currentActiveAnswers === option;

                                  const toggleSelectOption = () => {
                                    let nextVal: string[] = Array.isArray(currentActiveAnswers)
                                      ? [...currentActiveAnswers]
                                      : typeof currentActiveAnswers === "string" && currentActiveAnswers !== ""
                                      ? [currentActiveAnswers]
                                      : [];

                                    if (nextVal.includes(option)) {
                                      nextVal = nextVal.filter(o => o !== option);
                                    } else {
                                      nextVal.push(option);
                                    }
                                    handleAnswerChange(q.id, nextVal);
                                  };

                                  return (
                                    <button
                                      type="button"
                                      key={option}
                                      onClick={toggleSelectOption}
                                      className={`text-[10px] py-1 px-2.5 rounded-full border transition-all ${
                                        isSelected
                                          ? "bg-amber-100 border-amber-300 text-amber-850 font-semibold"
                                          : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600"
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <input
                                type="text"
                                id={`ans-input-${q.id}`}
                                value={getAnswerValue(q.id)}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                placeholder={q.placeholder || "Enter answer..."}
                                className="w-full text-xs bg-white border border-zinc-300 focus:ring-1 focus:ring-amber-200 focus:border-amber-400 focus:outline-hidden p-2 rounded-lg text-zinc-800"
                              />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 4: BRANDING MEDIA ASSETS (DRAG & DROP) */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                        <FolderIcon />
                        Logo & Creative Brand Resources
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Include media references (SVG logos, splash backgrounds, content screenshots, videos).
                      </p>
                    </div>

                    <MediaUploader
                      mediaFiles={mediaFiles}
                      onMediaFilesChange={setMediaFiles}
                    />
                  </div>
                )}

              </div>

              {/* Navigation Action Footer area */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                <button
                  type="button"
                  id="btn-navigate-prev"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    currentStep === 0
                      ? "text-zinc-300 cursor-not-allowed"
                      : "text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-zinc-100 py-1 px-2 text-zinc-500 font-semibold rounded-md">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    id="btn-navigate-next"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 py-2 px-3.5 bg-zinc-900 hover:bg-zinc-1000 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
                  >
                    <span>Next step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!completedSteps.includes(currentStep)) {
                        setCompletedSteps([...completedSteps, currentStep]);
                      }
                      // Trigger prompt compilation and preview
                      triggerGeminiEnhance();
                    }}
                    id="btn-navigate-complete"
                    className="flex items-center gap-1.5 py-2 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-md transition-all animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-white fill-white/10" />
                    <span>Complete & Enhance!</span>
                  </button>
                )}
              </div>

            </div>
          )}
        </section>

        {/* RIGHT COLUMN: Live Compiled Prompt / Specification Drawer (Grid 5/12) */}
        {!isCustomizerOpen && (
          <section className="lg:col-span-5 flex flex-col h-full min-h-[400px]">
            <PromptPreview
              answers={answers}
              questions={questions}
              clientName={clientName}
              clientAddress={clientAddress}
              clientUrl={clientUrl}
              clientSocials={clientSocials}
              referenceUrls={referenceUrls}
              chosenFeatures={chosenFeatures}
              mediaFiles={mediaFiles}
              selectedSections={selectedSections}
              designConfig={designConfig}
              askMeColorsAndTheme={askMeColorsAndTheme}
              onToggleAskMeColorsAndTheme={setAskMeColorsAndTheme}
              onTriggerGemini={triggerGeminiEnhance}
              aiGeneratedPrompt={aiGeneratedPrompt}
              isGeneratingAiPrompt={isGeneratingAiPrompt}
              aiError={aiError}
              aiWarning={aiWarning}
              onOpenTemplateLibrary={() => setIsTemplateLibraryOpen(true)}
              onOpenElementPreview={handleOpenElementPreview}
              onStartNewSite={() => setIsNewProjectModalOpen(true)}
            />
          </section>
        )}

      </main>

      {/* Humble Footer Area */}
      <footer className="py-4 border-t border-zinc-200/60 text-center text-xs text-zinc-500 bg-white shrink-0">
        <p className="font-semibold">
          Lovable Prompt Builder • Connected to Gemini server-side environment
        </p>
      </footer>

      {/* Template Library Modal */}
      <TemplateLibraryModal
        isOpen={isTemplateLibraryOpen}
        onClose={() => setIsTemplateLibraryOpen(false)}
        savedTemplates={savedTemplates}
        onSaveTemplate={handleSaveTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onLoadTemplate={handleLoadTemplate}
        onImportTemplates={handleImportTemplates}
        systemPresets={PRESETS}
        currentWorkspace={{
          clientName,
          clientAddress,
          clientUrl,
          clientSocials,
          referenceUrls,
          features: chosenFeatures,
          selectedSections,
          askMeColorsAndTheme,
          designConfig,
          answers
        }}
      />

      {/* Element Live Preview Modal */}
      <ElementPreviewModal
        isOpen={isElementPreviewOpen}
        onClose={() => setIsElementPreviewOpen(false)}
        selectedSections={selectedSections}
        onSelectedSectionsChange={setSelectedSections}
        chosenFeatures={chosenFeatures}
        onToggleFeature={toggleFeature}
        designConfig={designConfig}
        onDesignConfigChange={setDesignConfig}
        clientName={clientName || "Acme Studio"}
        initialTab={elementPreviewTab}
        initialSectionId={elementPreviewSectionId}
        initialFeatureName={elementPreviewFeatureName}
      />

      {/* New Site Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onConfirmReset={handleResetNewSite}
        currentClientName={clientName}
        hasExistingData={Boolean(clientName || answers.length > 0 || mediaFiles.length > 0 || clientUrl)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-zinc-950 border border-amber-500/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-semibold ring-2 ring-amber-500/20"
        >
          <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
