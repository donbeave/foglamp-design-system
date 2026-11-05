/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { BrandMark } from '@tailrocks/framerock/icons/brand-mark';
import { defineStory } from '../../lib/story';
function BrandMarkPreview() { return <BrandMark className="size-12"/>; }
export const story = defineStory({ id: 'widgets/brand-mark', displayName: 'BrandMark', registryItem: 'icon-brand-mark', Component: BrandMarkPreview, args: [{ variant: 'Default', initial: {} }] });
