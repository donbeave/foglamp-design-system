/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/device-approve-client.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/device-approve-client.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
	IconCircleCheckFilled,
	IconCircleXFilled,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrandMark } from "../marketing/chrome/brand-mark";
import { Card } from "../../ui/card";

// The verification step of `npx foglamp login`. The CLI prints a URL that lands
// the user here (already signed in — the page gates that). We first "claim" the
// user code for this account (GET /device), then let them approve or deny. On
// approve the CLI's token poll succeeds and it mints a key + writes .env.

type Phase =
	| "claiming" // verifying the code belongs to a live request
	| "ready" // claimed + pending — show approve/deny
	| "approved"
	| "denied"
	| "needCode" // no/blank code in the URL — ask the user to paste it
	| "error";

export type DeviceClaimResult =
	| { kind: "pending" }
	| { kind: "approved" }
	| { kind: "denied" }
	| { kind: "error"; message: string };

export type DeviceDecisionResult =
	| { kind: "success" }
	| { kind: "error"; message: string };

export type DeviceApproveBlockProps = {
	initialUserCode: string;
	userEmail?: string | null;
	onClaim?: (input: {
		userCode: string;
		userEmail?: string | null;
	}) => Promise<DeviceClaimResult>;
	onDecision?: (input: {
		userCode: string;
		action: "approve" | "deny";
	}) => Promise<DeviceDecisionResult>;
	onApproved?: (input: { userCode: string }) => void;
};

const LOCAL_PENDING_CLAIM: DeviceClaimResult = { kind: "pending" };
const LOCAL_SUCCESSFUL_DECISION: DeviceDecisionResult = { kind: "success" };

function getErrorMessage(error: unknown, fallback: string): string {
	return error instanceof Error && error.message ? error.message : fallback;
}

// Module-level so it keeps a stable identity across renders — a component
// defined inside DeviceApprove would remount its subtree on every keystroke
// (and the code input would lose focus).
function DeviceShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex w-full max-w-lg flex-col p-6">
			<div className="size-10 rounded-md squircle:rounded-2xl corner-squircle bg-muted shadow-(--custom-shadow) flex justify-center items-center">
				<BrandMark className="w-7" />
			</div>
			{children}
		</div>
	);
}

export function DeviceApproveBlock({
	initialUserCode,
	userEmail,
	onClaim,
	onDecision,
	onApproved,
}: DeviceApproveBlockProps) {
	const [code, setCode] = useState(initialUserCode.trim());
	const [phase, setPhase] = useState<Phase>(
		initialUserCode.trim() ? "claiming" : "needCode",
	);
	const [message, setMessage] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);

	// Claim the code: associates it with the signed-in user and returns its
	// current status. Approve/deny both require this first (the server rejects an
	// unclaimed code), so it runs before we show the approve button.
	const claim = useCallback(async (userCode: string) => {
		setPhase("claiming");
		setMessage(null);
		try {
			const result = onClaim
				? await onClaim({ userCode, userEmail })
				: LOCAL_PENDING_CLAIM;
			switch (result.kind) {
				case "approved":
					setPhase("approved");
					break;
				case "denied":
					setPhase("denied");
					break;
				case "error":
					setPhase("error");
					setMessage(result.message);
					break;
				case "pending":
					setPhase("ready");
					break;
				default: {
					const exhaustive: never = result;
					return exhaustive;
				}
			}
		} catch (error) {
			setPhase("error");
			setMessage(
				getErrorMessage(error, "That code is invalid or has expired."),
			);
		}
	}, [onClaim, userEmail]);

	// Claim once on mount when the code arrived in the URL. Guard against the
	// effect firing twice (React strict mode) for the same code.
	const claimedFor = useRef<string | null>(null);
	useEffect(() => {
		const c = initialUserCode.trim();
		if (!c || claimedFor.current === c) return;
		claimedFor.current = c;
		void claim(c);
	}, [initialUserCode, claim]);

	const decide = async (action: "approve" | "deny") => {
		setBusy(true);
		try {
			const result = onDecision
				? await onDecision({ userCode: code, action })
				: LOCAL_SUCCESSFUL_DECISION;
			if (result.kind === "error") {
				setPhase("error");
				setMessage(result.message);
				return;
			}
			if (action === "approve") {
				onApproved?.({ userCode: code });
			}
			setPhase(action === "approve" ? "approved" : "denied");
		} catch (error) {
			setPhase("error");
			setMessage(
				getErrorMessage(error, `Could not ${action} the request.`),
			);
		} finally {
			setBusy(false);
		}
	};

	if (phase === "approved") {
		return (
			<DeviceShell>
				<div className="mt-5 flex items-center gap-2">
					<IconCircleCheckFilled className="size-5 text-green-500" />
					<h1 className="text-lg font-medium">Terminal connected</h1>
				</div>
				<p className="mt-2 text-sm text-muted-foreground text-balance">
					{onDecision
						? "You can return to your terminal. Foglamp will finish setting up and write your API key. You can close this tab."
						: "Local demo approval complete. Connect an onDecision callback to authorize a real terminal."}
				</p>
			</DeviceShell>
		);
	}

	if (phase === "denied") {
		return (
			<DeviceShell>
				<div className="mt-5 flex items-center gap-2">
					<IconCircleXFilled className="size-5 text-muted-foreground" />
					<h1 className="text-lg font-medium">Request denied</h1>
				</div>
				<p className="mt-2 text-sm text-muted-foreground text-balance">
					No device was connected. If this was a mistake, run{" "}
					<code>npx foglamp login</code> again to start over.
				</p>
			</DeviceShell>
		);
	}

	if (phase === "error") {
		return (
			<DeviceShell>
				<div className="mt-5 flex items-center gap-2">
					<IconCircleXFilled className="size-5 text-destructive" />
					<h1 className="text-lg font-medium">Couldn’t connect</h1>
				</div>
				<p className="mt-2 text-sm text-muted-foreground text-balance">
					{message ?? "Something went wrong."}
				</p>
				<Button
					variant="secondary"
					className="mt-5 self-start"
					onClick={() => {
						claimedFor.current = null;
						setPhase(code ? "claiming" : "needCode");
						if (code) void claim(code);
					}}
				>
					Try again
				</Button>
			</DeviceShell>
		);
	}

	if (phase === "needCode") {
		return (
			<DeviceShell>
				<h1 className="mt-5 mb-1 text-lg font-medium">Connect your terminal</h1>
				<p className="mb-6 text-sm text-muted-foreground text-balance">
					Enter the code shown by <code>npx foglamp login</code> to continue.
				</p>
				<form
					className="flex flex-col gap-2.5"
					onSubmit={(e) => {
						e.preventDefault();
						const c = code.trim();
						if (c) void claim(c);
					}}
				>
					<Label htmlFor="user_code">Code</Label>
					<Input
						id="user_code"
						autoFocus
						autoComplete="off"
						placeholder="ABCD1234"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="font-mono tracking-widest uppercase"
					/>
					<Button type="submit" className="mt-2 w-full" disabled={!code.trim()}>
						Continue
					</Button>
				</form>
			</DeviceShell>
		);
	}

	// claiming | ready
	return (
		<DeviceShell>
			<h1 className="mt-5 mb-1 text-lg font-medium">Connect your terminal</h1>
			<p className="mb-5 text-sm text-muted-foreground text-balance">
				Connect to your Foglamp account
				{userEmail ? (
					<>
						{" "}
						(<span className="text-foreground">{userEmail}</span>)
					</>
				) : null}{" "}
				and create an API key. Only approve this if you started it.
			</p>

			<Card className="mb-6 flex items-center justify-center bg-muted px-4 py-3">
				<code className="font-mono text-base tracking-widest uppercase">
					{code || "—"}
				</code>
			</Card>

			<div className="flex flex-col gap-2.5">
				<Button
					className="w-full"
					disabled={phase !== "ready" || busy}
					onClick={() => void decide("approve")}
				>
					{phase === "claiming"
						? "Verifying…"
						: busy
							? "Connecting…"
							: "Approve & connect"}
				</Button>
				<Button
					variant="ghost"
					className="w-full text-muted-foreground"
					disabled={phase !== "ready" || busy}
					onClick={() => void decide("deny")}
				>
					Deny
				</Button>
			</div>
		</DeviceShell>
	);
}
