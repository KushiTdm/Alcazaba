import { useState, useEffect, useRef } from 'react';
import { Clock, Check, ArrowRight, Waves } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import TourDetail from '../pages/Tourdetail';
import { useTranslation } from '../hooks/useTranslation';

export default function Tours() {
  const { t } = useTranslation();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hotelData.tours.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hotelData.tours.length) % hotelData.tours.length);
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section ref={sectionRef} id="tours" className="py-16 md:py-24 bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C28E5E]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1A2F4B]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white px-4 md:px-6 py-2 rounded-full shadow-md mb-4 md:mb-6">
              <Waves className="text-[#C28E5E]" size={18} />
              <span className="font-['Lato'] text-[#1A2F4B] font-semibold text-sm md:text-base">{t('tours.subtitle')}</span>
            </div>
            
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2F4B] mb-4 md:mb-6 px-4">
              {t('tours.title')}
            </h2>
            
            <p className="font-['Lato'] text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t('tours.description')}
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {hotelData.tours.map((tour) => (
                  <div key={tour.id} className="w-full flex-shrink-0 px-4">
                    <TourCard tour={tour} onSelect={setSelectedTour} t={t} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
              {hotelData.tours.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex ? 'w-8 h-2 bg-[#C28E5E]' : 'w-2 h-2 bg-gray-300'
                  }`}
                  aria-label={`Ir a tour ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout avec slides alternés */}
          <div className="hidden md:block space-y-8">
            {hotelData.tours.map((tour, index) => {
              const delay = index * 150;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={tour.id}
                  className={`transition-all duration-1000 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${isEven ? '-translate-x-full' : 'translate-x-full'}`
                  }`}
                  style={{ 
                    transitionDelay: `${delay}ms`
                  }}
                >
                  <TourCard tour={tour} onSelect={setSelectedTour} isAlternate={!isEven} t={t} />
                </div>
              );
            })}
          </div>

          <div className={`mt-12 md:mt-16 bg-gradient-to-r from-[#1A2F4B] to-[#243A56] rounded-3xl p-6 md:p-12 text-white shadow-2xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold">
                {t('tours.ctaTitle')}
              </h3>
              <p className="font-['Lato'] text-base md:text-xl text-white/90">
                {t('tours.ctaSubtitle')}
              </p>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito ayuda para elegir el mejor tour según mis intereses')}`,
                    '_blank'
                  );
                }}
                className="bg-[#C28E5E] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-['Lato'] font-bold text-base md:text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {t('tours.ctaButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedTour && (
        <TourDetail tourId={selectedTour} onClose={() => setSelectedTour(null)} />
      )}
    </>
  );
}

// Tour Card Component
interface TourCardProps {
  tour: {
    id: string;
    name: string;
    season?: string;
    subtitle?: string;
    description: string;
    duration: string;
    included: string[];
    image: string;
  };
  onSelect: (id: string) => void;
  isAlternate?: boolean;
  t: (key: string) => string;
}

function TourCard({ tour, onSelect, isAlternate = false, t }: TourCardProps) {
  return (
    <div
      onClick={() => onSelect(tour.id)}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.01] h-full"
    >
      <div className="grid md:grid-cols-2 gap-0 h-full">
        
        <div className={`${isAlternate ? 'md:order-2' : ''} relative`}>
          <div className="aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden min-h-[250px] md:min-h-[400px]">
            <img
              src={tour.image}
              alt={`${tour.name} - Tour en Parque Nacional Machalilla Puerto López Ecuador`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
            
            {tour.season && (
              <div className="absolute top-4 left-4 bg-[#C28E5E] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg">
                <span className="font-['Lato'] font-semibold text-xs md:text-sm">{tour.season}</span>
              </div>
            )}
            
            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 items-end justify-center pb-8">
              <div className="flex items-center space-x-2 text-white">
                <span className="font-['Lato'] font-semibold text-base md:text-lg">{t('tours.exploreText') || 'Explorar este tour'}</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-300 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 md:p-8 lg:p-12 flex flex-col justify-center ${isAlternate ? 'md:order-1' : ''}`}>
          <div className="space-y-4 md:space-y-6">
            
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2F4B] mb-2 md:mb-3 line-clamp-2">
                {tour.name}
              </h3>

              {tour.subtitle && (
                <p className="font-['Lato'] text-lg md:text-xl text-[#C28E5E] font-semibold italic mb-3 md:mb-4 line-clamp-2">
                  {tour.subtitle}
                </p>
              )}

              <p className="font-['Lato'] text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg line-clamp-3 md:line-clamp-none">
                {tour.description}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-[#1A2F4B]">
              <Clock size={18} className="text-[#C28E5E] md:w-5 md:h-5" />
              <span className="font-['Lato'] font-semibold text-sm md:text-base">{tour.duration}</span>
            </div>

            <div className="space-y-2">
              <p className="font-['Lato'] font-semibold text-[#1A2F4B] text-xs md:text-sm">{t('tours.includes')}</p>
              {tour.included.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Check size={16} className="text-[#C28E5E] flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                  <span className="font-['Lato'] text-gray-700 text-sm md:text-base line-clamp-1">{item}</span>
                </div>
              ))}
              {tour.included.length > 3 && (
                <p className="font-['Lato'] text-xs text-[#C28E5E] font-medium ml-6">
                  +{tour.included.length - 3} {t('tours.moreServices')}
                </p>
              )}
            </div>

            <div className="pt-4 md:pt-6 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(tour.id);
                }}
                className="bg-[#1A2F4B] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-['Lato'] font-semibold text-sm md:text-base hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105 flex items-center space-x-2 w-full md:w-auto justify-center"
              >
                <span>{t('tours.moreInfo')}</span>
                <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}