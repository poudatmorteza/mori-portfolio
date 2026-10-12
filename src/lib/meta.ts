import type { Metadata } from "next";
import { siteUrl } from "@/site.config";
import { getMessages, type Locale } from "./i18n";
export function pageMeta(locale: Locale, path: string, title?: string): Metadata {
  const m = getMessages(locale);
  const t = title ? `${title} – Morteza Poudat` : m.meta.title;
  return {
    metadataBase: new URL(siteUrl), title: t, description: m.meta.description,
    alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, de: `/de${path}`, "x-default": `/en${path}` } },
    openGraph: { title: t, description: m.meta.description, url: `/${locale}${path}`, type: "website", locale: locale === "de" ? "de_DE" : "en_US", images: [{ url: "/og.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t, description: m.meta.description, images: ["/og.png"] },
  };
}
