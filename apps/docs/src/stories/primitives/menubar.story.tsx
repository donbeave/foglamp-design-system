/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "@foglamp/design-system/ui/menubar";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function MenubarStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New workspace <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem><MenubarItem>Open trace <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem><MenubarSeparator /><MenubarItem>Export report</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Show activity</MenubarItem></MenubarContent></MenubarMenu></Menubar></div>;
}

export const story = defineStory({ id: "primitives/menubar", registryItem: "ui-menubar", displayName: "Menubar", Component: MenubarStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
