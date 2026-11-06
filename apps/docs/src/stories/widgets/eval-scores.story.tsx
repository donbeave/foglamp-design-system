/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ScoreRow, SpanScoreDots } from '@tailrocks/framerock/widgets/eval-scores';
import type { TraceScore } from '@tailrocks/framerock/widgets/eval-scores';
import { defineStory } from '../../lib/story';

const scores: TraceScore[] = [
  { evalId: 'eval_support_quality', scoreId: 'score_42', targetType: 'trace', targetId: 'tr_42', traceId: 'tr_42', scorer: 'llm', label: 'Response quality', score: 0.92, passed: true, reason: 'Resolved the request with clear next steps.', modelId: 'gpt-4o', cost: 0.0004, scoredAt: '2025-02-14T10:02:00Z' },
  { evalId: 'eval_policy_adherence', scoreId: 'score_43', targetType: 'trace', targetId: 'tr_42', traceId: 'tr_42', scorer: 'llm', label: 'Policy adherence', score: 0.31, passed: false, reason: 'The response did not mention checking the scheduled invoice job before revoking the previous key.', modelId: 'gpt-4o', cost: 0.0004, scoredAt: '2025-02-14T10:02:01Z' },
  { evalId: 'eval_resolution_confidence', scoreId: 'score_44', targetType: 'trace', targetId: 'tr_42', traceId: 'tr_42', scorer: 'llm', label: 'Resolution confidence', score: 0.67, passed: null, reason: 'Numeric score recorded; threshold evaluation is still pending.', modelId: 'gpt-4o', cost: 0.0003, scoredAt: '2025-02-14T10:02:02Z' },
  { evalId: 'eval_handoff_required', scoreId: 'score_45', targetType: 'trace', targetId: 'tr_42', traceId: 'tr_42', scorer: 'code', label: 'Handoff required', score: null, passed: null, reason: 'The evaluator returned no score for this trace.', modelId: null, cost: null, scoredAt: '2025-02-14T10:02:03Z' },
];
const evalMeta = new Map([
  ['eval_support_quality', { presetId: null, name: 'Support quality' }],
  ['eval_policy_adherence', { presetId: null, name: 'Policy adherence' }],
  ['eval_resolution_confidence', { presetId: null, name: 'Resolution confidence' }],
  ['eval_handoff_required', { presetId: null, name: 'Handoff required' }],
]);

function EvalScoresPreview({ empty = false }: { empty?: boolean }) {
  const visibleScores = empty ? [] : scores;
  const meta = empty ? new Map() : evalMeta;
  return (
    <div className="w-full max-w-xl rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        Evaluation results <SpanScoreDots scores={visibleScores} evalMeta={meta} presetName={new Map()} />
      </div>
      {visibleScores.length > 0 ? visibleScores.map((score) => (
        <ScoreRow key={score.scoreId} score={score} meta={meta.get(score.evalId)} presetName={new Map()} />
      )) : <p className="text-sm text-muted-foreground">No evaluation scores were recorded for this trace.</p>}
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/eval-scores',
  displayName: 'EvalScores',
  registryItem: 'widget-eval-scores',
  Component: EvalScoresPreview,
  frame: { height: 460 },
  args: [
    { variant: 'Passing, failing, pending, and missing results', initial: { empty: false } },
    { variant: 'No recorded scores', initial: { empty: true } },
  ],
});
