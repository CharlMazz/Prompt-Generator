import { SectionTemplate, SelectedSectionConfig } from "../types";

export const DEFAULT_SECTION_TEMPLATES: SectionTemplate[] = [
  {
    id: "home",
    name: "Home / Landing Hero",
    category: "Core",
    description: "High-impact opening hero, value proposition, quick stats, and primary calls to action.",
    iconName: "Home",
    defaultLayout: "Split Headline + Dynamic CTA Hero",
    layoutOptions: [
      "Split Headline + Dynamic CTA Hero",
      "Full-Width Ambient Video Hero",
      "Modern Bento Grid Showcase",
      "Minimalist Big Typography & Micro-copy",
      "Interactive 3D / Product Canvas"
    ],
    submodules: [
      { id: "hero_banner", label: "Primary Hero Banner & Action CTA", description: "Eye-catching headline, subtitle, and primary/secondary button triggers." },
      { id: "value_props", label: "Core Value Propositions (3 Pillars)", description: "Distinct cards highlighting unique selling points with icons." },
      { id: "social_proof_bar", label: "Social Proof & Partner Logos Marquee", description: "Infinite scrolling ticker of partner brands, clients, or press logos." },
      { id: "stats_counter", label: "Metrics & Animated Key Stat Counters", description: "Tabular statistics celebrating community, volume, or track record." },
      { id: "featured_preview", label: "Featured Product / Work Teaser", description: "Quick preview card linking directly into services or catalog." }
    ],
    enhancementOptions: [
      { id: "scroll_animations", label: "Scroll-Triggered Entrance Animations", description: "Smooth staggered reveal as visitor scrolls down the page." },
      { id: "glassmorphism_nav", label: "Sticky Glassmorphic Navigation Header", description: "Translucent blurred top bar with quick CTA button." },
      { id: "interactive_particles", label: "Subtle Canvas / Video Backdrop Overlay", description: "Muted background atmosphere to enhance visual depth." },
      { id: "floating_badge", label: "Floating Rating / Status Notification Pill", description: "Dynamic badge such as '⭐️ 4.9/5 from 800+ clients'." }
    ]
  },
  {
    id: "services",
    name: "Services & Solutions",
    category: "Commercial",
    description: "Itemized service offerings, deliverables checklist, process steps, and pricing tier hints.",
    iconName: "Briefcase",
    defaultLayout: "Interactive Filterable Service Cards",
    layoutOptions: [
      "Interactive Filterable Service Cards",
      "Tabbed Category Switcher",
      "Accordion Deep-Dive per Service",
      "Comparison Matrix Grid",
      "Hover-Expanding Visual Cards"
    ],
    submodules: [
      { id: "service_tabs", label: "Category Filter Tabs", description: "Allow users to filter services by domain or project scope." },
      { id: "deliverables_list", label: "Deliverables & Feature Checklists", description: "Clear list of exact outcomes and assets delivered to client." },
      { id: "workflow_steps", label: "Step-by-Step Delivery Process", description: "Numbered 1-2-3-4 workflow breakdown explaining the engagement." },
      { id: "booking_cta", label: "Direct Consultation / Booking CTA", description: "Button triggering inquiry modal or Calendly integration." }
    ],
    enhancementOptions: [
      { id: "hover_zoom", label: "Hover Card Zoom & Highlight Effects", description: "Subtle scale and border glow when hovering over service cards." },
      { id: "price_estimator", label: "Interactive Service Cost Estimator", description: "Slider or checkbox widget calculating approximate project estimates." },
      { id: "brochure_download", label: "Downloadable Brochure / PDF Catalog Trigger", description: "One-click action to download service details or rate card." }
    ]
  },
  {
    id: "about",
    name: "About Us & Origin Story",
    category: "Core",
    description: "Company heritage, mission manifesto, brand philosophy, and milestone achievements.",
    iconName: "Compass",
    defaultLayout: "Storytelling Chronological Timeline",
    layoutOptions: [
      "Storytelling Chronological Timeline",
      "Split Editorial Image + Brand Manifesto",
      "Mission, Vision & Core Values Grid",
      "Founder Letter & Signature Showcase"
    ],
    submodules: [
      { id: "story_timeline", label: "Milestone Journey Timeline", description: "Key historical dates and growth turning points." },
      { id: "core_values", label: "Core Values & Principles Grid", description: "Bento cards displaying guiding philosophy with custom icons." },
      { id: "founder_spotlight", label: "Founder / Leadership Message", description: "Personal note from founders with signature and portrait." },
      { id: "certifications", label: "Certifications & Press Recognition", description: "Official badges, eco-labels, or industry accolades." }
    ],
    enhancementOptions: [
      { id: "video_story", label: "Embedded Documentary / Video Reel Modal", description: "Lightweight modal player for company story video." },
      { id: "counter_years", label: "Years of Experience Dynamic Badge", description: "Animated badge displaying years in business or projects delivered." }
    ]
  },
  {
    id: "portfolio",
    name: "Portfolio & Case Studies",
    category: "Commercial",
    description: "Showcase of past projects, client deliverables, visual media galleries, and results metrics.",
    iconName: "FolderKanban",
    defaultLayout: "Filterable Masonry Project Grid",
    layoutOptions: [
      "Filterable Masonry Project Grid",
      "Full-Screen Case Study Carousel",
      "Split Before & After Image Slider",
      "Compact Minimalist Project List"
    ],
    submodules: [
      { id: "category_filters", label: "Industry & Category Filter Buttons", description: "Instant tag filtering without page reload." },
      { id: "project_modal", label: "Expandable Project Detail Modal / Drawer", description: "Opens deep case study with challenge, solution, and results." },
      { id: "results_metrics", label: "ROI & Performance Outcome Badges", description: "Key stats like '+220% Revenue' or 'Featured on TechCrunch'." },
      { id: "live_links", label: "Direct Live Demo & Github/Link Buttons", description: "External URL buttons with subtle outbound link icons." }
    ],
    enhancementOptions: [
      { id: "lightbox_zoom", label: "Full-Screen Lightbox Image Zoom", description: "High-resolution picture viewer with keyboard navigation." },
      { id: "before_after_slider", label: "Interactive Before/After Image Slider", description: "Drag-to-reveal transformation comparison tool." },
      { id: "tech_stack_pills", label: "Tech Stack & Tooling Badges", description: "Tag pills for tools, software, or methods utilized." }
    ]
  },
  {
    id: "pricing",
    name: "Pricing & Plans",
    category: "Commercial",
    description: "Tiered pricing packages, billing frequency toggles, feature comparison, and FAQ accordions.",
    iconName: "CreditCard",
    defaultLayout: "3-Tier Cards with Monthly/Annual Toggle",
    layoutOptions: [
      "3-Tier Cards with Monthly/Annual Toggle",
      "Detailed Feature Comparison Matrix Table",
      "Interactive Tier Slider Calculator",
      "Single Flat-Fee Package with Add-ons"
    ],
    submodules: [
      { id: "billing_toggle", label: "Monthly / Annual Billing Switcher", description: "Switch between cycles with 'Save 20%' discount badge." },
      { id: "popular_badge", label: "Most Popular / Recommended Highlight", description: "Distinct color border, elevated card shadow, and standout button." },
      { id: "feature_checklist", label: "Included Features Checkmark List", description: "Green tick indicators for included vs excluded capabilities." },
      { id: "custom_enterprise", label: "Custom Enterprise Inquiries Card", description: "Contact box for bespoke corporate requirements." }
    ],
    enhancementOptions: [
      { id: "guarantee_badge", label: "Money-Back Guarantee & Security Seal", description: "Trust badges: '30-Day Money-Back' and '256-Bit SSL Encrypted'." },
      { id: "faq_embed", label: "Embedded Billing FAQs Accordion", description: "Collapsible answers to top 4 common purchasing questions." },
      { id: "currency_selector", label: "Multi-Currency Dropdown Converter", description: "Auto-convert pricing between USD, EUR, GBP, CAD." }
    ]
  },
  {
    id: "testimonials",
    name: "Testimonials & Reviews",
    category: "Social Proof",
    description: "Customer quotes, Google / Trustpilot rating aggregations, video reviews, and verified badges.",
    iconName: "MessageSquare",
    defaultLayout: "Infinite Auto-Scrolling Carousel",
    layoutOptions: [
      "Infinite Auto-Scrolling Carousel",
      "Trustpilot / Google Reviews Grid",
      "Prominent Quote Spotlight + Video Card",
      "Masonry Tweet / Social Embed Wall"
    ],
    submodules: [
      { id: "rating_summary", label: "Aggregate Star Rating Score Box", description: "Average score (e.g., 4.9/5 from 1,200+ reviews)." },
      { id: "verified_badge", label: "Verified Buyer / Company Badges", description: "Avatar, role, company logo, and verified purchase checkmark." },
      { id: "pull_quote", label: "Large Featured Pull-Quote", description: "Highlight quote from a high-profile client or authority." }
    ],
    enhancementOptions: [
      { id: "infinite_marquee", label: "Smooth Continuous Marquee Movement", description: "Infinite horizontal loop with pause on hover." },
      { id: "platform_badges", label: "Google, Trustpilot & G2 Logo Badges", description: "Logos of trusted third-party review networks." }
    ]
  },
  {
    id: "team",
    name: "Team & Leadership",
    category: "Informational",
    description: "Team member portraits, leadership bios, department filtering, and social links.",
    iconName: "Users",
    defaultLayout: "Grid with Hover Bios & Social Links",
    layoutOptions: [
      "Grid with Hover Bios & Social Links",
      "Leadership Spotlight + Department Filter",
      "Minimalist Circular Avatars",
      "Expandable Bio Modal Drawers"
    ],
    submodules: [
      { id: "member_cards", label: "Portrait, Name, Title & Bio Cards", description: "Clean headshots with readable roles and short descriptions." },
      { id: "member_socials", label: "Direct Social Link Icons (LinkedIn, X, GitHub)", description: "One-click access to member professional profiles." },
      { id: "dept_filter", label: "Department Category Switcher", description: "Filter between Leadership, Engineering, Design, and Ops." }
    ],
    enhancementOptions: [
      { id: "hiring_banner", label: "'We Are Hiring!' Careers Banner Card", description: "Direct trigger card inviting applicants to open roles." },
      { id: "expand_bio", label: "Interactive Expandable Bio Drawers", description: "Clicking member opens a slide-over panel with full background." }
    ]
  },
  {
    id: "blog",
    name: "Blog, News & Articles",
    category: "Informational",
    description: "Insights articles, thought leadership, category filters, reading time tags, and newsletter opt-in.",
    iconName: "BookOpen",
    defaultLayout: "Featured Sticky Hero + Card Grid",
    layoutOptions: [
      "Featured Sticky Hero + Card Grid",
      "Magazine Editorial Multi-Column",
      "Minimalist Clean List Layout",
      "Category Tabbed Articles Grid"
    ],
    submodules: [
      { id: "featured_post", label: "Prominent Sticky Featured Article", description: "Large hero card showcasing the most recent or popular piece." },
      { id: "category_pills", label: "Topic & Category Filter Pills", description: "Filter by tutorials, industry news, updates, guides." },
      { id: "read_time", label: "Reading Time & Published Date Stamps", description: "'4 min read' metadata and author avatar." },
      { id: "newsletter_box", label: "Integrated Newsletter Subscription Card", description: "Email capture box with instant validation state." }
    ],
    enhancementOptions: [
      { id: "live_search", label: "Live Client-Side Search Bar", description: "Instant filter input typing to search article titles." },
      { id: "social_share", label: "Social Share & Copy Link Trigger", description: "Easy share buttons for X, LinkedIn, Facebook." }
    ]
  },
  {
    id: "faq",
    name: "FAQ & Knowledge Base",
    category: "Informational",
    description: "Collapsible question-and-answer accordions, topic categorization, and contact triggers.",
    iconName: "HelpCircle",
    defaultLayout: "Clean Expandable Accordion List",
    layoutOptions: [
      "Clean Expandable Accordion List",
      "2-Column Grid Accordions",
      "Categorized Tabbed FAQ Sections",
      "Searchable Help Center Layout"
    ],
    submodules: [
      { id: "accordions", label: "Smooth Expandable Accordion Cards", description: "Animated expand/collapse with plus/minus icons." },
      { id: "topic_groups", label: "Categorized FAQ Groupings", description: "Organized by General, Onboarding, Pricing, Technical." },
      { id: "support_cta", label: "'Still Have Questions?' Support Box", description: "Direct card leading to contact form or live chat." }
    ],
    enhancementOptions: [
      { id: "faq_search", label: "Live Search Filter Bar", description: "Filter question results in real time as visitor types." },
      { id: "voting_buttons", label: "Helpfulness Voting Buttons ('Was this helpful?')", description: "Interactive thumbs-up/down feedback widgets." }
    ]
  },
  {
    id: "contact",
    name: "Contact & Location",
    category: "Core",
    description: "Inquiry form, physical location address, operating hours, and interactive Google Maps.",
    iconName: "Mail",
    defaultLayout: "Split Inquiry Form & Interactive Location Map",
    layoutOptions: [
      "Split Inquiry Form & Interactive Location Map",
      "Multi-Step Guided Inquiry Wizard",
      "Direct Booking Calendar Embed",
      "Minimalist Clean Contact Cards"
    ],
    submodules: [
      { id: "inquiry_form", label: "Comprehensive Contact & Inquiry Form", description: "Fields for name, email, phone, service interest, budget, message." },
      { id: "address_hours", label: "Physical Address & Business Hours Card", description: "Structured address layout with opening hours and timezone." },
      { id: "map_embed", label: "Google Maps / Interactive Location Pin", description: "Visual map view with pinpoint directions marker." },
      { id: "chat_buttons", label: "Instant Chat Triggers (WhatsApp / Phone)", description: "Direct click-to-chat and click-to-call action buttons." }
    ],
    enhancementOptions: [
      { id: "file_attachment", label: "File Attachment Dropzone for Project Briefs", description: "Allow clients to attach PDF/image project briefs." },
      { id: "success_animation", label: "Animated Form Submission Confirmation State", description: "Shows friendly celebration card with next-step ETA." }
    ]
  }
];

export const DEFAULT_INITIAL_SECTIONS: SelectedSectionConfig[] = [
  {
    sectionId: "home",
    name: "Home / Landing Hero",
    selectedLayout: "Split Headline + Dynamic CTA Hero",
    enabledSubmodules: ["hero_banner", "value_props", "social_proof_bar", "stats_counter"],
    enabledEnhancements: ["scroll_animations", "glassmorphism_nav", "floating_badge"],
    customNotes: "Focus on strong value headline and prominent high-contrast CTA button."
  },
  {
    sectionId: "services",
    name: "Services & Solutions",
    selectedLayout: "Interactive Filterable Service Cards",
    enabledSubmodules: ["service_tabs", "deliverables_list", "booking_cta"],
    enabledEnhancements: ["hover_zoom", "price_estimator"],
    customNotes: "Highlight core deliverables clearly with checked bullet points."
  },
  {
    sectionId: "about",
    name: "About Us & Story",
    selectedLayout: "Storytelling Chronological Timeline",
    enabledSubmodules: ["story_timeline", "core_values", "founder_spotlight"],
    enabledEnhancements: ["counter_years"],
    customNotes: "Emphasize craftsmanship, ethics, and founder commitment."
  },
  {
    sectionId: "testimonials",
    name: "Testimonials & Reviews",
    selectedLayout: "Infinite Auto-Scrolling Carousel",
    enabledSubmodules: ["rating_summary", "verified_badge", "pull_quote"],
    enabledEnhancements: ["infinite_marquee", "platform_badges"],
    customNotes: "Display real client reviews with verified buyer badges."
  },
  {
    sectionId: "contact",
    name: "Contact & Location",
    selectedLayout: "Split Inquiry Form & Interactive Location Map",
    enabledSubmodules: ["inquiry_form", "address_hours", "map_embed", "chat_buttons"],
    enabledEnhancements: ["success_animation"],
    customNotes: "Include fast turnaround inquiry form and clear physical address."
  }
];
