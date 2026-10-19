// All values Mori must fill in before launch are marked TODO_.
export const siteConfig = {
  name: "Morteza Poudat",
  jobTitle: { en: "Application Consultant | Python & Web Development | Data Integration", de: "Application Consultant | Python- & Webentwicklung | Datenintegration" },
  email: "poudat.mtz@gmail.com",
  domain: "https://poudatmorteza.github.io/mori-portfolio", // full site URL incl. base path, no trailing slash
  formEndpoint: "TODO_FORM_ENDPOINT", // Formspree/Web3Forms URL
  photo: "TODO_PHOTO", // optional, path in /public
  links: {
    linkedin: "TODO_LINKEDIN_URL",
    malt: "TODO_MALT_URL",
    upwork: "TODO_UPWORK_URL",
  },
  impressum: { name: "Morteza Poudat", street: "Spichernstraße 24", city: "40476 Düsseldorf", country: { de: "Deutschland", en: "Germany" } },
} as const;
export const isTodo = (v: string) => v.startsWith("TODO_");
export const siteUrl = isTodo(siteConfig.domain) ? "https://example.com" : siteConfig.domain;
