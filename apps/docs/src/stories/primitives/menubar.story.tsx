/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "@tailrocks/framerock/ui/menubar";
import { defineStory } from "../../lib/story";

function MenubarStory({
  showShortcuts = true,
  disabledExport = false,
}: {
  showShortcuts?: boolean;
  disabledExport?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New workspace {showShortcuts ? <MenubarShortcut>⌘N</MenubarShortcut> : null}
            </MenubarItem>
            <MenubarItem>
              Open trace {showShortcuts ? <MenubarShortcut>⌘O</MenubarShortcut> : null}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled={disabledExport}>Export report</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Show activity</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/menubar",
  registryItem: "ui-menubar",
  displayName: "Menubar",
  Component: MenubarStory,
  frame: { height: 280 },
  args: [
    { variant: "Default", initial: { showShortcuts: true, disabledExport: false } },
    { variant: "Export locked", initial: { showShortcuts: true, disabledExport: true } },
  ],
});
