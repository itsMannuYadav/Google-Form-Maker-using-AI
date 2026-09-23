"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getUserForms, deleteForm } from "@/lib/firebase/firestore";
import { SavedFormRecord } from "@/types/form";
import {
  Plus,
  Search,
  FileText,
  ExternalLink,
  Trash2,
  Edit3,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [forms, setForms] = useState<SavedFormRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      loadForms();
    }
  }, [user, authLoading, router]);

  const loadForms = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserForms(user.uid);
      setForms(data);
    } catch (e) {
      console.error("Error loading forms:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this form record?")) {
      await deleteForm(id);
      setForms((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const filteredForms = forms.filter((f) =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (authLoading || loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gov-800 border-t-transparent" />
          <span>Loading your forms…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {getGreeting()}, {user?.displayName || "Officer"}
            </h1>
            <p className="text-sm text-slate-500">
              Turn your requirements into a Google Form using natural language.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gov-800 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Form</span>
          </Link>
        </div>

        {/* Your Forms Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Your Forms</h2>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {forms.length}
              </span>
            </div>

            {/* Search Bar */}
            {forms.length > 0 && (
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forms by name..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-gov-700 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Empty State */}
          {forms.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gov-50 text-gov-800">
                <FileText className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">
                  You haven&apos;t created any forms yet.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Describe what you need and we&apos;ll help you create your first Google Form.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-xl bg-gov-800 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Your First Form</span>
                </Link>
              </div>
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              No forms matching &ldquo;{searchQuery}&rdquo; found.
            </div>
          ) : (
            /* Forms Table */
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Form Name</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Questions</th>
                      <th className="px-6 py-3.5">Created</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredForms.map((form) => {
                      const totalQ = form.formDefinition?.sections?.reduce(
                        (acc, s) => acc + (s.questions?.length || 0),
                        0
                      ) || 0;

                      return (
                        <tr
                          key={form.id}
                          onClick={() => router.push(`/forms/${form.id}`)}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          {/* Form Name & Description */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700 border border-purple-200/70">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="space-y-0.5 max-w-md">
                                <p className="font-semibold text-slate-900 truncate">
                                  {form.title}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-1">
                                  {form.description || "No description provided"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            {form.status === "published" ? (
                              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Published</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">
                                <Clock className="h-3 w-3" />
                                <span>Draft</span>
                              </span>
                            )}
                          </td>

                          {/* Question Count */}
                          <td className="px-6 py-4 text-slate-600">
                            {totalQ} {totalQ === 1 ? "Question" : "Questions"}
                          </td>

                          {/* Created Date */}
                          <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                            {formatDate(form.createdAt)}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              {form.responderUri && (
                                <a
                                  href={form.responderUri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open Google Form"
                                  className="inline-flex items-center gap-1 rounded-md bg-gov-50 px-2.5 py-1 text-xs font-semibold text-gov-800 hover:bg-gov-100 transition-colors"
                                >
                                  <span>Open</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}

                              <Link
                                href={`/forms/${form.id}`}
                                title="View Details"
                                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Link>

                              <button
                                onClick={(e) => handleDelete(form.id, e)}
                                title="Delete Form"
                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
