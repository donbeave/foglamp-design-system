/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Spinner } from "@tailrocks/framerock/ui/spinner";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function SpinnerStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="flex items-center gap-3"><Spinner /><span className="text-sm">Loading trace details</span></div></div>;
}

export const story = defineStory({ id: "primitives/spinner", registryItem: "ui-spinner", displayName: "Spinner", Component: SpinnerStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
