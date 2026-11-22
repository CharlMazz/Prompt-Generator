import React, { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, RotateCcw, Edit3, Check, HelpCircle, LayoutGrid } from "lucide-react";
import { Question, QuestionType } from "../types";

interface QuestionCustomizerProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  onResetQuestions: () => void;
}

export default function QuestionCustomizer({
  questions,
  onQuestionsChange,
  onResetQuestions,
}: QuestionCustomizerProps) {
  // New question form state
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<QuestionType>("text");
  const [newCategory, setNewCategory] = useState<Question["category"]>("Client & Branding");
  const [newDesc, setNewDesc] = useState("");
  const [newPlaceholder, setNewPlaceholder] = useState("");
  const [newOptionsText, setNewOptionsText] = useState(""); // Comma separated

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const id = "q_" + Math.random().toString(36).substring(2, 9);
    const parsedOptions = newOptionsText
      ? newOptionsText.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;

    const newQ: Question = {
      id,
      label: newLabel.trim(),
      type: newType,
      category: newCategory,
      description: newDesc.trim() || undefined,
      placeholder: newPlaceholder.trim() || undefined,
      options: parsedOptions,
      required: false,
    };

    onQuestionsChange([...questions, newQ]);
    
    // Reset form
    setNewLabel("");
    setNewDesc("");
    setNewPlaceholder("");
    setNewOptionsText("");
  };

  const handleDeleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter((q) => q.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...questions];
    const prev = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = prev;
    onQuestionsChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === questions.length - 1) return;
    const updated = [...questions];
    const next = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = next;
    onQuestionsChange(updated);
  };

  const startEditing = (q: Question) => {
    setEditingId(q.id);
    setEditLabel(q.label);
    setEditDesc(q.description || "");
    setEditPlaceholder(q.placeholder || "");
  };

  const saveEditing = (id: string) => {
    onQuestionsChange(
      questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            label: editLabel,
            description: editDesc ? editDesc : undefined,
            placeholder: editPlaceholder ? editPlaceholder : undefined,
          };
        }
        return q;
      })
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Questionnaire Control Panel API */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-zinc-500" />
            Customize Workflow Steps
          </h3>
          <p className="text-xs text-zinc-500">
            Dynamically adjust the questions that Lovable Prompt Generator will ask.
          </p>
        </div>
        <button
          type="button"
          id="btn-reset-questions"
          onClick={onResetQuestions}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* Block to Add Dynamic Questions */}
      <form onSubmit={handleAddQuestion} className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60 space-y-3">
        <h4 className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
          Add Custom Question Step
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Question Label / Prompt</label>
            <input
              type="text"
              id="new-question-label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="What color scheme matches the brand?"
              className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800 placeholder-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Step Category</label>
            <select
              id="new-question-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as Question["category"])}
              className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800"
            >
              <option value="Client & Branding">Client & Branding</option>
              <option value="Inspiration">Inspiration & References</option>
              <option value="Features & Tech">Features & Tech Specifications</option>
              <option value="Content & Pages">Content & Sitemap</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Answer Type Formatter</label>
            <select
              id="new-question-type"
              value={newType}
              onChange={(e) => setNewType(e.target.value as QuestionType)}
              className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800"
            >
              <option value="text">Text (Single Line)</option>
              <option value="textarea">Textarea (Multi-Line)</option>
              <option value="url">Link / URL</option>
              <option value="url-list">List of Links / URLs</option>
              <option value="multi-select">Tag Elements (Multi-Select)</option>
              <option value="features-select">Built-in Premium Features Selector</option>
              <option value="file-upload">Multiple Media Uploader</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Placeholder Helper</label>
            <input
              type="text"
              id="new-question-placeholder"
              value={newPlaceholder}
              onChange={(e) => setNewPlaceholder(e.target.value)}
              placeholder="e.g. Minimalist charcoal gray and sunset orange"
              className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800 placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Options Input (visible for multi-select/tag options) */}
        {newType === "multi-select" && (
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Options (Comma Separated)</label>
            <input
              type="text"
              id="new-question-options"
              value={newOptionsText}
              onChange={(e) => setNewOptionsText(e.target.value)}
              placeholder="Minimalist, Dark Theme, Playful, Brutalist, High Contrast"
              className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800 placeholder-zinc-400"
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase">Instruction / Description (Optional)</label>
          <input
            type="text"
            id="new-question-description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Help users understand how to answer this question"
            className="w-full text-xs bg-white border border-zinc-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-800 placeholder-zinc-400"
          />
        </div>

        <button
          type="submit"
          id="btn-add-question"
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Question Step to Workflow
        </button>
      </form>

      {/* Dynamic List is Rendered Here for Reordering or Modifying */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Current Question Sequence ({questions.length})
        </h4>

        {questions.length === 0 ? (
          <div className="text-center py-6 border border-dashed rounded-lg bg-zinc-50 text-zinc-400 text-xs">
            No questions configured yet. Add one above!
          </div>
        ) : (
          questions.map((q, idx) => {
            const isEditing = editingId === q.id;

            return (
              <div
                key={q.id}
                id={`custom-question-card-${q.id}`}
                className="bg-white border border-zinc-200 rounded-lg p-3 hover:border-zinc-300 transition-colors"
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editLabel}
                      id={`edit-label-${q.id}`}
                      onChange={(e) => setEditLabel(e.target.value)}
                      className="w-full text-xs font-medium bg-zinc-50 border border-zinc-300 focus:bg-white focus:outline-hidden p-1.5 rounded-md"
                    />
                    <input
                      type="text"
                      value={editDesc}
                      id={`edit-desc-${q.id}`}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder="Add helpful context..."
                      className="w-full text-xs bg-zinc-50 border border-zinc-300 focus:bg-white focus:outline-hidden p-1.5 rounded-md text-zinc-500"
                    />
                    <input
                      type="text"
                      value={editPlaceholder}
                      id={`edit-placeholder-${q.id}`}
                      onChange={(e) => setEditPlaceholder(e.target.value)}
                      placeholder="Input placeholder text..."
                      className="w-full text-xs bg-zinc-50 border border-zinc-300 focus:bg-white focus:outline-hidden p-1.5 rounded-md text-zinc-500"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-[10px] text-zinc-500 hover:bg-zinc-100 rounded-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id={`btn-save-edit-${q.id}`}
                        onClick={() => saveEditing(q.id)}
                        className="px-2 py-1 text-[10px] bg-amber-600 hover:bg-amber-700 text-white rounded-sm flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase py-0.5 px-1.5 bg-zinc-100 text-zinc-600 rounded-sm">
                          {q.category}
                        </span>
                        <span className="text-[9px] font-semibold text-zinc-400 capitalize">
                          ({q.type.replace("-", " ")})
                        </span>
                      </div>
                      <h5 className="text-xs font-semibold text-zinc-800 mt-1">
                        {idx + 1}. {q.label}
                      </h5>
                      {q.description && (
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          {q.description}
                        </p>
                      )}
                    </div>

                    {/* Stepper sequencing actions */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        title="Move Up"
                        className={`p-1 rounded-sm transition-colors ${
                          idx === 0 ? "text-zinc-200 cursor-not-allowed" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === questions.length - 1}
                        title="Move Down"
                        className={`p-1 rounded-sm transition-colors ${
                          idx === questions.length - 1 ? "text-zinc-200 cursor-not-allowed" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditing(q)}
                        title="Edit question details"
                        className="p-1 text-zinc-600 hover:text-amber-600 hover:bg-zinc-100 rounded-sm transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete Question */}
                      <button
                        type="button"
                        id={`btn-delete-q-${q.id}`}
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete question step"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
