"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { getFormById, deleteForm } from "@/lib/firebase/firestore";
import { SavedFormRecord } from "@/types/form";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle2,
  Trash2,
  FileText,
  Clock,
  Share2,
  Layers,
  Sparkles,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function FormDetailsPage() {
  const params = useParams();
  const formId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();

  const [formRecord, setFormRecord] = useState<SavedFormRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (!formId) return;
      setLoading(true);
      try {
        const data = await getFormById(formId);
        setFormRecord(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [formId]);

  const handleCopyLink = () => {
    if (!formRecord?.responderUri) return;
    navigator.clipboard.writeText(formRecord.responderUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this form record?")) {
      await deleteForm(formId);
      router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gov-800 border-t-transparent" />
          <span>Loading form details…</span>
        </div>
      </div>
    );
  }

  if (!formRecord) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-center space-y-3">
        <h3 className="text-base font-semibold text-slate-800">Form Not Found</h3>
        <p className="text-xs text-slate-500">The requested form record could not be located.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gov-800 px-4 py-2 text-xs font-semibold text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const def = formRecord.formDefinition;
  const totalQuestions = def?.sections?.reduce((acc, s) => acc + (s.questions?.length || 0), 0) || 0;

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Form Record</span>
          </button>
        </div>

        {/* Main Details Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 gform-accent-border">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                  Google Form
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">Created {formatDate(formRecord.createdAt)}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{formRecord.title}</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                {formRecord.description || "No description provided."}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 shrink-0">
              {formRecord.responderUri && (
                <a
                  href={formRecord.responderUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gov-800 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors"
                >
                  <span>Open Form</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {formRecord.editUri && (
                <a
                  href={formRecord.editUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50/70 px-4 py-2 text-xs font-semibold text-purple-900 hover:bg-purple-100 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-purple-700" />
                  <span>Edit in Google Forms</span>
                </a>
              )}
            </div>
          </div>

          {/* Shareable Link Box */}
          {formRecord.responderUri && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Public Shareable Link</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-gov-800 hover:text-gov-900"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-700 truncate">
                {formRecord.responderUri}
              </div>
            </div>
          )}

          {/* Form Structure Summary */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-gov-800" />
              <span>Form Structure ({totalQuestions} Questions in {def?.sections?.length || 1} Sections)</span>
            </h3>

            <div className="space-y-4">
              {def?.sections?.map((sec, sIdx) => (
                <div key={sec.id || sIdx} className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/40">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Section {sIdx + 1}: {sec.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {sec.questions.length} questions
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-2">
                    {sec.questions.map((q, qIdx) => (
                      <li key={q.id || qIdx} className="text-xs text-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 w-4">{qIdx + 1}.</span>
                          <span className="font-medium text-slate-800">{q.title}</span>
                          {q.required && <span className="text-red-500 font-bold">*</span>}
                        </div>
                        <span className="text-[10px] bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded">
                          {q.type.replace("_", " ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
