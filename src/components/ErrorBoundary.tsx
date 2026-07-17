import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error caught by MoatHero ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('moathero_is_authenticated');
      sessionStorage.clear();
      window.location.href = '/';
    } catch (e) {
      window.location.reload();
    }
  };

  private handleCopy = () => {
    const { error, errorInfo } = this.state;
    const reportText = `MoatHero Beta Crash Report:
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}`;

    navigator.clipboard.writeText(reportText).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-[#fdfbf7] flex items-center justify-center p-6 font-sans select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-[#b87333]/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0e] p-6 shadow-2xl md:p-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b87333] to-[#d4af37]" />

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-7 w-7 text-amber-500" />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-[#fdfbf7] mb-2">
                Beta Recovery Mode Active
              </h2>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                MoatHero encountered an unexpected issue. Don't worry, your data baseline is safe. Let's recover.
              </p>
            </div>

            <div className="mb-6 rounded-xl bg-[#050506] border border-zinc-800/80 p-4 font-mono text-left">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800/40 text-[10px] font-bold text-zinc-500 tracking-wider">
                <span>ERROR LOG</span>
                <span className="text-amber-500/80">RECOVERY_ID_98C4D8</span>
              </div>
              <div className="max-h-48 overflow-y-auto text-xs text-red-400 space-y-1.5 scrollbar-thin">
                <p className="font-bold text-red-300">Message: {this.state.error?.message || 'Unknown runtime error'}</p>
                {this.state.error?.stack && (
                  <pre className="text-[10px] text-zinc-500 leading-relaxed whitespace-pre-wrap select-text">
                    {this.state.error.stack.split('\n').slice(0, 3).join('\n')}
                  </pre>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-lg text-black font-bold text-sm bg-gradient-to-r from-[#b87333] to-[#d4af37] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#d4af37]/5"
              >
                <RotateCcw className="h-4 w-4" />
                Reset & Reload Page
              </button>
              
              <button
                onClick={this.handleCopy}
                className="py-3 px-4 rounded-lg border border-zinc-800 bg-[#121214] text-[#fdfbf7] hover:bg-zinc-800/30 font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                {this.state.copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-400" />
                    <span>Copy Error Logs</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-zinc-600 text-center mt-6">
              MoatHero Platform Engine Beta. Please report this traceback to support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
