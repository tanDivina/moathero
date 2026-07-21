import React from 'react';
import { ArrowRight, X, Mail, Lock } from 'lucide-react';
import { setSharedCookie } from '../utils/cookies';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  brandName?: string;
}

// Temporary Build Week demo access. This is intentionally not a security boundary.
const DEMO_ACCESS_CODE = 'moathero-demo';

export default function SignupModal({ isOpen, onClose, onSuccess, brandName = 'MoatHero' }: SignupModalProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);

    if (password !== DEMO_ACCESS_CODE) {
      setError('That demo access code is not valid. Please use the code supplied with the submission.');
      setLoading(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const name = normalizedEmail.split('@')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    localStorage.setItem('moathero_is_authenticated', 'true');
    localStorage.setItem('moathero_user_email', normalizedEmail);
    localStorage.setItem('moathero_user_name', capitalizedName);
    setSharedCookie('rankbeacon_is_authenticated', 'true');
    setSharedCookie('rankbeacon_user_email', normalizedEmail);

    onSuccess(normalizedEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0e] p-6 text-[#fdfbf7] shadow-2xl transition-all md:p-8 animate-fadeIn">
        
        {/* Glow effect */}
        <div className="absolute -left-20 -top-10 h-40 w-40 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-10 h-40 w-40 rounded-full bg-[#b87333]/5 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="relative z-10 mb-6 text-center">
          <svg 
            viewBox="0 0 100 100" 
            className="mx-auto mb-3 w-14 h-14"
            style={{ filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.15))' }}
          >
            <circle cx="50" cy="50" r="40" fill="none" stroke="#b87333" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.4" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#b87333" strokeWidth="2.5" />
            <line x1="50" y1="12" x2="50" y2="88" stroke="#b87333" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="#b87333" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="#d4af37" strokeWidth="3" />
            <circle cx="50" cy="50" r="5" fill="#d4af37" />
            <line x1="50" y1="50" x2="72" y2="28" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <h3 className="text-2xl font-bold font-serif tracking-tight text-[#fdfbf7] mb-2">
            Access {brandName}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Enter the Build Week demo access code to audit your brand presence.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-[#18181b] text-[#fdfbf7] placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 focus:border-[#d4af37]/50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Demo Access Code
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#18181b] text-[#fdfbf7] placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 focus:border-[#d4af37]/50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 font-medium bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-black font-bold text-sm bg-gradient-to-r from-[#b87333] to-[#d4af37] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? 'Opening Dashboard...' : `Access ${brandName} Dashboard`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-zinc-500 text-center mt-4">
          Temporary Build Week demo access. Your email is stored only in this browser.
        </p>
      </div>
    </div>
  );
}
