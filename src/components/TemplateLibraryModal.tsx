import React, { useState } from "react";
import {
  Bookmark,
  X,
  Plus,
  Trash2,
  Download,
  Upload,
  Check,
  Sparkles,
  Layers,
  Layout,
  Globe,
  Palette,
  Search,
  Sliders,
  Calendar,
  ExternalLink
} from "lucide-react";
import { SavedPromptTemplate, SelectedSectionConfig, SocialLinks, DesignSystemConfig, Answer } from "../types";

interface TemplateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTemplates: SavedPromptTemplate[];
  onSaveTemplate: (template: Omit<SavedPromptTemplate, "id" | "createdAt">) => void;
  onDeleteTemplate: (id: string) => void;
  onLoadTemplate: (template: SavedPromptTemplate) => void;
  onImportTemplates: (templates: SavedPromptTemplate[]) => void;
  systemPresets: Array<{
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
  }>;
  // Current workspace snapshot for quick-saving
  currentWorkspace: {
    clientName: string;
    clientAddress: string;
    clientUrl: string;
    clientSocials: SocialLinks;
    referenceUrls: string[];
    features: string[];
    selectedSections: SelectedSectionConfig[];
    askMeColorsAndTheme: boolean;
    designConfig?: DesignSystemConfig;
    answers: Answer[];
  };
}

export default function TemplateLibraryModal({
  isOpen,
  onClose,
  savedTemplates,
  onSaveTemplate,
  onDeleteTemplate,
  onLoadTemplate,
  onImportTemplates,
  systemPresets,
  currentWorkspace
}: TemplateLibraryModalProps) {
  const [activeTab, setActiveTab] = useState<"custom" | "system">("custom");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSavingNew, setIsSavingNew] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateBadge, setNewTemplateBadge] = useState("Custom Spec");
  const [newTemplateDesc, setNewTemplateDesc] = useState("");
  const [loadedTemplateId, setLoadedTemplateId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) return;

    onSaveTemplate({
      name: newTemplateName.trim(),
      badge: newTemplateBadge.trim() || "Custom Spec",
      description: newTemplateDesc.trim() || `Configured for ${currentWorkspace.clientName || "custom website"} with ${currentWorkspace.selectedSections.length} sections.`,
      clientName: currentWorkspace.clientName,
      clientAddress: currentWorkspace.clientAddress,
      clientUrl: currentWorkspace.clientUrl,
      clientSocials: currentWorkspace.clientSocials,
      referenceUrls: currentWorkspace.referenceUrls,
      features: currentWorkspace.features,
      selectedSections: currentWorkspace.selectedSections,
      askMeColorsAndTheme: currentWorkspace.askMeColorsAndTheme,
      designConfig: currentWorkspace.designConfig,
      answers: currentWorkspace.answers
    });

    setNewTemplateName("");
    setNewTemplateDesc("");
    setIsSavingNew(false);
    setActiveTab("custom");
  };

  const handleLoad = (template: SavedPromptTemplate) => {
    onLoadTemplate(template);
    setLoadedTemplateId(template.id);
    setTimeout(() => setLoadedTemplateId(null), 2500);
  };

  const handleExportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedTemplates, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lovable-template-library-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          onImportTemplates(imported);
          setActiveTab("custom");
        } else {
          alert("Invalid templates file format: expected an array of templates.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filteredCustom = savedTemplates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSystem = systemPresets.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const badgeSuggestions = ["Client Pitch", "E-Commerce", "SaaS", "Agency", "Portfolio", "Landing Page", "Dark Theme"];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-950">Template Library</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {savedTemplates.length} Custom Saved
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Save, load, and manage your favourite prompt architectures and blueprints.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isSavingNew && (
              <button
                type="button"
                id="btn-open-save-form"
                onClick={() => {
                  setIsSavingNew(true);
                  setNewTemplateName(currentWorkspace.clientName ? `${currentWorkspace.clientName} Spec` : "My Custom Website Spec");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Save Current Workspace</span>
              </button>
            )}
            <button
              type="button"
              id="btn-close-template-library"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-150 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Current Workspace Form Accordion */}
        {isSavingNew && (
          <div className="p-5 bg-amber-50/50 border-b border-amber-200/80 shrink-0 animate-fade-in">
            <form onSubmit={handleSaveCurrent} className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                  Save Current Workspace as Reusable Template
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSavingNew(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="input-new-template-name"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="e.g. Modern Minimalist SaaS Spec"
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    id="input-new-template-badge"
                    value={newTemplateBadge}
                    onChange={(e) => setNewTemplateBadge(e.target.value)}
                    placeholder="e.g. SaaS, E-Commerce"
                    className="w-full text-xs px-3 py-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Tag suggestions */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-zinc-400 mr-1">Quick tags:</span>
                {badgeSuggestions.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setNewTemplateBadge(tag)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 border border-zinc-200 text-zinc-600 hover:text-amber-800 cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                  Description / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  id="input-new-template-desc"
                  value={newTemplateDesc}
                  onChange={(e) => setNewTemplateDesc(e.target.value)}
                  placeholder="Key details, client pitch focus, or specific architectural rules..."
                  className="w-full text-xs px-3 py-2 bg-white border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Preview of items included */}
              <div className="p-2.5 bg-white rounded-lg border border-amber-200/60 text-[11px] text-zinc-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>📁 <strong>Sections:</strong> {currentWorkspace.selectedSections.length} configured</span>
                <span>✨ <strong>Features:</strong> {currentWorkspace.features.length} selected</span>
                <span>🎨 <strong>Colors Mode:</strong> {currentWorkspace.askMeColorsAndTheme ? "Ask me interactively" : "Predefined"}</span>
                {currentWorkspace.clientName && <span>🏢 <strong>Client:</strong> {currentWorkspace.clientName}</span>}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsSavingNew(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-confirm-save-template"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to Template Library</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Toolbar & Filter Bar */}
        <div className="p-4 border-b border-zinc-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex space-x-1 p-1 bg-zinc-100 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              id="tab-custom-templates"
              onClick={() => setActiveTab("custom")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>My Saved Templates</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-zinc-200/80 rounded-full font-bold">
                {savedTemplates.length}
              </span>
            </button>
            <button
              type="button"
              id="tab-system-presets"
              onClick={() => setActiveTab("system")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "system"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Curated System Presets</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-zinc-200/80 rounded-full font-bold">
                {systemPresets.length}
              </span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-zinc-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-zinc-800 placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Scrollable Templates Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-zinc-50/50">
          
          {/* CUSTOM USER TEMPLATES TAB */}
          {activeTab === "custom" && (
            <div>
              {filteredCustom.length === 0 ? (
                <div className="py-14 px-4 text-center border-2 border-dashed border-zinc-200 rounded-2xl bg-white max-w-lg mx-auto space-y-3">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-800">
                    {searchQuery ? "No templates match your search" : "No Custom Templates Saved Yet"}
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    {searchQuery
                      ? "Try searching for a different keyword or tag."
                      : "Save your current workspace configuration as a preset so you can load your ideal sections, features, and specs anytime!"}
                  </p>
                  {!searchQuery && !isSavingNew && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSavingNew(true);
                        setNewTemplateName(currentWorkspace.clientName ? `${currentWorkspace.clientName} Spec` : "My Custom Spec");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save Current Workspace Now</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCustom.map((template) => {
                    const isLoaded = loadedTemplateId === template.id;
                    const dateFormatted = new Date(template.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });

                    return (
                      <div
                        key={template.id}
                        id={`card-template-${template.id}`}
                        className={`bg-white rounded-xl border p-4.5 flex flex-col justify-between transition-all hover:shadow-md group ${
                          isLoaded ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20" : "border-zinc-200"
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                                  {template.name}
                                </h4>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                  {template.badge}
                                </span>
                              </div>
                              <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                {dateFormatted}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete template "${template.name}"?`)) {
                                  onDeleteTemplate(template.id);
                                }
                              }}
                              id={`btn-delete-template-${template.id}`}
                              className="text-zinc-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete template"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-zinc-600 leading-normal line-clamp-2">
                            {template.description}
                          </p>

                          {/* Specification badges */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium">
                              <Layout className="w-3 h-3 text-amber-600" />
                              {template.selectedSections.length} Sections
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium">
                              <Layers className="w-3 h-3 text-amber-600" />
                              {template.features.length} Features
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium">
                              <Palette className="w-3 h-3 text-amber-600" />
                              {template.askMeColorsAndTheme ? "Ask Colors" : "Static Colors"}
                            </span>
                            {template.clientName && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium truncate max-w-[150px]">
                                <Globe className="w-3 h-3 text-amber-600" />
                                {template.clientName}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Action footer */}
                        <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const singleData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
                              const a = document.createElement("a");
                              a.href = singleData;
                              a.download = `template-${template.name.toLowerCase().replace(/\s+/g, "-")}.json`;
                              a.click();
                            }}
                            className="text-[11px] text-zinc-400 hover:text-zinc-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                            title="Export single template as JSON"
                          >
                            <Download className="w-3 h-3" />
                            <span>Export JSON</span>
                          </button>

                          <button
                            type="button"
                            id={`btn-load-template-${template.id}`}
                            onClick={() => handleLoad(template)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                              isLoaded
                                ? "bg-emerald-500 text-white"
                                : "bg-zinc-900 hover:bg-zinc-800 text-white"
                            }`}
                          >
                            {isLoaded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Loaded into Workspace!</span>
                              </>
                            ) : (
                              <span>Load into Workspace &rarr;</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SYSTEM PRESETS TAB */}
          {activeTab === "system" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSystem.map((preset) => {
                const isLoaded = loadedTemplateId === preset.id;
                return (
                  <div
                    key={preset.id}
                    id={`card-system-preset-${preset.id}`}
                    className={`bg-white rounded-xl border p-4.5 flex flex-col justify-between transition-all hover:shadow-md group ${
                      isLoaded ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20" : "border-zinc-200"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                              {preset.name}
                            </h4>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                              {preset.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-amber-600 font-semibold mt-0.5 block">
                            System Pre-configured Spec
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-normal">
                        {preset.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {preset.selectedSections && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium">
                            <Layout className="w-3 h-3 text-amber-600" />
                            {preset.selectedSections.length} Sections
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium">
                          <Layers className="w-3 h-3 text-amber-600" />
                          {preset.features.length} Features
                        </span>
                        {preset.clientName && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 flex items-center gap-1 font-medium truncate max-w-[160px]">
                            <Globe className="w-3 h-3 text-amber-600" />
                            {preset.clientName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-end">
                      <button
                        type="button"
                        id={`btn-load-system-${preset.id}`}
                        onClick={() => {
                          const converted: SavedPromptTemplate = {
                            id: preset.id,
                            name: preset.name,
                            badge: preset.badge,
                            description: preset.description,
                            createdAt: Date.now(),
                            clientName: preset.clientName,
                            clientAddress: preset.clientAddress,
                            clientUrl: preset.clientUrl,
                            clientSocials: preset.clientSocials,
                            referenceUrls: preset.referenceUrls,
                            features: preset.features,
                            selectedSections: preset.selectedSections || [],
                            designConfig: preset.designConfig,
                            askMeColorsAndTheme: true,
                            answers: preset.answers
                          };
                          handleLoad(converted);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                          isLoaded
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold"
                        }`}
                      >
                        {isLoaded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Loaded into Workspace!</span>
                          </>
                        ) : (
                          <span>Load Preset &rarr;</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="btn-export-library"
              onClick={handleExportAll}
              disabled={savedTemplates.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Library JSON</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="button"
            id="btn-close-modal-bottom"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Library
          </button>
        </div>

      </div>
    </div>
  );
}
