# Truvesta

Authority Layer for Dealing Desks — UI Shell

## What Truvesta Is

**Truvesta is a proactive authorization gate.** It issues an **`AUTHORIZED`** or **`BLOCKED`** decision **before execution**. The execution platform remains master and proceeds only when authorization is present.

Unlike spreadsheets, Truvesta enforces decisions **in-band** (token-gated), with tamper-evident proof packs per decision.

> **We do not execute trades; we only authorize/block via token.**

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3001/command-center
```

## Architecture

Truvesta is the **commercial UI shell**. The authority kernel is **BrokerOps**.

```
┌─────────────────────────────────────────────────────────────┐
│                      TRUVESTA (UI Shell)                    │
│  - Renders governance decisions                             │
│  - Displays routing intent (ADVISORY only)                  │
│  - Shows economics estimates with disclaimers               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   BROKEROPS (Authority Kernel)              │
│  - Decision tokens (AUTHORIZED / BLOCKED)                   │
│  - Policy-as-code (OPA/Rego)                                │
│  - Tamper-evident audit (hash chain)                        │
│  - Evidence packs                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXECUTION PLATFORM (External)             │
│  - Actual trade execution                                   │
│  - LP routing                                               │
│  - Order management                                         │
└─────────────────────────────────────────────────────────────┘
```

## Integration Point

**Server-side integration at the execution authority boundary** (platform API / plugin layer) that enforces "no authorization → no execution."

For MT5: Server-side API / plugin integration (Manager API / Server API class) for pre-execution gating.

## Competitive Positioning

The market already sells **MT4/MT5 plugins** (risk controls, account rules, cover/bridge tooling) and **bridge/aggregation engines**; Truvesta differentiates by being **audit-first authorization** with portable evidence packs, not a platform-specific add-on.

### Competitive Matrix

| Capability | Excel / Spreadsheets | Broker Plugins / Bridges | Truvesta |
|------------|---------------------|--------------------------|----------|
| **Enforcement point** | None (manual) | Platform-specific | **Authorization token gate** (platform executes only if authorized) |
| **Concurrency / race conditions** | No atomic locking | Varies by vendor | Explicit idempotency + lifecycle ingestion |
| **Audit / non-repudiation** | Editable/deletable | Vendor logs (not tamper-evident) | **Hash-chained audit** + exportable evidence packs |
| **Vendor neutrality** | Neutral but non-enforcing | Vendor-tied per platform | **Sidecar contract** (OpenAPI/webhooks + decision token) |

### Fast Q&A

**"Why not Excel?"**
> Excel can describe decisions after the fact; Truvesta **enforces** authorization in-band and produces tamper-evident proof per decision.

**"Can it block?"**
> Yes: it returns **`BLOCKED`** with reasons; the platform refuses execution without **`AUTHORIZED`**.

## Boundary Contract

> Authority layer emits intent; execution platform remains master.

- Truvesta issues **AUTHORIZED** / **BLOCKED** tokens with reasons
- Truvesta emits **routing intent** (A-Book / B-Book / Hybrid)
- Truvesta does **NOT** execute trades or route to LPs

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/command-center` | Main demo (governance + routing + economics) |

## Evidence Discipline

Before any external demo, capture proof:

```bash
pnpm capture-evidence
```

This saves:
- `test-results/command_center_page.html` — rendered snapshot
- `test-results/command_center_page.sha256` — integrity hash

## Kernel Pin

Current kernel reference: `brokerops@5c49f1f`

The footer displays this pin for audit traceability.
