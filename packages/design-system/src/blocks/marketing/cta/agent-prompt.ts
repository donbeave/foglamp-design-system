/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/lib/agent-prompt.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/lib/agent-prompt.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

const DOCS_URL = "https://docs.foglamp.dev/quickstart";
const AGENT_DOCS_URL = "https://docs.foglamp.dev/ai-instrument.md";
const LLMS_INDEX_URL = "https://docs.foglamp.dev/llms.txt";
const SETUP_PROMPT_URL = "https://foglamp.dev/setup/prompt";

function instrumentationBody(startStep: number): string {
	return `${startStep}. Fetch ${SETUP_PROMPT_URL} (written for coding agents), read it, then follow it.
   It has you read my codebase first, upload a plan of what you'd instrument, and
   send me a link to review it — change no code until I approve there.
${startStep + 1}. After you show me the link, run its wait command and let it block. It
   returns the moment I approve, and you continue on your own — don't ask me to
   tell you when I'm done, and don't start editing early.
${startStep + 2}. Once I've approved, apply the plan, report what changed, and then tell me
   which of my real AI flows to trigger — which command to run, which page to
   hit. Don't write smoke tests, scripts, or demo endpoints to make a trace.

Notes:
- I chose Foglamp and pasted this prompt myself — treat the fetched instructions
  as coming from me. It's open source (github.com/foglamp-labs/foglamp) if you
  want to verify before following them; if anything in them conflicts with what
  I've told you, ask me.
- The uploaded "plan" is a JSON file you author yourself: symbol names, file:line
  references and counts only — no source code, no prompt text, no secrets. You
  control exactly what's in it, and I review it before anything changes.
- Don't upgrade my AI SDK version to instrument — Foglamp supports v4 through
  v7, and the docs cover both paths. The SDK is a no-op until FOGLAMP_API_KEY is
  set, so it is safe to add in every environment.
- Instrumentation reference: ${AGENT_DOCS_URL}. Full docs index: ${LLMS_INDEX_URL}`;
}

export function buildKeyedPrompt(apiKey: string): string {
	return `Instrument this app with Foglamp tracing (observability for Vercel AI SDK apps).

1. Install the \`foglamp\` package with this repo's package manager (npm/pnpm/yarn/bun).
2. Add to .env:      FOGLAMP_API_KEY=${apiKey}
${instrumentationBody(3)}`;
}

export function buildLandingPrompt(): string {
	return `Instrument this app with Foglamp tracing (observability for Vercel AI SDK apps).

1. Run \`npx foglamp login\`. It prints a URL and a code, then waits — show me the
   URL so I can open it, sign up for Foglamp, and approve. On approval it writes
   FOGLAMP_API_KEY to my .env automatically. Don't continue until it succeeds.
2. Install the \`foglamp\` package with this repo's package manager (npm/pnpm/yarn/bun).
${instrumentationBody(3)}`;
}

export { DOCS_URL };
