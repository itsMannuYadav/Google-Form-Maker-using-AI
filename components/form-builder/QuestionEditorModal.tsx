"use client";

import React, { useState, useEffect } from "react";
import { FormQuestion, QuestionType } from "@/types/form";
import { X, Plus, Trash2, Check } from "lucide-react";
import { generateId } from "@/lib/utils";

interface QuestionEditorModalProps {
  question: FormQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: FormQuestion) => void;
}

const QUESTION_TYPES: Array<{ label: string; value: QuestionType; description: string }> = [
  { label: "Short Answer", value: "SHORT_ANSWER", description: "Single line text response" },
  { label: "Paragraph", value: "PARAGRAPH", description: "Multi-line detailed text response" },
  { label: "Multiple Choice", value: "MULTIPLE_CHOICE", description: "Select one option (Radio button)" },
  { label: "Checkboxes", value: "CHECKBOXES", description: "Select multiple applicable options" },
  { label: "Dropdown", value: "DROPDOWN", description: "Choose from a dropdown menu list" },
  { label: "Linear Scale", value: "LINEAR_SCALE", description: "Rating from 1 to 5 or 10" },
  { label: "Date", value: "DATE", description: "Date selector (Day, Month, Year)" },
  { label: "Time", value: "TIME", description: "Time of day selector (Hours & Minutes)" },
];

export default function QuestionEditorModal({
  question,
  isOpen,
  onClose,
  onSave,
}: QuestionEditorModalProps) {
  const [formData, setFormData] = useState<FormQuestion | null>(null);

  useEffect(() => {
    if (question) {
      setFormData(JSON.parse(JSON.stringify(question)));
    }
  }, [question, isOpen]);

  if (!isOpen || !formData) return null;

  const handleTypeChange = (newType: QuestionType) => {
    const updated = { ...formData, type: newType };
    if (["MULTIPLE_CHOICE", "CHECKBOXES", "DROPDOWN"].includes(newType) && (!updated.options || updated.options.length === 0)) {
      updated.options = [
        { id: generateId("opt"), value: "Option 1" },
        { id: generateId("opt"), value: "Option 2" },
      ];
    }
    if (newType === "LINEAR_SCALE" && !updated.scaleConfig) {
      updated.scaleConfig = { low: 1, high: 5, lowLabel: "Poor", highLabel: "Excellent" };
    }
    if (newType === "DATE" && !updated.dateConfig) {
      updated.dateConfig = { includeYear: true, includeTime: false };
    }
    setFormData(updated);
  };

  const handleAddOption = () => {
    if (!formData.options) return;
    const count = formData.options.length + 1;
    setFormData({
      ...formData,
      options: [...formData.options, { id: generateId("opt"), value: `Option ${count}` }],
    });
  };

  const handleOptionChange = (index: number, val: string) => {
    if (!formData.options) return;
    const newOptions = [...formData.options];
    newOptions[index].value = val;
    setFormData({ ...formData, options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    if (!formData.options || formData.options.length <= 1) return;
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
    onClose();
  };

  const showOptions = ["MULTIPLE_CHOICE", "CHECKBOXES", "DROPDOWN"].includes(formData.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Edit Question</h3>
            <p className="text-xs text-slate-500">Fine-tune the question details and configuration</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Question Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Full Name, Contact Number, Feedback"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-gov-700 focus:ring-1 focus:ring-gov-700 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Hint / Help Text (Optional)
            </label>
            <input
              type="text"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Please enter 10 digits without country code"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-gov-700 focus:ring-1 focus:ring-gov-700 focus:outline-none"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Question Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-gov-700 focus:ring-1 focus:ring-gov-700 focus:outline-none bg-white"
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} ({t.description})
                </option>
              ))}
            </select>
          </div>

          {/* Required Checkbox */}
          <div className="flex items-center gap-2 pt-1 pb-1">
            <input
              type="checkbox"
              id="required-toggle"
              checked={formData.required}
              onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-gov-800 focus:ring-gov-700 cursor-pointer"
            />
            <label htmlFor="required-toggle" className="text-sm font-medium text-slate-800 cursor-pointer">
              Make this question mandatory (Required *)
            </label>
          </div>

          {/* Options Editor for Multiple Choice, Checkboxes, Dropdown */}
          {showOptions && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Answer Options
              </label>
              <div className="space-y-2">
                {formData.options?.map((opt, idx) => (
                  <div key={opt.id || idx} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-5">{idx + 1}.</span>
                    <input
                      type="text"
                      value={opt.value}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-gov-700 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      disabled={(formData.options?.length || 0) <= 1}
                      className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gov-700 hover:text-gov-900 hover:underline pt-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Option</span>
              </button>
            </div>
          )}

          {/* Scale Config */}
          {formData.type === "LINEAR_SCALE" && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Scale Range & Labels
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-500">Low Label (1)</span>
                  <input
                    type="text"
                    value={formData.scaleConfig?.lowLabel || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scaleConfig: {
                          low: 1,
                          high: formData.scaleConfig?.high || 5,
                          lowLabel: e.target.value,
                          highLabel: formData.scaleConfig?.highLabel,
                        },
                      })
                    }
                    placeholder="e.g. Poor"
                    className="w-full mt-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500">High Label (5)</span>
                  <input
                    type="text"
                    value={formData.scaleConfig?.highLabel || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scaleConfig: {
                          low: 1,
                          high: 5,
                          lowLabel: formData.scaleConfig?.lowLabel,
                          highLabel: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Excellent"
                    className="w-full mt-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gov-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gov-900 transition-colors"
            >
              <Check className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
