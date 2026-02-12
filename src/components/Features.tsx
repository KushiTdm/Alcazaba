import { useEffect, useRef, useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
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

        {/* Grid Layout */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {hotelData.usp.map((feature, index) => {
              const delay = index * 150;
              const featureTitle = tr(feature.title, lang);
              const featureDescription = tr(feature.description, lang);

              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full ${
                    isVisible ? `opacity-100 translate-y-0 animate-fadeInUp` : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
                >
                  {/* Inner container */}
                  <div className="bg-white rounded-[20px] sm:rounded-[26px] overflow-hidden h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                      <img
                        src={feature.image}
                        alt={featureTitle}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/90 via-[#1A2F4B]/40 to-transparent"></div>
                      
                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                          {featureTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 lg:p-8 flex flex-col">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed flex-grow">
                        {featureDescription}
                      </p>

                      <div className="pt-4 mt-auto">
                        <div className="w-12 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full group-hover:w-20 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </section>
  );
}