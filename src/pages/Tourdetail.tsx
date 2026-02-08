import { useState } from 'react';
import { X, Clock, Check, Calendar, ArrowLeft, Users } from 'lucide-react';
import hotelData from '../data/hotelData.json';

interface TourDetailProps {
  tourId: string;
  onClose: () => void;
}

export default function TourDetail({ tourId, onClose }: TourDetailProps) {
  const tour = hotelData.tours.find(t => t.id === tourId);
  const [participants, setParticipants] = useState(2);
  const [tourDate, setTourDate] = useState('');

  if (!tour) return null;

  const handleWhatsAppReservation = () => {
    const message = `Hola! Me interesa el tour: ${tour.name}

📅 Fecha preferida: ${tourDate || 'A definir'}
👥 Número de participantes: ${participants}

${tour.season ? `📌 Temporada: ${tour.season}` : ''}

¿Cuál es la disponibilidad y el precio para ${participants} ${participants === 1 ? 'persona' : 'personas'}?`;

    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

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
              <span className="text-lg">Volver a tours</span>
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
            
            {/* Hero Image */}
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={tour.image}
                alt={tour.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/60 to-transparent"></div>
              
              {tour.season && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30">
                  <span className="font-['Lato'] font-semibold text-lg">{tour.season}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Left Column - Tour Info */}
                <div className="lg:col-span-2 space-y-8">
                  
                  <div>
                    <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
                      {tour.name}
                    </h1>
                    
                    {tour.subtitle && (
                      <p className="font-['Lato'] text-2xl text-[#C28E5E] font-semibold italic mb-6">
                        {tour.subtitle}
                      </p>
                    )}

                    <div className="flex items-center space-x-2 text-gray-600 mb-6">
                      <Clock size={24} className="text-[#C28E5E]" />
                      <span className="font-['Lato'] text-xl font-medium">{tour.duration}</span>
                    </div>

                    <p className="font-['Lato'] text-xl text-gray-700 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A2F4B] mb-6">
                      El Tour Incluye
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {tour.included.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-[#F9F7F2] p-4 rounded-xl">
                          <Check size={20} className="text-[#C28E5E] flex-shrink-0" />
                          <span className="font-['Lato'] text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F9F7F2] to-white p-8 rounded-2xl border-2 border-[#C28E5E]/20">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A2F4B] mb-4">
                      Recomendaciones
                    </h3>
                    <ul className="space-y-3 font-['Lato'] text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span>Lleva ropa cómoda y protector solar biodegradable</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span>Trae agua y snacks adicionales si lo deseas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span>Cámara o teléfono para capturar momentos increíbles</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                        <span>Reserva con anticipación en temporada alta</span>
                      </li>
                      {tour.id === 'observacion-ballenas' && (
                        <li className="flex items-start space-x-2">
                          <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                          <span><strong>Temporada de ballenas: Junio a Septiembre</strong></span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-[#1A2F4B] to-[#243A56] text-white p-8 rounded-3xl shadow-2xl">
                    
                    <div className="mb-8">
                      <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">
                        Reserva esta Experiencia
                      </h3>
                      <p className="font-['Lato'] text-white/80">
                        Consulta disponibilidad y tarifas
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      
                      {/* Tour Date */}
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Calendar size={18} className="text-[#C28E5E]" />
                          <span>Fecha preferida del tour</span>
                        </label>
                        <input
                          type="date"
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          min={today}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E] placeholder-white/50"
                        />
                      </div>

                      {/* Number of Participants */}
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Users size={18} className="text-[#C28E5E]" />
                          <span>Número de participantes</span>
                        </label>
                        <select
                          value={participants}
                          onChange={(e) => setParticipants(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E]"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-[#1A2F4B]">
                              {i + 1} {i === 0 ? 'persona' : 'personas'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Duration Info */}
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock size={18} className="text-[#C28E5E]" />
                          <span className="font-['Lato'] text-sm font-medium">Duración</span>
                        </div>
                        <p className="font-['Lato'] text-white/90">{tour.duration}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleWhatsAppReservation}
                      className="w-full bg-[#C28E5E] text-white py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      CONSULTAR POR WHATSAPP
                    </button>

                    <p className="font-['Lato'] text-xs text-white/60 text-center mt-4">
                      Tours operados por guías certificados • Te cotizaremos la mejor tarifa
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