/**
 * Original UI & design: Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs.
 * Extracted from https://github.com/foglamp-labs/foglamp — Apache-2.0.
 */
import type { ComponentProps } from "react";
import { FoglampLink as Link } from "../../lib/link-context";

// Shared Streamdown component overrides for rendering model markdown across the
// app (Foggy chat, session transcripts, …). Pass as `components` to <Streamdown>.
export const markdownComponents = {
	// Route relative links through the host link provider for in-app nav;
	// open absolute links (docs, external) in a new tab.
	a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
		if (href.startsWith("/")) {
			return (
				<Link
					href={href}
					className="font-medium text-primary underline underline-offset-2"
				>
					{children}
				</Link>
			);
		}
		return (
			<a
				{...rest}
				href={href}
				target="_blank"
				rel="noreferrer"
				className="font-medium text-primary underline underline-offset-2"
			>
				{children}
			</a>
		);
	},
	// Flat, chat-native tables — replaces Streamdown's bordered card + toolbar.
	// The wrapper scrolls horizontally so wide tables never break the layout.
	table: ({ children }: ComponentProps<"table">) => (
		<div className="my-3 w-full overflow-x-auto rounded-md squircle:rounded-xl corner-squircle border border-border/60">
			<table className="w-full border-collapse text-xs tabular-nums">
				{children}
			</table>
		</div>
	),
	thead: ({ children }: ComponentProps<"thead">) => (
		<thead className="bg-muted/40 text-muted-foreground">{children}</thead>
	),
	tr: ({ children }: ComponentProps<"tr">) => (
		<tr className="border-b border-border/40 last:border-0">{children}</tr>
	),
	th: ({ children }: ComponentProps<"th">) => (
		<th className="px-3 py-2 text-left font-medium whitespace-nowrap">
			{children}
		</th>
	),
	td: ({ children }: ComponentProps<"td">) => (
		<td className="px-3 py-1.5 align-top">{children}</td>
	),
	// Streamdown wraps images in a <div> for its hover controls, but markdown puts
	// images inside paragraphs — a <div> inside a <p> is invalid HTML, and React
	// throws a hydration error on it. A bare <img> is valid wherever an image can
	// legally appear, so it renders the same in every context.
	img: ({ src, alt, ...rest }: ComponentProps<"img">) => (
		// These are arbitrary remote URLs from model
		// output, not assets the optimizer can be pointed at.
		<img
			{...rest}
			src={typeof src === "string" ? src : undefined}
			alt={alt ?? ""}
			className="my-1.5 inline-block max-h-64 max-w-full rounded-md"
		/>
	),
	hr: () => <hr className="my-3 border-border/60" />,
};
