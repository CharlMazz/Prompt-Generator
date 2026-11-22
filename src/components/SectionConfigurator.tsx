import React, { useState } from "react";
import {
  Home,
  Briefcase,
  Compass,
  FolderKanban,
  CreditCard,
  MessageSquare,
  Users,
  BookOpen,
  HelpCircle,
  Mail,
  Plus,
  Trash2,
  Sparkles,
  Sliders,
  CheckCircle2,
  Circle,
  Layout,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Check,
  Eye,
  GripVertical,
  ChevronLeft,
  ArrowUpDown,
  Move
} from "lucide-react";
import { SectionTemplate, SelectedSectionConfig } from "../types";
import { DEFAULT_SECTION_TEMPLATES } from "../constants/sectionTemplates";

interface SectionConfiguratorProps {
  selectedSections: SelectedSectionConfig[];
  onSelectedSectionsChange: (sections: SelectedSectionConfig[]) => void;
  onOpenPreview?: (sectionId?: string) => void;
}

export default function SectionConfigurator({
  selectedSections,
  onSelectedSectionsChange,
  onOpenPreview
}: SectionConfiguratorProps) {
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    return selectedSections.length > 0 ? selectedSections[0].sectionId : "home";
  });

  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customLayout, setCustomLayout] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  // Drag and Drop ordering state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [reorderNotice, setReorderNotice] = useState<string | null>(null);
  const [showOrderBar, setShowOrderBar] = useState<boolean>(true);

  // Handle reordering array elements
  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= selectedSections.length ||
      toIndex >= selectedSections.length
    ) {
      return;
    }
    const updated = [...selectedSections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onSelectedSectionsChange(updated);

    const displayName = moved.name.split("/")[0].trim();
    setReorderNotice(`"${displayName}" movido a la posición #${toIndex + 1}`);
    setTimeout(() => setReorderNotice(null), 2500);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      handleReorder(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const moveSection = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < selectedSections.length) {
      handleReorder(index, targetIndex);
    }
  };

  // Map icon strings to Lucide components
  const renderIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case "Home": return <Home className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Compass": return <Compass className={className} />;
      case "FolderKanban": return <FolderKanban className={className} />;
      case "CreditCard": return <CreditCard className={className} />;
      case "MessageSquare": return <MessageSquare className={className} />;
      case "Users": return <Users className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      case "HelpCircle": return <HelpCircle className={className} />;
      case "Mail": return <Mail className={className} />;
      default: return <Layout className={className} />;
    }
  };

  const isSectionSelected = (sectionId: string) => {
    return selectedSections.some((s) => s.sectionId === sectionId);
  };

  const toggleSection = (template: SectionTemplate) => {
    if (isSectionSelected(template.id)) {
      // Remove section
      const next = selectedSections.filter((s) => s.sectionId !== template.id);
      onSelectedSectionsChange(next);
      if (activeTabId === template.id && next.length > 0) {
        setActiveTabId(next[0].sectionId);
      }
    } else {
      // Add section with default submodules and enhancements enabled
      const newConfig: SelectedSectionConfig = {
        sectionId: template.id,
        name: template.name,
        selectedLayout: template.defaultLayout,
        enabledSubmodules: template.submodules.map((m) => m.id),
        enabledEnhancements: template.enhancementOptions.slice(0, 2).map((e) => e.id),
        customNotes: ""
      };
      const next = [...selectedSections, newConfig];
      onSelectedSectionsChange(next);
      setActiveTabId(template.id);
    }
  };

  const currentConfig = selectedSections.find((s) => s.sectionId === activeTabId);
  const currentTemplate = DEFAULT_SECTION_TEMPLATES.find((t) => t.id === activeTabId);

  const updateCurrentConfig = (updates: Partial<SelectedSectionConfig>) => {
    if (!currentConfig) return;
    const next = selectedSections.map((s) => {
      if (s.sectionId === activeTabId) {
        return { ...s, ...updates };
      }
      return s;
    });
    onSelectedSectionsChange(next);
  };

  const toggleSubmodule = (submoduleId: string) => {
    if (!currentConfig) return;
    const exists = currentConfig.enabledSubmodules.includes(submoduleId);
    const nextSubmodules = exists
      ? currentConfig.enabledSubmodules.filter((id) => id !== submoduleId)
      : [...currentConfig.enabledSubmodules, submoduleId];
    updateCurrentConfig({ enabledSubmodules: nextSubmodules });
  };

  const toggleEnhancement = (enhancementId: string) => {
    if (!currentConfig) return;
    const exists = currentConfig.enabledEnhancements.includes(enhancementId);
    const nextEnhancements = exists
      ? currentConfig.enabledEnhancements.filter((id) => id !== enhancementId)
      : [...currentConfig.enabledEnhancements, enhancementId];
    updateCurrentConfig({ enabledEnhancements: nextEnhancements });
  };

  // Quick Preset Handlers
  const applyPresetSections = (presetType: "business" | "saas" | "portfolio" | "all" | "clear") => {
    if (presetType === "clear") {
      onSelectedSectionsChange([]);
      return;
    }

    let targetIds: string[] = [];
    if (presetType === "business") {
      targetIds = ["home", "about", "services", "testimonials", "contact"];
    } else if (presetType === "saas") {
      targetIds = ["home", "services", "pricing", "testimonials", "faq", "contact"];
    } else if (presetType === "portfolio") {
      targetIds = ["home", "about", "portfolio", "testimonials", "contact"];
    } else if (presetType === "all") {
      targetIds = DEFAULT_SECTION_TEMPLATES.map((t) => t.id);
    }

    const newConfigs: SelectedSectionConfig[] = targetIds.map((id) => {
      const existing = selectedSections.find((s) => s.sectionId === id);
      if (existing) return existing;
      const t = DEFAULT_SECTION_TEMPLATES.find((item) => item.id === id);
      return {
        sectionId: id,
        name: t ? t.name : id,
        selectedLayout: t ? t.defaultLayout : "Standard Layout",
        enabledSubmodules: t ? t.submodules.map((m) => m.id) : [],
        enabledEnhancements: t ? t.enhancementOptions.slice(0, 2).map((e) => e.id) : [],
        customNotes: ""
      };
    });

    onSelectedSectionsChange(newConfigs);
    if (newConfigs.length > 0) {
      setActiveTabId(newConfigs[0].sectionId);
    }
  };

  const handleAddCustomSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const customId = `custom_${Date.now()}`;
    const newConfig: SelectedSectionConfig = {
      sectionId: customId,
      name: customName.trim(),
      selectedLayout: customLayout.trim() || "Custom Layout",
      enabledSubmodules: [],
      enabledEnhancements: [],
      customNotes: customNotes.trim()
    };

    const next = [...selectedSections, newConfig];
    onSelectedSectionsChange(next);
    setActiveTabId(customId);
    setCustomName("");
    setCustomLayout("");
    setCustomNotes("");
    setIsAddingCustom(false);
  };

  const handleRemoveActiveSection = () => {
    if (!currentConfig) return;
    const next = selectedSections.filter((s) => s.sectionId !== activeTabId);
    onSelectedSectionsChange(next);
    if (next.length > 0) {
      setActiveTabId(next[0].sectionId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-amber-500" />
            Website Sitemap & Pages Selection
          </h3>
          <div className="flex items-center gap-2">
            {onOpenPreview && (
              <button
                type="button"
                id="btn-open-preview-sections-header"
                onClick={() => onOpenPreview(activeTabId)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Vista Previa en Vivo</span>
              </button>
            )}
            {selectedSections.length > 1 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200/80 rounded-full flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-amber-600" />
                Drag & Drop Reorderable
              </span>
            )}
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-full">
              {selectedSections.length} {selectedSections.length === 1 ? "Section" : "Sections"} Active
            </span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Select which pages and sections you want on the website, drag-and-drop cards or tabs to arrange page order, then customize their layouts and enhancements below.
        </p>
      </div>

      {/* Quick Select Preset Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1 text-xs">
        <span className="text-[11px] font-semibold text-zinc-500 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Quick select:
        </span>
        <button
          type="button"
          onClick={() => applyPresetSections("business")}
          className="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
        >
          Standard Business (5)
        </button>
        <button
          type="button"
          onClick={() => applyPresetSections("saas")}
          className="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
        >
          SaaS & App (6)
        </button>
        <button
          type="button"
          onClick={() => applyPresetSections("portfolio")}
          className="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
        >
          Agency & Portfolio (5)
        </button>
        <button
          type="button"
          onClick={() => applyPresetSections("all")}
          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
        >
          Select All
        </button>
        {selectedSections.length > 0 && (
          <button
            type="button"
            onClick={() => applyPresetSections("clear")}
            className="px-2 py-1 text-zinc-400 hover:text-red-600 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* SECTION 1: CHECKABLE SECTION GRID */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-zinc-700">
          1. Choose sections to include:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1 p-0.5">
          {DEFAULT_SECTION_TEMPLATES.map((tmpl) => {
            const isSelected = isSectionSelected(tmpl.id);
            return (
              <button
                key={tmpl.id}
                type="button"
                id={`check-section-${tmpl.id}`}
                onClick={() => toggleSection(tmpl)}
                className={`p-2.5 text-left rounded-xl border transition-all flex flex-col justify-between cursor-pointer group select-none ${
                  isSelected
                    ? "bg-amber-50/80 border-amber-400 text-amber-950 shadow-2xs ring-1 ring-amber-300"
                    : "bg-white hover:bg-zinc-50/80 border-zinc-200 text-zinc-700"
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-amber-500 text-white" : "bg-zinc-100 text-zinc-500 group-hover:text-zinc-700"
                  }`}>
                    {renderIcon(tmpl.iconName, "w-3.5 h-3.5")}
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? "bg-amber-500 border-amber-600 text-white" : "border-zinc-300 bg-white"
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold truncate leading-tight">
                    {tmpl.name.split("/")[0].trim()}
                  </span>
                  <span className="block text-[9px] text-zinc-400 truncate mt-0.5">
                    {tmpl.category}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Add Custom Section Trigger */}
          <button
            type="button"
            onClick={() => setIsAddingCustom(true)}
            id="btn-open-custom-section"
            className="p-2.5 text-left rounded-xl border border-dashed border-zinc-300 hover:border-amber-400 bg-zinc-50/50 hover:bg-amber-50/30 text-zinc-600 hover:text-amber-900 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="p-1.5 rounded-lg bg-zinc-200/60 group-hover:bg-amber-200/60 text-zinc-500 group-hover:text-amber-800 w-fit mb-1">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-zinc-700 group-hover:text-amber-900 leading-tight">
                + Custom Page
              </span>
              <span className="block text-[9px] text-zinc-400 truncate mt-0.5">
                Bespoke module
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* CUSTOM SECTION MODAL / INLINE DRAWER */}
      {isAddingCustom && (
        <form onSubmit={handleAddCustomSection} className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Bespoke Custom Section / Tab
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="text-xs text-zinc-500 hover:text-zinc-800"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                Section / Page Title *
              </label>
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Careers, Live Podcast, Gallery, Event Schedule"
                className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                Layout / Display Pattern
              </label>
              <input
                type="text"
                value={customLayout}
                onChange={(e) => setCustomLayout(e.target.value)}
                placeholder="e.g. 3-Column Bento Grid, Split Media View"
                className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Custom Requirements & Notes
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Include interactive audio player widget with playlist drawer"
              className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg"
            >
              Dismiss
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg shadow-2xs cursor-pointer"
            >
              Add to Sitemap
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: PER-TAB CUSTOMIZER & ENHANCEMENT SUITE */}
      {selectedSections.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 p-6 space-y-2">
          <Layers className="w-8 h-8 text-zinc-300 mx-auto" />
          <p className="text-xs font-semibold text-zinc-600">No sections selected yet</p>
          <p className="text-[11px] text-zinc-400 max-w-sm mx-auto">
            Check one or more sections in the grid above or click a quick-select preset to configure page layouts and enhancements.
          </p>
        </div>
      ) : (
        <div className="bg-zinc-50/60 border border-zinc-200/80 rounded-2xl overflow-hidden shadow-2xs">
          
          {/* SITEMAP STRUCTURE & DRAG-AND-DROP REORDER BAR */}
          <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border-b border-zinc-200/90 px-3.5 py-2.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
                  Website Page Order & Hierarchy
                </span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">
                  (Arrastra las tarjetas o usa las flechas para reordenar la estructura)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {reorderNotice && (
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full animate-fade-in flex items-center gap-1 shadow-2xs">
                    <Check className="w-2.5 h-2.5" />
                    {reorderNotice}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setShowOrderBar(!showOrderBar)}
                  className="text-[10px] text-zinc-500 hover:text-zinc-800 font-semibold px-2 py-0.5 rounded hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  {showOrderBar ? "Ocultar secuencia" : "Ver secuencia"}
                </button>
              </div>
            </div>

            {/* Draggable Sequence Cards */}
            {showOrderBar && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
                {selectedSections.map((sec, idx) => {
                  const isDragging = draggedIndex === idx;
                  const isDragOver = dragOverIndex === idx && draggedIndex !== idx;
                  const isActive = sec.sectionId === activeTabId;
                  const tmpl = DEFAULT_SECTION_TEMPLATES.find((t) => t.id === sec.sectionId);
                  const iconName = tmpl ? tmpl.iconName : "Layout";

                  return (
                    <div key={sec.sectionId} className="flex items-center shrink-0">
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDrop={(e) => handleDrop(e, idx)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setActiveTabId(sec.sectionId)}
                        title={`Página ${idx + 1}: ${sec.name}. Arrastra para mover.`}
                        className={`group relative p-1.5 pr-2 rounded-xl border transition-all cursor-grab active:cursor-grabbing select-none flex items-center gap-1.5 text-xs ${
                          isDragging
                            ? "opacity-30 border-dashed border-amber-500 bg-amber-50 scale-95"
                            : isDragOver
                            ? "border-amber-500 bg-amber-100/90 shadow-md ring-2 ring-amber-400 scale-[1.03]"
                            : isActive
                            ? "bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-2xs ring-1 ring-amber-300"
                            : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300"
                        }`}
                      >
                        {/* Drag Grip Handle */}
                        <div className="p-0.5 text-zinc-400 group-hover:text-amber-600 transition-colors">
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>

                        {/* Order Number Badge */}
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${
                          isActive ? "bg-amber-500 text-zinc-950" : "bg-zinc-100 text-zinc-600"
                        }`}>
                          {idx + 1}
                        </span>

                        {/* Icon & Label */}
                        <div className="flex items-center gap-1 truncate max-w-[120px] sm:max-w-[140px]">
                          {renderIcon(iconName, `w-3 h-3 ${isActive ? "text-amber-600" : "text-zinc-500"}`)}
                          <span className="truncate">{sec.name.split("/")[0].trim()}</span>
                        </div>

                        {/* Quick Reorder Shift Buttons for Touch / Accessible Click */}
                        <div className="flex items-center gap-0.5 ml-0.5 pl-1 border-l border-zinc-200/80">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(idx, "left");
                            }}
                            title="Mover hacia arriba / izquierda"
                            className="p-0.5 rounded text-zinc-400 hover:text-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === selectedSections.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(idx, "right");
                            }}
                            title="Mover hacia abajo / derecha"
                            className="p-0.5 rounded text-zinc-400 hover:text-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Sequence Connector Arrow */}
                      {idx < selectedSections.length - 1 && (
                        <span className="px-1 text-zinc-300 font-bold text-xs select-none">
                          →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Section Tabs Header (Also fully draggable) */}
          <div className="bg-white border-b border-zinc-200 px-3 pt-2.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-1.5 min-w-max pb-2">
              {selectedSections.map((sec, idx) => {
                const isActive = sec.sectionId === activeTabId;
                const isDragging = draggedIndex === idx;
                const isDragOver = dragOverIndex === idx && draggedIndex !== idx;
                const tmpl = DEFAULT_SECTION_TEMPLATES.find((t) => t.id === sec.sectionId);
                const iconName = tmpl ? tmpl.iconName : "Layout";

                return (
                  <button
                    key={sec.sectionId}
                    type="button"
                    id={`tab-btn-${sec.sectionId}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setActiveTabId(sec.sectionId)}
                    title={`Pestaña ${idx + 1}: ${sec.name}. Arrastra para reordenar posición.`}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-grab active:cursor-grabbing select-none whitespace-nowrap border ${
                      isDragging
                        ? "opacity-30 border-dashed border-amber-500 bg-amber-50 scale-95"
                        : isDragOver
                        ? "border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400 scale-[1.03]"
                        : isActive
                        ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                        : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-900 border-transparent"
                    }`}
                  >
                    <GripVertical className={`w-3 h-3 ${isActive ? "text-white/70" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                    <span className={`text-[9px] font-mono px-1 rounded ${
                      isActive ? "bg-amber-600/70 text-white" : "bg-zinc-200 text-zinc-600"
                    }`}>
                      #{idx + 1}
                    </span>
                    {renderIcon(iconName, `w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-500"}`)}
                    <span>{sec.name.split("/")[0].trim()}</span>
                    {sec.enabledEnhancements.length > 0 && (
                      <span className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"
                      }`}>
                        +{sec.enabledEnhancements.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleRemoveActiveSection}
              title="Remove this active tab from sitemap"
              className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0 mb-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Tab Configuration Panel */}
          {currentConfig && (
            <div className="p-4 md:p-5 space-y-5 bg-zinc-50/40">
              
              {/* Top Details & Title Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200/70">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900">
                      Configure:
                    </span>
                    <input
                      type="text"
                      id="input-active-section-name"
                      value={currentConfig.name}
                      onChange={(e) => updateCurrentConfig({ name: e.target.value })}
                      className="text-xs font-bold text-zinc-900 bg-white border border-zinc-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>
                  {currentTemplate && (
                    <p className="text-[11px] text-zinc-500 mt-1">
                      {currentTemplate.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">
                    {currentConfig.enabledSubmodules.length} modules
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-amber-700">
                    {currentConfig.enabledEnhancements.length} enhancements
                  </span>
                </div>
              </div>

              {/* SECTION LAYOUT STYLE SELECTOR */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5 text-amber-600" />
                    Primary Layout Style
                  </label>
                  {onOpenPreview && (
                    <button
                      type="button"
                      id="btn-preview-layout-inline"
                      onClick={() => onOpenPreview(currentConfig.sectionId)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                    >
                      <Eye className="w-3 h-3 text-amber-600" />
                      <span>Ver cómo queda este layout</span>
                    </button>
                  )}
                </div>
                
                {currentTemplate && currentTemplate.layoutOptions.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTemplate.layoutOptions.map((layoutOpt) => {
                      const isSelected = currentConfig.selectedLayout === layoutOpt;
                      return (
                        <div
                          key={layoutOpt}
                          onClick={() => updateCurrentConfig({ selectedLayout: layoutOpt })}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-white border-amber-400 text-amber-950 font-semibold shadow-2xs ring-1 ring-amber-300"
                              : "bg-white/60 hover:bg-white border-zinc-200 text-zinc-700"
                          }`}
                        >
                          <span className="truncate pr-2">{layoutOpt}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-amber-500 border-amber-600 text-white" : "border-zinc-300 bg-white"
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={currentConfig.selectedLayout}
                    onChange={(e) => updateCurrentConfig({ selectedLayout: e.target.value })}
                    placeholder="Enter preferred layout style..."
                    className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                  />
                )}
              </div>

              {/* SUBMODULES CHECKLIST */}
              {currentTemplate && currentTemplate.submodules.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    Sub-components & Blocks Included in this Tab
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTemplate.submodules.map((mod) => {
                      const isChecked = currentConfig.enabledSubmodules.includes(mod.id);
                      return (
                        <div
                          key={mod.id}
                          onClick={() => toggleSubmodule(mod.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChecked
                              ? "bg-white border-amber-300/80 text-zinc-900 shadow-2xs"
                              : "bg-white/40 border-zinc-200 text-zinc-400 hover:text-zinc-600"
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? "bg-amber-500 border-amber-600 text-white" : "border-zinc-300 bg-white"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="block text-xs font-bold leading-snug">
                              {mod.label}
                            </span>
                            <span className="block text-[10px] text-zinc-400 leading-normal mt-0.5">
                              {mod.description}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EXTRA ENHANCEMENT OPTIONS FOR THIS TAB */}
              {currentTemplate && currentTemplate.enhancementOptions.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                      Extra Options to Enhance this Tab
                    </label>
                    <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
                      Premium Touches
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTemplate.enhancementOptions.map((enh) => {
                      const isChecked = currentConfig.enabledEnhancements.includes(enh.id);
                      return (
                        <div
                          key={enh.id}
                          onClick={() => toggleEnhancement(enh.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChecked
                              ? "bg-amber-50 border-amber-400 text-amber-950 shadow-2xs ring-1 ring-amber-300/40"
                              : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? "bg-amber-600 border-amber-700 text-white" : "border-zinc-300 bg-white"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="block text-xs font-bold leading-snug">
                              {enh.label}
                            </span>
                            <span className="block text-[10px] text-zinc-500 leading-normal mt-0.5">
                              {enh.description}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CUSTOM INSTRUCTIONS & NOTES FOR THIS SECTION */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-semibold text-zinc-700">
                  Specific Copy or Content Notes for {currentConfig.name}:
                </label>
                <textarea
                  rows={2}
                  id={`textarea-notes-${currentConfig.sectionId}`}
                  value={currentConfig.customNotes || ""}
                  onChange={(e) => updateCurrentConfig({ customNotes: e.target.value })}
                  placeholder={`e.g. Include specific headline 'Master the craft' or ensure 3-column pricing comparison.`}
                  className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                />
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
