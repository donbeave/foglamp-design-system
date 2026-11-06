/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const target = resolve("packages/design-system/src/blocks/scan");
const source = resolve(".reference/foglamp/apps/web/src/components/scan");
for (const name of ["flow-map", "scan-board", "embed-board", "personality-card", "left-rail", "changes-card", "kinds", "share-bar", "powered-by"]) {
  const original = readFileSync(resolve(source, `${name}.tsx`), "utf8");
  const extracted = readFileSync(resolve(target, `${name}.tsx`), "utf8");
  // Only imports, attribution headers, and appended public aliases may differ.
  const start = name === "flow-map" ? "// Mixed from the OPAQUE" : name === "personality-card" ? "/** Arc-style" : name === "share-bar" ? "// Swap between two icons" : name === "powered-by" ? "// Small attribution pill" : name === "embed-board" ? "// The iframe-embeddable" : name === "left-rail" ? original.slice(original.indexOf('import { Favicon, ModelIcon } from "./brand";') + 'import { Favicon, ModelIcon } from "./brand";'.length).trimStart().split("\n")[0]! : "export ";
  const sourceStart = original.indexOf(start);
  const targetStart = extracted.indexOf(start);
  const from = sourceStart < 0 ? original.indexOf("export ") : sourceStart;
  const to = targetStart < 0 ? extracted.indexOf("export ") : targetStart;
  const body = original.slice(from).trim();
  const candidate = extracted
    .slice(to)
    .replace("\n\tconst faviconUrl = useScanFavicon();", "")
    .replace(
      "      if (!cancelled) {\n        fitted.current = false;\n        setLayout(l);\n      }",
      "      if (!cancelled) setLayout(l);"
    )
    .replace(
      "  const fitted = useRef(false);\n  useEffect(() => {\n    fitted.current = false;\n  }, [direction]);",
      "  const fitted = useRef(false);"
    )
    .replace("/* framerock brand mark */", "/* foglamp brand mark */")
    .replace('href="https://github.com/tailrocks/framerock"', 'href="https://foglamp.dev"')
    .replace("\t\t\t\t\tFramerock", "\t\t\t\t\tFoglamp")
    .replace(/\nexport \{ \w+ as \w+ \};\s*$/, "")
    .trim();
  assert.equal(candidate, body, `${name}: source rendering/behavior body changed`);
  assert.match(extracted, /Gustavo Fior \(@gustavo-fior\)/);
  assert.match(extracted, /Abdul Haidar/);
  assert.match(extracted, /Apache-2\.0/);
  console.log(`${name}: exact source body preserved`);
}
