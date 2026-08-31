import { useState } from 'react';
import { Search, Bell, ChevronDown, Zap } from 'lucide-react';

export function TopNav() {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between gap-4 px-6 bg-ink-900/80 backdrop-blur-md border-b border-ink-700/60">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-mono text-slate-400">Current Case</span>
          <span className="text-xs font-mono font-semibold text-cyan-300">CASE-2026-041</span>
        </div>
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search evidence, cases, devices..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-medium text-amber-300">Demo Mode</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-lg hover:bg-ink-800 transition-colors"
          >
            <Bell className="w-[18px] h-[18px] text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 border border-ink-900" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl p-2 shadow-2xl z-50 bg-ink-900 border border-ink-600 animate-scale-in origin-top-right">
              <p className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-slate-500">Notifications</p>
              <div className="space-y-1">
                {[
                  { t: 'Recovery scan 67% complete', s: '2 min ago', c: 'text-cyan-400' },
                  { t: 'SHA-256 verified — EVD-00233', s: '28 min ago', c: 'text-emerald-400' },
                  { t: 'New evidence acquired — EVD-00231', s: '1 hour ago', c: 'text-cyan-400' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg hover:bg-ink-800/60 transition-colors">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${n.c} bg-current flex-shrink-0`} />
                    <div>
                      <p className="text-sm text-slate-200">{n.t}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 pl-3 border-l border-ink-700">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 border border-cyan-500/30 flex items-center justify-center">
            <span className="text-sm font-semibold text-cyan-300">SC</span>
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-sm font-medium text-slate-200">Det. Sarah Chen</span>
            <span className="text-xs text-slate-500 mt-0.5">Senior Investigator</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
}
