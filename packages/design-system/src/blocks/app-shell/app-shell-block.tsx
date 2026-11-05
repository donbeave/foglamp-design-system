/** Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Adapted from foglamp-labs/foglamp apps/web/src/components/app/app-shell.tsx under Apache-2.0.
 */
"use client";

import { useState, type ReactNode } from "react";
import { IconChartBar, IconChevronDown, IconChevronRight, IconLogout, IconPlus, type Icon } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { FoglampLink } from "../../lib/link-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../../ui/sidebar";
import { FoggyLauncher, FoggyWidget, type FoggyWidgetViewProps } from "../../widgets/foggy";
import { HeaderActionsSlotProvider, LayoutReserveProvider } from "../../widgets/header-slot";
import { account, nav } from "../../widgets/nav";
import { ProjectProvider, useProject, type Project } from "../../widgets/project-context";
import { ProjectIcon } from "../../widgets/leaf/project-icon";
import { RangeProvider } from "../../widgets/range-context";
import { NoProject } from "../../widgets/page-parts";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ThemeSubmenu } from "../../widgets/theme-switcher";
import { QuotaCard, type QuotaUsage } from "../../widgets/quota-card";
import { DevBar, type DevBarViewProps } from "../../widgets/dev-toolbar";
import { FoglampHUD, type FoglampHUDProps } from "../../hud/FoglampHUD";
import { createMockHudStream } from "../../hud/useHudStream";
import { NewProjectDialog, type NewProjectInput } from "./new-project-dialog";
import { SunsetCard } from "./sunset-card";
const BUILD_ENV = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
const DEVELOPMENT = BUILD_ENV?.DEV ?? (typeof process !== "undefined" && process.env.NODE_ENV === "development");
const DEFAULT_SERVER_URL = typeof process === "undefined" ? undefined : process.env.NEXT_PUBLIC_SERVER_URL;
const DEFAULT_PROJECTS: Project[] = [{ id: "project_demo", name: "Acme Production", slug: "acme-production", url: null, orgId: "org_demo", orgName: "Acme", orgSlug: "acme" }];
const MOCK_HUD_STREAM = createMockHudStream([
  { type: "trace.start", ts: 0, traceId: "tr_9f2a4c8e1b7d3a6f5e0c", name: "support-triage", agentName: "support-triage", workflowName: "onboard-customer", sessionId: "ses_a91f" },
  { type: "step.start", ts: 120, traceId: "tr_9f2a4c8e1b7d3a6f5e0c", stepNumber: 1, provider: "google", model: "gemini-3.5-flash" },
  { type: "step.tokens", ts: 1040, traceId: "tr_9f2a4c8e1b7d3a6f5e0c", stepNumber: 1, outputTokens: 142 },
]);

export type AppShellBlockProps = {
  children: ReactNode;
  pathname?: string;
  projects?: Project[];
  initialProjectId?: string | null;
  isLoading?: boolean;
  onProjectChange?: (id: string) => void;
  onNewProject?: (input: NewProjectInput) => Project | Promise<Project>;
  projectDialogOpen?: boolean;
  onProjectDialogOpenChange?: (open: boolean) => void;
  serverUrl?: string;
  quotaUsage?: QuotaUsage | null;
  devBar?: DevBarViewProps;
  hud?: FoglampHUDProps;
  isPlatformAdmin?: boolean;
  foggy?: Omit<FoggyWidgetViewProps, "open" | "onOpenChange">;
  footer?: ReactNode;
  user?: { name: string; email?: string; image?: string };
  onSignOut?: () => void;
};

function NavIcon({ icon: OutlineIcon, activeIcon: ActiveIcon, active, className }: { icon: Icon; activeIcon: Icon; active: boolean; className?: string }) {
  return <span className={cn("grid size-4.5 place-items-center [&_svg]:size-full!", className)}>
    <OutlineIcon className={cn("[grid-area:1/1] transition-opacity duration-100 ease-in-out", active ? "opacity-0" : "opacity-100")} />
    <ActiveIcon className={cn("[grid-area:1/1] transition-opacity duration-100 ease-in-out", active ? "opacity-100" : "opacity-0")} />
  </span>;
}

function ProjectSwitcher({ onCreate, open, onOpenChange }: { onCreate: (input: NewProjectInput, fallback: Project) => Promise<Project>; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { project, projects, setProjectId } = useProject();
  return <SidebarMenu><SidebarMenuItem><DropdownMenu>
    <DropdownMenuTrigger render={<SidebarMenuButton size="default" className="px-1 pr-2 pl-1.75 [&_svg]:size-3.5" />}>
      <ProjectIcon url={project?.url} name={project?.name} size="sm" />
      <div className="flex flex-1 flex-col text-left text-sm leading-tight"><span className="truncate font-medium">{project?.name ?? "Select project"}</span></div>
      <IconChevronDown className="ml-auto size-3.5 opacity-15" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" sideOffset={8} side="right" className="min-w-(--anchor-width)">
      {projects.map((p) => <DropdownMenuItem key={p.id} onClick={() => setProjectId(p.id)}><ProjectIcon url={p.url} name={p.name} size="sm" /><div className="flex flex-1 flex-col"><span>{p.name}</span></div></DropdownMenuItem>)}
    <DropdownMenuSeparator /><DropdownMenuItem onClick={() => onOpenChange(true)}><IconPlus />New project</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu><NewProjectDialog open={open} onOpenChange={onOpenChange} onCreate={onCreate} /></SidebarMenuItem></SidebarMenu>;
}

function NavUser({ user, onSignOut, isPlatformAdmin }: Pick<AppShellBlockProps, "user" | "onSignOut" | "isPlatformAdmin">) {
  const name = user?.name || "Account";
  return <SidebarMenuItem><DropdownMenu>
    <DropdownMenuTrigger render={<SidebarMenuButton className="pr-1.5" />}>
      <Avatar size="xs"><AvatarImage src={user?.image} alt={name} /><AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
      <div className="flex min-w-0 flex-1 flex-col text-left text-sm"><span className="truncate">{name}</span></div>
      <IconChevronRight className="ml-auto size-3.5 opacity-15" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side="right" sideOffset={8} className="min-w-(--anchor-width) w-fit">
      <div className="flex gap-3 items-center p-2"><Avatar size="sm"><AvatarImage src={user?.image} alt={name} /><AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar><div className="flex flex-col gap-0.5 pr-1"><DropdownMenuLabel className="max-w-56 truncate p-0 text-foreground">{name}</DropdownMenuLabel><DropdownMenuLabel className="max-w-56 truncate p-0 font-normal">{user?.email}</DropdownMenuLabel></div></div>
      <DropdownMenuSeparator /><ThemeSubmenu />
      {isPlatformAdmin && <DropdownMenuItem render={<FoglampLink href="/platform" />}><IconChartBar />Platform</DropdownMenuItem>}
      <DropdownMenuItem variant="destructive" onClick={onSignOut}><IconLogout />Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></SidebarMenuItem>;
}

function ShellBody({ children, pathname = "/overview", foggy, footer, user, onSignOut, isPlatformAdmin, serverUrl = DEFAULT_SERVER_URL, quotaUsage, devBar, hud, onCreate, projectDialogOpen, onProjectDialogOpenChange }: Omit<AppShellBlockProps, "projects" | "initialProjectId" | "isLoading" | "onProjectChange" | "onNewProject"> & { onCreate: (input: NewProjectInput, fallback: Project) => Promise<Project> }) {
  const [localDialogOpen, setLocalDialogOpen] = useState(false);
  const dialogOpen = projectDialogOpen ?? localDialogOpen;
  const setDialogOpen = (open: boolean) => { if (projectDialogOpen === undefined) setLocalDialogOpen(open); onProjectDialogOpenChange?.(open); };
  const { projectId, projects, isLoading } = useProject();
  const [foggyOpen, setFoggyOpen] = useState(false);
  const foggyCarved = (isLoading || projects.length > 0) && !foggyOpen;
  function menu(items: typeof nav) {
    return items.map((item) => {
      const active = item.href === "/settings" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
      return <SidebarMenuItem key={item.href}><SidebarMenuButton isActive={active} render={<FoglampLink href={item.href} />}><NavIcon icon={item.icon} activeIcon={item.activeIcon} active={active} className={item.iconClassName} /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>;
    });
  }
  return <SidebarProvider className="group/shell relative h-svh min-h-0 overflow-hidden">
    <Sidebar variant="inset"><SidebarHeader><ProjectSwitcher onCreate={onCreate} open={dialogOpen} onOpenChange={setDialogOpen} /></SidebarHeader>
      <SidebarContent><SidebarGroup><SidebarGroupContent><SidebarMenu>{menu(nav)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent>
      <SidebarFooter><SunsetCard serverUrl={serverUrl} /><QuotaCard usage={quotaUsage} /><SidebarMenu>{menu(account)}<NavUser user={user} onSignOut={onSignOut} isPlatformAdmin={isPlatformAdmin} />{footer}</SidebarMenu></SidebarFooter>
    </Sidebar>
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2">
      {DEVELOPMENT && <DevBar {...devBar} />}
      <SidebarInset className={cn("min-h-0 overflow-hidden transition-shadow duration-200 md:rounded-lg squircle:md:rounded-3xl", foggyCarved && "foggy-inset-closed")} style={foggyCarved ? { borderBottomRightRadius: 0 } : undefined}>
        <main className="min-h-0 flex-1 overflow-y-auto"><div className="flex flex-col gap-4 py-6 px-0 pb-16">{projectId ? children : !isLoading && projects.length === 0 ? <NoProject /> : null}</div></main>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-lg squircle:rounded-3xl corner-squircle border-r border-border/80 opacity-0 transition-opacity duration-200 group-has-[[data-foggy-resize]:hover]/shell:opacity-100 group-has-[[data-foggy-resize][data-resizing]]/shell:opacity-100" />
      </SidebarInset>
    </div>
    {foggyCarved && <FoggyLauncher onOpen={() => setFoggyOpen(true)} showButton={Boolean(projectId)} />}
    {projectId && <FoggyWidget key={projectId} {...foggy} open={foggyOpen} onOpenChange={setFoggyOpen} />}
    {DEVELOPMENT && <FoglampHUD stream={MOCK_HUD_STREAM} {...hud} />}
  </SidebarProvider>;
}

export function AppShellBlock({ projects = DEFAULT_PROJECTS, initialProjectId, isLoading, onProjectChange, onNewProject, ...props }: AppShellBlockProps) {
  const [createdProjects, setCreatedProjects] = useState<Project[]>([]);
  const availableProjects = [...projects, ...createdProjects.filter((created) => !projects.some((project) => project.id === created.id))];
  async function createProject(input: NewProjectInput, fallback: Project): Promise<Project> {
    const project = onNewProject ? await onNewProject(input) : fallback;
    setCreatedProjects((current) => [...current, project]);
    return project;
  }
  return <ProjectProvider projects={availableProjects} initialProjectId={initialProjectId} isLoading={isLoading} onProjectChange={onProjectChange}><RangeProvider><HeaderActionsSlotProvider><LayoutReserveProvider><ShellBody {...props} onCreate={createProject} /></LayoutReserveProvider></HeaderActionsSlotProvider></RangeProvider></ProjectProvider>;
}
