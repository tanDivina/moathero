import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  hideCTA?: boolean;
}

export default function Footer({ hideCTA = false }: FooterProps) {
  const [onboardingUrl] = React.useState('#');

  return (
    <>
      {/* CTA Section */}
      {!hideCTA && (
        <section className="py-24 bg-[#0c0c0f] border-t border-white/5 relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#d4af37]/3 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
              Defend Your Brand Moat <br/> & Ensure Semantic Consistency.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Scan your digital properties to detect brand alignment gaps, social profile mismatches, and structural schema issues before AI engines get confused.
            </p>
            
            {/* Two-button layout */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              {/* Primary Button */}
              <a 
                href={onboardingUrl} 
                className="px-8 py-4 text-base font-bold text-black rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 bg-gradient-to-r from-[#b87333] to-[#d4af37] inline-flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scan Your Website Free
                <ArrowRight className="h-5 w-5" />
              </a>
              
              {/* Secondary Button */}
              <a 
                href="#how-it-works" 
                className="px-8 py-4 text-base font-semibold rounded-lg border border-zinc-700 hover:border-[#d4af37] text-zinc-300 hover:text-[#d4af37] bg-transparent active:scale-95 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn Our Methodology
              </a>
            </div>
            
            {/* Final reassurance text */}
            <p className="text-xs text-zinc-500 font-mono">
              Risk-free optimization. No credit card required. Scan unlimited keywords.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#050507] border-t border-white/5 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6" style={{ textDecoration: 'none' }}>
                {/* Castle Fortress Logo - MoatHero theme */}
                <div className="flex items-center gap-2 group">
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
                </div>
              </div>
              <p className="text-zinc-500 mb-6 max-w-sm text-sm leading-relaxed">
                Empowering businesses to audit their digital presence, align social and site metadata, and establish a robust, unambiguous entity identity across the web.
              </p>
              <div className="flex space-x-6">
                <a href="https://x.com/DorienVibecodes" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#d4af37] transition-colors text-sm font-mono">
                  Twitter
                </a>
                <a href="https://www.linkedin.com/in/dorien-van-den-abbeele-136170b/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#d4af37] transition-colors text-sm font-mono">
                  LinkedIn
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white tracking-wide text-sm">
                Product
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#dashboard" className="text-zinc-500 hover:text-[#d4af37] transition-colors">Analyzer Dashboard</a></li>
                <li><a href="#how-it-works" className="text-zinc-500 hover:text-[#d4af37] transition-colors">Methodology</a></li>
                <li><a href="#faq" className="text-zinc-500 hover:text-[#d4af37] transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            {/* Removed Comparisons for MoatHero as it does not have the vs-ahrefs etc pages yet */}
            
            <div>
              <h3 className="font-semibold mb-4 text-white tracking-wide text-sm">
                Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@hero-apps.com" className="text-zinc-500 hover:text-[#d4af37] transition-colors">support@hero-apps.com</a></li>
                <li><a href="/privacy" className="text-zinc-500 hover:text-[#d4af37] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-16 pt-8 text-center text-xs text-zinc-600 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © 2026 MoatHero. All rights reserved.
            </p>
            <p className="text-[#d4af37]/80 hover:text-[#d4af37] transition-colors">
              A RankBeacon Product
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
