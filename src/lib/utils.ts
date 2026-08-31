export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatHash(hash: string): string {
  if (!hash || hash === 'N/A') return 'N/A';
  return `${hash.slice(0, 12)}...${hash.slice(-8)}`;
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    pending: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    closed: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
    archived: 'text-slate-400 bg-slate-500/5 border-slate-500/20',
    verified: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    failed: 'text-red-300 bg-red-500/10 border-red-500/30',
    online: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    offline: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
    syncing: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    error: 'text-red-300 bg-red-500/10 border-red-500/30',
    processing: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    acquired: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    recovered: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    corrupted: 'text-red-300 bg-red-500/10 border-red-500/30',
  };
  return map[status] || 'text-slate-300 bg-slate-500/10 border-slate-500/30';
}
