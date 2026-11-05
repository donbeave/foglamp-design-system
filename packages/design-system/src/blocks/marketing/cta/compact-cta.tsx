/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/compact-cta.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/compact-cta.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { Button } from "../../../ui/button";
import { FramerockLink } from "../../../lib/link-context";

import { CopyPromptButton } from "./copy-prompt-button";

export type CompactCtaSectionProps = {
	prompt?: string;
	startFreeHref?: string;
	onPromptCopied?: () => void;
};

export function CompactCtaSection({
	prompt,
	startFreeHref = "/login",
	onPromptCopied,
}: CompactCtaSectionProps = {}) {
  return (
    <section className="mx-auto mb-24 w-full max-w-7xl px-5 sm:mb-52 sm:px-8">
      <div className="flex flex-col items-center gap-12 py-14 text-center sm:py-20 sm:pt-0">
        <h2 className="font-display text-5xl font-[450] tracking-tight text-balance sm:text-6xl">
          Your first trace <br />
          is one prompt away.
        </h2>
        {/* Full-size buttons everywhere: stacked on phones, side by side
            from sm up. */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CopyPromptButton
            className="text-base h-11 px-5"
            prompt={prompt}
            onCopied={onPromptCopied}
          />
          <Button
            render={<FramerockLink href={startFreeHref} />}
            size="lg"
            className="text-base h-11 px-5"
            variant="secondary"
          >
            Start free
          </Button>
        </div>
      </div>
    </section>
  );
}
