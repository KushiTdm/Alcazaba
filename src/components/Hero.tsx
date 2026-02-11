import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import hotelData from '../data/hotelData.json';

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = false }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [startAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > window.innerHeight * 0.7);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          showNavbar 
            ? 'translate-y-0 opacity-100 bg-[#1A2F4B]/95 backdrop-blur-md shadow-2xl' 
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <a 
              href="#inicio" 
              className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-white leading-tight flex-shrink-0"
            >
              Alcazaba
              <span className="block text-xs text-[#C28E5E] font-['Lato'] font-normal">
                Lobo Marino
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#habitaciones" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">Habitaciones</a>
              <a href="#tours" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">Tours</a>
              <a href="#contacto" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">Contacto</a>
              <button
                onClick={handleWhatsApp}
                className="bg-[#C28E5E] text-white px-5 lg:px-6 py-2 rounded-full font-['Lato'] font-semibold text-sm hover:bg-[#A67347] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                RESERVAR
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A2F4B] border-t border-white/20 py-4 px-4 space-y-3">
              <a
                href="#habitaciones"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2"
              >
                Habitaciones
              </a>
              <a
                href="#tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2"
              >
                Tours
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2"
              >
                Contacto
              </a>
              <button
                onClick={() => {
                  handleWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#C28E5E] text-white px-5 py-3 rounded-full font-['Lato'] font-semibold text-sm hover:bg-[#A67347] transition-all duration-300 shadow-lg mt-4"
              >
                RESERVAR AHORA
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Full-screen Hero */}
      <section 
        id="inicio" 
        className="relative w-full min-h-screen flex flex-col justify-between items-center py-8 sm:py-0 sm:h-screen overflow-hidden"
      >
        {/* Background Image - VERSION RESPONSIVE AMÉLIORÉE */}
        <div className="absolute inset-0">
          {/* Image desktop - cachée sur mobile */}
          <div 
            className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: 'url(/images/Hostal_Alcazaba-puerto_lopez.webp)',
            }}
          />
          
          {/* Image mobile - avec object-position optimisé */}
          <img
            src="/images/Hostal_Alcazaba-puerto_lopez.webp"
            alt="Hostal Alcazaba Puerto López"
            className="sm:hidden absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectPosition: '75% 40%'
            }}
          />
          
          {/* Multi-layer Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2F4B]/75 via-[#1A2F4B]/55 to-[#1A2F4B]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2F4B]/70 via-transparent to-transparent"></div>
        </div>

        {/* Top Spacer - Mobile only */}
        <div className="sm:hidden h-16"></div>

        {/* Content Container - Centré verticalement */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-1 z-10">
          <div className="w-full max-w-4xl text-center text-white space-y-3 sm:space-y-6 md:space-y-8">
            
            {/* Main Title */}
            <h1 
              className={`font-['Playfair_Display'] text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-tight md:leading-tight transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <span className="block">Hostal Alcazaba</span>
              <span className="block text-[#C28E5E]">&</span>
              <span className="block text-[#C28E5E]">Lobo Marino</span>
            </h1>

            {/* Slogan */}
            <p 
              className={`font-['Lato'] text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-[#C28E5E] transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              Tu experiencia está garantizada
            </p>

            {/* Description */}
            <p 
              className={`font-['Lato'] text-sm sm:text-sm md:text-base lg:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed px-2 transition-all duration-1000 delay-900 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Hospitalidad auténtica y familiar en Puerto López
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 md:pt-8 w-full px-2 relative z-30 transition-all duration-1000 delay-[1300ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <button
                onClick={handleWhatsApp}
                className="group relative bg-[#C28E5E] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(194,142,94,0.5)] hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[48px] sm:min-h-auto touch-manipulation"
              >
                <span className="relative z-10">RESERVAR AHORA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A67347] to-[#C28E5E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <a
                href="#habitaciones"
                className="border-2 border-white text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-base md:text-lg hover:bg-white hover:text-[#1A2F4B] transition-all duration-300 text-center backdrop-blur-sm active:scale-95 w-full sm:w-auto min-h-[48px] sm:min-h-auto touch-manipulation"
              >
                VER HABITACIONES
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section - Scroll indicator et espacement */}
        <div className="relative z-10 w-full pb-8 sm:pb-12">
          {/* Scroll Indicator - Hidden on mobile */}
          <button
            onClick={scrollToContent}
            className={`hidden sm:flex mx-auto text-white/80 hover:text-white transition-all duration-1000 delay-[1500ms] flex-col items-center ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="font-['Lato'] text-xs uppercase tracking-wider">Descubre más</span>
              <ChevronDown size={28} />
            </div>
          </button>
        </div>

        {/* Decorative gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-5"></div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900&display=swap');
      `}</style>
    </>
  );
}