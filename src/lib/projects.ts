export type Project = { slug: string; tags: string[]; live?: string; github?: string; status: "soon" | "live"; hue: number };
export const projects: Project[] = [
  { slug: "portfolio", tags: ["Next.js", "Tailwind", "i18n"], status: "soon", hue: 220 },
  { slug: "business-demo", tags: ["Next.js", "SEO", "Responsive"], status: "soon", hue: 160 },
  { slug: "materials-data", tags: ["Python", "FastAPI", "PostgreSQL/SQLite", "Parsing"], status: "soon", hue: 30 },
  { slug: "pdf-extractor", tags: ["Python", "PyMuPDF", "OpenCV", "OCR", "SQLite/PostgreSQL"], status: "soon", hue: 280 },
];
