import { useState, useEffect, useRef } from 'react';
import { Users, Check, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import RoomDetail from '../pages/Roomdetail';
import { useTranslation } from '../hooks/useTranslation';

export default function Rooms() {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRef = useRef<HTMLElement>(null);

  // Infinite carousel
  const infiniteRooms = [...hotelData.rooms, ...hotelData.rooms, ...hotelData.rooms];
  const startIndex = hotelData.rooms.length;

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

  const itemsToShow = isMobile ? 1 : 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= infiniteRooms.length - 2) {
        setTimeout(() => setCurrentIndex(startIndex), 300);
        return next;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const previous = prev - 1;
      if (previous < 1) {
        setTimeout(() => setCurrentIndex(startIndex + hotelData.rooms.length - 1), 300);
        return previous;
      }
      return previous;
    });
  };

  const visibleRooms = infiniteRooms.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <>
      <section ref={sectionRef} id="habitaciones" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C28E5E]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A2F4B]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-fadeInUp' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-[#F9F7F2] px-4 sm:px-6 py-2 rounded-full mb-6">
              <span className="font-['Lato'] text-[#C28E5E] font-semibold text-sm sm:text-base">{t('rooms.subtitle')}</span>
            </div>
            
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2F4B] mb-3 sm:mb-4">
              {t('rooms.title')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full mx-auto mb-6"></div>
            
            <p className="font-['Lato'] text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              {t('rooms.description')}
            </p>
          </div>

          {/* Carousel - OPTIMIZED FOR MOBILE */}
          <div className="relative px-0 sm:px-12 mb-8 sm:mb-12">
            {/* Navigation Buttons - Hidden on mobile */}
            {!isMobile && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#1A2F4B] w-12 h-12 rounded-full shadow-xl hover:bg-[#C28E5E] hover:text-white transition-all duration-300 flex items-center justify-center group"
                  aria-label="Habitación anterior"
                >
                  <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#1A2F4B] w-12 h-12 rounded-full shadow-xl hover:bg-[#C28E5E] hover:text-white transition-all duration-300 flex items-center justify-center group"
                  aria-label="Siguiente habitación"
                >
                  <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}

            {/* Carousel Grid */}
            <div className="overflow-hidden">
              <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {visibleRooms.map((room, index) => (
                  <div
                    key={`${room.id}-${currentIndex}-${index}`}
                    className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      onClick={() => setSelectedRoom(room.id)}
                      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 h-full ${
                        room.featured ? 'p-1 bg-gradient-to-br from-[#C28E5E] via-[#D4A574] to-[#C28E5E]' : ''
                      }`}
                    >
                      {/* Inner container */}
                      <div className="bg-white rounded-[20px] sm:rounded-[26px] overflow-hidden h-full flex flex-col">
                        {room.featured && (
                          <div className="absolute top-4 right-4 z-10 bg-[#C28E5E] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center space-x-1 shadow-lg">
                            <Star size={14} fill="white" />
                            <span className="font-['Lato'] font-semibold text-xs sm:text-sm">{t('rooms.featured')}</span>
                          </div>
                        )}

                        {/* Image */}
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={room.image}
                            alt={room.type}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4 sm:pb-6">
                            <div className="flex items-center space-x-2 text-white">
                              <span className="font-['Lato'] font-semibold text-sm sm:text-base">{t('rooms.viewDetails')}</span>
                              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col">
                          <div>
                            <h3 className="font-['Playfair_Display'] text-lg sm:text-xl font-bold text-[#1A2F4B] mb-1 sm:mb-2">
                              {room.type}
                            </h3>
                            <div className="flex items-center space-x-2 text-gray-600 mb-2">
                              <Users size={16} className="text-[#C28E5E]" />
                              <span className="font-['Lato'] font-medium text-sm">{room.capacity}</span>
                            </div>
                            <p className="font-['Lato'] text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                              {room.description}
                            </p>
                          </div>

                          {/* Amenities - 2-3 max */}
                          <div className="space-y-1.5">
                            {room.amenities.slice(0, 2).map((amenity, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <Check size={14} className="text-[#C28E5E] flex-shrink-0" />
                                <span className="font-['Lato'] text-xs sm:text-sm text-gray-700">{amenity}</span>
                              </div>
                            ))}
                            {room.amenities.length > 2 && (
                              <p className="font-['Lato'] text-xs text-[#C28E5E] font-medium">
                                +{room.amenities.length - 2} {t('rooms.moreAmenities')}
                              </p>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="pt-3 sm:pt-4 border-t border-gray-200 mt-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room.id);
                              }}
                              className="w-full bg-[#1A2F4B] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-['Lato'] font-semibold text-xs sm:text-sm hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105 min-h-[40px] sm:min-h-auto"
                            >
                              {t('rooms.seeMore')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile navigation dots */}
            {isMobile && (
              <div className="flex items-center justify-center space-x-2 mt-6">
                <button onClick={prevSlide} className="text-[#1A2F4B] hover:text-[#C28E5E] p-2">
                  <ChevronLeft size={24} />
                </button>
                <div className="flex space-x-2">
                  {hotelData.rooms.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex % hotelData.rooms.length
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

          {/* Bottom CTA */}
          <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="font-['Lato'] text-gray-600 text-sm sm:text-base mb-4">
              {t('rooms.notFound')}
            </p>
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito información sobre las habitaciones disponibles')}`,
                  '_blank'
                );
              }}
              className="bg-[#C28E5E] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-block"
            >
              {t('rooms.checkAvailability')}
            </button>
          </div>
        </div>
      </section>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomDetail 
          roomId={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </>
  );
}

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);