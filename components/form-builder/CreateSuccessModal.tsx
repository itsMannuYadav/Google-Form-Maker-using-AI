"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, FileText, CheckCircle2, ArrowRight, LayoutDashboard, Share2 } from "lucide-react";

interface CreateSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  formTitle: string;
  responderUri: string;
  editUri?: string;
  googleFormId: string;
}

export default function CreateSuccessModal({
  isOpen,
  onClose,
  formTitle,
  responderUri,
  editUri,
}: CreateSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(responderUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Celebration Graphic */}
        <div className="bg-emerald-600 px-6 py-8 text-center text-white relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-600 shadow-md mb-3">
            <Check className="h-8 w-8 stroke-[3]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Your Google Form is Ready!</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-sm mx-auto">
            Your form has been created and verified in Google Forms.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Form Name
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{formTitle}</h3>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700">
              <span className="truncate max-w-[280px] font-mono text-[11px]">{responderUri}</span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 font-semibold text-gov-800 hover:text-gov-900 pl-2 shrink-0"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <a
              href={responderUri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gov-800 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gov-900 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open Google Form</span>
            </a>

            {editUri && (
              <a
                href={editUri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50/60 py-2.5 text-xs font-semibold text-purple-900 hover:bg-purple-100 transition-colors"
              >
                <FileText className="h-4 w-4 text-purple-700" />
                <span>Edit in Google Forms</span>
              </a>
            )}

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-slate-500" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
