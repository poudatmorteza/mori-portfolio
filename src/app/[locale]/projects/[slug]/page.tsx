import { getMessages, locales, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { projects } from "@/lib/projects";
import { p } from "@/lib/path";
import ProjectArt from "@/components/ProjectArt";
type Props = { params: Promise<{ locale: Locale; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap((locale) => projects.map((pr) => ({ locale, slug: pr.slug }))); }
const item = (l: Locale, s: string) => getMessages(l).projects.items[s as keyof ReturnType<typeof getMessages>["projects"]["items"]];
export async function generateMetadata({ params }: Props) { const { locale, slug } = await params; return pageMeta(locale, `/projects/${slug}/`, item(locale, slug).t); }
export default async function Project({ params }: Props) {
  const { locale, slug } = await params; const m = getMessages(locale); const pr = projects.find((x) => x.slug === slug)!; const t = item(locale, slug);
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <a href={p(`/${locale}/#projects`)} className="text-sm font-semibold text-accent hover:underline">← {m.projects.back}</a>
      <h1 className="mt-6 text-3xl font-bold">{t.t}</h1>
      {pr.status === "live" ? <span className="mt-3 inline-block rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-900">{m.projects.live}</span> : <span className="mt-3 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">{m.projects.soon}</span>}
      {pr.image ? (
        <div className="mt-8 flex items-start gap-4">
          <img src={p(pr.image.desktop)} alt={`${m.projects.shotAlt} (Desktop): ${t.t}`} width={1200} height={750} className="min-w-0 flex-[3] rounded-xl border border-slate-200 shadow-sm" />
          <img src={p(pr.image.phone)} alt={`${m.projects.shotAlt} (Mobile): ${t.t}`} width={390} height={844} className="min-w-0 flex-1 rounded-xl border border-slate-200 shadow-sm" />
        </div>
      ) : <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200"><ProjectArt hue={pr.hue} slug={pr.slug} /></div>}
      <p className="mt-8 text-lg text-slate-700">{t.d}</p>
      {pr.live && <a href={pr.live} target="_blank" rel="noopener" className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-dark">{m.projects.visit} ↗</a>}
      <ul className="mt-6 flex flex-wrap gap-2">{pr.tags.map((g) => <li key={g} className="rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-700">{g}</li>)}</ul>
    </article>
  );
}
