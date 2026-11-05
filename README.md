# Framerock

> **Original design by Gustavo Fior ([@gustavo-fior](https://github.com/gustavo-fior), [website](https://gustavofior.com), [@heyimgustavo](https://x.com/heyimgustavo), [LinkedIn](https://www.linkedin.com/in/gustavofior)), co-founder Abdul Haidar ([LinkedIn](https://www.linkedin.com/in/abdulhdr/)), and Foglamp Labs ([foglamp.dev](https://foglamp.dev)).** This design system is extracted **100% AS-IS** from [Foglamp](https://github.com/foglamp-labs/foglamp), licensed under Apache-2.0.

`@tailrocks/framerock` provides the original UI primitives, widgets, charts, figures, marketing blocks, dashboard blocks, and utilities. The Fumadocs/Base UI + TanStack Start portal includes reference documentation and interactive stories.

## Project status

This workspace contains the Framerock source, registry, and documentation portal. It makes no npm publication or deployment claim.

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

For a project using these extracted components, install the Framerock stylesheet once in its application entry point:

```css
@import "@tailrocks/framerock/styles/globals.css";
@import "@tailrocks/framerock/styles/effects.css";
```

See [`apps/docs/content/docs/foundations/installation.mdx`](apps/docs/content/docs/foundations/installation.mdx) and the [credits page](apps/docs/content/docs/credits.mdx) for setup and attribution details.

## Origin, Inspiration & Open-Source Attribution

> *“Good artists copy, great artists steal.”* — **Steve Jobs** (who famously admitted that Apple has *“always been shameless about stealing great ideas”*)
>
> We apply that exact principle here — **openly, proudly, and in full compliance with the Apache-2.0 open-source license**. Every component in **Framerock** is either **copied 1:1 or directly inspired by** [**Foglamp**](https://foglamp.dev) ([`github.com/foglamp-labs/foglamp`](https://github.com/foglamp-labs/foglamp) at commit [`7d7e6609108019a74902858d4b07c24825c6318b`](https://github.com/foglamp-labs/foglamp/tree/7d7e6609108019a74902858d4b07c24825c6318b)), originally designed and engineered by [**Gustavo Fior (`@gustavo-fior`)**](https://github.com/gustavo-fior) ([`gustavofior.com`](https://gustavofior.com) · [`@heyimgustavo`](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)) and co-founder [**Abdul Haidar**](https://www.linkedin.com/in/abdulhdr/) at [**Foglamp Labs**](https://foglamp.dev).
>
> **Why we extracted this work & our honest humility:** Today, we keep these components **1:1 visually and behaviorally identical** to `foglamp-labs/foglamp` (with only framework-decoupling modifications documented under Apache-2.0 Section 4(b)). Over time, **Tailrocks** will extend **Framerock** with modified and newly authored components following this design language — though we humbly admit we don't think we can ever make our additions look quite as extraordinary as how **Gustavo Fior** crafted the originals. We extracted and packaged this system because we fell in love with its rare, obsessive quality and wanted to use it across Tailrocks projects (alongside `Termrock` for the terminal) and share it with the wider internet.
>
> **Non-Affiliation Disclaimer:** **Framerock** is an independent open-source project maintained by [**Tailrocks**](https://github.com/tailrocks) and is not affiliated with, sponsored by, or endorsed by **Gustavo Fior**, **Abdul Haidar**, or **Foglamp Labs**. Any modifications, decoupling changes, or newly added components are solely the responsibility of Tailrocks.

## License

The source is distributed under Apache-2.0. See [`LICENSE`](LICENSE), [`NOTICE`](NOTICE), and [`CREDITS.md`](CREDITS.md). Framerock is maintained by Tailrocks; this repository makes no npm publication or deployment claim.
