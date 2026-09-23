import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const PUBLIC_ROUTES = ["", "/login", "/help", "/whats-new", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
