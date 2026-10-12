import type { MetadataRoute } from "next";
import { siteUrl } from "@/site.config";
import { BASE } from "@/lib/path";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}${BASE}/sitemap.xml` }; }
