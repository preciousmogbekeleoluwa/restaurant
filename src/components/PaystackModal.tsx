import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CreditCard, Landmark, CheckCircle2, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PaystackModal: React.FC = () => {
  const { isPaystackOpen, setIsPaystackOpen, totalAmount, clearCart, showToast } = useCart();
  const [activeTab, setActiveTab] = useState<'card' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('918');

  if (!isPaystackOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const ref = `PRETO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReference(ref);

      // Trigger celebratory confetti in brand colors
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5A900', '#E87516', '#F5E9D2', '#FFFFFF'],
      });

      showToast(`Payment successful! Order reference: ${ref}`);
    }, 1500);
  };

  const handleFinish = () => {
    clearCart();
    setIsSuccess(false);
    setIsPaystackOpen(false);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(orderReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Top Banner */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-surfaceCard border border-brand-goldenYellow/30 text-brand-goldenYellow">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-brand-goldenYellow leading-tight">
                Pretodan Secure Checkout
              </h3>
              <span className="text-[11px] text-brand-warmCream/70">
                Encrypted Online Payment Gateway
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPaystackOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-heading font-black text-2xl text-emerald-400">
                  Payment Confirmed!
                </h3>
                <p className="text-xs text-brand-warmCream/80 max-w-sm mx-auto">
                  Your continental meal order has been received by Pretodan Restaurant and is currently being prepared with care.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/30 max-w-xs mx-auto flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-warmCream/60 uppercase block">Order Reference</span>
                  <span className="font-mono font-bold text-sm text-brand-goldenYellow">{orderReference}</span>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="p-2 rounded-lg bg-brand-surfaceCard text-brand-goldenYellow hover:bg-brand-burntOrange hover:text-white transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all"
              >
                Done • Return to Restaurant
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <div className="space-y-5">
              {/* Amount Display */}
              <div className="p-4 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-warmCream/70 block">Total Payable</span>
                  <span className="font-display text-3xl font-black text-gradient-gold">
                    ${totalAmount}.00
                  </span>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
                  Verified Total
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex border border-brand-goldenYellow/20 rounded-xl p-1 bg-brand-charcoal gap-1">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'card'
                      ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal'
                      : 'text-brand-warmCream/70 hover:text-brand-warmCream'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Debit / Credit Card</span>
                </button>
                <button
                  onClick={() => setActiveTab('transfer')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'transfer'
                      ? 'bg-gradient-to-r from-brand-goldenYellow to-brand-burntOrange text-brand-charcoal'
                      : 'text-brand-warmCream/70 hover:text-brand-warmCream'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Direct Bank Wire</span>
                </button>
              </div>

              {/* Tab 1: Card Form */}
              {activeTab === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-warmCream/70 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream font-mono focus:outline-none focus:border-brand-goldenYellow"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-warmCream/70 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream font-mono focus:outline-none focus:border-brand-goldenYellow"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-warmCream/70 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream font-mono focus:outline-none focus:border-brand-goldenYellow"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Bank Transfer Instructions */}
              {activeTab === 'transfer' && (
                <div className="p-4 rounded-2xl bg-brand-charcoal border border-brand-goldenYellow/20 space-y-3 text-xs">
                  <span className="text-[11px] text-brand-goldenYellow uppercase font-bold block">
                    Restaurant Bank Details (Placeholder)
                  </span>
                  <div className="space-y-1 text-brand-warmCream/80 font-mono">
                    <p>Bank: <strong>Continental Reserve Bank</strong></p>
                    <p>Account Name: <strong>Pretodan Restaurant Ltd</strong></p>
                    <p>Account Number: <strong>0123456789</strong></p>
                  </div>
                  <p className="text-[11px] text-brand-warmCream/60 leading-relaxed italic">
                    Transfer the exact amount of ${totalAmount}.00, then click the button below to confirm.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Payment of ${totalAmount}.00</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-brand-warmCream/50 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-goldenYellow" />
                <span>256-Bit SSL Encrypted Transaction • Pretodan Restaurant</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
