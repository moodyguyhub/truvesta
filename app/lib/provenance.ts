/**
 * Provenance constants for Truvesta UI shell.
 * 
 * BOUNDARY CONTRACT:
 * - KERNEL_COMMIT: BrokerOps authority layer SHA (static reference)
 * - UI_COMMIT: Truvesta UI shell SHA (from env at build time)
 * 
 * IMPORTANT: NEXT_PUBLIC_* values are inlined at build time.
 * Changing env vars requires a new deployment.
 */

// BrokerOps kernel commit (static reference to authority layer)
export const KERNEL_COMMIT = '5c49f1f';

// Truvesta UI commit (from Vercel system env or explicit override)
export const UI_COMMIT =
  process.env.NEXT_PUBLIC_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  'dev';

// Capture date for demo evidence
export const CAPTURE_DATE = '2026-01-15';
export const CAPTURE_TZ = 'Asia/Nicosia';

/**
 * Format the footer provenance string.
 * Pattern: "KERNEL: brokerops@{sha} • UI: truvesta@{sha} • {date} ({tz})"
 */
export function formatProvenance(): string {
  const uiShort = UI_COMMIT.slice(0, 7);
  return `KERNEL: brokerops@${KERNEL_COMMIT} • UI: truvesta@${uiShort} • ${CAPTURE_DATE} (${CAPTURE_TZ})`;
}
