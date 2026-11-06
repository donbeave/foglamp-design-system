#!/usr/bin/env bun
/** Apply reviewed, hash-bound provenance headers without altering source bodies. */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dir, '../..');
const COMMIT = '7d7e6609108019a74902858d4b07c24825c6318b';

interface ManifestEntry {
  path: string;
  proposed_class: 'copied-1-to-1' | 'modified' | 'tailrocks-original';
  upstream_path: string | null;
  secondary_upstream_paths: string[];
  body_sha256: string;
}

interface Manifest {
  entries: ManifestEntry[];
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    console.error(`AssertionError: ${message}`);
    process.exit(1);
  }
}

function sha(buf: Buffer): string {
  return createHash('sha256').update(buf).digest('hex');
}

const HEADER_RE =
  /^\/\*\*?(?:(?!\*\/)[\s\S])*(?:@provenance|Original design|Original UI|Original project|SPDX-License-Identifier|Foglamp Labs)(?:(?!\*\/)[\s\S])*\*\/(?:\r?\n){1,2}/i;
const USE_CLIENT_RE = /^(['"]use client['"];?(?:\r?\n){1,2})/;

function body(input: Buffer): Buffer {
  let s = input.toString('latin1');
  for (let i = 0; i < 2; i++) {
    const prev = s;
    s = s.replace(HEADER_RE, '');
    s = s.replace(USE_CLIENT_RE, '');
    if (s === prev) break;
  }
  return Buffer.from(s, 'latin1');
}

function header(e: ManifestEntry): Buffer {
  const c = e.proposed_class;
  const p = e.upstream_path;
  const secondary = e.secondary_upstream_paths ?? [];
  const lines: string[] = [
    '/**',
    ' * @license Apache-2.0',
    ' * SPDX-License-Identifier: Apache-2.0',
  ];
  if (c !== 'tailrocks-original') {
    lines.push(
      ' * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)',
    );
  }
  if (c !== 'copied-1-to-1') {
    lines.push(
      ' * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)',
    );
  }
  lines.push(' *', ` * @provenance ${c}`);
  if (p) {
    lines.push(
      ' * @upstream-repo https://github.com/foglamp-labs/foglamp',
      ` * @upstream-commit ${COMMIT}`,
      ` * @upstream-path ${p}`,
      ` * @upstream-url https://github.com/foglamp-labs/foglamp/blob/${COMMIT}/${p}`,
    );
    for (const s of secondary) {
      lines.push(
        ` * @secondary-upstream-url https://github.com/foglamp-labs/foglamp/blob/${COMMIT}/${s}`,
      );
    }
  }
  if (c === 'modified') {
    lines.push(
      ' * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.',
      ' *',
      ' * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the',
      ' * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by',
      ' * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).',
    );
  } else if (c === 'copied-1-to-1') {
    lines.push(
      ' *',
      ' * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),',
      ' * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder',
      ' * Abdul Haidar at Foglamp Labs (https://foglamp.dev).',
    );
  } else {
    lines.push(
      ' * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)',
      ' *',
      ' * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual',
      ' * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and',
      ' * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.',
    );
  }
  return Buffer.from([...lines, ' */', '', ''].join('\n'), 'utf8');
}

function walkSourceFiles(dir: string, acc: Set<string> = new Set()): Set<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(full, acc);
    } else if (entry.isFile() && /\.(ts|tsx|css)$/.test(entry.name)) {
      acc.add(path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return acc;
}

const manifest: Manifest = JSON.parse(
  readFileSync(path.join(ROOT, 'scripts/provenance/manifest.json'), 'utf8'),
);
const actual = walkSourceFiles(path.join(ROOT, 'packages/design-system/src'));
const expectedPaths = new Set(manifest.entries.map((e) => e.path));
assert(
  actual.size === expectedPaths.size && [...actual].every((p) => expectedPaths.has(p)),
  'Source inventory changed; review and refresh provenance manifest',
);

const headCommit = execFileSync(
  'git',
  ['-C', path.join(ROOT, '.reference/foglamp'), 'rev-parse', 'HEAD'],
  { encoding: 'utf8' },
).trim();
assert(headCommit === COMMIT, 'Pinned upstream commit mismatch');

let fixtureDone = false;
const args = new Set(process.argv.slice(2));

for (const e of manifest.entries) {
  const f = path.join(ROOT, e.path);
  let old = readFileSync(f);
  if (!fixtureDone && args.has('--fixture-copied-byte') && e.proposed_class === 'copied-1-to-1') {
    old = Buffer.concat([old, Buffer.from(' ')]);
    fixtureDone = true;
  }
  if (!fixtureDone && args.has('--fixture-missing-4b') && e.proposed_class === 'modified') {
    old = Buffer.from(
      old
        .toString('latin1')
        .replace('Apache-2.0 Section 4(b) Notice', 'Apache-2.0 Section 4(b) Removed'),
      'latin1',
    );
    fixtureDone = true;
  }
  if (!fixtureDone && args.has('--fixture-false-path') && e.proposed_class === 'modified' && e.upstream_path) {
    old = Buffer.from(
      old.toString('latin1').replace(e.upstream_path, 'nonexistent/fabricated.ts'),
      'latin1',
    );
    fixtureDone = true;
  }
  assert(sha(body(old)) === e.body_sha256, e.path);
  if (e.upstream_path) {
    const upstream = execFileSync(
      'git',
      ['-C', path.join(ROOT, '.reference/foglamp'), 'show', `${COMMIT}:${e.upstream_path}`],
      { maxBuffer: 16 * 1024 * 1024 },
    );
    assert(
      body(old).equals(body(upstream)) === (e.proposed_class === 'copied-1-to-1'),
      e.path,
    );
  }
  let cleanStr = old.toString('latin1');
  while (HEADER_RE.test(cleanStr)) {
    cleanStr = cleanStr.replace(HEADER_RE, '');
  }
  const uc = cleanStr.match(USE_CLIENT_RE);
  if (uc) {
    let rest = cleanStr.slice(uc[1].length);
    while (HEADER_RE.test(rest)) {
      rest = rest.replace(HEADER_RE, '');
    }
    cleanStr = uc[1] + rest;
  }
  const clean = Buffer.from(cleanStr, 'latin1');
  const next = Buffer.concat([header(e), clean]);
  assert(sha(body(next)) === e.body_sha256, e.path);
  if (args.has('--check')) {
    assert(next.equals(old), e.path);
  } else if (!next.equals(old)) {
    writeFileSync(f, next);
  }
}

console.log(
  `${args.has('--check') ? 'Verified' : 'Applied'} ${manifest.entries.length} headers; body hashes unchanged`,
);
