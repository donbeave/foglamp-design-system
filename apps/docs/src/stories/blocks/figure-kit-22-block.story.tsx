/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useEffect, useState } from 'react';
import { FigureKit22Block } from '@tailrocks/framerock/blocks/marketing/figures/figure-kit-22-block';
import { FIGURES } from '@tailrocks/framerock/blocks/marketing/figures/figures';
import { defineStory } from '../../lib/story';
function FigureKitStory({ section = 'costs', variantId = 'chart' }: { section?: 'costs' | 'traces' | 'quality'; variantId?: string }) {
  const [activeSection, setActiveSection] = useState<'costs' | 'traces' | 'quality'>(section);
  const [activeVariant, setActiveVariant] = useState<string>(variantId);
  useEffect(() => {
    setActiveSection(section);
    const valid = FIGURES[section]?.some((item) => item.id === variantId);
    setActiveVariant(valid ? variantId : (FIGURES[section]?.[0]?.id ?? 'chart'));
  }, [section, variantId]);
  return <div className="mx-auto w-full max-w-5xl p-6"><FigureKit22Block key={`${activeSection}-${activeVariant}`} section={activeSection} variantId={activeVariant} /></div>;
}
export const story = defineStory({ id: 'blocks/figure-kit-22-block', displayName: 'Figure Kit · 22 Source Figures', registryItem: 'block-marketing-figures-figure-kit-22', Component: FigureKitStory, frame: { width: 1280, height: 800 }, args: [
  { variant: 'Cost chart', initial: { section: 'costs', variantId: 'chart' } },
  { variant: 'Trace X-ray', initial: { section: 'traces', variantId: 'xray' } },
  { variant: 'Quality review', initial: { section: 'quality', variantId: 'review' } },
] });
