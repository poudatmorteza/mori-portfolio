import { readdirSync, readFileSync, statSync } from "fs"; import { join } from "path";
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const re = /\b(trading|trader|trade|forex|crypto\w*|stocks?|broker\w*|invest\w*|bitcoin)\b/i;
const bad = []; for (const f of [...walk("src"), ...walk("messages"), ...walk("public")].filter((f) => /\.(tsx?|json|md|svg|txt)$/.test(f))) readFileSync(f, "utf8").split("\n").forEach((l, i) => { if (re.test(l)) bad.push(`${f}:${i + 1}: ${l.trim().slice(0, 100)}`); });
if (bad.length) { console.error("Forbidden words found:\n" + bad.join("\n")); process.exit(1); } console.log("No trading-related words found.");
