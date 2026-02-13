import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

type Lang = 'es' | 'en' | 'fr';

function tr(field: any, lang: Lang): string {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object') return field[lang] ?? field['es'] ?? '';
  return '';
}

export default function Features() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const lang = language as Lang;

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Infinite carousel setup
  const infiniteFeatures = [...hotelData.usp, ...hotelData.usp, ...hotelData.usp];
  const startIndex = hotelData.usp.length;

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const itemsToShow = isMobile ? 1 : 3;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex === startIndex + hotelData.usp.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
      }, 300);
    } else if (currentIndex === startIndex - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex + hotelData.usp.length - 1);
      }, 300);
    }
  }, [currentIndex, startIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2F4B] mb-3 sm:mb-4">
            {t('features.title')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-0 sm:px-12 mb-12 sm:mb-16">
          {/* Navigation Buttons - Desktop */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#1A2F4B] w-12 h-12 rounded-full shadow-xl hover:bg-[#C28E5E] hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Característica anterior"
              >
                <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#1A2F4B] w-12 h-12 rounded-full shadow-xl hover:bg-[#C28E5E] hover:text-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Siguiente característica"
              >
                <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div 
            className="overflow-hidden pb-8 sm:pb-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {infiniteFeatures.map((feature, index) => {
                const featureTitle = tr(feature.title, lang);
                const featureDescription = tr(feature.description, lang);

                return (
                  <div
                    key={`${feature.id}-${index}`}
                    className={`flex-shrink-0 px-3 pb-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col">
                      
                      {/* Image Container - Hauteur réduite en mobile */}
                      <div className="relative overflow-hidden h-56 sm:h-72 md:h-80 lg:h-96 flex-shrink-0">
                        <img
                          src={feature.image}
                          alt={featureTitle}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/80 via-[#1A2F4B]/20 to-transparent"></div>
                        
                        {/* Title on Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                            {featureTitle}
                          </h3>
                        </div>
                      </div>

                      {/* Content - Padding réduit en mobile */}
                      <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col">
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed flex-grow">
                          {featureDescription}
                        </p>

                        <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-gray-200">
                          <div className="w-16 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full group-hover:w-24 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          {isMobile && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button onClick={prevSlide} className="text-[#1A2F4B] hover:text-[#C28E5E] p-2">
                <ChevronLeft size={24} />
              </button>
              <div className="flex space-x-2">
                {hotelData.usp.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex % hotelData.usp.length
                        ? 'w-8 bg-[#C28E5E]'
                        : 'w-2 bg-[#C28E5E]/30'
                    }`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="text-[#1A2F4B] hover:text-[#C28E5E] p-2">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r from-[#1A2F4B] to-[#C28E5E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold">
              {t('features.cta.title')}
            </h3>
            <p className="text-base sm:text-lg opacity-95 px-2">
              {t('features.cta.subtitle')}
            </p>
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(tr(hotelData.contact.whatsappMessage, lang))}`,
                  '_blank'
                );
              }}
              className="bg-white text-[#1A2F4B] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-['Lato'] font-bold text-base sm:text-lg hover:bg-[#F9F7F2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-block mt-2"
            >
              {t('features.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}