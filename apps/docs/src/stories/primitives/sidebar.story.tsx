/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@foglamp/design-system/ui/sidebar";
import { defineStory } from "../../lib/story";

type Args = { variant: 'expanded' };
function SidebarStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><SidebarProvider defaultOpen><Sidebar><SidebarHeader className="p-3 font-semibold">Foglamp</SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive>Overview</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>Traces</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>Evaluations</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent></Sidebar><SidebarInset className="min-h-48"><header className="flex items-center gap-3 border-b p-3"><SidebarTrigger /><span className="text-sm font-medium">Overview</span></header><div className="p-4 text-sm text-muted-foreground">Workspace navigation with responsive collapse behavior.</div></SidebarInset></SidebarProvider></div>;
}

export const story = defineStory({ id: "primitives/sidebar", registryItem: "ui-sidebar", displayName: "Sidebar", Component: SidebarStory, args: [{ variant: "Default", initial: { args: { variant: 'expanded' } } }] });
