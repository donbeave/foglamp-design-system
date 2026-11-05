/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureKit22Block } from '@foglamp/design-system/blocks/marketing/figures/figure-kit-22-block';
import { defineStory } from '../../lib/story';
function FigureKitStory({ section, variantId }: { section: 'costs' | 'traces' | 'quality'; variantId: string }) { return <FigureKit22Block section={section} variantId={variantId} />; }
export const story = defineStory({ id: 'blocks/figure-kit-22-block', displayName: 'Figure Kit · 22 Source Figures', registryItem: 'block-marketing-figures-figure-kit-22', Component: FigureKitStory, args: [
  { variant: 'Cost chart', initial: { section: 'costs', variantId: 'chart' } },
  { variant: 'Trace X-ray', initial: { section: 'traces', variantId: 'xray' } },
  { variant: 'Quality review', initial: { section: 'quality', variantId: 'review' } },
] });
