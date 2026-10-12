import { getMessages, locales, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Address, EmailLine } from "@/components/Legal";
type Props = { params: Promise<{ locale: Locale }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props) { const { locale } = await params; return pageMeta(locale, "/impressum/", getMessages(locale).meta.impressum); }
export default async function Impressum({ params }: Props) {
  const { locale } = await params; const de = locale === "de";
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 space-y-6 text-slate-800">
      <h1 className="text-3xl font-bold">{getMessages(locale).legal.impressumH}</h1>
      <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">{de ? "Diese Seite wird gerade vervollständigt." : "This page is currently being completed."}</p>
      <section><h2 className="text-lg font-semibold">{de ? "Angaben gemäß § 5 DDG" : "Information according to § 5 DDG (German Digital Services Act)"}</h2><Address locale={locale} /></section>
      <section><h2 className="text-lg font-semibold">{de ? "Kontakt" : "Contact"}</h2><p>{de ? "E-Mail" : "Email"}: <EmailLine locale={locale} /></p></section>
      <section><h2 className="text-lg font-semibold">{de ? "Verantwortlich für den Inhalt" : "Responsible for content"}</h2><p>Morteza Poudat ({de ? "Anschrift wie oben" : "address as above"})</p></section>
    </article>
  );
}
