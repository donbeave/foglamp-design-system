/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Prose } from '@tailrocks/framerock/widgets/payload-view';
import { defineStory } from '../../lib/story';
function MarkdownPreview({ markdown = '### Model response\n\nThe **customer needs help** rotating an API key.\n\n- Confirm workspace access\n- Revoke the old key' }: { markdown?: string }) { return <div className="max-w-lg"><Prose>{markdown}</Prose></div>; }
export const story = defineStory({ id: 'widgets/markdown', displayName: 'Markdown', registryItem: 'widget-markdown', Component: MarkdownPreview, args: [{ variant: 'Response with list', initial: { markdown: '### Model response\n\nThe **customer needs help** rotating an API key.\n\n- Confirm workspace access\n- Revoke the old key' } }] });
