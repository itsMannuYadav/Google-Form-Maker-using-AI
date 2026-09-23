"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { FileText, Shield, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { user, signInWithGoogle, signInAsDemo } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    signInAsDemo();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gov-800 text-white shadow-xs">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign in to AI Form Maker
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Connect your Google account to create and manage Google Forms automatically.
          </p>
        </div>

        {/* Permissions clarity box */}
        <div className="rounded-xl bg-gov-50/70 border border-gov-200/80 p-4 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-gov-900">
            <Shield className="h-4 w-4 text-gov-700" />
            <span>Why Google Access is Needed</span>
          </div>
          <p className="text-[12px] leading-relaxed text-slate-600">
            We need permission to create and update Google Forms in your Google Drive. We can only manage forms this app creates, and never access your email or other files.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 px-4 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Quick Sandbox / Demo fallback */}
          <div className="relative py-2 text-center text-xs text-slate-400">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-2">or explore instantly</span>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 px-4 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <span>Continue as Administrative Guest</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
          </button>
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            Guest drafts stay in this browser. Sign in with Google to create the real Google Form.
          </p>
        </div>

        {/* Security badges */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span>Protected with TLS/HTTPS</span>
          <span>•</span>
          <span>Google Forms API v1</span>
        </div>

        {/* Legal consent notice */}
        <p className="text-center text-[11px] text-slate-400 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-gov-700 underline hover:text-gov-900">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-gov-700 underline hover:text-gov-900">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
