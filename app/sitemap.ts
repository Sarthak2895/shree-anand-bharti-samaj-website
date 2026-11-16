import type { MetadataRoute } from "next";
import { departments } from "@/data/departments";
import { SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/about", "/departments", "/library", "/gallery", "/events"];
  const departmentRoutes = departments.map((d) => `/departments/${d.slug}`);
  const en = [...base, ...departmentRoutes];
  const mr = en.map((route) => `/mr${route}`);
  return [...en, ...mr].map((route) => ({ url: `${SITE_URL}${route}`, lastModified: new Date(), changeFrequency: route.includes("gallery") || route.includes("library") || route.includes("events") ? "weekly" : "monthly", priority: route === "" ? 1 : 0.7 }));
}
