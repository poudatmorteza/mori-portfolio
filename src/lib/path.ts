export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const p = (path: string) => `${BASE}${path}`;
