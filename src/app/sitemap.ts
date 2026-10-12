import type { MetadataRoute } from "next";
import { siteUrl } from "@/site.config";
import { projects } from "@/lib/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/impressum/", "/datenschutz/", ...projects.map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((path) => (["en", "de"] as const).map((l) => ({ url: `${siteUrl}/${l}${path}`, alternates: { languages: { en: `${siteUrl}/en${path}`, de: `${siteUrl}/de${path}` } } })));
}
