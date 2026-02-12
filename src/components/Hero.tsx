import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

type Lang = 'es' | 'en' | 'fr';

function tr(field: any, lang: Lang): string {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object') return field[lang] ?? field['es'] ?? '';
  return '';
}

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = false }: HeroProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const lang = language as Lang;

  const [showOverlay, setShowOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setTimeout(() => setShowOverlay(true), 800);
      setTimeout(() => setIsVisible(true), 1500);
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
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(tr(hotelData.contact.whatsappMessage, lang))}`,
      '_blank'
    );
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
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
              <a href="#habitaciones" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">{t('nav.rooms')}</a>
              <a href="#tours" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">{t('nav.tours')}</a>
              <a href="#contacto" className="text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium text-sm lg:text-base">{t('nav.contact')}</a>
              <LanguageSelector />
              <button
                onClick={handleWhatsApp}
                className="bg-[#C28E5E] text-white px-5 lg:px-6 py-2 rounded-full font-['Lato'] font-semibold text-sm hover:bg-[#A67347] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                {t('nav.reserve')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A2F4B] border-t border-white/20 py-4 px-4 space-y-3">
              <a href="#habitaciones" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2">{t('nav.rooms')}</a>
              <a href="#tours" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2">{t('nav.tours')}</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#C28E5E] transition-colors duration-300 font-['Lato'] font-medium py-2">{t('nav.contact')}</a>
              <button
                onClick={() => { handleWhatsApp(); setMobileMenuOpen(false); }}
                className="w-full bg-[#C28E5E] text-white px-5 py-3 rounded-full font-['Lato'] font-semibold text-sm hover:bg-[#A67347] transition-all duration-300 shadow-lg mt-4"
              >
                {t('nav.reserve')}
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{ backgroundImage: 'url(/images/Hostal_Alcazaba-puerto_lopez.webp)' }}
          />
          <img
            src="/images/Hostal_Alcazaba-puerto_lopez.webp"
            alt="Hostal Alcazaba Puerto López"
            className="sm:hidden absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '75% 40%' }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-[#1A2F4B]/75 via-[#1A2F4B]/55 to-[#1A2F4B]/90 transition-opacity duration-1000 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r from-[#1A2F4B]/70 via-transparent to-transparent transition-opacity duration-1000 delay-300 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        {/* Top Spacer - Mobile only */}
        <div className="sm:hidden h-16"></div>

        {/* Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-1 z-10">
          <div className="w-full max-w-4xl text-center text-white space-y-3 sm:space-y-6 md:space-y-8">
            <h1 className={`font-['Playfair_Display'] text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <span className="block">{t('hero.title1')}</span>
              <span className="block text-[#C28E5E] font-serif">&amp;</span>
              <span className="block text-[#C28E5E]">{t('hero.title2')}</span>
            </h1>

            <p className={`font-['Lato'] text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic text-white/95 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {t('hero.subtitle')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 md:pt-8 w-full px-2 relative z-30 transition-all duration-1000 delay-[1300ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                onClick={handleWhatsApp}
                className="group relative bg-[#C28E5E] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(194,142,94,0.5)] hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[48px] sm:min-h-auto touch-manipulation"
              >
                <span className="relative z-10">{t('hero.cta1')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A67347] to-[#C28E5E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <a
                href="#habitaciones"
                className="border-2 border-white text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-base md:text-lg hover:bg-white hover:text-[#1A2F4B] transition-all duration-300 text-center backdrop-blur-sm active:scale-95 w-full sm:w-auto min-h-[48px] sm:min-h-auto touch-manipulation"
              >
                {t('hero.cta2')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10 w-full pb-8 sm:pb-12">
          <button
            onClick={scrollToContent}
            className={`hidden sm:flex mx-auto text-white/80 hover:text-white transition-all duration-1000 delay-[1500ms] flex-col items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="font-['Lato'] text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
              <ChevronDown size={28} />
            </div>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-5"></div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900&display=swap');
      `}</style>
    </>
  );
}