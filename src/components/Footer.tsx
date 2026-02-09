import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Footer() {
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
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              {hotelData.branding.tagline}
            </p>
            <p className="text-lg sm:text-xl italic text-[#C28E5E] font-semibold mb-8">
              {hotelData.branding.slogan}
            </p>

            {/* Social Links - PROMINENTLY DISPLAYED */}
            <div>
              <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide">Síguenos</h4>
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
                  href={`https://instagram.com/${hotelData.contact.instagramHostal}`}
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
              <span>Navegación</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#habitaciones"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  Habitaciones
                </a>
              </li>
              <li>
                <a
                  href="#tours"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  Tours
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200 font-['Lato'] text-sm sm:text-base"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-[#C28E5E] rounded-full"></span>
              <span>Contacto</span>
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Hostal Alcazaba & Lobo Marino. Todos los derechos reservados.
            </p>
            <p className="text-center">
              Diseñado con atención al detalle para ofrecer la mejor experiencia. <a href='https://neuraweb.tech'>By NeuraWeb</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}