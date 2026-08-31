import { useState } from 'react';
import {
  ScanSearch,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Bookmark,
  Flag,
  FileText,
  Activity,
  User,
  Car,
  ScanFace,
  Package,
  Clock,
  Eye,
  ChevronRight,
  ChevronDown,
  Video,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';

interface TreeNodeData {
  id: string;
  label: string;
  type: string;
  evidence?: string;
  children?: TreeNodeData[];
}

const evidenceTree: TreeNodeData[] = [
  {
    id: 'case-041',
    label: 'CASE-2026-041',
    type: 'case',
    children: [
      {
        id: 'dvr-01',
        label: 'DVR-01 — Hikvision DS-7608',
        type: 'device',
        children: [
          { id: 'cam-01', label: 'Camera 01 — Loading Bay', type: 'camera', evidence: 'EVD-00231' },
          { id: 'cam-02', label: 'Camera 02 — North Entrance', type: 'camera', evidence: 'EVD-00232' },
          { id: 'cam-03', label: 'Camera 03 — Loading Bay Interior', type: 'camera', evidence: 'EVD-00233' },
        ],
      },
      {
        id: 'recovered',
        label: 'Recovered Evidence',
        type: 'folder',
        children: [
          { id: 'rec-01', label: 'REC_DELETED_0x4A2F1B.dav', type: 'recovery', evidence: 'EVD-00234' },
          { id: 'rec-02', label: 'REC_DELETED_0x4A3C0E.dav', type: 'recovery', evidence: 'EVD-00235' },
        ],
      },
    ],
  },
];

const analysisTools = [
  { label: 'Motion Detection', icon: Activity, active: true, events: 47 },
  { label: 'Person Detection', icon: User, active: true, events: 12 },
  { label: 'Vehicle Detection', icon: Car, active: true, events: 8 },
  { label: 'Face Detection', icon: ScanFace, active: false, events: 3 },
  { label: 'Object Detection', icon: Package, active: true, events: 15 },
  { label: 'Scene Analysis', icon: Eye, active: false, events: 5 },
  { label: 'Timestamp Extraction', icon: Clock, active: true, events: 0 },
  { label: 'Event Detection', icon: Flag, active: true, events: 23 },
];

function TreeNode({ node, depth = 0 }: { node: TreeNodeData; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const nodeIcons: Record<string, string> = {
    case: '📁',
    device: '🎥',
    folder: '📂',
    camera: '📹',
    recovery: '🔓',
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-ink-800/40 cursor-pointer transition-colors"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
          {hasChildren ? (
            expanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          ) : null}
        </span>
        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-xs">{nodeIcons[node.type]}</span>
        <span className={cn(
          'text-sm truncate',
          node.type === 'case' ? 'text-cyan-300 font-mono font-medium' :
          node.type === 'recovery' ? 'text-emerald-300' :
          'text-slate-300'
        )}>
          {node.label}
        </span>
      </div>
      {expanded && hasChildren && node.children!.map((child) => (
        <TreeNode key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function AnalysisPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(42);

  return (
    <div>
      <PageHeader
        title="Analysis Workspace"
        subtitle="Multi-panel investigation workspace for video analysis and evidence review."
        icon={<ScanSearch className="w-5 h-5" />}
      />

      <div className="grid lg:grid-cols-[260px_1fr_240px] gap-4">
        {/* Left — Evidence Tree */}
        <Card className="!p-3 self-start">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 px-2">Evidence Tree</h3>
          {evidenceTree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </Card>

        {/* Center — Video Viewer */}
        <div className="space-y-4">
          <Card className="!p-0 overflow-hidden">
            <div className="relative aspect-video bg-ink-950 grid-bg flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-cyan-400/30 animate-scan" />
              <button
                onClick={() => setPlaying(!playing)}
                className="relative w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
              >
                {playing ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-ink-950/80 backdrop-blur-sm border border-ink-700/60">
                <Video className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300">CAM01_2026-08-21_1842.mp4</span>
              </div>
            </div>
            {/* Controls */}
            <div className="p-4 border-t border-ink-700/40">
              <div className="relative mb-3">
                <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <input
                  type="range" min={0} max={100} value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button onClick={() => setPlaying(!playing)} className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors">
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1.5 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs">
                    <Bookmark className="w-4 h-4" /> Bookmark
                  </button>
                  <button className="px-3 py-1.5 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs">
                    <FileText className="w-4 h-4" /> Note
                  </button>
                  <button className="px-3 py-1.5 rounded-lg hover:bg-ink-800 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs">
                    <Flag className="w-4 h-4" /> Flag
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Timeline</h3>
            <div className="relative h-20 bg-ink-800/40 rounded-lg border border-ink-700/40">
              <div className="absolute inset-0 flex">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-ink-700/20" />
                ))}
              </div>
              {[
                { left: 15, type: 'motion', color: 'bg-cyan-400' },
                { left: 28, type: 'person', color: 'bg-cyan-400' },
                { left: 42, type: 'vehicle', color: 'bg-cyan-400' },
                { left: 58, type: 'motion', color: 'bg-cyan-400' },
                { left: 67, type: 'bookmark', color: 'bg-amber-400' },
                { left: 78, type: 'recovery', color: 'bg-emerald-400' },
                { left: 85, type: 'motion', color: 'bg-cyan-400' },
              ].map((m, i) => (
                <div key={i} className={cn('absolute top-2 bottom-2 w-1 rounded-full', m.color)} style={{ left: `calc(${m.left}% - 2px)` }} />
              ))}
            </div>
          </Card>
        </div>

        {/* Right — Analysis Tools */}
        <Card className="!p-3 self-start">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 px-2">Analysis Tools</h3>
          <div className="space-y-1.5">
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
                  {tool.events > 0 && <span className="text-xs font-mono text-slate-500">{tool.events}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-ink-700/40">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 transition-colors text-sm font-medium">
              <Flag className="w-4 h-4" /> Create Finding
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
