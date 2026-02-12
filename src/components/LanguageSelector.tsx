import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageOption {
  code: 'es' | 'en' | 'fr';
  name: string;
  flag: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: 'es' | 'en' | 'fr') => {
    setLanguage(langCode);
    setIsOpen(false);
    
    // Smooth scroll to top when changing language
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Version - Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 font-['Lato']"
        aria-label="Select language"
      >
        <Globe size={18} className="text-[#C28E5E]" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-white">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 dark:text-white/70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Mobile Version - Compact Flags Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe size={16} className="text-[#C28E5E]" />
        <span className="text-base">{currentLanguage.flag}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A2F4B] rounded-xl shadow-2xl border border-gray-200 dark:border-white/20 overflow-hidden z-50 animate-slideDown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-[#F9F7F2] dark:hover:bg-white/10 transition-colors duration-200 ${
                language === lang.code ? 'bg-[#F9F7F2] dark:bg-white/10' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-['Lato'] font-semibold text-sm text-[#1A2F4B] dark:text-white">
                  {lang.nativeName}
                </p>
                <p className="font-['Lato'] text-xs text-gray-500 dark:text-white/70">
                  {lang.name}
                </p>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 bg-[#C28E5E] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}