#!/bin/bash

# Script maître d'optimisation complète
# 1. Compression des médias
# 2. Mise à jour des références dans le code
# 3. Rapport final

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║       OPTIMISATION COMPLÈTE - HOSTAL ALCAZABA        ║
║                                                       ║
║   Script automatique de compression et optimisation  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
    echo -e "${YELLOW}Assurez-vous d'être dans le dossier contenant package.json${NC}"
    exit 1
fi

# Menu de confirmation
echo -e "${YELLOW}Ce script va:${NC}"
echo -e "  1. ${BLUE}Compresser toutes les images${NC} (JPEG/PNG → WebP)"
echo -e "  2. ${BLUE}Compresser toutes les vidéos${NC} (MP4 optimisé)"
echo -e "  3. ${BLUE}Mettre à jour le code${NC} (références d'images)"
echo -e "  4. ${BLUE}Créer des backups${NC} de tout\n"

echo -e "${RED}⚠️  Les fichiers originaux seront sauvegardés mais modifiés${NC}\n"

read -p "Voulez-vous continuer? (oui/non): " confirm

if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ] && [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo -e "\n${YELLOW}Opération annulée${NC}"
    exit 0
fi

echo -e "\n${BOLD}${GREEN}🚀 Démarrage de l'optimisation...${NC}\n"
sleep 1

# ÉTAPE 1: Compression des médias
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}   ÉTAPE 1/3 : Compression des médias${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

if [ -f "./compress-media.sh" ]; then
    ./compress-media.sh
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✓ Compression des médias terminée${NC}\n"
    else
        echo -e "\n${RED}✗ Erreur lors de la compression${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Script compress-media.sh introuvable${NC}"
    exit 1
fi

sleep 2

# ÉTAPE 2: Mise à jour des références
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}   ÉTAPE 2/3 : Mise à jour du code${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

if [ -f "./update-image-refs.sh" ]; then
    ./update-image-refs.sh
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✓ Mise à jour des références terminée${NC}\n"
    else
        echo -e "\n${RED}✗ Erreur lors de la mise à jour${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Script update-image-refs.sh introuvable${NC}"
    exit 1
fi

sleep 2

# ÉTAPE 3: Rapport final et tests
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}   ÉTAPE 3/3 : Rapport final${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Calculer les statistiques
echo -e "${GREEN}📊 Statistiques des fichiers:${NC}\n"

WEBP_COUNT=$(find public/images -name "*.webp" 2>/dev/null | wc -l)
echo -e "  • Images WebP: ${BOLD}$WEBP_COUNT${NC}"

VIDEO_COUNT=$(find public/videos -name "*.mp4" 2>/dev/null | wc -l)
echo -e "  • Vidéos MP4: ${BOLD}$VIDEO_COUNT${NC}"

if [ -d "backup_original_media" ]; then
    BACKUP_SIZE=$(du -sh backup_original_media 2>/dev/null | cut -f1)
    echo -e "  • Taille backup: ${BOLD}$BACKUP_SIZE${NC}"
fi

CURRENT_SIZE=$(du -sh public 2>/dev/null | cut -f1)
echo -e "  • Taille actuelle /public: ${BOLD}$CURRENT_SIZE${NC}"

echo -e "\n${GREEN}📁 Backups créés:${NC}\n"
echo -e "  • ${YELLOW}backup_original_media/${NC} - Médias originaux"
echo -e "  • ${YELLOW}backup_code_before_update/${NC} - Code original"

echo -e "\n${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${GREEN}✅ OPTIMISATION TERMINÉE AVEC SUCCÈS !${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${YELLOW}📝 Prochaines étapes:${NC}\n"
echo -e "  1. ${BLUE}Testez votre site localement:${NC}"
echo -e "     ${BOLD}npm run dev${NC}\n"

echo -e "  2. ${BLUE}Vérifiez que toutes les images s'affichent correctement${NC}\n"

echo -e "  3. ${BLUE}Committez les changements:${NC}"
echo -e "     ${BOLD}git add .${NC}"
echo -e "     ${BOLD}git commit -m \"Optimisation: conversion images WebP et compression vidéos\"${NC}"
echo -e "     ${BOLD}git push${NC}\n"

echo -e "  4. ${BLUE}Déployez sur Netlify${NC}\n"

echo -e "${GREEN}💡 Conseil:${NC} Gardez les backups jusqu'à ce que vous ayez vérifié"
echo -e "    que tout fonctionne correctement en production.\n"

echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"