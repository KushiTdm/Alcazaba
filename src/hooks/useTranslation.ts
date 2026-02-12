import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations.json';

type Language = 'es' | 'en' | 'fr';

type Translations = {
  [key in Language]: any;
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = (translations as Translations)[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retourne la clé si la traduction n'existe pas
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, language };
};
