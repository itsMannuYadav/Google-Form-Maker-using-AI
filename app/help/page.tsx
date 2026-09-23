"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronUp,
  ChevronDown,
  Copy,
  Edit2,
  Trash2,
  Undo2,
  AlertTriangle,
  Info,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/Footer";
import Screenshot from "@/components/Screenshot";

const TOC = [
  { id: "getting-started", label: "Sign in or try as a guest" },
  { id: "describe", label: "Describe your form" },
  { id: "chat-commands", label: "Refine it with the AI" },
  { id: "edit-preview", label: "Edit in the preview" },
  { id: "undo", label: "Undo a change" },
  { id: "drafts", label: "Drafts & the dashboard" },
  { id: "publish", label: "Create the Google Form" },
  { id: "update-published", label: "Update a published form" },
  { id: "mobile", label: "Using it on your phone" },
  { id: "supported-types", label: "Supported question types" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
];

function GuideSection({
  id,
  step,
  title,
  children,
}: {
  id: string;
  step?: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        {step !== undefined && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gov-800 text-sm font-bold text-white">
            {step}
          </span>
        )}
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

function Note({ tone = "info", children }: { tone?: "info" | "warn"; children: React.ReactNode }) {
  const styles =
    tone === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-gov-50/70 border-gov-200 text-gov-900";
  const Icon = tone === "warn" ? AlertTriangle : Info;
  return (
    <div className={`flex gap-2.5 rounded-xl border p-3.5 text-xs leading-relaxed ${styles}`}>
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

export default function HelpPage() {
  const router = useRouter();

  const handlePromptClick = (text: string) => {
    router.push(`/create?prompt=${encodeURIComponent(text)}`);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="mx-auto max-w-6xl w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gov-800 text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Help & User Guide</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            A step-by-step walkthrough, from your first prompt to a live Google Form. Every screenshot is from the
            real app — click one to see it full size.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          {/* Table of contents */}
          <aside className="mb-8 lg:mb-0">
            <nav className="lg:sticky lg:top-24 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">On this page</p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-0.5 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex gap-2 rounded-md px-2 py-1.5 text-slate-600 hover:bg-slate-50 hover:text-gov-800"
                    >
                      <span className="w-4 shrink-0 text-right text-slate-400">{i + 1}.</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <Link
                href="/whats-new"
                className="mt-3 flex items-center justify-between rounded-lg bg-gov-50 px-3 py-2 text-xs font-semibold text-gov-800 hover:bg-gov-100"
              >
                <span>See what&apos;s new</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </aside>

          <div className="space-y-8 min-w-0">
            <GuideSection id="getting-started" step={1} title="Sign in or try as a guest">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-3 space-y-3">
                  <p>You can start in one of two ways from the sign-in page:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-semibold text-slate-800">Continue with Google</span> — the full
                      experience. Your drafts are saved to your account, and you can create and update real Google
                      Forms in your Drive.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-800">Continue as Administrative Guest</span> — try
                      the builder instantly. Drafts are kept only in this browser, and you&apos;ll be asked to sign
                      in with Google when you want to create the actual Google Form.
                    </li>
                  </ul>
                  <Note>
                    Google will ask for permission to create Google Forms. The app can only manage forms it creates
                    for you — never your other Drive files or your email.
                  </Note>
                </div>
                <div className="md:col-span-2">
                  <Screenshot name="login" alt="The sign-in page with Google and guest options" />
                </div>
              </div>
            </GuideSection>

            <GuideSection id="describe" step={2} title="Describe your form">
              <p>
                Open <span className="font-semibold text-slate-800">Create Form</span>. Type what your form should
                collect in the chat box — plain English is fine — or click one of the quick examples to start from a
                template. Mention sections if you want them (&ldquo;separate sections for students and
                teachers&rdquo;).
              </p>
              <Screenshot
                name="builder-empty"
                frame="browser"
                alt="The empty builder with quick example prompts"
                caption="The builder before your first prompt. Quick examples appear under the chat."
              />
              <Note>
                If your request is unclear, the AI asks one or two short questions first instead of guessing.
              </Note>
            </GuideSection>

            <GuideSection id="chat-commands" step={3} title="Refine it with the AI">
              <p>
                The preview on the right updates after every message. Keep chatting to change the form. Under each
                reply you&apos;ll find <span className="font-semibold text-slate-800">suggestion chips</span> —
                click one to send it as your next request.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Screenshot
                  name="chat-panel"
                  alt="Chat messages with suggestion chips and copy/undo buttons"
                  caption="Your requests, the AI's replies, and suggestion chips."
                />
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Try saying (click to open in the builder)
                  </p>
                  {[
                    {
                      category: "Creating forms",
                      examples: [
                        "Create a registration form for students and teachers.",
                        "Create a feedback form for workshops with 5 rating questions.",
                      ],
                    },
                    {
                      category: "Changing questions",
                      examples: ["Make mobile number mandatory.", "Add a question for applicant's district.", "Remove gender question."],
                    },
                    {
                      category: "Sections",
                      examples: ["Create separate sections for students and teachers.", "Add a section for document verification."],
                    },
                    {
                      category: "Title & instructions",
                      examples: ["Change the title to Official Scholarship Form 2026.", "Add instructions saying only PDF documents are accepted."],
                    },
                  ].map((group) => (
                    <div key={group.category} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-1.5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">{group.category}</h3>
                      <ul className="space-y-1">
                        {group.examples.map((eg) => (
                          <li key={eg}>
                            <button
                              onClick={() => handlePromptClick(eg)}
                              className="text-left text-xs text-gov-800 hover:text-gov-900 hover:underline"
                            >
                              &ldquo;{eg}&rdquo;
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </GuideSection>

            <GuideSection id="edit-preview" step={4} title="Edit directly in the preview">
              <p>You don&apos;t have to use the chat for every change. The preview is fully editable:</p>

              <h3 className="text-sm font-semibold text-slate-900">Title and description</h3>
              <p>Click the form title or description to edit it in place. Click anywhere else to finish.</p>
              <Screenshot name="header-edit" alt="Editing the form title in place" />

              <h3 className="text-sm font-semibold text-slate-900 pt-2">Question buttons</h3>
              <Screenshot name="question-card" alt="A question card with its action buttons" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { icon: ChevronUp, label: "Move up", desc: "Move the question one place up" },
                  { icon: ChevronDown, label: "Move down", desc: "Move the question one place down" },
                  { icon: Copy, label: "Duplicate", desc: "Make a copy right below it" },
                  { icon: Edit2, label: "Edit", desc: "Open the question editor" },
                  { icon: Trash2, label: "Delete", desc: "Remove the question" },
                ].map((a) => (
                  <div key={a.label} className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <a.icon className="h-4 w-4 text-slate-600 shrink-0" />
                    <span>
                      <span className="font-semibold text-slate-800">{a.label}</span> — {a.desc}
                    </span>
                  </div>
                ))}
              </div>
              <p>
                Use <span className="font-semibold text-slate-800">Add Question to Section</span> and{" "}
                <span className="font-semibold text-slate-800">Add New Section / Page Break</span> at the bottom of
                each section to grow the form by hand.
              </p>

              <h3 className="text-sm font-semibold text-slate-900 pt-2">The question editor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <p>
                  The pencil button opens the editor. Change the question text, add a hint for respondents, switch
                  the question type, edit the answer options, and mark the question as required. Click{" "}
                  <span className="font-semibold text-slate-800">Save Changes</span> to apply.
                </p>
                <Screenshot name="question-editor" alt="The Edit Question dialog" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 pt-2">Confirmation (thank-you) message</h3>
              <p>
                At the bottom of the preview, click the confirmation message to write what respondents see after
                they submit.
              </p>
              <Screenshot
                name="confirmation-message"
                alt="The editable submission confirmation message card"
                caption="Google's API can't set this message, so paste it in Google Forms under Settings → Presentation → Confirmation message after creating the form."
              />
            </GuideSection>

            <GuideSection id="undo" step={5} title="Undo a change">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <p>
                    Every change the AI makes can be undone. Click the{" "}
                    <Undo2 className="inline h-4 w-4 align-text-bottom" /> undo button under{" "}
                    <span className="font-semibold text-slate-800">your message</span> or under{" "}
                    <span className="font-semibold text-slate-800">the AI&apos;s reply</span>, then confirm. The
                    form goes back to how it was just before that step.
                  </p>
                  <p>
                    Your chat history stays, and the step is marked &ldquo;Change undone&rdquo;. The{" "}
                    <Copy className="inline h-4 w-4 align-text-bottom" /> button copies a message.
                  </p>
                </div>
                <Screenshot name="undo-modal" alt="The Undo this change confirmation dialog" />
              </div>
            </GuideSection>

            <GuideSection id="drafts" step={6} title="Drafts & the dashboard">
              <p>
                Your form is saved automatically as you work, and you can also click{" "}
                <span className="font-semibold text-slate-800">Save Draft</span> at any time. Everything you&apos;ve
                built appears on the <span className="font-semibold text-slate-800">Dashboard</span>:
              </p>
              <Screenshot
                name="dashboard"
                frame="browser"
                alt="The dashboard with draft and published forms"
                caption="Draft and Published forms side by side, with search."
              />
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold text-slate-800">Edit</span> (pencil) reopens the form in the builder
                  so you can keep working on it.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Open</span> takes you to the live Google Form
                  (published forms only).
                </li>
                <li>Clicking the row opens the form&apos;s details page.</li>
                <li>
                  <span className="font-semibold text-slate-800">Delete</span> removes the record from My AI Form Maker. It
                  does not delete the Google Form from your Drive.
                </li>
              </ul>
              <p>
                The details page shows the form&apos;s structure, the public link with a{" "}
                <span className="font-semibold text-slate-800">Copy link</span> button, and shortcuts to edit it here
                or in Google Forms.
              </p>
              <Screenshot name="form-details" frame="browser" alt="The form details page with shareable link" />
            </GuideSection>

            <GuideSection id="publish" step={7} title="Create the Google Form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <p>
                    When the preview looks right, click{" "}
                    <span className="font-semibold text-slate-800">Create Google Form →</span>. Check the summary,
                    then confirm. The form is created in your Google Drive and you get:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>the public link to share with respondents</li>
                    <li>a link to edit it in Google Forms (themes, response settings, etc.)</li>
                  </ul>
                </div>
                <Screenshot name="publish-confirm" alt="The Review & Confirm dialog before creating a form" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <Screenshot name="auth-required" alt="The Google Authentication Required dialog" />
                <p>
                  Using guest mode, or your Google session has expired? You&apos;ll see this message. Sign in with
                  Google to continue — your draft is kept.
                </p>
              </div>
            </GuideSection>

            <GuideSection id="update-published" step={8} title="Update a published form">
              <p>
                Need to change a form you&apos;ve already shared? Open it from the dashboard with{" "}
                <span className="font-semibold text-slate-800">Edit</span>. Published forms show a{" "}
                <span className="font-semibold text-slate-800">Published</span> badge, and the main button becomes{" "}
                <span className="font-semibold text-slate-800">Update Google Form →</span>.
              </p>
              <Screenshot name="published-builder" frame="browser" alt="A published form reopened in the builder" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <p>
                  Make your changes and click update. They&apos;re applied to the{" "}
                  <span className="font-semibold text-slate-800">same Google Form</span>, so the link you shared
                  keeps working and no duplicate form is created.
                </p>
                <Screenshot name="update-confirm" alt="The Update your Google Form confirmation dialog" />
              </div>
              <Note tone="warn">
                Updating replaces the form&apos;s questions with the version in the builder. Existing responses are
                kept, but if the form already has responses, answers to edited questions may appear as separate
                columns in your response sheet. Try to finish big changes before sharing the link.
              </Note>
            </GuideSection>

            <GuideSection id="mobile" step={9} title="Using it on your phone">
              <p>
                On a phone the builder has two tabs: <span className="font-semibold text-slate-800">AI Chat</span>{" "}
                and <span className="font-semibold text-slate-800">Preview</span>. After each AI change the preview
                opens automatically; tap AI Chat to keep talking. The toolbars scroll away so the form gets the whole
                screen.
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                <Screenshot name="mobile-chat" frame="phone" alt="AI chat on a phone" caption="AI Chat" />
                <Screenshot name="mobile-preview" frame="phone" alt="Form preview on a phone" caption="Preview" />
                <Screenshot name="mobile-dashboard" frame="phone" alt="Dashboard on a phone" caption="Dashboard" />
              </div>
            </GuideSection>

            <GuideSection id="supported-types" title="Supported question types">
              <p>Only standard Google Forms question types are used, so your forms work exactly as expected.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {[
                  { type: "Short Answer", desc: "Single line responses such as names, phone numbers, roll numbers." },
                  { type: "Paragraph", desc: "Multi-line text for feedback, comments, and long descriptions." },
                  { type: "Multiple Choice", desc: "Single-select options for categories and choices." },
                  { type: "Checkboxes", desc: "Multi-select checkboxes for picking several items." },
                  { type: "Dropdown", desc: "Menus for long lists (states, classes, departments)." },
                  { type: "Linear Scale", desc: "Rating scales like 1 to 5 or 1 to 10." },
                  { type: "Date", desc: "Date pickers, e.g. for dates of birth." },
                  { type: "Time", desc: "Time pickers for shifts and appointments." },
                ].map((item) => (
                  <div key={item.type} className="rounded-xl border border-slate-200 p-3.5 space-y-1 bg-slate-50">
                    <span className="font-bold text-slate-900 block">{item.type}</span>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="troubleshooting" title="Troubleshooting">
              <div className="space-y-4">
                {[
                  {
                    q: "“Google Authentication Required” when I click Create",
                    a: "You're in guest mode or your Google session expired. Click “Sign In with Google with Forms Permission”. Your draft is kept.",
                  },
                  {
                    q: "“Google Permissions Required”",
                    a: "Google didn't grant permission to create forms, or it has expired. Use the reconnect button in the message (or sign out and back in) and allow the Google Forms permission when asked.",
                  },
                  {
                    q: "“Enable Google Forms API”",
                    a: "The Google Forms API is switched off for the app's Google Cloud project. Use the button in the message to enable it, wait a few seconds, and try again.",
                  },
                  {
                    q: "My thank-you message isn't showing in Google Forms",
                    a: "That's expected — Google doesn't let apps set it. Paste it in Google Forms under Settings → Presentation → Confirmation message.",
                  },
                  {
                    q: "I can't find a draft I made as a guest",
                    a: "Guest drafts live only in the browser you used. Open the same browser, or sign in with Google so drafts are saved to your account.",
                  },
                  {
                    q: "The AI misunderstood my request",
                    a: "Undo that step, then rephrase simply, for example “Add email field” or “Make mobile number required”. You can also fix it by hand in the preview.",
                  },
                ].map((t) => (
                  <div key={t.q} className="space-y-1">
                    <h3 className="font-semibold text-slate-900">{t.q}</h3>
                    <p className="text-slate-600">{t.a}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="faq" title="Frequently asked questions">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900">Where is my form stored?</h3>
                  <p>
                    The Google Form lives in your own Google Drive, under your Google account. The app keeps a copy
                    of the form&apos;s structure (not the responses) so you can edit it again later.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900">Can I edit my form after creating it?</h3>
                  <p>
                    Yes, two ways: reopen it here and click &ldquo;Update Google Form&rdquo; (see step 8), or use the
                    &ldquo;Edit in Google Forms&rdquo; link for things like themes and response settings.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900">Do you see the responses people submit?</h3>
                  <p>No. Responses go straight to your Google account. My AI Form Maker never reads or stores them.</p>
                </div>
                <div id="permissions" className="space-y-1 scroll-mt-24">
                  <h3 className="font-semibold text-slate-900">How does Google authorization work?</h3>
                  <p>
                    We use official Google OAuth2 and ask only for the minimum permissions:{" "}
                    <code className="text-gov-800">forms.body</code> (create and update your forms) and{" "}
                    <code className="text-gov-800">drive.file</code> (only files My AI Form Maker creates). You can revoke
                    access any time from your{" "}
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gov-700 underline hover:text-gov-900"
                    >
                      Google Account permissions page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </GuideSection>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
