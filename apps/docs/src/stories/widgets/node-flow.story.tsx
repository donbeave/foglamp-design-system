/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { NodeFlow } from '@tailrocks/framerock/widgets/leaf/node-flow';
import { defineStory } from '../../lib/story';
const nodes = [{ id: 'agent', icon: <span aria-hidden="true">◈</span>, label: 'Support agent', sublabel: 'triage', status: 'ok' as const, timestamp: '10:00:00Z', durationMs: 120 }, { id: 'model', icon: <span aria-hidden="true">✦</span>, label: 'GPT-4o', sublabel: 'model call', status: 'ok' as const, timestamp: '10:00:00Z', durationMs: 1840 }, { id: 'tool', icon: <span aria-hidden="true">⌘</span>, label: 'Search customers', sublabel: 'tool', status: 'error' as const, timestamp: '10:00:02Z', durationMs: 240 }];
function NodeFlowPreview() { const [selected, setSelected] = useState(''); return <div className="w-full"><NodeFlow nodes={nodes} onNodeClick={setSelected}/><p className="mt-2 text-xs text-muted-foreground">Selected step: {selected || 'none'}</p></div>; }
export const story = defineStory({ id: 'widgets/node-flow', displayName: 'NodeFlow', registryItem: 'widget-leaf-node-flow', Component: NodeFlowPreview, args: [{ variant: 'Mixed step states', initial: {} }] });
