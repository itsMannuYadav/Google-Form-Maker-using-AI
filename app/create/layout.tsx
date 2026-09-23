import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a form",
  description: "Describe your form in plain language and publish it to Google Forms.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
