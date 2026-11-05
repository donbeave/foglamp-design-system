/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/marketing/landing/compact-cta.tsx.
 * Licensed under Apache-2.0.
 */
import { Button } from "../../../ui/button";
import { FoglampLink } from "../../../lib/link-context";

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
            render={<FoglampLink href={startFreeHref} />}
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
