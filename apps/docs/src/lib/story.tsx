/* Derived for the Framerock Design System portal by Tailrocks.
 * Original project: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs; Apache-2.0 source project.
 */
import { defineStoryFactory, type Story, type StoryOptions } from '@fumadocs/story/vite/client';
import { FramerockLinkProvider } from '@tailrocks/framerock/lib/link-context';
import { Suspense, useEffect, type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ComponentType } from 'react';
import { FoglampStoryPanel, storyRegistryItems } from '../components/story-panel';

const factory = defineStoryFactory({ WithControl: FoglampStoryPanel });

export function StoryLinkAdapter({ href = '#', onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && (href.startsWith('/') || href.startsWith('#'))) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
}

/** registryItem defaults to the final id segment; override with a registry slug or absolute HTTP(S) URL. */
export function defineStory<C extends ComponentType<any>>(options: Omit<StoryOptions<C>, 'frame'> & { id: string; registryItem?: string; frame?: Omit<NonNullable<StoryOptions<C>['frame']>, 'src'> }): Story<C> {
  const { id, registryItem, frame, ...storyOptions } = options;
  if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/.test(id)) throw new Error(`Invalid story id: ${id}`);
  const item = registryItem ?? id.split('/').at(-1)!;
  if (!/^[a-z0-9-]+$/.test(item) && !/^https?:\/\//i.test(item)) throw new Error(`Invalid registry item: ${item}`);
  storyRegistryItems.set(options.Component, item);
  const defined = factory.defineStory({ ...storyOptions, frame: { ...frame, src: `/stories/${id}` } });
  const firstPreset = Array.isArray(storyOptions.args) ? storyOptions.args[0] : storyOptions.args;
  const resolveDefaultArgs = (): ComponentPropsWithoutRef<C> => {
    const initial = typeof firstPreset?.initial === 'function' ? firstPreset.initial() : firstPreset?.initial;
    const fixed = typeof firstPreset?.fixed === 'function' ? firstPreset.fixed() : firstPreset?.fixed;
    return { ...(initial ?? {}), ...(fixed ?? {}) } as ComponentPropsWithoutRef<C>;
  };
  const Component = options.Component as ComponentType<Record<string, unknown>>;
  const InnerFrame = defined.Frame;
  return {
    ...defined,
    Frame() {
      const isStandalone = typeof window !== 'undefined' && window.parent === window;
      useEffect(() => {
        if (window.parent === window) {
          window.postMessage({ type: 'fumadocs-story:args', args: resolveDefaultArgs() }, window.location.origin);
        }
      }, []);
      return (
        <FramerockLinkProvider component={StoryLinkAdapter}>
          {isStandalone ? (
            <Suspense>
              <Component {...(resolveDefaultArgs() as Record<string, unknown>)} />
            </Suspense>
          ) : (
            <InnerFrame />
          )}
        </FramerockLinkProvider>
      );
    },
  };
}
