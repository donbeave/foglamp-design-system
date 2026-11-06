/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FoggyLauncher } from '@tailrocks/framerock/widgets/foggy/foggy-widget';
import { defineStory } from '../../lib/story';
function FoggyLauncherPreview({ showButton = true }: { showButton?: boolean }) { const [open, setOpen] = useState(false); return <div className="relative h-40 w-full rounded-lg border bg-muted/20"><div className="absolute bottom-3 right-3"><FoggyLauncher onOpen={() => setOpen(!open)} showButton={showButton}/></div><p className="absolute bottom-4 left-4 text-xs text-muted-foreground">Assistant {open ? 'opened' : 'closed'}</p></div>; }
export const story = defineStory({ id: 'widgets/foggy-launcher', displayName: 'FoggyLauncher', registryItem: 'widget-foggy-foggy-widget', Component: FoggyLauncherPreview, frame: { height: 320 }, args: [{ variant: 'Launcher button', initial: { showButton: true } }, { variant: 'Floating mark only', initial: { showButton: false } }] });
