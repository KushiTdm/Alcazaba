#!/bin/bash

# Script de correction automatique des erreurs TypeScript
# Remplace les fichiers problématiques par les versions corrigées

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Correction Automatique des Erreurs         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
    exit 1
fi

echo -e "${YELLOW}Ce script va corriger les erreurs TypeScript en remplaçant :${NC}"
echo -e "  1. ${BLUE}src/hooks/useTranslation.ts${NC}"
echo -e "  2. ${BLUE}src/contexts/LanguageContext.tsx${NC}"
echo ""

# Demander confirmation
read -p "Voulez-vous continuer? (oui/non): " confirm

if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ] && [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo -e "\n${YELLOW}Opération annulée${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Correction en cours...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Créer un backup
BACKUP_DIR="./backup_before_fix_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}1. Création du backup...${NC}"
if [ -f "src/hooks/useTranslation.ts" ]; then
    cp src/hooks/useTranslation.ts "$BACKUP_DIR/"
    echo -e "${GREEN}✓${NC} useTranslation.ts sauvegardé"
fi

if [ -f "src/contexts/LanguageContext.tsx" ]; then
    cp src/contexts/LanguageContext.tsx "$BACKUP_DIR/"
    echo -e "${GREEN}✓${NC} LanguageContext.tsx sauvegardé"
fi

echo -e "${BLUE}Backup créé dans: $BACKUP_DIR${NC}"
echo ""

# Corriger useTranslation.ts
echo -e "${YELLOW}2. Correction de useTranslation.ts...${NC}"

cat > src/hooks/useTranslation.ts << 'EOF'
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
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} useTranslation.ts corrigé"
else
    echo -e "${RED}✗${NC} Erreur lors de la correction de useTranslation.ts"
    exit 1
fi

echo ""

# Corriger LanguageContext.tsx
echo -e "${YELLOW}3. Correction de LanguageContext.tsx...${NC}"

cat > src/contexts/LanguageContext.tsx << 'EOF'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    return saved || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return key; // Cette fonction sera utilisée par les composants
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} LanguageContext.tsx corrigé"
else
    echo -e "${RED}✗${NC} Erreur lors de la correction de LanguageContext.tsx"
    exit 1
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ CORRECTION TERMINÉE AVEC SUCCÈS !${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}📋 Résumé:${NC}"
echo -e "  ✓ useTranslation.ts corrigé"
echo -e "  ✓ LanguageContext.tsx corrigé"
echo -e "  ✓ Backup créé: ${BLUE}$BACKUP_DIR${NC}"
echo ""

echo -e "${YELLOW}🎯 Prochaines étapes:${NC}"
echo -e "  1. ${BLUE}Redémarrez le serveur de développement:${NC}"
echo -e "     ${BOLD}npm run dev${NC}"
echo ""
echo -e "  2. ${BLUE}Vérifiez qu'il n'y a plus d'erreurs TypeScript${NC}"
echo ""
echo -e "  3. ${BLUE}Testez le changement de langue${NC}"
echo ""

echo -e "${GREEN}💡 Astuce:${NC} Si VS Code affiche encore des erreurs,"
echo -e "    rechargez la fenêtre avec ${BOLD}Cmd+Shift+P${NC} → ${BOLD}Reload Window${NC}"
echo ""

exit 0