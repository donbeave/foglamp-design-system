/* Original chart design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import type { ChartConfig } from '@tailrocks/framerock/charts/evilcharts/ui/chart';
import type { ReactNode } from 'react';

export type ChartPoint = {
	day: string;
	requests: number;
	errors: number;
	latency: number;
};

export const observabilityData: ChartPoint[] = [
	{ day: 'Mon', requests: 116, errors: 9, latency: 178 },
	{ day: 'Tue', requests: 132, errors: 12, latency: 194 },
	{ day: 'Wed', requests: 124, errors: 7, latency: 169 },
	{ day: 'Thu', requests: 158, errors: 15, latency: 218 },
	{ day: 'Fri', requests: 147, errors: 11, latency: 203 },
	{ day: 'Sat', requests: 181, errors: 18, latency: 246 },
	{ day: 'Sun', requests: 169, errors: 10, latency: 221 },
	{ day: 'Mon 2', requests: 192, errors: 13, latency: 237 },
	{ day: 'Tue 2', requests: 177, errors: 8, latency: 212 },
	{ day: 'Wed 2', requests: 205, errors: 17, latency: 264 },
	{ day: 'Thu 2', requests: 189, errors: 12, latency: 231 },
	{ day: 'Fri 2', requests: 224, errors: 20, latency: 279 },
	{ day: 'Sat 2', requests: 213, errors: 14, latency: 251 },
	{ day: 'Sun 2', requests: 238, errors: 16, latency: 288 },
];

export const observabilityConfig = {
	requests: { label: 'Requests', colors: { light: ['#6d5efc'], dark: ['#a59bff'] } },
	errors: { label: 'Errors', colors: { light: ['#e05d71'], dark: ['#ff8292'] } },
	latency: { label: 'Latency', colors: { light: ['#19a98c'], dark: ['#54d9b5'] } },
} satisfies ChartConfig;

export function StorySurface({ children }: { children: ReactNode }) {
	return <div className="w-full min-w-0 rounded-lg p-4">{children}</div>;
}
