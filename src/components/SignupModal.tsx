import React from 'react';
import { Target, ArrowRight, X, Mail, Lock } from 'lucide-react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setSharedCookie } from '../utils/cookies';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  brandName?: string;
}

export default function SignupModal({ isOpen, onClose, onSuccess, brandName = 'MoatHero' }: SignupModalProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
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

    try {
      const name = email.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      if (isLogin) {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('moathero_is_authenticated', 'true');
        localStorage.setItem('moathero_user_email', email);
        localStorage.setItem('moathero_user_name', userCredential.user.displayName || capitalizedName);
        
        // Write shared SSO cookies
        setSharedCookie('rankbeacon_is_authenticated', 'true');
        setSharedCookie('rankbeacon_user_email', email);
      } else {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: capitalizedName });
        localStorage.setItem('moathero_is_authenticated', 'true');
        localStorage.setItem('moathero_user_email', email);
        localStorage.setItem('moathero_user_name', capitalizedName);
        
        // Write shared SSO cookies
        setSharedCookie('rankbeacon_is_authenticated', 'true');
        setSharedCookie('rankbeacon_user_email', email);

        // Initialize user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          name: capitalizedName,
          plan: 'free',
          createdAt: new Date().toISOString(),
          usage: {
            moat_audits: { used: 0, total: 20 }
          }
        });
      }

      onSuccess(email);
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      let errMsg = 'Authentication failed. Please verify your credentials.';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email is already in use. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential && userCredential.user) {
        const user = userCredential.user;
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          const userEmail = user.email || '';
          const isDorien = userEmail.toLowerCase() === 'dorien.vda@gmail.com';
          const defaultPlan = isDorien ? 'professional' : 'free';

          await setDoc(userRef, {
            email: userEmail,
            name: user.displayName || userEmail.split('@')[0],
            plan: defaultPlan,
            createdAt: new Date().toISOString(),
            usage: {
              moat_audits: { used: 0, total: isDorien ? 500 : 20 }
            }
          });
        }
        localStorage.setItem('moathero_is_authenticated', 'true');
        localStorage.setItem('moathero_user_email', user.email || '');
        localStorage.setItem('moathero_user_name', user.displayName || user.email?.split('@')[0] || 'Member');
        
        // Write shared SSO cookies
        setSharedCookie('rankbeacon_is_authenticated', 'true');
        setSharedCookie('rankbeacon_user_email', user.email || '');
        
        onSuccess(user.email || '');
        onClose();
      }
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Google Authentication failed.');
    } finally {
      setLoading(false);
    }
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
            {isLogin ? `Access ${brandName}` : 'Secure Your Account'}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {isLogin 
              ? 'Log in to audit your brand presence.'
              : 'Connect to detect brand alignment gaps instantly.'}
          </p>
        </div>

        {/* Core Value Props */}
        {!isLogin && (
          <div className="relative z-10 mb-6 rounded-xl bg-[#121214] border border-zinc-800/80 p-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[#d4af37]" />
              Unlocked Analyst Privileges
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Audit identity consistency across X, LinkedIn, YouTube & TikTok.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Detect confusing schema signals and mismatched bios.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Ensure AI engines parse a single, undeniable entity profile.</span>
              </li>
            </ul>
          </div>
        )}

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
              Password
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
              {loading ? (isLogin ? 'Signing In...' : 'Creating Profile...') : (isLogin ? 'Sign In to Account' : `Access ${brandName} Dashboard`)}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-xs text-zinc-400 hover:text-[#d4af37] underline transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>
        </form>

        <div className="relative z-10 my-4 flex items-center justify-between">
          <span className="w-full border-b border-zinc-800" />
          <span className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
            or use single sign-on
          </span>
          <span className="w-full border-b border-zinc-800" />
        </div>

        <button
          onClick={handleOAuthClick}
          className="relative z-10 w-full py-2.5 rounded-lg border border-zinc-800 bg-[#121214] text-[#fdfbf7] hover:bg-zinc-800/30 font-medium text-sm transition-all flex items-center justify-center gap-2"
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c1.67-1.54 2.63-3.8 2.63-6.52z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sync with Google Account
        </button>

        <p className="text-[10px] text-zinc-500 text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy. We do not sell your domain analytics data.
        </p>
      </div>
    </div>
  );
}
