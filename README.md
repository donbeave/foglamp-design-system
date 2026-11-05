# Foglamp Design System

> **Original design and implementation by Gustavo Fior ([@gustavo-fior](https://github.com/gustavo-fior), [gustavofior.com](https://gustavofior.com), [@heyimgustavo](https://x.com/heyimgustavo), [LinkedIn](https://www.linkedin.com/in/gustavofior)), co-founder Abdul Haidar ([LinkedIn](https://www.linkedin.com/in/abdulhdr/)), and Foglamp Labs ([foglamp.dev](https://foglamp.dev)).** This workspace extracts the original Foglamp project [100% AS-IS](https://github.com/foglamp-labs/foglamp); all credit for its visual design and implementation belongs to the original creators.

This repository is assembling a reusable `@foglamp/design-system`, a shadcn-compatible registry, and an interactive component documentation portal built with TanStack Start, Fumadocs Base UI, and Fumadocs Story. The source checkout is in `.reference/foglamp` and is excluded from version control.

## Workspace packages

- `packages/design-system` — reusable React design-system package.
- `packages/registry` — shadcn-compatible registry metadata and tooling.
- `apps/docs` — documentation and interactive component workbench.

## Commands

Bun 1.4+ is used for local development. In environments managed with mise, run commands as `mise exec bun@latest -- bun <command>`.

```sh
bun install
bun run dev
bun run check-types
bun run build
```

The workspace is under active construction; application scripts and documentation routes are being added in stages.

See [CREDITS.md](./CREDITS.md) for attribution details and [LICENSE](./LICENSE) for the Apache-2.0 license. The extraction plan and runbook are maintained in the [planning repository](https://github.com/donbeave/foglamp-design-system-plan).
