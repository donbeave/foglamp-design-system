import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'apps/docs/content/docs');
const STORIES_DIR = path.join(ROOT, 'apps/docs/src/stories');
const CATALOG_FILE = path.join(ROOT, 'apps/docs/public/r/story-items.json');
const LLMS_TXT_FILE = path.join(ROOT, 'apps/docs/public/llms.txt');

interface CatalogItem {
  id: string;
  title: string;
  source: string;
  type: string;
  registryItem: string;
  provenance: string;
  provenanceLabel: string;
  upstreamCommit: string | null;
  upstreamPath: string | null;
  upstreamUrl: string | null;
  inspirationUrl?: string | null;
}

const catalog = JSON.parse(readFileSync(CATALOG_FILE, 'utf8')) as { items: CatalogItem[] };

const WIDGET_TITLES: Record<string, string> = {
  'agent-icon': 'Agent Icon',
  'animated-api-key': 'Animated API Key',
  'brand-logos': 'Brand Logos',
  'brand-mark': 'Brand Mark',
  'code-block': 'Code Block',
  'context-chip': 'Context Chip',
  'copy-button': 'Copy Button',
  'copy-icon': 'Copy Icon',
  'cost-breakdown': 'Cost Breakdown',
  'customer-avatar': 'Customer Avatar',
  'data-table': 'Data Table',
  'dev-bar': 'Dev Bar',
  'eval-scores': 'Eval Scores',
  'filter-select': 'Filter Select',
  'foggy-launcher': 'Foggy Launcher',
  'foggy-message': 'Foggy Message',
  'foggy-widget': 'Foggy Widget',
  'foglamp-hud': 'Foglamp HUD',
  'heat-cell': 'Heat Cell',
  'hud-inline-preview': 'HUD Inline Preview',
  logo: 'Logo',
  markdown: 'Markdown',
  'model-chip': 'Model Chip',
  'model-logo': 'Model Logo',
  'node-flow': 'Node Flow',
  'page-header': 'Page Header',
  'pagination-footer': 'Pagination Footer',
  'payload-view': 'Payload View',
  'project-icon': 'Project Icon',
  'project-provider': 'Project Provider',
  'prompt-prose': 'Prompt Prose',
  'prompt-version-chip': 'Prompt Version Chip',
  'prompt-versions-view': 'Prompt Versions View',
  'quota-card': 'Quota Card',
  'range-picker': 'Range Picker',
  'range-provider': 'Range Provider',
  'relative-time': 'Relative Time',
  'run-exchange': 'Run Exchange',
  'scan-brand': 'Scan Brand',
  'search-input': 'Search Input',
  'sortable-head': 'Sortable Head',
  'span-type': 'Span Type',
  'stat-card': 'Stat Card',
  stat: 'Stat',
  'sunset-card': 'Sunset Card',
  'theme-switcher': 'Theme Switcher',
  'toggle-chip': 'Toggle Chip',
  'tool-breakdown': 'Tool Breakdown',
  'tool-icon': 'Tool Icon',
  toolbar: 'Toolbar',
  'trace-timeline': 'Trace Timeline',
  'trend-charts': 'Trend Charts',
  'user-menu': 'User Menu',
};

const BLOCK_DESCRIPTIONS: Record<string, string> = {
  'agent-detail-inspector-block':
    'Agent performance inspector with latency/token charts, trace table, cost and tool breakdowns, and prompt version history.',
  'app-shell-block':
    'Application navigation shell with project switcher, collapsible sidebar, quota card, user menu, and nested route outlet.',
  'buttons-badges-playground-block':
    'Interactive specimen grid showcasing button variants, sizes, icon buttons, and status badges across light and dark themes.',
  'cutting-mat-footer-block':
    'Marketing footer set on an architectural cutting-mat grid with multi-column navigation links and copyright bar.',
  'device-approve-block':
    'CLI and SDK device authorization screen with 8-character verification code entry and approve/deny controls.',
  'drifting-fog-cta-block':
    'Marketing call-to-action section with copy-prompt onboarding button, drifting fog backdrop, and animated agent details preview.',
  'embed-board-block':
    'Compact embeddable architecture scan board displaying the interactive flow map and summary header.',
  'eval-detail-block':
    'Evaluation detail workspace with pass-rate trend charts, rubric configuration editor, score table, and judge input inspector.',
  'figure-kit-22-block':
    'Interactive switcher for browsing all 22 marketing landing figures across cost, trace, and quality categories.',
  'flow-map-block':
    'Interactive ELK-laid-out architecture graph with pan/zoom camera controls, group containers, and node-kind spotlight filtering.',
  'hero-3d-demo-block':
    'Marketing hero section with blurred-rise headline, copy-prompt CTA, and 3D perspective dashboard entrance choreography.',
  'hud-simulator-block':
    'Interactive HUD landing page simulator with live streaming trace events, step latency breakdown, and storm trigger.',
  'instrument-empty-state-block':
    'Dashed empty-state card with copyable AI SDK instrumentation snippets for agents, workflows, and sessions.',
  'login-form-block':
    'Authentication card supporting Google OAuth, email/password sign-in, password reset, and passwordless magic links.',
  'marketing-navbar':
    'Sticky marketing navigation bar with Framerock brand lockup, section links, GitHub link, and keyboard-accessible sign-in button.',
  'observability-guide-block':
    'Long-form interactive engineering guide to AI agent observability with live embedded traces, waterfall diagrams, and chapter navigation.',
  'onboarding-panel-block':
    'First-run onboarding card with animated API key reveal, copyable AI SDK setup prompt, and documentation link.',
  'overview-dashboard-block':
    'Top-level observability overview dashboard combining KPI stat cards, latency/token/error trend charts, and cost attribution tables.',
  'scan-board-block':
    'Full-viewport codebase scan explorer pairing the floating architecture summary sidebar with the interactive flow map.',
  'scan-landing-block':
    'Interactive codebase scan landing hero with copyable CLI command and embedded architecture flow map preview.',
  'session-conversation-inspector-block':
    'Multi-turn session transcript inspector displaying user messages, assistant responses, tool calls, and per-turn token/cost metrics.',
  'setup-board-block':
    'Interactive instrumentation plan review board combining detected agent/workflow decisions with live flow-map spotlighting.',
  'trace-waterfall-inspector-block':
    'Trace execution waterfall inspector with span timeline, token/cost percentiles, evaluation score pills, and payload drawer.',
  'traces-explorer-block':
    'Filterable, sortable, and paginated traces table with agent, workflow, model, customer, and error-status filters.',
  'workflow-detail-block':
    'Workflow execution dashboard displaying run volume, error rate, duration percentiles, and expandable multi-trace run trees.',
};

const BLOCK_PROP_DESCRIPTIONS: Record<string, string> = {
  children: 'Nested route or layout content rendered inside the shell.',
  pathname: 'Active route pathname used to highlight navigation items.',
  projects: 'Available workspace projects displayed in the project switcher.',
  initialProjectId: 'Initially selected project identifier.',
  isLoading: 'Renders loading skeleton placeholders while data is being fetched.',
  isUpdating: 'Holds the current view while refreshed data is loading.',
  isFetching: 'Indicates background pagination or filter refetching.',
  onProjectChange: 'Callback fired when the active project selection changes.',
  onNewProject: 'Callback fired to create a new project from the dialog.',
  projectDialogOpen: 'Controlled open state for the new-project dialog.',
  onProjectDialogOpenChange: 'Callback fired when the new-project dialog open state changes.',
  serverUrl: 'Self-hosted server endpoint displayed in the developer bar.',
  quotaUsage: 'Monthly span usage and limit shown in the sidebar quota card.',
  devBar: 'Configuration for the local developer environment status bar.',
  hud: 'Props forwarded to the embedded live HUD overlay.',
  isPlatformAdmin: 'Enables platform administrator navigation controls.',
  foggy: 'Props forwarded to the embedded Foggy assistant drawer.',
  footer: 'Custom footer content rendered at the bottom of the sidebar.',
  user: 'Signed-in user profile displayed in the account menu.',
  onSignOut: 'Callback invoked when the user selects sign out.',
  brandName: 'Brand wordmark text (defaults to `"Framerock"`).',
  columns: 'Navigation link columns rendered in the footer grid.',
  copyrightText: 'Copyright notice displayed in the footer bottom bar.',
  initialUserCode: 'Pre-filled 8-character device verification code.',
  userEmail: 'Signed-in user email address displayed on the approval screen.',
  onClaim: 'Async handler that validates and claims the entered device code.',
  onDecision: 'Async handler invoked when the user approves or denies the device.',
  onApproved: 'Callback fired after device authorization succeeds.',
  prompt: 'Onboarding or instrumentation prompt copied by the CTA button.',
  startFreeHref: 'Destination href for the primary action button.',
  onPromptCopied: 'Callback fired after the prompt is copied to the clipboard.',
  data: 'Structured dataset rendered by the block.',
  slug: 'Unique scan or resource slug identifier.',
  evalId: 'Active evaluation identifier.',
  definition: 'Evaluation scorer configuration, thresholds, and model settings.',
  presets: 'Available evaluation rubric presets.',
  providers: 'Configured model providers available for LLM judges.',
  series: 'Time-bucketed evaluation pass rate and score series.',
  scores: 'Individual evaluation score rows.',
  total: 'Total number of matching rows across all pages.',
  focusedScoreId: 'Currently inspected score identifier.',
  focusedScore: 'Full score record for the open inspection drawer.',
  onQueryChange: 'Callback fired when pagination, sorting, or date range changes.',
  onUpdate: 'Callback fired when the evaluation configuration is saved.',
  traces: 'Map of trace IDs to span arrays for the trace waterfall preview.',
  judgeInputs: 'Map of score IDs to rendered judge prompt inputs and segments.',
  graph: 'Scan architecture graph containing nodes, edges, and groups.',
  focusKinds: 'Optional node kind filter spotlighting matching nodes on the canvas.',
  homeHref: 'Destination href for the back-to-home navigation link.',
  onStorm: 'Optional async callback triggered when running a trace storm simulation.',
  feature: 'Target observability feature (`"agent"` | `"workflow"` | `"session"`).',
  icon: 'Header icon component rendered inside the empty state card.',
  title: 'Primary heading text.',
  description: 'Supporting description text.',
  methods: 'Enabled sign-in methods (`emailPassword`, `magicLink`, `google`).',
  onGoogleSignIn: 'Async handler for Google OAuth sign-in.',
  onPasswordSignIn: 'Async handler for email and password sign-in.',
  onPasswordReset: 'Async handler for password reset requests.',
  onMagicLinkSignIn: 'Async handler for passwordless magic-link sign-in.',
  onSignedIn: 'Callback invoked after authentication completes.',
  links: 'Top-level navigation links rendered in the navbar.',
  loggedIn: 'Switches the primary navbar CTA between Sign in and Dashboard.',
  loginHref: 'Destination href for the sign-in button.',
  dashboardHref: 'Destination href for the dashboard button.',
  githubHref: 'External repository URL for the GitHub icon link.',
  onLoginShortcut: 'Callback fired when the keyboard login shortcut is pressed.',
  docsUrl: 'Documentation URL linked from the onboarding panel.',
  onboarding: 'Onboarding configuration shown before the first trace arrives.',
  onCopy: 'Callback fired when the scan prompt is copied.',
  tryFoglampHref: 'Destination href for the primary call-to-action link.',
  sessionId: 'Active session identifier.',
  plan: 'Detected instrumentation plan with agents, workflows, and sessions.',
  status: 'Current lifecycle state of the setup review plan.',
  firstTraceId: 'Identifier of the first trace received after applying the plan.',
  spanCount: 'Number of spans captured in the verification trace.',
  secondsToFirstTrace: 'Elapsed seconds from plan approval to the first trace.',
  failureStage: 'Stage identifier when plan application fails.',
  onApprove: 'Callback invoked with user edits when the setup plan is approved.',
  onReject: 'Callback invoked when the setup plan is rejected.',
  approving: 'Marks the approval action as in flight.',
  traceId: 'Active trace identifier.',
  neighbors: 'Adjacent trace links (`prev` and `next`) for keyboard navigation.',
  comparison: 'Percentile rankings comparing trace duration, cost, and tokens.',
  initialSpanId: 'Initially selected span identifier in the waterfall.',
  onSpanChange: 'Callback fired when the selected span changes.',
  promptVersions: 'Available prompt versions for filtering traces.',
  onTraceSelect: 'Callback fired when a trace row is selected.',
  onFiltersChange: 'Callback fired when search, filter, or sort controls change.',
  nameParam: 'Active workflow name parameter.',
  initialRun: 'Initially selected workflow run identifier.',
  onNavigate: 'Callback fired when navigating to a linked trace, agent, or workflow.',
  onRunChange: 'Callback fired when the selected workflow run changes.',
  agentName: 'Active agent name displayed in the inspector header.',
  initialTrace: 'Initially selected trace identifier in the drawer.',
  onTraceChange: 'Callback fired when the inspected trace changes.',
  embedded: 'Renders compact marketing embed mode with tight fit and no pan/zoom controls.',
  frame: 'Renders interactive iframe embed mode fitted without sidebar clearance.',
  direction: 'ELK layout flow direction (`"RIGHT"` for landscape or `"DOWN"` for portrait).',
  padding: 'Viewport fit clearance in pixels around the laid-out graph.',
  workflowGroups: 'Group labels styled with the emerald workflow badge treatment.',
  focusGroups: 'Group labels spotlighted on the canvas while dimming other nodes.',
  focusLabels: 'Node labels spotlighted on the canvas while dimming other nodes.',
  zoomTo: 'Camera target framing the specified node or group labels.',
  section: 'Marketing figure category (`"costs"` | `"traces"` | `"quality"`).',
  variantId: 'Figure variant identifier within the selected section.',
  previous: 'Previous scan snapshot used to compute architecture diff badges.',
  approved: 'Finalized instrumentation decisions after review approval.',
  applied: 'Agent completion report once instrumentation has been applied.',
  approvedAt: 'ISO timestamp when the setup plan was approved.',
  agentResumedAt: 'ISO timestamp when the coding agent resumed execution.',
  next: 'Sanitized post-authentication redirect path.',
  resetPasswordHref: 'Route path for the host password reset screen.',
  apiKey: 'Plaintext project API key injected into the onboarding snippet.',
};

const CHART_API_OVERRIDES: Record<string, string> = {
  background: `## Public API

| Export | Prop / Type | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartBackground\` | \`variant\` | \`BackgroundVariant\` | SVG pattern rendered behind the chart plot area. |
| \`BackgroundVariant\` | \`type\` | \`"dots" \\| "grid" \\| "cross-hatch" \\| "diagonal-lines" \\| "plus" \\| "falling-triangles" \\| "4-pointed-star" \\| "tiny-checkers" \\| "overlapping-circles" \\| "wiggle-lines" \\| "bubbles"\` | Supported background pattern identifiers. |`,

  chart: `## Public API

| Export | Prop / Parameter | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartContainer\` | \`config\` | \`ChartConfig\` | Series labels, icons, and light/dark color palettes keyed by series ID. |
| | \`children\` | \`ReactNode\` | Recharts plot elements rendered inside the responsive container. |
| | \`footer?\` | \`ReactNode\` | Optional content rendered below the plot (such as \`EvilBrush\`). |
| | \`isUpdating?\` | \`boolean\` | Dims the plot while refreshed data is loading (defaults to \`false\`). |
| | \`height?\` | \`number \\| "\${number}%"\` | Responsive container height (defaults to \`"100%"\`). |
| | \`width?\` | \`number \\| "\${number}%"\` | Responsive container width (defaults to \`"100%"\`). |
| | \`aspect?\` | \`number\` | Optional width-to-height aspect ratio. |
| | \`debounce?\` | \`number\` | Resize observer debounce in milliseconds (defaults to \`100\`). |
| | \`className?\` | \`string\` | CSS class applied to the outer chart wrapper. |
| \`ChartStyle\` | \`id\`, \`config\` | \`{ id: string; config: ChartConfig }\` | Injects scoped CSS custom properties (\`--color-<key>\`) for light and dark themes. |
| \`useChart\` | \`—\` | \`() => { config: ChartConfig }\` | Reads the active \`ChartConfig\` from \`ChartContainer\` context. |
| \`LoadingIndicator\` | \`—\` | \`() => JSX.Element\` | Animated pulsing badge displayed while a chart is in its loading state. |
| \`getLoadingData\` | \`points?\`, \`min?\`, \`max?\` | \`(points?: number, min?: number, max?: number) => { value: number }[]\` | Generates placeholder series points for chart loading skeletons. |
| \`getColorsCount\` | \`config\`, \`key\` | \`(config: ChartConfig, key: string) => number\` | Returns the number of configured theme colors for a series key. |
| \`niceCeil\` | \`max\` | \`(max: number) => number\` | Rounds a maximum axis value up to a human-friendly tick ceiling. |
| \`niceDomain\` | \`max\` | \`([min, max]: [number, number]) => [number, number]\` | Computes a padded numeric domain for Y axes. |
| \`axisValueToPercentFormatter\` | \`value\` | \`(value: number) => string\` | Formats a \`0..1\` ratio as a percentage tick label. |`,

  dot: `## Public API

| Export | Prop / Type | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartDot\` | \`variant?\` | \`DotVariant\` | Visual style of the data point marker (\`"default"\` \\| \`"border"\` \\| \`"colored-border"\`). |
| | \`cx?\`, \`cy?\` | \`number\` | SVG center coordinates supplied by Recharts. |
| | \`stroke?\`, \`fill?\` | \`string\` | Series stroke and fill colors supplied by the parent series. |
| | \`r?\` | \`number\` | Dot radius in pixels (defaults to \`3\`). |
| | \`dataKey?\` | \`string\` | Series key used to resolve theme colors from \`ChartContainer\`. |
| | \`isSelected?\` | \`boolean\` | Highlights the dot when its series is actively selected. |
| \`DotVariant\` | \`type\` | \`"default" \\| "border" \\| "colored-border"\` | Supported point marker variants. |`,

  legend: `## Public API

| Export | Prop / Type | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartLegend\` | \`content?\` | \`ReactNode\` | Recharts legend wrapper bound to \`ChartLegendContent\`. |
| \`ChartLegendContent\` | \`variant?\` | \`ChartLegendVariant\` | Swatch marker shape (\`"rounded-square"\` default). |
| | \`align?\` | \`"left" \\| "center" \\| "right"\` | Horizontal alignment of the legend row (defaults to \`"right"\`). |
| | \`verticalAlign?\` | \`"top" \\| "bottom"\` | Vertical placement relative to the plot area (defaults to \`"bottom"\`). |
| | \`isClickable?\` | \`boolean\` | Enables click-to-isolate series selection on legend items. |
| | \`selected?\` | \`string \\| null\` | Currently isolated series key, or \`null\` when all series are shown. |
| | \`onSelectChange?\` | \`(selected: string \\| null) => void\` | Callback fired when a clickable legend item toggles series selection. |
| | \`hideIcon?\` | \`boolean\` | Hides the color swatch indicator beside each label. |
| | \`nameKey?\` | \`string\` | Field used to look up series labels in \`ChartConfig\`. |
| | \`className?\` | \`string\` | CSS class applied to the legend container. |
| \`ChartLegendVariant\` | \`type\` | \`"square" \\| "circle" \\| "circle-outline" \\| "rounded-square" \\| "rounded-square-outline" \\| "vertical-bar" \\| "horizontal-bar"\` | Supported legend swatch marker variants. |`,

  tooltip: `## Public API

| Export | Prop / Type | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartTooltip\` | \`content?\` | \`ReactNode\` | Recharts tooltip primitive pre-configured for Framerock charts. |
| \`ChartTooltipContent\` | \`variant?\` | \`TooltipVariant\` | Surface treatment (\`"default"\` \\| \`"frosted-glass"\` \\| \`"inverted"\`). |
| | \`roundness?\` | \`TooltipRoundness\` | Corner radius preset (\`"none"\` \\| \`"sm"\` \\| \`"default"\` \\| \`"lg"\` \\| \`"xl"\` \\| \`"full"\`). |
| | \`indicator?\` | \`"line" \\| "dot" \\| "dashed"\` | Swatch indicator shape rendered beside each series row (defaults to \`"dot"\`). |
| | \`hideLabel?\` | \`boolean\` | Hides the top x-axis bucket header inside the tooltip. |
| | \`hideIndicator?\` | \`boolean\` | Hides the series color swatch indicator. |
| | \`labelFormatter?\` | \`(label: ReactNode, payload: TooltipPayload) => ReactNode\` | Formats the x-axis header label. |
| | \`valueFormatter?\` | \`(value: ValueType, dataKey: string, payload: Record<string, unknown>) => ReactNode\` | Formats each series value cell. |
| | \`reverse?\` | \`boolean\` | Reverses the display order of series rows to match stacked charts. |
| | \`nameKey?\`, \`labelKey?\` | \`string\` | Custom payload keys used for series names and header labels. |
| | \`className?\` | \`string\` | CSS class applied to the tooltip card. |
| \`TooltipVariant\` | \`type\` | \`"default" \\| "frosted-glass" \\| "inverted"\` | Supported tooltip surface variants. |
| \`TooltipRoundness\` | \`type\` | \`"none" \\| "sm" \\| "default" \\| "lg" \\| "xl" \\| "full"\` | Supported tooltip corner radius presets. |`,

  zoom: `## Public API

| Export | Parameter / Return | Type | Description |
| :--- | :--- | :--- | :--- |
| \`useZoomDrag\` | \`data\` | \`readonly Record<string, unknown>[]\` | Rows currently rendered by the chart. |
| | \`xDataKey\` | \`string \\| undefined\` | Field in \`data\` whose values identify the selected range endpoints. |
| | \`onZoomSelect\` | \`ZoomSelectHandler \\| undefined\` | Callback invoked with \`(startX, endX)\` when a drag selection completes. |
| | \`disabled?\` | \`boolean\` | Disables drag selection (for example while loading skeletons are shown). |
| | \`returns\` | \`{ enabled, overlay, suppressClickRef, handlers }\` | Recharts \`<ReferenceArea />\` overlay and chart mouse event handlers. |
| \`ZoomSelectHandler\` | \`type\` | \`(startX: string, endX: string) => void\` | Callback signature receiving the ordered start and end x-axis bucket values. |`,
};

const WIDGET_API_OVERRIDES: Record<string, string> = {
  'brand-logos': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`OpenAILogo\` | \`className?\` | \`string\` | OpenAI blossom mark (\`SVGProps<SVGSVGElement>\`). |
| \`AnthropicLogo\` | \`className?\` | \`string\` | Anthropic wordmark glyph (\`SVGProps<SVGSVGElement>\`). |
| \`ClaudeLogo\` | \`className?\` | \`string\` | Claude starburst mark (\`SVGProps<SVGSVGElement>\`). |
| \`ClaudeCodeLogo\` | \`className?\` | \`string\` | Claude Code terminal mark (\`SVGProps<SVGSVGElement>\`). |
| \`GeminiLogo\` | \`className?\` | \`string\` | Google Gemini spark mark (\`SVGProps<SVGSVGElement>\`). |
| \`GoogleLogo\` | \`className?\` | \`string\` | Google G mark (\`SVGProps<SVGSVGElement>\`). |
| \`MistralLogo\` | \`className?\` | \`string\` | Mistral pixel M mark (\`SVGProps<SVGSVGElement>\`). |
| \`GrokLogo\` | \`className?\` | \`string\` | xAI Grok orbital slash mark (\`SVGProps<SVGSVGElement>\`). |
| \`DeepSeekLogo\` | \`className?\` | \`string\` | DeepSeek whale mark (\`SVGProps<SVGSVGElement>\`). |
| \`CohereLogo\` | \`className?\` | \`string\` | Cohere geometric mark (\`SVGProps<SVGSVGElement>\`). |
| \`PerplexityLogo\` | \`className?\` | \`string\` | Perplexity asterisk prism mark (\`SVGProps<SVGSVGElement>\`). |
| \`GroqLogo\` | \`className?\` | \`string\` | Groq monogram mark (\`SVGProps<SVGSVGElement>\`). |
| \`MetaLogo\` | \`className?\` | \`string\` | Meta infinity loop mark (\`SVGProps<SVGSVGElement>\`). |
| \`QwenLogo\` | \`className?\` | \`string\` | Alibaba Qwen geometric mark (\`SVGProps<SVGSVGElement>\`). |
| \`OpenRouterLogo\` | \`className?\` | \`string\` | OpenRouter routing arrows mark (\`SVGProps<SVGSVGElement>\`). |
| \`MicrosoftLogo\` | \`className?\` | \`string\` | Microsoft four-square window mark (\`SVGProps<SVGSVGElement>\`). |
| \`AWSLogo\` | \`className?\` | \`string\` | Amazon Web Services smile mark (\`SVGProps<SVGSVGElement>\`). |
| \`OllamaLogo\` | \`className?\` | \`string\` | Ollama llama silhouette mark (\`SVGProps<SVGSVGElement>\`). |
| \`MiniMaxLogo\` | \`className?\` | \`string\` | MiniMax wave mark (\`SVGProps<SVGSVGElement>\`). |
| \`KimiLogo\` | \`className?\` | \`string\` | Moonshot Kimi mark (\`SVGProps<SVGSVGElement>\`). |
| \`ZaiLogo\` | \`className?\` | \`string\` | Z.ai monogram mark (\`SVGProps<SVGSVGElement>\`). |
| \`NvidiaLogo\` | \`className?\` | \`string\` | NVIDIA eye spiral mark (\`SVGProps<SVGSVGElement>\`). |
| \`CodexLogo\` | \`className?\` | \`string\` | OpenAI Codex hex mark (\`SVGProps<SVGSVGElement>\`). |
| \`OlwenLogo\` | \`className?\` | \`string\` | Olwen brand mark (\`SVGProps<SVGSVGElement>\`). |
| \`OptionLogo\` | \`className?\` | \`string\` | Option symbol mark (\`SVGProps<SVGSVGElement>\`). |

Each provider mark accepts standard \`SVGProps<SVGSVGElement>\` and forwards them to its root \`<svg>\` element.`,

  'brand-mark': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`BrandMark\` | \`className?\` | \`string\` | CSS class applied to the Framerock three-frame architectural SVG mark. |`,

  logo: `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`Logo\` | \`className?\` | \`string\` | CSS class applied to the outer lockup wrapper. |
| | \`brandName?\` | \`string\` | Brand wordmark rendered beside \`BrandMark\` (defaults to \`"Framerock"\`). |`,

  'scan-brand': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`BrandMark\` | \`className?\` | \`string\` | CSS class applied to the Framerock three-frame SVG mark. |
| \`Favicon\` | \`domain?\` | \`string\` | Domain resolved through the \`ScanFaviconProvider\` URL builder. |
| | \`fallback\` | \`ReactNode\` | Fallback icon or monogram rendered when \`domain\` is absent or fails to load. |
| | \`className?\` | \`string\` | CSS class controlling size and squircle corner rounding. |
| \`ModelIcon\` | \`label\` | \`string\` | Model identifier matched against built-in Claude, Gemini, and OpenAI marks before falling back to \`Favicon\`. |
| | \`domain?\` | \`string\` | Optional provider domain override for favicon resolution. |
| | \`className?\` | \`string\` | CSS class applied to the rendered SVG or favicon image. |`,

  'span-type': `## Public API

| Export | Prop / Parameter | Type | Description |
| :--- | :--- | :--- | :--- |
| \`SpanTypeBadge\` | \`type\` | \`string\` | Span category key (\`llm\`, \`tool\`, \`agent\`, \`embedding\`, \`other\`, etc.) rendered as a tinted badge with icon and label. |
| | \`className?\` | \`string\` | CSS class applied to the badge pill. |
| \`SpanTypeChip\` | \`type\` | \`string\` | Span category key rendered as a compact icon-only squircle chip. |
| | \`className?\` | \`string\` | CSS class applied to the chip element. |
| \`spanTypeIcon\` | \`type\` | \`(type: string) => Icon\` | Resolves the Tabler icon component for a span category key. |
| \`spanTypeVariant\` | \`type\` | \`(type: string) => BadgeVariant\` | Resolves the badge color variant for a span category key. |
| \`spanTypeBar\` | \`type\` | \`(type: string) => string\` | Resolves the waterfall bar fill class for a span category key. |
| \`spanTypeChip\` | \`type\` | \`(type: string) => string\` | Resolves the icon-chip background and ring classes for a span category key. |`,

  'code-block': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`CodeBlock\` | \`code\` | \`string\` | Raw source code string highlighted with Shiki and displayed in the block. |
| | \`lang?\` | \`string\` | Shiki syntax highlighting language identifier (defaults to \`"typescript"\`). |
| | \`actions?\` | \`ReactNode\` | Custom action controls rendered in the top-right toolbar beside the copy button. |
| | \`hideCopy?\` | \`boolean\` | Hides the built-in copy button when \`true\`. |`,

  'copy-button': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`CopyButton\` | \`value\` | \`string\` | Text string copied to the clipboard when activated. |
| | \`title?\` | \`string\` | Accessible tooltip and \`aria-label\` text for the copy button (defaults to \`"Copy"\`). |
| | \`stopPropagation?\` | \`boolean\` | Calls \`e.stopPropagation()\` on click so nested table row clicks are not triggered. |
| | \`iconSize?\` | \`string\` | Tailwind size class applied to the copy/check icon (defaults to \`"size-3.5"\`). |
| | \`className?\` | \`string\` | CSS class applied to the button element. |`,

  'sortable-head': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`SortableHead\` | \`sortKey\` | \`K extends string\` | Column key toggled when the header button is clicked. |
| | \`sort\` | \`SortState<K> \\| null\` | Active table sort state; the column is marked active when \`sort?.key === sortKey\`. |
| | \`onSort\` | \`(key: K) => void\` | Callback fired with \`sortKey\` to cycle sort direction (\`desc\` → \`asc\` → unsorted). |
| | \`align?\` | \`"left" \\| "right" \\| "center"\` | Horizontal column alignment within the table header cell. |
| | \`className?\` | \`string\` | CSS class applied to the \`<TableHead>\` element. |
| | \`children\` | \`ReactNode\` | Column header label content. |`,

  toolbar: `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`Toolbar\` | \`children\` | \`ReactNode\` | Filter controls (\`SearchInput\`, \`FilterSelect\`, \`ToggleChip\`, \`ClearFiltersButton\`) grouped on the leading side. |
| | \`trailing?\` | \`ReactNode\` | Summary counts or action buttons aligned to the trailing edge. |
| | \`className?\` | \`string\` | CSS class applied to the toolbar container. |`,

  'data-table': `## Public API

| Export | Prop / Parameter | Type | Description |
| :--- | :--- | :--- | :--- |
| \`Toolbar\` | \`children\`, \`trailing?\`, \`className?\` | \`{ children: ReactNode; trailing?: ReactNode; className?: string }\` | Responsive table filter bar with leading filter controls and trailing summary slot. |
| \`SearchInput\` | \`value\`, \`onChange\`, \`placeholder?\`, \`className?\` | \`{ value: string; onChange: (value: string) => void; placeholder?: string; className?: string }\` | Debounce-ready search input with leading magnifier icon and clear button. |
| \`FilterSelect\` | \`value\`, \`onChange\`, \`allLabel\`, \`options\`, \`icon?\`, \`allowFreeText?\` | \`FilterSelectProps<T>\` | Searchable combobox dropdown for filtering a table column by discrete options or free text. |
| \`ToggleChip\` | \`active\`, \`onClick\`, \`children\` | \`{ active: boolean; onClick: () => void; children: ReactNode }\` | Boolean pill toggle for quick single-click table filters (such as \`"Errors only"\`). |
| \`ClearFiltersButton\` | \`show\`, \`onClick\` | \`{ show: boolean; onClick: () => void }\` | Animated reset button that appears when one or more filters are active. |
| \`SortableHead\` | \`sortKey\`, \`sort\`, \`onSort\`, \`align?\`, \`className?\`, \`children\` | \`SortableHeadProps<K>\` | Table header cell displaying active sort direction arrows and cycling sort state on click. |
| \`PaginationFooter\` | \`page\`, \`pageSize\`, \`total\`, \`shown\`, \`noun\`, \`onPageChange\`, \`onPageSizeChange?\` | \`PaginationFooterProps\` | Minimal table footer with total count, rows-per-page selector, and previous/next page buttons. |
| \`useTableSort\` | \`defaultSort?\` | \`<K extends string>(defaultSort?: SortState<K> \\| null) => { sort: SortState<K> \\| null; toggle: (key: K) => void; setSort: Dispatch<SetStateAction<SortState<K> \\| null>> }\` | Controlled sort state hook cycling \`desc\` → \`asc\` → \`null\`. |
| \`sortRows\` | \`rows\`, \`sort\`, \`getters\` | \`<T, K extends string>(rows: readonly T[], sort: SortState<K> \\| null, getters: Record<K, (row: T) => number \\| string \\| null \\| undefined>) => T[]\` | Sorts rows by the active \`SortState<K>\`, keeping \`null\`/\`undefined\` values last. |
| \`useUrlFilters\` | \`defaults\` | \`<K extends string>(defaults: Record<K, string>) => [Record<K, string>, (updates: Partial<Record<K, string>>) => void]\` | Synchronizes table filter state with URL query parameters. |`,

  'stat-card': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`StatCard\` | \`label\` | \`string\` | Metric label rendered at the top of the card. |
| | \`value\` | \`ReactNode\` | Primary statistic value; numeric values animate smoothly on change. |
| | \`href?\` | \`string\` | Optional drill-down link destination for the card. |
| | \`prefix?\`, \`suffix?\` | \`ReactNode\` | Static affixes rendered before or after an animated numeric value. |
| | \`formatValue?\` | \`(n: number) => string\` | Formatter called on each animation frame for numeric values. |
| | \`delta?\` | \`Delta \\| null\` | Period-over-period change badge computed by \`formatDelta\`. |
| | \`deltaInverted?\` | \`boolean\` | Treats upward deltas as unfavorable (red) for cost, error, and latency metrics. |
| | \`size?\` | \`"default" \\| "sm"\` | Card density preset (\`"sm"\` tightens padding and value typography). |
| | \`icon?\` | \`Icon\` | Tabler icon component displayed in the top-right corner. |
| | \`iconClassName?\` | \`string\` | Color or size class applied to \`icon\`. |
| | \`chart?\` | \`ReactNode\` | Full-bleed bottom visual such as \`<CardSparkline />\` or \`<PillMeter />\`. |
| | \`loading?\`, \`skeleton?\` | \`boolean\` | Reserves layout height while loading and renders shimmer placeholders when \`skeleton\` is true. |
| | \`chartPlaceholder?\` | \`ReactNode\` | Stand-in visual rendered in the \`chart\` slot during skeleton loading. |
| \`CardSparkline\` | \`data\`, \`dashedLast?\`, \`className?\` | \`{ data: number[]; dashedLast?: boolean; className?: string }\` | Full-bleed mini area sparkline pinned to the bottom edge of a \`StatCard\`. |
| \`CardSparklinePlaceholder\` | \`—\` | \`() => JSX.Element\` | Muted placeholder line for \`CardSparkline\` during loading states. |
| \`PillMeter\` | \`fraction\`, \`count?\`, \`className?\` | \`{ fraction: number \\| null; count?: number; className?: string }\` | Segmented capsule meter visualizing a \`0..1\` pass rate or utilization ratio. |`,

  'cost-breakdown': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`CostBreakdownView\` (\`CostBreakdownCard\`) | \`data\` | \`readonly CostBreakdownRow[]\` | Time-bucketed cost rows broken down by input, cached input, cache write, output, reasoning, and other tokens. |
| | \`range\` | \`RangeValue\` | Resolved reporting interval used to align buckets and format x-axis labels. |
| | \`isLoading?\` | \`boolean\` | Displays the chart loading skeleton state. |
| | \`isUpdating?\` | \`boolean\` | Freezes the current view at reduced opacity while replacement data loads. |
| | \`title?\` | \`string\` | Card heading text (defaults to \`"Cost breakdown"\`). |
| | \`syncId?\` | \`string\` | Recharts synchronization group identifier. |
| | \`onZoomSelect?\` | \`ZoomSelectHandler\` | Callback fired when the user drags across buckets to zoom the time range. |
| | \`onZoomReset?\` | \`() => void\` | Callback fired on double-click to reset the zoomed time range. |
| | \`className?\` | \`string\` | CSS class applied to the outer card. |`,

  'tool-breakdown': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ToolBreakdownView\` (\`ToolBreakdownCard\`) | \`tools\` | \`readonly ToolBreakdownItem[]\` | Per-tool call counts, error counts, and latency percentiles (\`p50\`, \`p95\`, \`p99\`). |
| | \`isLoading?\` | \`boolean\` | Renders skeleton rows while initial tool metrics load. |
| | \`isUpdating?\` | \`boolean\` | Dims the card while refreshed range data is loading. |
| | \`title?\` | \`string\` | Card heading text (defaults to \`"Tool calls"\`). |
| | \`className?\` | \`string\` | CSS class applied to the outer card. |`,

  'page-header': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`PageHeader\` | \`title\` | \`string\` | Primary page heading text. |
| | \`titleLeading?\` | \`ReactNode\` | Inline element rendered immediately before the title (such as an agent icon). |
| | \`titleTrailing?\` | \`ReactNode\` | Inline element rendered immediately after the title (such as a copy-ID button). |
| | \`description?\` | \`ReactNode\` | Supporting subtitle or description rendered below the heading. |
| | \`actions?\` | \`ReactNode\` | Action controls rendered on the trailing side (or portaled into the app header slot). |
| | \`back?\` | \`PageHeaderBack\` | Parent breadcrumb link (\`{ href, label, icon, iconClassName? }\`) rendered before the title. |
| | \`icon?\` | \`Icon\` | Section icon rendered beside the title when \`back\` is omitted. |
| | \`iconClassName?\` | \`string\` | CSS class applied to the section icon. |`,

  markdown: `## Public API

| Export | Module | Type | Description |
| :--- | :--- | :--- | :--- |
| \`markdownComponents\` | \`@tailrocks/framerock/widgets/markdown\` | \`Record<string, ComponentType>\` | Streamdown component overrides routing relative links through \`FramerockLink\` and styling chat-native tables, images, and rules. |
| \`Prose\` | \`@tailrocks/framerock/widgets/payload-view\` | \`({ children }: { children: string }) => JSX.Element\` | Renders a Markdown string using \`Streamdown\` and \`markdownComponents\`. |`,

  'project-provider': `## Public API

| Export | Prop / Return | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ProjectProvider\` | \`children\` | \`ReactNode\` | Descendant components that consume workspace project state via \`useProject()\`. |
| | \`projects?\` | \`Project[]\` | Available workspace projects (defaults to a single demo project). |
| | \`initialProjectId?\` | \`string \\| null\` | Initially active project ID (defaults to the first project). |
| | \`isLoading?\` | \`boolean\` | Loading flag exposed through \`useProject()\`. |
| | \`onProjectChange?\` | \`(id: string) => void\` | Callback fired when \`setProjectId\` selects a new project. |
| \`useProject\` | \`returns\` | \`ProjectContextValue\` | Returns \`{ project, projectId, projects, isLoading, setProjectId }\`. Throws if called outside \`ProjectProvider\`. |`,

  'range-provider': `## Public API

| Export | Prop / Return | Type | Description |
| :--- | :--- | :--- | :--- |
| \`RangeProvider\` | \`children\` | \`ReactNode\` | Descendant components that read or update the shared reporting time range. |
| \`useRange\` | \`returns\` | \`RangeContextValue\` | Returns \`{ range, setRange }\` and persists preset selections in \`localStorage\`. Throws if called outside \`RangeProvider\`. |`,

  'range-picker': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`RangePicker\` | \`value\` | \`RangeValue\` | Active preset or custom absolute date-time range. |
| | \`onChange\` | \`(next: RangeValue) => void\` | Callback fired when the user selects a preset or applies a custom range. |
| | \`compact?\` | \`boolean\` | Renders a compact trigger button suited for dense toolbars. |
| | \`className?\` | \`string\` | CSS class applied to the trigger button. |`,

  'run-exchange': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`Conversation\` | \`input\` | \`string \\| null \\| undefined\` | Serialized prompt or input messages rendered in the user/system turn bubbles. |
| | \`output\` | \`string \\| null \\| undefined\` | Serialized assistant response or tool output rendered in the response turn bubbles. |
| | \`emptyHint\` | \`string\` | Fallback message displayed when \`output\` is empty. |
| | \`clamp?\` | \`number\` | Maximum pixel height per turn before folding behind a \`"Show more"\` toggle. |
| \`DrawerRow\` | \`colSpan\`, \`children\`, \`className?\` | \`{ colSpan: number; children: ReactNode; className?: string }\` | Expandable table row container for inline run inspection drawers. |
| \`DrawerColumns\` | \`overview\`, \`children\`, \`{ overview: ReactNode; children: ReactNode }\` | \`DrawerColumnsProps\` | Two-column drawer layout pairing a metadata sidebar with the main conversation view. |
| \`ExpandChevron\` | \`open\` | \`{ open: boolean }\` | Animated chevron indicator for expandable table rows. |
| \`Meta\` | \`label\`, \`value\`, \`className?\` | \`{ label: string; value: ReactNode; className?: string }\` | Key-value metadata row inside \`DrawerColumns\`. |
| \`ToolChips\` | \`tools\`, \`className?\` | \`{ tools: ToolPart[]; className?: string }\` | Compact chip list summarizing tool calls and statuses within a turn. |`,

  'trend-charts': `## Public API

| Export | Parameter / Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`ChartLegend\` | \`config\`, \`selected\`, \`onSelect\` | \`{ config: ChartConfig; selected: string \\| null; onSelect: (key: string \\| null) => void }\` | Interactive pill legend that isolates a single series on click and restores all series on second click. |
| \`themed\` | \`color\` | \`(color: string) => { light: [string]; dark: [string] }\` | Wraps a CSS color string into a light/dark color tuple for \`ChartConfig\`. |
| \`makeBucketLabel\` | \`from\`, \`to\` | \`(from: Date, to: Date) => (bucket: string) => string\` | Returns a locale time/date formatter tailored to the active window span. |
| \`formatBucketFull\` | \`bucket\` | \`(bucket: string) => string\` | Formats a UTC bucket string into a full tooltip timestamp. |
| \`thinTicks\` | \`buckets\`, \`maxTicks?\` | \`(buckets: readonly string[], maxTicks?: number) => string[]\` | Downsamples x-axis bucket strings to prevent tick label collisions. |
| \`fillBuckets\` | \`rows\`, \`from\`, \`to\`, \`makeEmpty\` | \`<T extends { bucket: string }>(rows: T[], from: Date, to: Date, makeEmpty: (bucket: string) => T) => T[]\` | Zero-fills missing time buckets across a query window so quiet intervals keep proportional x-axis width. |
| \`useFrozen\` | \`value\`, \`frozen\` | \`<T>(value: T, frozen: boolean) => T\` | Retains the last non-frozen value while a background range refetch is in flight. |
| \`useZoomRange\` | \`—\` | \`() => { zoomTo: (fromBucket: string, toBucket: string) => void; reset: () => void }\` | Connects chart drag-to-zoom callbacks to the shared \`RangeProvider\` state with double-click undo. |`,

  'prompt-prose': `## Public API

| Export | Prop / Parameter | Type | Description |
| :--- | :--- | :--- | :--- |
| \`PromptProseView\` | \`template\` | \`string\` | Normalized prompt template text to parse and render. |
| | \`slots\` | \`SlotExamples \\| undefined\` | Per-slot example values (\`{ slots: { examples: { value: string; runs: number }[] }[] }\`) displayed inside each \`varies per run\` hover card. |
| | \`loading?\` | \`boolean\` | Displays loading state inside slot hover cards while examples are being fetched. |
| | \`className?\` | \`string\` | CSS class applied to the root prose container. |
| \`PromptProse\` | \`template\`, \`slots?\`, \`loading?\`, \`className?\` | \`{ template: string; versionId?: string; slotCount?: number; slots?: SlotExamples; loading?: boolean; className?: string }\` | Wrapper around \`PromptProseView\` forwarding template and slot example props. |
| \`parsePrompt\` | \`template\` | \`(template: string) => Block[]\` | Parses a normalized prompt template into headings, paragraphs, lists, XML tags, horizontal rules, and \`SLOT_LINE\` slot blocks. |
| \`estimateTokens\` | \`text\` | \`(text: string) => number\` | Estimates token count from string length (\`Math.ceil(text.length / 4)\`). |`,

  'foggy-message': `## Public API

| Export | Prop | Type | Description |
| :--- | :--- | :--- | :--- |
| \`FoggyMessage\` (\`FoggyAssistantMessage\`) | \`message\` | \`FoggyMessageData\` | Chat turn record (\`{ id: string; role: "user" \\| "assistant"; parts: FoggyMessagePart[] }\`) rendered as user bubbles, assistant markdown prose, and tool-invocation status chips. |`,
};

const WRAPPER_TAGS = new Set([
  'StorySurface',
  'DashboardStoryShell',
  'RangeStoryFrame',
  'ProjectStoryFrame',
  'StoryLinkAdapter',
  'HeaderActionsHost',
]);

const FIXTURE_SNIPPETS: Record<string, { imports?: string[]; code: string }> = {
  observabilityData: {
    code: `const observabilityData = [
  { day: "Mon", requests: 116, errors: 9, latency: 178 },
  { day: "Tue", requests: 132, errors: 12, latency: 194 },
  { day: "Wed", requests: 124, errors: 7, latency: 169 },
  { day: "Thu", requests: 158, errors: 15, latency: 218 },
  { day: "Fri", requests: 147, errors: 11, latency: 203 },
];`,
  },
  observabilityConfig: {
    imports: ['import type { ChartConfig } from "@tailrocks/framerock/charts/evilcharts/ui/chart";'],
    code: `const observabilityConfig = {
  requests: { label: "Requests", colors: { light: ["#6d5efc"], dark: ["#a59bff"] } },
  errors: { label: "Errors", colors: { light: ["#e05d71"], dark: ["#ff8292"] } },
  latency: { label: "Latency", colors: { light: ["#19a98c"], dark: ["#54d9b5"] } },
} satisfies ChartConfig;`,
  },
  costFixture: {
    code: `const costFixture = [
  {
    bucket: "2025-02-14T00:00:00.000Z",
    inputCost: 0.006,
    outputCost: 0.004,
    cacheReadCost: 0.001,
    cacheWriteCost: 0,
    reasoningCost: 0.0003,
    otherCost: 0,
  },
  {
    bucket: "2025-02-14T02:00:00.000Z",
    inputCost: 0.0068,
    outputCost: 0.0045,
    cacheReadCost: 0.001,
    cacheWriteCost: 0,
    reasoningCost: 0.0003,
    otherCost: 0,
  },
];`,
  },
  toolBreakdownFixture: {
    code: `const toolBreakdownFixture = [
  {
    toolName: "search_customers",
    callCount: 164,
    errorCount: 3,
    runCount: 98,
    totalRunCount: 120,
    latencyMs: { p50: 82, p95: 248, p99: 410 },
  },
  {
    toolName: "create_ticket",
    callCount: 72,
    errorCount: 1,
    runCount: 68,
    totalRunCount: 120,
    latencyMs: { p50: 121, p95: 360, p99: 540 },
  },
];`,
  },
  promptVersionsFixture: {
    code: `const promptVersionsFixture = [
  {
    id: "v1",
    number: 1,
    template: "You are a helpful support assistant.\\n{{customer_context}}",
    slotCount: 1,
    hashCount: 3,
    runCount: 128,
    firstSeen: "2025-02-01T08:00:00Z",
    lastSeen: "2025-02-08T12:00:00Z",
    current: false,
  },
  {
    id: "v2",
    number: 2,
    template: "You are a concise support assistant.\\n{{customer_context}}",
    slotCount: 1,
    hashCount: 5,
    runCount: 84,
    firstSeen: "2025-02-08T12:00:00Z",
    lastSeen: "2025-02-14T10:00:00Z",
    current: true,
  },
];`,
  },
  resolveStoryFavicon: {
    imports: ['import { getGoogleFavicon } from "@tailrocks/framerock/widgets/leaf/favicon";'],
    code: `const resolveStoryFavicon = getGoogleFavicon;`,
  },
  scanFixture: {
    imports: ['import type { ScanData } from "@tailrocks/framerock/lib/scan/scan";'],
    code: `const scanFixture: ScanData = {
  version: 1,
  project: {
    name: "Framerock",
    slug: "framerock",
    tagline: "AI observability, clearly mapped",
    iconDomain: "tailrocks.com",
    date: "2026-11-05",
  },
  stats: { agents: 2, models: 2, tools: 2, integrations: 1 },
  topModels: [{ id: "gpt-4o", label: "GPT-4o", domain: "openai.com" }],
  topTools: [{ id: "search", label: "Search", domain: "exa.ai" }],
  topIntegrations: [{ id: "slack", label: "Slack", domain: "slack.com" }],
  graph: {
    nodes: [
      { id: "webhook", label: "Incoming webhook", kind: "entry" },
      { id: "support", label: "Support agent", kind: "agent" },
      { id: "openai", label: "GPT-4o", kind: "model", domain: "openai.com" },
    ],
    edges: [
      { from: "webhook", to: "support", kind: "triggers" },
      { from: "support", to: "openai", kind: "calls" },
    ],
  },
};`,
  },
  planFixture: {
    imports: [
      'import type { DetectedPlan } from "@tailrocks/framerock/lib/scan/instrumentation";',
      'import type { ScanData } from "@tailrocks/framerock/lib/scan/scan";',
    ],
    code: `const scanFixture: ScanData = {
  version: 1,
  project: {
    name: "Framerock",
    slug: "framerock",
    tagline: "AI observability, clearly mapped",
    iconDomain: "tailrocks.com",
    date: "2026-11-05",
  },
  stats: { agents: 1, models: 1, tools: 1, integrations: 0 },
  topModels: [{ id: "gpt-4o", label: "GPT-4o", domain: "openai.com" }],
  topTools: [{ id: "search", label: "Search", domain: "exa.ai" }],
  topIntegrations: [],
  graph: {
    nodes: [
      { id: "support", label: "Support agent", kind: "agent" },
      { id: "openai", label: "GPT-4o", kind: "model", domain: "openai.com" },
    ],
    edges: [{ from: "support", to: "openai", kind: "calls" }],
  },
};

const planFixture: DetectedPlan = {
  version: 1,
  sdk: { major: 5, version: "5.0.12" },
  hasReactUi: true,
  scan: scanFixture,
  calls: [
    {
      id: "call-support",
      fn: "generateText",
      sourceRef: "src/agents/support.ts:42",
      modelId: "gpt-4o",
    },
  ],
  decisions: {
    agents: [
      {
        id: "support-agent",
        name: "Support agent",
        callIds: ["call-support"],
        oneOff: false,
        confidence: "high",
        sourceRef: "src/agents/support.ts:42",
        rationale: "Handles incoming customer support requests.",
      },
    ],
    workflows: [],
    sessions: [],
    customer: {
      recommended: false,
      confidence: "high",
      rationale: "Single-workspace deployment.",
    },
  },
};`,
  },
};

const USAGE_OVERRIDES: Record<string, string> = {
  'blocks/app-shell-block': `import {
  AppShellBlock,
} from "@tailrocks/framerock/blocks/app-shell/app-shell-block";
import type { Project } from "@tailrocks/framerock/widgets/project-context";

const projects: Project[] = [
  {
    id: "prod",
    name: "Acme Production",
    slug: "acme-production",
    url: null,
    orgId: "org-acme",
    orgName: "Acme",
    orgSlug: "acme",
  },
];

export function AppShellExample() {
  return (
    <AppShellBlock
      pathname="/overview"
      projects={projects}
      user={{ name: "Alex Rivera", email: "alex@example.com" }}
    >
      <section className="px-6 py-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Workspace metrics and active traces render inside the shell outlet.
        </p>
      </section>
    </AppShellBlock>
  );
}`,
  'widgets/foggy-message': `import {
  FoggyMessage,
} from "@tailrocks/framerock/widgets/foggy/foggy-message";

export function FoggyMessageExample() {
  return (
    <FoggyMessage
      message={{
        id: "message-1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "I found **three failed traces** in the staging project.",
          },
          {
            type: "tool-searchTraces",
            state: "output-available",
          },
        ],
      }}
    />
  );
}`,
  'widgets/eval-scores': `import {
  ScoreRow,
  SpanScoreDots,
  type EvalMeta,
  type TraceScore,
} from "@tailrocks/framerock/widgets/eval-scores";

const scores: TraceScore[] = [
  {
    scoreId: "score-1",
    evalId: "eval-accuracy",
    targetType: "trace",
    targetId: "trace-01",
    traceId: "trace-01",
    scorer: "llm",
    label: "Answer relevance",
    score: 0.94,
    passed: true,
    reason: "Grounded in retrieved billing documentation.",
    modelId: "gpt-4o",
    cost: 0.0004,
    scoredAt: "2025-02-14T10:01:00Z",
  },
];

const meta = new Map<string, EvalMeta>([
  [
    "eval-accuracy",
    {
      name: "Answer relevance",
      presetId: "relevance",
    },
  ],
]);

const presetName = new Map<string, string>([
  ["relevance", "Answer Relevance"],
]);

export function EvalScoresExample() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Span indicators</span>
        <SpanScoreDots
          scores={scores}
          evalMeta={meta}
          presetName={presetName}
        />
      </div>
      <div className="space-y-2">
        {scores.map((score) => (
          <ScoreRow
            key={score.scoreId}
            score={score}
            meta={meta.get(score.evalId)}
            presetName={presetName}
          />
        ))}
      </div>
    </div>
  );
}`,
  'widgets/brand-logos': `import {
  AnthropicLogo,
  GoogleLogo,
  MistralLogo,
  OpenAILogo,
} from "@tailrocks/framerock/icons/brand-logos";

const providers = [
  { name: "OpenAI", Logo: OpenAILogo },
  { name: "Anthropic", Logo: AnthropicLogo },
  { name: "Google", Logo: GoogleLogo },
  { name: "Mistral", Logo: MistralLogo },
];

export function BrandLogosExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {providers.map(({ name, Logo }) => (
        <div key={name} className="flex items-center gap-2">
          <Logo className="size-6" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
}`,
  'widgets/trace-timeline': `import { useState } from "react";
import { TraceTimeline } from "@tailrocks/framerock/widgets/trace-timeline";
import type { TraceSpan } from "@tailrocks/framerock/lib/types";

const baseSpan: TraceSpan = {
  spanId: "span-root",
  parentSpanId: null,
  spanType: "agent",
  name: "Support assistant",
  startTime: "2025-02-14 10:00:00.000",
  endTime: "2025-02-14 10:00:02.400",
  durationMs: 2_400,
  status: "ok",
  errorMessage: null,
  provider: null,
  modelId: null,
  inputTokens: 1240,
  outputTokens: 214,
  totalTokens: 1454,
  reasoningTokens: 0,
  cachedInputTokens: 620,
  cacheWriteInputTokens: 0,
  imageCount: 0,
  webSearchCount: 0,
  requestCount: 1,
  ttftMs: null,
  reasoningDurationMs: null,
  totalCost: 0.0042,
  promptCost: 0.0021,
  completionCost: 0.0021,
  requestCost: null,
  imageCost: null,
  webSearchCost: null,
  reasoningCost: null,
  cacheReadCost: 0.0002,
  cacheWriteCost: null,
  pricingSource: "fixture",
  pricedModelId: "gpt-4o",
  pricedAt: null,
  metadata: { environment: "staging" },
  input: "Summarize the latest support conversation.",
  output: "The customer needs help rotating an API key.",
  toolCatalog: null,
  systemPrompt: null,
  promptHash: "sha-01",
  modelCallMs: null,
  responseTimeMs: 1840,
  effectiveOutputTps: 116,
  effectiveTotalTps: 790,
  outputTps: 116,
  inputTps: 674,
  chunkJitter: null,
  systemFingerprint: null,
  safetyMetadata: null,
  sources: null,
  rateLimit: null,
};

const spans: TraceSpan[] = [
  baseSpan,
  {
    ...baseSpan,
    spanId: "span-retrieval-1",
    parentSpanId: "span-root",
    spanType: "llm",
    name: "Retrieve customer context",
    startTime: "2025-02-14 10:00:00.200",
    endTime: "2025-02-14 10:00:00.500",
    durationMs: 300,
    modelId: "gpt-4o",
    provider: "openai",
    modelCallMs: 220,
    ttftMs: 100,
    reasoningDurationMs: 70,
  },
  {
    ...baseSpan,
    spanId: "span-final-answer",
    parentSpanId: "span-root",
    spanType: "llm",
    name: "Compose response",
    startTime: "2025-02-14 10:00:01.600",
    endTime: "2025-02-14 10:00:02.300",
    durationMs: 700,
    modelId: "gpt-4o",
    provider: "openai",
    modelCallMs: 490,
    ttftMs: 180,
    reasoningDurationMs: 150,
  },
];

export function TraceTimelineExample() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="w-full">
      <TraceTimeline
        spans={spans}
        selected={selected}
        onSelect={setSelected}
        reveal="play"
      />
    </div>
  );
}`,
  'blocks/traces-explorer-block': `import { useState } from "react";
import {
  TracesExplorerBlock,
} from "@tailrocks/framerock/blocks/dashboard/traces-explorer-block";
import {
  TraceWaterfallInspectorBlock,
} from "@tailrocks/framerock/blocks/dashboard/trace-waterfall-inspector-block";

export function TracesExplorerExample() {
  const [traceId, setTraceId] = useState<string | null>(null);

  if (traceId) {
    return (
      <div>
        <button
          type="button"
          className="mb-3 text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setTraceId(null)}
        >
          ← Back to traces
        </button>
        <TraceWaterfallInspectorBlock traceId={traceId} />
      </div>
    );
  }

  return (
    <TracesExplorerBlock
      onTraceSelect={setTraceId}
      onFiltersChange={() => {}}
    />
  );
}`,
  'primitives/sonner': `import { useState } from "react";
import { Button } from "@tailrocks/framerock/ui/button";
import { Toaster } from "@tailrocks/framerock/ui/sonner";

export function SonnerExample() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="relative flex min-h-40 w-full max-w-md flex-col items-start justify-between rounded-xl border bg-muted/15 p-4">
      <Button type="button" size="sm" onClick={() => setVisible(true)}>
        Show notification
      </Button>
      {visible ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex w-full items-start justify-between gap-3 rounded-lg border bg-popover p-3.5 text-popover-foreground shadow-md"
        >
          <div className="grid gap-1">
            <div className="text-xs font-medium">Evaluation run queued</div>
            <div className="text-xs text-muted-foreground">
              Results will stream into the trace table.
            </div>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      ) : null}
      <Toaster />
    </div>
  );
}`,
  'widgets/project-provider': `import {
  ProjectProvider,
  useProject,
} from "@tailrocks/framerock/widgets/project-context";

function ActiveProjectBadge() {
  const { project } = useProject();
  return (
    <div className="rounded-md border px-3 py-1.5 text-sm">
      Active project: <strong>{project?.name ?? "None"}</strong>
    </div>
  );
}

export function ProjectProviderExample() {
  return (
    <ProjectProvider>
      <ActiveProjectBadge />
    </ProjectProvider>
  );
}`,
  'widgets/range-provider': `import { resolvePreset } from "@tailrocks/framerock/lib/range";
import {
  RangeProvider,
  useRange,
} from "@tailrocks/framerock/widgets/range-context";

function RangeControls() {
  const { range, setRange } = useRange();
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">{range.label}</span>
      <button
        type="button"
        className="rounded-md border px-2 py-1 text-xs"
        onClick={() => setRange(resolvePreset("24h"))}
      >
        Set 24h range
      </button>
    </div>
  );
}

export function RangeProviderExample() {
  return (
    <RangeProvider>
      <RangeControls />
    </RangeProvider>
  );
}`,
  'widgets/toolbar': `import { useState } from "react";
import {
  ClearFiltersButton,
  FilterSelect,
  SearchInput,
  ToggleChip,
  Toolbar,
} from "@tailrocks/framerock/widgets/data-table";

const statuses = [
  { value: "ok", label: "Healthy" },
  { value: "error", label: "Errored" },
];

export function ToolbarExample() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [errorsOnly, setErrorsOnly] = useState(false);
  const hasFilters = Boolean(search || status || errorsOnly);

  return (
    <Toolbar
      trailing={
        <span className="text-xs text-muted-foreground">128 traces</span>
      }
    >
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search traces…"
      />
      <FilterSelect
        value={status}
        onChange={setStatus}
        allLabel="All statuses"
        options={statuses}
      />
      <ToggleChip
        active={errorsOnly}
        onClick={() => setErrorsOnly((prev) => !prev)}
      >
        Errors only
      </ToggleChip>
      <ClearFiltersButton
        show={hasFilters}
        onClick={() => {
          setSearch("");
          setStatus("");
          setErrorsOnly(false);
        }}
      />
    </Toolbar>
  );
}`,
  'widgets/data-table': `import { useState } from "react";
import {
  PaginationFooter,
  SearchInput,
  SortableHead,
  ToggleChip,
  Toolbar,
  sortRows,
  useTableSort,
} from "@tailrocks/framerock/widgets/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@tailrocks/framerock/ui/table";

type TraceRow = {
  id: string;
  name: string;
  durationMs: number;
  hasError: boolean;
};

const rows: TraceRow[] = [
  { id: "tr_1", name: "Support assistant", durationMs: 420, hasError: false },
  { id: "tr_2", name: "Billing lookup", durationMs: 910, hasError: true },
  { id: "tr_3", name: "Ticket router", durationMs: 185, hasError: false },
];

export function DataTableExample() {
  const [search, setSearch] = useState("");
  const [errorsOnly, setErrorsOnly] = useState(false);
  const [page, setPage] = useState(0);
  const { sort, toggle } = useTableSort<"name" | "durationMs">({
    key: "durationMs",
    dir: "desc",
  });

  const filtered = rows.filter(
    (r) =>
      (!errorsOnly || r.hasError) &&
      r.name.toLowerCase().includes(search.toLowerCase()),
  );
  const sorted = sortRows(filtered, sort, {
    name: (r) => r.name,
    durationMs: (r) => r.durationMs,
  });

  return (
    <div className="space-y-3">
      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Filter traces…"
        />
        <ToggleChip
          active={errorsOnly}
          onClick={() => setErrorsOnly((v) => !v)}
        >
          Errors only
        </ToggleChip>
      </Toolbar>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead sortKey="name" sort={sort} onSort={toggle}>
              Trace
            </SortableHead>
            <SortableHead
              sortKey="durationMs"
              sort={sort}
              onSort={toggle}
              align="right"
            >
              Duration
            </SortableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-right tabular-nums">
                {row.durationMs} ms
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationFooter
        page={page}
        pageSize={25}
        total={sorted.length}
        shown={sorted.length}
        noun={["trace", "traces"]}
        onPageChange={setPage}
      />
    </div>
  );
}`,
};

function formatStoryUsage(storyPath: string, cat: string, slug: string): string {
  const key = `${cat}/${slug}`;
  if (USAGE_OVERRIDES[key]) return USAGE_OVERRIDES[key];
  const raw = readFileSync(storyPath, 'utf8')
    .replace(/'sk_live_foglamp_demo_42'/g, "'sk_live_framerock_demo_42'")
    .replace(/'sk_live_foglamp_7Kp4qR2v'/g, "'sk_live_framerock_7Kp4qR2v'")
    .replace(/"api\.foglamp\.dev"/g, '"api.framerock.dev"')
    .replace(/foglamp-story:/g, 'framerock-story:')
    .replace(/>Foglamp</g, '>Framerock<');
  const sf = ts.createSourceFile(storyPath, raw, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  function unwrapShell(node: ts.Node): ts.Node {
    if (ts.isParenthesizedExpression(node)) return unwrapShell(node.expression);
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName.getText(sf);
      const clsAttr = node.openingElement.attributes.properties.find(
        (p): p is ts.JsxAttribute =>
          ts.isJsxAttribute(p) &&
          p.name.getText(sf) === 'className' &&
          Boolean(p.initializer && ts.isStringLiteral(p.initializer)),
      );
      const cls =
        clsAttr && clsAttr.initializer && ts.isStringLiteral(clsAttr.initializer)
          ? clsAttr.initializer.text
          : '';
      const nonTextChildren = node.children.filter(
        (c) => !ts.isJsxText(c) || c.getText(sf).trim() !== '',
      );
      if (
        (WRAPPER_TAGS.has(tag) ||
          (tag === 'div' && (cls.includes('min-h-24') || cls.includes('max-w-5xl p-6')))) &&
        nonTextChildren.length === 1 &&
        (ts.isJsxElement(nonTextChildren[0]) || ts.isJsxSelfClosingElement(nonTextChildren[0]))
      ) {
        return unwrapShell(nonTextChildren[0]);
      }
    }
    return node;
  }

  function printJsx(node: ts.Node, indent = 0): string {
    const pad = '  '.repeat(indent);
    if (ts.isParenthesizedExpression(node)) return printJsx(node.expression, indent);
    if (ts.isJsxElement(node)) {
      const tagName = node.openingElement.tagName.getText(sf);
      if (WRAPPER_TAGS.has(tagName)) {
        const inner = node.children
          .map((ch) => {
            if (ts.isJsxText(ch)) {
              const txt = ch.getText(sf).replace(/\s+/g, ' ').trim();
              return txt ? pad + txt : '';
            }
            return printJsx(ch, indent);
          })
          .filter((s) => s.trim() !== '');
        if (inner.length === 1) return inner[0];
        return pad + '<>\n' + inner.map((s) => '  ' + s).join('\n') + '\n' + pad + '</>';
      }
      const open = printOpening(node.openingElement, indent, false);
      const closeTag = '</' + tagName + '>';
      const children: { kind: 'text' | 'node'; text: string }[] = [];
      for (const ch of node.children) {
        if (ts.isJsxText(ch)) {
          const txt = ch.getText(sf).replace(/\s+/g, ' ').trim();
          if (txt) children.push({ kind: 'text', text: txt });
        } else {
          const rendered = printJsx(ch, indent + 1);
          if (rendered.trim()) children.push({ kind: 'node', text: rendered });
        }
      }
      if (children.length === 0) {
        return printOpening(node.openingElement, indent, true);
      }
      if (
        children.length === 1 &&
        children[0].kind === 'text' &&
        !open.includes('\n') &&
        open.length + children[0].text.length + closeTag.length <= 78
      ) {
        return open + children[0].text + closeTag;
      }
      const childLines = children.map((c) =>
        c.kind === 'text' ? '  '.repeat(indent + 1) + c.text : c.text,
      );
      return open + '\n' + childLines.join('\n') + '\n' + pad + closeTag;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      return printOpening(node, indent, true);
    }
    if (ts.isJsxFragment(node)) {
      const children: string[] = [];
      for (const ch of node.children) {
        if (ts.isJsxText(ch)) {
          const txt = ch.getText(sf).replace(/\s+/g, ' ').trim();
          if (txt) children.push('  '.repeat(indent + 1) + txt);
        } else {
          const rendered = printJsx(ch, indent + 1);
          if (rendered.trim()) children.push(rendered);
        }
      }
      return pad + '<>\n' + children.join('\n') + '\n' + pad + '</>';
    }
    if (ts.isJsxExpression(node)) {
      if (!node.expression) return '';
      const expr = node.expression;
      if (
        ts.isCallExpression(expr) &&
        expr.arguments.length >= 1 &&
        (ts.isArrowFunction(expr.arguments[expr.arguments.length - 1]) ||
          ts.isFunctionExpression(expr.arguments[expr.arguments.length - 1]))
      ) {
        const fn = expr.arguments[expr.arguments.length - 1] as
          | ts.ArrowFunction
          | ts.FunctionExpression;
        const leadingArgs = expr.arguments
          .slice(0, -1)
          .map((a) => a.getText(sf).replace(/\s+/g, ' '))
          .join(', ');
        const callee = expr.expression.getText(sf).replace(/\s+/g, ' ');
        const params = fn.parameters.map((p) => p.getText(sf)).join(', ');
        const bodyNode = ts.isParenthesizedExpression(fn.body) ? fn.body.expression : fn.body;
        if (ts.isJsxElement(bodyNode) || ts.isJsxSelfClosingElement(bodyNode)) {
          const prefix = leadingArgs ? `${callee}(${leadingArgs}, ` : `${callee}(`;
          return (
            pad +
            '{' +
            prefix +
            '(' +
            params +
            ') => (\n' +
            printJsx(bodyNode, indent + 2) +
            '\n' +
            pad +
            '))}'
          );
        }
      }
      if (
        ts.isBinaryExpression(expr) &&
        expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
      ) {
        const right = ts.isParenthesizedExpression(expr.right) ? expr.right.expression : expr.right;
        if (ts.isJsxElement(right) || ts.isJsxSelfClosingElement(right)) {
          return (
            pad +
            '{' +
            expr.left.getText(sf) +
            ' && (\n' +
            printJsx(right, indent + 2) +
            '\n' +
            pad +
            ')}'
          );
        }
      }
      if (ts.isConditionalExpression(expr)) {
        const whenTrue = ts.isParenthesizedExpression(expr.whenTrue)
          ? expr.whenTrue.expression
          : expr.whenTrue;
        const whenFalse = ts.isParenthesizedExpression(expr.whenFalse)
          ? expr.whenFalse.expression
          : expr.whenFalse;
        const trueIsJsx = ts.isJsxElement(whenTrue) || ts.isJsxSelfClosingElement(whenTrue);
        const falseIsJsx = ts.isJsxElement(whenFalse) || ts.isJsxSelfClosingElement(whenFalse);
        if (trueIsJsx && falseIsJsx) {
          return (
            pad +
            '{' +
            expr.condition.getText(sf) +
            ' ? (\n' +
            printJsx(whenTrue, indent + 2) +
            '\n' +
            pad +
            ') : (\n' +
            printJsx(whenFalse, indent + 2) +
            '\n' +
            pad +
            ')}'
          );
        }
        if (trueIsJsx && !falseIsJsx) {
          return (
            pad +
            '{' +
            expr.condition.getText(sf) +
            ' ? (\n' +
            printJsx(whenTrue, indent + 2) +
            '\n' +
            pad +
            ') : ' +
            whenFalse.getText(sf).replace(/\s+/g, ' ') +
            '}'
          );
        }
      }
      return pad + '{' + expr.getText(sf).replace(/\s+/g, ' ') + '}';
    }
    return pad + node.getText(sf).replace(/\s+/g, ' ');
  }

  function printOpening(
    openNode: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
    indent: number,
    selfClosing: boolean,
  ): string {
    const pad = '  '.repeat(indent);
    const tag = openNode.tagName.getText(sf);
    const attrs = openNode.attributes.properties.map((prop) => {
      if (ts.isJsxAttribute(prop)) {
        const name = prop.name.getText(sf);
        if (!prop.initializer) return name;
        if (ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
          const expr = prop.initializer.expression;
          if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
            return name + '={' + printJsx(expr, 0).trim() + '}';
          }
          return name + '={' + expr.getText(sf).replace(/\s+/g, ' ').trim() + '}';
        }
        return name + '=' + prop.initializer.getText(sf);
      }
      return prop.getText(sf);
    });
    const suffix = selfClosing ? ' />' : '>';
    const singleLine = pad + '<' + tag + (attrs.length ? ' ' + attrs.join(' ') : '') + suffix;
    if (singleLine.length <= 78 && !singleLine.includes('\n')) return singleLine;
    const attrIndent = '  '.repeat(indent + 1);
    return (
      pad +
      '<' +
      tag +
      '\n' +
      attrs.map((a) => attrIndent + a).join('\n') +
      '\n' +
      pad +
      (selfClosing ? '/>' : '>')
    );
  }

  const imports: string[] = [];
  const fixtureImports = new Set<string>();
  const fixtureBlocks: string[] = [];
  const topLevelHelpers: string[] = [];
  const allFns: ts.FunctionDeclaration[] = [];
  let directCompName: string | null = null;
  const initialDefaults = new Map<string, string>();

  sf.forEachChild((stmt) => {
    if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
      const mod = stmt.moduleSpecifier.text;
      if (mod.includes('lib/story')) return;
      if (mod.startsWith('./') || mod.startsWith('../')) {
        const clause = stmt.importClause;
        if (clause && clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
          for (const el of clause.namedBindings.elements) {
            const sym = el.name.getText(sf);
            if (FIXTURE_SNIPPETS[sym]) {
              for (const imp of FIXTURE_SNIPPETS[sym].imports ?? []) {
                fixtureImports.add(imp);
              }
              fixtureBlocks.push(FIXTURE_SNIPPETS[sym].code);
            }
          }
        }
        return;
      }
      const clause = stmt.importClause;
      if (clause && clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        const elems = clause.namedBindings.elements
          .map((e) => e.getText(sf))
          .filter((n) => n !== 'useEffect');
        if (elems.length === 0) return;
        const single = `import { ${elems.join(', ')} } from "${mod}";`;
        if (single.length <= 78) {
          imports.push(single);
        } else {
          imports.push(`import {\n${elems.map((e) => `  ${e},`).join('\n')}\n} from "${mod}";`);
        }
      } else {
        imports.push(stmt.getText(sf).trim());
      }
    } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      allFns.push(stmt);
    } else if (ts.isTypeAliasDeclaration(stmt) || ts.isInterfaceDeclaration(stmt)) {
      const name = stmt.name.getText(sf);
      if (!name.endsWith('StoryProps') && !name.endsWith('PreviewProps') && name !== 'Args') {
        topLevelHelpers.push(stmt.getText(sf).trim());
      }
    } else if (ts.isVariableStatement(stmt)) {
      const isExport = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (isExport) {
        const decl = stmt.declarationList.declarations[0];
        if (
          decl &&
          decl.name.getText(sf) === 'story' &&
          decl.initializer &&
          ts.isCallExpression(decl.initializer)
        ) {
          const arg = decl.initializer.arguments[0];
          if (arg && ts.isObjectLiteralExpression(arg)) {
            const compProp = arg.properties.find(
              (p): p is ts.PropertyAssignment =>
                ts.isPropertyAssignment(p) && p.name.getText(sf) === 'Component',
            );
            if (compProp) {
              directCompName = compProp.initializer.getText(sf);
            }
            const argsProp = arg.properties.find(
              (p): p is ts.PropertyAssignment =>
                ts.isPropertyAssignment(p) && p.name.getText(sf) === 'args',
            );
            if (argsProp) {
              const initExpr = argsProp.initializer;
              let initialObj: ts.ObjectLiteralExpression | null = null;
              if (ts.isObjectLiteralExpression(initExpr)) {
                const initP = initExpr.properties.find(
                  (p): p is ts.PropertyAssignment =>
                    ts.isPropertyAssignment(p) && p.name.getText(sf) === 'initial',
                );
                if (initP && ts.isObjectLiteralExpression(initP.initializer)) {
                  initialObj = initP.initializer;
                }
              } else if (ts.isArrayLiteralExpression(initExpr) && initExpr.elements.length > 0) {
                const firstEl = initExpr.elements[0];
                if (ts.isObjectLiteralExpression(firstEl)) {
                  const initP = firstEl.properties.find(
                    (p): p is ts.PropertyAssignment =>
                      ts.isPropertyAssignment(p) && p.name.getText(sf) === 'initial',
                  );
                  if (initP && ts.isObjectLiteralExpression(initP.initializer)) {
                    initialObj = initP.initializer;
                  }
                }
              }
              if (initialObj) {
                for (const prop of initialObj.properties) {
                  if (ts.isPropertyAssignment(prop)) {
                    initialDefaults.set(prop.name.getText(sf), prop.initializer.getText(sf));
                  }
                }
              }
            }
          }
        }
      } else {
        topLevelHelpers.push(stmt.getText(sf).trim());
      }
    }
  });

  for (const fi of fixtureImports) {
    if (!imports.includes(fi)) imports.push(fi);
  }

  const mainFn = allFns.length > 0 ? allFns[allFns.length - 1] : null;
  for (const helperFn of allFns.slice(0, -1)) {
    const hName = helperFn.name?.text ?? 'Helper';
    const hBody: string[] = [];
    for (const s of helperFn.body?.statements ?? []) {
      if (ts.isReturnStatement(s) && s.expression) {
        const unwrapped = unwrapShell(s.expression);
        if (
          ts.isJsxElement(unwrapped) ||
          ts.isJsxSelfClosingElement(unwrapped) ||
          ts.isJsxFragment(unwrapped)
        ) {
          hBody.push(`  return (\n${printJsx(unwrapped, 2)}\n  );`);
        } else {
          hBody.push(`  return ${unwrapped.getText(sf)};`);
        }
      } else {
        hBody.push(`  ${s.getText(sf).trim()}`);
      }
    }
    const hParams = helperFn.parameters.map((p) => p.getText(sf)).join(', ');
    topLevelHelpers.push(`function ${hName}(${hParams}) {\n${hBody.join('\n')}\n}`);
  }

  if (!mainFn && directCompName) {
    return `${imports.join('\n')}\n\nexport function ${directCompName}Example() {\n  return <${directCompName} />;\n}`;
  }
  if (!mainFn) return imports.join('\n');

  const fnDecl = mainFn;
  const fnName = (fnDecl.name?.text ?? 'Example').replace(/Story$|Preview$/, 'Example');
  let sigParams = '';
  if (fnDecl.parameters.length > 0 && ts.isObjectBindingPattern(fnDecl.parameters[0].name)) {
    const bindings: string[] = [];
    const typeProps: string[] = [];
    const paramTypeNode = fnDecl.parameters[0].type;
    let inlineTypeMap = new Map<string, string>();
    if (paramTypeNode && ts.isTypeLiteralNode(paramTypeNode)) {
      for (const m of paramTypeNode.members) {
        if (ts.isPropertySignature(m) && m.name && m.type) {
          inlineTypeMap.set(m.name.getText(sf), m.type.getText(sf).replace(/\s+/g, ' ').trim());
        }
      }
    } else if (paramTypeNode && ts.isTypeReferenceNode(paramTypeNode)) {
      const refName = paramTypeNode.typeName.getText(sf);
      sf.forEachChild((n) => {
        if (ts.isTypeAliasDeclaration(n) && n.name.getText(sf) === refName && ts.isTypeLiteralNode(n.type)) {
          for (const m of n.type.members) {
            if (ts.isPropertySignature(m) && m.name && m.type) {
              inlineTypeMap.set(m.name.getText(sf), m.type.getText(sf).replace(/\s+/g, ' ').trim());
            }
          }
        }
      });
    }
    for (const el of fnDecl.parameters[0].name.elements) {
      const name = el.name.getText(sf);
      const initVal = el.initializer
        ? el.initializer.getText(sf).replace(/\s+/g, ' ').trim()
        : initialDefaults.get(name);
      bindings.push(initVal !== undefined ? `${name} = ${initVal}` : name);
      const t = inlineTypeMap.get(name);
      if (t) {
        typeProps.push(`${name}?: ${t}`);
      }
    }
    if (bindings.length > 0 && typeProps.length === bindings.length) {
      sigParams = `{\n  ${bindings.join(',\n  ')},\n}: {\n  ${typeProps.join(';\n  ')};\n} = {}`;
    } else if (bindings.length > 0) {
      sigParams = `{ ${bindings.join(', ')} } = {}`;
    }
  }

  const bodyLines: string[] = [];
  for (const s of fnDecl.body?.statements ?? []) {
    if (
      ts.isExpressionStatement(s) &&
      ts.isCallExpression(s.expression) &&
      s.expression.expression.getText(sf) === 'useEffect'
    ) {
      continue;
    }
    if (ts.isReturnStatement(s) && s.expression) {
      const unwrapped = unwrapShell(s.expression);
      if (
        ts.isJsxElement(unwrapped) ||
        ts.isJsxSelfClosingElement(unwrapped) ||
        ts.isJsxFragment(unwrapped)
      ) {
        const rendered = printJsx(unwrapped, 2);
        if (!rendered.includes('\n') && rendered.trim().length <= 64) {
          bodyLines.push(`  return ${rendered.trim()};`);
        } else {
          bodyLines.push(`  return (\n${rendered}\n  );`);
        }
      } else {
        bodyLines.push(`  return ${unwrapped.getText(sf)};`);
      }
    } else {
      const txt = s.getText(sf).replace(/\s+/g, ' ').trim();
      if (txt.length <= 76) {
        bodyLines.push(`  ${txt}`);
      } else {
        bodyLines.push(`  ${s.getText(sf).trim()}`);
      }
    }
  }

  const preamble = [...fixtureBlocks, ...topLevelHelpers].join('\n\n');
  return `${imports.join('\n')}${preamble ? '\n\n' + preamble : ''}\n\nexport function ${fnName}(${sigParams}) {\n${bodyLines.join('\n')}\n}`;
}

const PACKAGE_IMPORT_OVERRIDES: Record<string, string> = {
  'chart-evilcharts-ui-chart': '@tailrocks/framerock/charts/evilcharts/ui/chart',
  'chart-evilcharts-ui-dot': '@tailrocks/framerock/charts/evilcharts/ui/dot',
  'chart-evilcharts-ui-zoom': '@tailrocks/framerock/charts/evilcharts/ui/zoom',
};

function getStoryMeta(storyPath: string): { registryItem: string; pkgImport: string } {
  const src = readFileSync(storyPath, 'utf8');
  const slug = path.basename(storyPath, '.story.tsx');
  const regMatch = src.match(/registryItem:\s*['"]([^'"]+)['"]/);
  const registryItem = regMatch ? regMatch[1] : 'framerock';
  if (PACKAGE_IMPORT_OVERRIDES[registryItem]) {
    return { registryItem, pkgImport: PACKAGE_IMPORT_OVERRIDES[registryItem] };
  }
  const pkgMatches = [...src.matchAll(/from\s+['"](@tailrocks\/framerock\/[^'"]+)['"]/g)].map(
    (m) => m[1],
  );
  const exactSlugMatch = pkgMatches.find((p) => p.endsWith(`/${slug}`));
  const pkgImport = exactSlugMatch ?? pkgMatches[0] ?? '@tailrocks/framerock';
  return { registryItem, pkgImport };
}

function extractBlockApiSection(slug: string, storyPath: string): string {
  const storySrc = readFileSync(storyPath, 'utf8');
  const pkgMatch = storySrc.match(
    /import\s+\{([^}]+)\}\s+from\s+['"](@tailrocks\/framerock\/blocks\/[^'"]+)['"]/,
  );
  const pkgPath = pkgMatch ? pkgMatch[2] : '@tailrocks/framerock/blocks';
  let dsRel = path.join(
    ROOT,
    pkgPath.replace('@tailrocks/framerock/', 'packages/design-system/src/') + '.tsx',
  );
  if (!existsSync(dsRel)) {
    dsRel = path.join(
      ROOT,
      pkgPath.replace('@tailrocks/framerock/', 'packages/design-system/src/'),
      'hero.tsx',
    );
  }
  const src = readFileSync(dsRel, 'utf8');
  const sf = ts.createSourceFile(dsRel, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const typeMap = new Map<string, ts.TypeAliasDeclaration | ts.InterfaceDeclaration>();
  const compName = pkgMatch ? pkgMatch[1].split(',')[0].trim() : 'Block';
  let paramTypeNode: ts.TypeNode | null = null;

  sf.forEachChild((node) => {
    if ((ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && node.name) {
      typeMap.set(node.name.text, node);
    }
    const isExport = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (isExport && ts.isFunctionDeclaration(node) && node.name) {
      if (node.name.text === compName || !paramTypeNode) {
        if (node.name.text !== 'useThemeHotkey') {
          paramTypeNode = node.parameters[0]?.type || null;
        }
      }
    }
  });

  let members: ts.NodeArray<ts.TypeElement> | readonly ts.TypeElement[] = [];
  if (paramTypeNode) {
    if (ts.isTypeLiteralNode(paramTypeNode)) {
      members = paramTypeNode.members;
    } else if (ts.isTypeReferenceNode(paramTypeNode)) {
      const refName = paramTypeNode.typeName.getText(sf);
      const decl = typeMap.get(refName);
      if (decl && ts.isInterfaceDeclaration(decl)) {
        members = decl.members;
      } else if (decl && ts.isTypeAliasDeclaration(decl) && ts.isTypeLiteralNode(decl.type)) {
        members = decl.type.members;
      }
    }
  }

  const rows: string[] = [];
  if (members.length === 0) {
    rows.push(
      `| \`${compName}\` | \`—\` | \`—\` | Self-contained block component requiring no required props. |`,
    );
  } else {
    members.forEach((m, idx) => {
      if (!ts.isPropertySignature(m) || !m.name) return;
      const rawName = m.name.getText(sf);
      const propName = rawName + (m.questionToken ? '?' : '');
      const propType = m.type
        ? m.type.getText(sf).replace(/\s+/g, ' ').replace(/\|/g, '\\|')
        : 'unknown';
      const desc = (
        BLOCK_PROP_DESCRIPTIONS[rawName] || `Configures \`${rawName}\`.`
      ).replace(/\|/g, '\\|');
      rows.push(
        `| ${idx === 0 ? `\`${compName}\`` : ''} | \`${propName}\` | \`${propType}\` | ${desc} |`,
      );
    });
  }

  return `## Public API\n\n| Export | Prop | Type | Description |\n| :--- | :--- | :--- | :--- |\n${rows.join('\n')}`;
}

function buildRegistrySection(
  category: string,
  slug: string,
  registryItem: string,
  pkgImport: string,
): string {
  const storyRel = `apps/docs/src/stories/${category}/${slug}.story.tsx`;
  return `## Source and registry

- **Package import**: \`${pkgImport}\`
- **Registry item**: \`${registryItem}\` ([payload JSON](/r/${registryItem}.json))
- **Story source**: \`${storyRel}\`

\`\`\`bash
npx shadcn@latest add http://localhost:3000/r/${registryItem}.json
\`\`\``;
}

function fixChartTablePropDescriptions(tableSection: string): string {
  const lines = tableSection
    .split('\n')
    .filter((line) => !line.startsWith('| `ChartBackground` |'));
  let currentExport = '';
  return lines
    .map((line) => {
      if (!line.startsWith('|')) return line;
      const cells = line.split('|');
      const expCell = (cells[1] || '').trim();
      if (expCell.startsWith('`') && expCell.endsWith('`')) {
        currentExport = expCell.slice(1, -1);
      }
      if (
        (currentExport === 'Area' || currentExport === 'Bar' || currentExport === 'Line') &&
        line.includes('`isClickable`')
      ) {
        return line.replace(
          'Enables pointer selection for legend items.',
          'Enables pointer selection on the series mark.',
        );
      }
      return line;
    })
    .join('\n');
}

function fixWidgetTablePropDescriptions(slug: string, sectionText: string): string {
  if (WIDGET_API_OVERRIDES[slug]) {
    return WIDGET_API_OVERRIDES[slug];
  }
  return sectionText
    .replace(
      /\nThe table lists public exports used by this story\. Prop names and TypeScript types come from the design-system source\.\n/g,
      '\n',
    )
    .replace(
      /\|\s*`size`\s*\|\s*`"xs" \\\| "sm" \\\| "md" \\\| undefined`\s*\|\s*Selects the rendered icon size\.\s*\|/g,
      '| | `size` | `"xs" \\| "sm" \\| "md" \\| undefined` | Project badge size preset (`"xs"` \\| `"sm"` \\| `"md"`). |',
    )
    .replace(
      /\|\s*`createMockHudStream`\s*\|\s*`initialEvents`\s*\|\s*`readonly HudEvent\[\]`\s*\|\s*Argument accepted by createMockHudStream\.\s*\|/g,
      '| `createMockHudStream` | `initialEvents` | `readonly HudEvent[]` | Initial HUD events replayed by the local mock stream. |',
    );
}

interface DocPageSummary {
  category: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  registryItem?: string;
  pkgImport?: string;
}

const docSummaries: DocPageSummary[] = [];
let updatedCount = 0;

for (const category of ['primitives', 'widgets', 'charts', 'figures', 'blocks']) {
  const catDir = path.join(DOCS_DIR, category);
  const files = readdirSync(catDir)
    .filter((f) => f.endsWith('.mdx'))
    .sort();

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const mdxPath = path.join(catDir, file);
    const storyPath = path.join(STORIES_DIR, category, `${slug}.story.tsx`);
    const { registryItem, pkgImport } = getStoryMeta(storyPath);
    const usageCode = formatStoryUsage(storyPath, category, slug);
    const registrySection = buildRegistrySection(category, slug, registryItem, pkgImport);

    const raw = readFileSync(mdxPath, 'utf8').replace(/\r\n/g, '\n');
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
    if (!fmMatch) {
      throw new Error(`Missing frontmatter in ${mdxPath}`);
    }

    const fmBody = fmMatch[1];
    const titleMatch = fmBody.match(/^title:\s*(.+)$/m);
    const descMatch = fmBody.match(/^description:\s*(.+)$/m);
    let title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : slug;
    let description = descMatch ? descMatch[1].trim().replace(/^["']|["']$/g, '') : '';

    if (category === 'widgets' && WIDGET_TITLES[slug]) {
      title = WIDGET_TITLES[slug];
    }
    if (category === 'blocks' && slug === 'app-shell-block') {
      title = 'App Shell';
    }
    if (category === 'blocks' && BLOCK_DESCRIPTIONS[slug]) {
      description = BLOCK_DESCRIPTIONS[slug];
    }
    if (category === 'primitives' && slug === 'calendar') {
      description =
        'DayPicker calendar with Framerock button styling, chevrons, and range selection states.';
    }
    if (category === 'widgets' && slug === 'brand-mark') {
      description = 'Renders the Framerock three-frame architectural brand mark.';
    }
    if (category === 'widgets' && slug === 'data-table') {
      description =
        'Composes the table toolbar, search, filter, sorting, and pagination helpers used by Framerock tables.';
    }

    const frontmatter = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---`;
    const storyImport = `import { story } from '../../../src/stories/${category}/${slug}.story';`;

    const bodyAfterFm = raw.slice(fmMatch[0].length);

    let middleSections = '';

    if (category === 'primitives') {
      const apiIdx = bodyAfterFm.indexOf('## API and props');
      const exIdx = bodyAfterFm.indexOf('## Example');
      const usageIdx = bodyAfterFm.indexOf('## Usage');
      const endApiIdx = exIdx !== -1 ? exIdx : usageIdx;
      if (apiIdx !== -1 && endApiIdx !== -1) {
        middleSections = bodyAfterFm
          .slice(apiIdx, endApiIdx)
          .replace(/\nThe table lists values exported from [^\n]+\n/g, '\n')
          .trim();
      }
      middleSections += `\n\n## Usage\n\n\`\`\`tsx\n${usageCode}\n\`\`\``;
    } else if (category === 'widgets') {
      const pubIdx = bodyAfterFm.indexOf('## Public API');
      const srcIdx = bodyAfterFm.indexOf('## Source and registry');
      const usageIdx = bodyAfterFm.indexOf('## Usage');
      const endPubIdx = usageIdx !== -1 ? usageIdx : srcIdx;
      let pubSection =
        pubIdx !== -1 && endPubIdx !== -1 ? bodyAfterFm.slice(pubIdx, endPubIdx).trim() : '';
      const reqIdx = pubSection.indexOf('\n## Requirements');
      if (WIDGET_API_OVERRIDES[slug]) {
        const reqPart = reqIdx !== -1 ? '\n\n' + pubSection.slice(reqIdx + 1).trim() : '';
        const cleanedReq =
          slug === 'project-provider'
            ? reqPart.replace(/\n\| Provider prop[\s\S]*$/, '').trim()
            : reqPart;
        pubSection = WIDGET_API_OVERRIDES[slug] + (cleanedReq ? '\n\n' + cleanedReq : '');
      } else {
        pubSection = fixWidgetTablePropDescriptions(slug, pubSection);
      }
      middleSections = `${pubSection.trim()}\n\n## Usage\n\n\`\`\`tsx\n${usageCode}\n\`\`\``;
    } else if (category === 'charts') {
      const pubIdx = bodyAfterFm.indexOf('## Public API');
      const srcIdx = bodyAfterFm.indexOf('## Source and registry');
      const usageIdx = bodyAfterFm.indexOf('## Usage');
      const endPubIdx = usageIdx !== -1 ? usageIdx : srcIdx;
      let pubSection =
        pubIdx !== -1 && endPubIdx !== -1 ? bodyAfterFm.slice(pubIdx, endPubIdx).trim() : '';
      const reqIdx = pubSection.indexOf('\n## Requirements');
      const reqPart =
        reqIdx !== -1
          ? pubSection
              .slice(reqIdx + 1)
              .replace(/\n\| `ChartContainer` prop[\s\S]*$/, '')
              .replace(/\n\| Hook input[\s\S]*$/, '')
              .trim()
          : '';
      if (CHART_API_OVERRIDES[slug]) {
        pubSection = CHART_API_OVERRIDES[slug] + (reqPart ? '\n\n' + reqPart : '');
      } else {
        pubSection = fixChartTablePropDescriptions(
          pubSection.replace(
            /\nThe table lists public exports used by this story\. Prop names and TypeScript types come from the design-system source\.\n/g,
            '\n',
          ),
        );
      }
      middleSections = `${pubSection.trim()}\n\n## Usage\n\n\`\`\`tsx\n${usageCode}\n\`\`\``;
    } else if (category === 'figures') {
      const selIdx = bodyAfterFm.indexOf('## Selection and rendering');
      const usageIdx = bodyAfterFm.indexOf('## Usage');
      const hrIdx = bodyAfterFm.indexOf('\n---');
      const endSelIdx = usageIdx !== -1 ? usageIdx : hrIdx !== -1 ? hrIdx : bodyAfterFm.length;
      let selSection = selIdx !== -1 ? bodyAfterFm.slice(selIdx, endSelIdx).trim() : '';
      selSection = selSection
        .replace(
          /\nThe story is `apps\/docs\/src\/stories\/figures\/[^`]+`\.\s*The registry route is `\/r\/[^`]+` on the portal origin\.\s*$/m,
          '',
        )
        .trim();
      middleSections = `${selSection}\n\n## Usage\n\n\`\`\`tsx\n${usageCode}\n\`\`\``;
    } else if (category === 'blocks') {
      const apiSection = extractBlockApiSection(slug, storyPath);
      middleSections = `${apiSection}\n\n## Usage\n\n\`\`\`tsx\n${usageCode}\n\`\`\``;
    }

    const nextContent = `${frontmatter}

${storyImport}

<story.WithControl />

${middleSections.trim()}

${registrySection}
`;

    writeFileSync(mdxPath, nextContent, 'utf8');
    docSummaries.push({
      category,
      slug,
      url: `/docs/${category}/${slug}`,
      title,
      description,
      registryItem,
      pkgImport,
    });
    updatedCount++;
  }
}

// Generate apps/docs/public/llms.txt
const llmsLines: string[] = [
  '# Framerock Design System (@tailrocks/framerock)',
  '',
  '> Standalone React 19, Base UI, Tailwind CSS v4, and shadcn-compatible design system and component registry extracted and decoupled under Apache-2.0 from the open-source Foglamp project (`foglamp-labs/foglamp` at commit `7d7e6609108019a74902858d4b07c24825c6318b`).',
  '',
  '## Attribution & License',
  '',
  '- **Original Design & Engineering**: Gustavo Fior (@gustavo-fior — https://gustavofior.com, https://github.com/gustavo-fior, https://x.com/heyimgustavo), co-founder Abdul Haidar (https://www.linkedin.com/in/abdulhdr/), and Foglamp Labs (https://foglamp.dev).',
  '- **Upstream Repository**: https://github.com/foglamp-labs/foglamp (`7d7e6609108019a74902858d4b07c24825c6318b`)',
  '- **License**: Apache License 2.0 (`Apache-2.0`)',
  '- **Standalone Package & Registry Adaptation**: Tailrocks (https://github.com/tailrocks)',
  '',
  '## Installation & Registry Endpoints',
  '',
  '- **Package**: `@tailrocks/framerock`',
  '- **Stylesheet**: `@tailrocks/framerock/styles/globals.css`',
  '- **Registry Index (shadcn)**: `/r/registry.json` and `/r/framerock.json`',
  '- **Story Provenance Catalog**: `/r/story-items.json`',
  '- **Install Individual Item via CLI**: `npx shadcn@latest add http://localhost:3000/r/<registry-item>.json`',
  '',
  '## Foundations & Overview',
  '',
  '- [Framerock Design System](/docs): Overview, categories, and open-source origin.',
  '- [Origin, Inspiration & Open-Source Attribution](/docs/credits): Full Apache-2.0 attribution and provenance breakdown.',
  '- [Tokens](/docs/foundations/tokens): OKLCH light and dark color tokens, chart palettes, and elevation variables.',
  '- [Typography](/docs/foundations/typography): Inter Variable, Host Grotesk display, and Geist Mono tabular numeric scales.',
  '- [Geometry & Squircles](/docs/foundations/geometry): Corner superellipse (`corner-squircle`) and radius token rules.',
  '- [Motion](/docs/foundations/motion): Spring and cubic-bezier entrance, hover, and layout choreography.',
  '- [Architecture](/docs/foundations/architecture): Router-agnostic `FramerockLinkProvider` and headless data-prop contracts.',
  '- [Installation](/docs/foundations/installation): Workspace package and shadcn registry installation guide.',
  '',
];

const categoryHeadings: Record<string, string> = {
  primitives: '## UI Primitives (56 Components)',
  widgets: '## Observability & App Widgets (53 Components)',
  charts: '## EvilCharts Visualizations (11 Components)',
  figures: '## Marketing Figures (22 Components)',
  blocks: '## Full-Page & Section Blocks (25 Components)',
};

for (const category of ['primitives', 'widgets', 'charts', 'figures', 'blocks']) {
  llmsLines.push(categoryHeadings[category], '');
  for (const page of docSummaries.filter((d) => d.category === category)) {
    llmsLines.push(
      `- [${page.title}](${page.url}): ${page.description} (Import: \`${page.pkgImport}\`, Registry: [\`/r/${page.registryItem}.json\`](/r/${page.registryItem}.json))`,
    );
  }
  llmsLines.push('');
}

llmsLines.push('## Registry Items Catalog', '');
for (const item of catalog.items) {
  llmsLines.push(
    `- [\`/r/${item.registryItem}.json\`](/r/${item.registryItem}.json) — **${item.title}** (\`${item.type}\`, source: \`${item.source}\`, provenance: \`${item.provenanceLabel}\`)`,
  );
}
llmsLines.push('');

writeFileSync(LLMS_TXT_FILE, llmsLines.join('\n'), 'utf8');

// AST-based verification of MDX API table exports and TSX code fences across all 175 MDX pages
const BUILTINS = new Set([
  'Array',
  'Boolean',
  'CustomEvent',
  'Date',
  'Error',
  'Event',
  'Generator',
  'HTMLAnchorElement',
  'HTMLButtonElement',
  'HTMLDivElement',
  'HTMLElement',
  'HTMLInputElement',
  'JSON',
  'JSX',
  'KeyboardEvent',
  'Map',
  'Math',
  'MouseEvent',
  'Number',
  'Object',
  'Partial',
  'Promise',
  'React',
  'ReactElement',
  'ReactNode',
  'Readonly',
  'ReadonlySet',
  'Record',
  'RegExp',
  'SVGProps',
  'SVGSVGElement',
  'Set',
  'String',
  'Symbol',
  'URL',
  'URLSearchParams',
  'Uint8Array',
  'Window',
  'console',
  'const',
  'document',
  'false',
  'fetch',
  'globalThis',
  'Infinity',
  'isFinite',
  'isNaN',
  'localStorage',
  'NaN',
  'navigator',
  'null',
  'parseFloat',
  'parseInt',
  'performance',
  'process',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'setInterval',
  'clearInterval',
  'setTimeout',
  'clearTimeout',
  'true',
  'undefined',
  'window',
]);

function collectBindingIdentifiers(name: ts.BindingName, out: Set<string>) {
  if (ts.isIdentifier(name)) {
    out.add(name.text);
  } else if (ts.isObjectBindingPattern(name)) {
    for (const el of name.elements) collectBindingIdentifiers(el.name, out);
  } else if (ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) collectBindingIdentifiers(el.name, out);
    }
  }
}

function collectFenceUnboundIdentifiers(code: string): string[] {
  const sf = ts.createSourceFile('example.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declared = new Set<string>();
  const used = new Set<string>();

  function collectDecl(node: ts.Node) {
    if (ts.isImportClause(node)) {
      if (node.name) declared.add(node.name.text);
      if (node.namedBindings) {
        if (ts.isNamespaceImport(node.namedBindings)) {
          declared.add(node.namedBindings.name.text);
        } else if (ts.isNamedImports(node.namedBindings)) {
          for (const el of node.namedBindings.elements) declared.add(el.name.text);
        }
      }
    } else if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) {
      collectBindingIdentifiers(node.name, declared);
    } else if (
      (ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node)) &&
      node.name
    ) {
      declared.add(node.name.text);
    } else if (ts.isTypeParameterDeclaration(node)) {
      declared.add(node.name.text);
    } else if (ts.isCatchClause(node) && node.variableDeclaration) {
      collectBindingIdentifiers(node.variableDeclaration.name, declared);
    }
    ts.forEachChild(node, collectDecl);
  }

  function isDeclOrLabelIdentifier(node: ts.Identifier): boolean {
    const parent = node.parent;
    if (!parent) return false;
    if (
      ts.isImportClause(parent) ||
      ts.isImportSpecifier(parent) ||
      ts.isNamespaceImport(parent) ||
      ts.isExportSpecifier(parent)
    ) {
      return true;
    }
    if (
      (ts.isVariableDeclaration(parent) ||
        ts.isParameter(parent) ||
        ts.isBindingElement(parent) ||
        ts.isFunctionDeclaration(parent) ||
        ts.isFunctionExpression(parent) ||
        ts.isClassDeclaration(parent) ||
        ts.isInterfaceDeclaration(parent) ||
        ts.isTypeAliasDeclaration(parent) ||
        ts.isEnumDeclaration(parent) ||
        ts.isTypeParameterDeclaration(parent) ||
        ts.isMethodDeclaration(parent) ||
        ts.isMethodSignature(parent) ||
        ts.isPropertyDeclaration(parent) ||
        ts.isPropertySignature(parent) ||
        ts.isEnumMember(parent)) &&
      parent.name === node
    ) {
      return true;
    }
    if (ts.isPropertyAssignment(parent) && parent.name === node) return true;
    if (ts.isJsxAttribute(parent) && parent.name === node) return true;
    if (ts.isPropertyAccessExpression(parent) && parent.name === node) return true;
    if (ts.isQualifiedName(parent) && parent.right === node) return true;
    if (
      (ts.isJsxOpeningElement(parent) ||
        ts.isJsxSelfClosingElement(parent) ||
        ts.isJsxClosingElement(parent)) &&
      parent.tagName === node &&
      /^[a-z]/.test(node.text)
    ) {
      return true;
    }
    return false;
  }

  function collectUse(node: ts.Node) {
    if (ts.isIdentifier(node) && !isDeclOrLabelIdentifier(node)) {
      used.add(node.text);
    }
    ts.forEachChild(node, collectUse);
  }

  collectDecl(sf);
  collectUse(sf);
  return [...used].filter((name) => !declared.has(name) && !BUILTINS.has(name)).sort();
}

function walkMdx(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, acc);
    else if (entry.name.endsWith('.mdx')) acc.push(full);
  }
  return acc.sort();
}

for (const mdxFile of walkMdx(DOCS_DIR)) {
  const text = readFileSync(mdxFile, 'utf8');
  const fenceRe = /```tsx\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = fenceRe.exec(text)) !== null) {
    idx++;
    const unbound = collectFenceUnboundIdentifiers(match[1]);
    if (unbound.length > 0) {
      throw new Error(
        `Unbound identifier(s) in ${path.relative(ROOT, mdxFile)} fence #${idx}: ${unbound.join(', ')}`,
      );
    }
  }
}

console.log(`Synchronized ${updatedCount} component MDX pages, verified all TSX fences via AST, and generated apps/docs/public/llms.txt.`);
