
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FastGallery from './components/FastGallery';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'info' | 'portfolio' | 'selected' | 'privacy'>('home');
  const [showCredits, setShowCredits] = useState(false);

  // Gestore navigazione: cambia vista e chiude i credits
  const handleNavigate = (view: 'home' | 'info' | 'portfolio' | 'selected' | 'privacy') => {
    setActiveView(view);
    setShowCredits(false);
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full flex flex-col bg-white overflow-hidden">
      <Navbar onNavigate={handleNavigate} activeView={activeView} />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden min-h-0">
        {activeView === 'home' && <FastGallery />}
        
        {activeView !== 'home' && (
          <Overlay 
            type={activeView} 
            onClose={() => handleNavigate('home')} 
          />
        )}
      </main>

      <footer className="w-full flex flex-col bg-white z-50 shrink-0">
        <div className="w-full border-t border-black"></div>
        <div className="py-4 md:py-5 px-6 md:px-8 flex justify-between items-end">
          {/* Sezione Credits e Privacy in basso a sinistra con chiusura automatica */}
          <div className="flex flex-col items-start">
            {showCredits && (
              <div className="flex flex-col text-[7px] uppercase tracking-[0.2em] mb-3 space-y-1 opacity-60 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span>Stefano Guglielmi</span>
                <span>Chiara Meoli</span>
                <span>PAF accademia</span>
                <span>Quarta Area</span>
                <span>Gelateria dei Mille</span>
              </div>
            )}
            <div className="flex gap-4 md:gap-6">
              <button 
                onClick={() => setShowCredits(!showCredits)}
                className="text-[9px] uppercase tracking-[0.3em] font-bold hover:line-through transition-all focus:outline-none"
              >
                {showCredits ? 'Close' : 'Credits'}
              </button>
              <button 
                onClick={() => handleNavigate('privacy')}
                className="text-[9px] uppercase tracking-[0.3em] font-bold hover:line-through transition-all focus:outline-none"
              >
                Privacy
              </button>
            </div>
          </div>

          {/* Nome a destra */}
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-black select-none pointer-events-none text-right">
            gabriele cananzi
          </span>
        </div>
        <div className="w-full border-t border-black mb-2 md:mb-3"></div>
      </footer>
    </div>
  );
};

export default App;
