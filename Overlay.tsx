
import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  location: string;
  images: string[];
}

/**
 * Endpoint stabile per visualizzare immagini da Google Drive
 */
const getDirectLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

/**
 * ---------------------------------------------------------
 * CONFIGURAZIONE LINK PORTFOLIO PDF
 * ---------------------------------------------------------
 */
const PORTFOLIO_PDF_URL = 'https://drive.google.com/uc?export=download&id=1du4gQkF-xZaoKQwsO7WuoJA74eBoNZnE';

const PROJECT_DATA: Record<string, Project> = {
  'quarta': {
    id: 'quarta',
    title: 'Quarta Area',
    location: 'Altamura',
    images: [
      '13O1syz_WD4Gg_JDL-CGn9fJr2u4EIObx',
      '1sZlogTXNGWqIf-SlI9fqMq_69Q27nZ0v',
      '15Tl2q9r0Z6AIfU5TlxyXlLLRjOAjMuAw',
      '14pYeaDPaHqyJFzTrgQ39WLW9pPJxM3PQ',
      '1MJCXksJvVAS2sGt5f1KDCN_tpRNxN-PD'
    ]
  },
  'portrait': {
    id: 'portrait',
    title: 'Portrait',
    location: 'Altamura',
    images: [
      '1dTn1Cw54m5lHJ_LFDDECZyB6Q0c6vQaK',
      '1dHCdov_i5tbxqJ7JsUBbyh_n6wqrBWkv',
      '1EovH_1BDzM6p-GyTbH4NgeZtOtYEZgOU',
      '10Mfqi_ucBcRU01XLFMVpXxEpvI4NYR-E'
    ]
  },
  'gelateria': {
    id: 'gelateria',
    title: 'Gelateria dei Mille',
    location: 'Altamura',
    images: [
      '1W3WjSfXb2hciGTa2sszcTz5Yrp6c-cqI',
      '1Hypw22QM7OrpslJ4Bmu66oPYBejIMfHH',
      '1qE-F9C-1aWURcyKb1WA0DXynR_Q9xQxn',
      '1IELbK4NguM-qxMlKrUOWoLpFPvZ-7FUt'
    ]
  }
};

const CURSOR_LEFT = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12 L8 21 L19 30 M9 21 L34 19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>') 20 20, auto`;
const CURSOR_RIGHT = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12 L32 21 L21 30 M31 21 L6 19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>') 20 20, auto`;

interface OverlayProps {
  type: 'info' | 'portfolio' | 'selected' | 'privacy';
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ type, onClose }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [cursorSide, setCursorSide] = useState<'left' | 'right'>('right');

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    setCursorSide(clientX < innerWidth / 2 ? 'left' : 'right');
  };

  const navigateGallery = (e: React.MouseEvent) => {
    if (!selectedProjectId) return;
    const project = PROJECT_DATA[selectedProjectId];
    if (cursorSide === 'right') {
      setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
    } else {
      setCurrentImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const closeProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProjectId(null);
    setCurrentImageIdx(0);
  };

  const getContent = () => {
    if (type === 'selected' && selectedProjectId) {
      const project = PROJECT_DATA[selectedProjectId];
      const nextIdx = (currentImageIdx + 1) % project.images.length;
      const prevIdx = (currentImageIdx - 1 + project.images.length) % project.images.length;

      return (
        <div 
          className="w-full h-full relative bg-white overflow-hidden"
          onMouseMove={handleMouseMove}
          onClick={navigateGallery}
          style={{ cursor: cursorSide === 'left' ? CURSOR_LEFT : CURSOR_RIGHT }}
        >
          <div className="absolute top-6 left-8 right-8 flex justify-between items-baseline z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">{project.title}</h2>
              <p className="text-[9px] uppercase tracking-widest opacity-50">{project.location}</p>
            </div>
            <button 
              onClick={closeProject}
              className="pointer-events-auto text-[9px] uppercase tracking-[0.2em] hover:line-through cursor-pointer bg-white px-1"
            >
              Back to list
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center p-2 md:p-4 pointer-events-none relative">
            {/* Immagine Attuale */}
            <img 
              key={`${project.id}-${currentImageIdx}`}
              src={getDirectLink(project.images[currentImageIdx])} 
              alt={project.title}
              className="w-full h-full object-contain select-none"
            />
            
            {/* Pre-caricamento immagini adiacenti */}
            <img src={getDirectLink(project.images[nextIdx])} className="hidden" aria-hidden="true" alt="preload" />
            <img src={getDirectLink(project.images[prevIdx])} className="hidden" aria-hidden="true" alt="preload" />
          </div>
        </div>
      );
    }

    switch(type) {
      case 'info':
        return (
          <div className="w-full h-full flex flex-col px-8">
            <div className="pt-8">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Info</h2>
            </div>
            <div className="flex-grow flex flex-col justify-center items-start">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em]">Based in Altamura</p>
                <p className="text-xs uppercase tracking-[0.2em]">
                  Instagram <a href="https://www.instagram.com/weird._.photographer?igsh=ZWw1YzUwZjB4NDNy" target="_blank" rel="noopener noreferrer" className="hover:line-through transition-all">weird._.photographer</a>
                </p>
              </div>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="w-full h-full flex flex-col px-8">
            <div className="pt-8">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Portfolio</h2>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
              <a 
                href={PORTFOLIO_PDF_URL} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.3em] hover:line-through transition-all border-b border-black pb-1"
              >
                Download Portfolio
              </a>
            </div>
          </div>
        );
      case 'selected':
        return (
          <div className="w-full h-full flex flex-col px-8">
             <div className="pt-8">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Selected Works</h2>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="max-w-2xl w-full">
                <div className="space-y-6">
                  {Object.values(PROJECT_DATA).map((work) => (
                    <div 
                      key={work.id} 
                      className="group flex justify-between items-center border-b border-black/10 py-3 cursor-pointer hover:border-black transition-all"
                      onClick={() => setSelectedProjectId(work.id)}
                    >
                      <span className="text-sm md:text-base uppercase tracking-widest group-hover:pl-2 transition-all duration-300">
                        {work.title}
                      </span>
                      <span className="text-[8px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-100 transition-opacity">
                        {work.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="w-full h-full flex flex-col px-8 overflow-y-auto">
            <div className="pt-8 mb-12">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Informativa Privacy (Art. 13 GDPR)</h2>
            </div>
            <div className="max-w-xl flex flex-col gap-8 pb-20">
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Titolare del Trattamento</h3>
                <p className="text-[11px] uppercase tracking-wider leading-relaxed opacity-70">
                  Giuseppe Cananzi
                </p>
              </section>
              
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Dati Trattati e Cookie</h3>
                <p className="text-[11px] uppercase tracking-wider leading-relaxed opacity-70">
                  Si dichiara esplicitamente che questo sito web non utilizza cookie di alcun tipo (tecnici, analitici o di profilazione) né tecnologie di tracciamento simili. Non vengono raccolti, memorizzati o trattati dati personali degli utenti durante la semplice navigazione sul sito.
                </p>
              </section>

              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Finalità</h3>
                <p className="text-[11px] uppercase tracking-wider leading-relaxed opacity-70">
                  L'unico scopo di questo sito è la presentazione del portfolio professionale e artistico di Gabriele Cananzi a scopo puramente informativo e illustrativo delle proprie opere fotografiche.
                </p>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-40 flex flex-col">
      {!selectedProjectId && (
        <button 
          onClick={onClose}
          className="fixed top-[4.5rem] right-8 text-[9px] uppercase tracking-widest border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all z-50 bg-white"
        >
          Close
        </button>
      )}
      {getContent()}
    </div>
  );
};

export default Overlay;
