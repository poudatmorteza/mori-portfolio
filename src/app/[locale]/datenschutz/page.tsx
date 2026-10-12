import { getMessages, locales, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Address, EmailLine } from "@/components/Legal";
type Props = { params: Promise<{ locale: Locale }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props) { const { locale } = await params; return pageMeta(locale, "/datenschutz/", getMessages(locale).meta.datenschutz); }
export default async function Datenschutz({ params }: Props) {
  const { locale } = await params; const m = getMessages(locale).legal; const de = locale === "de";
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 space-y-6 text-slate-800">
      <h1 className="text-3xl font-bold">{m.datenschutzH}</h1>
      <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">{de ? "Diese Datenschutzerklärung wird gerade vervollständigt." : "This privacy policy is currently being completed."}</p>
      <section><h2 className="text-lg font-semibold">{de ? "Verantwortlicher" : "Controller"}</h2><Address locale={locale} /><p className="mt-2">{de ? "E-Mail" : "Email"}: <EmailLine locale={locale} /></p></section>
      <section><h2 className="text-lg font-semibold">{de ? "Hosting" : "Hosting"}</h2><p>{m.dsHost}</p></section>
      <section><h2 className="text-lg font-semibold">{de ? "Kontaktformular" : "Contact form"}</h2><p>{m.dsForm}</p></section>
      <section><h2 className="text-lg font-semibold">Cookies & Tracking</h2><p>{m.dsIntro}</p></section>
      <section><h2 className="text-lg font-semibold">{de ? "Ihre Rechte" : "Your rights"}</h2><p>{de ? "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde (z. B. LDI NRW)." : "You have the right to access, rectification, erasure, restriction of processing, data portability and objection, and the right to lodge a complaint with a data protection authority (e.g. LDI NRW)."}</p></section>
    </article>
  );
}
