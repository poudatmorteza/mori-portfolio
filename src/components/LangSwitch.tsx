"use client";
import { usePathname } from "next/navigation";
import { p } from "@/lib/path";
import type { Locale } from "@/lib/i18n";
export default function LangSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const path = usePathname() || `/${locale}/`;
  const other = locale === "de" ? "en" : "de";
  const href = p(path.replace(/^\/(en|de)(?=\/|$)/, `/${other}`));
  return (
    <a href={href} hrefLang={other} lang={other} aria-label={label}
      onClick={(e) => { e.preventDefault(); window.location.href = href + window.location.hash; }}
      className="rounded-md border border-slate-300 px-2.5 py-1 text-sm font-medium hover:border-accent hover:text-accent">{short}</a>
  );
}
