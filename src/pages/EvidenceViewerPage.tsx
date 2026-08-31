import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ZoomIn,
  Camera,
  Bookmark,
  Gauge,
  Activity,
  User,
  Car,
  ScanFace,
  Package,
  Clock,
  Flag,
  FileSearch,
  ShieldCheck,
  HardDrive,
  Video,
  Hash,
  Calendar,
  Maximize2,
} from 'lucide-react';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { useEvidenceById } from '@/hooks/useData';
import { formatHash, cn } from '@/lib/utils';

const analysisTools = [
  { label: 'Motion', icon: Activity, active: true, count: 12 },
  { label: 'Person', icon: User, active: true, count: 4 },
  { label: 'Vehicle', icon: Car, active: true, count: 3 },
  { label: 'Face', icon: ScanFace, active: false, count: 2 },
  { label: 'Object', icon: Package, active: true, count: 7 },
  { label: 'Timestamp', icon: Clock, active: true, count: 0 },
  { label: 'Event', icon: Flag, active: false, count: 5 },
];

const timelineMarkers = [
  { time: 15, type: 'motion', color: 'bg-cyan-400' },
  { time: 28, type: 'person', color: 'bg-cyan-400' },
  { time: 42, type: 'vehicle', color: 'bg-cyan-400' },
  { time: 58, type: 'motion', color: 'bg-cyan-400' },
  { time: 67, type: 'bookmark', color: 'bg-amber-400' },
  { time: 78, type: 'recovery', color: 'bg-emerald-400' },
  { time: 85, type: 'motion', color: 'bg-cyan-400' },
];

export function EvidenceViewerPage() {
  const { id } = useParams();
  const { data: evidence, loading } = useEvidenceById(id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(34);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Loading evidence...</p>
      </div>
    );
  }

  if (!evidence) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Evidence not found.</p>
        <Link to="/evidence" className="mt-4 inline-flex text-cyan-400 hover:text-cyan-300">Back to Evidence</Link>
      </div>
    );
  }

  const metadata = [
    { label: 'Evidence ID', value: evidence.id, icon: FileSearch },
    { label: 'Source Device', value: evidence.sourceDevice, icon: HardDrive },
    { label: 'Vendor', value: evidence.vendor, icon: Video },
    { label: 'Camera', value: evidence.camera, icon: Camera },
    { label: 'Timestamp', value: evidence.timestamp, icon: Calendar },
    { label: 'File Size', value: evidence.size, icon: Package },
    { label: 'Duration', value: evidence.duration, icon: Clock },
    { label: 'SHA-256', value: formatHash(evidence.sha256), icon: Hash },
  ];

  return (
    <div>
      <Link to="/evidence" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-300 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Evidence
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white font-mono">{evidence.id}</h1>
            <StatusBadge status={evidence.integrity} />
            {evidence.recovered && <StatusBadge status="recovered" />}
          </div>
          <p className="text-sm text-slate-400 mt-1 font-mono">{evidence.fileName}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr_240px] gap-4">
        {/* Left — Metadata */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Evidence Metadata</h3>
            <div className="space-y-3">
              {metadata.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm text-slate-200 font-mono break-all">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">Integrity Verified</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              SHA-256 hash verified against acquisition-time signature. No tampering detected.
            </p>
          </Card>
        </div>

        {/* Center — Video Player */}
        <div className="space-y-4">
          <Card className="!p-0 overflow-hidden">
            {/* Video area */}
            <div className="relative aspect-video bg-ink-950 grid-bg flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-cyan-400/30 animate-scan" />
              </div>
              {/* Play button */}
              <button
                onClick={() => setPlaying(!playing)}
                className="relative w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
              >
                {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              {/* Overlay info */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-ink-950/80 backdrop-blur-sm border border-ink-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">REC</span>
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-ink-950/80 backdrop-blur-sm border border-ink-700/60">
                <span className="text-xs font-mono text-cyan-300">{evidence.camera}</span>
              </div>
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-ink-950/80 backdrop-blur-sm border border-ink-700/60">
                <span className="text-xs font-mono text-slate-300">{evidence.timestamp}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-ink-700/40">
              {/* Scrubber */}
              <div className="relative mb-4">
                <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                {/* Timeline markers */}
                {timelineMarkers.map((marker, i) => (
                  <div
                    key={i}
                    className={cn('absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-full', marker.color)}
                    style={{ left: `calc(${marker.time}% - 3px)` }}
                  />
                ))}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  >
                    {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors">
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1.5 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs">
                    <Gauge className="w-4 h-4" /> 1x
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors" title="Zoom">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors" title="Snapshot">
                    <Camera className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors" title="Bookmark">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors" title="Fullscreen">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Interactive Timeline</h3>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {[
                { label: 'Motion', color: 'bg-cyan-400' },
                { label: 'Person', color: 'bg-cyan-400' },
                { label: 'Vehicle', color: 'bg-cyan-400' },
                { label: 'Important Event', color: 'bg-amber-400' },
                { label: 'Bookmark', color: 'bg-amber-400' },
                { label: 'Recovery Segment', color: 'bg-emerald-400' },
              ].map((legend, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={cn('w-2 h-2 rounded-full', legend.color)} />
                  <span className="text-xs text-slate-400">{legend.label}</span>
                </div>
              ))}
            </div>
            <div className="relative h-16 bg-ink-800/40 rounded-lg border border-ink-700/40">
              <div className="absolute inset-0 flex">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-ink-700/20" />
                ))}
              </div>
              {timelineMarkers.map((marker, i) => (
                <div
                  key={i}
                  className={cn('absolute top-2 bottom-2 w-1 rounded-full', marker.color)}
                  style={{ left: `calc(${marker.time}% - 2px)` }}
                  title={marker.type}
                />
              ))}
              <div className="absolute -bottom-5 left-0 text-xs font-mono text-slate-500">00:00</div>
              <div className="absolute -bottom-5 right-0 text-xs font-mono text-slate-500">{evidence.duration}</div>
            </div>
          </Card>
        </div>

        {/* Right — Analysis Tools */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Analysis Tools</h3>
            <div className="space-y-2">
              {analysisTools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={i}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-colors text-left',
                      tool.active
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
                        : 'bg-ink-800/40 border-ink-700/40 text-slate-400 hover:border-ink-600'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">{tool.label}</span>
                    {tool.count > 0 && (
                      <span className="text-xs font-mono text-slate-500">{tool.count}</span>
                    )}
                    {tool.active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-800/40 border border-ink-700/40 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors text-sm">
                <Bookmark className="w-4 h-4" /> Add Bookmark
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-800/40 border border-ink-700/40 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors text-sm">
                <Flag className="w-4 h-4" /> Flag Evidence
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-800/40 border border-ink-700/40 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors text-sm">
                <FileSearch className="w-4 h-4" /> Create Finding
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
