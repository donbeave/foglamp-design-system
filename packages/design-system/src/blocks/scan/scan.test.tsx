/** Extraction verification for Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs' Apache-2.0 scan UI. */
import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ScanData } from "../../lib/scan/scan";
import { foldGraph } from "../../lib/scan/fold-graph";
import { edgePath, layoutGraph } from "../../lib/scan/layout";
import { derivePersonality } from "../../lib/scan/personality";
import { FlowMap } from "./flow-map";
import { ScanBoard } from "./scan-board";
import { EmbedBoard } from "./embed-board";
import { PersonalityCard } from "./personality-card";

const data = ScanData.parse({
  version: 1,
  project: { name: "Support", slug: "support", date: "2026-11-05" },
  stats: { agents: 1, models: 1, tools: 0, integrations: 0 },
  topModels: [{ id: "claude", label: "Claude" }],
  graph: {
    nodes: [
      { id: "route", label: "Webhook", kind: "entry" },
      { id: "agent", label: "Support agent", kind: "agent", group: "Support" },
      { id: "model", label: "Claude", kind: "model" },
      { id: "store", label: "Archive", kind: "store" },
    ],
    edges: [
      { from: "route", to: "agent", kind: "triggers" },
      { from: "agent", to: "model", kind: "calls" },
      { from: "agent", to: "store", kind: "writes" },
    ],
  },
});

test("folded model embeds and real ELK layout retain the visible connected flow", async () => {
  const folded = foldGraph(data.graph);
  expect(folded.nodes.find((n) => n.id === "agent")?.embeds.map((n) => n.id)).toContain("model");
  const result = await layoutGraph(folded.nodes.map((n) => ({ ...n, width: 208, height: 56 + n.embeds.length * 24 + (n.embeds.length ? 12 : 0) })), folded.edges);
  expect(result.nodes.map((n) => n.id).sort()).toEqual(["agent", "route", "store"]);
  for (const node of result.nodes) {
    expect(Number.isFinite(node.x)).toBe(true);
    expect(Number.isFinite(node.y)).toBe(true);
  }
  expect(result.edges).toHaveLength(2);
  for (const edge of result.edges) expect(edgePath(edge.points)).toContain("M");
});

test("scan views render supplied project identity, embed link and personality grain", () => {
  const board = renderToStaticMarkup(<ScanBoard data={data} />);
  expect(board).toContain("Claude");
  expect(board).toContain("Powered by");
  const embed = renderToStaticMarkup(<EmbedBoard data={data} slug="support" />);
  expect(embed).toContain('href="/scan/support"');
  const personality = renderToStaticMarkup(<PersonalityCard data={data} />);
  expect(personality).toContain(derivePersonality(data).title);
  expect(personality).toContain('baseFrequency="0.8"');
  expect(() => renderToStaticMarkup(<FlowMap graph={data.graph} focusKinds={null} zoomTo={{ labels: ["Support agent"] }} />)).not.toThrow();
});

test("all seven personality archetypes retain their rendered identity and grain", () => {
  const cases = [
    { title: "Tireless Orchestrator", kind: "agent", count: 8, agents: 8, tools: 0 },
    { title: "Punctual Scheduler", kind: "cron", count: 7, agents: 0, tools: 0 },
    { title: "Boundless Integrator", kind: "external", count: 7, agents: 0, tools: 0 },
    { title: "Crafty Toolsmith", kind: "tool", count: 7, agents: 1, tools: 10 },
    { title: "Meticulous Archivist", kind: "store", count: 7, agents: 0, tools: 0 },
    { title: "Zen Minimalist", kind: "entry", count: 2, agents: 0, tools: 0 },
    { title: "Steady Builder", kind: "service", count: 7, agents: 0, tools: 0 },
  ];
  for (const item of cases) {
    const scan = ScanData.parse({ ...data,
      stats: { ...data.stats, agents: item.agents, tools: item.tools },
      graph: { nodes: Array.from({ length: item.count }, (_, i) => ({ id: `node-${i}`, label: `Node ${i}`, kind: item.kind })), edges: [] },
    });
    const html = renderToStaticMarkup(<PersonalityCard data={scan} />);
    expect(html).toContain(item.title);
    expect(html).toContain('baseFrequency="0.8"');
  }
});
