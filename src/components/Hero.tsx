import { useState, useEffect } from 'react';
import { MapPin, Star, ChevronDown } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);

    // Handle scroll for navbar reveal
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
      {/* Sticky Navbar - appears after scrolling */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          showNavbar 
            ? 'translate-y-0 opacity-100 bg-[#1A2F4B]/95 backdrop-blur-md shadow-2xl' 
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a 
              href="#inicio" 
              className="font-['Playfair_Display'] text-2xl font-bold text-white"
            >
              Hostal Alcazaba
              <span className="block text-sm text-[#C28E5E] font-['Lato'] font-normal">
                & Lobo Marino
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#habitaciones"
                className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium"
              >
                Habitaciones
              </a>
              <a
                href="#tours"
                className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium"
              >
                Tours
              </a>
              <a
                href="#testimonios"
                className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium"
              >
                Opiniones
              </a>
              <a
                href="#contacto"
                className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium"
              >
                Contacto
              </a>
              <button
                onClick={handleWhatsApp}
                className="bg-[#C28E5E] text-white px-6 py-2.5 rounded-full font-['Lato'] font-semibold hover:bg-[#A67347] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                RESERVAR
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Hero */}
      <section 
        id="inicio" 
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url(/images/hero-mirador.webp)',
            filter: 'brightness(0.7)',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2F4B]/60 via-transparent to-[#1A2F4B]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2F4B]/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl text-center text-white space-y-8">
            
            {/* Badge - Slide from top */}
            <div 
              className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <Star className="text-[#C28E5E]" size={24} fill="#C28E5E" />
              <span className="text-white font-['Lato'] font-medium text-lg">
                Calificación 4.6 ⭐ (188 opiniones)
              </span>
            </div>

            {/* Main Title - Fade and Scale */}
            <h1 
              className={`font-['Playfair_Display'] text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              Hostal Alcazaba
              <span className="block text-[#C28E5E] mt-2">
                & Lobo Marino
              </span>
            </h1>

            {/* Slogan - Slide from left */}
            <p 
              className={`font-['Lato'] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#C28E5E] transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              Tu experiencia está garantizada
            </p>

            {/* Description - Fade in */}
            <p 
              className={`font-['Lato'] text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hotelData.branding.tagline}
            </p>

            {/* Location Badge - Slide from bottom */}
            <div 
              className={`inline-flex items-start space-x-3 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-lg mx-auto transition-all duration-1000 delay-1100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <MapPin className="text-[#C28E5E] flex-shrink-0 mt-1" size={28} />
              <div className="text-left">
                <p className="font-['Lato'] font-semibold text-lg mb-1">Ubicación Privilegiada</p>
                <p className="font-['Lato'] text-white/80 text-base">{hotelData.contact.location}</p>
                <p className="font-['Lato'] text-[#C28E5E] text-sm mt-1">{hotelData.contact.details}</p>
              </div>
            </div>

            {/* CTA Buttons - Slide from bottom with stagger */}
            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center pt-6 transition-all duration-1000 delay-[1300ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <button
                onClick={handleWhatsApp}
                className="group relative bg-[#C28E5E] text-white px-10 py-5 rounded-full font-['Lato'] font-bold text-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(194,142,94,0.5)] hover:scale-105"
              >
                <span className="relative z-10">RESERVAR AHORA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A67347] to-[#C28E5E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <a
                href="#habitaciones"
                className="border-2 border-white text-white px-10 py-5 rounded-full font-['Lato'] font-bold text-lg hover:bg-white hover:text-[#1A2F4B] transition-all duration-300 text-center backdrop-blur-sm"
              >
                VER HABITACIONES
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bounce animation */}
        <button
          onClick={scrollToContent}
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-all duration-1000 delay-[1500ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="font-['Lato'] text-sm uppercase tracking-wider">Descubre más</span>
            <ChevronDown size={32} />
          </div>
        </button>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900&display=swap');
      `}</style>
    </>
  );
}