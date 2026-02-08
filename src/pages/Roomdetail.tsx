import { useState } from 'react';
import { X, Users, Check, Calendar, ArrowLeft } from 'lucide-react';
import hotelData from '../data/hotelData.json';

interface RoomDetailProps {
  roomId: string;
  onClose: () => void;
}

export default function RoomDetail({ roomId, onClose }: RoomDetailProps) {
  const room = hotelData.rooms.find(r => r.id === roomId);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  if (!room) return null;

  const handleWhatsAppReservation = () => {
    const message = `Hola! Me gustaría reservar una ${room.type}

📅 Fechas:
• Check-in: ${checkIn || 'A definir'}
• Check-out: ${checkOut || 'A definir'}

👥 Número de huéspedes: ${guests}

¿Cuál es la disponibilidad y el precio?`;

    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get min checkout date (check-in + 1 day)
  const getMinCheckOut = () => {
    if (!checkIn) return today;
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const maxGuests = parseInt(room.capacity.match(/\d+/)?.[0] || '1');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A2F4B]/95 backdrop-blur-md">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-white hover:text-[#C28E5E] transition-colors duration-200 font-['Lato']"
            >
              <ArrowLeft size={24} />
              <span className="text-lg">Volver a habitaciones</span>
            </button>

            <button
              onClick={onClose}
              className="text-white hover:text-[#C28E5E] transition-colors duration-200"
            >
              <X size={32} />
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Image */}
            <div className="aspect-[21/9] relative overflow-hidden">
              <img
                src={room.image}
                alt={room.type}
                className="w-full h-full object-cover"
              />
              {room.featured && (
                <div className="absolute top-6 right-6 bg-[#C28E5E] text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
                  <Check size={20} />
                  <span className="font-['Lato'] font-semibold text-lg">Habitación Destacada</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Left Column - Room Info */}
                <div className="lg:col-span-2 space-y-8">
                  
                  <div>
                    <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
                      {room.type}
                    </h1>
                    <div className="flex items-center space-x-3 text-gray-600 mb-6">
                      <Users size={24} className="text-[#C28E5E]" />
                      <span className="font-['Lato'] text-xl font-medium">{room.capacity}</span>
                    </div>
                    <p className="font-['Lato'] text-xl text-gray-700 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A2F4B] mb-6">
                      Comodidades Incluidas
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-[#F9F7F2] p-4 rounded-xl">
                          <Check size={20} className="text-[#C28E5E] flex-shrink-0" />
                          <span className="font-['Lato'] text-gray-800">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F9F7F2] to-white p-8 rounded-2xl border-2 border-[#C28E5E]/20">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A2F4B] mb-4">
                      Información Importante
                    </h3>
                    <ul className="space-y-3 font-['Lato'] text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span><strong>Check-in:</strong> {hotelData.contact.checkin}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span><strong>Check-out:</strong> {hotelData.contact.checkout}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span><strong>Cocina compartida gratuita</strong></span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span><strong>Estacionamiento gratuito</strong></span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span><strong>Wi-Fi de alta velocidad</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-[#1A2F4B] to-[#243A56] text-white p-8 rounded-3xl shadow-2xl">
                    
                    <div className="mb-8">
                      <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">
                        Reserva tu Estadía
                      </h3>
                      <p className="font-['Lato'] text-white/80">
                        Consulta disponibilidad y tarifas
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      
                      {/* Check-in Date */}
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Calendar size={18} className="text-[#C28E5E]" />
                          <span>Fecha de entrada</span>
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          min={today}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E] placeholder-white/50"
                        />
                      </div>

                      {/* Check-out Date */}
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Calendar size={18} className="text-[#C28E5E]" />
                          <span>Fecha de salida</span>
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={getMinCheckOut()}
                          disabled={!checkIn}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E] disabled:opacity-50 disabled:cursor-not-allowed placeholder-white/50"
                        />
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Users size={18} className="text-[#C28E5E]" />
                          <span>Número de huéspedes</span>
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E]"
                        >
                          {[...Array(maxGuests)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-[#1A2F4B]">
                              {i + 1} {i === 0 ? 'huésped' : 'huéspedes'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleWhatsAppReservation}
                      className="w-full bg-[#C28E5E] text-white py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      CONSULTAR POR WHATSAPP
                    </button>

                    <p className="font-['Lato'] text-xs text-white/60 text-center mt-4">
                      Respuesta inmediata • Te cotizaremos la mejor tarifa
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}