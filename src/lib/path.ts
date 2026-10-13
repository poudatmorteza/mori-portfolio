export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const p = (path: string) => `${BASE}${path}`;
export const cvHref = (locale: string) => p(locale === "de" ? "/cv/Morteza_Poudat_Lebenslauf_DE.pdf" : "/cv/Morteza_Poudat_CV_EN.pdf");
