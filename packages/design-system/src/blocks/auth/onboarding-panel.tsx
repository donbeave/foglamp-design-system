/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/app/onboarding-panel.tsx.
 * Licensed under Apache-2.0.
 */
"use client";

import { Button } from "../../ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  IconBookFilled,
  IconClipboardCheckFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import { BorderBeam } from "border-beam";

import { CopyIcon } from "../../widgets/leaf/copy-icon";
import { useCopied } from "../../hooks/use-copied";
import { DOCS_URL, buildKeyedPrompt } from "../marketing/cta/agent-prompt";

export type OnboardingPanelBlockProps = {
  /** Plaintext key supplied by the host after its own secure key flow. */
  apiKey?: string | null;
  /** Optional prebuilt prompt, for hosts that own prompt generation. */
  prompt?: string;
  docsUrl?: string;
  onPromptCopied?: () => void;
};

export function OnboardingPanelBlock({
  apiKey,
  prompt: promptOverride,
  docsUrl = DOCS_URL,
  onPromptCopied,
}: OnboardingPanelBlockProps = {}) {
  const { copied, markCopied } = useCopied(2000);
  const prompt = promptOverride ?? (apiKey ? buildKeyedPrompt(apiKey) : null);
  const copy = () => {
    if (!prompt) return;
    void navigator.clipboard.writeText(prompt);
    markCopied();
    onPromptCopied?.();
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 px-8">
      <BorderBeam
        size="pulse-inner"
        colorVariant="colorful"
        strength={0.6}
        borderRadius={16}
      >
        {/* The beam shapes its ring with clip-path: inset(round) — always a
            circular arc, immune to corner-shape — so it can't be a squircle.
            corner-round! drops the Card's default superellipse to a plain round
            corner at the same 22px (rounded-3xl) radius so the edges align. */}
        <Card className="h-full corner-round! rounded-2xl!">
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              <IconClipboardCheckFilled className="size-4" />
              Prompt
            </CardTitle>
            <CardDescription>
              Paste this into your coding agent to install and wire up the SDK.
            </CardDescription>
            <CardAction className="self-center">
              {prompt ? (
                <Button
                  size="sm"
                  variant="default"
                  onClick={copy}
                  aria-label="Copy prompt"
                >
                  <CopyIcon
                    copied={copied}
                    // Inverted greens: the default Button's chip flips its bg
                    // against the theme.
                    checkClassName="text-green-400 dark:text-green-600"
                  />
                  Copy the prompt
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Preparing your key…
                </p>
              )}
            </CardAction>
          </CardHeader>
        </Card>
      </BorderBeam>

      {/* No beam here, but match the beamed card's plain round corner so the
          side-by-side pair stays visually consistent. */}
      <Card className="h-full corner-round!">
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            <IconBookFilled className="size-4" />
            Old School
          </CardTitle>
          <CardDescription>
            Prefer to wire it up by hand? Follow the full instrumentation guide.
          </CardDescription>
          <CardAction className="self-center">
            <Button
              size="sm"
              variant="secondary"
              render={<a href={docsUrl} target="_blank" rel="noreferrer" />}
            >
              <IconExternalLink />
              View the docs
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}

export const OnboardingPanel = OnboardingPanelBlock;
