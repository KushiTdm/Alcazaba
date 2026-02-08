import { MapPin, Star } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Hero() {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Star className="text-[#C28E5E]" size={20} fill="#C28E5E" />
              <span className="text-[#1A2F4B] font-medium">Hospitalidad Auténtica</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A2F4B] leading-tight">
              {hotelData.branding.name.split('&')[0]}
              <span className="text-[#C28E5E]"> & Lobo Marino</span>
            </h1>

            <p className="text-2xl sm:text-3xl text-[#C28E5E] font-semibold italic">
              {hotelData.branding.slogan}
            </p>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              {hotelData.branding.tagline}
            </p>

            <div className="flex items-start space-x-3 text-[#1A2F4B] bg-white p-4 rounded-2xl shadow-md max-w-xl">
              <MapPin className="text-[#C28E5E] flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold mb-1">Ubicación Privilegiada</p>
                <p className="text-gray-600">{hotelData.contact.location}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleWhatsApp}
                className="bg-[#C28E5E] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1A2F4B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                RESERVAR AHORA
              </button>
              <a
                href="#habitaciones"
                className="border-2 border-[#1A2F4B] text-[#1A2F4B] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1A2F4B] hover:text-white transition-all duration-300 text-center"
              >
                VER HABITACIONES
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B]">
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                [Imagen Principal del Hostal]
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C28E5E]/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#1A2F4B]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
