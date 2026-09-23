import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in with your Google account to create and publish Google Forms with AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
