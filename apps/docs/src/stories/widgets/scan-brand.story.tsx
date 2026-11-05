/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { BrandMark } from '@tailrocks/framerock/widgets/leaf/scan-brand';
import { defineStory } from '../../lib/story';
function ScanBrandPreview() { return <div className="flex items-center gap-3"><BrandMark className="size-9"/><span className="text-sm">Scan identity</span></div>; }
export const story = defineStory({ id: 'widgets/scan-brand', displayName: 'ScanBrand', registryItem: 'widget-leaf-scan-brand', Component: ScanBrandPreview, args: [{ variant: 'Brand mark', initial: {} }] });
