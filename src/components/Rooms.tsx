import { useState } from 'react';
import { Users, Check, Star, ArrowRight } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import RoomDetail from '../pages/RoomDetail';

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <>
      <section id="habitaciones" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28E5E]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A2F4B]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-[#F9F7F2] px-6 py-2 rounded-full mb-6">
              <span className="font-['Lato'] text-[#C28E5E] font-semibold">ALOJAMIENTO</span>
            </div>
            
            <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-[#1A2F4B] mb-6">
              Nuestras Habitaciones
            </h2>
            
            <p className="font-['Lato'] text-xl text-gray-600 max-w-3xl mx-auto">
              Espacios diseñados para tu comodidad y descanso, desde habitaciones individuales hasta familiares. Todas con las amenidades que necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelData.rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`group relative bg-gradient-to-br from-[#F9F7F2] to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                  room.featured ? 'ring-4 ring-[#C28E5E] lg:scale-105' : ''
                }`}
              >
                {room.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-[#C28E5E] text-white px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                    <Star size={16} fill="white" />
                    <span className="font-['Lato'] font-semibold text-sm">Destacado</span>
                  </div>
                )}

                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#C28E5E] to-[#1A2F4B] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                    [{room.type}]
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                    <div className="flex items-center space-x-2 text-white">
                      <span className="font-['Lato'] font-semibold">Ver detalles</span>
                      <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A2F4B] mb-2">
                      {room.type}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <Users size={18} className="text-[#C28E5E]" />
                      <span className="font-['Lato'] font-medium">{room.capacity}</span>
                    </div>
                    <p className="font-['Lato'] text-gray-600 leading-relaxed line-clamp-2">
                      {room.description}
                    </p>
                  </div>

                  {/* Amenities Preview (first 3) */}
                  <div className="space-y-2">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check size={16} className="text-[#C28E5E] flex-shrink-0" />
                        <span className="font-['Lato'] text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                    {room.amenities.length > 3 && (
                      <p className="font-['Lato'] text-xs text-[#C28E5E] font-medium">
                        +{room.amenities.length - 3} comodidades más
                      </p>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-['Lato'] text-sm text-gray-500">Desde</p>
                        <p className="font-['Playfair_Display'] text-2xl font-bold text-[#C28E5E]">
                          {room.price}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room.id);
                        }}
                        className="bg-[#1A2F4B] text-white px-6 py-2.5 rounded-full font-['Lato'] font-semibold hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="font-['Lato'] text-gray-600 text-lg mb-6">
              ¿No encuentras lo que buscas? Contáctanos directamente
            </p>
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito información sobre las habitaciones disponibles')}`,
                  '_blank'
                );
              }}
              className="bg-[#C28E5E] text-white px-10 py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              CONSULTAR DISPONIBILIDAD
            </button>
          </div>
        </div>
      </section>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomDetail 
          roomId={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </>
  );
}