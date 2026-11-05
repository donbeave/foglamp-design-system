/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { AnthropicLogo, GoogleLogo, OpenAILogo, MistralLogo } from '@tailrocks/framerock/icons/brand-logos';
import { defineStory } from '../../lib/story';
function BrandLogosPreview() { return <div className="flex flex-wrap items-center gap-6">{[[OpenAILogo, 'OpenAI'], [AnthropicLogo, 'Anthropic'], [GoogleLogo, 'Google'], [MistralLogo, 'Mistral']].map(([Logo, name]) => <div key={name as string} className="flex items-center gap-2"><Logo className="size-6"/><span className="text-sm">{name as string}</span></div>)}</div>; }
export const story = defineStory({ id: 'widgets/brand-logos', displayName: 'BrandLogos', registryItem: 'icon-brand-logos', Component: BrandLogosPreview, args: [{ variant: 'Provider set', initial: {} }] });
