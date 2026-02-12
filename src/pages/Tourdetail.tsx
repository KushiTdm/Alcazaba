import { useState } from 'react';
import { X, Clock, Check, Calendar, ArrowLeft, Users } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface TourDetailProps {
  tourId: string;
  onClose: () => void;
}

type Lang = 'es' | 'en' | 'fr';

function tr(field: any, lang: Lang): string {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object') return field[lang] ?? field['es'] ?? '';
  return '';
}

function trArr(field: any, lang: Lang): string[] {
  if (Array.isArray(field)) return field;
  if (field && typeof field === 'object') {
    const arr = field[lang] ?? field['es'];
    if (Array.isArray(arr)) return arr;
  }
  return [];
}

export default function TourDetail({ tourId, onClose }: TourDetailProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const lang = language as Lang;

  const tour = hotelData.tours.find(t => t.id === tourId);
  const [participants, setParticipants] = useState(2);
  const [tourDate, setTourDate] = useState('');

  if (!tour) return null;

  const tourName = tr(tour.name, lang);
  const tourSeason = tr((tour as any).season, lang);
  const tourSubtitle = tr((tour as any).subtitle, lang);
  const tourDescription = tr(tour.description, lang);
  const tourDuration = tr(tour.duration, lang);
  const tourIncluded = trArr(tour.included, lang);

  const handleWhatsAppReservation = () => {
    const lines = [
      `Hola! Me interesa el tour: ${tourName}`,
      ``,
      `Fecha preferida: ${tourDate || 'A definir'}`,
      `Numero de participantes: ${participants}`,
      ...(tourSeason ? [`Temporada: ${tourSeason}`] : []),
      ``,
      `Cual es la disponibilidad y el precio para ${participants} ${participants === 1 ? 'persona' : 'personas'}?`,
    ];

    const message = lines.join('%0A');

    window.open(
      `https://wa.me/${hotelData.contact.whatsapp}?text=${message}`,
      '_blank'
    );
  };

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
              <span className="text-lg">{t('tourDetail.back')}</span>
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
                alt={tourName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F4B]/60 to-transparent"></div>
              
              {tourSeason && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30">
                  <span className="font-['Lato'] font-semibold text-lg">{tourSeason}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  
                  <div>
                    <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
                      {tourName}
                    </h1>
                    
                    {tourSubtitle && (
                      <p className="font-['Lato'] text-2xl text-[#C28E5E] font-semibold italic mb-6">
                        {tourSubtitle}
                      </p>
                    )}

                    <div className="flex items-center space-x-2 text-gray-600 mb-6">
                      <Clock size={24} className="text-[#C28E5E]" />
                      <span className="font-['Lato'] text-xl font-medium">{tourDuration}</span>
                    </div>

                    <p className="font-['Lato'] text-xl text-gray-700 leading-relaxed">
                      {tourDescription}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A2F4B] mb-6">
                      {t('tourDetail.included')}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {tourIncluded.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-[#F9F7F2] p-4 rounded-xl">
                          <Check size={20} className="text-[#C28E5E] flex-shrink-0" />
                          <span className="font-['Lato'] text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F9F7F2] to-white p-8 rounded-2xl border-2 border-[#C28E5E]/20">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A2F4B] mb-4">
                      {t('tourDetail.recommendations')}
                    </h3>
                    <ul className="space-y-3 font-['Lato'] text-gray-700">
                      {[
                        t('tourDetail.rec1'),
                        t('tourDetail.rec2'),
                        t('tourDetail.rec3'),
                        t('tourDetail.rec4'),
                      ].map((rec, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check size={18} className="text-[#C28E5E] flex-shrink-0 mt-1" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Booking */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-[#1A2F4B] to-[#243A56] text-white p-8 rounded-3xl shadow-2xl">
                    
                    <div className="mb-8">
                      <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">
                        {t('tourDetail.bookTitle')}
                      </h3>
                      <p className="font-['Lato'] text-white/80">
                        {t('tourDetail.bookSubtitle')}
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      
                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Calendar size={18} className="text-[#C28E5E]" />
                          <span>{t('tourDetail.preferredDate')}</span>
                        </label>
                        <input
                          type="date"
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          min={today}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E]"
                        />
                      </div>

                      <div>
                        <label className="flex items-center space-x-2 font-['Lato'] text-sm font-medium mb-2">
                          <Users size={18} className="text-[#C28E5E]" />
                          <span>{t('tourDetail.participants')}</span>
                        </label>
                        <select
                          value={participants}
                          onChange={(e) => setParticipants(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#C28E5E]"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-[#1A2F4B]">
                              {i + 1} {i === 0 ? t('tourDetail.person') : t('tourDetail.people')}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock size={18} className="text-[#C28E5E]" />
                          <span className="font-['Lato'] text-sm font-medium">{t('tours.duration')}</span>
                        </div>
                        <p className="font-['Lato'] text-white/90">{tourDuration}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleWhatsAppReservation}
                      className="w-full bg-[#C28E5E] text-white py-4 rounded-full font-['Lato'] font-bold text-lg hover:bg-[#A67347] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      {t('tourDetail.consultButton')}
                    </button>

                    <p className="font-['Lato'] text-xs text-white/60 text-center mt-4">
                      {t('tourDetail.responseTime')}
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