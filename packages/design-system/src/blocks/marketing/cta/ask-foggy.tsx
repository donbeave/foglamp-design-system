/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/ask-foggy.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/ask-foggy.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../../../ui/button";
import { TextShimmerLoader } from "../../../ui/loader";
import {
	IconArrowRight,
	IconPlayerStopFilled,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Streamdown } from "streamdown";

import { markdownComponents } from "../../../widgets/markdown";

// The last row of the FAQ. The request itself is supplied by the host so the
// component can render inside any app without owning an API endpoint.

export type AskFoggyRequest = (
	question: string,
	options: { signal: AbortSignal },
) => AsyncIterable<string>;

export type AskFoggyProps = {
	onAsk?: AskFoggyRequest;
};

function errorMessage(error: unknown): string {
	if (error instanceof Error) {
		try {
			const parsed: unknown = JSON.parse(error.message);
			if (
				typeof parsed === "object" &&
				parsed !== null &&
				"error" in parsed &&
				typeof parsed.error === "string"
			) {
				return parsed.error;
			}
		} catch {
			// Use the generic line for non-JSON errors.
		}
	}
	return "Foggy hit a snag. Please try again in a moment.";
}

export function AskFoggy({ onAsk }: AskFoggyProps) {
	const [input, setInput] = useState("");
	const [answerText, setAnswerText] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);
	const abortRef = useRef<AbortController | null>(null);

	const stop = () => {
		abortRef.current?.abort();
	};

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const question = input.trim();
		if (!question || busy) return;
		if (!onAsk) {
			setError("Connect an onAsk handler to enable Foggy responses.");
			return;
		}

		const controller = new AbortController();
		abortRef.current = controller;
		setBusy(true);
		setError(null);
		setAnswerText("");
		try {
			for await (const chunk of onAsk(question, { signal: controller.signal })) {
				if (controller.signal.aborted) break;
				setAnswerText((current) => current + chunk);
			}
		} catch (caught) {
			if (!controller.signal.aborted) setError(errorMessage(caught));
		} finally {
			if (abortRef.current === controller) abortRef.current = null;
			setBusy(false);
		}
	};

	// Only the latest answer is shown. The question stays in the input above it,
	// so the pair reads like any other row on the list.
	const thinking = busy && !answerText;

	return (
		<div>
			<form
				// The button is 32px in a 24px line. The negative margin keeps this row
				// the same 64px as the question rows above it.
				className="flex items-center gap-4 border-b border-border/70 py-5"
				onSubmit={(event) => void submit(event)}
			>
				<label htmlFor="ask-foggy" className="sr-only">
					Ask Foggy a question about Framerock
				</label>
				<input
					id="ask-foggy"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Ask anything else"
					maxLength={600}
					autoComplete="off"
					className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
				/>
				{busy ? (
					<Button
						type="button"
						size="icon-sm"
						variant="secondary"
						className="-my-1"
						aria-label="Stop"
						onClick={stop}
					>
						<IconPlayerStopFilled />
					</Button>
				) : (
					<Button
						type="submit"
						size="icon-sm"
						className="-my-1"
						aria-label="Send"
						disabled={!input.trim()}
						variant={!input.trim() ? "ghost" : "secondary"}
					>
						<IconArrowRight strokeWidth={3} />
					</Button>
				)}
			</form>

			{/* Always rendered with a floor, so the answer does not push the page
			    around when it arrives. Long answers still grow past it. */}
			<div className="min-h-60 pt-5 pb-6 text-[15px] leading-relaxed [&_a]:underline [&_a]:decoration-[0.5px] [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_li]:my-0.5 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_pre]:my-2 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 *:first:mt-0 *:last:mb-0">
				{thinking && <TextShimmerLoader text="Reading the docs" size="md" />}
				{answerText && (
					<Streamdown components={markdownComponents} controls={{ table: false }}>
						{answerText}
					</Streamdown>
				)}
				{error && <p className="text-destructive">{error}</p>}
			</div>
		</div>
	);
}
