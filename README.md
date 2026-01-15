# Truvesta

Authority Layer for Dealing Desks — UI Shell

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
