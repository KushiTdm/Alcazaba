import { Compass, Clock, Lightbulb } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

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

export default function LocalGuide() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const lang = language as Lang;

  const title = tr(hotelData.localGuide.title, lang);
  const description = tr(hotelData.localGuide.description, lang);
  const hours = tr(hotelData.localGuide.hours, lang);
  const tips = trArr(hotelData.localGuide.tips, lang);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#1A2F4B] to-[#C28E5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              <Compass size={20} />
              <span className="font-['Lato'] font-semibold text-sm sm:text-base">{t('localGuide.label')}</span>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                {title}
              </h2>
              <div className="w-12 h-1 bg-white/40 rounded-full mb-6"></div>
            </div>

            <p className="text-base sm:text-lg lg:text-xl opacity-95 leading-relaxed">
              {description}
            </p>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-xl w-fit">
              <Clock size={22} className="flex-shrink-0" />
              <span className="font-['Lato'] font-semibold text-sm sm:text-base">{hours}</span>
            </div>
          </div>

          {/* Right - Tips Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl order-1 lg:order-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#C28E5E] w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb size={24} className="text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A2F4B]">{t('localGuide.tips')}</h3>
            </div>

            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-gradient-to-br from-[#F9F7F2] to-white rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="bg-[#C28E5E] text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-0.5">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Necesito información sobre tours al Parque Nacional Machalilla')}`,
                    '_blank'
                  );
                }}
                className="w-full bg-[#1A2F4B] text-white py-3 sm:py-4 rounded-full font-['Lato'] font-bold text-sm sm:text-lg hover:bg-[#C28E5E] transition-all duration-300 shadow-md hover:shadow-lg min-h-[44px] sm:min-h-auto"
              >
                {t('localGuide.planVisit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}