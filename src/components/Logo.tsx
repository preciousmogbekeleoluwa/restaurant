import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'symbol';
  isLight?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-11",
  variant = 'full',
  isLight = false,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Continental Culinary Emblem SVG */}
      <svg
        className="h-full aspect-square flex-shrink-0 drop-shadow-md"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B18" />
            <stop offset="60%" stopColor="#2A2521" />
            <stop offset="100%" stopColor="#171513" />
          </linearGradient>
          <linearGradient id="goldFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E87516" />
            <stop offset="50%" stopColor="#F5A900" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F5A900" />
            <stop offset="70%" stopColor="#E87516" />
            <stop offset="100%" stopColor="#F5A900" />
          </linearGradient>
          <radialGradient id="emblemCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5A900" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E87516" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Circular Medallion with Gold Rim */}
        <circle cx="50" cy="50" r="47" fill="url(#logoBgGrad)" stroke="url(#goldRim)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(245, 169, 0, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="38" fill="url(#emblemCoreGlow)" />

        {/* Rising Continental Culinary Flame */}
        <path
          d="M 50 18 C 45 25 41 29 45 35 C 47 38 52 38 49 43 C 54 38 58 34 55 27 C 53 23 54 20 50 18 Z"
          fill="url(#goldFlame)"
        />

        {/* Cloche Knob */}
        <circle cx="50" cy="43.5" r="3.2" fill="url(#goldRim)" stroke="#171513" strokeWidth="1" />

        {/* Royal Cloche Dome */}
        <path
          d="M 27 59 C 27 45.5 37 44.5 50 44.5 C 63 44.5 73 45.5 73 59 Z"
          fill="url(#goldRim)"
        />
        {/* Dome inner sheen */}
        <path
          d="M 33 57 C 35 48 42 46.5 50 46.5 C 58 46.5 65 48 67 57 Z"
          fill="rgba(245, 233, 210, 0.3)"
        />

        {/* Cloche Base Tray */}
        <rect x="22" y="58" width="56" height="5" rx="2.5" fill="#F5E9D2" stroke="#F5A900" strokeWidth="1" />

        {/* Crossed Chef Knife & Fork Handles */}
        <path d="M 33 69 L 67 81 M 67 69 L 33 81" stroke="url(#goldRim)" strokeWidth="2.2" strokeLinecap="round" />
        
        {/* Center Star / Diamond */}
        <polygon points="50,71 52.5,75 50,79 47.5,75" fill="#F5A900" />
      </svg>

      {/* Brand Typography */}
      {variant !== 'symbol' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display text-2xl sm:text-3xl tracking-wider font-black ${
                isLight ? 'text-brand-charcoal' : 'text-gradient-gold'
              } drop-shadow-sm`}
            >
              PRETODAN
            </span>
          </div>
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold font-heading -mt-0.5">
            <span className={isLight ? 'text-brand-burntOrange' : 'text-brand-goldenYellow'}>
              RESTAURANT
            </span>
            <span className="text-brand-burntOrange px-1">•</span>
            <span className={isLight ? 'text-gray-600' : 'text-brand-warmCream/70'}>
              CONTINENTAL
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
