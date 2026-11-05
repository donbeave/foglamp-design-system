/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

export * from './ui/accordion';
export * from './ui/alert-dialog';
export * from './ui/alert';
export * from './ui/aspect-ratio';
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge } from './ui/avatar';
export * from './ui/badge';
export * from './ui/breadcrumb';
export * from './ui/button-group';
export * from './ui/button';
export * from './ui/calendar';
export * from './ui/card';
export * from './ui/carousel';
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from './ui/chart';
export * from './ui/checkbox';
export * from './ui/collapsible';
export * from './ui/combobox';
export * from './ui/command';
export * from './ui/context-menu';
export * from './ui/dialog';
export * from './ui/direction';
export * from './ui/drawer';
export * from './ui/dropdown-menu';
export * from './ui/empty';
export * from './ui/field';
export * from './ui/hover-card';
export * from './ui/input-group';
export * from './ui/input-otp';
export * from './ui/input';
export * from './ui/item';
export * from './ui/kbd';
export * from './ui/label';
export * from './ui/loader';
export * from './ui/menubar';
export * from './ui/native-select';
export * from './ui/navigation-menu';
export * from './ui/pagination';
export * from './ui/popover';
export * from './ui/progress';
export * from './ui/radio-group';
export * from './ui/resizable';
export * from './ui/scroll-area';
export * from './ui/select';
export * from './ui/separator';
export * from './ui/sheet';
export * from './ui/sidebar';
export * from './ui/skeleton';
export * from './ui/slider';
export * from './ui/sonner';
export * from './ui/spinner';
export * from './ui/switch';
export * from './ui/table';
export * from './ui/tabs';
export * from './ui/textarea';
export * from './ui/toggle-group';
export * from './ui/toggle';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';
export { DRAWER_BUTTON_CLASS } from './ui/button-styles';
export { cn } from './lib/utils';
export {
  FramerockLink,
  FramerockLinkProvider,
  useFramerockLink,
  type FramerockLinkProps,
  type FramerockLinkProviderProps,
  /** @deprecated Use FramerockLink. */
  FoglampLink,
  /** @deprecated Use FramerockLinkProvider. */
  FoglampLinkProvider,
  /** @deprecated Use useFramerockLink. */
  useFoglampLink,
  /** @deprecated Use FramerockLinkProps. */
  type FoglampLinkProps,
  /** @deprecated Use FramerockLinkProviderProps. */
  type FoglampLinkProviderProps,
} from './lib/link-context';
export { useCopied } from './hooks/use-copied';
export { useIsMobile } from './hooks/use-mobile';
export * from './icons/brand-logos';
export { BrandMark as BrandIcon } from './icons/brand-mark';
export { Logo as FoglampLogo } from './icons/logo';
export { ModelLogo as ModelIcon } from './icons/model-logo';
export { resolveVendorKey, resolveModelLogo, formatModelName as formatIconModelName, modelBrandColor } from './icons/model-logo';
export * from './lib/format';
export * from './lib/range';
export * from './lib/trace-timeline';
export * from './lib/payload-messages';
export * from './lib/prompts/diff';
export * from './lib/prompts/infer';
export * from './lib/prompts/slots';
export * from './lib/scan/alerts';
export * from './lib/scan/diff';
export * from './lib/scan/fold-graph';
export * from './lib/scan/instrumentation';
export * from './lib/scan/layout';
export * from './lib/scan/personality';
export * from './lib/scan/scan';
export * from './lib/scan/v1';
export type * from './lib/types';
export * from './widgets/leaf/agent-icon';
export * from './widgets/leaf/copy-button';
export * from './widgets/leaf/copy-icon';
export * from './widgets/leaf/customer-avatar';
export * from './widgets/leaf/node-flow';
export * from './widgets/leaf/project-icon';
export * from './widgets/leaf/relative-time';
export { BrandMark as ScanBrandMark, Favicon as ScanFavicon, ModelIcon as ScanModelIcon } from './widgets/leaf/scan-brand';
export * from './widgets/leaf/span-type';
export * from './widgets/leaf/stat';
export { SunsetCard as LeafSunsetCard } from './widgets/leaf/sunset-card';
export * from './widgets/leaf/tool-icon';
export * from './widgets/leaf/preset-meta';
export * from './widgets/page-parts';
export * from './widgets/range-picker';
export * from './widgets/range-context';
export * from './widgets/project-context';
export * from './widgets/route-header';
export * from './widgets/header-slot';
export * from './widgets/quota-card';
export * from './widgets/theme-switcher';
export * from './widgets/user-menu';
export * from './widgets/context-chip';
export * from './widgets/model-chip';
export * from './widgets/prompt-version-chip';
export { CodeBlock as AppCodeBlock } from './widgets/code-block';
export { markdownComponents as AppMarkdownComponents } from './widgets/markdown';
export * from './widgets/animated-api-key';
export * from './widgets/cost-breakdown';
export * from './widgets/data-table';
export * from './widgets/dev-toolbar';
export * from './widgets/eval-scores';
export * from './widgets/heat-cell';
export * from './widgets/payload-view';
export * from './widgets/prompt-prose';
export * from './widgets/prompt-versions-card';
export * from './widgets/run-exchange';
export * from './widgets/tool-breakdown';
export * from './widgets/trace-timeline';
export * from './widgets/trend-charts';
export * from './widgets/foggy';
export { EvilAreaChart, Area as EvilArea, Dot as EvilAreaDot, ActiveDot as EvilAreaActiveDot, XAxis as EvilAreaXAxis, YAxis as EvilAreaYAxis, Grid as EvilAreaGrid, Tooltip as EvilAreaTooltip, Threshold as EvilAreaThreshold, Legend as EvilAreaLegend, useLoadingData as useAreaLoadingData } from './charts/evilcharts/charts/area-chart';
export { EvilBarChart, Bar as EvilBar, XAxis as EvilBarXAxis, YAxis as EvilBarYAxis, Grid as EvilBarGrid, Tooltip as EvilBarTooltip, Threshold as EvilBarThreshold, Legend as EvilBarLegend, useLoadingData as useBarLoadingData } from './charts/evilcharts/charts/bar-chart';
export * from './charts/evilcharts/charts/donut-chart';
export { EvilLineChart, Line as EvilLine, Dot as EvilLineDot, ActiveDot as EvilLineActiveDot, XAxis as EvilLineXAxis, YAxis as EvilLineYAxis, Grid as EvilLineGrid, Tooltip as EvilLineTooltip, Threshold as EvilLineThreshold, Legend as EvilLineLegend, useLoadingData as useLineLoadingData } from './charts/evilcharts/charts/line-chart';
export * from './charts/evilcharts/ui/background';
export { useChart, getPayloadConfigFromPayload, getLoadingData, ChartContainer as EvilChartContainer, ChartStyle as EvilChartStyle, type ChartConfig as EvilChartConfig } from './charts/evilcharts/ui/chart';
export * from './charts/evilcharts/ui/dot';
export * from './charts/evilcharts/ui/evil-brush';
export { ChartLegend as EvilChartLegend, ChartLegendContent as EvilChartLegendContent, type ChartLegendVariant } from './charts/evilcharts/ui/legend';
export { ChartTooltip as EvilChartTooltip, ChartTooltipContent as EvilChartTooltipContent, type TooltipRoundness, type TooltipVariant } from './charts/evilcharts/ui/tooltip';
export * from './charts/evilcharts/ui/zoom';
export { LoginFormBlock } from './blocks/auth/login-form';
export { DeviceApproveBlock } from './blocks/auth/device-approve';
export { OnboardingPanel, OnboardingPanelBlock, type OnboardingPanelBlockProps } from './blocks/auth/onboarding-panel';
export { InstrumentEmptyStateBlock } from './blocks/auth/instrument-empty-state';
export { ButtonsBadgesPlaygroundBlock } from './blocks/auth/buttons-badges';
export { AppShellBlock, NewProjectDialog, SunsetCard as AppShellSunsetCard, type AppShellBlockProps, type NewProjectInput } from './blocks/app-shell';
export * from './blocks/dashboard';
export * from './blocks/guide';
export * from './blocks/setup';
export * from './blocks/scan';
export { FigureKit22Block, type FigureKit22BlockProps } from './blocks/marketing/figures/figure-kit-22-block';
export { FIGURES, type Section, type Variant } from './blocks/marketing/figures/figures';
export { Figure, FigureVariant } from './blocks/marketing/figures/figure-picker';
export { FEATURES, CUSTOMERS_OUTLINE_ICON, FeatureList, openFeature, type FeatureId } from './blocks/marketing/figures/features';
export { Scene, BreakdownRow, BreakdownCard, CostCards, TraceStory, QualityReview, Logo as FigureLogo } from './blocks/marketing/figures/figures-scenes';
export { CostStair, CostFan, CostShelf, CostTotal, CostChart, CostAlert, CostTable, CostTabs, CostShares, CostBackdrop, CostDonut, CostArea, CostSmall, CostFlow } from './blocks/marketing/figures/figures-costs';
export { TraceChat, TraceXray, TraceSteps, TraceInspector, TraceGraph } from './blocks/marketing/figures/figures-traces';
export { FrameCard, Sparkline, StackedBars, ScoreGauge, PassFailStrip, AlertCardVisual, WaterfallVisual, FlowStripVisual, StatRow } from './blocks/marketing/figures/visuals';
export { FeatureSection, type FeatureSectionProps } from './blocks/marketing/figures/feature-section';
export { ProductHero } from './blocks/marketing/figures/product-hero';
export * from './blocks/marketing/hero';
export { CtaSection, DriftingFogCtaBlock, CompactCtaSection, CopyPromptButton, Faq, AskFoggy, AgentDetails, buildKeyedPrompt, buildLandingPrompt, DOCS_URL, type DriftingFogCtaBlockProps, type CompactCtaSectionProps, type CopyPromptButtonProps, type AskFoggyProps, type AskFoggyRequest } from './blocks/marketing/cta';
export { MarketingNavbar, type MarketingNavbarProps, type MarketingNavLink, CuttingMatFooterBlock, MarketingFooter, CuttingMat, FilmGrain, FogBank, HeroGrain, CodeBlock as MarketingCodeBlock, CopyButton as MarketingCopyButton, BrandMark as MarketingBrandMark, GithubLogo, Logo as MarketingLogo, products, productBySlug, type Product, registerDemo, showInDemo, type DemoTab } from './blocks/marketing/chrome';
export { HudSimulatorBlock } from './blocks/marketing/hud-landing';
export { FoglampHUD } from './hud/FoglampHUD';
export * from './hud';
