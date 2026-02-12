import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import hotelData from '../data/hotelData.json';
import { useTranslation } from '../hooks/useTranslation';

export default function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % hotelData.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + hotelData.testimonials.length) % hotelData.testimonials.length);
  };

  const googleLogo = (
    <svg viewBox="0 0 48 48" className="w-8 h-8">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  );

  return (
    <section ref={sectionRef} id="testimonios" className="py-24 bg-gradient-to-br from-[#1A2F4B] via-[#243A56] to-[#1A2F4B] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C28E5E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C28E5E]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
            {googleLogo}
            <span className="text-white font-['Lato'] font-semibold text-lg">
              Google Reviews
            </span>
          </div>

          <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-white mb-6">
            {t('testimonials.title')}
          </h2>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={32} 
                  className="text-[#C28E5E]" 
                  fill={i < Math.floor(hotelData.googleReviews.rating) ? "#C28E5E" : "none"}
                />
              ))}
            </div>
            <span className="font-['Lato'] text-4xl font-bold text-white">
              {hotelData.googleReviews.rating}
            </span>
          </div>
          
          <p className="font-['Lato'] text-xl text-white/80">
            {t('testimonials.basedOn')} {hotelData.googleReviews.totalReviews} {t('testimonials.reviews')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 bg-white/10 backdrop-blur-md text-white w-14 h-14 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 bg-white/10 backdrop-blur-md text-white w-14 h-14 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Featured Testimonial - Large */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 relative hover:bg-white/15 transition-all duration-300">
              <Quote className="absolute top-6 right-6 text-[#C28E5E]/30" size={64} />
              
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C28E5E] to-[#A67347] flex items-center justify-center text-white font-['Playfair_Display'] text-3xl font-bold flex-shrink-0 shadow-xl">
                  {hotelData.testimonials[activeIndex].image}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-['Lato'] text-2xl font-bold text-white mb-1">
                    {hotelData.testimonials[activeIndex].name}
                  </h3>
                  <p className="font-['Lato'] text-[#C28E5E] text-lg">
                    {hotelData.testimonials[activeIndex].country}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-[#C28E5E]" fill="#C28E5E" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="font-['Lato'] text-white text-xl leading-relaxed italic relative z-10">
                "{hotelData.testimonials[activeIndex].text}"
              </p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center space-x-3">
            {hotelData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-12 h-3 bg-[#C28E5E]' 
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-['Lato'] text-white/80 text-lg mb-6">
            {t('testimonials.ctaText')}
          </p>
          <button
            onClick={() => {
              window.open(
                `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
                '_blank'
              );
            }}
            className="bg-[#C28E5E] text-white px-10 py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(194,142,94,0.5)] hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>{t('testimonials.ctaButton')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}