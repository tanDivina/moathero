import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Target, TrendingUp, Cpu, Sparkles, 
  CheckCircle2, Compass, AlertTriangle, Zap, MessageSquare, ExternalLink, Globe,
  ChevronDown, ChevronUp, Layers
} from 'lucide-react';

// Viewport-Entrance Scroll Reveals React Wrapper (Spring Overshoot Physics)
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Trigger when the element's top is 20px above the bottom of the viewport
      if (rect.top <= viewHeight - 20) {
        setIsVisible(true);
      }
    };

    // Run multiple immediate and timed checks to capture layout updates
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 50);
    const t2 = setTimeout(checkVisibility, 200);
    const t3 = setTimeout(checkVisibility, 500);

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{
        transition: 'transform 1.1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity'
      }}
      className={`transform ${className} ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-16 scale-[0.95]'
      }`}
    >
      {children}
    </div>
  );
}

interface LandingPageProps {
  onTriggerSignup: () => void;
  onTriggerLogin: () => void;
}

export default function LandingPage({ onTriggerSignup, onTriggerLogin }: LandingPageProps) {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const faqs = [
    {
      q: 'How does MoatHero connect to my social profiles?',
      a: 'MoatHero scans your public social footprint (like LinkedIn, Twitter/X, and YouTube). No deep integrations are strictly necessary to run basic alignment checks, but connecting via OAuth allows for more precise live editing.'
    },
    {
      q: 'Is my Google Search Console connection safe?',
      a: 'Yes, absolutely. We only request read-only permissions (we never write to or modify your search console). Your analytics data is processed securely to locate semantic gaps, is fully isolated to your user profile, and is never shared or sold.'
    },
    {
      q: 'What if my browser blocks the JSON file download from Google Cloud Console?',
      a: 'This is a common browser security issue where credentials JSON downloads are blocked. If it happens, you can copy the Client ID and Client Secret directly from the Google Cloud Console and paste them into our setup fields. We will construct your credentials configuration file securely on our end.'
    },
    {
      q: 'How do I authorize the Service Account for automated tracking?',
      a: 'To track your ranking improvements in the background, you can add our service account (gsc-reader@gsc-automator-497222.iam.gserviceaccount.com) as a Restrict/Reader user in your Google Search Console settings. This enables our AI agent to poll daily position shift metrics.'
    },
    {
      q: 'Can I track and run audits for multiple subdomains or projects?',
      a: 'Yes! You can add and toggle between multiple domains in your dashboard. To optimize multiple tools and ensure zero keyword cannibalization across your subdomains, check out our centralized guide in the RankBeacon Knowledge Base.'
    }
  ];

  const fallbackStudies = [
    {
      id: 'mock-1',
      query: 'ssl redirection namecheap vercel',
      maskedDomain: 'r*********.dev',
      rankImprovement: 14,
      ctrIncrease: 5.2,
      baselinePosition: 16,
      currentPosition: 2
    },
    {
      id: 'mock-2',
      query: 'free keyword research tool',
      maskedDomain: 'k*********.com',
      rankImprovement: 8,
      ctrIncrease: 2.8,
      baselinePosition: 12,
      currentPosition: 4
    },
    {
      id: 'mock-3',
      query: 'fix vercel 404 custom domain',
      maskedDomain: 'h**********.com',
      rankImprovement: 12,
      ctrIncrease: 4.1,
      baselinePosition: 15,
      currentPosition: 3
    }
  ];

  const caseStudiesToRender = fallbackStudies;

  return (
    <div className="bg-[#050507] text-[#fdfbf7] min-h-screen font-sans selection:bg-[#d4af37]/30 selection:text-white overflow-x-hidden relative">
      
      {/* Background Decorative Atmospheric Lights (drifting folds & radial blooms) */}
      <div className="absolute top-[-10%] left-[-20%] w-[90%] h-[70%] rounded-full bg-gradient-to-br from-[#b87333]/8 via-transparent to-[#d4af37]/2 blur-[140px] pointer-events-none mix-blend-screen animate-haptic-pulse" />
      <div className="absolute top-[20%] right-[-15%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-[#d4af37]/5 via-transparent to-transparent blur-[160px] pointer-events-none mix-blend-screen" />
      
      {/* Vertical Container Boundary Grid Lines (gives structural framing layout) */}
      <div className="absolute inset-0 flex justify-between max-w-5xl mx-auto px-6 pointer-events-none opacity-20">
        <div className="w-[1px] bg-gradient-to-b from-zinc-800 via-transparent to-zinc-900" />
        <div className="w-[1px] bg-gradient-to-b from-zinc-800 via-transparent to-zinc-900" />
      </div>

      {/* Hero Section (Always visible on mount with a pure CSS animation) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-zinc-900/40 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 animate-hero-fade-in relative z-10">
            
            {/* Tagline Badge with Gilt Border Gradient */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/5 border-gradient-gilt text-xs font-mono font-semibold tracking-widest text-[#d4af37] uppercase">
              <Zap className="h-3 w-3 animate-pulse text-[#d4af37]" />
              AI Citation Consensus & Share of Voice
            </div>

            {/* Master Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto bg-gradient-to-b from-[#fdfbf7] via-[#fdfbf7] to-zinc-500 bg-clip-text text-transparent">
              Are You The Verified Source, Or <span className="text-[#d4af37]">Just Another Vendor?</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              LLMs and AI search engines synthesize answers from trusted citations. <strong className="font-bold text-zinc-200">MoatHero</strong> analyzes your Share of Voice across AI Overviews and top profiles, building an impenetrable moat around your brand's digital authority.
            </p>

            {/* CTA Buttons (Button-in-button patterns) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 z-10 relative">
              <button
                onClick={onTriggerSignup}
                className="w-full sm:w-auto group relative flex items-center justify-between pl-8 pr-2 py-2 bg-gradient-to-r from-[#b87333] to-[#d4af37] hover:from-[#c98444] hover:to-[#e5c048] text-black font-bold text-sm rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-lg shadow-[#d4af37]/5 hover:shadow-[#d4af37]/15"
              >
                <span className="tracking-wide">Analyze Your Brand Moat</span>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center ml-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-black/20 group-hover:scale-105">
                  <ArrowRight className="h-4 w-4 text-black stroke-[2.5]" />
                </div>
              </button>
              
              <button
                onClick={onTriggerLogin}
                className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 font-bold text-sm rounded-full border-gradient-gilt hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-inner"
              >
                Sign In to Your Dashboard
              </button>
            </div>

            {/* Core Stat / Social Proof Highlights (Double-Bezel Concentric Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
              <ScrollReveal delay={150} className="h-full">
                {/* Double-Bezel Card Frame */}
                <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                  {/* Inner Concentric Core */}
                  <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between text-left">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <AlertTriangle className="h-12 w-12 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">The Problem</p>
                      <h3 className="text-lg font-bold mt-2 text-zinc-100 font-display">AI Hallucinations & Dilution</h3>
                      <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">When LLMs scrape the web, outdated or contradictory information across platforms dilutes your brand authority.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="h-full">
                {/* Double-Bezel Card Frame */}
                <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                  {/* Inner Concentric Core */}
                  <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between text-left">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Target className="h-12 w-12 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">The Strike Zone</p>
                      <h3 className="text-lg font-bold mt-2 text-zinc-100 font-display">Brand Alignment Consensus</h3>
                      <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">To be cited as the definitive expert by ChatGPT or Perplexity, your digital footprints must be 100% semantically aligned.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={450} className="h-full">
                {/* Double-Bezel Card Frame */}
                <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                  {/* Inner Concentric Core */}
                  <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between text-left">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <TrendingUp className="h-12 w-12 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">The Solution</p>
                      <h3 className="text-lg font-bold mt-2 text-[#d4af37] font-display">MoatHero</h3>
                      <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">Scan your domain and top social profiles to enforce consistent messaging, securing your position as the verified source.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
      </section>

      {/* Feature Deep Dive / Problem Section */}
      <section className="py-20 bg-gradient-to-b from-[#050507] to-[#08080a] border-b border-zinc-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">Get full visibility and execution power in under 3 minutes.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Step 1 */}
            <ScrollReveal delay={100}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Compass className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-200">1. Crawl Brand Footprints</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We scan your domain and primary social profiles (LinkedIn, Twitter/X) to extract active bio and metadata messaging.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={250}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Cpu className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-200">2. Compare Semantic Alignment</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Our engine compares your exact profile texts, flagging discrepancies (like 'The Baker' vs 'Bakery') that cause AI confusion.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={400}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-200">3. Measure Share of Voice</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Analyze how consistently your brand intent is represented across your digital moat.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal delay={550}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-200">4. Actionable Corrections</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Get explicit instructions on what profile texts to update, ensuring LLMs have a single, unified source of truth.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why AI Search Engines Only Read Page 1 - The RAG Bottleneck Section */}
      <section className="py-24 bg-[#050507] border-b border-zinc-900/40 relative">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-[#d4af37]/2 blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/5 border-gradient-gilt text-[10px] font-mono font-semibold tracking-widest text-[#d4af37] uppercase">
                <Cpu className="h-3 w-3 text-[#d4af37]" />
                Technical Architecture Explainer
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-serif">
                Why AI Search Engines Hallucinate Brand Data
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                To understand why LLMs often invent or misrepresent your brand services, we have to look at how Retrieval-Augmented Generation (RAG) resolves conflicting citations.
              </p>
            </div>
          </ScrollReveal>

          {/* 2x2 Interactive/Visual Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Step 1 */}
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <MessageSquare className="h-20 w-24 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-200">The Entity Extraction Process</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                      When a user asks an AI about your company, the LLM searches the web for your entity. It pulls down your website, your social profiles, and third-party directories.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <Zap className="h-20 w-24 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center shrink-0">
                        <Zap className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-200">The Conflict Resolution Bottleneck</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                      If your LinkedIn says "B2B SaaS Analytics" but your Twitter says "Marketing Agency", the LLM faces a semantic conflict. It must resolve this in milliseconds to generate an answer.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={300} className="h-full">
              <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <Layers className="h-20 w-24 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center shrink-0">
                        <Layers className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-200">The Fallback to Generic Assumptions</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                      When confronted with conflicting entity signals, LLMs discard the nuanced specifics and regress to the mean. They will output a generic, often inaccurate summary of your brand rather than risk a highly specific error.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal delay={400} className="h-full">
              <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.08] h-full group">
                <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <CheckCircle2 className="h-20 w-24 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-200">Brand Consensus Verification</h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                      By ensuring every primary profile uses the exact same semantic phrasing, you force the AI to recognize a definitive, unified source of truth, eliminating hallucinations.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hard-hitting closing card */}
          <ScrollReveal delay={450}>
            <div className="bg-gradient-to-r from-red-500/5 to-amber-500/5 border border-red-500/20 p-1.5 rounded-2xl max-w-3xl mx-auto">
              <div className="bg-[#0c0c0f]/90 rounded-[calc(1rem-0.125rem)] p-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-center gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-500 animate-pulse shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-zinc-200 text-left leading-relaxed">
                  This is why if your website (or a positive forum mention of your brand) does not rank on Page 1, <span className="text-amber-500">it simply does not exist to the AI</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Illustrative telemetry examples */}
      <section className="py-24 bg-gradient-to-b from-[#08080a] to-[#050507] border-b border-zinc-900/40 relative">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/5 border-gradient-gilt text-[10px] font-mono font-semibold tracking-widest text-[#d4af37] uppercase">
                <Globe className="h-3 w-3 animate-spin text-[#d4af37]" style={{ animationDuration: '6s' }} />
                Moat Telemetry Examples
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Example Ranking Movement</h2>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                Illustrative before-and-after metrics showing the signals MoatHero tracks after an audit.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudiesToRender.map((study, idx) => {
              return (
                <ScrollReveal key={study.id} delay={idx * 150} className="h-full">
                  {/* Double-Bezel Card Frame */}
                  <div className="bg-white/[0.012] border border-white/[0.03] p-1.5 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-[#d4af37]/20 h-full group">
                    {/* Inner Concentric Core */}
                    <div className="bg-[#0c0c0f]/95 rounded-[calc(2rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full relative overflow-hidden flex flex-col justify-between text-left">
                      <div className="absolute top-0 right-0 bg-[#d4af37]/3 h-24 w-24 rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest font-bold">Case Study</p>
                            <p className="text-xs text-zinc-400 font-mono mt-0.5">{study.maskedDomain}</p>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 group-hover:border-[#d4af37]/40 transition-colors">
                            <span className="text-[10px] text-[#d4af37] font-bold">↗</span>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-zinc-200 line-clamp-2 mt-2 group-hover:text-white transition-colors">
                          "{study.query}"
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-zinc-900/60 mt-4">
                        <div>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Position Shift</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-zinc-500 font-mono text-xs">#{study.baselinePosition}</span>
                            <span className="text-zinc-600 text-[10px]">➔</span>
                            <span className="text-[#d4af37] font-mono text-sm font-bold">#{study.currentPosition}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Base CTR</p>
                          <p className="text-xs font-mono font-bold text-[#d4af37] mt-0.5">
                            +{study.ctrIncrease.toFixed(1)}% CTR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="py-24 bg-[#050507]">
        <ScrollReveal>
          <div className="max-w-xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight">Stop Diluting Your Brand Authority</h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Take control of your digital footprint. Ensure your messaging is semantically consistent so LLMs cite you correctly.
            </p>

            {/* Glowing Double Bezel Demo Container */}
            <div className="bg-white/[0.015] border-gradient-gilt p-1.5 rounded-[2.5rem] shadow-2xl relative overflow-hidden max-w-md mx-auto">
              <div className="bg-[#0c0c0f]/95 rounded-[calc(2.5rem-0.375rem)] p-8 space-y-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#d4af37]/10 to-transparent h-32 w-32 rounded-full blur-2xl pointer-events-none" />
                
                <p className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em] font-bold">Build Week Demo</p>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white">Audit your AI search presence</h3>
                  <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">Explore brand consensus, citation signals, social alignment, and JSON-LD schema recommendations.</p>
                </div>

                <button
                  onClick={onTriggerSignup}
                  className="w-full group relative flex items-center justify-between pl-6 pr-2 py-2.5 bg-gradient-to-r from-[#b87333] to-[#d4af37] hover:from-[#c98444] hover:to-[#e5c048] text-black font-bold text-sm rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-lg shadow-[#d4af37]/5"
                >
                  <span className="tracking-wide">Open MoatHero Demo</span>
                  <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center ml-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-black/20 group-hover:scale-105">
                    <ArrowRight className="h-4 w-4 text-black stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-t border-white/5 bg-[#050507] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#d4af37]/2 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Frequently Asked Questions</h2>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Answers to common questions about Google credentials, safety, and integration setups.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = !!openFaqs[idx];
                return (
                  <div key={idx} className="bg-[#0c0c0f]/60 border border-zinc-800/40 rounded-2xl overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-zinc-900/10 transition-colors select-none focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-[#d4af37]/30"
                    >
                      <span className="text-sm font-bold text-zinc-200">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-[#d4af37] shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 ml-4" />
                      )}
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-48 border-t border-zinc-900/50' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 text-xs text-zinc-400 leading-relaxed font-sans bg-black/[0.15]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
