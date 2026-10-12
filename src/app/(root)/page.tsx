import type { Metadata } from "next";
export const metadata: Metadata = { title: "Morteza Poudat", robots: { index: false } };
export default function Root() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <meta httpEquiv="refresh" content="2;url=./de/" />
      <script dangerouslySetInnerHTML={{ __html: "location.replace((navigator.language||'').toLowerCase().startsWith('de')?'./de/':'./en/')" }} />
      <div><h1 className="text-xl font-semibold mb-4">Morteza Poudat</h1>
        <p><a className="underline" href="./de/" lang="de">Deutsch</a> · <a className="underline" href="./en/" lang="en">English</a></p></div>
    </main>
  );
}
