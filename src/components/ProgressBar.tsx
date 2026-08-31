import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: 'cyan' | 'emerald' | 'amber' | 'red';
  showLabel?: boolean;
  height?: string;
}

export function ProgressBar({ value, className, color = 'cyan', showLabel = false, height = 'h-2' }: ProgressBarProps) {
  const colors = {
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-slate-400">Progress</span>
          <span className="text-slate-300 font-mono">{value}%</span>
        </div>
      )}
      <div className={cn('w-full bg-ink-700 rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colors[color])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
