import { siteConfig, isTodo } from "@/site.config";
import type { Locale } from "@/lib/i18n";
export function Address({ locale }: { locale: Locale }) {
  const i = siteConfig.impressum;
  return <address className="not-italic">{i.name}<br />{i.street}<br />{i.city}<br />{i.country[locale]}</address>;
}
export function EmailLine({ locale }: { locale: Locale }) {
  return isTodo(siteConfig.email)
    ? <span className="rounded bg-amber-100 px-1.5 text-amber-900">{locale === "de" ? "E-Mail-Adresse wird gerade ergänzt." : "Email address is being added."}</span>
    : <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;
}
