import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your saved and published forms.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
