import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Google Form Builder - Create Google Forms with AI",
  description:
    "A calm, production-ready tool for government officers, administrative staff, and educators to generate and publish Google Forms using natural language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900 font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
