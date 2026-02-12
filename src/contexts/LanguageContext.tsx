import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import hotelData from '../data/hotelData.json';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, index?: number) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get nested object property by path
function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    // Handle array notation like "rooms[0]"
    const arrayMatch = key.match(/(\w+)\[(\d+)\]/);
    if (arrayMatch) {
      const [, arrayName, arrayIndex] = arrayMatch;
      return current?.[arrayName]?.[parseInt(arrayIndex)];
    }
    return current?.[key];
  }, obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Detect browser language or use default
  const detectBrowserLanguage = (): Language => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('fr')) return 'fr';
    return 'es'; // Default to Spanish
  };

  // Initialize language from localStorage or browser detection
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || detectBrowserLanguage();
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute for SEO
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (path: string, index?: number): any => {
    let value: any = hotelData;

    // If index is provided, handle array access
    if (index !== undefined && path.includes('[index]')) {
      path = path.replace('[index]', `[${index}]`);
    }

    // Navigate to the value using the path
    value = getNestedProperty(hotelData, path);

    // If value is undefined, return the path itself (for debugging)
    if (value === undefined) {
      console.warn(`Translation missing for path: ${path}`);
      return path;
    }

    // If the value is an object with language keys, return the appropriate translation
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (value[language]) {
        return value[language];
      }
      // If current language not available, try Spanish as fallback
      if (value.es) {
        console.warn(`Translation missing for ${path} in ${language}, using Spanish`);
        return value.es;
      }
    }

    // Return the value as-is (for non-translated fields like numbers, arrays, etc.)
    return value;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook for direct access to current language
export function useCurrentLanguage() {
  const { language } = useLanguage();
  return language;
}

// Helper function to get translated value directly from an object
export function getTranslation(obj: any, lang: Language): any {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    return obj[lang] || obj.es || obj;
  }
  return obj;
}