import React from "react";
import Link from "next/link";
import { FileText, Shield, Sparkles, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gov-800 text-white">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-base font-semibold text-slate-900">
                AI Google Form Builder
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              A calm, professional tool built for administrative officers, educators, and organizations to design and publish structured Google Forms through natural conversation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>Secure Google OAuth integration • Zero response data stored</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/create" className="hover:text-gov-800 transition-colors">
                  Create Form
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gov-800 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-gov-800 transition-colors">
                  Prompt Examples
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gov-800 transition-colors">
                  Sign in with Google
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Guidance & Security
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/help#faq" className="hover:text-gov-800 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/help#permissions" className="hover:text-gov-800 transition-colors">
                  Google Drive Permissions
                </Link>
              </li>
              <li>
                <Link href="/help#supported-types" className="hover:text-gov-800 transition-colors">
                  Supported Question Types
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Form Builder. Built for official and professional workflows.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Groq AI & Google Forms API</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
