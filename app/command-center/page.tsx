'use client';

import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  GitMerge,
  Lock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { formatProvenance } from '../lib/provenance';

type GovernanceStatus = 'AUTHORIZED' | 'BLOCKED';
type RoutingDecision = 'A_BOOK' | 'B_BOOK' | 'HYBRID';
type IntegrityStatus = 'VERIFIED' | 'MISMATCH';

type DemoScenario = {
  name: string;
  traceId: string;
  client: string;
  symbol: string;
  sizeLabel: string;
  governance: GovernanceStatus;
  routing: { decision: RoutingDecision; split?: { a: number; b: number } };
  economics: {
    estImpactUsd: number;
    ifPureABookUsd: number;
    ifPureBBookUsd: number;
    routingValueVsBenchmarkUsd: number;
    note?: string;
  };
  integrity: { status: IntegrityStatus; hashPreview: string };
};

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    name: 'VIP / Unknown Risk → HYBRID',
    traceId: 'trc_8f92a10',
    client: 'VIP_Fund_Alpha',
    symbol: 'XAUUSD',
    sizeLabel: '50 Lots',
    governance: 'AUTHORIZED',
    routing: { decision: 'HYBRID', split: { a: 70, b: 30 } },
    economics: {
      estImpactUsd: 1250,
      ifPureABookUsd: 450,
      ifPureBBookUsd: -2100,
      routingValueVsBenchmarkUsd: 800,
      note: 'Demo numbers are placeholders (do not treat as realized P&L).',
    },
    integrity: { status: 'VERIFIED', hashPreview: 'sha256:8f92a10c...7b91' },
  },
  {
    name: 'Toxic Flow → A-BOOK',
    traceId: 'trc_1c03b9d',
    client: 'Scalper_Group_7',
    symbol: 'EURUSD',
    sizeLabel: '12 Lots',
    governance: 'AUTHORIZED',
    routing: { decision: 'A_BOOK' },
    economics: {
      estImpactUsd: 180,
      ifPureABookUsd: 180,
      ifPureBBookUsd: -3200,
      routingValueVsBenchmarkUsd: 180,
      note: 'Demo numbers are placeholders (do not treat as realized P&L).',
    },
    integrity: { status: 'VERIFIED', hashPreview: 'sha256:1c03b9d1...a41e' },
  },
  {
    name: 'Policy Block → BLOCKED',
    traceId: 'trc_9aa2f11',
    client: 'Retail_Cluster_22',
    symbol: 'XAUUSD',
    sizeLabel: '5 Lots',
    governance: 'BLOCKED',
    routing: { decision: 'B_BOOK' },
    economics: {
      estImpactUsd: 0,
      ifPureABookUsd: 0,
      ifPureBBookUsd: 0,
      routingValueVsBenchmarkUsd: 0,
      note: 'Blocked: economics intentionally zeroed (no execution).',
    },
    integrity: { status: 'VERIFIED', hashPreview: 'sha256:9aa2f11c...0dd2' },
  },
];

function formatMoney(n: number) {
  const sign = n >= 0 ? '+' : '-';
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CommandCenterPage() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const s = useMemo(() => DEMO_SCENARIOS[scenarioIdx], [scenarioIdx]);

  const routingLabel =
    s.routing.decision === 'HYBRID'
      ? `HYBRID (${s.routing.split?.a}/${s.routing.split?.b})`
      : s.routing.decision.replace('_', '-');

  const aBookPct = s.routing.decision === 'HYBRID' 
    ? `${s.routing.split?.a}%` 
    : s.routing.decision === 'A_BOOK' ? '100%' : '0%';
  const bBookPct = s.routing.decision === 'HYBRID' 
    ? `${s.routing.split?.b}%` 
    : s.routing.decision === 'B_BOOK' ? '100%' : '0%';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 pb-20 font-sans">
      {/* Back navigation */}
      <a href="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Home
      </a>

      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center rotate-3">
            <ShieldCheck className="text-slate-950 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              TRUVESTA <span className="text-slate-500 font-mono text-sm ml-2">v2.0-PROTOTYPE</span>
            </h1>
            <div className="text-xs text-slate-500 font-mono">
              traceId: <span className="text-slate-300">{s.traceId}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEM ACTIVE
          </span>

          <select
            className="bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-slate-200 text-xs"
            value={scenarioIdx}
            onChange={(e) => setScenarioIdx(Number(e.target.value))}
          >
            {DEMO_SCENARIOS.map((x, i) => (
              <option key={x.traceId} value={i}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: Governance + Routing */}
        <div className="col-span-8 space-y-6">
          {/* Governance Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={120} />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Step 1: Governance
                </h2>
                <p className="text-2xl font-bold text-white flex items-center gap-2">
                  Policy Decision
                  {s.governance === 'AUTHORIZED' ? (
                    <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                  ) : (
                    <AlertCircle className="text-rose-500 w-6 h-6" />
                  )}
                </p>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-mono border ${
                  s.governance === 'AUTHORIZED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}
              >
                {s.governance}
              </div>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <span className="text-slate-400">Client</span>
                <span className="text-slate-200">{s.client}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <span className="text-slate-400">Instrument</span>
                <span className="text-slate-200">{s.symbol}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <span className="text-slate-400">Size</span>
                <span className="text-slate-200">{s.sizeLabel}</span>
              </div>
            </div>
          </div>

          {/* Routing Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <GitMerge size={120} />
            </div>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Step 2: Routing Intent
                </h2>
                <p className="text-2xl font-bold text-white">Policy-Driven Route: {routingLabel}</p>
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  Authority layer emits intent; execution platform remains master.
                </p>
              </div>

              <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/20">
                ADVISORY
              </div>
            </div>

            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10" />

              <div className="flex flex-col items-center bg-slate-900 p-2 z-10">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white font-bold text-xs">
                  ORDER
                </div>
                <span className="text-xs text-slate-500 mt-2 font-mono">{s.sizeLabel}</span>
              </div>

              <div className="flex flex-col items-center bg-slate-900 p-2 z-10">
                <div className="w-16 h-16 rounded-full bg-cyan-900/20 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <GitMerge size={24} />
                </div>
                <span className="text-xs text-cyan-400 mt-2 font-bold tracking-wider">ROUTING</span>
              </div>

              <div className="flex gap-8 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-24 p-3 rounded-lg bg-blue-900/10 border border-blue-500/30 text-center">
                    <span className="block text-xs text-blue-400 font-bold mb-1">A-BOOK</span>
                    <span className="block text-lg font-mono text-white">{aBookPct}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2">External hedge</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-24 p-3 rounded-lg bg-purple-900/10 border border-purple-500/30 text-center">
                    <span className="block text-xs text-purple-400 font-bold mb-1">B-BOOK</span>
                    <span className="block text-lg font-mono text-white">{bBookPct}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2">Internalize</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Economics + Proof */}
        <div className="col-span-4 space-y-6">
          {/* Economics Card */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp size={16} /> Decision Economics
            </h2>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 uppercase">Estimated Impact</span>
                <div className="text-4xl font-mono font-bold text-emerald-400 mt-1">
                  {formatMoney(s.economics.estImpactUsd)}
                </div>
                {s.economics.note && (
                  <div className="text-[11px] text-slate-500 mt-2">{s.economics.note}</div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">If 100% A-Book:</span>
                  <span className="font-mono text-white">{formatMoney(s.economics.ifPureABookUsd)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">If 100% B-Book:</span>
                  <span className={`font-mono ${s.economics.ifPureBBookUsd < 0 ? 'text-rose-400' : 'text-white'}`}>
                    {formatMoney(s.economics.ifPureBBookUsd)}
                  </span>
                </div>

                <div className="mt-4 bg-emerald-500/10 rounded p-2 text-center border border-emerald-500/20">
                  <span className="text-xs text-emerald-400 font-bold">
                    ROUTING VALUE: {formatMoney(s.economics.routingValueVsBenchmarkUsd)} vs benchmark
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Proof Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Cryptographic Proof</h3>
                <p className="text-xs text-slate-500">
                  Hash Chain {s.integrity.status === 'VERIFIED' ? 'Verified' : 'Mismatch'}
                </p>
              </div>
            </div>

            <div className="bg-black/30 rounded p-3 font-mono text-[10px] text-slate-500 break-all border border-slate-800">
              {s.integrity.hashPreview}
              <div className="flex justify-end mt-2">
                <span className="text-cyan-500 flex items-center gap-1 cursor-pointer hover:text-cyan-400">
                  Verify <ChevronRight size={10} />
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              Demo-only "Verify" action is UI stub.
            </div>
          </div>
        </div>
      </div>

      {/* Kernel Pin Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800 px-8 py-2 font-mono text-[11px] text-slate-500 flex justify-between items-center">
        <span>{formatProvenance()}</span>
        <span>Authority layer emits intent; execution platform remains master.</span>
      </footer>
    </div>
  );
}
