#!/usr/bin/env python3
"""Add repeatable source and creator headers to extracted Foglamp source files."""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ".reference/foglamp"
HEADER_MARKER = "Original design and implementation by Gustavo Fior"

# Explicit mappings for files whose upstream location is not derivable from their
# destination. Other files are mapped by destination path under packages/.
SOURCE_MAP = {
    "packages/design-system/src/icons/brand-logos.tsx": "apps/web/src/components/brand-logos.tsx",
    "packages/design-system/src/hooks/use-copied.ts": "apps/web/src/components/app/use-copied.ts",
    "packages/design-system/src/hooks/use-mobile.ts": "packages/ui/src/hooks/use-mobile.ts",
    "packages/design-system/src/lib/utils.ts": "packages/ui/src/lib/utils.ts",
    "packages/design-system/src/hooks/use-app-hooks.ts": "apps/web/src/components/app/hooks.ts",
    "packages/design-system/src/widgets/leaf/agent-icon.tsx": "apps/web/src/components/app/agent-icon.tsx",
    "packages/design-system/src/widgets/leaf/copy-button.tsx": "apps/web/src/components/app/copy-button.tsx",
    "packages/design-system/src/widgets/leaf/copy-icon.tsx": "apps/web/src/components/app/copy-icon.tsx",
    "packages/design-system/src/widgets/leaf/customer-avatar.tsx": "apps/web/src/components/app/customer-avatar.tsx",
    "packages/design-system/src/widgets/leaf/node-flow.tsx": "apps/web/src/components/app/node-flow.tsx",
    "packages/design-system/src/widgets/leaf/project-icon.tsx": "apps/web/src/components/app/project-icon.tsx",
    "packages/design-system/src/widgets/leaf/relative-time.tsx": "apps/web/src/components/app/relative-time.tsx",
    "packages/design-system/src/widgets/leaf/span-type.tsx": "apps/web/src/components/app/span-type.tsx",
    "packages/design-system/src/widgets/leaf/stat.tsx": "apps/web/src/components/app/stat.tsx",
    "packages/design-system/src/widgets/leaf/sunset-card.tsx": "apps/web/src/components/app/sunset-card.tsx",
    "packages/design-system/src/widgets/leaf/tool-icon.tsx": "apps/web/src/components/app/tool-icon.tsx",
    "packages/design-system/src/widgets/leaf/preset-meta.ts": "apps/web/src/app/(app)/evals/preset-meta.ts",
    "packages/design-system/src/widgets/leaf/favicon.ts": "apps/web/src/components/scan/favicon.ts",
    "packages/design-system/src/widgets/leaf/scan-brand.tsx": "apps/web/src/components/scan/brand.tsx",
    "packages/design-system/src/icons/brand-mark.tsx": "apps/web/src/components/marketing/brand-mark.tsx",
    "packages/design-system/src/icons/logo.tsx": "apps/web/src/components/marketing/logo.tsx",
    "packages/design-system/src/icons/model-logo.tsx": "apps/web/src/components/model-logo.tsx",
    "packages/design-system/src/lib/format.ts": "apps/web/src/lib/format.ts",
    "packages/design-system/src/lib/range.ts": "apps/web/src/lib/range.ts",
    "packages/design-system/src/lib/trace-timeline.ts": "apps/web/src/lib/trace-timeline.ts",
    "packages/design-system/src/lib/payload-messages.ts": "apps/web/src/components/app/payload-messages.ts",
    "packages/design-system/src/lib/payload-messages.test.ts": "apps/web/src/components/app/payload-messages.test.ts",
    "packages/design-system/src/lib/scan/diff.ts": "apps/web/src/components/scan/diff.ts",
    "packages/design-system/src/lib/scan/fold-graph.ts": "apps/web/src/components/scan/fold-graph.ts",
    "packages/design-system/src/lib/scan/layout.ts": "apps/web/src/components/scan/layout.ts",
    "packages/design-system/src/lib/scan/personality.ts": "apps/web/src/components/scan/personality.ts",
}


def source_for(relative: str) -> str | None:
    if relative in SOURCE_MAP:
        source = SOURCE_MAP[relative]
        if (ROOT / SOURCE_ROOT / source).is_file():
            return source
        raise FileNotFoundError(f"mapped upstream source does not exist: {source} ({relative})")
    prefix = "packages/design-system/src/"
    if relative.startswith(prefix):
        candidate = relative[len(prefix) :]
        for base in ("packages/ui/src/", "apps/web/src/"):
            path = ROOT / SOURCE_ROOT / base / candidate
            if path.is_file():
                return base + candidate
        # UI primitives are flat in the extracted destination and upstream.
        if candidate.startswith("ui/"):
            candidate = "components/" + candidate[len("ui/") :]
            upstream = "packages/ui/src/" + candidate
            if (ROOT / SOURCE_ROOT / upstream).is_file():
                return upstream
    return None


def header(relative: str, source: str | None) -> str:
    if source:
        return (
            f"/* Original design and implementation by Gustavo Fior (@gustavo-fior), "
            f"with co-founder Abdul Haidar at Foglamp Labs.\n"
            f" * Extracted from {SOURCE_ROOT}/{source}; derived here under Apache-2.0.\n"
            f" */\n"
        )
    return (
        "/* Derived for the Foglamp Design System portal by the project contributors.\n"
        " * It adapts Foglamp concepts and assets; this new integration code is not represented as upstream-authored.\n"
        " * Original project: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs; Apache-2.0 source project.\n"
        " */\n"
    )


def add_header(path: Path, check: bool) -> bool:
    relative = path.relative_to(ROOT).as_posix()
    content = path.read_text()
    prefix = ""
    # Keep hashbangs and directives (notably `use client`) as the first executable
    # statements, with attribution immediately following them.
    match = re.match(r"^(?:#![^\n]*\n)?(?:\s*['\"]use (?:client|server)['\"];?\s*\n)+", content)
    if match:
        prefix, content = match.group(0), content[match.end() :]
    expected = header(relative, source_for(relative))
    existing = re.match(r"/\*[\s\S]*?\*/\n", content)
    if existing and (HEADER_MARKER in existing.group(0) or "Derived for the Foglamp Design System portal" in existing.group(0)):
        if existing.group(0) == expected:
            return False
        content = content[existing.end() :]
    text = prefix + expected + content
    if not check:
        path.write_text(text)
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs="+", help="workspace-relative files to attribute")
    parser.add_argument("--check", action="store_true", help="report files missing headers without editing")
    args = parser.parse_args()
    changed = 0
    for item in args.paths:
        path = (ROOT / item).resolve()
        if not path.is_relative_to(ROOT) or not path.is_file():
            print(f"invalid or missing workspace file: {item}", file=sys.stderr)
            return 2
        changed += add_header(path, args.check)
    print(f"{'headers missing or stale' if args.check else 'headers added or corrected'}: {changed}")
    return 1 if args.check and changed else 0


if __name__ == "__main__":
    raise SystemExit(main())
