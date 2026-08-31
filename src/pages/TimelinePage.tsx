import { useState } from 'react';
import { Clock, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { useTimeline } from '@/hooks/useData';
import { cn } from '@/lib/utils';

const eventConfig: Record<string, { color: string; bg: string; dot: string }> = {
  person: { color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20', dot: 'bg-cyan-400' },
  vehicle: { color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20', dot: 'bg-cyan-400' },
  motion: { color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20', dot: 'bg-cyan-400' },
  'camera-offline': { color: 'text-red-300', bg: 'bg-red-500/10 border-red-500/20', dot: 'bg-red-400' },
  'recording-gap': { color: 'text-red-300', bg: 'bg-red-500/10 border-red-500/20', dot: 'bg-red-400' },
  recovered: { color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  bookmark: { color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400' },
  evidence: { color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20', dot: 'bg-cyan-400' },
  acquisition: { color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  verification: { color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  recovery: { color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  report: { color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
};

const filterTypes = [
  { id: 'all', label: 'All Events' },
  { id: 'person', label: 'Person' },
  { id: 'vehicle', label: 'Vehicle' },
  { id: 'motion', label: 'Motion' },
  { id: 'recovered', label: 'Recovered' },
  { id: 'camera-offline', label: 'Camera Issues' },
];

export function TimelinePage() {
  const { data: timelineEvents } = useTimeline();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? timelineEvents
    : filter === 'camera-offline'
    ? timelineEvents.filter((e) => e.type === 'camera-offline' || e.type === 'recording-gap')
    : timelineEvents.filter((e) => e.type === filter);

  return (
    <div>
      <PageHeader
        title="Investigation Timeline"
        subtitle="Chronological reconstruction of events across all cameras and evidence."
        icon={<Clock className="w-5 h-5" />}
      />

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-slate-500" />
        {filterTypes.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
              filter === f.id
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                : 'bg-ink-800/40 border-ink-700/40 text-slate-400 hover:border-ink-600'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="relative pl-8 py-4">
          {/* Vertical line */}
          <div className="absolute left-3 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-500/30 via-ink-700 to-ink-700" />

          {filtered.map((event, i) => {
            const config = eventConfig[event.type] || eventConfig.evidence;
            return (
              <div key={event.id} className="relative pb-6 last:pb-0 group">
                {/* Dot */}
                <div className={cn(
                  'absolute -left-[22px] top-1.5 w-3 h-3 rounded-full border-2 border-forensic-bg group-hover:scale-125 transition-transform',
                  config.dot
                )} />
                {/* Content */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="sm:w-44 flex-shrink-0">
                    <p className="text-xs font-mono text-slate-500">{event.timestamp}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border', config.bg, config.color)}>
                        {event.label}
                      </span>
                      <span className="text-xs text-slate-500">{event.camera}</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">{event.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {event.evidenceId && (
                        <Link
                          to={`/evidence/${event.evidenceId}`}
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          {event.evidenceId} <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                      <span className="text-xs text-slate-600 font-mono">{event.caseId}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {filtered.length === 0 && (
        <p className="text-center py-12 text-slate-500">No events match this filter.</p>
      )}
    </div>
  );
}
