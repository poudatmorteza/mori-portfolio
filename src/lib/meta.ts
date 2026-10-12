import type { Metadata } from "next";
import { siteUrl } from "@/site.config";
import { getMessages, type Locale } from "./i18n";
export function pageMeta(locale: Locale, path: string, title?: string): Metadata {
  const m = getMessages(locale);
  const t = title ? `${title} – Morteza Poudat` : m.meta.title;
  return {
    metadataBase: new URL(siteUrl + "/"), title: t, description: m.meta.description,
    alternates: { canonical: `${siteUrl}/${locale}${path}`, languages: { en: `${siteUrl}/en${path}`, de: `${siteUrl}/de${path}`, "x-default": `${siteUrl}/en${path}` } },
    openGraph: { title: t, description: m.meta.description, url: `${siteUrl}/${locale}${path}`, type: "website", locale: locale === "de" ? "de_DE" : "en_US", images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t, description: m.meta.description, images: [`${siteUrl}/og.png`] },
  };
}
