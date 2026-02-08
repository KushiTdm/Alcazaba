import { useState, useEffect, useRef } from 'react';
import { Clock, Check, ArrowRight, Waves } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import TourDetail from '../pages/Tourdetail';

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <>
      <section ref={sectionRef} id="tours" className="py-24 bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C28E5E]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1A2F4B]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-2 rounded-full shadow-md mb-6">
              <Waves className="text-[#C28E5E]" size={20} />
              <span className="font-['Lato'] text-[#1A2F4B] font-semibold">EXPERIENCIAS</span>
            </div>
            
            <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-[#1A2F4B] mb-6">
              Tours y Aventuras
            </h2>
            
            <p className="font-['Lato'] text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la magia del Parque Nacional Machalilla con nuestros tours recomendados. Experiencias únicas que te conectarán con la naturaleza.
            </p>
          </div>

          <div className="space-y-8">
            {hotelData.tours.map((tour, index) => {
              const delay = index * 200;
              return (
                <div
                  key={tour.id}
                  onClick={() => setSelectedTour(tour.id)}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-1 ${
                    index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
                  } ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative`}>
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                          <div className="flex items-center space-x-2 text-white">
                            <span className="font-['Lato'] font-semibold text-lg">Explorar este tour</span>
                            <ArrowRight size={24} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="space-y-6">
                        
                        {tour.season && (
                          <div className="inline-flex items-center space-x-2 bg-[#C28E5E] text-white px-4 py-2 rounded-full">
                            <span className="font-['Lato'] font-semibold">{tour.season}</span>
                          </div>
                        )}

                        <div>
                          <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#1A2F4B] mb-3">
                            {tour.name}
                          </h3>

                          {tour.subtitle && (
                            <p className="font-['Lato'] text-xl text-[#C28E5E] font-semibold italic mb-4">
                              {tour.subtitle}
                            </p>
                          )}

                          <p className="font-['Lato'] text-gray-600 leading-relaxed text-lg">
                            {tour.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 text-[#1A2F4B]">
                          <Clock size={20} className="text-[#C28E5E]" />
                          <span className="font-['Lato'] font-semibold">{tour.duration}</span>
                        </div>

                        {/* Included items - show first 3 */}
                        <div className="space-y-2">
                          <p className="font-['Lato'] font-semibold text-[#1A2F4B] text-sm">Incluye:</p>
                          {tour.included.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Check size={18} className="text-[#C28E5E] flex-shrink-0" />
                              <span className="font-['Lato'] text-gray-700">{item}</span>
                            </div>
                          ))}
                          {tour.included.length > 3 && (
                            <p className="font-['Lato'] text-xs text-[#C28E5E] font-medium ml-6">
                              +{tour.included.length - 3} servicios más incluidos
                            </p>
                          )}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTour(tour.id);
                            }}
                            className="bg-[#1A2F4B] text-white px-8 py-3 rounded-full font-['Lato'] font-semibold hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105 flex items-center space-x-2"
                          >
                            <span>Más Información</span>
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Info */}
          <div className={`mt-16 bg-gradient-to-r from-[#1A2F4B] to-[#243A56] rounded-3xl p-8 sm:p-12 text-white shadow-2xl transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold">
                ¿Necesitas ayuda para elegir?
              </h3>
              <p className="font-['Lato'] text-xl text-white/90">
                Nuestros anfitriones conocen perfectamente la región y te ayudarán a planificar la experiencia perfecta según tus intereses.
              </p>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito ayuda para elegir el mejor tour según mis intereses')}`,
                    '_blank'
                  );
                }}
                className="bg-[#C28E5E] text-white px-10 py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                CONSULTAR POR WHATSAPP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetail 
          tourId={selectedTour} 
          onClose={() => setSelectedTour(null)} 
        />
      )}
    </>
  );
}