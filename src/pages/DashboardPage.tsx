import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderSearch,
  FileSearch,
  HardDrive,
  ShieldCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Download,
  Hash,
  FileText,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { useCases } from '@/hooks/useData';
import { activityEvents, processingJobs } from '@/data/recovery';

const metrics = [
  { label: 'Active Investigations', value: '12', icon: FolderSearch, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { label: 'Evidence Items', value: '348', icon: FileSearch, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { label: 'Connected Devices', value: '27', icon: HardDrive, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { label: 'Recovered Files', value: '94', icon: FileSearch, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Integrity Verified', value: '100%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Processing Jobs', value: '6', icon: Cpu, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

const activityIcons: Record<string, typeof Download> = {
  acquisition: Download,
  recovery: FileSearch,
  verification: ShieldCheck,
  investigation: FolderSearch,
  report: FileText,
};

export function DashboardPage() {
  const { data: cases } = useCases();
  return (
    <div>
      <PageHeader
        title="Forensic Command Center"
        subtitle="Monitor investigations, evidence integrity and processing activity."
        icon={<LayoutDashboard className="w-5 h-5" />}
        actions={
          <Link to="/acquisition" className="px-4 py-2 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5">
            New Acquisition <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="!p-4 panel-hover">
              <div className={`w-9 h-9 rounded-lg ${m.bg} border ${m.border} flex items-center justify-center ${m.color} mb-3`}>
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{m.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Investigation Activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Investigation Activity</h3>
              <p className="text-xs text-slate-500 mt-0.5">Recent forensic actions across all cases</p>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-500" />
          </div>
          <div className="space-y-1">
            {activityEvents.map((event, i) => {
              const Icon = activityIcons[event.type] || Clock;
              return (
                <div key={event.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-ink-800/40 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-ink-800 border border-ink-700/40 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:border-cyan-500/30 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 truncate">{event.label}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{event.caseId}</p>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{event.timestamp}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Evidence Integrity */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="text-center mb-5">
            <div className="inline-flex w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-white">Evidence Integrity</h3>
            <p className="text-xs text-slate-500 mt-0.5">SHA-256 Verification</p>
          </div>
          <div className="flex flex-col items-center my-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#1c2740" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={0}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-emerald-400">100%</span>
                <span className="text-xs text-slate-500 mt-1">Verified</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              <span className="font-bold text-emerald-300">127</span>
              <span className="text-slate-500"> / 127 Verified</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">Verified</span>
          </div>
        </Card>
      </div>

      {/* Recent Investigations */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white">Recent Investigations</h3>
            <p className="text-xs text-slate-500 mt-0.5">Active and recent forensic cases</p>
          </div>
          <Link to="/investigations" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-ink-700/60">
                <th className="text-left font-medium py-2.5 px-3">Case ID</th>
                <th className="text-left font-medium py-2.5 px-3">Case Name</th>
                <th className="text-left font-medium py-2.5 px-3">Device</th>
                <th className="text-left font-medium py-2.5 px-3">Evidence</th>
                <th className="text-left font-medium py-2.5 px-3">Status</th>
                <th className="text-left font-medium py-2.5 px-3">Integrity</th>
                <th className="text-left font-medium py-2.5 px-3">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {cases.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-b border-ink-700/30 hover:bg-ink-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <Link to={`/investigations/${c.id}`} className="font-mono text-cyan-300 hover:text-cyan-200">
                      {c.id}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-slate-200">{c.name}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{c.device}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono">{c.evidenceCount}</td>
                  <td className="py-3 px-3"><StatusBadge status={c.status} /></td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-xs ${c.integrity === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {c.integrity}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-xs">{c.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Processing Queue */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white">Processing Queue</h3>
            <p className="text-xs text-slate-500 mt-0.5">Active forensic processing jobs</p>
          </div>
          <Cpu className="w-4 h-4 text-slate-500" />
        </div>
        <div className="space-y-3">
          {processingJobs.map((job) => {
            const jobIcons: Record<string, typeof Download> = {
              acquisition: Download,
              hashing: Hash,
              recovery: FileSearch,
              metadata: FileText,
              analysis: Cpu,
            };
            const Icon = jobIcons[job.type] || Cpu;
            return (
              <div key={job.id} className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  job.status === 'complete' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                  job.status === 'processing' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' :
                  'bg-ink-800 border border-ink-700 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-sm text-slate-200 truncate">{job.name}</p>
                    <span className={`text-xs font-mono flex-shrink-0 ${
                      job.status === 'complete' ? 'text-emerald-400' :
                      job.status === 'processing' ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {job.eta}
                    </span>
                  </div>
                  <ProgressBar
                    value={job.progress}
                    color={job.status === 'complete' ? 'emerald' : 'cyan'}
                    height="h-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
