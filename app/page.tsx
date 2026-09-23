"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle,
  FileText,
  HelpCircle,
  Layers,
  ChevronRight,
  Lock,
  Zap,
  Users,
  Building,
  GraduationCap,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const router = useRouter();
  const [demoPrompt, setDemoPrompt] = useState("");

  const handleStartWithPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoPrompt.trim()) {
      router.push("/create");
    } else {
      router.push(`/create?prompt=${encodeURIComponent(demoPrompt.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            {/* Government/Administrative Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gov-200 bg-gov-50 px-3.5 py-1 text-xs font-semibold text-gov-800 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-gov-600" />
              <span>Designed for Administrative, Educational & Official Workflows</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Create Google Forms by simply describing what you need.
            </h1>

            {/* Supporting Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Tell us what your form should collect. Our AI helps structure the questions, sections and logic — then creates the Google Form directly in your Google Drive.
            </p>

            {/* Interactive Prompt Input Box */}
            <form onSubmit={handleStartWithPrompt} className="pt-4 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-gov-800/80 shadow-md focus-within:border-gov-900">
                <input
                  type="text"
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                  placeholder="e.g. Create a registration form for students and teachers with separate sections..."
                  className="w-full px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gov-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors shrink-0"
                >
                  <span>Create Form</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-xl bg-gov-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Micro assurances */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Zero technical knowledge required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Creates authentic Google Forms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-gov-700" />
                <span>Official Google OAuth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-gov-800 uppercase tracking-wider">
              Simple 3-Step Process
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              How the platform works
            </p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              No need to learn Google Forms configuration or question types. We translate your natural language requirements into a fully functional Google Form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gov-50 text-gov-800 font-bold text-base">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Describe What You Need</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Type in your own words what you want to collect. The AI will ask 1-2 helpful questions if clarification is needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 font-bold text-base">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Review & Fine-Tune</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                See a live Google Forms preview. Ask the AI to make changes or use simple buttons to reorder, add, or edit questions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-bold text-base">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Create Google Form</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                With a single click, your form is created directly inside your Google Drive. Get instant shareable links and edit permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-gov-800 uppercase tracking-wider">
              Popular Form Templates
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Built for real administrative tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Student & Faculty Registration",
                prompt: "Create a registration form for students and teachers with separate sections",
                desc: "Collects contact info, roll numbers, subjects, and categorizes applicants.",
              },
              {
                icon: Building,
                title: "Scholarship Applications",
                prompt: "Create a scholarship application form with personal and academic details",
                desc: "Includes date of birth, income brackets, institution name, and verification fields.",
              },
              {
                icon: Users,
                title: "Citizen Feedback Surveys",
                prompt: "Create a feedback survey with 1 to 5 rating scales and comments",
                desc: "Captures satisfaction metrics, service feedback, and suggestions.",
              },
              {
                icon: FileText,
                title: "Staff Leave & Duty Requisitions",
                prompt: "Create a staff leave application with dates, reason and designation",
                desc: "Organized fields for department, leave type, date range, and emergency contacts.",
              },
              {
                icon: Zap,
                title: "Event & Workshop Attendance",
                prompt: "Create a workshop registration form with session selection dropdown",
                desc: "Includes time preference dropdowns, organization names, and attendance confirmation.",
              },
              {
                icon: Layers,
                title: "Inspection & Audit Checklist",
                prompt: "Create an inspection form with checkboxes and ratings",
                desc: "Structured checklist format for official assessments and field reports.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:shadow-sm hover:border-gov-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gov-800 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => router.push(`/create?prompt=${encodeURIComponent(item.prompt)}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gov-800 hover:text-gov-900"
                  >
                    <span>Try this template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security and Trust Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Data Security & Privacy First</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Your data stays in your Google account.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We never store respondent answers, sensitive form submissions, or OAuth tokens on our servers. Forms are created directly inside your Google Drive, giving you 100% control and ownership over your data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700 space-y-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-semibold">Direct Google API</h3>
                <p className="text-xs text-slate-400">
                  Communicates directly with Google Forms API v1 using standard OAuth2 protocols.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700 space-y-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-semibold">Zero Response Harvesting</h3>
                <p className="text-xs text-slate-400">
                  Responses submitted to your forms go straight to your private Google account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-semibold text-gov-800 uppercase tracking-wider">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does this create a real Google Form?",
                a: "Yes. The application connects directly to Google Forms via official Google APIs and creates an authentic Google Form inside your Google Drive with all requested questions, types, and sections.",
              },
              {
                q: "Can I edit the form in Google Forms afterwards?",
                a: "Absolutely. Once created, you receive direct links to both the form responder view and the Google Forms editor view so you can customize themes or view live responses.",
              },
              {
                q: "What if I need to change a question before publishing?",
                a: "You can either type in the AI chat (e.g. 'Make mobile number required' or 'Remove gender question') or use the visual edit and move buttons on the preview pane.",
              },
              {
                q: "What Google permissions are needed?",
                a: "We only request permission to create and manage the specific Google Forms and files created by this application. We never access your other personal Drive files or emails.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-gov-700 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gov-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to create your Google Form?
          </h2>
          <p className="text-sm text-gov-200 max-w-xl mx-auto">
            Describe your form requirement in seconds. Let the AI do the heavy lifting.
          </p>
          <div className="pt-2">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-gov-900 shadow-md hover:bg-slate-100 transition-colors"
            >
              <span>Start Building a Form</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
