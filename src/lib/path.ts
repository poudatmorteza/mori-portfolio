export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const p = (path: string) => `${BASE}${path}`;
// One current CV (English) for both locales; the DE label says so.
export const cvHref = (_locale: string) => p("/cv/Morteza_Poudat_CV_EN.pdf");
