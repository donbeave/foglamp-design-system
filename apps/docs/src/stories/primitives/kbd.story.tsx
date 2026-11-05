/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Kbd, KbdGroup } from "@tailrocks/framerock/ui/kbd";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function KbdStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="flex flex-col gap-4"><p className="text-sm">Open command search</p><KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup><p className="text-sm text-muted-foreground">Keyboard shortcuts stay legible in both themes.</p></div></div>;
}

export const story = defineStory({ id: "primitives/kbd", registryItem: "ui-kbd", displayName: "Kbd", Component: KbdStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
