"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Lock,
  FileText,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function HelpPage() {
  const router = useRouter();

  const handlePromptClick = (text: string) => {
    router.push(`/create?prompt=${encodeURIComponent(text)}`);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="mx-auto max-w-4xl w-full px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gov-800 text-white">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Help & User Guide
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about creating Google Forms with AI assistance.
          </p>
        </div>

        {/* What Can I Say Section (Section 21) */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gov-800 uppercase tracking-wider">
              Natural Language Commands
            </span>
            <h2 className="text-xl font-bold text-slate-900">What Can I Say to the AI?</h2>
            <p className="text-xs text-slate-500">
              You can speak naturally. Here are real examples of commands you can give at any stage:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                category: "Creating Forms",
                examples: [
                  "Create a registration form for students and teachers.",
                  "Create a feedback form for workshops with 5 rating questions.",
                  "Create a scholarship application with academic and financial details.",
                ],
              },
              {
                category: "Modifying Questions",
                examples: [
                  "Make mobile number mandatory.",
                  "Add a question for applicant's district.",
                  "Remove gender question.",
                  "Add an emergency contact number.",
                ],
              },
              {
                category: "Structuring Sections",
                examples: [
                  "Create separate sections for students and teachers.",
                  "Students should not see the teacher questions.",
                  "Add a section for document verification.",
                ],
              },
              {
                category: "Settings & Titles",
                examples: [
                  "Change the title to Official Scholarship Form 2026.",
                  "Add instructions explaining that only PDF documents are accepted.",
                ],
              },
            ].map((group, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {group.category}
                </h3>
                <ul className="space-y-1.5">
                  {group.examples.map((eg, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handlePromptClick(eg)}
                        className="text-left text-xs text-gov-800 hover:text-gov-900 hover:underline flex items-start gap-1.5 group"
                      >
                        <span className="text-gov-600 font-bold">&ldquo;</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">{eg}</span>
                        <span className="text-gov-600 font-bold">&rdquo;</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Question Types (Section 15) */}
        <div id="supported-types" className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gov-800 uppercase tracking-wider">
              Google Forms Compatibility
            </span>
            <h2 className="text-xl font-bold text-slate-900">Supported Google Question Types</h2>
            <p className="text-xs text-slate-500">
              Only standard, reliable Google Forms API types are used so your forms function seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { type: "Short Answer", desc: "Single line responses such as names, phone numbers, roll numbers." },
              { type: "Paragraph", desc: "Multi-line text for feedback, comments, and long descriptions." },
              { type: "Multiple Choice", desc: "Single-select radio buttons for categories and choices." },
              { type: "Checkboxes", desc: "Multi-select checkboxes for multi-item choices." },
              { type: "Dropdown", desc: "Dropdown select menus for large lists (states, classes, departments)." },
              { type: "Linear Scale", desc: "Numeric rating scales from 1 to 5 or 1 to 10 for evaluations." },
              { type: "Date", desc: "Date pickers with day, month, and year for dates of birth." },
              { type: "Time", desc: "Time pickers for shift timings and appointment selections." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 p-3.5 space-y-1 bg-slate-50">
                <span className="font-bold text-slate-900 block">{item.type}</span>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm">Where is my form stored?</h3>
              <p className="text-slate-600 leading-relaxed">
                Forms created with this application are stored directly inside your Google Drive under your Google account. You have complete ownership and can access them via docs.google.com/forms anytime.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm">Can I edit my form after creation?</h3>
              <p className="text-slate-600 leading-relaxed">
                Yes. After your form is created, you receive a direct &ldquo;Edit in Google Forms&rdquo; link. Any changes you make in Google Forms will take effect immediately.
              </p>
            </div>

            <div id="permissions" className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-sm">How does Google authorization work?</h3>
              <p className="text-slate-600 leading-relaxed">
                We use official Google OAuth2. We only request the minimum permission needed to create forms and files on your behalf (<code className="text-gov-800">forms.body</code> and <code className="text-gov-800">drive.file</code>). We never inspect your private emails or unrelated Drive documents.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
