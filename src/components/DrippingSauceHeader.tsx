import React from 'react';

interface DrippingSauceHeaderProps {
  className?: string;
  variant?: 'banner' | 'divider';
}

export const DrippingSauceHeader: React.FC<DrippingSauceHeaderProps> = ({
  className = '',
  variant = 'banner',
}) => {
  return (
    <div
      className={`relative w-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block drop-shadow-dripping-glow"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sauceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A900" />
            <stop offset="45%" stopColor="#E87516" />
            <stop offset="85%" stopColor="#F5A900" />
            <stop offset="100%" stopColor="#E87516" />
          </linearGradient>
          <radialGradient id="dripHighlight" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F5A900" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dripping sauce organic fluid wave with drops inspired by reference menu */}
        <path
          d="M0,0 L1440,0 L1440,32 C1410,34 1385,28 1360,42 C1348,49 1342,68 1335,68 C1328,68 1324,46 1310,36 C1290,22 1260,35 1230,30 C1200,25 1180,48 1165,64 C1155,75 1142,75 1134,60 C1122,38 1098,34 1075,32 C1045,30 1025,56 1005,62 C992,66 982,50 970,38 C945,15 910,38 880,48 C860,54 845,76 832,76 C820,76 812,50 795,38 C770,22 745,32 720,40 C690,50 670,72 654,72 C640,72 630,48 610,35 C580,18 550,38 525,52 C510,60 498,78 485,78 C472,78 464,52 445,36 C420,16 390,32 365,46 C345,58 332,82 318,82 C305,82 298,54 280,38 C255,16 220,36 195,50 C180,59 168,76 155,76 C142,76 134,50 115,35 C85,12 50,32 20,38 L0,42 Z"
          fill="url(#sauceGradient)"
        />

        {/* Hanging droplets */}
        <ellipse cx="318" cy="85" rx="5" ry="5" fill="#E87516" />
        <ellipse cx="485" cy="81" rx="4.5" ry="4.5" fill="#F5A900" />
        <ellipse cx="832" cy="79" rx="5" ry="5" fill="#E87516" />
        <ellipse cx="1165" cy="67" rx="4" ry="4" fill="#F5A900" />
        <ellipse cx="1335" cy="71" rx="4.5" ry="4.5" fill="#E87516" />

        {/* Free-falling droplets */}
        <circle cx="318" cy="94" r="2" fill="#F5A900" />
        <circle cx="832" cy="87" r="2" fill="#F5A900" />
      </svg>
    </div>
  );
};
