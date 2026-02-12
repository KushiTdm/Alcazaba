import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import hotelData from '../data/hotelData.json';
import { useTranslation } from '../hooks/useTranslation';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#F9F7F2] via-white to-[#F9F7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
            <HelpCircle className="text-[#C28E5E]" size={20} />
            <span className="text-[#1A2F4B] font-semibold">{t('faq.label')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2F4B] mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {hotelData.faq.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors duration-200"
              >
                <span className="text-lg sm:text-xl font-semibold text-[#1A2F4B] pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-[#C28E5E] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 text-gray-600 leading-relaxed text-base sm:text-lg">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 text-lg">
            {t('faq.notFound')}
          </p>
          <button
            onClick={() => {
              window.open(
                `https://wa.me/${hotelData.contact.whatsapp}?text=${encodeURIComponent('Hola! Tengo una pregunta sobre el hostal')}`,
                '_blank'
              );
            }}
            className="bg-[#C28E5E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A2F4B] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>{t('faq.contactButton')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}