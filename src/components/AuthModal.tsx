import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Sparkles,
  Crown,
  CheckCircle2,
  LogOut,
  Calendar,
  Truck,
  ArrowRight,
  ShieldCheck,
  Award,
  Edit2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    user,
    login,
    register,
    logout,
    updateProfile,
    setIsReservationOpen,
    setIsTrackingOpen,
    setIsVipOpen,
    setIsCartOpen,
    showToast
  } = useCart();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  // Form states
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regDietary, setRegDietary] = useState('');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAuthOpen(false);
    };
    if (isAuthOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthOpen, setIsAuthOpen]);

  if (!isAuthOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      showToast('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    const success = await login(signInEmail.trim(), signInPassword);
    setIsSubmitting(false);

    if (success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5A900', '#E87516', '#F5E9D2', '#FFFFFF']
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      showToast('Please fill in your name, email, and phone number');
      return;
    }

    setIsSubmitting(true);
    const success = await register({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      deliveryAddress: regAddress.trim() || '123 Grand Continental Boulevard',
      dietaryPreferences: regDietary.trim() || 'No specific restrictions',
      password: regPassword || undefined
    });
    setIsSubmitting(false);

    if (success) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5A900', '#E87516', '#F5E9D2', '#FFFFFF']
      });
    }
  };

  const handleQuickDemoLogin = async (demoName: string, demoEmail: string) => {
    setIsSubmitting(true);
    await login(demoEmail, 'demo123');
    setIsSubmitting(false);
  };

  const handleSaveAddress = async () => {
    if (!newAddress.trim()) return;
    await updateProfile({ deliveryAddress: newAddress.trim() });
    setIsEditingAddress(false);
  };

  return (
    <div
      onClick={() => setIsAuthOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto"
      >
        {/* Top Header */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/35 flex items-center justify-center text-brand-goldenYellow">
              {user ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-brand-goldenYellow leading-tight">
                {user ? 'Pretodan Patron Concierge' : 'Customer Sign In & Profile'}
              </h2>
              <span className="text-xs text-brand-warmCream/70 font-sans">
                {user ? 'Manage your reservations, orders & VIP tier' : 'Access your VIP continental dining benefits'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {user ? (
            /* ========================================================
               LOGGED IN STATE: VIP Patron Dashboard Card
               ======================================================== */
            <div className="space-y-6">
              {/* Luxury Gold Patron Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-charcoal via-brand-surfaceCard to-brand-charcoal border-2 border-brand-goldenYellow/40 relative overflow-hidden shadow-glow-yellow space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-goldenYellow/20 border border-brand-goldenYellow text-brand-goldenYellow text-[10px] font-black uppercase tracking-wider">
                      {user.tier || 'Gold Gourmet Concierge'}
                    </span>
                    <h3 className="font-heading font-black text-2xl text-brand-warmCream mt-1">
                      {user.name}
                    </h3>
                    <p className="text-xs text-brand-warmCream/70 font-mono">
                      {user.email} • {user.phone}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-goldenYellow/15 border border-brand-goldenYellow flex items-center justify-center text-brand-goldenYellow shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                {/* Loyalty Points Pill */}
                <div className="pt-2 border-t border-brand-goldenYellow/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-brand-warmCream/80">
                    <Sparkles className="w-4 h-4 text-brand-goldenYellow" />
                    <span>Loyalty Points Balance:</span>
                  </div>
                  <span className="font-mono font-black text-lg text-brand-goldenYellow">
                    {user.points || 500} pts
                  </span>
                </div>
              </div>

              {/* Delivery Address & Preferences Card */}
              <div className="p-5 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/25 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-goldenYellow flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Default Delivery Address</span>
                  </span>
                  <button
                    onClick={() => {
                      setIsEditingAddress(!isEditingAddress);
                      setNewAddress(user.deliveryAddress || '');
                    }}
                    className="text-xs text-brand-burntOrange hover:text-brand-goldenYellow transition-colors flex items-center gap-1 font-bold"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{isEditingAddress ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Enter new delivery address..."
                      className="flex-1 px-3 py-2 rounded-xl bg-brand-surfaceCard border border-brand-goldenYellow/30 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                    />
                    <button
                      onClick={handleSaveAddress}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal text-xs font-bold font-heading"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-brand-warmCream/80 font-medium">
                    {user.deliveryAddress || '123 Grand Continental Boulevard, Suite 4B'}
                  </p>
                )}

                {user.dietaryPreferences && (
                  <div className="pt-2 border-t border-brand-goldenYellow/10 text-[11px] text-brand-warmCream/60">
                    <span>Kitchen Note / Diet: </span>
                    <strong className="text-brand-warmCream/80">{user.dietaryPreferences}</strong>
                  </div>
                )}
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-warmCream/70 block">
                  Quick Concierge Actions
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsReservationOpen(true);
                    }}
                    className="p-3.5 rounded-xl bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-left transition-all group"
                  >
                    <Calendar className="w-4 h-4 text-brand-goldenYellow mb-1.5 group-hover:scale-110 transition-transform" />
                    <strong className="text-xs text-brand-warmCream block font-heading">Book Table</strong>
                    <span className="text-[10px] text-brand-warmCream/60">VIP reservations</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsTrackingOpen(true);
                    }}
                    className="p-3.5 rounded-xl bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-left transition-all group"
                  >
                    <Truck className="w-4 h-4 text-brand-goldenYellow mb-1.5 group-hover:scale-110 transition-transform" />
                    <strong className="text-xs text-brand-warmCream block font-heading">Track Order</strong>
                    <span className="text-[10px] text-brand-warmCream/60">Live kitchen dispatch</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsVipOpen(true);
                    }}
                    className="p-3.5 rounded-xl bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-left transition-all group"
                  >
                    <Crown className="w-4 h-4 text-brand-goldenYellow mb-1.5 group-hover:scale-110 transition-transform" />
                    <strong className="text-xs text-brand-warmCream block font-heading">VIP Perks</strong>
                    <span className="text-[10px] text-brand-warmCream/60">Exclusive coupons</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="p-3.5 rounded-xl bg-brand-surfaceCard hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 hover:border-brand-goldenYellow text-left transition-all group"
                  >
                    <Sparkles className="w-4 h-4 text-brand-goldenYellow mb-1.5 group-hover:scale-110 transition-transform" />
                    <strong className="text-xs text-brand-warmCream block font-heading">Order Cart</strong>
                    <span className="text-[10px] text-brand-warmCream/60">Ready to checkout</span>
                  </button>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="pt-2 border-t border-brand-goldenYellow/20 flex items-center justify-between">
                <button
                  onClick={logout}
                  className="px-5 py-2.5 rounded-full bg-brand-charcoal hover:bg-brand-burntOrange/30 border border-brand-burntOrange/40 text-brand-burntOrange hover:text-brand-goldenYellow text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================
               LOGGED OUT STATE: Tabbed Sign In / Create Account
               ======================================================== */
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="flex bg-brand-charcoal p-1 rounded-2xl border border-brand-goldenYellow/25">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={`flex-1 py-2.5 text-xs font-heading font-bold rounded-xl transition-all ${
                    activeTab === 'signin'
                      ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal shadow-md'
                      : 'text-brand-warmCream/70 hover:text-brand-warmCream'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2.5 text-xs font-heading font-bold rounded-xl transition-all ${
                    activeTab === 'register'
                      ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal shadow-md'
                      : 'text-brand-warmCream/70 hover:text-brand-warmCream'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* TAB 1: SIGN IN */}
              {activeTab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                      <Mail className="w-4 h-4 text-brand-goldenYellow absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Password (Optional for Guest Sign In)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                      <Lock className="w-4 h-4 text-brand-goldenYellow absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span>Sign In to Pretodan</span>
                      </>
                    )}
                  </button>

                  {/* 1-Click Demo Patron Logins */}
                  <div className="pt-3 border-t border-brand-goldenYellow/15 space-y-2">
                    <span className="text-[11px] text-brand-warmCream/60 block text-center font-medium">
                      Or 1-click test with sample VIP guest profiles:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('Eleanor Vance', 'eleanor.vance@example.com')}
                        className="py-2 px-3 rounded-xl bg-brand-charcoal hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 text-brand-goldenYellow text-[11px] font-bold text-center transition-colors"
                      >
                        Eleanor Vance
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('Marcus Sterling', 'marcus.sterling@example.com')}
                        className="py-2 px-3 rounded-xl bg-brand-charcoal hover:bg-brand-burntOrange/20 border border-brand-goldenYellow/25 text-brand-goldenYellow text-[11px] font-bold text-center transition-colors"
                      >
                        Marcus Sterling
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: CREATE ACCOUNT */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-burntOrange/20 to-brand-goldenYellow/20 border border-brand-goldenYellow/35 flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-brand-goldenYellow shrink-0" />
                    <p className="text-[11px] text-brand-warmCream leading-tight">
                      <strong>500 VIP Welcome Points</strong> credited automatically upon signing up today!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Lady Vivienne Montgomery"
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                      <User className="w-4 h-4 text-brand-goldenYellow absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. vivienne@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 234-8901"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Delivery Address / Suite *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="e.g. 123 Grand Continental Boulevard, Suite 4B"
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                      />
                      <MapPin className="w-4 h-4 text-brand-goldenYellow absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                      Dietary Preferences / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={regDietary}
                      onChange={(e) => setRegDietary(e.target.value)}
                      placeholder="e.g. Medium-rare steak, shellfish allergy, red wine pairing"
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream placeholder-brand-warmCream/40 focus:outline-none focus:border-brand-goldenYellow"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                        <span>Registering Patron Profile...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Create Account & Claim VIP Pass</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="text-center text-[10px] text-brand-warmCream/50 flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>256-Bit Encrypted Patron Privacy • Pretodan Restaurant</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
