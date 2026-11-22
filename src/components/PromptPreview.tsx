import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, FileCheck, Sparkles, AlertCircle, RefreshCw, ExternalLink, Download, ChevronDown, FileText, Palette, HelpCircle, Bookmark, Eye, Zap, Plus, ChevronRight } from "lucide-react";
import { Answer, Question, MediaFile, SocialLinks, SelectedSectionConfig, DesignSystemConfig } from "../types";
import { DEFAULT_SECTION_TEMPLATES } from "../constants/sectionTemplates";
import { PRESET_FEATURES_LIST, InteractiveFeatureItem } from "./ElementPreviewModal";

interface PromptPreviewProps {
  answers: Answer[];
  questions: Question[];
  clientName?: string;
  clientAddress?: string;
  clientUrl: string;
  clientSocials?: SocialLinks;
  referenceUrls: string[];
  chosenFeatures: string[];
  mediaFiles: MediaFile[];
  selectedSections?: SelectedSectionConfig[];
  designConfig?: DesignSystemConfig;
  askMeColorsAndTheme: boolean;
  onToggleAskMeColorsAndTheme: (enabled: boolean) => void;
  onTriggerGemini: () => Promise<void>;
  aiGeneratedPrompt: string;
  isGeneratingAiPrompt: boolean;
  aiError: string | null;
  aiWarning?: string | null;
  onOpenTemplateLibrary?: () => void;
  onOpenElementPreview?: (tab: "sections" | "navbars" | "features" | "design", sectionId?: string, featureName?: string) => void;
  onStartNewSite?: () => void;
}

export default function PromptPreview({
  answers,
  questions,
  clientName,
  clientAddress,
  clientUrl,
  clientSocials,
  referenceUrls,
  chosenFeatures,
  mediaFiles,
  selectedSections = [],
  designConfig,
  askMeColorsAndTheme,
  onToggleAskMeColorsAndTheme,
  onTriggerGemini,
  aiGeneratedPrompt,
  isGeneratingAiPrompt,
  aiError,
  aiWarning,
  onOpenTemplateLibrary,
  onOpenElementPreview,
  onStartNewSite,
}: PromptPreviewProps) {
  const [activeTab, setActiveTab] = useState<"standard" | "ai">("standard");
  const [copied, setCopied] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Floating window tooltip state for hovered feature in prompt preview
  const [hoveredPromptFeature, setHoveredPromptFeature] = useState<{
    feature: InteractiveFeatureItem;
    x: number;
    y: number;
  } | null>(null);

  const handleFeatureHoverEnter = (feat: InteractiveFeatureItem, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isRightNearEdge = rect.right + 380 > (typeof window !== "undefined" ? window.innerWidth : 1200);
    setHoveredPromptFeature({
      feature: feat,
      x: isRightNearEdge ? Math.max(16, rect.left - 380) : rect.right + 12,
      y: rect.top
    });
  };

  const handleFeatureHoverMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredPromptFeature) {
      setHoveredPromptFeature((prev) => prev ? {
        ...prev,
        y: e.clientY - 20
      } : null);
    }
  };

  const handleFeatureHoverLeave = () => {
    setHoveredPromptFeature(null);
  };

  // Auto-switch to AI tab when AI generation starts or finishes
  useEffect(() => {
    if (isGeneratingAiPrompt || (aiGeneratedPrompt && aiGeneratedPrompt.trim() !== "")) {
      setActiveTab("ai");
    }
  }, [isGeneratingAiPrompt, aiGeneratedPrompt]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDownloadMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate the mechanical prompt instantly
  const generateMechanicalPrompt = (): string => {
    let md = `# Lovable.app Website Specification Draft\n\n`;
    md += `I want to build a fully functional, pixel-perfect, highly responsive website with the following detailed specifications:\n\n`;

    const hasSocials = clientSocials && Object.values(clientSocials).some(v => v && v.trim() !== "");

    if (clientName || clientAddress || clientUrl || hasSocials) {
      md += `### Client / Existing Business Profile\n`;
      if (clientName) {
        md += `- **Client / Company Name:** ${clientName}\n`;
      }
      if (clientAddress) {
        md += `- **Physical Address / Location:** ${clientAddress}\n`;
      }
      if (clientUrl) {
        md += `- **Primary Reference URL:** ${clientUrl}\n`;
      }
      if (hasSocials && clientSocials) {
        md += `- **Social Media Profiles:**\n`;
        Object.entries(clientSocials).forEach(([platform, url]) => {
          if (url && url.trim() !== "") {
            const formattedName = platform.charAt(0).toUpperCase() + platform.slice(1);
            md += `  - **${formattedName}:** ${url}\n`;
          }
        });
      }
      md += `\n`;
    }

    if (askMeColorsAndTheme) {
      md += `### Visual Design & Theme: Interactive Consultation\n`;
      md += `- **MANDATORY INSTRUCTION:** **Ask me what colors and theme I want for the website** before finalizing the styling or generating CSS.\n`;
      md += `- **Theme Consultation Process:**\n`;
      md += `  1. Propose 2 to 3 creative, high-aesthetic color palettes (with exact hex codes for Primary, Background, Surface, Text, and Accent).\n`;
      md += `  2. Ask me to confirm a palette or provide my own custom brand colors and aesthetic vibe.\n`;
      md += `  3. Do not assume or lock in static colors until I have confirmed my selection.\n\n`;
    } else if (designConfig) {
      md += `### Visual Design System & Styling Architecture\n`;
      md += `- **Color Palette & Swatches:**\n`;
      md += `  - Primary Brand Color: \`${designConfig.colors.primary}\`\n`;
      md += `  - Secondary Color: \`${designConfig.colors.secondary}\`\n`;
      md += `  - Background Tone: \`${designConfig.colors.background}\`\n`;
      md += `  - Surface / Card Background: \`${designConfig.colors.surface}\`\n`;
      md += `  - Accent / Glow: \`${designConfig.colors.accent}\`\n`;
      md += `  - Text Contrast: \`${designConfig.colors.text}\`\n`;
      md += `- **Layout Architecture:** ${designConfig.layoutStyle}\n`;
      md += `- **Navigation Bar Architecture:** ${designConfig.navbarStyle || "Floating Glassmorphic Pill"}\n`;
      md += `- **Container Constraint:** ${designConfig.containerWidth}\n`;
      md += `- **Corner Rounding:** ${designConfig.cornerRounding}\n`;
      md += `- **Mobile App Look:** ${designConfig.mobileAppLook.mode} (Nav: ${designConfig.mobileAppLook.navigationStyle})\n`;
      md += `- **Title Typography Style:** ${designConfig.titleFontStyle.fontFamily} (${designConfig.titleFontStyle.weight}, ${designConfig.titleFontStyle.casing}, Tracking: ${designConfig.titleFontStyle.letterSpacing})\n`;
      md += `- **3D Title Visual Effect:** ${designConfig.title3DEffect.effectType} (${designConfig.title3DEffect.intensity} Intensity)\n\n`;
    }

    if (referenceUrls.length > 0) {
      md += `### Aesthetic Reference & Inspiration\n`;
      md += `Please extract visual styles, layouts, branding vibes, and themes from these sample portfolios:\n`;
      referenceUrls.forEach((url) => {
        md += `- ${url}\n`;
      });
      md += `\n`;
    }

    // Include Site Architecture & Page-by-Page Requirements
    if (selectedSections && selectedSections.length > 0) {
      md += `### Site Architecture & Page-by-Page Specifications\n`;
      md += `Construct the website with the following explicit sections, layout styles, sub-blocks, and premium tab enhancements:\n\n`;

      selectedSections.forEach((sec, idx) => {
        const tmpl = DEFAULT_SECTION_TEMPLATES.find(t => t.id === sec.sectionId);
        md += `#### ${idx + 1}. ${sec.name}\n`;
        md += `- **Layout Architecture:** ${sec.selectedLayout}\n`;

        if (sec.enabledSubmodules.length > 0 && tmpl) {
          const subNames = sec.enabledSubmodules.map(subId => {
            const sub = tmpl.submodules.find(s => s.id === subId);
            return sub ? sub.label : subId;
          });
          md += `- **Core Sub-components:**\n`;
          subNames.forEach(name => {
            md += `  - ${name}\n`;
          });
        }

        if (sec.enabledEnhancements.length > 0 && tmpl) {
          const enhNames = sec.enabledEnhancements.map(enhId => {
            const enh = tmpl.enhancementOptions.find(e => e.id === enhId);
            return enh ? enh.label : enhId;
          });
          md += `- **Tab Enhancements & Premium Touches:**\n`;
          enhNames.forEach(name => {
            md += `  - ✨ ${name}\n`;
          });
        }

        if (sec.customNotes && sec.customNotes.trim() !== "") {
          md += `- **Custom Directives & Copy Notes:** ${sec.customNotes.trim()}\n`;
        }
        md += `\n`;
      });
    }

    if (chosenFeatures.length > 0) {
      md += `### Specific Interactive Features\n`;
      md += `Include the following modules styled perfectly in React with custom UI layouts:\n`;
      chosenFeatures.forEach((feat) => {
        md += `- **${feat}**: Ready-to-use interactivity, standard animations, and fluid responsive styling.\n`;
      });
      md += `\n`;
    }

    if (mediaFiles.length > 0) {
      md += `### Client Media Assets List\n`;
      md += `Please reserve placeholders and implement structural pathways for these provided assets:\n`;
      mediaFiles.forEach((file) => {
        md += `- **${file.name}** (${file.type}, ${(file.size / 1024).toFixed(1)} KB)${
          file.description ? ` - Placement detail: ${file.description}` : ""
        }\n`;
      });
      md += `\n`;
    }

    // Embed all answers gathered from custom dynamic questions
    const hasAnswers = answers.some((a) => {
      if (Array.isArray(a.value)) return a.value.length > 0;
      return a.value.trim() !== "";
    });

    if (hasAnswers) {
      md += `### Functional Requirements & Project Context\n`;
      answers.forEach((ans) => {
        const q = questions.find((item) => item.id === ans.questionId);
        if (!q) return;
        const valueStr = Array.isArray(ans.value) ? ans.value.join(", ") : ans.value;
        if (valueStr && valueStr.trim() !== "") {
          md += `#### ${q.label}\n`;
          md += `${valueStr}\n\n`;
        }
      });
    }

    md += `### Code Style Guidelines & Structural Requirements\n`;
    md += `- **Technologies:** React functional components, TypeScript, Tailwind CSS, Lucide icons, motion animations.\n`;
    md += `- **Navigation & Route Safety:** In \`Navbar.tsx\`, Header, and Footer, use smooth-scroll hash links (\`href="#services"\`, \`href="#about"\`, \`href="#contact"\`) for landing page sections or clean static routes (\`to="/services"\`). Do not write parameterized dynamic links like \`<Link to="/services/$slug" params={{ slug }}>\` in the Navbar unless dynamic routes are fully registered in the route tree (prevents TypeScript TS2322 / TS2353 routing errors).\n`;
    md += `- **Mobile First:** Start with desktop-first precision but ensure mobile touch-targets are at least 44px.\n`;
    md += `- **Performance & SEO:** Pre-render layouts, keep file sizes trimmed, use Semantic HTML tags.\n`;

    return md;
  };

  const getActivePrompt = (): string => {
    if (activeTab === "ai") {
      return aiGeneratedPrompt || "Click the 'AI Enhance Prompt' button below to formulate a professional, detailed spec with Gemini AI.";
    }
    return generateMechanicalPrompt();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActivePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (format: "md" | "txt") => {
    const promptText = getActivePrompt();
    const element = document.createElement("a");
    const mimeType = format === "md" ? "text/markdown" : "text/plain";
    const extension = format === "md" ? "md" : "txt";

    const file = new Blob([promptText], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = `lovable-prompt-blueprint.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-zinc-100 rounded-2xl overflow-hidden shadow-xl border border-zinc-800">
      {/* Top Banner API Tabs */}
      <div className="flex border-b border-zinc-800 bg-zinc-950/65 px-4 items-center justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            id="tab-standard-prompt"
            onClick={() => setActiveTab("standard")}
            className={`py-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === "standard"
                ? "border-amber-500 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Live Blueprint Prompt
          </button>
          <button
            type="button"
            id="tab-ai-prompt"
            onClick={() => setActiveTab("ai")}
            className={`py-3 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-all flex items-center gap-1 ${
              activeTab === "ai"
                ? "border-amber-500 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            AI Optimized Spec
          </button>
        </div>

        <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              id="btn-download-dropdown"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-850 hover:bg-zinc-800 hover:text-white text-zinc-300 rounded-md text-xs font-medium cursor-pointer transition-colors border border-zinc-800"
              title="Download Prompt File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${downloadMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {downloadMenuOpen && (
              <div 
                id="download-dropdown-menu"
                className="absolute right-0 mt-1.5 w-44 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl py-1 z-50 text-xs text-zinc-300 animate-fade-in"
              >
                <button
                  type="button"
                  id="btn-download-md"
                  onClick={() => downloadFile("md")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Download as .md</span>
                </button>
                <button
                  type="button"
                  id="btn-download-txt"
                  onClick={() => downloadFile("txt")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left border-t border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-500" />
                  <span>Download as .txt</span>
                </button>
              </div>
            )}
          </div>

          {onStartNewSite && (
            <button
              type="button"
              id="btn-preview-new-site"
              onClick={onStartNewSite}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-amber-400 hover:text-amber-300 rounded-md text-xs font-semibold cursor-pointer transition-colors border border-amber-500/30 hover:border-amber-500/60 shadow-2xs"
              title="Start a new site project and reset settings"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Site</span>
            </button>
          )}

          {onOpenTemplateLibrary && (
            <button
              type="button"
              id="btn-preview-open-templates"
              onClick={onOpenTemplateLibrary}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md text-xs font-medium cursor-pointer transition-colors border border-zinc-800"
              title="Save or Load configurations in Template Library"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Templates</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            id="btn-copy-prompt"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-md text-xs font-medium cursor-pointer transition-colors border border-zinc-800"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Option: Ask me the colors and theme in final prompt */}
      <div className="px-4 py-2.5 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${askMeColorsAndTheme ? "bg-amber-500/15 text-amber-400" : "bg-zinc-800 text-zinc-500"}`}>
            <Palette className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-200 truncate">Ask me the colors and theme</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 transition-colors ${
                askMeColorsAndTheme ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-zinc-800 text-zinc-500 border border-zinc-750"
              }`}>
                {askMeColorsAndTheme ? "Option Active" : "Disabled"}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 truncate">
              Instructs Lovable to ask you for your colors & theme before styling.
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2" title="Toggle: Ask me the colors and theme in the final prompt">
          <input
            type="checkbox"
            id="toggle-ask-colors-theme"
            checked={askMeColorsAndTheme}
            onChange={(e) => onToggleAskMeColorsAndTheme(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
        </label>
      </div>

      {/* Interactive Special Features Live Preview Strip */}
      {chosenFeatures && chosenFeatures.length > 0 && (
        <div className="px-4 py-2 bg-zinc-950/95 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Features ({chosenFeatures.length}):</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {chosenFeatures.map((featId) => {
                const item = PRESET_FEATURES_LIST.find(
                  (f) =>
                    f.id.toLowerCase() === featId.toLowerCase() ||
                    f.name.toLowerCase().includes(featId.toLowerCase()) ||
                    featId.toLowerCase().includes(f.id.toLowerCase())
                ) || {
                  id: featId,
                  name: featId,
                  category: "Special Module",
                  description: "Interactive component configured for this website layout.",
                  badge: "Feature",
                  highlights: ["Fluid responsive styling", "Production-grade UI"],
                  benefits: "Elevates user experience and conversion.",
                  techDetails: "React functional component with Tailwind CSS."
                };

                return (
                  <div
                    key={featId}
                    id={`prompt-feat-chip-${featId.replace(/\s+/g, "-").toLowerCase()}`}
                    onMouseEnter={(e) => handleFeatureHoverEnter(item, e)}
                    onMouseMove={handleFeatureHoverMove}
                    onMouseLeave={handleFeatureHoverLeave}
                    onClick={() =>
                      onOpenElementPreview &&
                      onOpenElementPreview(
                        featId === "Navigation Bar Styles" ? "navbars" : "features",
                        undefined,
                        featId
                      )
                    }
                    className="group inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 hover:border-amber-500/60 text-[11px] text-zinc-300 hover:text-white cursor-pointer transition-all shadow-2xs"
                    title="Hover to view details • Click to preview in live canvas"
                  >
                    <span className="text-zinc-200 group-hover:text-amber-400 font-medium">{featId}</span>
                    <Eye className="w-2.5 h-2.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>

          {onOpenElementPreview && (
            <button
              type="button"
              id="btn-prompt-open-all-features-preview"
              onClick={() => onOpenElementPreview("features")}
              className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline cursor-pointer ml-auto shrink-0"
              title="Open full interactive preview canvas"
            >
              <Eye className="w-3 h-3" />
              <span>Vista Previa en Vivo</span>
            </button>
          )}
        </div>
      )}

      {/* Main Preview Block area */}
      <div
        id="prompt-preview-scroll-viewport"
        className="flex-1 overflow-y-auto scroll-smooth p-5 text-sm font-mono whitespace-pre-wrap leading-relaxed select-text bg-zinc-900 text-zinc-300 relative"
      >
        {activeTab === "ai" && isGeneratingAiPrompt ? (
          <div className="flex flex-col items-center justify-center h-full py-12 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
            <p className="text-zinc-400 text-xs font-sans">
              Gemini is composing a professional software specification prompt...
            </p>
          </div>
        ) : activeTab === "ai" && aiError ? (
          <div className="flex flex-col items-start p-4 bg-red-950/40 border border-red-900/80 rounded-xl space-y-3 mt-4 font-sans text-xs">
            <div className="flex items-center space-x-2 text-red-400 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Prompt Generation Status</span>
            </div>
            <p className="text-red-200/90 leading-relaxed">
              {aiError.includes("Settings > Secrets") || aiError.includes("API key")
                ? "The Gemini API key is missing on the server. Please ensure GEMINI_API_KEY is configured in Settings > Secrets."
                : aiError}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onTriggerGemini}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold rounded-md text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Try Again</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-200 underline underline-offset-2"
              >
                Switch to Live Blueprint Prompt
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col space-y-3">
            {activeTab === "ai" && aiWarning && (
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-[11px] text-amber-200/90 font-sans flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {aiWarning}
                </span>
                <button
                  type="button"
                  onClick={onTriggerGemini}
                  disabled={isGeneratingAiPrompt}
                  className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded text-[10px] whitespace-nowrap cursor-pointer"
                >
                  Retry Live Model
                </button>
              </div>
            )}

            {/* Action Bar next to the generated prompt */}
            <div className="flex items-center justify-between gap-2 bg-zinc-950/80 px-3 py-2 rounded-xl border border-zinc-800/90 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-semibold text-zinc-200 truncate">
                  {activeTab === "ai" ? "Generated AI Specification Prompt" : "Live Blueprint Prompt"}
                </span>
                {activeTab === "ai" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                    Ready for Lovable
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  id="btn-scroll-down-prompt"
                  onClick={() => {
                    const el = document.getElementById("prompt-preview-scroll-viewport");
                    el?.scrollBy({ top: 350, behavior: "smooth" });
                  }}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Scroll down through the prompt specifications"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Scroll Down</span>
                </button>

                <button
                  type="button"
                  id="btn-copy-prompt-action"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
                    copied
                      ? "bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400/40"
                      : "bg-amber-500 hover:bg-amber-400 text-zinc-950 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  title="Copy to Clipboard to paste directly into Lovable.app"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={getActivePrompt()}
              className="w-full min-h-[480px] h-full bg-transparent border-0 resize-none text-xs font-mono focus:ring-0 focus:outline-hidden leading-relaxed text-zinc-300"
            />
          </div>
        )}
      </div>

      {/* Bottom control hub for Lovable integration */}
      <div className="p-4 bg-zinc-950/80 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === "standard" ? (
            <>
              <button
                onClick={onTriggerGemini}
                disabled={isGeneratingAiPrompt}
                id="btn-enhance-prompt"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg text-xs shadow-md transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-white fill-white/20 animate-pulse" />
                AI Enhance with Gemini
              </button>
              <button
                type="button"
                onClick={handleCopy}
                id="btn-copy-bottom-standard"
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-lg text-xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onTriggerGemini}
                disabled={isGeneratingAiPrompt}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-lg text-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAiPrompt ? "animate-spin" : ""}`} />
                Re-generate AI Prompt
              </button>
              <button
                type="button"
                onClick={handleCopy}
                id="btn-copy-bottom-ai"
                className={`flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer ${
                  copied
                    ? "bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400/40"
                    : "bg-amber-500 hover:bg-amber-400 text-zinc-950 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy to Clipboard"}</span>
              </button>
            </>
          )}
        </div>

        <a
          href="https://lovable.dev"
          target="_blank"
          referrerPolicy="no-referrer"
          id="link-lovable"
          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline self-end sm:self-auto"
        >
          <span>Go to Lovable.app</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Floating Window (Hover Feature Description Popover) in Prompt Preview */}
      {hoveredPromptFeature && (
        <div
          role="tooltip"
          aria-label={hoveredPromptFeature.feature.name}
          className="fixed z-[100] w-80 sm:w-96 pointer-events-none transition-all duration-150 animate-fade-in"
          style={{
            left: Math.min(hoveredPromptFeature.x, typeof window !== "undefined" ? Math.max(16, window.innerWidth - 390) : 600),
            top: Math.max(20, Math.min(hoveredPromptFeature.y, typeof window !== "undefined" ? Math.max(20, window.innerHeight - 440) : 200))
          }}
        >
          <div className="bg-zinc-950/95 backdrop-blur-xl border border-amber-500/50 rounded-2xl p-4 shadow-2xl text-zinc-100 ring-2 ring-amber-500/20 relative overflow-hidden">
            {/* Top gradient glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
            
            {/* Header: Category + Badge */}
            <div className="flex items-center justify-between gap-2 mb-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  {hoveredPromptFeature.feature.category}
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-amber-400 border border-zinc-700">
                {hoveredPromptFeature.feature.badge}
              </span>
            </div>

            {/* Feature Name */}
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>{hoveredPromptFeature.feature.name}</span>
            </h4>

            {/* Detailed Description */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {hoveredPromptFeature.feature.description}
            </p>

            {/* Highlights bullet list */}
            {hoveredPromptFeature.feature.highlights && hoveredPromptFeature.feature.highlights.length > 0 && (
              <div className="bg-zinc-900/80 rounded-xl p-2.5 border border-zinc-800 space-y-1.5 mb-3 text-[11px]">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Capacidades Principales</span>
                </div>
                {hoveredPromptFeature.feature.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Impact / Benefits */}
            {hoveredPromptFeature.feature.benefits && (
              <div className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-800/40 rounded-lg p-2 mb-3">
                <strong className="text-amber-400 font-semibold block text-[10px] uppercase mb-0.5">Impacto en Conversión & UX:</strong>
                {hoveredPromptFeature.feature.benefits}
              </div>
            )}

            {/* Footer with action CTA */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                ✓ Activo en este Blueprint
              </span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <span>Haz clic para previsualizar en vivo</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
