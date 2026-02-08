import { Compass, Clock, Lightbulb } from 'lucide-react';
import hotelData from '../data/hotelData.json';

export default function LocalGuide() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A2F4B] to-[#C28E5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Compass size={20} />
              <span className="font-semibold">Guía Local</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              {hotelData.localGuide.title}
            </h2>

            <p className="text-xl opacity-95 leading-relaxed">
              {hotelData.localGuide.description}
            </p>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Clock size={24} className="flex-shrink-0" />
              <span className="text-lg font-semibold">{hotelData.localGuide.hours}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#C28E5E] w-12 h-12 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2F4B]">Consejos del Local</h3>
            </div>

            <div className="space-y-4">
              {hotelData.localGuide.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gradient-to-br from-[#F9F7F2] to-white rounded-2xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="bg-[#C28E5E] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-0.5">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito información sobre tours al Parque Nacional Machalilla')}`,
                    '_blank'
                  );
                }}
                className="w-full bg-[#1A2F4B] text-white py-4 rounded-full font-bold text-lg hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Planifica tu Visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
