import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import hotelData from '../data/hotelData.json';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent(hotelData.contact.whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs animate-slideUp">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] w-12 h-12 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1A2F4B]">Hostal Alcazaba</p>
                  <p className="text-sm text-gray-600">En línea ahora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              ¿Necesitas ayuda? Escríbenos por WhatsApp y te responderemos lo antes posible.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Iniciar Chat
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="WhatsApp"
        >
          {isOpen ? (
            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
