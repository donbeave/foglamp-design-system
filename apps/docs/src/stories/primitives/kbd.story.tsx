/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Kbd, KbdGroup } from "@tailrocks/framerock/ui/kbd";
import { defineStory } from "../../lib/story";

function KbdStory({
  shortcut = "⌘K",
  label = "Command palette",
}: {
  shortcut?: string;
  label?: string;
}) {
  const keys = shortcut.length > 1 && shortcut.startsWith("⌘") ? ["⌘", shortcut.slice(1)] : [shortcut];
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm">{label}</span>
          <KbdGroup>
            {keys.map((key, idx) => (
              <Kbd key={idx}>{key}</Kbd>
            ))}
          </KbdGroup>
        </div>
        <p className="text-xs text-muted-foreground">Keyboard shortcuts stay legible in both themes.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/kbd",
  registryItem: "ui-kbd",
  displayName: "Kbd",
  Component: KbdStory,
  args: [
    { variant: "Default", initial: { shortcut: "⌘K", label: "Command palette" } },
    { variant: "Search traces", initial: { shortcut: "⌘F", label: "Filter spans" } },
  ],
});
