"use client";
import { useState } from "react";
import { siteConfig, isTodo } from "@/site.config";
import { p } from "@/lib/path";
import type { Messages } from "@/lib/i18n";
type M = Messages["contact"];
export default function ContactForm({ locale, m }: { locale: string; m: M }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const noEndpoint = isTodo(siteConfig.formEndpoint);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(f.get("name")).trim()) er.name = m.required;
    const em = String(f.get("email")).trim();
    if (!em) er.email = m.required; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) er.email = m.invalidEmail;
    if (!String(f.get("message")).trim()) er.message = m.required;
    if (!f.get("consent")) er.consent = m.consentReq;
    setErrors(er);
    if (Object.keys(er).length) { (e.currentTarget.querySelector(`[name=${Object.keys(er)[0]}]`) as HTMLElement)?.focus(); return; }
    if (f.get("website")) { setState("ok"); return; } // honeypot
    if (noEndpoint) { setState("err"); return; }
    setState("sending");
    try { const r = await fetch(siteConfig.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: f }); setState(r.ok ? "ok" : "err"); } catch { setState("err"); }
  }
  if (state === "ok") return <p role="status" className="rounded-xl bg-teal-600/20 p-6 text-lg">{m.success}</p>;
  const field = "mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white placeholder-slate-400";
  const err = (n: string) => errors[n] ? <p id={`${n}-err`} className="mt-1 text-sm text-red-300">{errors[n]}</p> : null;
  return (
    <form noValidate onSubmit={submit} className="space-y-4" aria-describedby={state === "err" ? "form-err" : undefined}>
      <div><label htmlFor="name" className="text-sm font-medium">{m.name}</label><input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />{err("name")}</div>
      <div><label htmlFor="email" className="text-sm font-medium">{m.email}</label><input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />{err("email")}</div>
      <div><label htmlFor="message" className="text-sm font-medium">{m.message}</label><textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />{err("message")}</div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex gap-3 text-sm text-slate-300"><input id="consent" name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-teal-500" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
        <label htmlFor="consent">{m.consent} <a className="underline" href={p(`/${locale}/datenschutz/`)}>{m.consentLink}</a>.</label></div>{err("consent")}
      <button type="submit" disabled={state === "sending"} className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-slate-950 hover:bg-teal-400">{state === "sending" ? m.sending : m.send}</button>
      {state === "err" && <p id="form-err" role="alert" className="text-red-300">{m.error}{!isTodo(siteConfig.email) && <> <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></>}</p>}
    </form>
  );
}
