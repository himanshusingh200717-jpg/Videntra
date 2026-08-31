import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Database,
  FileSearch,
  ScanSearch,
  Clock,
  FileText,
  Lock,
  CheckCircle2,
  Cpu,
  HardDrive,
  Video,
  Fingerprint,
  Activity,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

const pipelineSteps = [
  { label: 'DVR / NVR', icon: HardDrive },
  { label: 'Evidence Acquisition', icon: Download },
  { label: 'Hash Verification', icon: ShieldCheck },
  { label: 'Recovery', icon: FileSearch },
  { label: 'Video Analysis', icon: ScanSearch },
  { label: 'Timeline Reconstruction', icon: Clock },
  { label: 'Forensic Report', icon: FileText },
];

const capabilities = [
  { icon: Database, title: 'Standardized Acquisition', desc: 'Uniform evidence acquisition across Hikvision, Dahua, CP Plus, Uniview, Axis and generic DVR/NVR systems.' },
  { icon: FileSearch, title: 'Forensic Recovery', desc: 'Recover deleted, corrupted, and fragmented surveillance footage from damaged storage and overwritten indexes.' },
  { icon: ShieldCheck, title: 'Evidence Integrity', desc: 'SHA-256 hash verification and tamper detection ensure every piece of evidence is court-admissible.' },
  { icon: ScanSearch, title: 'Video Intelligence', desc: 'AI-assisted motion, person, vehicle, face, and object detection across surveillance channels.' },
  { icon: Clock, title: 'Timeline Reconstruction', desc: 'Reconstruct investigation timelines from multi-camera events, recovered segments, and metadata.' },
  { icon: FileText, title: 'Chain of Custody', desc: 'Tamper-evident audit trail with full chain of custody documentation for every evidence item.' },
];

const vendors = [
  { name: 'Hikvision', compat: 'High', protocols: 'Proprietary / RTSP' },
  { name: 'Dahua', compat: 'High', protocols: 'Proprietary / RTSP' },
  { name: 'CP Plus', compat: 'Medium', protocols: 'Proprietary / RTSP' },
  { name: 'Uniview', compat: 'High', protocols: 'Proprietary / RTSP' },
  { name: 'Axis', compat: 'High', protocols: 'RTSP / ONVIF' },
  { name: 'Generic DVR/NVR', compat: 'Low', protocols: 'Raw / File Carving' },
];

const problems = [
  { title: 'Vendor Fragmentation', desc: 'Every DVR/NVR vendor uses proprietary formats, making evidence extraction inconsistent and unreliable.' },
  { title: 'Proprietary Formats', desc: 'Closed codecs and encrypted containers lock investigators out of their own evidence without vendor-specific tools.' },
  { title: 'Deleted Footage', desc: 'Suspects delete or overwrite recordings, and standard tools cannot recover video from unallocated storage.' },
  { title: 'Corrupted Recordings', desc: 'Damaged indexes, fragmented files, and filesystem corruption render critical footage inaccessible.' },
  { title: 'No Standardized Acquisition', desc: 'Each case requires different tools and manual processes, risking evidence contamination and procedural errors.' },
  { title: 'Evidence Integrity Challenges', desc: 'Without cryptographic verification, evidence can be challenged and excluded in court.' },
  { title: 'Manual Investigation', desc: 'Investigators spend hours scrubbing footage frame-by-frame with no intelligent search or analysis.' },
];

function Download(props: { className?: string }) {
  return <ArrowRight {...props} />;
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-forensic-bg text-slate-200 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 bg-ink-900/70 backdrop-blur-md border-b border-ink-700/40">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">Problem</a>
          <a href="#solution" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">Solution</a>
          <a href="#capabilities" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">Capabilities</a>
          <a href="#vendors" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">Ecosystem</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-sm text-slate-300 hover:text-cyan-300 transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            Launch Platform <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forensic-bg/80 to-forensic-bg pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">Forensic Analysis Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              From DVR Data to <span className="gradient-text">Court-Ready Evidence.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
              Standardize surveillance evidence acquisition, recovery, verification and analysis across multiple DVR/NVR ecosystems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-3 text-sm font-semibold text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2"
              >
                Start Investigation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 text-sm font-semibold text-slate-200 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-2"
              >
                Explore Platform
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 text-sm font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Launch Interactive Demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SHA-256 Verified</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-cyan-400" /> Chain of Custody</span>
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-cyan-400" /> Multi-Vendor</span>
            </div>
          </div>

          {/* Pipeline Visual */}
          <div className="relative animate-slide-in-right">
            <div className="panel-strong rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Forensic Workflow Pipeline</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" /> Active
                </span>
              </div>
              <div className="space-y-1">
                {pipelineSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ink-800/50 border border-ink-700/40 hover:border-cyan-500/30 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-200 flex-1">{step.label}</span>
                        {i < pipelineSteps.length - 1 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/60" />
                        )}
                      </div>
                      {i < pipelineSteps.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <div className="relative w-px h-5 bg-ink-700 overflow-hidden">
                            <div className="absolute inset-0 w-px bg-cyan-400 animate-flow-down" style={{ animationDelay: `${i * 0.3}s` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-20 px-6 lg:px-12 border-t border-ink-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400/80">The Problem</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Surveillance Evidence is Broken</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Investigators face a fragmented landscape of proprietary formats, deleted footage, and no standardized way to acquire, verify, or analyze surveillance evidence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <div key={i} className="panel p-5 panel-hover">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                    <span className="text-xs font-mono font-bold">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm">{p.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="py-20 px-6 lg:px-12 border-t border-ink-700/40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">The Solution</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">One Platform. Every Vendor. Full Integrity.</h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            VIDENTRA unifies the entire surveillance evidence lifecycle — from acquisition on a DVR/NVR to a court-ready forensic report — with cryptographic integrity at every step.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Acquire', 'Verify', 'Recover', 'Analyze', 'Report'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="px-5 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold text-sm">
                  {step}
                </div>
                {i < 4 && <ChevronRight className="w-5 h-5 text-slate-600" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-20 px-6 lg:px-12 border-t border-ink-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Core Capabilities</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Built for Forensic Workflows</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="panel p-6 panel-hover group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white text-base">{cap.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vendors */}
      <section id="vendors" className="py-20 px-6 lg:px-12 border-t border-ink-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Supported Ecosystem</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Multi-Vendor DVR/NVR Support</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((v, i) => (
              <div key={i} className="panel p-5 panel-hover">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{v.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    v.compat === 'High' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' :
                    v.compat === 'Medium' ? 'text-amber-300 bg-amber-500/10 border-amber-500/30' :
                    'text-slate-400 bg-slate-500/10 border-slate-500/30'
                  }`}>
                    {v.compat}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Video className="w-3.5 h-3.5" />
                  <span className="font-mono">{v.protocols}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrity */}
      <section className="py-20 px-6 lg:px-12 border-t border-ink-700/40">
        <div className="max-w-5xl mx-auto">
          <div className="panel-strong rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 text-center lg:text-left">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto lg:mx-0 mb-4" />
                <h2 className="text-2xl font-bold text-white">Evidence Integrity</h2>
                <p className="mt-2 text-sm text-slate-400">Every byte verified. Every action audited. Every chain unbroken.</p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'SHA-256', value: '256-bit', desc: 'Cryptographic hashing' },
                  { label: 'Chain of Custody', value: 'Tamper-Evident', desc: 'Full audit trail' },
                  { label: 'Tamper Detection', value: 'Real-Time', desc: 'Instant alerts' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-ink-800/40 border border-ink-700/40">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-bold text-emerald-300">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-12 border-t border-ink-700/40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <Zap className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Start a Digital Investigation</h2>
          <p className="mt-4 text-lg text-slate-400">Experience the full forensic workflow — from DVR acquisition to court-ready report.</p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex px-8 py-3.5 text-sm font-semibold text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/20 items-center gap-2"
          >
            Launch Investigation Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-12 border-t border-ink-700/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-slate-500 font-mono">VIDENTRA v2.4.1 — Surveillance Evidence Intelligence Platform</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
