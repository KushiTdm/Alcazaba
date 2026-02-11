#!/bin/bash

# Script de mise à jour des références d'images dans le code
# Remplace les extensions .jpg, .jpeg, .png par .webp

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   Mise à jour des références d'images${NC}"
echo -e "${BLUE}================================================${NC}\n"

# Créer une sauvegarde des fichiers de code
BACKUP_CODE_DIR="./backup_code_before_update"
mkdir -p "$BACKUP_CODE_DIR"

echo -e "${YELLOW}Sauvegarde des fichiers de code...${NC}"
cp -r src "$BACKUP_CODE_DIR/"
cp index.html "$BACKUP_CODE_DIR/"

# Compteur de modifications
TOTAL_CHANGES=0

# Fonction pour remplacer les extensions dans un fichier
update_file() {
    local file=$1
    local changes=0
    
    # Remplacer .jpg par .webp
    if sed -i.bak 's/\.jpg/.webp/g' "$file" 2>/dev/null; then
        changes=$((changes + $(diff "$file.bak" "$file" | grep -c "^<")))
    fi
    
    # Remplacer .jpeg par .webp
    if sed -i.bak 's/\.jpeg/.webp/g' "$file" 2>/dev/null; then
        changes=$((changes + $(diff "$file.bak" "$file" | grep -c "^<")))
    fi
    
    # Remplacer .png par .webp (sauf pour les logos/icônes)
    if sed -i.bak 's/\.png/.webp/g' "$file" 2>/dev/null; then
        changes=$((changes + $(diff "$file.bak" "$file" | grep -c "^<")))
    fi
    
    # Supprimer le fichier de backup
    rm -f "$file.bak"
    
    if [ $changes -gt 0 ]; then
        echo -e "${GREEN}  ✓ $file : $changes modification(s)${NC}"
        TOTAL_CHANGES=$((TOTAL_CHANGES + changes))
    fi
}

# Parcourir tous les fichiers TSX, JSON et HTML
echo -e "\n${BLUE}Mise à jour des fichiers...${NC}\n"

# Fichiers TypeScript/React
while IFS= read -r -d '' file; do
    update_file "$file"
done < <(find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0)

# Fichier JSON de données
if [ -f "src/data/hotelData.json" ]; then
    update_file "src/data/hotelData.json"
fi

# Fichier HTML
if [ -f "index.html" ]; then
    update_file "index.html"
fi

echo -e "\n${BLUE}================================================${NC}"
echo -e "${GREEN}✓ Mise à jour terminée !${NC}"
echo -e "${GREEN}Total de modifications: $TOTAL_CHANGES${NC}"
echo -e "${YELLOW}Backup du code original: $BACKUP_CODE_DIR${NC}"
echo -e "${BLUE}================================================${NC}\n"

echo -e "${YELLOW}⚠️  N'oubliez pas de:${NC}"
echo -e "  1. Tester votre site localement"
echo -e "  2. Vérifier que toutes les images s'affichent correctement"
echo -e "  3. Commiter les changements dans Git\n"