#!/bin/bash

# Script de compression et conversion d'images et vidéos
# Images: conversion en WebP avec compression optimale
# Vidéos: conversion en H.265 (HEVC) pour une meilleure compression

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   Script de Compression Media - Hostal Alcazaba${NC}"
echo -e "${BLUE}================================================${NC}\n"

# Vérification des dépendances
check_dependencies() {
    echo -e "${YELLOW}Vérification des dépendances...${NC}"
    
    MISSING_DEPS=()
    
    if ! command -v cwebp &> /dev/null; then
        MISSING_DEPS+=("webp")
    fi
    
    if ! command -v ffmpeg &> /dev/null; then
        MISSING_DEPS+=("ffmpeg")
    fi
    
    if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
        echo -e "${RED}Dépendances manquantes: ${MISSING_DEPS[*]}${NC}"
        echo -e "${YELLOW}Installation des dépendances...${NC}"
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            brew install webp ffmpeg
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            sudo apt-get update
            sudo apt-get install -y webp ffmpeg
        fi
    else
        echo -e "${GREEN}✓ Toutes les dépendances sont installées${NC}\n"
    fi
}

# Fonction de compression d'images
compress_images() {
    echo -e "${BLUE}=== Compression des images ===${NC}\n"
    
    # Créer un dossier de backup si nécessaire
    BACKUP_DIR="./backup_original_media"
    mkdir -p "$BACKUP_DIR/images"
    
    # Compteurs
    TOTAL_IMAGES=0
    CONVERTED_IMAGES=0
    TOTAL_SIZE_BEFORE=0
    TOTAL_SIZE_AFTER=0
    
    # Trouver toutes les images (JPEG, PNG, JPG)
    while IFS= read -r -d '' img; do
        ((TOTAL_IMAGES++))
        
        # Obtenir le nom du fichier sans extension
        DIR=$(dirname "$img")
        FILENAME=$(basename "$img")
        NAME="${FILENAME%.*}"
        EXT="${FILENAME##*.}"
        
        # Nouvelle extension WebP
        OUTPUT="${DIR}/${NAME}.webp"
        
        # Vérifier si le fichier WebP existe déjà
        if [ -f "$OUTPUT" ]; then
            echo -e "${YELLOW}⊘ Fichier WebP existe déjà: $OUTPUT${NC}"
            continue
        fi
        
        # Taille avant
        SIZE_BEFORE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        TOTAL_SIZE_BEFORE=$((TOTAL_SIZE_BEFORE + SIZE_BEFORE))
        
        echo -e "${BLUE}→ Conversion: $FILENAME → ${NAME}.webp${NC}"
        
        # Backup de l'original
        cp "$img" "$BACKUP_DIR/images/"
        
        # Conversion en WebP avec qualité optimale
        # -q 85 : qualité 85% (bon compromis qualité/taille)
        # -m 6 : méthode de compression maximale (plus lent mais meilleur résultat)
        cwebp -q 85 -m 6 "$img" -o "$OUTPUT" > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            # Taille après
            SIZE_AFTER=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT" 2>/dev/null)
            TOTAL_SIZE_AFTER=$((TOTAL_SIZE_AFTER + SIZE_AFTER))
            
            # Calculer le gain
            SIZE_BEFORE_KB=$((SIZE_BEFORE / 1024))
            SIZE_AFTER_KB=$((SIZE_AFTER / 1024))
            REDUCTION=$((100 - (SIZE_AFTER * 100 / SIZE_BEFORE)))
            
            echo -e "${GREEN}  ✓ $SIZE_BEFORE_KB KB → $SIZE_AFTER_KB KB (réduction: ${REDUCTION}%)${NC}"
            
            # Supprimer l'original après conversion réussie
            rm "$img"
            ((CONVERTED_IMAGES++))
        else
            echo -e "${RED}  ✗ Erreur lors de la conversion${NC}"
        fi
        
    done < <(find public/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)
    
    # Afficher les statistiques
    if [ $CONVERTED_IMAGES -gt 0 ]; then
        TOTAL_SIZE_BEFORE_MB=$((TOTAL_SIZE_BEFORE / 1024 / 1024))
        TOTAL_SIZE_AFTER_MB=$((TOTAL_SIZE_AFTER / 1024 / 1024))
        TOTAL_REDUCTION=$((100 - (TOTAL_SIZE_AFTER * 100 / TOTAL_SIZE_BEFORE)))
        
        echo -e "\n${GREEN}=== Résumé Images ===${NC}"
        echo -e "${GREEN}Images converties: $CONVERTED_IMAGES / $TOTAL_IMAGES${NC}"
        echo -e "${GREEN}Taille avant: ${TOTAL_SIZE_BEFORE_MB} MB${NC}"
        echo -e "${GREEN}Taille après: ${TOTAL_SIZE_AFTER_MB} MB${NC}"
        echo -e "${GREEN}Réduction totale: ${TOTAL_REDUCTION}%${NC}\n"
    else
        echo -e "${YELLOW}Aucune image à convertir${NC}\n"
    fi
}

# Fonction de compression de vidéos
compress_videos() {
    echo -e "${BLUE}=== Compression des vidéos ===${NC}\n"
    
    # Créer un dossier de backup si nécessaire
    mkdir -p "$BACKUP_DIR/videos"
    
    # Compteurs
    TOTAL_VIDEOS=0
    CONVERTED_VIDEOS=0
    TOTAL_VIDEO_SIZE_BEFORE=0
    TOTAL_VIDEO_SIZE_AFTER=0
    
    # Trouver toutes les vidéos MP4
    while IFS= read -r -d '' video; do
        ((TOTAL_VIDEOS++))
        
        # Obtenir le nom du fichier
        DIR=$(dirname "$video")
        FILENAME=$(basename "$video")
        NAME="${FILENAME%.*}"
        
        # Nom temporaire pour la nouvelle vidéo
        OUTPUT="${DIR}/${NAME}_compressed.mp4"
        
        # Taille avant
        SIZE_BEFORE=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
        TOTAL_VIDEO_SIZE_BEFORE=$((TOTAL_VIDEO_SIZE_BEFORE + SIZE_BEFORE))
        
        echo -e "${BLUE}→ Compression: $FILENAME${NC}"
        
        # Backup de l'original
        cp "$video" "$BACKUP_DIR/videos/"
        
        # Compression avec H.265 (HEVC) et optimisations web
        # -c:v libx265 : codec vidéo H.265 (meilleure compression que H.264)
        # -crf 28 : qualité constante (18-28 recommandé, 28 = bonne compression)
        # -preset medium : équilibre vitesse/compression
        # -c:a aac : codec audio AAC
        # -b:a 128k : bitrate audio 128kbps
        # -movflags +faststart : optimisation pour streaming web
        # -pix_fmt yuv420p : compatibilité maximale
        
        ffmpeg -i "$video" \
            -c:v libx264 -crf 23 -preset medium \
            -c:a aac -b:a 128k \
            -movflags +faststart \
            -pix_fmt yuv420p \
            -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
            "$OUTPUT" \
            -y > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            # Taille après
            SIZE_AFTER=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT" 2>/dev/null)
            TOTAL_VIDEO_SIZE_AFTER=$((TOTAL_VIDEO_SIZE_AFTER + SIZE_AFTER))
            
            # Calculer le gain
            SIZE_BEFORE_MB=$((SIZE_BEFORE / 1024 / 1024))
            SIZE_AFTER_MB=$((SIZE_AFTER / 1024 / 1024))
            REDUCTION=$((100 - (SIZE_AFTER * 100 / SIZE_BEFORE)))
            
            echo -e "${GREEN}  ✓ $SIZE_BEFORE_MB MB → $SIZE_AFTER_MB MB (réduction: ${REDUCTION}%)${NC}"
            
            # Remplacer l'original par la version compressée
            mv "$OUTPUT" "$video"
            ((CONVERTED_VIDEOS++))
        else
            echo -e "${RED}  ✗ Erreur lors de la compression${NC}"
            # Supprimer le fichier temporaire en cas d'erreur
            [ -f "$OUTPUT" ] && rm "$OUTPUT"
        fi
        
    done < <(find public/videos -type f -iname "*.mp4" -print0)
    
    # Afficher les statistiques
    if [ $CONVERTED_VIDEOS -gt 0 ]; then
        TOTAL_VIDEO_SIZE_BEFORE_MB=$((TOTAL_VIDEO_SIZE_BEFORE / 1024 / 1024))
        TOTAL_VIDEO_SIZE_AFTER_MB=$((TOTAL_VIDEO_SIZE_AFTER / 1024 / 1024))
        TOTAL_VIDEO_REDUCTION=$((100 - (TOTAL_VIDEO_SIZE_AFTER * 100 / TOTAL_VIDEO_SIZE_BEFORE)))
        
        echo -e "\n${GREEN}=== Résumé Vidéos ===${NC}"
        echo -e "${GREEN}Vidéos compressées: $CONVERTED_VIDEOS / $TOTAL_VIDEOS${NC}"
        echo -e "${GREEN}Taille avant: ${TOTAL_VIDEO_SIZE_BEFORE_MB} MB${NC}"
        echo -e "${GREEN}Taille après: ${TOTAL_VIDEO_SIZE_AFTER_MB} MB${NC}"
        echo -e "${GREEN}Réduction totale: ${TOTAL_VIDEO_REDUCTION}%${NC}\n"
    else
        echo -e "${YELLOW}Aucune vidéo à compresser${NC}\n"
    fi
}

# Fonction principale
main() {
    check_dependencies
    compress_images
    compress_videos
    
    echo -e "${BLUE}================================================${NC}"
    echo -e "${GREEN}✓ Compression terminée !${NC}"
    echo -e "${YELLOW}Les fichiers originaux sont sauvegardés dans: $BACKUP_DIR${NC}"
    echo -e "${BLUE}================================================${NC}"
}

# Exécution
main