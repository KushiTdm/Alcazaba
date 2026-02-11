import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

   
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
        
        handleVideoEnd();
      });
    }

    // Gérer la fin de la vidéo
    const handleEnded = () => {
      handleVideoEnd();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsFading(true);
    
    // Attendre la fin de l'animation fade-out avant de masquer complètement
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000); // Durée de l'animation fade-out
  };

  const handleSkip = () => {
    handleVideoEnd();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Vidéo en plein écran */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-label="Timelapse vue panoramique depuis le mirador Hostal Alcazaba Puerto López Ecuador"
        title="Vue panoramique océan Pacifique - Hostal Alcazaba"
        poster="/images/hero-mirador.webp" 
      >
        <source src="/videos/hero-timelipse.mp4" type="video/mp4" />
        <track kind="descriptions" src="/videos/hero-timelipse-desc.vtt" srclang="es" label="Español" />
      </video>
     
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>

      {/* Bouton Skip - Apparaît après 1 seconde */}
      <button
        onClick={handleSkip}
        className={`absolute bottom-8 right-8 z-10 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 group animate-fadeIn`}
        style={{ animationDelay: '1s' }}
      >
        <span className="font-['Lato'] font-medium">Passer l'intro</span>
        <ChevronDown 
          size={20} 
          className="transform rotate-[-90deg] group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* Logo/Texte optionnel qui apparaît pendant la vidéo */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white animate-fadeIn"
        style={{ animationDelay: '0.5s' }}
      >
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
          Hostal Alcazaba
        </h1>
        <p className="font-['Lato'] text-xl sm:text-2xl md:text-3xl text-[#C28E5E] italic drop-shadow-lg">
          Tu experiencia está garantizada
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}