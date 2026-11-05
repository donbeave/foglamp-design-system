/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/figures.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/figures.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import {
	lazy,
	type ComponentType,
	type LazyExoticComponent,
} from "react";

// The figures for the three benefit sections: a few real product cards laid
// out on the page. They render the app's charts and timeline and depend on
// browser measurement, so each one loads client-only, like the hero demo,
// behind a gap that reserves its space.

export type Section = "costs" | "traces" | "quality";

export type Variant = {
  id: string;
  label: string;
  component: LazyExoticComponent<ComponentType>;
};

type Scenes = typeof import("./figures-scenes");
type Costs = typeof import("./figures-costs");
type Traces = typeof import("./figures-traces");

const scene = (pick: (m: Scenes) => ComponentType) =>
  lazy(() => import("./figures-scenes").then((module) => ({ default: pick(module) })));
const costs = (pick: (m: Costs) => ComponentType) =>
  lazy(() => import("./figures-costs").then((module) => ({ default: pick(module) })));
const traces = (pick: (m: Traces) => ComponentType) =>
  lazy(() => import("./figures-traces").then((module) => ({ default: pick(module) })));

export const FIGURES: Record<Section, Variant[]> = {
  costs: [
    { id: "cards", label: "Cards", component: scene((m) => m.CostCards) },
    { id: "stair", label: "Stair", component: costs((m) => m.CostStair) },
    { id: "fan", label: "Fan", component: costs((m) => m.CostFan) },
    { id: "shelf", label: "Shelf", component: costs((m) => m.CostShelf) },
    { id: "total", label: "Total", component: costs((m) => m.CostTotal) },
    { id: "chart", label: "Chart", component: costs((m) => m.CostChart) },
    { id: "alert", label: "Alert", component: costs((m) => m.CostAlert) },
    { id: "table", label: "Table", component: costs((m) => m.CostTable) },
    { id: "tabs", label: "Tabs", component: costs((m) => m.CostTabs) },
    { id: "shares", label: "Shares", component: costs((m) => m.CostShares) },
    { id: "backdrop", label: "Backdrop", component: costs((m) => m.CostBackdrop) },
    { id: "donut", label: "Donut", component: costs((m) => m.CostDonut) },
    { id: "area", label: "Area", component: costs((m) => m.CostArea) },
    { id: "small", label: "Small", component: costs((m) => m.CostSmall) },
    { id: "flow", label: "Flow", component: costs((m) => m.CostFlow) },
  ],
  traces: [
    { id: "story", label: "Story", component: scene((m) => m.TraceStory) },
    { id: "chat", label: "Chat", component: traces((m) => m.TraceChat) },
    { id: "xray", label: "X-ray", component: traces((m) => m.TraceXray) },
    { id: "steps", label: "Steps", component: traces((m) => m.TraceSteps) },
    { id: "inspector", label: "Inspector", component: traces((m) => m.TraceInspector) },
    { id: "graph", label: "Graph", component: traces((m) => m.TraceGraph) },
  ],
  quality: [
    { id: "review", label: "Review", component: scene((m) => m.QualityReview) },
  ],
};
