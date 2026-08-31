import { HardDrive, Plus, Video, Wifi } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { ProgressBar } from '@/components/ProgressBar';
import { useDevices } from '@/hooks/useData';

const vendorLogos: Record<string, string> = {
  Hikvision: 'HK',
  Dahua: 'DH',
  'CP Plus': 'CP',
  Uniview: 'UV',
  Axis: 'AX',
  Generic: 'GN',
};

export function DevicesPage() {
  const { data: devices } = useDevices();
  return (
    <div>
      <PageHeader
        title="DVR/NVR Devices"
        subtitle="Connected surveillance recording devices across all vendors."
        icon={<HardDrive className="w-5 h-5" />}
        actions={
          <button className="px-4 py-2 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Connect Device
          </button>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="panel-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-cyan-300 font-mono">{vendorLogos[device.vendor]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{device.vendor}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{device.model}</p>
                </div>
              </div>
              <StatusBadge status={device.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <p className="text-slate-500">Storage</p>
                <p className="text-slate-200 font-mono mt-0.5">{device.storage}</p>
              </div>
              <div>
                <p className="text-slate-500">Cameras</p>
                <p className="text-slate-200 font-mono mt-0.5">{device.cameras} channels</p>
              </div>
              <div>
                <p className="text-slate-500">IP Address</p>
                <p className="text-slate-200 font-mono mt-0.5">{device.ipAddress}</p>
              </div>
              <div>
                <p className="text-slate-500">Last Connected</p>
                <p className="text-slate-200 mt-0.5">{device.lastConnected}</p>
              </div>
            </div>

            {/* Storage usage */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500">Storage Used</span>
                <span className="text-slate-300 font-mono">{device.storageUsed} / {device.storage}</span>
              </div>
              <ProgressBar value={65} height="h-1.5" color="cyan" />
            </div>

            {/* Protocols */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {device.protocols.map((p, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-xs font-mono bg-ink-800 border border-ink-700/40 text-slate-400">
                  {p}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ink-700/40">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  device.compatibility === 'high' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' :
                  device.compatibility === 'medium' ? 'text-amber-300 bg-amber-500/10 border-amber-500/30' :
                  'text-slate-400 bg-slate-500/10 border-slate-500/30'
                }`}>
                  {device.compatibility} compat
                </span>
              </div>
              <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5" /> Connect
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
