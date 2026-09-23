"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { FileText, HelpCircle, LayoutDashboard, Plus, LogOut, LogIn, Sparkles, User as UserIcon, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    await signOut();
    router.push("/");
  };

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
      active
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gov-800 text-white shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base font-semibold tracking-tight text-slate-900 block leading-none truncate">
                My AI Form Maker
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase hidden sm:block">
                Google Forms Assistant
              </span>
            </div>
          </Link>

          {/* Main Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200">
            <Link href="/dashboard" className={navLinkClass(pathname === "/dashboard")}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/create"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                pathname === "/create"
                  ? "bg-gov-50 text-gov-800 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Plus className="h-4 w-4" />
              Create Form
            </Link>
            <Link href="/help" className={navLinkClass(pathname === "/help")}>
              <HelpCircle className="h-4 w-4" />
              Help & Guide
            </Link>
          </nav>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gov-800 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-gov-900 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-gov-200" />
                <span>New Form</span>
              </Link>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}
                  <div className="hidden lg:block text-left text-xs">
                    <p className="font-medium text-slate-900 leading-tight">
                      {user.displayName || "Officer"}
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight truncate max-w-[120px]">
                      {user.email || (user.isDemo ? "Admin Demo" : "")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  aria-label="Sign out"
                  className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/help"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-50"
              >
                Help
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gov-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gov-900 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in with Google</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Actions: avatar (if signed in) + hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          {user &&
            (user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <UserIcon className="h-4 w-4" />
              </div>
            ))}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link href="/dashboard" className={`${navLinkClass(pathname === "/dashboard")} w-full py-2.5`}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/create"
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-md transition-colors w-full ${
              pathname === "/create"
                ? "bg-gov-50 text-gov-800 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Plus className="h-4 w-4" />
            Create Form
          </Link>
          <Link href="/help" className={`${navLinkClass(pathname === "/help")} w-full py-2.5`}>
            <HelpCircle className="h-4 w-4" />
            Help & Guide
          </Link>

          <div className="pt-3 mt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 px-3 py-1.5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}
                  <div className="text-left text-xs min-w-0">
                    <p className="font-medium text-slate-900 leading-tight truncate">
                      {user.displayName || "Officer"}
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight truncate">
                      {user.email || (user.isDemo ? "Admin Demo" : "")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gov-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gov-900 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in with Google</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
