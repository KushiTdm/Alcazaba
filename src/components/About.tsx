import { useEffect, useRef, useState } from 'react';
import { Heart, Users, Home, Smile } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import hotelData from '../data/hotelData.json';

export default function About() {
  const { t } = useTranslation();
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

  const values = [
    {
      icon: Heart,
      title: t('about.value1Title'),
      description: t('about.value1Desc')
    },
    {
      icon: Home,
      title: t('about.value2Title'),
      description: t('about.value2Desc')
    },
    {
      icon: Users,
      title: t('about.value3Title'),
      description: t('about.value3Desc')
    },
    {
      icon: Smile,
      title: t('about.value4Title'),
      description: t('about.value4Desc')
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C28E5E]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A2F4B]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-block bg-[#F9F7F2] px-4 sm:px-6 py-2 rounded-full mb-6">
            <span className="font-['Lato'] text-[#C28E5E] font-semibold text-sm sm:text-base">{t('about.subtitle')}</span>
          </div>
          
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2F4B] mb-3 sm:mb-4">
            {t('about.title')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full mx-auto mb-6"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left - Photo & Names */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Photo Circle with Gradient Border */}
              <div className="relative inline-block mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C28E5E] via-[#D4A574] to-[#1A2F4B] rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] rounded-full p-1.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img
                        src="/images/About.webp"
                        alt="María y Oswaldo - Propietarios Hostal Alcazaba Puerto López"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Names Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 bg-white px-6 sm:px-8 py-4 rounded-2xl shadow-2xl border-2 border-[#C28E5E]/20">
                <p className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#1A2F4B] text-center lg:text-left">
                  {t('about.hosts')}
                </p>
                <p className="font-['Lato'] text-sm sm:text-base text-[#C28E5E] font-medium text-center lg:text-left">
                  {t('about.role')}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Story */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-[#F9F7F2] to-white p-6 sm:p-8 rounded-3xl border-2 border-[#C28E5E]/10 shadow-lg">
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-[#C28E5E] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#1A2F4B] mb-2">
                    {t('about.missionTitle')}
                  </h3>
                  <div className="w-12 h-1 bg-[#C28E5E] rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4 font-['Lato'] text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t('about.paragraph1')}</p>
                <p>{t('about.paragraph2')}</p>
                <p>{t('about.paragraph3')}</p>
              </div>

              {/* Quote */}
              <div className="mt-6 pt-6 border-t-2 border-[#C28E5E]/20">
                <p className="font-['Playfair_Display'] text-xl sm:text-2xl italic text-[#1A2F4B] text-center">
                  "{t('about.quote')}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#1A2F4B] text-center mb-8 sm:mb-12">
            {t('about.valuesTitle')}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#C28E5E]/30 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  <h4 className="font-['Lato'] text-lg font-bold text-[#1A2F4B] mb-3">
                    {value.title}
                  </h4>
                  
                  <p className="font-['Lato'] text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-12 sm:mt-16 bg-gradient-to-r from-[#1A2F4B] to-[#C28E5E] rounded-3xl p-8 sm:p-12 text-white shadow-2xl text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t('about.ctaTitle')}
          </h3>
          <p className="font-['Lato'] text-base sm:text-lg md:text-xl opacity-95 mb-6 max-w-3xl mx-auto">
            {t('about.ctaSubtitle')}
          </p>
          <button
            onClick={() => {
              window.open(
                `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola María y Oswaldo! Me encantaría conocer más sobre el Hostal Alcazaba y vivir la experiencia familiar que ofrecen. ¿Podrían contarme más sobre su hospitalidad?')}`,
                '_blank'
              );
            }}
            className="inline-block bg-white text-[#1A2F4B] px-8 sm:px-10 py-3 sm:py-4 rounded-full font-['Lato'] font-bold text-base sm:text-lg hover:bg-[#F9F7F2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {t('about.ctaButton')}
          </button>
        </div>
      </div>
    </section>
  );
}