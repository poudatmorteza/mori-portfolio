export type Project = { slug: string; tags: string[]; live?: string; status: "soon" | "live"; hue: number; image?: { desktop: string; phone: string } };
export const projects: Project[] = [
  { slug: "nilughorbani", tags: ["HTML", "CSS", "JavaScript", "DE/EN", "SEO"], status: "live", live: "https://nilughorbani.com/", hue: 20,
    image: { desktop: "/images/projects/nilughorbani-desktop.webp", phone: "/images/projects/nilughorbani-phone.webp" } },
  { slug: "portfolio", tags: ["Next.js", "Tailwind", "i18n"], status: "soon", hue: 220 },
  { slug: "business-demo", tags: ["Next.js", "SEO", "Responsive"], status: "soon", hue: 160 },
  { slug: "materials-data", tags: ["Python", "FastAPI", "PostgreSQL/SQLite", "Parsing"], status: "soon", hue: 30 },
  { slug: "pdf-extractor", tags: ["Python", "PyMuPDF", "OpenCV", "OCR", "SQLite/PostgreSQL"], status: "soon", hue: 280 },
];
