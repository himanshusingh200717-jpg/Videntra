import { useState } from 'react';
import {
  Stethoscope,
  FileSearch,
  Puzzle,
  Database,
  Layers,
  Clock,
  Scan,
  Play,
  Loader2,
  CheckCircle2,
  HardDrive,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { recoveryMethods, storageStats, storageSectors } from '@/data/recovery';
import { cn } from '@/lib/utils';

const methodIcons: Record<string, typeof FileSearch> = {
  'file-search': FileSearch,
  'puzzle': Puzzle,
  'database': Database,
  'layers': Layers,
  'clock': Clock,
  'scan': Scan,
};

const sectorColors: Record<string, string> = {
  valid: 'bg-cyan-500/40',
  deleted: 'bg-amber-500/40',
  corrupted: 'bg-red-500/40',
  recoverable: 'bg-emerald-500/40',
  unknown: 'bg-ink-700',
};

export function RecoveryPage() {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + 3;
      });
    }, 80);
  };

  return (
    <div>
      <PageHeader
        title="Forensic Recovery Lab"
        subtitle="Recover deleted, corrupted, and fragmented surveillance footage from DVR/NVR storage."
        icon={<Stethoscope className="w-5 h-5" />}
        actions={
          <button
            onClick={handleScan}
            disabled={scanning}
            className="px-5 py-2.5 text-sm font-semibold text-ink-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
          >
            {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {scanning ? 'Scanning...' : 'Start Recovery Scan'}
          </button>
        }
      />

      {/* Scan Progress */}
      {(scanning || scanComplete) && (
        <Card className="mb-6 relative overflow-hidden">
          {scanning && (
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
          )}
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center',
              scanComplete ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
            )}>
              {scanning ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {scanning ? 'Scanning storage sectors...' : 'Scan complete'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {scanning ? `Analyzing ${storageStats.sectors.toLocaleString()} sectors` : '3 recoverable segments found'}
              </p>
              <div className="mt-2"><ProgressBar value={scanProgress} color={scanComplete ? 'emerald' : 'cyan'} height="h-1.5" /></div>
            </div>
            <span className={cn('text-2xl font-bold font-mono', scanComplete ? 'text-emerald-400' : 'text-cyan-400')}>
              {scanProgress}%
            </span>
          </div>
        </Card>
      )}

      {/* Storage Map */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white">Storage Sector Map</h3>
            <p className="text-xs text-slate-500 mt-0.5">Visual representation of DVR storage state</p>
          </div>
          <HardDrive className="w-5 h-5 text-slate-500" />
        </div>
        {/* Sector grid */}
        <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-px bg-ink-700/20 p-2 rounded-lg overflow-hidden">
          {storageSectors.map((sector, i) => (
            <div
              key={i}
              className={cn('aspect-square rounded-[1px] transition-colors', sectorColors[sector])}
              title={`Sector ${i}: ${sector}`}
            />
          ))}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {[
            { label: 'Valid', color: 'bg-cyan-500/40', count: '72%' },
            { label: 'Deleted', color: 'bg-amber-500/40', count: '14%' },
            { label: 'Corrupted', color: 'bg-red-500/40', count: '5%' },
            { label: 'Recoverable', color: 'bg-emerald-500/40', count: '3%' },
            { label: 'Unknown', color: 'bg-ink-700', count: '6%' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn('w-3 h-3 rounded', item.color)} />
              <span className="text-xs text-slate-400">{item.label}</span>
              <span className="text-xs text-slate-500 font-mono">{item.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recovery Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total Storage', value: storageStats.total, color: 'text-slate-200' },
          { label: 'Used', value: storageStats.used, color: 'text-cyan-400' },
          { label: 'Unallocated', value: storageStats.unallocated, color: 'text-amber-400' },
          { label: 'Corrupted', value: storageStats.corrupted, color: 'text-red-400' },
          { label: 'Recoverable', value: storageStats.recoverable, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <Card key={i} className="!p-4">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className={cn('text-xl font-bold mt-1', stat.color)}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Recovery Methods */}
      <div>
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Recovery Methods</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recoveryMethods.map((method) => {
            const Icon = methodIcons[method.icon] || FileSearch;
            return (
              <Card key={method.id} className="panel-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  {method.status === 'complete' && method.found > 0 ? (
                    <StatusBadge status="recovered" label={`${method.found} found`} />
                  ) : method.status === 'scanning' ? (
                    <span className="flex items-center gap-1 text-xs text-cyan-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Scanning
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Idle</span>
                  )}
                </div>
                <h4 className="font-semibold text-white text-sm">{method.name}</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{method.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Warning banner */}
      <Card className="mt-6 border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Recovery Lab Notice</p>
            <p className="text-xs text-slate-400 mt-1">
              All recovery operations are performed on forensic copies, never original evidence. Recovery actions are logged in the chain of custody audit trail.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
