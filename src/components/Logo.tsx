import { Link } from 'react-router-dom';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'h-7 w-7', text: 'text-base', tag: 'text-[8px]' },
    md: { box: 'h-9 w-9', text: 'text-lg', tag: 'text-[9px]' },
    lg: { box: 'h-12 w-12', text: 'text-2xl', tag: 'text-[10px]' },
  }[size];

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`relative ${dims.box} flex-shrink-0`}>
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          {/* Outer shield */}
          <path
            d="M20 2 L34 8 L34 20 C34 28 28 34 20 38 C12 34 6 28 6 20 L6 8 Z"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2"
          />
          {/* Inner video frame */}
          <rect x="12" y="12" width="16" height="12" rx="1.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
          {/* Forensic trace line */}
          <path d="M14 22 L17 18 L20 21 L23 15 L26 19" fill="none" stroke="#22d3ee" strokeWidth="1.2" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
          {/* Fingerprint dot */}
          <circle cx="20" cy="28.5" r="1.5" fill="#22d3ee" />
          <circle cx="20" cy="28.5" r="3" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-bold tracking-wider text-white ${dims.text}`}>VIDENTRA</span>
        <span className={`font-mono tracking-[0.2em] text-cyan-500/60 uppercase ${dims.tag} mt-0.5`}>
          Surveillance Evidence Intelligence
        </span>
      </div>
    </Link>
  );
}
