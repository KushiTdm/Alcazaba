import { Users, Check, Star } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function Rooms() {
  const handleWhatsApp = (roomType: string) => {
    const message = `Hola! Me gustaría reservar una ${roomType} en Hostal Alcazaba`;
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section id="habitaciones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
            Nuestras Habitaciones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Espacios diseñados para tu comodidad y descanso, con todas las amenidades que necesitas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelData.rooms.map((room) => (
            <div
              key={room.id}
              className={`group relative bg-gradient-to-br from-[#F9F7F2] to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                room.featured ? 'ring-4 ring-[#C28E5E]' : ''
              }`}
            >
              {room.featured && (
                <div className="absolute top-4 right-4 z-10 bg-[#C28E5E] text-white px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                  <Star size={16} fill="white" />
                  <span className="font-semibold text-sm">Destacado</span>
                </div>
              )}

              <div className="aspect-[4/3] bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                  [{room.type}]
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A2F4B] mb-2">
                    {room.type}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <Users size={18} className="text-[#C28E5E]" />
                    <span className="font-medium">{room.capacity}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check size={18} className="text-[#C28E5E] flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#C28E5E]">
                      {room.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(room.type)}
                    className="w-full bg-[#1A2F4B] text-white py-3 rounded-full font-semibold hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Reservar Esta Habitación
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
