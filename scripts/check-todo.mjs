import { readdirSync, readFileSync, statSync } from "fs"; import { join } from "path";
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const hits = []; for (const f of [...walk("src"), ...walk("messages")]) readFileSync(f, "utf8").split("\n").forEach((l, i) => { const m = l.match(/TODO_[A-Z_]+/g); if (m) hits.push(`${f}:${i + 1}  ${m.join(", ")}`); });
console.log(hits.length ? "Open placeholders:\n" + hits.join("\n") : "No placeholders left.");
const outside = hits.filter((h) => !h.startsWith("src/site.config.ts"));
if (outside.length) { console.error("Placeholders outside site.config.ts!"); process.exit(1); }
