#!/usr/bin/env bun
/** Run in-memory corruption fixtures; source and generated files are never written. */
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const here = import.meta.dir;
const root = path.resolve(here, '../..');

const cases: [string, string[], string][] = [
  ['headers.ts', ['--check', '--fixture-copied-byte'], 'AssertionError'],
  ['headers.ts', ['--check', '--fixture-missing-4b'], 'AssertionError'],
  ['headers.ts', ['--check', '--fixture-false-path'], 'AssertionError'],
  ['verify.ts', ['--scoped', '--fixture-stripped-payload'], 'missing SPDX-License-Identifier'],
  ['verify.ts', ['--scoped', '--fixture-false-url'], 'invalid upstream path/url'],
];

for (const [script, args, expected] of cases) {
  const result = spawnSync('bun', [path.join(here, script), ...args], {
    cwd: root,
    encoding: 'utf8',
  });
  const combined = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  if (result.status === 0 || !combined.includes(expected)) {
    console.error(`FAIL ${script} ${JSON.stringify(args)}: ${result.status} ${combined}`);
    process.exit(1);
  }
  console.log(`PASS ${script} ${JSON.stringify(args)}: corruption rejected`);
}

for (const fixtureScript of ['verify-mdx-fixtures.ts', 'verify-public-fixtures.ts']) {
  const result = spawnSync('bun', [path.join(here, fixtureScript)], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
