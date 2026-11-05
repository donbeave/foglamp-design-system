/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/project-context.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/project-context.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";

export type Project = {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  orgId: string;
  orgName: string;
  orgSlug: string;
};

type ProjectContextValue = {
  projects: Project[];
  project: Project | null;
  projectId: string | null;
  setProjectId: (id: string) => void;
  isLoading: boolean;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: "project_demo",
    name: "Acme Production",
    slug: "acme-production",
    url: null,
    orgId: "org_demo",
    orgName: "Acme",
    orgSlug: "acme",
  },
];

const ProjectContext = createContext<ProjectContextValue | null>(null);

/**
 * Project selection state with injectable data and a small mock default. The
 * host application owns persistence and route changes through onProjectChange.
 */
export function ProjectProvider({
  children,
  projects = MOCK_PROJECTS,
  initialProjectId,
  isLoading = false,
  onProjectChange,
}: {
  children: React.ReactNode;
  projects?: Project[];
  initialProjectId?: string | null;
  isLoading?: boolean;
  onProjectChange?: (id: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(
    initialProjectId ?? projects[0]?.id ?? null,
  );
  const setProjectId = useCallback(
    (id: string) => {
      setSelected(id);
      onProjectChange?.(id);
    },
    [onProjectChange],
  );
  const value = useMemo<ProjectContextValue>(() => {
    const project = projects.find((item) => item.id === selected) ?? null;
    return {
      projects,
      project,
      projectId: project?.id ?? null,
      setProjectId,
      isLoading,
    };
  }, [projects, selected, isLoading, setProjectId]);

  return <ProjectContext value={value}>{children}</ProjectContext>;
}

export function useProject(): ProjectContextValue {
  const ctx = use(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
