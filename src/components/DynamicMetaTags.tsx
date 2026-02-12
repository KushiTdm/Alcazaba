import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MetaTagsConfig {
  es: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  en: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  fr: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
}

const metaTags: MetaTagsConfig = {
  es: {
    title: "Hostal Alcazaba & Lobo Marino | Puerto López Ecuador | Habitaciones Vista al Mar + Tours Ballenas Jorobadas",
    description: "⭐4.6/5 (188 reseñas) Hostal familiar en Puerto López con habitaciones accesibles PMR, cocina compartida gratis, estacionamiento incluido y mirador con vista panorámica al Pacífico. Tours certificados: ballenas jorobadas, Isla de la Plata, snorkel y buceo en Parque Nacional Machalilla. Hospitalidad auténtica garantizada.",
    keywords: "hostal puerto lópez, hotel puerto lopez ecuador, hospedaje puerto lópez, habitación accesible pmr ecuador, alojamiento puerto lópez, hostal económico ecuador, tours ballenas jorobadas puerto lópez, isla de la plata tour, parque nacional machalilla, observación ballenas ecuador, snorkel puerto lópez, buceo isla plata, playa los frailes, agua blanca ecuador, tours lobo marino, hostal familiar ecuador, mirador vista al mar puerto lópez, cocina compartida puerto lópez, estacionamiento gratuito hostal",
    ogTitle: "Hostal Alcazaba & Lobo Marino | Puerto López Ecuador - Habitaciones Vista al Mar",
    ogDescription: "⭐4.6/5 - Hostal familiar con habitaciones accesibles PMR, cocina compartida gratis, mirador panorámico al Pacífico. Tours certificados: ballenas jorobadas, Isla de la Plata, snorkel, buceo. Tu experiencia está garantizada 🌊",
    twitterTitle: "Hostal Alcazaba & Lobo Marino | Puerto López Ecuador",
    twitterDescription: "⭐4.6/5 Hospitalidad auténtica + Tours ballenas jorobadas + Habitaciones PMR + Vista al mar 🌊"
  },
  en: {
    title: "Alcazaba Hostel & Lobo Marino | Puerto López Ecuador | Ocean View Rooms + Humpback Whale Tours",
    description: "⭐4.6/5 (188 reviews) Family-run hostel in Puerto López with accessible PMR rooms, free shared kitchen, free parking and viewpoint with panoramic Pacific views. Certified tours: humpback whales, Isla de la Plata, snorkeling and diving in Machalilla National Park. Authentic hospitality guaranteed.",
    keywords: "puerto lopez hostel, puerto lopez hotel ecuador, puerto lopez accommodation, accessible pmr room ecuador, budget hostel ecuador, humpback whale tours puerto lopez, isla de la plata tour, machalilla national park, whale watching ecuador, puerto lopez snorkeling, isla plata diving, los frailes beach, agua blanca ecuador, lobo marino tours, family hostel ecuador, ocean view terrace puerto lopez, shared kitchen puerto lopez, free parking hostel",
    ogTitle: "Alcazaba Hostel & Lobo Marino | Puerto López Ecuador - Ocean View Rooms",
    ogDescription: "⭐4.6/5 - Family hostel with accessible PMR rooms, free shared kitchen, panoramic Pacific viewpoint. Certified tours: humpback whales, Isla de la Plata, snorkeling, diving. Your experience is guaranteed 🌊",
    twitterTitle: "Alcazaba Hostel & Lobo Marino | Puerto López Ecuador",
    twitterDescription: "⭐4.6/5 Authentic hospitality + Humpback whale tours + PMR rooms + Ocean view 🌊"
  },
  fr: {
    title: "Auberge Alcazaba & Lobo Marino | Puerto López Équateur | Chambres Vue Mer + Tours Baleines à Bosse",
    description: "⭐4.6/5 (188 avis) Auberge familiale à Puerto López avec chambres accessibles PMR, cuisine partagée gratuite, parking gratuit et mirador avec vue panoramique sur le Pacifique. Tours certifiés : baleines à bosse, Isla de la Plata, snorkeling et plongée au Parc National Machalilla. Hospitalité authentique garantie.",
    keywords: "auberge puerto lópez, hôtel puerto lopez équateur, hébergement puerto lópez, chambre accessible pmr équateur, auberge économique équateur, tours baleines à bosse puerto lópez, tour isla de la plata, parc national machalilla, observation baleines équateur, snorkeling puerto lópez, plongée isla plata, plage los frailes, agua blanca équateur, tours lobo marino, auberge familiale équateur, terrasse vue mer puerto lopez, cuisine partagée puerto lópez, parking gratuit auberge",
    ogTitle: "Auberge Alcazaba & Lobo Marino | Puerto López Équateur - Chambres Vue Mer",
    ogDescription: "⭐4.6/5 - Auberge familiale avec chambres accessibles PMR, cuisine partagée gratuite, mirador panoramique Pacifique. Tours certifiés : baleines à bosse, Isla de la Plata, snorkeling, plongée. Votre expérience est garantie 🌊",
    twitterTitle: "Auberge Alcazaba & Lobo Marino | Puerto López Équateur",
    twitterDescription: "⭐4.6/5 Hospitalité authentique + Tours baleines à bosse + Chambres PMR + Vue mer 🌊"
  }
};

export default function DynamicMetaTags() {
  const { language } = useLanguage();

  useEffect(() => {
    const currentMeta = metaTags[language];

    // Update document title
    document.title = currentMeta.title;

    // Helper function to update meta tag
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update standard meta tags
    updateMetaTag('description', currentMeta.description);
    updateMetaTag('keywords', currentMeta.keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', currentMeta.ogTitle, true);
    updateMetaTag('og:description', currentMeta.ogDescription, true);
    updateMetaTag('og:locale', language === 'es' ? 'es_EC' : language === 'en' ? 'en_US' : 'fr_FR', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:title', currentMeta.twitterTitle, true);
    updateMetaTag('twitter:description', currentMeta.twitterDescription, true);

    // Update canonical URL with language parameter
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://hotelpuertolopez.com/?lang=${language}`;

    // Update hreflang tags
    updateHreflangTags();

  }, [language]);

  return null; // This component doesn't render anything
}

function updateHreflangTags() {
  // Remove existing hreflang tags
  const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingHreflang.forEach(link => link.remove());

  // Add new hreflang tags
  const languages = [
    { code: 'es', url: 'https://hotelpuertolopez.com/?lang=es' },
    { code: 'en', url: 'https://hotelpuertolopez.com/?lang=en' },
    { code: 'fr', url: 'https://hotelpuertolopez.com/?lang=fr' },
    { code: 'x-default', url: 'https://hotelpuertolopez.com/' }
  ];

  languages.forEach(({ code, url }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = code;
    link.href = url;
    document.head.appendChild(link);
  });
}