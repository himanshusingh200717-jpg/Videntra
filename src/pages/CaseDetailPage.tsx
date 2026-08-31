import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FolderSearch,
  CheckCircle2,
  Circle,
  Loader2,
  FileSearch,
  HardDrive,
  Clock,
  ScanSearch,
  FileText,
  ShieldCheck,
  History,
  User,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { ProgressBar } from '@/components/ProgressBar';
import { useCase, useEvidenceByCase, useTimelineByCase, useAuditByCase } from '@/hooks/useData';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FolderSearch },
  { id: 'evidence', label: 'Evidence', icon: FileSearch },
  { id: 'devices', label: 'Devices', icon: HardDrive },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'analysis', label: 'Analysis', icon: ScanSearch },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'audit', label: 'Audit Trail', icon: History },
];

const pipelineSteps = [
  { key: 'acquisition', label: 'Acquisition' },
  { key: 'verification', label: 'Verification' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'reporting', label: 'Reporting' },
] as const;

export function CaseDetailPage() {
  const { id } = useParams();
  const { data: caseData, loading } = useCase(id);
  const { data: evidence } = useEvidenceByCase(id);
  const { data: timeline } = useTimelineByCase(id);
  const { data: audit } = useAuditByCase(id);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Loading case...</p>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Case not found.</p>
        <Link to="/investigations" className="mt-4 inline-flex text-cyan-400 hover:text-cyan-300">
          Back to Investigations
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <Link to="/investigations" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-300 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Investigations
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white font-mono">{caseData.id}</h1>
            <StatusBadge status={caseData.status} label={caseData.status === 'active' ? 'Active Investigation' : caseData.status} />
          </div>
          <h2 className="text-xl text-slate-300 mt-1">{caseData.name}</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">{caseData.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400"><User className="w-3.5 h-3.5" /> {caseData.investigator}</div>
          <div className="flex items-center gap-1.5 text-slate-400"><Calendar className="w-3.5 h-3.5" /> {caseData.createdAt}</div>
          <div className="flex items-center gap-1.5 text-slate-400"><HardDrive className="w-3.5 h-3.5" /> {caseData.device}</div>
        </div>
      </div>

      {/* Pipeline */}
      <Card className="mb-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Investigation Pipeline</h3>
        <div className="flex items-center justify-between overflow-x-auto">
          {pipelineSteps.map((step, i) => {
            const state = caseData.pipeline[step.key];
            return (
              <div key={step.key} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all',
                    state === 'complete' && 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
                    state === 'in-progress' && 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
                    state === 'pending' && 'bg-ink-800 border-ink-700 text-slate-600'
                  )}>
                    {state === 'complete' && <CheckCircle2 className="w-5 h-5" />}
                    {state === 'in-progress' && <Loader2 className="w-5 h-5 animate-spin" />}
                    {state === 'pending' && <Circle className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    'mt-2 text-xs font-medium whitespace-nowrap',
                    state === 'complete' && 'text-emerald-300',
                    state === 'in-progress' && 'text-cyan-300',
                    state === 'pending' && 'text-slate-600'
                  )}>
                    {step.label}
                  </span>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className={cn(
                    'w-16 lg:w-24 h-0.5 mx-2',
                    caseData.pipeline[pipelineSteps[i + 1].key] !== 'pending' ? 'bg-emerald-500/30' : 'bg-ink-700'
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-ink-700/60 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-cyan-300 border-cyan-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-white mb-4">Case Information</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Case ID', value: caseData.id },
                { label: 'Status', value: caseData.status.toUpperCase() },
                { label: 'Priority', value: caseData.priority.toUpperCase() },
                { label: 'Investigator', value: caseData.investigator },
                { label: 'Created', value: caseData.createdAt },
                { label: 'Last Activity', value: caseData.lastActivity },
                { label: 'Device', value: caseData.device },
                { label: 'Vendor', value: caseData.vendor },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-ink-700/30 last:border-0">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-slate-200 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Evidence Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Evidence', value: caseData.evidenceCount, color: 'text-cyan-400' },
                { label: 'Devices', value: caseData.deviceCount, color: 'text-cyan-400' },
                { label: 'Recovered', value: evidence.filter(e => e.recovered).length, color: 'text-emerald-400' },
                { label: 'Integrity', value: `${caseData.integrity}%`, color: 'text-emerald-400' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Integrity Status</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#1c2740" strokeWidth="8" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52} strokeDashoffset={0} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400">{caseData.integrity}%</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">All Evidence Verified</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'evidence' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-ink-700/60">
                  <th className="text-left font-medium py-2.5 px-3">Evidence ID</th>
                  <th className="text-left font-medium py-2.5 px-3">File</th>
                  <th className="text-left font-medium py-2.5 px-3">Camera</th>
                  <th className="text-left font-medium py-2.5 px-3">Size</th>
                  <th className="text-left font-medium py-2.5 px-3">Integrity</th>
                  <th className="text-left font-medium py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((e) => (
                  <tr key={e.id} className="border-b border-ink-700/30 hover:bg-ink-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <Link to={`/evidence/${e.id}`} className="font-mono text-cyan-300 hover:text-cyan-200">{e.id}</Link>
                    </td>
                    <td className="py-3 px-3 text-slate-200 font-mono text-xs">{e.fileName}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{e.camera}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-xs">{e.size}</td>
                    <td className="py-3 px-3"><StatusBadge status={e.integrity} /></td>
                    <td className="py-3 px-3"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'devices' && (
        <Card>
          <p className="text-sm text-slate-400">Device: {caseData.device}</p>
          <p className="text-sm text-slate-400 mt-2">Vendor: {caseData.vendor}</p>
          <p className="text-sm text-slate-400 mt-2">Cameras: {caseData.deviceCount * 4} channels across {caseData.deviceCount} unit(s)</p>
        </Card>
      )}

      {activeTab === 'timeline' && (
        <Card>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-ink-700" />
            {timeline.map((event, i) => (
              <div key={event.id} className="relative pb-6 last:pb-0">
                <div className={cn(
                  'absolute -left-[18px] w-3 h-3 rounded-full border-2 border-forensic-bg',
                  ['person', 'vehicle', 'motion'].includes(event.type) ? 'bg-cyan-400' :
                  ['camera-offline', 'recording-gap'].includes(event.type) ? 'bg-red-400' :
                  ['recovered', 'acquisition', 'verification', 'report'].includes(event.type) ? 'bg-emerald-400' :
                  event.type === 'bookmark' ? 'bg-amber-400' : 'bg-slate-400'
                )} />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-xs font-mono text-slate-500 flex-shrink-0">{event.timestamp}</span>
                  <span className="text-sm font-medium text-slate-200">{event.label}</span>
                  <span className="text-xs text-slate-500">{event.camera}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{event.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'analysis' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Motion Detection', value: '47 events', icon: 'motion', color: 'cyan' },
            { label: 'Person Detection', value: '12 events', icon: 'person', color: 'cyan' },
            { label: 'Vehicle Detection', value: '8 events', icon: 'vehicle', color: 'cyan' },
            { label: 'Face Detection', value: '3 events', icon: 'face', color: 'cyan' },
            { label: 'Object Detection', value: '15 events', icon: 'object', color: 'cyan' },
            { label: 'Scene Analysis', value: '5 events', icon: 'scene', color: 'cyan' },
            { label: 'Timestamp Extraction', value: 'Complete', icon: 'timestamp', color: 'emerald' },
            { label: 'Event Detection', value: '23 events', icon: 'event', color: 'cyan' },
          ].map((item, i) => (
            <Card key={i} className="panel-hover">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className={`text-xl font-bold mt-2 ${item.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{item.value}</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'reports' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Case Reports</h3>
            <Link to="/reports" className="px-4 py-2 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors">
              Generate Report
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-200">Interim Forensic Report — CASE-2026-041</p>
                  <p className="text-xs text-slate-500">Generated 22 Aug 2026 · 14:45</p>
                </div>
              </div>
              <StatusBadge status="verified" label="Complete" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-400">Final Forensic Report — Pending</p>
                  <p className="text-xs text-slate-500">Awaiting analysis completion</p>
                </div>
              </div>
              <StatusBadge status="pending" />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'audit' && (
        <Card>
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">Evidence Integrity Verified</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-ink-700/60">
                  <th className="text-left font-medium py-2.5 px-3">Timestamp</th>
                  <th className="text-left font-medium py-2.5 px-3">Action</th>
                  <th className="text-left font-medium py-2.5 px-3">User</th>
                  <th className="text-left font-medium py-2.5 px-3">Evidence</th>
                  <th className="text-left font-medium py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((entry) => (
                  <tr key={entry.id} className="border-b border-ink-700/30 hover:bg-ink-800/30">
                    <td className="py-3 px-3 font-mono text-xs text-slate-400">{entry.date} {entry.timestamp}</td>
                    <td className="py-3 px-3 text-slate-200">{entry.action}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{entry.user}</td>
                    <td className="py-3 px-3 font-mono text-xs text-cyan-300">{entry.evidenceId}</td>
                    <td className="py-3 px-3"><StatusBadge status={entry.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
