import type { Locale, Messages } from "@/lib/i18n";
import { p } from "@/lib/path";
import { siteConfig, isTodo } from "@/site.config";
export default function Footer({ locale, m }: { locale: Locale; m: Messages }) {
  const links = Object.entries({ GitHub: siteConfig.links.github, LinkedIn: siteConfig.links.linkedin, Malt: siteConfig.links.malt, Upwork: siteConfig.links.upwork }).filter(([, u]) => !isTodo(u));
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Morteza Poudat. {m.footer.rights}</p>
        <ul className="flex flex-wrap gap-4">
          {links.map(([n, u]) => <li key={n}><a className="hover:text-accent underline-offset-4 hover:underline" href={u} rel="me noopener">{n}</a></li>)}
          <li><a className="hover:underline" href={p(`/${locale}/impressum/`)}>{m.meta.impressum}</a></li>
          <li><a className="hover:underline" href={p(`/${locale}/datenschutz/`)}>{m.meta.datenschutz}</a></li>
        </ul>
      </div>
    </footer>
  );
}
