/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { EvilBrush, type EvilBrushRange } from '@tailrocks/framerock/charts/evilcharts/ui/evil-brush';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type BrushStoryProps = { variant: 'line' | 'area' | 'bar'; strokeVariant: 'solid' | 'dashed' | 'animated-dashed' };
const initialRange = { startIndex: 2, endIndex: 10 };
function BrushStory({ variant, strokeVariant }: BrushStoryProps) {
	const [range, setRange] = useState<EvilBrushRange>(initialRange);
	return <StorySurface><div className="mb-2 flex min-h-6 items-center justify-between text-xs text-muted-foreground"><span>Drag either handle or the selected window to scrub the data</span><output aria-live="polite">Buckets {range.startIndex + 1}–{range.endIndex + 1}</output></div><EvilBrush data={observabilityData} chartConfig={observabilityConfig} xDataKey="day" variant={variant} strokeVariant={strokeVariant} height={84} defaultStartIndex={initialRange.startIndex} defaultEndIndex={initialRange.endIndex} onChange={setRange} curveType="monotone" /></StorySurface>;
}

export const story = defineStory({
	id: 'charts/evil-brush', Component: BrushStory, displayName: 'Evil Brush Range Selector', registryItem: 'chart-evilcharts-ui-evil-brush',
	args: { initial: { variant: 'area', strokeVariant: 'solid' } },
});
