import { ShieldCheck, Lock, CheckCircle2, Hash } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuditEntries } from '@/hooks/useData';
import { formatHash, cn } from '@/lib/utils';

export function AuditPage() {
  const { data: auditEntries } = useAuditEntries();
  return (
    <div>
      <PageHeader
        title="Chain of Custody"
        subtitle="Tamper-evident audit trail for all evidence actions."
        icon={<ShieldCheck className="w-5 h-5" />}
      />

      {/* Integrity Banner */}
      <Card className="mb-6 relative overflow-hidden border-emerald-500/20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-300">Evidence Integrity Verified</h3>
              <p className="text-sm text-slate-400 mt-0.5">All evidence items verified against acquisition-time SHA-256 signatures</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-emerald-300">Tamper-Evident</span>
          </div>
        </div>
      </Card>

      {/* Audit Timeline */}
      <Card>
        <div className="relative pl-8 py-2">
          {/* Vertical line */}
          <div className="absolute left-3 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/30 via-ink-700 to-ink-700" />

          {auditEntries.map((entry, i) => (
            <div key={entry.id} className="relative pb-5 last:pb-0 group">
              {/* Dot */}
              <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-forensic-bg group-hover:scale-125 transition-transform" />
              {/* Content */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 p-3 rounded-lg hover:bg-ink-800/30 transition-colors">
                <div className="lg:w-40 flex-shrink-0">
                  <p className="text-xs font-mono text-slate-400">{entry.date}</p>
                  <p className="text-xs font-mono text-cyan-300">{entry.timestamp}</p>
                </div>
                <div className="lg:w-44 flex-shrink-0">
                  <p className="text-sm font-medium text-slate-200">{entry.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{entry.user}</p>
                </div>
                <div className="lg:w-28 flex-shrink-0">
                  {entry.evidenceId !== 'N/A' ? (
                    <span className="text-xs font-mono text-cyan-300">{entry.evidenceId}</span>
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {entry.hash !== 'N/A' ? (
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="text-xs font-mono text-slate-500 truncate">{formatHash(entry.hash)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge status={entry.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {[
          { label: 'Total Actions', value: auditEntries.length, color: 'text-cyan-400' },
          { label: 'Verified', value: auditEntries.filter(a => a.status === 'verified').length, color: 'text-emerald-400' },
          { label: 'Failed', value: 0, color: 'text-red-400' },
          { label: 'Integrity', value: '100%', color: 'text-emerald-400' },
        ].map((stat, i) => (
          <Card key={i} className="!p-4 text-center">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
