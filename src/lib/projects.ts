export type Project = { slug: string; tags: string[]; live?: string; status: "soon" | "live" | "prototype"; hue: number; image?: { desktop: string; phone: string }; phones?: string[] };
/** Old public slugs → current slug (static-export friendly redirects). */
export const projectSlugAliases: Record<string, string> = {
  "profis-barbershop": "ario-barber",
};
export const resolveProjectSlug = (slug: string) => projectSlugAliases[slug] ?? slug;
export const projects: Project[] = [
  { slug: "nilughorbani", tags: ["HTML", "CSS", "JavaScript", "DE/EN", "SEO"], status: "live", live: "https://nilughorbani.com/", hue: 20,
    image: { desktop: "/images/projects/nilughorbani-desktop.webp", phone: "/images/projects/nilughorbani-phone.webp" } },
  { slug: "ario-barber", tags: ["Next.js", "TypeScript", "PostgreSQL"], status: "live", live: "https://ariobarber.de", hue: 200,
    phones: ["/images/projects/profis-carousel.webp", "/images/projects/profis-slot.webp", "/images/projects/profis-confirmed.webp"] },
  { slug: "portfolio", tags: ["Next.js", "Tailwind", "i18n"], live: "https://poudatmorteza.github.io/mori-portfolio/", status: "live", hue: 220 },
  { slug: "materials-data", tags: ["Python", "FastAPI", "PostgreSQL/SQLite", "Parsing"], status: "soon", hue: 30 },
  { slug: "pdf-extractor", tags: ["Python", "PyMuPDF", "OpenCV", "OCR", "SQLite/PostgreSQL"], status: "soon", hue: 280 },
];
