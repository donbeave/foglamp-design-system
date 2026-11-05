/**
 * Original UI & design: Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs.
 * Extracted from https://github.com/foglamp-labs/foglamp — Apache-2.0.
 */
"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  IconArrowUp,
  IconClock,
  IconClockExclamation,
  IconClockOff,
  IconDatabaseSearch,
  IconGauge,
  IconGaugeFilled,
  IconHourglass,
  IconLoader,
  IconAlertTriangle,
  IconBellRinging,
  IconCalendarOff,
  IconCalendarWeek,
  IconConfetti,
  IconDatabaseExclamation,
  IconKey,
  IconMail,
  IconMailBolt,
  IconMailFast,
  IconPlugConnectedX,
  IconUserPlus,
  IconWand,
  IconRefresh,
  IconTrash,
  IconWifi,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export type DevNetworkDelay = number;
const DEV_NETWORK_DELAYS = [0, 200, 500, 1000, 2000, 5000];
const DEV_NETWORK_FAIL_RATE = 0.3;
export interface DevBarViewProps {
  fps?: number;
  queries?: { fetching: QueryDiagnostic[]; stale: QueryDiagnostic[]; staleInactive: number };
  netDelay?: DevNetworkDelay;
  netFail?: boolean;
  forceLoading?: boolean;
  onNetworkDelayChange?: (delay: DevNetworkDelay) => void;
  onNetworkFailChange?: (fail: boolean) => void;
  onForceLoadingChange?: (loading: boolean) => void;
  onInvalidateQueries?: () => void;
  onClearQueries?: () => void;
  onSendTestEmail?: (variant: string) => void;
  sendingTestEmail?: boolean;
}
const noop = () => {};

function formatDelay(delay: DevNetworkDelay) {
  if (delay === 0) return "Off";
  return delay < 1_000 ? `+${delay} ms` : `+${delay / 1_000} s`;
}

function delayIcon(delay: DevNetworkDelay) {
  if (delay === 0) return IconClockOff;
  return delay < 1_000 ? IconClock : IconHourglass;
}

// Dev-bar menus are dense: the items drop to the toolbar's text size and
// their leading icons shrink to match.
// The dropdown component sizes bare svgs to size-4 with a higher-specificity
// [&_svg:not([class*='size-'])] rule, so the icon size must live on the
// icons themselves (MENU_ICON), not on the item.
const MENU_ITEM = "text-xs [&_svg]:text-muted-foreground";
const MENU_ICON = "size-3.5";

// One entry per email the product sends, grouped the way the templates relate.
// Sends go to the server's TEST_EMAIL_TO address.
const TEST_EMAIL_GROUPS = [
  {
    label: "Alerts",
    items: [
      { variant: "alert_fired", label: "Fired alert (plain)", icon: IconBellRinging },
      { variant: "alert_diagnosis", label: "Fired alert + diagnosis", icon: IconMailBolt },
    ],
  },
  {
    label: "Digest",
    items: [
      { variant: "weekly_digest", label: "Weekly digest", icon: IconCalendarWeek },
      { variant: "quiet_week", label: "Quiet week", icon: IconCalendarOff },
    ],
  },
  {
    label: "Onboarding",
    items: [
      { variant: "welcome", label: "Welcome", icon: IconConfetti },
      { variant: "onboarding_day_1", label: "Follow-up (day 1)", icon: IconMailFast },
      { variant: "onboarding_day_3", label: "Follow-up (day 3)", icon: IconMailFast },
      { variant: "onboarding_day_7", label: "Follow-up (day 7)", icon: IconMailFast },
    ],
  },
  {
    label: "Account",
    items: [
      { variant: "magic_link", label: "Magic link", icon: IconWand },
      { variant: "reset_password", label: "Reset password", icon: IconKey },
      { variant: "invitation", label: "Org invitation", icon: IconUserPlus },
    ],
  },
  {
    label: "Usage",
    items: [
      { variant: "quota_warning", label: "Quota warning", icon: IconAlertTriangle },
      { variant: "storage_alert", label: "Storage alert", icon: IconDatabaseExclamation },
    ],
  },
] as const;

function TestEmailsMenu({ onSendTestEmail = noop, sendingTestEmail = false }: Pick<DevBarViewProps, "onSendTestEmail" | "sendingTestEmail">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="group flex cursor-pointer items-center gap-1.25 text-xs text-foreground transition-all">
          <IconMail
            data-icon="inline-start"
            className="size-4 text-muted-foreground opacity-80 group-hover:text-foreground group-hover:opacity-100"
            strokeWidth={1.75}
          />
          Emails
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {TEST_EMAIL_GROUPS.map((group, index) => (
          <DropdownMenuGroup key={group.label}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.items.map((item) => (
              <DropdownMenuItem
                key={item.variant}
                className={MENU_ITEM}
                disabled={sendingTestEmail}
                onClick={() => onSendTestEmail(item.variant)}
              >
                <item.icon className={MENU_ICON} />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Dev bar
// ---------------------------------------------------------------------------

/** A rolling one-second FPS sample. Sampling resets while the document is
 * hidden so browser background throttling never produces a misleading dip. */
function useFramesPerSecond() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameRequest = 0;
    let frames = 0;
    let sampleStartedAt = performance.now();

    function resetSample() {
      frames = 0;
      sampleStartedAt = performance.now();
    }

    function sample(now: number) {
      if (!document.hidden) {
        frames += 1;
        const elapsed = now - sampleStartedAt;
        if (elapsed >= 1_000) {
          setFps(Math.round((frames * 1_000) / elapsed));
          resetSample();
        }
      }
      frameRequest = window.requestAnimationFrame(sample);
    }

    document.addEventListener("visibilitychange", resetSample);
    frameRequest = window.requestAnimationFrame(sample);

    return () => {
      document.removeEventListener("visibilitychange", resetSample);
      window.cancelAnimationFrame(frameRequest);
    };
  }, []);

  return fps;
}

export type QueryDiagnostic = { hash: string; label: string };

/** Collapses queries that share a label (same procedure, different inputs)
 * into one row with a count, so `alerts.list ×4` doesn't fill the tooltip. */
function groupQueriesByLabel(queries: QueryDiagnostic[]) {
  const counts = new Map<string, number>();
  for (const query of queries) {
    counts.set(query.label, (counts.get(query.label) ?? 0) + 1);
  }
  return [...counts].map(([label, count]) => ({ label, count }));
}

function QueryTooltip({
  title,
  queries,
  footer,
  children,
}: {
  title: string;
  queries: QueryDiagnostic[];
  footer?: string;
  children: React.ReactNode;
}) {
  const groups = groupQueriesByLabel(queries);
  const visibleGroups = groups.slice(0, 8);
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span className="flex cursor-help items-center gap-1.25" />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className="flex-col items-start gap-1.5">
        <span className="font-medium">{title}</span>
        {visibleGroups.length > 0 ? (
          <ul className="flex max-w-72 flex-col gap-1">
            {visibleGroups.map((group) => (
              <li key={group.label} className="truncate">
                {group.label}
                {group.count > 1 && (
                  <span className="text-muted-foreground"> ×{group.count}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-muted-foreground">None</span>
        )}
        {groups.length > visibleGroups.length && (
          <span className="text-muted-foreground">
            +{groups.length - visibleGroups.length} more
          </span>
        )}
        {footer && <span className="text-muted-foreground">{footer}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

/** Development-only controls that sit in the dashboard canvas above the main
 * inset. Keeping the bar in flow means it follows the inset when Foggy resizes
 * it instead of floating over either surface. Renders nothing in production. */
// Exit is staged: the controls fade out first, then the bar's height (and the
// canvas gap it occupies) collapses so the inset grows into the space in one
// smooth motion instead of jumping.
const FADE_S = 0.1;
const COLLAPSE_S = 0.25;

export function DevBarView(props: DevBarViewProps) {
  // Session-only: a reload restores the strip, so it cannot be lost.
  const [hidden, setHidden] = useState(false);
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="dev-bar"
          // Cancels the wrapper's `gap-2` as the bar collapses so the inset ends
          // up exactly where it sits in production (no dev bar at all).
          initial={false}
          exit={{
            height: 0,
            marginBottom: "-0.5rem",
            transition: {
              delay: FADE_S,
              duration: COLLAPSE_S,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="h-8 shrink-0 overflow-hidden"
        >
          <motion.div
            exit={{ opacity: 0, transition: { duration: FADE_S } }}
            className="h-full"
          >
            <DevBarContent {...props} onHide={() => setHidden(true)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DevBarContent({ onHide, fps: fpsOverride, queries = { fetching: [], stale: [], staleInactive: 0 }, netDelay = 0, netFail = false, forceLoading = false,
  onNetworkDelayChange: setDevNetworkDelay = noop,
  onNetworkFailChange: setDevNetworkFail = noop,
  onForceLoadingChange: setDevForceLoading = noop,
  onInvalidateQueries = noop, onClearQueries = noop,
  onSendTestEmail, sendingTestEmail,
}: DevBarViewProps & { onHide: () => void }) {
  const measuredFps = useFramesPerSecond();
  const fps = fpsOverride ?? measuredFps;
  const netActive = netDelay > 0 || netFail || forceLoading;
  // fps === 0 is the pre-first-sample state, not actual jank.
  const lowFps = fps > 0 && fps < 30;

  return (
    <div
      role="toolbar"
      aria-label="Development controls"
      aria-orientation="horizontal"
      className="flex h-8 shrink-0 items-center justify-end gap-4 px-1"
    >
      <div
        className="flex shrink-0 items-center gap-4 text-xs tabular-nums text-muted-foreground"
        aria-label={`${fps} frames per second, ${queries.stale.length} stale queries, ${queries.fetching.length} queries fetching`}
      >
        <span className="flex items-center gap-1.25" aria-hidden>
          {lowFps ? (
            <IconGaugeFilled className="size-3.25 text-destructive" />
          ) : (
            <IconGauge className="size-3.25 text-muted-foreground opacity-80" />
          )}
          <span
            className={
              lowFps ? "text-destructive -mr-px" : "text-foreground -mr-px"
            }
          >
            {fps}
          </span>{" "}
          FPS
        </span>
        <TooltipProvider delay={150}>
          <QueryTooltip
            title="Stale queries"
            queries={queries.stale}
            footer={
              queries.staleInactive > 0
                ? `+${queries.staleInactive} inactive (no observers)`
                : undefined
            }
          >
            <IconClockExclamation className="size-3.25 text-muted-foreground opacity-80" />
            <span className="text-foreground -mr-px">
              {queries.stale.length}
            </span>{" "}
            stale
          </QueryTooltip>
          <QueryTooltip title="Fetching queries" queries={queries.fetching}>
            <IconDatabaseSearch className="size-3.25 text-muted-foreground opacity-80" />
            <span className="text-foreground -mr-px">
              {queries.fetching.length}
            </span>{" "}
            fetching
          </QueryTooltip>
        </TooltipProvider>
      </div>

      <TestEmailsMenu onSendTestEmail={onSendTestEmail} sendingTestEmail={sendingTestEmail} />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={`flex gap-1.25 items-center text-xs group transition-all cursor-pointer ${
              netActive ? "text-destructive" : "text-foreground"
            }`}
          >
            <IconWifi
              data-icon="inline-start"
              className={`size-4.5 ${
                netActive
                  ? "text-destructive"
                  : "text-muted-foreground opacity-80 group-hover:text-foreground group-hover:opacity-100"
              }`}
              strokeWidth={1.75}
            />
            Network
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Added latency</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={String(netDelay)}
              onValueChange={(value) =>
                setDevNetworkDelay(Number(value))
              }
            >
              {DEV_NETWORK_DELAYS.map((delay) => {
                const Icon = delayIcon(delay);
                return (
                  <DropdownMenuRadioItem
                    key={delay}
                    value={String(delay)}
                    className={MENU_ITEM}
                  >
                    <Icon className={MENU_ICON} />
                    {formatDelay(delay)}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={netFail}
              onCheckedChange={setDevNetworkFail}
              className={MENU_ITEM}
            >
              <IconPlugConnectedX className={MENU_ICON} />
              Fail {Math.round(DEV_NETWORK_FAIL_RATE * 100)}% of requests
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={forceLoading}
              onCheckedChange={(checked) => {
                setDevForceLoading(checked);

              }}
              className={MENU_ITEM}
            >
              <IconLoader className={MENU_ICON} />
              Force loading state
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider delay={0}>
        <div className="flex items-center -ml-1.5 gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onInvalidateQueries()}
                  aria-label="Invalidate all queries"
                  className="text-muted-foreground opacity-80"
                />
              }
            >
              <IconRefresh className="size-3.25" />
            </TooltipTrigger>
            <TooltipContent>Invalidate all queries</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onClearQueries()}
                  aria-label="Clear query cache"
                  className="text-muted-foreground opacity-80"
                />
              }
            >
              <IconTrash className="size-3.25" />
            </TooltipTrigger>
            <TooltipContent>Clear query cache</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={onHide}
                  aria-label="Hide development controls until reload"
                  className="text-muted-foreground opacity-80"
                />
              }
            >
              <IconArrowUp className="size-3.25" />
            </TooltipTrigger>
            <TooltipContent>Hide until reload</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

export const DevBar = DevBarView;
