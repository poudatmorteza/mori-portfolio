import type { Locale, Messages } from "@/lib/i18n";
import { p } from "@/lib/path";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";
export default function Header({ locale, m }: { locale: Locale; m: Messages }) {
  const items = (["services", "projects", "about", "contact"] as const).map((k) => ({ href: p(`/${locale}/#${k}`), label: m.nav[k] }));
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <a href={p(`/${locale}/`)} className="font-semibold tracking-tight">Morteza Poudat</a>
        <nav aria-label="Main" className="hidden md:block"><ul className="flex gap-6 text-sm text-slate-700">
          {items.map((i) => <li key={i.href}><a className="hover:text-accent" href={i.href}>{i.label}</a></li>)}</ul></nav>
        <div className="flex items-center gap-2"><LangSwitch locale={locale} label={m.nav.lang} short={m.nav.langShort} /><MobileMenu label={m.nav.menu} items={items} /></div>
      </div>
    </header>
  );
}
