import "../globals.css";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white text-slate-900 font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:shadow">{m.nav.skip}</a>
        <Header locale={locale} m={m} />
        <main id="main" tabIndex={-1} className="flex-1">{children}</main>
        <Footer locale={locale} m={m} />
      </body>
    </html>
  );
}
