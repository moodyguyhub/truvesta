# Production Evidence Pack — 2026-01-15

## Capture Context
- **Date:** 2026-01-15
- **UI Commit:** `truvesta@30b1f28`
- **Kernel Commit:** `brokerops@5c49f1f`

## Artifacts

| File | Purpose |
|------|---------|
| `landing.html` | Raw HTML of `/` |
| `landing.sha256` | Integrity hash |
| `command_center.html` | Raw HTML of `/command-center` |
| `command_center.sha256` | Integrity hash |
| `headers_landing.txt` | HTTP response headers (includes provider proof) |
| `headers_command_center.txt` | HTTP response headers |
| `vercel_proof.txt` | Extracted Vercel-specific headers |
| `provenance_proof.txt` | Extracted footer provenance string |

## Verified Claims

### 1. Hosting Provider: Vercel ✅
```
server: Vercel
x-vercel-cache: HIT
x-vercel-id: fra1::z5qt8-1768509907396-69dd4aff49fc
```
Source: `headers_landing.txt`

### 2. Provenance Footer ✅
```
KERNEL: brokerops@5c49f1f • UI: truvesta@30b1f28 • 2026-01-15 (Asia/Nicosia)
```
Source: `provenance_proof.txt`

### 3. SHA256 Integrity
- `landing.html`: `6feabbcaead0b77015edb802d86404e04be71a1b16ca0b98cfc89c95d26124d4`
- `command_center.html`: `b44622752327ea0d7e7bf18937287fbb2d3beb5f233285e6c04cecc5e1964b9c`

## Reproduction
```bash
curl -sI https://www.truvesta.io > headers_landing.txt
curl -sS https://www.truvesta.io > landing.html
sha256sum landing.html
```

## Evidence Discipline
This pack follows the two-commit protocol:
1. Code commit (`30b1f28`) defines behavior
2. Evidence commit pins observable output to that SHA
