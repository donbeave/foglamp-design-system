# Shoutout & Credits to the Original Creators of Foglamp

> [!IMPORTANT]
> **Massive Shoutout to Gustavo Fior (`@gustavo-fior`), Abdul Haidar, and Foglamp Labs!**
> Every pixel, shadow token, squircle curve, tactile button, chart, waterfall inspector, 3D entrance choreography, and scrollytelling guide in this design system comes directly from **[Foglamp (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp)** — an extraordinary open-source AI observability platform built with rare visual craft and engineering taste.

---

## Original Creator & Team

| Creator | Role | Links |
| :--- | :--- | :--- |
| **Gustavo Fior** | **Original Author, Co-Founder & Builder of Foglamp**<br>*(665+ commits crafting the entire UI, design tokens, EvilCharts, TraceTimeline, FlowMap, HUD, and scrollytelling experience)* | • **GitHub**: [@gustavo-fior](https://github.com/gustavo-fior)<br>• **Website**: [gustavofior.com](https://gustavofior.com)<br>• **X / Twitter**: [@heyimgustavo](https://x.com/heyimgustavo)<br>• **LinkedIn**: [linkedin.com/in/gustavofior](https://www.linkedin.com/in/gustavofior) |
| **Abdul Haidar** | **Co-Founder of Foglamp** | • **LinkedIn**: [linkedin.com/in/abdulhdr](https://www.linkedin.com/in/abdulhdr/) |
| **Foglamp Labs** | **Original Project & Organization** *(Curitiba, Brazil · Est. 2026)* | • **GitHub Repo**: [github.com/foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp)<br>• **Official Site**: [foglamp.dev](https://foglamp.dev)<br>• **License**: Apache License 2.0 |

---

## Why Foglamp's Design Deserves Special Recognition

Most developer tools settle for stock component libraries with default borders. **Gustavo Fior** engineered a bespoke visual language inside `foglamp-labs/foglamp` that stands among the finest interfaces in modern developer tooling:

1. **Multi-Layer Optical Shadow-as-Border System**: Replacing harsh CSS `border` rules with 18 custom `box-shadow` tokens (`--custom-shadow*`) that render crisp `0.5px` hairlines in Light Mode and specular `0.75px` top inset bevels in Dark Mode.
2. **Progressive Squircle Geometry**: Pairing `@toolwind/corner-shape` (`corner-squircle`) with `@supports (corner-shape: squircle)` (`squircle:*`) so Chromium browsers render true continuous-curvature squircles while other browsers degrade gracefully.
3. **Zero-Flash & Sub-Pixel Engineering**: From `120ms` delayed skeleton latches (`useDelayedLoading`) and 2-phase dark-mode sRGB anti-flicker tweens in `HeroDemo`, to 240Hz fixed-substep spring physics (`useSizeSpring`) in the Shadow DOM HUD and 1/4-resolution `<feTurbulence>` drifting fog banks.
4. **Self-Contained Storytelling**: A 2,094-line deterministic mock narrative (`mock-data.ts`), 22 interactive landing figures, a 2-pass `elkjs` orthogonal architecture map with WAAPI traveling comets, and a "Warm Paper Field Guide" scrollytelling workshop.

---

## Mandatory Attribution Surfaces in the Extracted Design System & Portal

When executing the `/goal` plan to build `@foglamp/design-system` and the `Fumadocs + BaseUI + TanStack Start + Fumadocs Story` portal, **every subagent must ensure the shoutout to Gustavo Fior and Foglamp Labs is prominently visible across all surfaces**:

1. **Documentation Portal Top Banner & Hero (`apps/docs/src/routes/index.tsx`)**:
   - Render a prominent credit pill & callout card in the hero section:
     *"Designed & crafted by **Gustavo Fior (@gustavo-fior)** & **Foglamp Labs** — extracted AS-IS from [foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp)."*
2. **Documentation Portal Navbar & Footer (`MarketingNavbar` & `CuttingMatFooterBlock`)**:
   - Include direct links to [foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp), [foglamp.dev](https://foglamp.dev), and [@gustavo-fior](https://github.com/gustavo-fior) alongside a visible *"Original Design by Gustavo Fior (Foglamp)"* attribution badge above the `<CuttingMat />` blueprint footer.
3. **Dedicated Credits & Design Story Page (`apps/docs/content/docs/credits.mdx` & `index.mdx`)**:
   - Pin a top-level **"Credits & Original Author"** page in the Fumadocs sidebar highlighting Gustavo Fior, Abdul Haidar, and Foglamp Labs, including the `AboutPage` founder cards (`apps/web/src/app/(marketing)/about/page.tsx`) preserved AS-IS.
4. **Story Panel Attribution (`FoglampStoryPanel` in `apps/docs/src/components/story-panel.tsx`)**:
   - Include a subtle *"Crafted by @gustavo-fior · foglamp-labs/foglamp"* link in the Story Panel footer toolbar next to the `npx shadcn add` command.
5. **Package & Registry Metadata (`package.json`, `registry.json`, `LICENSE`, `NOTICE`)**:
   - Preserve the Apache-2.0 license and include explicit attribution to **Gustavo Fior** and **Foglamp Labs** in `package.json`, `registry.json` (`homepage: "https://github.com/foglamp-labs/foglamp"`, `author`), and source headers.
