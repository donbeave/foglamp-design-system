/* Derived for the Foglamp Design System portal by the project contributors.
 * It adapts Foglamp concepts and assets; this new integration code is not represented as upstream-authored.
 * Original project: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs; Apache-2.0 source project.
 */
import { defineStoryFactory, type StoryOptions } from '@fumadocs/story/vite/client';
import type { ComponentType } from 'react';
import { FoglampStoryPanel, storyRegistryItems } from '../components/story-panel';

const factory = defineStoryFactory({ WithControl: FoglampStoryPanel });

/** registryItem defaults to the final id segment; override with a registry slug or absolute HTTP(S) URL. */
export function defineStory<C extends ComponentType<any>>(options: Omit<StoryOptions<C>, 'frame'> & { id: string; registryItem?: string; frame?: Omit<NonNullable<StoryOptions<C>['frame']>, 'src'> }) {
  const { id, registryItem, frame, ...storyOptions } = options;
  if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/.test(id)) throw new Error(`Invalid story id: ${id}`);
  const item = registryItem ?? id.split('/').at(-1)!;
  if (!/^[a-z0-9-]+$/.test(item) && !/^https?:\/\//i.test(item)) throw new Error(`Invalid registry item: ${item}`);
  storyRegistryItems.set(options.Component, item);
  return factory.defineStory({ ...storyOptions, frame: { ...frame, src: `/stories/${id}` } });
}
