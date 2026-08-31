import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Building2,
  Shield,
  Database,
  HardDrive,
  Bell,
  History,
  Key,
  Check,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'evidence', label: 'Evidence Settings', icon: Database },
  { id: 'storage', label: 'Storage', icon: HardDrive },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'audit', label: 'Audit', icon: History },
  { id: 'api', label: 'API', icon: Key },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange?: () => void }) {
  const [on, setOn] = useState(enabled);
  return (
    <button
      onClick={() => { setOn(!on); onChange?.(); }}
      className={cn(
        'w-11 h-6 rounded-full transition-colors relative flex-shrink-0',
        on ? 'bg-cyan-500' : 'bg-ink-600'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all',
        on ? 'left-[22px]' : 'left-0.5'
      )} />
    </button>
  );
}

export function SettingsPage() {
  const [active, setActive] = useState('profile');

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure VIDENTRA platform preferences and security."
        icon={<SettingsIcon className="w-5 h-5" />}
      />

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Section Nav */}
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active === section.id
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-ink-800/60 border border-transparent'
                )}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <Card>
          {active === 'profile' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Profile</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 border border-cyan-500/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-cyan-300">SC</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Det. Sarah Chen</p>
                  <p className="text-xs text-slate-500">Senior Investigator</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Full Name</label>
                  <input type="text" defaultValue="Sarah Chen" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Badge ID</label>
                  <input type="text" defaultValue="INV-2026-0421" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
                  <input type="email" defaultValue="s.chen@forensics.gov" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Department</label>
                  <input type="text" defaultValue="Digital Forensics Unit" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
            </div>
          )}

          {active === 'organization' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Organization</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Organization Name</label>
                  <input type="text" defaultValue="National Digital Forensics Lab" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Case Prefix</label>
                  <input type="text" defaultValue="CASE-2026" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Security</h3>
              {[
                { label: 'Two-Factor Authentication', desc: 'Require 2FA for all investigator logins', enabled: true },
                { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes of inactivity', enabled: true },
                { label: 'IP Allowlist', desc: 'Restrict access to approved IP addresses', enabled: false },
                { label: 'Audit All Actions', desc: 'Log every evidence and system action', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={item.enabled} />
                </div>
              ))}
            </div>
          )}

          {active === 'evidence' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Evidence Settings</h3>
              {[
                { label: 'SHA-256 Hashing', desc: 'Generate SHA-256 hash for all acquired evidence', enabled: true },
                { label: 'Automatic Verification', desc: 'Verify evidence integrity after acquisition', enabled: true },
                { label: 'Tamper Detection', desc: 'Alert on any integrity check failure', enabled: true },
                { label: 'Chain of Custody Logging', desc: 'Log all evidence access and actions', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={item.enabled} />
                </div>
              ))}
            </div>
          )}

          {active === 'storage' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Storage</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Evidence Storage Path</label>
                  <input type="text" defaultValue="/forensics/evidence" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Working Directory</label>
                  <input type="text" defaultValue="/forensics/workspace" className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-ink-800/40 border border-ink-700/40">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Storage Used</span>
                  <span className="text-slate-300 font-mono">847 GB / 4 TB</span>
                </div>
                <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '21%' }} />
                </div>
              </div>
            </div>
          )}

          {active === 'notifications' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Notifications</h3>
              {[
                { label: 'Acquisition Complete', desc: 'Notify when evidence acquisition finishes', enabled: true },
                { label: 'Recovery Complete', desc: 'Notify when recovery scan finishes', enabled: true },
                { label: 'Integrity Alert', desc: 'Notify on integrity check failure', enabled: true },
                { label: 'New Investigation', desc: 'Notify when assigned to a new case', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={item.enabled} />
                </div>
              ))}
            </div>
          )}

          {active === 'audit' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">Audit Settings</h3>
              {[
                { label: 'Log All User Actions', desc: 'Record every action taken by investigators', enabled: true },
                { label: 'Log System Events', desc: 'Record system-level events and errors', enabled: true },
                { label: 'Export Audit Trail', desc: 'Allow audit trail export for external review', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-800/40 border border-ink-700/40">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={item.enabled} />
                </div>
              ))}
            </div>
          )}

          {active === 'api' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-white">API Configuration</h3>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">API Endpoint</label>
                <input type="text" defaultValue="https://api.videntra.io/v2" readOnly className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-400 font-mono focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">API Key</label>
                <div className="flex items-center gap-2">
                  <input type="password" defaultValue="vdt_live_xxxxxxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1 px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-400 font-mono focus:outline-none" />
                  <button className="px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-300">API connection active</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
