# Foglamp Design System

> **Original design by Gustavo Fior ([@gustavo-fior](https://github.com/gustavo-fior), [website](https://gustavofior.com), [@heyimgustavo](https://x.com/heyimgustavo), [LinkedIn](https://www.linkedin.com/in/gustavofior)), co-founder Abdul Haidar ([LinkedIn](https://www.linkedin.com/in/abdulhdr/)), and Foglamp Labs ([foglamp.dev](https://foglamp.dev)).** This design system is extracted **100% AS-IS** from [Foglamp](https://github.com/foglamp-labs/foglamp), licensed under Apache-2.0.

`@foglamp/design-system` provides the original UI primitives, widgets, charts, figures, marketing blocks, dashboard blocks, and utilities. The Fumadocs/Base UI + TanStack Start portal includes reference documentation and interactive stories.

## Workspace status

Waves 0–4 are implemented. Wave 5 static/build verification, live-browser visual QA, and final attribution/parity sign-off are pending. This repository is not marked complete until those gates pass.

## Requirements

- Bun (workspace package manager)
- Node.js compatible with the Vite/TanStack toolchain

## Development

```sh
bun install
bun run dev
```

The docs portal runs at `http://localhost:3000`.

## Checks and builds

```sh
bun run check-types
bun run test
bun run build:registry
bun run build
```

## Install from the local shadcn registry

Start the portal, then use its local registry endpoint with the shadcn CLI:

```sh
bunx shadcn@latest add http://localhost:3000/r/ui-button.json
```

For a project using these extracted components, install the Foglamp stylesheet once in its application entry point:

```css
@import "@foglamp/design-system/styles/globals.css";
@import "@foglamp/design-system/styles/effects.css";
```

See [`apps/docs/content/docs/foundations/installation.mdx`](apps/docs/content/docs/foundations/installation.mdx) and the [credits page](apps/docs/content/docs/credits.mdx) for setup and attribution details.

## License and attribution

Source UI and design are by Gustavo Fior, Abdul Haidar, and Foglamp Labs. See [`CREDITS.md`](CREDITS.md), [`NOTICE`](NOTICE), and [`LICENSE`](LICENSE). Derived integration code is identified separately in its source headers.
