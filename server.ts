import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with 15MB limit to allow base64 images/metadata if necessary
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Shared server-side Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Falling back to mechanical prompt generation.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper to generate content with fallback models and retry on temporary 503/429 spikes
async function generateWithFallbacks(ai: GoogleGenAI, promptText: string): Promise<string> {
  // Ordered by priority & availability resilience based on @google/genai skill specifications
  const candidateModels = [
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-3.7-flash"
  ];

  let lastError: any = null;

  for (const modelName of candidateModels) {
    // Try up to 2 attempts per model with jittered backoff for transient 503/429
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptText,
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("rate limit");

        console.warn(`[Gemini API] Model ${modelName} attempt ${attempt} failed:`, errMsg);

        if (isTransient && attempt === 1) {
          // Wait with jitter before retry (400ms - 900ms)
          const delay = 400 + Math.floor(Math.random() * 500);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          // Break to next candidate model
          break;
        }
      }
    }
  }

  throw lastError || new Error("All Gemini candidate models were temporarily unavailable.");
}

// Deterministic high-quality prompt synthesis engine used as a seamless fallback
// when external LLM infrastructure encounters temporary 503 outages.
function synthesizeArchitecturalPrompt(data: any): string {
  const {
    answers = [],
    questions = [],
    clientName,
    clientAddress,
    clientUrl,
    clientSocials,
    referenceUrls = [],
    chosenFeatures = [],
    customFeatures = [],
    mediaFiles = [],
    selectedSections = [],
    designConfig
  } = data;

  const brandTitle = clientName ? clientName.trim() : "Modern Web Platform";
  let prompt = `# Build Specification: ${brandTitle} Web Application\n\n`;
  prompt += `Create a complete, responsive, pixel-perfect, production-grade website in React, TypeScript, and Tailwind CSS for **${brandTitle}**.\n\n`;

  // 1. Business & Brand Identity
  prompt += `## 1. Project Context & Brand Identity\n`;
  if (clientName) prompt += `- **Client / Business:** ${clientName}\n`;
  if (clientAddress) prompt += `- **Location / Base:** ${clientAddress}\n`;
  if (clientUrl) prompt += `- **Reference Domain:** ${clientUrl}\n`;
  if (clientSocials) {
    const activeSocials = Object.entries(clientSocials).filter(([_, v]) => typeof v === "string" && v.trim() !== "");
    if (activeSocials.length > 0) {
      prompt += `- **Social Channels:** ${activeSocials.map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)} (${v})`).join(", ")}\n`;
    }
  }
  if (referenceUrls.length > 0) {
    prompt += `- **Inspirational Aesthetic References:** ${referenceUrls.filter(Boolean).join(", ")}\n`;
  }
  prompt += `\n`;

  // 2. Design System & Visual Vibe
  prompt += `## 2. Design System & Theme Directives\n`;
  if (data.askMeColorsAndTheme) {
    prompt += `### Interactive Color & Theme Consultation\n`;
    prompt += `- **MANDATORY DIRECTIVE:** **Ask me what colors and theme I want for the website** before finalizing the styling or generating CSS.\n`;
    prompt += `- Propose 2 to 3 creative, high-aesthetic color palettes (with exact hex codes for Primary, Background, Surface, Text, and Accent) and ask me to confirm or provide custom brand colors and visual style before generating the full component styles.\n\n`;
  } else if (designConfig) {
    prompt += `### Color Palette & Swatches\n`;
    prompt += `- **Primary Brand:** \`${designConfig.colors?.primary || "#06B6D4"}\`\n`;
    prompt += `- **Secondary:** \`${designConfig.colors?.secondary || "#3B82F6"}\`\n`;
    prompt += `- **Background Canvas:** \`${designConfig.colors?.background || "#090D16"}\`\n`;
    prompt += `- **Surface / Cards:** \`${designConfig.colors?.surface || "#111827"}\`\n`;
    prompt += `- **Accent Glow / Highlight:** \`${designConfig.colors?.accent || "#22D3EE"}\`\n`;
    prompt += `- **Text / High Contrast:** \`${designConfig.colors?.text || "#F3F4F6"}\`\n\n`;

    prompt += `### Layout & Geometry\n`;
    prompt += `- **Layout Architecture:** ${designConfig.layoutStyle || "Modern Bento Grid Showcase"}\n`;
    prompt += `- **Navigation Bar Architecture:** ${designConfig.navbarStyle || "Floating Glassmorphic Pill"}\n`;
    prompt += `- **Container Constraint:** ${designConfig.containerWidth || "max-w-7xl mx-auto"}\n`;
    prompt += `- **Border Radius:** ${designConfig.cornerRounding || "Smooth Modern (16px)"}\n\n`;

    prompt += `### Typography & 3D Title Treatment\n`;
    prompt += `- **Heading Font:** ${designConfig.titleFontStyle?.fontFamily || "Space Grotesk"} (${designConfig.titleFontStyle?.weight || "Bold 700"}, ${designConfig.titleFontStyle?.casing || "Sentence case"}, Tracking: ${designConfig.titleFontStyle?.letterSpacing || "Normal"})\n`;
    prompt += `- **3D Title Visual Effect:** ${designConfig.title3DEffect?.effectType || "perspective_tilt"} (${designConfig.title3DEffect?.intensity || "Medium"} Intensity)\n`;
    prompt += `- **Effect Directives:** Ensure primary hero headers have clean visual depth with layered text shadows or subtle perspective spatial highlights.\n\n`;

    prompt += `### Mobile Experience\n`;
    prompt += `- **Mobile Shell Mode:** ${designConfig.mobileAppLook?.mode || "Native App Shell (Bottom Bar + Safe Area)"}\n`;
    prompt += `- **Mobile Navigation:** ${designConfig.mobileAppLook?.navigationStyle || "Bottom Tab Bar (iOS/Android)"}\n`;
    if (designConfig.bottomBar) {
      if (designConfig.bottomBar.enabled) {
        const tabSummary = designConfig.bottomBar.tabs.map((t: any) => `${t.label} -> #${t.targetSectionId || t.id} (icon: ${t.icon})`).join(", ");
        prompt += `- **Bottom Bar Configuration:** Enabled (${designConfig.bottomBar.style}${designConfig.bottomBar.showOnAllViewports ? ", visible on all viewports" : ", mobile viewport"}) with tabs: ${tabSummary}\n`;
      } else {
        prompt += `- **Bottom Bar Configuration:** Disabled / Removed (no fixed bottom navigation bar)\n`;
      }
    }
    prompt += `- **Touch Targets:** Minimum 44px tap targets, haptic touch feedback states, and safe-area insets.\n\n`;
  } else {
    prompt += `- Use a sleek, ultra-clean modern dark-mode canvas with high-contrast typography, subtle hairline borders (\`border-zinc-800\`), and vivid accent accents.\n\n`;
  }

  // 3. Sitemap & Page Structure
  prompt += `## 3. Sitemap & Page-by-Page Requirements\n`;
  if (selectedSections && selectedSections.length > 0) {
    selectedSections.forEach((sec: any, idx: number) => {
      prompt += `### ${idx + 1}. ${sec.name} (${sec.selectedLayout || "Default Layout"})\n`;
      if (sec.enabledSubmodules && sec.enabledSubmodules.length > 0) {
        prompt += `- **Component Modules:** ${sec.enabledSubmodules.join(", ")}\n`;
      }
      if (sec.enabledEnhancements && sec.enabledEnhancements.length > 0) {
        prompt += `- **Polished Touches & Enhancements:** ${sec.enabledEnhancements.map((e: string) => `✨ ${e}`).join(", ")}\n`;
      }
      if (sec.customNotes && sec.customNotes.trim() !== "") {
        prompt += `- **Specific Directives:** ${sec.customNotes.trim()}\n`;
      }
      prompt += `\n`;
    });
  } else {
    prompt += `- **Hero Section:** High-impact value proposition with CTA buttons and preview graphic.\n`;
    prompt += `- **Services / Features Matrix:** Grid layout showcasing key capabilities.\n`;
    prompt += `- **Testimonials / Social Proof:** Interactive review cards with rating badges.\n`;
    prompt += `- **Contact / Inquiry:** Polished form with instant validation.\n\n`;
  }

  // 4. Interactive Special Features
  if (chosenFeatures.length > 0) {
    prompt += `## 4. Interactive Features & Motion Criteria\n`;
    chosenFeatures.forEach((feat: string) => {
      const customMatch = (customFeatures || []).find((cf: any) => cf.id === feat || cf.name === feat);
      if (customMatch) {
        prompt += `- **${customMatch.name}** (${customMatch.category || "Custom Feature"}): ${customMatch.description}${
          customMatch.directives ? ` Directives: ${customMatch.directives}` : ""
        }\n`;
      } else {
        prompt += `- **${feat}:** Implement fluid interactive behavior with smooth transitions, hover lift micro-interactions, and accessible keyboard states.\n`;
      }
    });
    prompt += `\n`;
  }

  // 5. Media Assets
  if (mediaFiles.length > 0) {
    prompt += `## 5. Media & Brand Assets\n`;
    mediaFiles.forEach((file: any) => {
      prompt += `- **${file.name}:** (${file.type})${file.description ? ` - Placement: ${file.description}` : ""}\n`;
    });
    prompt += `\n`;
  }

  // 6. Questionnaire Answers
  const validAnswers = (answers || []).filter((a: any) => a && (Array.isArray(a.value) ? a.value.length > 0 : String(a.value).trim() !== ""));
  if (validAnswers.length > 0) {
    prompt += `## 6. Functional Directives & Custom Specifications\n`;
    validAnswers.forEach((ans: any) => {
      const q = (questions || []).find((item: any) => item.id === ans.questionId);
      const textVal = Array.isArray(ans.value) ? ans.value.join(", ") : ans.value;
      prompt += `### ${q ? q.label : ans.questionId}\n${textVal}\n\n`;
    });
  }

  // 7. Tech Stack & Navigation Safety
  prompt += `## 7. Tech Stack & Navigation Architecture Guidelines\n`;
  prompt += `- **Framework:** React with TypeScript and Tailwind CSS.\n`;
  prompt += `- **Icons & UI:** Lucide React icons, standard accessible elements.\n`;
  prompt += `- **Strict Type-Safe Navigation:** In \`Navbar.tsx\`, Header, and Footer components, use clean hash links (\`href="#services"\`, \`href="#about"\`, \`href="#contact"\`) for section scrolling or valid static routes (\`to="/services"\`). Do NOT generate untyped or unmapped dynamic links like \`<Link to="/services/$slug" params={{ slug }}>\` in navigation bars unless dynamic routes are registered (prevents TypeScript TS2322 / TS2353 routing errors).\n`;
  prompt += `- **Performance & Accessibility:** Semantic HTML, ARIA labels, zero horizontal overflow, and responsive down to 320px.\n`;

  return prompt;
}

// REST API for prompt optimization with Gemini
app.post("/api/generate-prompt", async (req, res) => {
  try {
    const { answers, questions, clientName, clientAddress, clientUrl, clientSocials, referenceUrls, chosenFeatures, customFeatures = [], mediaFiles, selectedSections, designConfig, askMeColorsAndTheme } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({
        error: "Gemini API key is not configured on the server. Please add GEMINI_API_KEY in Settings > Secrets.",
        isMissingKey: true
      });
    }

    // Compose a detailed payload for the AI to understand the collected context
    const formattedResponses = (answers || []).map((ans: any) => {
      const q = (questions || []).find((item: any) => item.id === ans.questionId);
      const textVal = Array.isArray(ans.value) ? ans.value.join(", ") : ans.value;
      return `### Question: ${q ? q.label : ans.questionId}\n**Answer:** ${textVal || "(No answer provided)"}`;
    }).join("\n\n");

    const featuresList = chosenFeatures && chosenFeatures.length > 0 
      ? chosenFeatures.map((f: string) => {
          const customMatch = (customFeatures || []).find((cf: any) => cf.id === f || cf.name === f);
          return customMatch
            ? `- ${customMatch.name} (${customMatch.category || "Custom"}): ${customMatch.description}${customMatch.directives ? ` [Directives: ${customMatch.directives}]` : ""}`
            : `- ${f}`;
        }).join("\n") 
      : "None explicitly selected";

    const mediaList = mediaFiles && mediaFiles.length > 0 
      ? mediaFiles.map((m: any) => `- Name: ${m.name} (${m.type}, ${(m.size / 1024).toFixed(1)} KB)${m.description ? ` - Use-case: ${m.description}` : ""}`).join("\n") 
      : "None provided";

    const socialsFormatted = clientSocials
      ? Object.entries(clientSocials)
          .filter(([_, val]: [string, any]) => val && typeof val === "string" && val.trim() !== "")
          .map(([platform, url]) => `${platform}: ${url}`)
          .join(", ")
      : "";

    const sectionsFormatted = (selectedSections && selectedSections.length > 0)
      ? selectedSections.map((sec: any, idx: number) => {
          let s = `${idx + 1}. [PAGE / SECTION: ${sec.name}]\n`;
          s += `   - Layout Pattern: ${sec.selectedLayout || "Default Responsive"}\n`;
          if (sec.enabledSubmodules && sec.enabledSubmodules.length > 0) {
            s += `   - Submodules / Component Blocks: ${sec.enabledSubmodules.join(", ")}\n`;
          }
          if (sec.enabledEnhancements && sec.enabledEnhancements.length > 0) {
            s += `   - Tab Enhancements & Polish Touches: ${sec.enabledEnhancements.join(", ")}\n`;
          }
          if (sec.customNotes && sec.customNotes.trim() !== "") {
            s += `   - Specific Directives / Copy Notes: ${sec.customNotes.trim()}\n`;
          }
          return s;
        }).join("\n")
      : "Standard Landing Page sections (Hero, About, Services, Testimonials, Contact)";

    let designSystemFormatted = "Standard Clean Modern Design System";
    if (designConfig) {
      designSystemFormatted = `
- **Color Palette & Swatches:**
  - Primary Brand Color: ${designConfig.colors?.primary || "#06B6D4"}
  - Secondary Color: ${designConfig.colors?.secondary || "#3B82F6"}
  - Background Canvas: ${designConfig.colors?.background || "#090D16"}
  - Surface / Card Background: ${designConfig.colors?.surface || "#111827"}
  - Text Contrast Color: ${designConfig.colors?.text || "#F3F4F6"}
  - Accent / Glow Color: ${designConfig.colors?.accent || "#22D3EE"}
  - Palette Theme: ${designConfig.paletteId || "Custom"}
- **Layout Architecture & Density:**
  - Core Layout Pattern: ${designConfig.layoutStyle || "Modern Bento Grid"}
  - Container Constraint: ${designConfig.containerWidth || "max-w-7xl"}
  - Corner Rounding / Border Radius: ${designConfig.cornerRounding || "Smooth Modern (16px)"}
- **Mobile App Look & Responsive Viewport:**
  - Mobile Shell Mode: ${designConfig.mobileAppLook?.mode || "Native App Shell (Bottom Bar + Safe Area)"}
  - Mobile Navigation: ${designConfig.mobileAppLook?.navigationStyle || "Bottom Tab Bar (iOS/Android)"}
  - Bottom Bar Configuration: ${
    designConfig.bottomBar
      ? designConfig.bottomBar.enabled
        ? `Enabled (${designConfig.bottomBar.style}${designConfig.bottomBar.showOnAllViewports ? ", all viewports" : ", mobile"}) with tabs: ${designConfig.bottomBar.tabs.map((t: any) => `${t.label} -> #${t.targetSectionId || t.id}`).join(", ")}`
        : "Disabled / Removed (do not render fixed bottom bar)"
      : "Default mobile bottom bar"
  }
  - Touch Target Guidelines: Minimum 44px touch targets with smooth touch action feedback
- **Title Typography Engine:**
  - Display Font Family: ${designConfig.titleFontStyle?.fontFamily || "Space Grotesk"}
  - Font Weight: ${designConfig.titleFontStyle?.weight || "Bold 700"}
  - Title Casing: ${designConfig.titleFontStyle?.casing || "Sentence case"}
  - Letter Spacing / Tracking: ${designConfig.titleFontStyle?.letterSpacing || "Tight (-0.03em)"}
- **3D Title Depth & Effects:**
  - 3D Title Effect Type: ${designConfig.title3DEffect?.effectType || "perspective_tilt"}
  - 3D Effect Intensity: ${designConfig.title3DEffect?.intensity || "Medium"}
  - Specific 3D Directive: ${
    designConfig.title3DEffect?.effectType === "perspective_tilt"
      ? "Apply subtle CSS 3D perspective rotation (rotateX/rotateY) and directional spatial cast shadows to primary hero titles."
      : designConfig.title3DEffect?.effectType === "isometric_layered"
      ? "Render sharp, multi-step isometric layered offset shadows (stacked CSS text-shadow) for a high-impact physical depth."
      : designConfig.title3DEffect?.effectType === "metallic_emboss"
      ? "Use a luxury chiseled chrome/metallic gradient text fill with top specular edge highlights."
      : designConfig.title3DEffect?.effectType === "neon_glow_3d"
      ? "Apply multi-stage chromatic 3D neon glow radiating outwards from primary title strokes."
      : designConfig.title3DEffect?.effectType === "glass_relief_3d"
      ? "Create a 3D glassmorphic relief etched with top white specular reflection and subtle inner shadow."
      : designConfig.title3DEffect?.effectType === "floating_elevation"
      ? "Use deep multi-stop ambient drop shadows to give titles a visual floating elevation effect above the background."
      : "Clean flat 2D vector typography."
  }
`;
    }

    const promptText = `
You are an expert Frontend Architect and Product Manager specializing in Lovable.app, GPTs, bolt.new, and v0.
Your task is to take the following raw user requirements gathered from a custom website generation wizard and compose a highly professional, crystal-clear, structured markdown prompt.
This prompt is designed to be copied directly into Lovable.app to construct the requested website with peak quality, professional user interfaces, modular components, and pristine visual polish.

Here are the details we gathered from the developer/client:

[CLIENT IDENTITIES]
- Client/Company Name: ${clientName || "None provided"}
- Client Physical Address: ${clientAddress || "None provided"}
- Client Url/Reference: ${clientUrl || "None provided"}
- Social Media Profiles: ${socialsFormatted || "None provided"}
- Inspo/Theme URLs: ${referenceUrls && referenceUrls.length > 0 ? referenceUrls.join(", ") : "None provided"}

[THEME & COLOR SELECTION DIRECTIVE]
${askMeColorsAndTheme ? `- MANDATORY INTERACTIVE THEME REQUIREMENT: The user has chosen the option to "Ask me the colors and theme". In your generated Lovable prompt, you MUST include a clear and prominent directive instructing Lovable/AI: "Before writing the CSS styling or locking in colors, ask me what colors and theme I want for this website. Propose 2 to 3 distinct aesthetic palette directions with sample hex codes (Primary, Background, Surface, Text, Accent) and ask me to confirm or provide custom brand colors and font vibe before generating the final styling."` : `- Use modern, polished color pairings and aesthetic design system.`}

[DESIGN SYSTEM, COLORS, LAYOUT & TYPOGRAPHY SPECS]
${designSystemFormatted}

[EXPLICIT SITEMAP, PAGES & SECTIONS ARCHITECTURE]
${sectionsFormatted}

[SPECIFIC FEATURES REQUESTED]
${featuresList}

[MEDIA/BRAND ASSETS INVOLVED]
${mediaList}

[RAW QUESTIONNAIRE ANSWERS]
${formattedResponses}

Please construct a comprehensive and highly descriptive prompt that:
1. ${askMeColorsAndTheme ? '**Instructs Lovable/AI to ask for colors and theme first** (prominently specify that the AI must ask the user what colors and theme they want for the website, offering 2-3 palette directions with hex codes before generating the final CSS/styles).' : '**Clearly outlines the visual theme & aesthetic vibe** (explicitly incorporate the chosen color swatches/hex codes, the title typography pairings, layout architecture, corner radius, and 3D title visual treatment).'}
2. **Defines the Mobile App Look & Navigation** (explicitly instruct how mobile screens should render with the native bottom tab bar, safe area insets, and responsive touch controls).
3. **Details the technical sitemap structure** honoring each requested section/page, its specific layout style, its sub-components, and every tab enhancement specified.
4. **Drafts step-by-step feature criteria**, detailing how to build the animated slides, custom hover states, sliders, video overlays, and custom integrations so Lovable.app implements them flawlessly.
5. **Incorporates the media/brand assets** logically into the UI places (heroes, features, galleries).
6. **Includes a "Tech Stack & Robust Architecture" section** demanding standard React functional components, TypeScript without type errors, Tailwind CSS, Lucide icons, and responsive layouts.
7. **Enforces Strict Type-Safe Routing & Navigation Rules (Crucial for Lovable / TanStack Router)**:
   - In \`Navbar.tsx\`, Header, and Footer components, use clean hash links (\`href="#services"\`, \`href="#about"\`, etc.) for landing page section scrolling, or strictly valid static routes (\`to="/services"\`, \`to="/contact"\`).
   - **DO NOT** generate unbound dynamic router links like \`<Link to="/services/$slug" params={{ slug: ... }}>\` in navigation bars unless the corresponding typed dynamic route definition is fully declared, preventing TS2322 / TS2353 router type mismatches. Use state modals, hash anchors, or query params for item detail interactions.

Make the output look beautiful, professional, and readable using Markdown with headers, bold points, and clean bullet points. Write in a highly clear, developer-friendly, encouraging prompt style (e.g. "Create a fully responsive React and Tailwind website for..."). Do not add excessive pre/post-text. Start directly with the prompt content or a clean header.
`;

    let generatedPrompt = "";
    let fallbackUsed = false;
    let warningNote = "";

    try {
      generatedPrompt = await generateWithFallbacks(ai, promptText);
    } catch (llmError: any) {
      console.warn("[Gemini API] All live LLM candidates were temporarily unavailable. Falling back to architectural prompt synthesis.", llmError?.message || llmError);
      generatedPrompt = synthesizeArchitecturalPrompt(req.body);
      fallbackUsed = true;
      warningNote = "Generated with architectural synthesis because Gemini models were momentarily experiencing temporary high demand.";
    }

    res.json({
      prompt: generatedPrompt,
      fallbackUsed,
      warning: warningNote || undefined
    });
  } catch (error: any) {
    console.error("Error in /api/generate-prompt endpoint:", error);
    const rawMsg = error?.message || "Failed to generate prompt";
    res.status(500).json({ error: rawMsg });
  }
});

// Configure Vite or Static Assets serving based on node environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
