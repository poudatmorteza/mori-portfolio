export type Project = { slug: string; tags: string[]; live?: string; status: "soon" | "live" | "prototype"; hue: number; image?: { desktop: string; phone: string }; phones?: string[] };
export const projects: Project[] = [
  { slug: "nilughorbani", tags: ["HTML", "CSS", "JavaScript", "DE/EN", "SEO"], status: "live", live: "https://nilughorbani.com/", hue: 20,
    image: { desktop: "/images/projects/nilughorbani-desktop.webp", phone: "/images/projects/nilughorbani-phone.webp" } },
  { slug: "profis-barbershop", tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "next-intl (DE/EN)", "Playwright"], status: "prototype", hue: 200,
    phones: ["/images/projects/profis-carousel.webp", "/images/projects/profis-slot.webp", "/images/projects/profis-confirmed.webp"] },
  { slug: "portfolio", tags: ["Next.js", "Tailwind", "i18n"], live: "https://poudatmorteza.github.io/mori-portfolio/", status: "live", hue: 220 },
  { slug: "business-demo", tags: ["Next.js", "SEO", "Responsive"], status: "soon", hue: 160 },
  { slug: "materials-data", tags: ["Python", "FastAPI", "PostgreSQL/SQLite", "Parsing"], status: "soon", hue: 30 },
  { slug: "pdf-extractor", tags: ["Python", "PyMuPDF", "OpenCV", "OCR", "SQLite/PostgreSQL"], status: "soon", hue: 280 },
];
