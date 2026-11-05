/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/marketing/brand-mark.tsx; derived here under Apache-2.0.
 */
export function BrandMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 96 48"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<circle
				cx="24"
				cy="24"
				r="24"
				className="fill-[#1e1e1e] dark:fill-[#EEE]"
			/>
			<circle cx="48" cy="24" r="24" fill="#0090FD" />
			<circle cx="72" cy="24" r="24" fill="#FF5513" />
		</svg>
	);
}
