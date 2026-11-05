import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { useEffect, useState, type ComponentType } from 'react';
import { StoryFrameAppearance } from '../../lib/story-frame';

const stories = import.meta.glob<{ story: { Frame: ComponentType } }>('../../stories/**/*.story.tsx');

export const Route = createFileRoute('/stories/$')({ component: StoryPage });

function StoryPage() {
  const { _splat: id } = Route.useParams();
  const search = useRouterState({ select: state => state.location.searchStr });
  const centered = new URLSearchParams(search).get('layout') !== 'full';
  const [Frame, setFrame] = useState<ComponentType | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    let active = true;
    const load = stories[`../../stories/${id}.story.tsx`];
    setFrame(null);
    setMissing(false);
    if (!load) { setMissing(true); return; }
    void load().then(module => {
      if (active) {
        if (module.story?.Frame) setFrame(() => module.story.Frame);
        else setMissing(true);
      }
    }).catch(() => { if (active) setMissing(true); });
    return () => { active = false; };
  }, [id]);
  return <><StoryFrameAppearance />{Frame ? <div className={centered ? "flex min-h-screen items-center justify-center p-8" : undefined}><Frame /></div> : missing ? <p role="status">Story not found.</p> : null}</>;
}
