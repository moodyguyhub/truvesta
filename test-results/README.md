# Truvesta Test Results & Demo Evidence

This directory stores evidence artifacts for the Truvesta Command Center demo.

## Purpose

Board-ready demo artifacts with cryptographic proof of what was shown.
Truvesta is the **UI/product shell**; BrokerOps is the **authority kernel**.

---

## Demo Evidence: Command Center

### Artifact Details

| Field | Value |
|-------|-------|
| URL fetched | `http://localhost:3001/command-center` |
| Capture date | 2026-01-15 (Asia/Nicosia) |
| Kernel commit | `brokerops@5c49f1f` |
| UI commit | `truvesta@c10eb34` |
| SHA256 | `6ba39d600584128e3e0bd3dc8823b3616f560f6d335e14699cf08c7dde53b9c8` |

### Provenance String (verified in HTML)

```
KERNEL: brokerops@5c49f1f • UI: truvesta@c10eb34 • 2026-01-15 (Asia/Nicosia)
```

### Deterministic Reproduction Command

```bash
# From truvesta repo root — ALWAYS pin the SHA at capture time
cd /home/mahmood-asadi/truvesta
UI_SHA="$(git rev-parse --short HEAD)"

pkill -f "next dev" 2>/dev/null || true
NEXT_PUBLIC_GIT_COMMIT_SHA="$UI_SHA" npx next dev -p 3001 &
sleep 8

curl -sS --max-time 10 http://localhost:3001/command-center > test-results/command_center_page.html
sha256sum test-results/command_center_page.html | tee test-results/command_center_page.sha256

# Verify provenance matches
grep -oE "KERNEL: brokerops@[a-f0-9]+ • UI: truvesta@[a-f0-9]+.*Asia/Nicosia" test-results/command_center_page.html | head -1
```

Or use the npm script:
```bash
pnpm capture-evidence
```

### Atomic Evidence Principle

**Provenance string + captured HTML + SHA256** form a single atomic unit.
If any one changes, recapture all three. This prevents demo-proof disputes.

### Contract Compliance Checklist

- [x] Uses canonical terms: `AUTHORIZED` / `BLOCKED` (not PASSED/ALLOW)
- [x] Boundary clarity: "Authority layer emits intent; execution platform remains master."
- [x] Economics disclaimer: "Demo numbers are placeholders (do not treat as realized P&L)."
- [x] Routing labeled as `ADVISORY` (not execution)
- [x] Dual-SHA footer: `KERNEL: brokerops@5c49f1f • UI: truvesta@c10eb34`

### Verification

```bash
# Re-verify hash integrity
sha256sum -c test-results/command_center_page.sha256

# Check for canonical terms
grep -E "AUTHORIZED|BLOCKED" test-results/command_center_page.html | head -5

# Check boundary clarity
grep -i "intent.*execution platform" test-results/command_center_page.html

# Check kernel pin
grep "brokerops@" test-results/command_center_page.html
```

---

## Architecture Boundary

**Truvesta repo is UI shell only.**

- ✅ Renders governance decisions from BrokerOps kernel
- ✅ Displays routing *intent* (advisory only)
- ✅ Shows economics *estimates* with disclaimers
- ❌ Does NOT execute trades
- ❌ Does NOT route orders to LPs
- ❌ Does NOT touch funds

Source: `BrokerOps/docs/decisions/DEC-2026-01-15-GATE-CONTRACT.md`

---

## Files

- `command_center_page.html` - Rendered HTML snapshot of /command-center (local dev)
- `command_center_page.sha256` - SHA256 hash for integrity verification (local dev)
- `command_center_prod.html` - Rendered HTML snapshot from production (pending deploy)
- `command_center_prod.sha256` - SHA256 hash for production artifact (pending deploy)

---

## Production Evidence Capture (Post-Deploy)

After deploying to Vercel, capture production evidence:

```bash
mkdir -p test-results

# capture rendered HTML from prod
curl -sS --max-time 15 https://truvesta.io/command-center \
  > test-results/command_center_prod.html

# hash it
sha256sum test-results/command_center_prod.html \
  | tee test-results/command_center_prod.sha256

# verify required strings exist
grep -E "KERNEL: brokerops@|UI: truvesta@|AUTHORIZED|BLOCKED|Authority layer emits intent; execution platform remains master|placeholders" \
  test-results/command_center_prod.html \
  | tee test-results/command_center_prod_proof.txt
```

---

## Environment Variables for Vercel

Set these in Vercel project settings:

| Variable | Value | Note |
|----------|-------|------|
| `NEXT_PUBLIC_GIT_COMMIT_SHA` | *(auto or explicit)* | UI shell commit SHA |

If using Vercel Git integration, `VERCEL_GIT_COMMIT_SHA` is auto-populated.
For explicit control, set `NEXT_PUBLIC_GIT_COMMIT_SHA` manually to the commit SHA.

**Important:** `NEXT_PUBLIC_*` values are inlined at build time. Changing env vars requires a new deployment.
