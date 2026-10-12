"use client";
import { useState } from "react";
export default function MobileMenu({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}
        className="rounded-md border border-slate-300 px-2.5 py-1 text-sm font-medium">{label}</button>
      <nav id="mobile-nav" aria-label={label} hidden={!open} className="absolute left-0 right-0 top-16 border-b border-slate-200 bg-white px-5 py-3 shadow">
        <ul className="flex flex-col">{items.map((i) => <li key={i.href}><a onClick={() => setOpen(false)} className="block py-2" href={i.href}>{i.label}</a></li>)}</ul>
      </nav>
    </div>
  );
}
