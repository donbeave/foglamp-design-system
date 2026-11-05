/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ScoreRow, SpanScoreDots } from '@foglamp/design-system/widgets/eval-scores';
import type { TraceScore } from '@foglamp/design-system/widgets/eval-scores';
import { defineStory } from '../../lib/story';
const scores: TraceScore[] = [{ evalId: 'eval_support_quality', scoreId: 'score_42', targetType: 'trace', targetId: 'tr_42', traceId: 'tr_42', scorer: 'llm', label: 'Response quality', score: 0.92, passed: true, reason: 'Resolved the request with clear next steps.', modelId: 'gpt-4o', cost: 0.0004, scoredAt: '2025-02-14T10:02:00Z' }];
function EvalScoresPreview() { return <div className="w-full max-w-xl rounded-xl border bg-card p-4"><div className="mb-3 flex items-center gap-2 text-sm font-medium">Evaluation results <SpanScoreDots scores={scores} evalMeta={new Map([['eval_support_quality', { presetId: null, name: 'Support quality' }]])} presetName={new Map()}/></div><ScoreRow score={scores[0]!} meta={{ presetId: null, name: 'Support quality' }} presetName={new Map()}/></div>; }
export const story = defineStory({ id: 'widgets/eval-scores', displayName: 'EvalScores', registryItem: 'widget-eval-scores', Component: EvalScoresPreview, args: [{ variant: 'Passing response score', initial: {} }] });
