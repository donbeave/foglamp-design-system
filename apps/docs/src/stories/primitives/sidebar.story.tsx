/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@tailrocks/framerock/ui/sidebar";
import { defineStory } from "../../lib/story";

function SidebarStory({
  collapsible = "icon",
  activeItem = "Traces",
}: {
  collapsible?: "offcanvas" | "icon" | "none";
  activeItem?: "Overview" | "Traces" | "Evaluations";
}) {
  const navItems: Array<"Overview" | "Traces" | "Evaluations"> = ["Overview", "Traces", "Evaluations"];
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="w-full overflow-hidden rounded-lg border border-border/60">
        <SidebarProvider defaultOpen>
          <Sidebar collapsible={collapsible}>
            <SidebarHeader className="p-3 font-semibold">Framerock</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton isActive={activeItem === item}>{item}</SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="min-h-64">
            <header className="flex items-center gap-3 border-b p-3">
              <SidebarTrigger />
              <span className="text-sm font-medium">{activeItem}</span>
            </header>
            <div className="p-4 text-sm text-muted-foreground">Workspace navigation with responsive collapse behavior.</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/sidebar",
  registryItem: "ui-sidebar",
  displayName: "Sidebar",
  Component: SidebarStory,
  frame: { width: 960, height: 520 },
  args: [
    { variant: "Icon collapse", initial: { collapsible: "icon", activeItem: "Traces" } },
    { variant: "Offcanvas", initial: { collapsible: "offcanvas", activeItem: "Overview" } },
    { variant: "Fixed", initial: { collapsible: "none", activeItem: "Evaluations" } },
  ],
});
