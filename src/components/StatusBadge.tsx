import { cn, statusColor } from '@/lib/utils';

interface BadgeProps {
  status: string;
  label?: string;
  className?: string;
}

function dotColor(status: string): string {
  if (['verified', 'online', 'recovered', 'closed'].includes(status)) return 'bg-emerald-400';
  if (['active', 'syncing', 'processing', 'acquired'].includes(status)) return 'bg-cyan-400';
  if (['pending'].includes(status)) return 'bg-amber-400';
  if (['failed', 'error', 'corrupted'].includes(status)) return 'bg-red-400';
  return 'bg-slate-400';
}

export function StatusBadge({ status, label, className }: BadgeProps) {
  const text = label || status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide',
        statusColor(status),
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', dotColor(status))} />
      {text}
    </span>
  );
}
