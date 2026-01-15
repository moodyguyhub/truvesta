import Link from 'next/link'
import { formatProvenance } from './lib/provenance'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            TRUVESTA
          </h1>
          <p className="text-xl text-slate-400">
            Authority Layer for Dealing Desks
          </p>
        </div>

        <div className="text-sm text-slate-500 font-mono border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          Govern • Route Intent • Prove • Measure • Explain
        </div>

        <div className="pt-8">
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

        <p className="text-xs text-slate-600 pt-8">
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
