/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/app/hud/hud-landing.tsx.
 * Licensed under Apache-2.0.
 */
"use client";

import { Button } from "../../ui/button";
import { IconBoltFilled, IconMatrix } from "@tabler/icons-react";
import { type MotionProps, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { FoglampHUD } from "../../hud/FoglampHUD";
import type { HudEvent } from "../../hud/events";
import { createMockHudStream } from "../../hud/useHudStream";
import { FoglampLink } from "../../lib/link-context";
import { BrandMark } from "./chrome/brand-mark";
import { FilmGrain } from "./chrome/noise-overlay";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// A local typed stream drives the source HUD without a network connection.
export type HudSimulatorBlockProps = {
	homeHref?: string;
	onStorm?: () => Promise<void>;
};

export function HudSimulatorBlock({
	homeHref = "/homepage",
	onStorm,
}: HudSimulatorBlockProps = {}) {
	const reduce = useReducedMotion() ?? false;
	const [state, setState] = useState<"idle" | "running" | "down">("idle");
	const stream = useMemo(() => createMockHudStream(), []);
	const timers = useRef<number[]>([]);
	// Start the HUD expanded only where it fits beside the pitch; on small
	// screens the open panel would bury the whole page, so start as the pill.
	// `defaultOpen` is initial-state-only, so mount the HUD after we know the viewport.
	const [openWide, setOpenWide] = useState<boolean | null>(null);
	useEffect(() => {
		setOpenWide(window.matchMedia("(min-width: 1024px)").matches);
	}, []);
	useEffect(
		() => () => timers.current.forEach((timer) => window.clearTimeout(timer)),
		[],
	);
	const rise = (delay: number): MotionProps =>
		reduce
			? {}
			: {
					initial: { opacity: 0, y: 12, filter: "blur(6px)" },
					animate: { opacity: 1, y: 0, filter: "blur(0px)" },
					transition: { duration: 0.7, ease: EASE, delay },
				};

	async function runStorm() {
		timers.current.forEach((timer) => window.clearTimeout(timer));
		timers.current = [];
		setState("running");
		try {
			await onStorm?.();
		} catch {
			setState("down");
			return;
		}
		const startedAt = Date.now();
		const traceId = "demo-" + startedAt;
		const usageOne = { inputTokens: 2840, outputTokens: 45, totalTokens: 2885, reasoningTokens: 4 };
		const usageTwo = { inputTokens: 3190, outputTokens: 79, totalTokens: 3269, reasoningTokens: 12 };
		const trace = {
			traceId,
			traceName: "Support research",
			agentName: "Foggy",
			spans: [
				{ spanId: "trace-root", spanType: "agent" as const, name: "supportResearch", startTime: startedAt, endTime: startedAt + 4700, status: "ok" as const, systemPrompt: "Find the relevant docs and answer clearly." },
				{ spanId: "model-call-1", parentSpanId: "trace-root", spanType: "llm" as const, name: "generateText", startTime: startedAt + 240, endTime: startedAt + 3000, status: "ok" as const, provider: "openai", modelId: "gpt-4o", usage: usageOne, ttftMs: 340, modelCallMs: 1760, input: "Search the SDK docs for device authorization.", output: "The terminal login flow uses a short-lived device code." },
				{ spanId: "docs-search", parentSpanId: "trace-root", spanType: "tool" as const, name: "searchDocs", startTime: startedAt + 1200, endTime: startedAt + 2100, status: "ok" as const, input: "{\"query\":\"device authorization\"}", output: "Found the device authorization guide." },
				{ spanId: "model-call-2", parentSpanId: "trace-root", spanType: "llm" as const, name: "generateText", startTime: startedAt + 3100, endTime: startedAt + 4500, status: "ok" as const, provider: "openai", modelId: "gpt-4o", usage: usageTwo, ttftMs: 220, modelCallMs: 940, input: "Summarize the authorization guide for the user.", output: "Run foglamp login, open the printed URL, and approve the code." },
			],
		};
		const events: { delay: number; event: HudEvent }[] = [
			{ delay: 0, event: { type: "trace.start", traceId, ts: startedAt, name: "Support research", agentName: "Foggy", provider: "openai", model: "gpt-4o", toolCatalog: "{\"searchDocs\":{}}" } },
			{ delay: 240, event: { type: "step.start", traceId, ts: startedAt + 240, stepNumber: 1, provider: "openai", model: "gpt-4o" } },
			{ delay: 580, event: { type: "step.firstToken", traceId, ts: startedAt + 580, stepNumber: 1, ttftMs: 340 } },
			{ delay: 1000, event: { type: "step.tokens", traceId, ts: startedAt + 1000, stepNumber: 1, outputTokens: 22, reasoningTokens: 2, tps: 52 } },
			{ delay: 1200, event: { type: "tool.start", traceId, ts: startedAt + 1200, toolCallId: "docs-1", toolName: "searchDocs", input: "{\"query\":\"device authorization\"}" } },
			{ delay: 2100, event: { type: "tool.end", traceId, ts: startedAt + 2100, toolCallId: "docs-1", toolName: "searchDocs", status: "ok", output: "Found the device authorization guide.", durationMs: 900 } },
			{ delay: 2500, event: { type: "step.tokens", traceId, ts: startedAt + 2500, stepNumber: 1, outputTokens: 45, reasoningTokens: 4, tps: 44 } },
			{ delay: 3000, event: { type: "step.end", traceId, ts: startedAt + 3000, stepNumber: 1, status: "ok", usage: usageOne, ttftMs: 340, durationMs: 2760, outputTps: 16.3, modelCallMs: 1760 } },
			{ delay: 3100, event: { type: "step.start", traceId, ts: startedAt + 3100, stepNumber: 2, provider: "openai", model: "gpt-4o" } },
			{ delay: 3320, event: { type: "step.firstToken", traceId, ts: startedAt + 3320, stepNumber: 2, ttftMs: 220 } },
			{ delay: 3900, event: { type: "step.tokens", traceId, ts: startedAt + 3900, stepNumber: 2, outputTokens: 48, reasoningTokens: 7, tps: 48 } },
			{ delay: 4500, event: { type: "step.end", traceId, ts: startedAt + 4500, stepNumber: 2, status: "ok", usage: usageTwo, ttftMs: 220, durationMs: 1400, outputTps: 56.4, modelCallMs: 940 } },
			{ delay: 4700, event: { type: "trace.end", traceId, ts: startedAt + 4700, status: "ok", trace, totals: { inputTokens: 6030, outputTokens: 124, totalTokens: 6154, durationMs: 4700, costUsd: 0.0048 } } },
		];
		events.forEach(({ delay, event }) => {
			timers.current.push(window.setTimeout(() => stream.emit({ ...event, ts: Date.now() }), delay));
		});
		timers.current.push(window.setTimeout(() => setState("idle"), 8000));
	}

	return (
		<div className="fixed inset-0 isolate overflow-hidden bg-background">
			{/* Same grain as the landing hero, but masked so it dissolves toward
          all four edges instead of running hard into the viewport border. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					WebkitMaskImage:
						"linear-gradient(to right, transparent, #000 52%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 50%, #000 18%, transparent)",
					maskImage:
						"linear-gradient(to right, transparent, #000 52%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 50%, #000 18%, transparent)",
					WebkitMaskComposite: "source-in",
					maskComposite: "intersect",
				}}
			>
				<FilmGrain
					id="hud-hero-noise"
					className="opacity-15 mix-blend-screen"
				/>
			</div>

			{/* The live demo — the real HUD overlay, streaming a typed local trace.
          It anchors bottom-center by default (its
          :host styles), which would sit on top of the pitch — document-level
          rules on the host element outrank :host, so float it up into the
          empty center-right canvas on screens wide enough for the two-column
          layout, mirroring where the scan hero puts its demo map. */}
			{/* translateX(50%) pins the host's bottom-CENTER to the (right, bottom)
          point: the pill parks there, and the pill↔panel morph grows upward
          from that baseline, staying horizontally centered on the pill. */}
			<style>{`
        @media (min-width: 1024px) {
          foglamp-hud { left: auto; right: 30%; bottom: 15%; transform: translateX(50%); }
        }
        /* Mobile: lift the pill out of the bottom edge into the empty canvas
           just above the pitch (it stays horizontally centered by default). */
        @media (max-width: 1023px) {
          foglamp-hud { bottom: 24%; }
        }
      `}</style>
			{openWide !== null && (
				<FoglampHUD stream={stream} defaultOpen={openWide} />
			)}

			{/* Top-left: the HUD mark. */}
			<div className="absolute top-8 left-8 z-10 sm:top-14 sm:left-14">
				<p className="flex items-center gap-1.5 text-base font-medium tracking-wide">
					<IconMatrix className="size-4" />
					HUD
				</p>
			</div>

			{/* Top-right: the way into the main product. */}
			<div className="absolute top-8 right-8 z-10 sm:top-10 sm:right-10">
				<Button
					variant="outline"
					render={<FoglampLink href={homeHref} />}
					className="px-3.5 has-[>svg:first-child]:pl-3 gap-2"
				>
					<BrandMark className="h-3! w-auto!" />
					Try Foglamp
				</Button>
			</div>

			{/* Bottom-left: the pitch. */}
			{/* bottom-24 on mobile clears the HUD pill parked bottom-center. */}
			<div className="absolute bottom-10 left-8 z-10 max-w-xl sm:bottom-20 sm:left-14">
				<motion.h1
					{...rise(0.15)}
					className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-balance"
				>
					See your agents while you build.
				</motion.h1>
				<motion.p
					{...rise(0.27)}
					className="mt-4 max-w-lg md:text-lg text-base text-muted-foreground text-pretty"
				>
					See every agent working before they reach production.
				</motion.p>
				<motion.div
					{...rise(0.39)}
					className="md:mt-7 mt-6 flex flex-wrap items-center gap-3"
				>
					<Button size="lg" className="text-base" onClick={runStorm}>
						<IconBoltFilled className="size-4" />
						Run an agent storm
					</Button>
				</motion.div>
			</div>
		</div>
	);
}


export const HudLanding = HudSimulatorBlock;
