/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@tailrocks/framerock/ui/navigation-menu";
import { defineStory } from "../../lib/story";

function NavigationMenuStory({
  primaryLabel = "Platform",
  secondaryLabel = "Resources",
}: {
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{primaryLabel}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[22rem] gap-2 p-3">
                <NavigationMenuLink href="#traces" className="rounded-md p-3 hover:bg-muted">
                  <strong className="block text-sm">Trace explorer</strong>
                  <span className="text-xs text-muted-foreground">Inspect model calls and latency.</span>
                </NavigationMenuLink>
                <NavigationMenuLink href="#evaluations" className="rounded-md p-3 hover:bg-muted">
                  <strong className="block text-sm">Evaluations</strong>
                  <span className="text-xs text-muted-foreground">Compare quality over time.</span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{secondaryLabel}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#docs" className="block p-4">Documentation</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/navigation-menu",
  registryItem: "ui-navigation-menu",
  displayName: "Navigation Menu",
  Component: NavigationMenuStory,
  frame: { height: 280 },
  args: [
    { variant: "Default", initial: { primaryLabel: "Platform", secondaryLabel: "Resources" } },
    { variant: "Observability", initial: { primaryLabel: "Observability", secondaryLabel: "SDK Docs" } },
  ],
});
