/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/navbar.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/navbar.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../../../ui/button";
import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";

import { FramerockLink } from "../../../lib/link-context";

import { GithubLogo } from "./github-logo";
import { Logo } from "./logo";

// Flat navigation, no menus: the two side projects, then pricing and docs.
// Everything sits on the right, flush against the account buttons, so the bar
// reads as one row instead of a centered cluster and a detached CTA.
const DEFAULT_NAV_LINKS: MarketingNavLink[] = [
  { label: "Scan", href: "/scan" },
  { label: "HUD", href: "/hud" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "https://docs.foglamp.dev", external: true },
];

export type MarketingNavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const LINK_CLASS =
  "text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground";

function NavLink({ link }: { link: MarketingNavLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={LINK_CLASS}
      >
        {link.label}
      </a>
    );
  }
  return (
    <FramerockLink href={link.href} className={LINK_CLASS}>
      {link.label}
    </FramerockLink>
  );
}

export type MarketingNavbarProps = {
  links?: MarketingNavLink[];
  loggedIn?: boolean;
  homeHref?: string;
  loginHref?: string;
  dashboardHref?: string;
  githubHref?: string;
  brandName?: string;
  onLoginShortcut?: () => void;
};

export function MarketingNavbar({
  links = DEFAULT_NAV_LINKS,
  loggedIn = false,
  homeHref = "/homepage",
  loginHref = "/login",
  dashboardHref = "/overview",
  githubHref = "https://github.com/foglamp-labs/foglamp",
  brandName = "Foglamp",
  onLoginShortcut,
}: MarketingNavbarProps = {}) {

  // The bottom hairline and the frosted (translucent + blurred) treatment only
  // appear once the page has scrolled under the bar. At the top the header is
  // opaque and sits flush with the page: a 70%-alpha copy of the background
  // composited on its own blur layer rounds one 8-bit step brighter than the
  // flat page in dark mode, which read as a faint band above the hero.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Press "L" to jump to login. Only active for logged-out visitors. Ignored
  // while typing in a field so it never hijacks input.
  useEffect(() => {
    if (loggedIn) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "l" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) return;
      e.preventDefault();
      if (onLoginShortcut) onLoginShortcut();
      else window.location.assign(loginHref);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loggedIn, loginHref, onLoginShortcut]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border/50 bg-background/90 backdrop-blur-sm"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <FramerockLink
          href={homeHref}
          aria-label={`${brandName} home`}
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Logo brandName={brandName} />
        </FramerockLink>

        <div className="hidden min-w-0 flex-col text-[10px] leading-tight text-muted-foreground sm:flex">
          <span>Original design by</span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span>
              <a href="https://gustavofior.com" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">Gustavo Fior</a>{" "}
              <a href="https://github.com/gustavo-fior" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">(@gustavo-fior)</a>
            </span>
            <span aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/abdulhdr/" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">Abdul Haidar</a>
            <span aria-hidden="true">·</span>
            <a href="https://foglamp.dev" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">Foglamp Labs</a>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:flex"
          >
            {links.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          <div className={cn("flex items-center gap-2")}>
            <Button
              variant="ghost"
              aria-label="Foglamp on GitHub"
              className="mr-1.5 max-[380px]:hidden"
              size="icon"
              render={
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer noopener"
                />
              }
            >
              <GithubLogo className="size-4" />
            </Button>
            {loggedIn ? (
              <Button render={<FramerockLink href={dashboardHref} />} className="h-8">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="secondary" render={<FramerockLink href={loginHref} />}>
                  Log in
                </Button>
                <Button render={<FramerockLink href={loginHref} />}>Start free</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 border-t border-border/40 px-3 py-1 text-[9px] leading-tight text-muted-foreground sm:hidden">
        <span>Original design by</span>
        <span>
          <a href="https://gustavofior.com" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">Gustavo Fior</a>{" "}
          <a href="https://github.com/gustavo-fior" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">(@gustavo-fior)</a>
        </span>
        <span aria-hidden="true">·</span>
        <a href="https://www.linkedin.com/in/abdulhdr/" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">Abdul Haidar</a>
        <span aria-hidden="true">·</span>
        <a href="https://foglamp.dev" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">Foglamp Labs</a>
        <span aria-hidden="true">·</span>
        <a href="https://github.com/foglamp-labs/foglamp" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">foglamp-labs/foglamp</a>
      </div>
    </header>
  );
}
