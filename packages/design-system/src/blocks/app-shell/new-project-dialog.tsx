/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/new-project-dialog.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/new-project-dialog.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Field, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { useProject, type Project } from "../../widgets/project-context";

export type NewProjectInput = { orgId: string; name: string; url?: string };
export function NewProjectDialog({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (open: boolean) => void; onCreate: (input: NewProjectInput, project: Project) => Promise<Project> }) {
  const { project, setProjectId } = useProject();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [pending, setPending] = useState(false);
  async function create() {
    if (!name.trim() || !project?.orgId || pending) return;
    setPending(true);
    try {
      const input = { orgId: project.orgId, name: name.trim(), url: url.trim() || undefined };
      const created: Project = { ...project, id: `project_${globalThis.crypto.randomUUID()}`, name: input.name, slug: input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), url: input.url ?? null };
      const result = await onCreate(input, created);
      setProjectId(result.id);
      onOpenChange(false);
      setName("");
      setUrl("");
      toast.success("Project created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create project");
    } finally {
      setPending(false);
    }
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader><DialogTitle>New project</DialogTitle></DialogHeader>
      <Field><FieldLabel>Name</FieldLabel><Input autoFocus placeholder="My project" value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field><FieldLabel className="gap-1.5">URL<span className="text-muted-foreground font-normal">(optional)</span></FieldLabel><Input placeholder="example.com" value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
      <DialogFooter><Button disabled={!name.trim() || !project?.orgId || pending} onClick={create}>Create</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}
