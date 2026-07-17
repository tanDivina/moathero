import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export default function PrivacyPolicy({ onNavigateHome }: PrivacyPolicyProps) {
  React.useEffect(() => {
    document.title = 'Privacy Policy | MoatHero';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fdfbf7] selection:bg-[#d4af37]/30 selection:text-[#fdfbf7] flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-zinc-400 hover:text-[#d4af37] transition-colors font-semibold text-sm cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono tracking-tight text-[#fdfbf7]">
                Moat<span className="text-[#d4af37]">Hero</span>
              </span>
            </div>
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="flex items-center gap-3 mb-8">
          <svg 
            viewBox="0 0 100 100" 
            className="w-14 h-14 shrink-0"
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
          <div>
            <h1 className="text-3xl font-bold text-[#fdfbf7]">Privacy Policy</h1>
            <p className="text-zinc-500 text-xs font-mono mt-1">Last Updated: July 4, 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 text-sm leading-relaxed">
          <section className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#fdfbf7] mb-3">1. Overview & Commitment</h2>
            <p>
              At MoatHero, we are committed to protecting your privacy. This Privacy Policy details how we collect, use, and handle your information when you visit our website, register an account, and use our brand alignment audit services. We do not sell your personal or domain analytics data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#fdfbf7]">2. Information We Collect</h2>
            <p>We collect and process the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-300">Account Credentials:</strong> Email address, display name, and authentication tokens provided when you register or sign in via Google OAuth or standard email accounts.
              </li>
              <li>
                <strong className="text-zinc-300">Workspace Configurations:</strong> Domain names, Domain Ratings (DR), metadata, and custom properties added to your active project workspaces.
              </li>
              <li>
                <strong className="text-zinc-300">Google API Integration Data:</strong> Access tokens and selected profile paths linked to retrieve your performance statistics.
              </li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-[#d4af37]">3. Google API Data Usage (Search Console & Google Analytics)</h2>
            <p>
              MoatHero integrates with Google APIs to retrieve search and analytics metrics. Please note:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-[#fdfbf7]">Scopes Requested:</strong> We request access to <code>webmasters.readonly</code> (Google Search Console).
              </li>
              <li>
                <strong className="text-[#fdfbf7]">Direct Client-Side Queries:</strong> Your GSC queries are executed directly client-side in your web browser utilizing secure, locally cached OAuth tokens.
              </li>
              <li>
                <strong className="text-[#fdfbf7]">No Third-Party Transmission:</strong> Google Search Console search analytics metrics are <strong>never stored, logged, or processed</strong> on MoatHero's backend servers. They remain entirely in your browser window and are discarded upon session close or disconnect.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#fdfbf7]">4. Storage and Security</h2>
            <p>
              We prioritize data security. Authentication details, custom project configurations, and metadata are securely stored using Firebase Authentication and Cloud Firestore databases. Payment processing tokens and billing configurations are managed securely via Stripe, and no credit card details are ever held or accessed by our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#fdfbf7]">5. Cookies & Local Storage</h2>
            <p>
              MoatHero uses local browser storage (<code>localStorage</code>) to maintain session continuity, preserve selected project contexts, and cache active access tokens for GSC querying. You can clear this cache at any time by selecting "Disconnect" inside the dashboard or by clearing your browser cache data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#fdfbf7]">6. Third-Party Disclosures</h2>
            <p>
              We disclose collected configuration details only to service providers that facilitate operations (Firebase, Stripe, Vercel Analytics). We do not share Google API details, search data, or project keywords with advertising companies.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-900 pt-6">
            <h2 className="text-lg font-bold text-[#fdfbf7]">7. Contact Us</h2>
            <p>
              If you have any questions, privacy concerns, or requests regarding your data, please contact us at:
            </p>
            <p className="font-mono text-[#d4af37] mt-1">
              <a href="mailto:support@hero-apps.com" className="hover:underline">support@hero-apps.com</a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer hideCTA={true} />
    </div>
  );
}
