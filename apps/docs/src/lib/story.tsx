/* Derived for the Foglamp Design System portal by the project contributors.
 * It adapts Foglamp concepts and assets; this new integration code is not represented as upstream-authored.
 * Original project: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs; Apache-2.0 source project.
 */
import { defineStoryFactory, type StoryOptions } from '@fumadocs/story/vite/client';
import type { ComponentType } from 'react';
import { FoglampStoryPanel, storyRegistryItems } from '../components/story-panel';

const factory = defineStoryFactory({ WithControl: FoglampStoryPanel });

/** registryItem accepts a registry item name or URL for the shadcn CLI. */
export function defineStory<C extends ComponentType<any>>(options: StoryOptions<C> & { registryItem?: string }) {
  const { registryItem, ...storyOptions } = options;
  if (registryItem) storyRegistryItems.set(options.Component, registryItem);
  return factory.defineStory(storyOptions);
}
