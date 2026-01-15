import Link from 'next/link'
import { formatProvenance } from './lib/provenance'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            TRUVESTA
          </h1>
          <p className="text-xl text-slate-400">
            Proactive Authorization Gate for Dealing Desks
          </p>
        </div>

        {/* Key value prop */}
        <div className="text-sm text-slate-300 border border-slate-700 rounded-lg p-6 bg-slate-900/50 text-left space-y-3">
          <p>
            <span className="text-cyan-400 font-semibold">AUTHORIZED</span> or{' '}
            <span className="text-rose-400 font-semibold">BLOCKED</span> — decided{' '}
            <span className="text-white font-semibold">before execution</span>.
          </p>
          <p className="text-slate-400 text-xs">
            Unlike spreadsheets, Truvesta enforces decisions <strong className="text-slate-200">in-band</strong> (token-gated), 
            with tamper-evident proof packs per decision.
          </p>
        </div>

        {/* Tagline */}
        <div className="text-sm text-slate-500 font-mono border border-slate-800 rounded-lg p-4 bg-slate-900/30">
          Govern • Route Intent • Prove • Measure • Explain
        </div>

        <div className="pt-4">
          <Link 
            href="/command-center"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Enter Command Center
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>

        {/* Boundary contract */}
        <p className="text-xs text-slate-600 pt-4">
          We do not execute trades; we only authorize/block via token.
        </p>
        <p className="text-xs text-slate-700">
          Authority layer emits intent; execution platform remains master.
        </p>
      </div>

      {/* Dual-SHA Pin Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800 px-8 py-3 font-mono text-xs text-slate-500 flex justify-between items-center">
        <span>{formatProvenance()}</span>
        <span className="text-slate-600">v2.0-PROTOTYPE</span>
      </footer>
    </main>
  )
}
