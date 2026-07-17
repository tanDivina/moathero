import React from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { track } from '@vercel/analytics';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  onTriggerSignup: () => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen, isAuthenticated, onTriggerSignup }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Run on mount to initialize state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''} relative z-50`}>
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 header-container ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="max-w-[1440px] mx-auto h-full header-inner">
          <div className="flex justify-between items-center h-full">
            {/* 
              ============================================================
              === BRANDING LOGO: PAGEONEHERO GOLD-COPPER COMPASS LOGO ===
              ============================================================
            */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className={`flex-shrink-0 flex items-center gap-2 group select-none transition-all duration-500 origin-left ${
                  isScrolled ? 'scale-[0.8]' : 'scale-100'
                }`}
                style={{ textDecoration: 'none' }}
              >
                <svg 
                  width="48" 
                  height="38" 
                  viewBox="0 0 100 100" 
                  className="-mr-3 -mt-2 transition-transform duration-300 group-hover:scale-105 relative z-0" 
                  style={{ filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.15))' }}
                >
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#b87333" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.4" />
                  <path d="M 25 70 L 75 70 L 75 40 L 65 40 L 65 30 L 55 30 L 55 40 L 45 40 L 45 30 L 35 30 L 35 40 L 25 40 Z" fill="none" stroke="#b87333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 40 70 L 60 70 L 60 20 L 55 20 L 55 12 L 45 12 L 45 20 L 40 20 Z" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 42 70 L 42 60 C 42 55, 58 55, 58 60 L 58 70" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="text-2xl font-bold font-mono tracking-tight -ml-4 text-white relative z-10">
                  Moat<span className="text-[#d4af37] transition-all duration-300 group-hover:text-[#b87333]">Hero</span>
                </span>
                <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700/60 select-none">
                  Beta
                </span>
              </a>

              {/* Ecosystem Apps Dropdown Switcher (17-Tool Integration) */}
              <div className="relative group/switcher hidden sm:block">
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider text-zinc-400 hover:text-[#d4af37] bg-[#0c0c0f]/60 hover:bg-zinc-900/40 border border-zinc-800/80 hover:border-[#d4af37]/30 rounded-lg select-none transition-all cursor-pointer">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Apps Suite
                  <ChevronDown className="h-3 w-3 text-zinc-500" />
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-zinc-800 bg-[#0c0c0f]/95 backdrop-blur-md p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/switcher:opacity-100 group-hover/switcher:translate-y-0 group-hover/switcher:pointer-events-auto transition-all duration-200 z-50">
                  <div className="px-3 py-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900 mb-1">
                    RankBeacon Loop
                  </div>
                  <div className="space-y-0.5 max-h-[360px] overflow-y-auto pr-0.5 custom-scrollbar">
                    
                    <a href="https://rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">RankBeacon</p>
                      <p className="text-[9px] text-zinc-500">Suite Analytics & ROI Tracker</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://spy.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">SpyHero</p>
                      <p className="text-[9px] text-zinc-500">Competitor SEO Gap Auditor</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://crawl.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">CrawlHero</p>
                      <p className="text-[9px] text-zinc-500">Semantic Code & Site Sitemap Director</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://cannibal.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">CannibalHero</p>
                      <p className="text-[9px] text-zinc-500">Keyword Cannibalization Auditor</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://pageone.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">PageOneHero</p>
                      <p className="text-[9px] text-zinc-500">AI Overview Optimization</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://reddit.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">RedditHero</p>
                      <p className="text-[9px] text-zinc-500">Forum Discussion Auto-Citations</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://founder.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">FounderHero</p>
                      <p className="text-[9px] text-zinc-500">LinkedIn Authority Draft Generator</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://cta.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">CtaHero</p>
                      <p className="text-[9px] text-zinc-500">Dynamic Referrer-Intent Forms</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://proof.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">ProofHero</p>
                      <p className="text-[9px] text-zinc-500">Live AI Citations Verification Badges</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://tiktok.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">TikTok Hero</p>
                      <p className="text-[9px] text-zinc-500">Short-Video SEO & GSC Tracker</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://insta.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">Insta Hero</p>
                      <p className="text-[9px] text-zinc-500">Reels & Image Alt-Text Optimizer</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://x.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">X Hero</p>
                      <p className="text-[9px] text-zinc-500">Post & Thread Indexing Optimizer</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://yt.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">YouTube Hero</p>
                      <p className="text-[9px] text-zinc-500">Video Chapters & Key Moments</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>

                  <a href="https://moat.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/15 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-[#d4af37]">MoatHero</p>
                      <p className="text-[9px] text-[#d4af37]/70 font-semibold">AI Citation Consensus & Share of Voice</p>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  </a>

                  <a href="https://local.rankbeacon.dev" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">LocalHero</p>
                      <p className="text-[9px] text-zinc-500">Google Business Profile Optimization</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation - rankbeacon.dev Copper & Gold Palette */}
            <nav className="hidden md:flex space-x-8">
              <a href="#dashboard" className="text-[#d4af37] px-3 py-2 text-sm font-medium transition-colors hover:text-[#b87333]">
                Keyword Analyzer
              </a>
              <a 
                href="#how-it-works" 
                className="text-zinc-300 px-3 py-2 text-sm font-medium transition-colors hover:text-[#d4af37]" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
              >
                Methodology
              </a>
              <a 
                href="#faq" 
                className="text-zinc-300 px-3 py-2 text-sm font-medium transition-colors hover:text-[#d4af37]" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
              >
                FAQ
              </a>
              <a href="mailto:support@hero-apps.com" className="text-zinc-300 px-3 py-2 text-sm font-medium transition-colors hover:text-[#d4af37]">
                Support
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <a 
                  href="#dashboard" 
                  className="px-4 py-2 text-sm font-semibold text-black rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#d4af37]/10 bg-gradient-to-r from-[#b87333] to-[#d4af37]"
                  onClick={() => {
                    try {
                      track('go_to_console_clicked', { device: 'desktop' });
                    } catch (err) {
                      console.warn('Analytics track failed:', err);
                    }
                    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Go to Analyzer
                </a>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      try {
                        track('signin_clicked', { device: 'desktop' });
                      } catch (err) {
                        console.warn('Analytics track failed:', err);
                      }
                      onTriggerSignup();
                    }}
                    className="text-[#d4af37] px-3 py-2 text-sm font-medium transition-colors hover:text-[#b87333]"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      try {
                        track('free_trial_clicked', { device: 'desktop' });
                      } catch (err) {
                        console.warn('Analytics track failed:', err);
                      }
                      onTriggerSignup();
                    }}
                    className="px-4 py-2 text-sm font-semibold text-black rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#d4af37]/10 bg-gradient-to-r from-[#b87333] to-[#d4af37]"
                  >
                    Start Free Scan
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-zinc-300 hover:text-[#d4af37] focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0f] border-t border-white/5">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#dashboard" className="block px-3 py-2 text-base font-medium text-[#d4af37]" onClick={() => setIsMobileMenuOpen(false)}>
                Keyword Analyzer
              </a>
              <a 
                href="#how-it-works" 
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-[#d4af37]" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); 
                  setIsMobileMenuOpen(false); 
                }}
              >
                Methodology
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-[#d4af37]" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); 
                  setIsMobileMenuOpen(false); 
                }}
              >
                FAQ
              </a>
              <a href="mailto:support@hero-apps.com" className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-[#d4af37]">
                Support
              </a>
              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <a 
                    href="#dashboard" 
                    className="w-full block text-center px-4 py-2 text-sm font-semibold text-black rounded-lg bg-gradient-to-r from-[#b87333] to-[#d4af37]"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Go to Analyzer
                  </a>
                </div>
              ) : (
                <>
                  <div className="px-3 py-2">
                    <button 
                      onClick={() => { 
                        try {
                          track('signin_clicked', { device: 'mobile' }); 
                        } catch (err) {
                          console.warn('Analytics track failed:', err);
                        }
                        onTriggerSignup(); 
                        setIsMobileMenuOpen(false); 
                      }}
                      className="text-[#d4af37] hover:text-[#b87333] block w-full text-left font-medium" 
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="px-3 py-2">
                    <button 
                      onClick={() => { 
                        try {
                          track('free_trial_clicked', { device: 'mobile' }); 
                        } catch (err) {
                          console.warn('Analytics track failed:', err);
                        }
                        onTriggerSignup(); 
                        setIsMobileMenuOpen(false); 
                      }}
                      className="w-full block text-center px-4 py-2 text-sm font-semibold text-black rounded-lg bg-gradient-to-r from-[#b87333] to-[#d4af37]"
                    >
                      Start Free Scan
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
