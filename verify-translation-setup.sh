#!/bin/bash

# Script de vérification de l'installation du système de traduction
# Vérifie que tous les fichiers nécessaires sont présents

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Vérification Système de Traduction           ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Fonction de vérification de fichier
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description"
        echo -e "  ${BLUE}→${NC} $file"
        return 0
    else
        echo -e "${RED}✗${NC} $description"
        echo -e "  ${RED}→ Manquant:${NC} $file"
        ((ERRORS++))
        return 1
    fi
}

# Fonction de vérification de contenu
check_content() {
    local file=$1
    local search_string=$2
    local description=$3
    
    if [ -f "$file" ] && grep -q "$search_string" "$file"; then
        echo -e "${GREEN}✓${NC} $description"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} $description"
        ((WARNINGS++))
        return 1
    fi
}

echo -e "${YELLOW}1. Vérification des fichiers essentiels${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file "src/contexts/LanguageContext.tsx" "Contexte de langue"
check_file "src/hooks/useTranslation.ts" "Hook de traduction"
check_file "src/data/translations.json" "Fichier de traductions"
check_file "src/components/LanguageSelector.tsx" "Sélecteur de langue"

echo ""
echo -e "${YELLOW}2. Vérification du fichier main.tsx${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file "src/main.tsx" "Fichier main.tsx"
check_content "src/main.tsx" "LanguageProvider" "LanguageProvider importé dans main.tsx"

echo ""
echo -e "${YELLOW}3. Vérification des traductions${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/data/translations.json" ]; then
    check_content "src/data/translations.json" '"es"' "Traductions espagnoles"
    check_content "src/data/translations.json" '"en"' "Traductions anglaises"
    check_content "src/data/translations.json" '"fr"' "Traductions françaises"
    
    check_content "src/data/translations.json" '"nav"' "Section navigation"
    check_content "src/data/translations.json" '"hero"' "Section hero"
    check_content "src/data/translations.json" '"features"' "Section features"
    check_content "src/data/translations.json" '"rooms"' "Section rooms"
    check_content "src/data/translations.json" '"tours"' "Section tours"
fi

echo ""
echo -e "${YELLOW}4. Vérification des composants exemple${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if check_file "src/components/Hero.tsx" "Hero.tsx"; then
    check_content "src/components/Hero.tsx" "useTranslation" "Hero utilise useTranslation"
    check_content "src/components/Hero.tsx" "LanguageSelector" "Hero inclut LanguageSelector"
fi

echo ""
echo -e "${YELLOW}5. Vérification de la structure${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -d "src/contexts" ] && echo -e "${GREEN}✓${NC} Dossier contexts/ existe" || echo -e "${RED}✗${NC} Dossier contexts/ manquant" && ((ERRORS++))
[ -d "src/hooks" ] && echo -e "${GREEN}✓${NC} Dossier hooks/ existe" || echo -e "${RED}✗${NC} Dossier hooks/ manquant" && ((ERRORS++))
[ -d "src/data" ] && echo -e "${GREEN}✓${NC} Dossier data/ existe" || echo -e "${RED}✗${NC} Dossier data/ manquant" && ((ERRORS++))
[ -d "src/components" ] && echo -e "${GREEN}✓${NC} Dossier components/ existe" || echo -e "${RED}✗${NC} Dossier components/ manquant" && ((ERRORS++))

echo ""
echo -e "${YELLOW}6. Composants à mettre à jour${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

COMPONENTS=(
    "About.tsx"
    "Features.tsx"
    "Rooms.tsx"
    "Tours.tsx"
    "LocalGuide.tsx"
    "Testimonials.tsx"
    "FAQ.tsx"
    "Footer.tsx"
    "FloatingWhatsApp.tsx"
)

UPDATED=0
PENDING=0

for component in "${COMPONENTS[@]}"; do
    if [ -f "src/components/$component" ]; then
        if grep -q "useTranslation" "src/components/$component"; then
            echo -e "${GREEN}✓${NC} $component (mis à jour)"
            ((UPDATED++))
        else
            echo -e "${YELLOW}⚠${NC} $component (à mettre à jour)"
            ((PENDING++))
        fi
    else
        echo -e "${BLUE}ℹ${NC} $component (non trouvé)"
    fi
done

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              RÉSUMÉ DE LA VÉRIFICATION         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Installation parfaite !${NC}"
    echo "  Tous les fichiers essentiels sont présents."
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Installation presque complète${NC}"
    echo "  Fichiers essentiels : OK"
    echo "  Avertissements : $WARNINGS"
else
    echo -e "${RED}✗ Installation incomplète${NC}"
    echo "  Erreurs : $ERRORS"
    echo "  Avertissements : $WARNINGS"
fi

echo ""
echo -e "${BLUE}Composants mis à jour : ${GREEN}$UPDATED${NC}"
echo -e "${BLUE}Composants à mettre à jour : ${YELLOW}$PENDING${NC}"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              PROCHAINES ÉTAPES                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}1. Installez les fichiers manquants${NC}"
    echo "   Consultez README_TRADUCTION.md pour les instructions"
    echo ""
fi

if [ $PENDING -gt 0 ]; then
    echo -e "${YELLOW}2. Mettez à jour les composants restants${NC}"
    echo "   Consultez GUIDE_TRADUCTION.md pour des exemples"
    echo ""
fi

echo -e "${GREEN}3. Testez le système${NC}"
echo "   npm run dev"
echo "   Changez de langue avec le sélecteur"
echo ""

echo -e "${BLUE}4. Documentation disponible${NC}"
echo "   - README_TRADUCTION.md (Installation rapide)"
echo "   - GUIDE_TRADUCTION.md (Guide détaillé)"
echo ""

if [ $ERRORS -eq 0 ]; then
    exit 0
else
    exit 1
fi