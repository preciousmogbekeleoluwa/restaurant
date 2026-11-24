import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Smartphone, Download, X, Sparkles } from 'lucide-react';

export const PwaInstallBanner: React.FC = () => {
  const { canInstallPwa, promptPwaInstall } = useCart();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstallPwa || dismissed) return null;

  return (
    <div className="fixed top-20 sm:top-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slide-up">
      <div className="p-4 rounded-2xl bg-brand-surfaceCard/95 border border-brand-goldenYellow/40 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-burntOrange to-brand-goldenYellow text-brand-charcoal flex items-center justify-center shrink-0 shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-brand-goldenYellow text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-brand-goldenYellow" />
              <span>Install Pretodan App</span>
            </div>
            <p className="text-[11px] text-brand-warmCream/80 font-light leading-snug">
              Add to your home screen for instant ordering, table booking & VIP rewards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={promptPwaInstall}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            Install
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full text-brand-warmCream/50 hover:text-brand-warmCream"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
