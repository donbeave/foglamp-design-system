/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/faq.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/faq.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

import { AskFoggy } from "./ask-foggy";
import type { AskFoggyRequest } from "./ask-foggy";
import { Button } from "../../../ui/button";

const DOCS_ORIGIN = "/docs";
const GITHUB_URL = "https://github.com/tailrocks/framerock";

// Six questions, hairline rows, and under them a public Foggy that answers
// everything else from the docs. Answers are also emitted as FAQPage JSON-LD
// so search engines can lift them.

type Faq = { q: string; a: string; links?: { label: string; href: string }[] };

const FAQS: Faq[] = [
  {
    q: "What is Framerock?",
    a: "Observability for AI agents built on the Vercel AI SDK. Every generateText and streamText call becomes a trace with its cost, latency, tokens, prompt, and response. Evals score what your agents say, and alerts watch cost, errors, and pass rates. It is open source and you can run it yourself.",
    links: [{ label: "Read the docs", href: DOCS_ORIGIN }],
  },
  {
    q: "Which AI SDK versions are supported?",
    a: "Versions 4 through 6 use wrap() around your model calls. Version 7 uses the native telemetry integration: registerTelemetry() once at startup. The setup prompt reads your installed version and picks the right path.",
    links: [
      { label: "Instrumentation guide", href: `${DOCS_ORIGIN}/foundations/installation` },
    ],
  },
  {
    q: "Can I self-host it?",
    a: "Yes. Framerock is Apache 2.0 and ships with a docker compose file that brings up the app, Postgres, and ClickHouse. Nothing in the self-hosted version phones home.",
    links: [
      { label: "Self-hosting guide", href: `${DOCS_ORIGIN}/foundations/installation` },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
  {
    q: "Where are my prompts and responses stored?",
    a: "In ClickHouse, scoped to your project, for as long as your plan retains data: 3 days on Free and 14 days on Pro. If you self-host, all of it stays on your own infrastructure. PII redaction in the SDK is on the roadmap.",
    links: [{ label: "Privacy policy", href: "/privacy" }],
  },
  {
    q: "What does the SDK add to my request latency?",
    a: "Nothing on the request path. Spans are batched in memory and flushed in the background every five seconds. On serverless, call flush() before the function returns. If Framerock is unreachable, your agent keeps running and the batch is dropped.",
    links: [{ label: "SDK reference", href: `${DOCS_ORIGIN}/foundations/architecture` }],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq({ onAsk }: { onAsk?: AskFoggyRequest } = {}) {
  return (
    <section
      id="faq"
      className="mx-auto mt-32 w-full max-w-7xl px-5 sm:mt-40 sm:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <header>
          <h2 className="font-display text-3xl font-[450] tracking-tight text-balance sm:text-4xl">
            Questions
          </h2>
          <p className="mt-3 max-w-xs text-muted-foreground text-pretty">
            The short ones are here. For anything else, ask Foggy below.
          </p>
        </header>

        <div className="-mt-4">
          <Accordion>
            {FAQS.map((f) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="border-b border-border/70 last:border-b"
              >
                <AccordionTrigger className="rounded-none border-0 py-5 text-base cursor-pointer hover:opacity-70 font-normal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-[15px] leading-relaxed text-muted-foreground">
                  <p>{f.a}</p>
                  {f.links && (
                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-sm mt-5">
                      {f.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          {...(l.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          <Button variant="secondary">{l.label}</Button>
                        </a>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <AskFoggy onAsk={onAsk} />
        </div>
      </div>
    </section>
  );
}
