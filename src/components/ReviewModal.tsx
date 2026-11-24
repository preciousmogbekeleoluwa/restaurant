import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/restaurantData';
import { X, Star, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReviewModal: React.FC = () => {
  const { isReviewOpen, setIsReviewOpen, showToast } = useCart();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [favoriteDish, setFavoriteDish] = useState(MENU_ITEMS[0].name);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isReviewOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please provide your name and review message.');
      return;
    }

    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5A900', '#E87516', '#F5E9D2', '#FFFFFF'],
    });

    showToast('Thank you for your review! 🌟');
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      setIsReviewOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md animate-fade-scale">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-brand-surfaceCard via-brand-charcoal to-brand-surfaceCard rounded-3xl border border-brand-goldenYellow/40 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-brand-charcoal border-b border-brand-goldenYellow/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-surfaceCard border border-brand-goldenYellow/40 flex items-center justify-center text-brand-goldenYellow">
              <Star className="w-5 h-5 fill-brand-goldenYellow" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-brand-goldenYellow leading-tight">
                Guest Review Concierge
              </h2>
              <span className="text-xs text-brand-warmCream/70 font-sans">
                Share your dining experience at Pretodan
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewOpen(false)}
            className="p-2 rounded-full bg-brand-surfaceCard text-brand-warmCream hover:text-brand-goldenYellow transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-heading font-black text-2xl text-emerald-400">
                Review Published!
              </h3>
              <p className="text-xs text-brand-warmCream/80 max-w-sm mx-auto">
                Thank you for contributing to the Pretodan culinary community. Your feedback inspires our executive kitchen brigade every day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="text-center space-y-1.5 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-goldenYellow block">
                  How was your culinary experience?
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-brand-goldenYellow text-brand-goldenYellow drop-shadow-glow'
                            : 'text-brand-warmCream/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Vivienne Montgomery"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                  Favorite Dish You Enjoyed
                </label>
                <select
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                >
                  {MENU_ITEMS.map((dish) => (
                    <option key={dish.id} value={dish.name}>{dish.name} (${dish.price}.00)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-warmCream/80 mb-1">
                  Your Review / Compliment *
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the flavours, ambiance, hospitality, or favorite moment..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-charcoal border border-brand-goldenYellow/25 text-xs text-brand-warmCream focus:outline-none focus:border-brand-goldenYellow"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-brand-goldenYellow via-brand-burntOrange to-brand-goldenYellow text-brand-charcoal font-heading font-black text-sm uppercase tracking-wider shadow-glow-yellow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Guest Review</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
