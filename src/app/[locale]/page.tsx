import { getMessages, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { projects } from "@/lib/projects";
import { siteConfig, siteUrl, isTodo } from "@/site.config";
import { p, cvHref } from "@/lib/path";
import ContactForm from "@/components/ContactForm";
import ProjectArt from "@/components/ProjectArt";
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; return pageMeta(locale, "/"); }
const skills = ["Python", "PyMuPDF", "OpenCV", "OCR", "Web scraping", "Data parsing & cleaning", "SQL & data modelling", "FastAPI", "Plugin development", "JavaScript/TypeScript", "Next.js", "Tailwind", "Docker", "Clockify API", "Requirements & project management", "Technical presentations"];
const icons = ["M3 5h18v12H3zM8 21h8M12 17v4", "M4 4h10l6 6v10H4zM14 4v6h6M8 14h8M8 17h5", "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"];
export default async function Home({ params }: Props) {
  const { locale } = await params;
  const m = getMessages(locale);
  const sameAs = Object.values(siteConfig.links).filter((u) => !isTodo(u));
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, jobTitle: siteConfig.jobTitle[locale], url: `${siteUrl}/${locale}/`, sameAs, knowsLanguage: ["de", "en"], address: { "@type": "PostalAddress", addressCountry: "DE" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{m.hero.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-700 md:text-xl">{m.hero.sub}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow hover:bg-accent-dark">{m.hero.cta}</a>
            <a href="#projects" className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-accent hover:text-accent">{m.hero.work}</a>
          </div>
        </div>
      </section>
      <section id="services" aria-labelledby="services-h" className="mx-auto max-w-5xl px-5 py-20">
        <h2 id="services-h" className="text-3xl font-bold tracking-tight">{m.services.title}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {m.services.items.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 rounded-lg bg-teal-50 p-1.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={icons[i]} /></svg>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3><p className="mt-2 text-slate-700">{s.d}</p>
            </li>))}
        </ul>
      </section>
      <section id="projects" aria-labelledby="projects-h" className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h2 id="projects-h" className="text-3xl font-bold tracking-tight">{m.projects.title}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((pr) => { const t = m.projects.items[pr.slug as keyof typeof m.projects.items]; return (
              <li key={pr.slug} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {pr.phones ? <img src={p(pr.phones[0])} alt={`${m.projects.shotAlt}: ${t.t}`} width={390} height={844} loading="lazy" className="h-40 w-full object-cover object-top" /> : pr.image ? <img src={p(pr.image.desktop)} alt={`${m.projects.shotAlt}: ${t.t}`} width={1200} height={750} loading="lazy" className="h-40 w-full object-cover object-top" /> : <ProjectArt hue={pr.hue} slug={pr.slug} />}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold">{t.t}</h3>
                    {pr.status === "live" ? <span className="shrink-0 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-900">{m.projects.live}</span> : pr.status === "prototype" ? <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-900">{m.projects.prototype}</span> : <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">{m.projects.soon}</span>}</div>
                  <p className="mt-2 flex-1 text-slate-700">{t.d}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech">{pr.tags.map((g) => <li key={g} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{g}</li>)}</ul>
                  <div className="mt-4 flex gap-5 text-sm font-semibold">{pr.live && <a className="text-accent hover:underline" href={pr.live} target="_blank" rel="noopener">{m.projects.visit}<span className="sr-only">: {t.t}</span> ↗</a>}<a className="text-accent hover:underline" href={p(`/${locale}/projects/${pr.slug}/`)}>{m.projects.details}<span className="sr-only">: {t.t}</span> →</a></div>
                </div>
              </li>); })}
          </ul>
        </div>
      </section>
      <section id="about" aria-labelledby="about-h" className="mx-auto max-w-5xl px-5 py-20">
        <h2 id="about-h" className="text-3xl font-bold tracking-tight">{m.about.title}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">{m.about.text}</p>
        <h3 className="mt-10 text-lg font-semibold">{m.about.skills}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">{skills.map((s) => <li key={s} className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm text-teal-900">{s}</li>)}</ul>
      </section>
      <section id="contact" aria-labelledby="contact-h" className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 md:grid-cols-2">
          <div><h2 id="contact-h" className="text-3xl font-bold tracking-tight">{m.contact.title}</h2>
            <p className="mt-4 text-slate-300">{m.contact.text}</p>
            <h3 className="mt-8 font-semibold">{m.contact.linksTitle}</h3>
            <ul className="mt-3 space-y-2 text-slate-200">
              {!isTodo(siteConfig.email) && <li><a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>}
              {Object.entries(siteConfig.links).filter(([, u]) => !isTodo(u)).map(([k, u]) => <li key={k}><a className="underline capitalize" href={u} rel="me noopener">{k}</a></li>)}
            </ul>
            <a href={cvHref(locale)} download className="mt-8 inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-white shadow hover:bg-accent-dark">{m.nav.cv}</a></div>
          <ContactForm locale={locale} m={m.contact} />
        </div>
      </section>
    </>
  );
}
