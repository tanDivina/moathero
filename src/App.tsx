import React, { useState, useEffect } from 'react';
import MoatHero from './components/MoatHero';
import SignupModal from './components/SignupModal';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import LandingPage from './components/LandingPage';
import { getSharedCookie } from './utils/cookies';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cookieAuth = getSharedCookie('rankbeacon_is_authenticated') === 'true';
    const localAuth = localStorage.getItem('moathero_is_authenticated') === 'true';
    return cookieAuth || localAuth;
  });
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userEmail, setUserEmail] = useState(() => {
    const cookieEmail = getSharedCookie('rankbeacon_user_email');
    const localEmail = localStorage.getItem('moathero_user_email') || '';
    return cookieEmail || localEmail;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'privacy'>(() => {
    const path = window.location.pathname;
    if (path === '/privacy') return 'privacy';
    return 'home';
  });

  // Synchronize cookie auth to localStorage to ensure local states are unified
  useEffect(() => {
    const cookieAuth = getSharedCookie('rankbeacon_is_authenticated') === 'true';
    const cookieEmail = getSharedCookie('rankbeacon_user_email');
    if (cookieAuth && cookieEmail) {
      localStorage.setItem('moathero_is_authenticated', 'true');
      localStorage.setItem('moathero_user_email', cookieEmail);
      setIsAuthenticated(true);
      setUserEmail(cookieEmail);
    }
  }, []);

  // Self-healing: Unregister active service workers and clear cache storage from previous projects
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((boolean) => {
            console.log('Orphaned Service Worker unregistered successfully:', boolean);
            if (boolean) {
              window.location.reload();
            }
          });
        }
      });
    }
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name).then((success) => {
            console.log('Persistent Cache Storage cleared in App mount:', name, success);
          });
        }
      });
    }
  }, []);

  // Intercept GSC redirect parameters
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token=') && hash.includes('state=gsc_link')) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('gsc_access_token', token);
        
        // Redirect to / while cleanly dropping hash parameters from the address bar
        window.history.replaceState({}, document.title, '/');
        // Instantly reload to let app initialize with the GSC token
        window.location.reload();
      }
    }
  }, []);

  // Simple, ultra-clean zero-dependency routing popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') setView('privacy');
      else setView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept all '/privacy' link clicks globally for instantaneous buttery-smooth SPA navigation
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href === '/privacy') {
          e.preventDefault();
          window.history.pushState({}, '', '/privacy');
          setView('privacy');
          window.scrollTo(0, 0);
        } else if (href === '/' || href === '#') {
          // Allow routing back home
          const isSpecialRoute = window.location.pathname !== '/';
          if (isSpecialRoute) {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            setView('home');
            window.scrollTo(0, 0);
          }
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleSignupSuccess = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setView('home');
    window.scrollTo(0, 0);
  };

  if (view === 'privacy') {
    return (
      <ErrorBoundary>
        <PrivacyPolicy onNavigateHome={handleNavigateHome} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#09090b] text-[#fdfbf7] flex flex-col justify-between">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isAuthenticated={isAuthenticated}
          onTriggerSignup={() => setShowSignupModal(true)}
        />
        
        <main className="flex-grow flex flex-col pt-16">
          {!isAuthenticated ? (
            <LandingPage 
              onTriggerSignup={() => setShowSignupModal(true)}
              onTriggerLogin={() => setShowSignupModal(true)}
            />
          ) : (
            <div id="dashboard" className="flex-grow flex flex-col mt-4">
              <MoatHero />
            </div>
          )}
        </main>
        
        <Footer />
        
        <SignupModal 
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleSignupSuccess}
          brandName="MoatHero"
        />
      </div>
    </ErrorBoundary>
  );
}
