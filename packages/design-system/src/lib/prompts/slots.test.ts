/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 *
 * @provenance copied-1-to-1
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path packages/prompts/src/slots.test.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/packages/prompts/src/slots.test.ts
 *
 * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
 * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
 * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { describe, expect, test } from "bun:test";

import { SLOT_LINE } from "./infer";
import { slotValues } from "./slots";

describe("slotValues", () => {
  test("reads each slot's text from a member prompt", () => {
    const template = `You help:\n${SLOT_LINE}\nRules:\n- be kind\n${SLOT_LINE}\nNever guess.`;
    const text =
      "You help:\nAda\nRules:\n- be kind\nContext: order 12 is late\nSecond line\nNever guess.";
    expect(slotValues(template, text)).toEqual(["Ada", "Context: order 12 is late\nSecond line"]);
  });

  test("an empty slot reads as an empty string", () => {
    const template = `Intro\n${SLOT_LINE}\nOutro`;
    expect(slotValues(template, "Intro\nOutro")).toEqual([""]);
  });

  test("no slots, no values", () => {
    expect(slotValues("Plain prompt", "Plain prompt")).toEqual([]);
  });

  test("adjacent slots that collapse into one change are unattributable", () => {
    const template = `A\n${SLOT_LINE}\nB\n${SLOT_LINE}\nC`;
    // "B" is gone from this prompt, so both slots and B become one hunk.
    expect(slotValues(template, "A\nx\ny\nC")).toEqual([null, null]);
  });

  test("a slot whose neighbour also changed is unattributable", () => {
    const template = `Hello\n${SLOT_LINE}\nBye`;
    expect(slotValues(template, "Hello\nworld\nBye")).toEqual(["world"]);
    // "Bye" changed too, so the hunk's added lines can't be split.
    expect(slotValues(template, "Hello\nworld\nFarewell")).toEqual([null]);
  });
});
