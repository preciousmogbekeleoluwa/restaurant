import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Crown, Sparkles, Gift, Tag, Check, Copy, Award, ShieldCheck } from 'lucide-react';

export const VipRewardsModal: React.FC = () => {
  const { isVipOpen, setIsVipOpen, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVipOpen(false);
    };
    if (isVipOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVipOpen, setIsVipOpen]);

  if (!isVipOpen) return null;

  const points = 720;
  const nextTierPoints = 1000;
  const progressPercent = Math.min(100, Math.round((points / nextTierPoints) * 100));

  const perks = [
    {
      id: 'coupon-1',
      code: 'PRETOVIP15',
      title: '15% Off Your Next Meal',
      desc: 'Valid on all continental dinners and online orders over $50.',
      expiry: 'Expires in 30 days',
      badge: 'Active Discount'
    },
    {
      id: 'coupon-2',
      code: 'TRUFFLEFRIES',
      title: 'Complimentary Truffle Fries',
      desc: 'Free side of hand-cut parmesan truffle fries with any prime steak or pasta.',
      expiry: 'Member Exclusive',
      badge: 'Free Food Perk'
    },
    {
      id: 'coupon-3',
      code: 'SOMMELIERWINE',
      title: 'Sommelier Wine Tasting Pass',
      desc: 'Complimentary glass of reserve house wine during any dine-in reservation.',
      expiry: 'Dine-In Only',
      badge: 'VIP Beverage'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon "${code}" copied to clipboard! 🎁`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div
      onClick={() => setIsVipOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        
        {/* Modal Top Header */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/40 flex items-center justify-center text-brand-goldenYellow">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-brand-goldenYellow leading-tight">
                Pretodan VIP Culinary Club
              </h2>
              <span className="text-xs text-brand-warmCream/70 font-sans">
                Exclusive Gastronomy Rewards & Privileges
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsVipOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Member Tier Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-2 border-brand-goldenYellow/40 relative overflow-hidden shadow-glow-yellow space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-brand-warmCream/60 uppercase tracking-widest block font-bold">
                  Loyalty Status
                </span>
                <h3 className="font-display text-2xl text-gradient-gold uppercase font-black">
                  GOLD GOURMET CONCIERGE
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand-goldenYellow/15 border border-brand-goldenYellow flex items-center justify-center text-brand-goldenYellow">
                <Award className="w-6 h-6" />
              </div>
            </div>

            {/* Points Balance & Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-brand-warmCream/80">Available Points: <strong className="text-brand-goldenYellow font-mono text-base">{points} pts</strong></span>
                <span className="text-brand-warmCream/60 text-[11px]">{nextTierPoints - points} pts to Platinum Royal</span>
              </div>

              {/* Progress track */}
              <div className="w-full h-2.5 rounded-full bg-brand-charcoal border border-brand-goldenYellow/25 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-brand-warmCream/70 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-goldenYellow shrink-0" />
              <span>Earn 10 points for every $1 spent on dining and takeaway.</span>
            </div>
          </div>

          {/* Active Rewards & Perks Section */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-goldenYellow block">
              Available Member Perks & Coupons
            </span>

            <div className="space-y-3">
              {perks.map((perk) => (
                <div
                  key={perk.id}
                  className="p-4 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 hover:border-brand-goldenYellow/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-brand-warmCream font-bold">{perk.title}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-brand-surfaceCard border border-brand-goldenYellow/30 text-[9px] font-bold text-brand-goldenYellow">
                        {perk.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-warmCream/70 font-light leading-relaxed">
                      {perk.desc}
                    </p>
                    <span className="text-[10px] text-brand-burntOrange block font-medium">{perk.expiry}</span>
                  </div>

                  {/* Copy Code Button */}
                  <button
                    onClick={() => handleCopy(perk.code)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-surfaceCard hover:bg-brand-burntOrange border border-brand-goldenYellow/30 text-brand-goldenYellow hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedCode === perk.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{perk.code}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-brand-warmCream/60 pt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-goldenYellow" />
            <span>VIP privileges apply automatically during checkout or table reservation.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
