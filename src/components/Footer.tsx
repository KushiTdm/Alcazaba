import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Footer() {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <footer id="contacto" className="bg-gradient-to-br from-[#1A2F4B] to-[#0F1F35] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              Hostal Alcazaba
              <span className="block text-[#C28E5E]">& Lobo Marino</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              {hotelData.branding.tagline}
            </p>
            <p className="text-2xl italic text-[#C28E5E] font-semibold mb-6">
              {hotelData.branding.slogan}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-[#C28E5E] rounded-full"></span>
              <span>Navegación</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#habitaciones"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200"
                >
                  Habitaciones
                </a>
              </li>
              <li>
                <a
                  href="#tours"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200"
                >
                  Tours
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-300 hover:text-[#C28E5E] transition-colors duration-200"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-1 h-6 bg-[#C28E5E] rounded-full"></span>
              <span>Contacto</span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">{hotelData.contact.location}</p>
                  <p className="text-gray-400 text-sm">{hotelData.contact.city}</p>
                </div>
              </li>
              <li>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#C28E5E] transition-colors duration-200"
                >
                  <Phone size={20} className="text-[#C28E5E] flex-shrink-0" />
                  <span>{hotelData.contact.whatsapp}</span>
                </button>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail size={20} className="text-[#C28E5E] flex-shrink-0" />
                <span>info@hostalalcazaba.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Hostal Alcazaba & Lobo Marino. Todos los derechos reservados.
            </p>

            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-[#C28E5E] transition-colors duration-200">
                <Facebook size={24} />
              </button>
              <button className="text-gray-400 hover:text-[#C28E5E] transition-colors duration-200">
                <Instagram size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1525] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Diseñado con atención al detalle para ofrecer la mejor experiencia digital
          </p>
        </div>
      </div>
    </footer>
  );
}
