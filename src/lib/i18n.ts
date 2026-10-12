import en from "../../messages/en.json";
import de from "../../messages/de.json";
export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof en;
const dicts: Record<Locale, Messages> = { en, de };
export const getMessages = (l: Locale) => dicts[l];
export const isLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);
