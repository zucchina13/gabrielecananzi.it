
import React, { useState, useEffect } from 'react';

/**
 * Endpoint stabile per visualizzare immagini da Google Drive
 */
const getDirectLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const IMAGE_IDS = [
  '1Fip1JLKaBc8V0_oKUdsTkjeTLVoSEBey',
  '1RFJ-oZGWL4-ZWqqcS3SBt9bxDDX0MQDg',
  '11k1WL8b0GEqncyASDGguiRmMIDcttGYn',
  '16kOv1tshTOEvRigVZn7e0T46vMhqRz_K',
  '1aM7qVJzk9f1WkJhYwD6j10n3EE5tea_g',
  '1JGu6qvCmXQ3JKu_dfi-KVUZekV046kbH',
  '1nMLRtiGRCFaFISiNJ13aVlNHBZZA2y2k',
  '1v729JdjBxrNJeNGGF2gNzhlVtNrk_Iep',
  '1MSSAAhz2n4-NY0jCe7h20RMu7iIBr6wQ',
  '1hoN44ol6uFqMnmhFe6Yz0iTIDXO5hYnA',
  '1kII76n9O1v0db8FsSP-IWadrIFU8j2ja',
  '1mOClJ3G3eAcB7a-YXr3hSG5Gs1a-hjPj',
  '1mP6AoB_HYLkiTCs7fwfebA1iZIZO1KXo'
];

const FastGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (IMAGE_IDS.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGE_IDS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (IMAGE_IDS.length === 0) {
    return (
      <div className="text-[10px] uppercase tracking-widest opacity-30">
        Nessuna immagine trovata.
      </div>
    );
  }

  const nextIndex = (currentIndex + 1) % IMAGE_IDS.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
        {/* Immagine Attuale */}
        <img 
          src={getDirectLink(IMAGE_IDS[currentIndex])} 
          alt="Photography Portfolio" 
          className="w-full h-full object-contain select-none pointer-events-none"
        />
        
        {/* Pre-caricamento invisibile dell'immagine successiva */}
        <img 
          src={getDirectLink(IMAGE_IDS[nextIndex])} 
          alt="preload"
          className="hidden" 
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default FastGallery;
