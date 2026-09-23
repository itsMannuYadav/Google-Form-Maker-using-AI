import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form details",
  description: "View and manage a published form.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
