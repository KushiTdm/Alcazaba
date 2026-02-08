import { Clock, Check } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Tours() {
  const handleWhatsApp = (tourName: string) => {
    const message = `Hola! Me interesa el tour: ${tourName}`;
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
            Tours y Experiencias
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre la magia del Parque Nacional Machalilla con nuestros tours recomendados
          </p>
        </div>

        <div className="space-y-8">
          {hotelData.tours.map((tour, index) => (
            <div
              key={tour.id}
              className={`group bg-gradient-to-br from-[#F9F7F2] to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
                      [{tour.name}]
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                </div>

                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    {tour.season && (
                      <span className="inline-block bg-[#C28E5E] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {tour.season}
                      </span>
                    )}

                    <h3 className="text-3xl sm:text-4xl font-bold text-[#1A2F4B]">
                      {tour.name}
                    </h3>

                    {tour.subtitle && (
                      <p className="text-lg text-[#C28E5E] font-semibold italic">
                        {tour.subtitle}
                      </p>
                    )}

                    <p className="text-gray-600 leading-relaxed text-lg">
                      {tour.description}
                    </p>

                    <div className="flex items-center space-x-2 text-[#1A2F4B]">
                      <Clock size={20} className="text-[#C28E5E]" />
                      <span className="font-semibold">{tour.duration}</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      <p className="font-semibold text-[#1A2F4B]">Incluye:</p>
                      {tour.included.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check size={18} className="text-[#C28E5E] flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <span className="text-3xl font-bold text-[#C28E5E]">
                        {tour.price}
                      </span>
                      <button
                        onClick={() => handleWhatsApp(tour.name)}
                        className="bg-[#1A2F4B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Más Información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
