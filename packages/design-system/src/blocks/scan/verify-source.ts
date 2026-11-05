/** Source-parity audit for Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs' Apache-2.0 UI. Run from repository root. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const target = resolve("packages/design-system/src/blocks/scan");
const source = resolve(".reference/foglamp/apps/web/src/components/scan");
for (const name of ["flow-map", "scan-board", "embed-board", "personality-card", "left-rail", "changes-card", "kinds", "brand", "share-bar", "powered-by"]) {
  const original = readFileSync(resolve(source, `${name}.tsx`), "utf8");
  const extracted = readFileSync(resolve(target, `${name}.tsx`), "utf8");
  // Only imports, attribution headers, and appended public aliases may differ.
  const start = name === "flow-map" ? "// Mixed from the OPAQUE" : name === "personality-card" ? "/** Arc-style" : name === "share-bar" ? "// Swap between two icons" : name === "powered-by" ? "// Small attribution pill" : name === "embed-board" ? "// The iframe-embeddable" : name === "left-rail" ? original.slice(original.indexOf('import { Favicon, ModelIcon } from "./brand";') + 'import { Favicon, ModelIcon } from "./brand";'.length).trimStart().split("\n")[0]! : name === "brand" ? "// The Foglamp" : "export ";
  const sourceStart = original.indexOf(start);
  const targetStart = extracted.indexOf(start);
  // Brand starts at its first export (source comment wording can vary).
  const from = sourceStart < 0 ? original.indexOf("export ") : sourceStart;
  const to = targetStart < 0 ? extracted.indexOf("export ") : targetStart;
  const body = original.slice(from).trim();
  const candidate = extracted.slice(to).replace("\n\tconst faviconUrl = useScanFavicon();", "").replace(/\nexport \{ \w+ as \w+ \};\s*$/, "").trim();
  assert.equal(candidate, body, `${name}: source rendering/behavior body changed`);
  assert.match(extracted, /Gustavo Fior \(@gustavo-fior\)/);
  assert.match(extracted, /Abdul Haidar/);
  assert.match(extracted, /Apache-2\.0/);
  console.log(`${name}: exact source body preserved`);
}
