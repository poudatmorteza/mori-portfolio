import type { MetadataRoute } from "next";
import { siteUrl } from "@/site.config";
import { projects } from "@/lib/projects";
import { BASE } from "@/lib/path";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/impressum/", "/datenschutz/", ...projects.map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((path) => (["en", "de"] as const).map((l) => ({ url: `${siteUrl}${BASE}/${l}${path}`, alternates: { languages: { en: `${siteUrl}${BASE}/en${path}`, de: `${siteUrl}${BASE}/de${path}` } } })));
}
