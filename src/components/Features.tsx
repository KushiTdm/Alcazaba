import { Accessibility, Utensils, Coffee, MapPin } from 'lucide-react';
import hotelData from '../data/hotelData.json';

const iconMap = {
  accessibility: Accessibility,
  utensils: Utensils,
  coffee: Coffee,
  'map-pin': MapPin,
};

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comodidades pensadas para hacer de tu estadía una experiencia memorable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotelData.usp.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isLarge = index === 0 || index === 3;

            return (
              <div
                key={feature.id}
                className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                  isLarge ? 'md:col-span-1 lg:row-span-2' : ''
                }`}
              >
                <div className="flex flex-col h-full space-y-4">
                  <div className="bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A2F4B] leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  <div className="pt-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#C28E5E] to-[#1A2F4B] rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1A2F4B] to-[#C28E5E] rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold">
              ¿Listo para tu próxima aventura?
            </h3>
            <p className="text-xl opacity-95">
              Reserva ahora y disfruta de la mejor hospitalidad en Puerto López
            </p>
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
                  '_blank'
                );
              }}
              className="bg-white text-[#1A2F4B] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F9F7F2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform inline-block"
            >
              RESERVAR AHORA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
