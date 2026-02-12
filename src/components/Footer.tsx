import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  const handleWhatsApp = (phoneNumber: string) => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Consulta sobre Hostal Alcazaba');
    const body = encodeURIComponent(hotelData.contact.whatsappMessage);
    window.location.href = `mailto:${hotelData.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleLocation = () => {
    window.open(hotelData.contact.locationUrl, '_blank');
  };

  return (
    <footer id="contacto" className="bg-gradient-to-br from-[#1A2F4B] to-[#0F1F35] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 sm:col-span-2">
            <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold mb-2">
              Hostal Alcazaba
              <span className="block text-[#C28E5E]">& Lobo Marino</span>
            </h3>
            <img 
              src="/images/LoDi-logos.png" 
              alt="Hostal Alcazaba & Lobo Marino" 
              className="h-16 sm:h-20 mb-4"
            />
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              {t('branding.tagline')}
            </p>
            <p className="text-lg sm:text-xl italic text-[#C28E5E] font-semibold mb-8">
              {t('branding.slogan')}
            </p>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide">{t('footer.followUs')}</h4>
              <div className="flex items-center space-x-4">
                <a 
                  href={hotelData.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] hover:bg-[#165FD8] p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href={`https://instagram.com/hostal.alcazaba`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] hover:opacity-90 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-[#C28E5E] rounded-full"></span>
              <span>{t('footer.navigation')}</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  {t('nav.rooms')}
                </a>
              </li>
              <li>
                <a
                  href="#habitaciones"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  {t('nav.rooms')}
                </a>
              </li>
              <li>
                <a
                  href="#tours"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  {t('nav.tours')}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-[#C28E5E] rounded-full"></span>
              <span>{t('footer.contact')}</span>
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={handleLocation}
                  className="flex items-start space-x-3 text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 text-left w-full text-sm sm:text-base"
                >
                  <MapPin size={20} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{hotelData.contact.location}</p>
                    <p className="text-gray-400 text-xs">{hotelData.contact.city}</p>
                  </div>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => handleWhatsApp(hotelData.contact.whatsapp)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 w-full text-left text-sm sm:text-base"
                >
                  <Phone size={20} className="text-[#C28E5E] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">María</p>
                    <p className="font-medium">+{hotelData.contact.whatsapp}</p>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleWhatsApp(hotelData.contact.whatsappOswaldo)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 w-full text-left text-sm sm:text-base"
                >
                  <Phone size={20} className="text-[#C28E5E] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Oswaldo</p>
                    <p className="font-medium">+{hotelData.contact.whatsappOswaldo}</p>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={handleEmail}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 w-full text-left text-sm sm:text-base"
                >
                  <Mail size={20} className="text-[#C28E5E] flex-shrink-0" />
                  <span className="break-all font-medium">{hotelData.contact.email}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Hostal Alcazaba & Lobo Marino. {t('footer.rights')}
            </p>
            
            {/* Developer Credit */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="hidden sm:inline">{t('footer.devBy')}</span>
              <span className="sm:hidden">{t('footer.devByMobile')}</span>
              <a 
                href="https://neuraweb.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                title="NeuraWeb - Agencia de Desarrollo Web en Guayaquil, Ecuador"
                className="inline-flex items-center space-x-2 text-[#C28E5E]/80 hover:text-[#C28E5E] transition-all duration-300 group font-medium"
              >
                <img 
                  src="/images/neurawebW.webp" 
                  alt="NeuraWeb"
                  className="h-6 sm:h-7 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  width="auto"
                  height="28"
                />
                <span className="text-sm group-hover:underline">NeuraWeb</span>
              </a>
            </div>
          </div>
          
          {/* SEO Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">
              {t('footer.devText')}{' '}
              <a 
                href="https://neuraweb.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#C28E5E] hover:text-[#C28E5E]/80 transition-colors duration-200 font-medium underline"
              >
                {t('footer.devLink')}
              </a>
              {' '}{t('footer.devTextEnd')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}