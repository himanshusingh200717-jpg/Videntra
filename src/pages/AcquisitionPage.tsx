import { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Circle,
  Loader2,
  HardDrive,
  Wifi,
  Usb,
  Disc,
  Camera,
  Calendar,
  Clock,
  ShieldCheck,
  Hash,
  ArrowRight,
  ArrowLeft,
  FileSearch,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Select Device' },
  { id: 2, label: 'Connection' },
  { id: 3, label: 'Storage Detection' },
  { id: 4, label: 'Evidence Selection' },
  { id: 5, label: 'Acquisition' },
  { id: 6, label: 'Verification' },
];

const vendors = [
  { name: 'Hikvision', model: 'DS-7608NI-K2/8P', channels: 8 },
  { name: 'Dahua', model: 'DHI-NVR4216-4KS2', channels: 16 },
  { name: 'CP Plus', model: 'CP-UNC-VH2', channels: 4 },
  { name: 'Uniview', model: 'NVR301-08-P4', channels: 8 },
  { name: 'Axis', model: 'P3268-LV', channels: 1 },
  { name: 'Generic', model: 'DVR 16CH (Unknown OEM)', channels: 16 },
];

const connectionTypes = [
  { id: 'network', label: 'Network', icon: Wifi, desc: 'Connect via IP address and RTSP' },
  { id: 'storage', label: 'Storage', icon: HardDrive, desc: 'Direct storage media access' },
  { id: 'usb', label: 'USB', icon: Usb, desc: 'USB-connected DVR/NVR device' },
  { id: 'disk', label: 'Disk Image', icon: Disc, desc: 'Acquire from pre-captured disk image' },
];

export function AcquisitionPage() {
  const [step, setStep] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);
  const [connection, setConnection] = useState('network');
  const [acquiring, setAcquiring] = useState(false);
  const [acquireProgress, setAcquireProgress] = useState(0);
  const [verified, setVerified] = useState(false);

  const handleAcquire = () => {
    setAcquiring(true);
    setAcquireProgress(0);
    const interval = setInterval(() => {
      setAcquireProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAcquiring(false);
          setStep(6);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div>
      <PageHeader
        title="Forensic Acquisition Wizard"
        subtitle="Standardized evidence acquisition from DVR/NVR systems."
        icon={<Download className="w-5 h-5" />}
      />

      {/* Step Indicator */}
      <Card className="mb-6">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all',
                  step > s.id && 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
                  step === s.id && 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
                  step < s.id && 'bg-ink-800 border-ink-700 text-slate-600'
                )}>
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> :
                   step === s.id && (acquiring || step === 5 && acquiring) ? <Loader2 className="w-5 h-5 animate-spin" /> :
                   <span className="text-sm font-bold">{s.id}</span>}
                </div>
                <span className={cn(
                  'mt-2 text-xs font-medium whitespace-nowrap',
                  step >= s.id ? 'text-slate-200' : 'text-slate-600'
                )}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('w-12 lg:w-20 h-0.5 mx-2', step > s.id ? 'bg-emerald-500/30' : 'bg-ink-700')} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      {step === 1 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Select DVR/NVR Vendor</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((v) => (
              <Card key={v.name} hover onClick={() => setSelectedVendor(v)} className={cn(
                selectedVendor.name === v.name && 'border-cyan-500/40 glow-cyan'
              )}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{v.name}</h4>
                  {selectedVendor.name === v.name && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </div>
                <p className="text-xs text-slate-400 font-mono">{v.model}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                  <Camera className="w-3.5 h-3.5" /> {v.channels} channels
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={() => setStep(2)} className="px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Select Connection Method</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {connectionTypes.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.id} hover onClick={() => setConnection(c.id)} className={cn(
                  connection === c.id && 'border-cyan-500/40 glow-cyan'
                )}>
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{c.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(3)} className="px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Storage Detection</h3>
          <Card>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Disk Size', value: '4 TB', icon: HardDrive },
                { label: 'Partitions', value: '3 partitions', icon: Disc },
                { label: 'File Systems', value: 'ext4, FAT32', icon: HardDrive },
                { label: 'Camera Channels', value: `${selectedVendor.channels} channels`, icon: Camera },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-4 rounded-lg bg-ink-800/40 border border-ink-700/40">
                    <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-lg font-bold text-white mt-1">{item.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Detected Partitions</p>
              {[
                { name: '/dev/sda1', size: '512 MB', type: 'System', usage: 100 },
                { name: '/dev/sda2', size: '3.4 TB', type: 'Recording Database', usage: 78 },
                { name: '/dev/sda3', size: '87 GB', type: 'Unallocated', usage: 0 },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <span className="text-sm font-mono text-cyan-300 w-24">{p.name}</span>
                  <span className="text-xs text-slate-400 w-16">{p.size}</span>
                  <span className="text-xs text-slate-500 flex-1">{p.type}</span>
                  <div className="w-32"><ProgressBar value={p.usage} height="h-1.5" /></div>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(4)} className="px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Select Evidence to Acquire</h3>
          <Card>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 block">Camera</label>
                <select className="w-full px-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50">
                  {Array.from({ length: selectedVendor.channels }).map((_, i) => (
                    <option key={i}>Camera {String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 block">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input type="date" defaultValue="2026-08-21" className="w-full pl-10 pr-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 block">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input type="time" defaultValue="18:00" className="w-full pl-10 pr-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 block">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input type="time" defaultValue="23:00" className="w-full pl-10 pr-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Available Recording Segments</p>
              {[
                { id: 'SEG-001', time: '18:00 - 19:00', size: '480 MB', selected: true },
                { id: 'SEG-002', time: '19:00 - 20:00', size: '512 MB', selected: true },
                { id: 'SEG-003', time: '20:00 - 21:00', size: '498 MB', selected: true },
                { id: 'SEG-004', time: '21:00 - 22:00', size: '524 MB', selected: false },
                { id: 'SEG-005', time: '22:00 - 23:00', size: '506 MB', selected: false },
              ].map((seg, i) => (
                <div key={i} className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                  seg.selected ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-ink-800/40 border-ink-700/40 hover:border-ink-600'
                )}>
                  <div className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center',
                    seg.selected ? 'bg-cyan-500/20 border-cyan-500/40' : 'border-ink-600'
                  )}>
                    {seg.selected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-sm font-mono text-slate-200">{seg.id}</span>
                  <span className="text-xs text-slate-400 flex-1">{seg.time}</span>
                  <span className="text-xs text-slate-500 font-mono">{seg.size}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(3)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => { setStep(5); handleAcquire(); }} className="px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2">
              Start Acquisition <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <Card>
          <div className="text-center py-8">
            <div className="inline-flex w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 items-center justify-center text-cyan-400 mb-4">
              {acquiring ? <Loader2 className="w-8 h-8 animate-spin" /> : <CheckCircle2 className="w-8 h-8 text-emerald-400" />}
            </div>
            <h3 className="text-lg font-semibold text-white">
              {acquiring ? 'Acquiring Evidence...' : 'Acquisition Complete'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {acquiring ? 'Forensic copy in progress. Do not disconnect device.' : 'All segments acquired successfully.'}
            </p>
            <div className="max-w-md mx-auto mt-6">
              <ProgressBar value={acquireProgress} showLabel color="cyan" height="h-3" />
            </div>
            {!acquiring && acquireProgress === 100 && (
              <button onClick={() => setStep(6)} className="mt-6 px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                Verify Evidence <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>
      )}

      {step === 6 && (
        <div>
          <Card>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Evidence Verification</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Evidence ID', value: 'EVD-00237', icon: FileSearch },
                { label: 'SHA-256 Hash', value: '7a91f3c4d2e8b6a5901c...', icon: Hash },
                { label: 'Acquisition Timestamp', value: '22 Aug 2026 08:31:22', icon: Clock },
                { label: 'Source Device', value: selectedVendor.model, icon: HardDrive },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-ink-800/40 border border-ink-700/40">
                    <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm text-slate-200 font-mono mt-0.5">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Integrity Status</p>
                  <p className="text-xs text-slate-400 mt-0.5">SHA-256 hash verified against acquisition-time signature</p>
                </div>
              </div>
              <StatusBadge status="verified" />
            </div>
          </Card>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(4)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => { setStep(1); setAcquireProgress(0); }} className="px-5 py-2.5 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors">
              New Acquisition
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
