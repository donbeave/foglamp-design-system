/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

/// <reference path="../react-shim.d.ts" />

declare module "elkjs/lib/elk-worker.min.js" {
  export const Worker: unknown;
  const workerUrl: string;
  export default workerUrl;
}

declare module "elkjs/lib/elk-worker.min.js?url" {
  const workerUrl: string;
  export default workerUrl;
}
