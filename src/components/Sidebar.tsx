import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderSearch,
  FileSearch,
  Download,
  Stethoscope,
  ScanSearch,
  Clock,
  HardDrive,
  FileText,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/investigations', label: 'Investigations', icon: FolderSearch },
  { to: '/evidence', label: 'Evidence', icon: FileSearch },
  { to: '/acquisition', label: 'Acquisition', icon: Download },
  { to: '/recovery', label: 'Recovery Lab', icon: Stethoscope },
  { to: '/analysis', label: 'Analysis', icon: ScanSearch },
  { to: '/timeline', label: 'Timeline', icon: Clock },
  { to: '/devices', label: 'Devices', icon: HardDrive },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/audit', label: 'Audit Log', icon: ShieldCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col bg-ink-900 border-r border-ink-700/60 z-30">
      <div className="px-5 py-5 border-b border-ink-700/60">
        <Logo size="md" />
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
          Investigation
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-ink-800/60 border border-transparent'
                    )
                  }
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-ink-700/60">
        <div className="flex items-center gap-2.5 px-2">
          <div className="relative">
            <span className="block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping-soft" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-300">All systems operational</span>
            <span className="text-[10px] text-slate-500 font-mono">v2.4.1 · Demo Mode</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
