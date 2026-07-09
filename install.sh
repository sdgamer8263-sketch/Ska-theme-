#!/bin/bash

# ==============================================================================
# Ultimate Pterodactyl Theme & Addon Suite - Installer
# Compatible with Pterodactyl 1.14.x
# ==============================================================================

set -e

# Variables
THEME_DOWNLOAD_URL="https://example.com/api/v1/download/ultimate-theme.tar.gz" # Replace with actual URL
PANEL_DIR="/var/www/pterodactyl"
BACKUP_DIR="/var/www/pterodactyl/theme_backup_$(date +%Y%m%d_%H%M%S)"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Ultimate Theme Installation...${NC}"

# 1. Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root.${NC}"
  exit 1
fi

# 2. Check if Pterodactyl is installed
if [ ! -d "$PANEL_DIR" ]; then
  echo -e "${RED}Pterodactyl installation not found at $PANEL_DIR${NC}"
  exit 1
fi

cd "$PANEL_DIR"

# 3. Enter Maintenance Mode
echo -e "${YELLOW}Putting panel into maintenance mode...${NC}"
php artisan down

# 4. Create Backup
echo -e "${YELLOW}Creating backup of existing files...${NC}"
mkdir -p "$BACKUP_DIR"
cp -r resources/ "$BACKUP_DIR/"
cp -r app/ "$BACKUP_DIR/"
cp -r routes/ "$BACKUP_DIR/"
cp -r database/ "$BACKUP_DIR/"
echo -e "${GREEN}Backup created at $BACKUP_DIR${NC}"

# 5. Download Theme Files
echo -e "${YELLOW}Downloading theme files...${NC}"
curl -s -L "$THEME_DOWNLOAD_URL" -o ultimate-theme.tar.gz
tar -xzvf ultimate-theme.tar.gz
rm ultimate-theme.tar.gz

# 6. Install Dependencies
echo -e "${YELLOW}Installing node dependencies...${NC}"
yarn install --frozen-lockfile

# 7. Run Migrations
echo -e "${YELLOW}Running database migrations...${NC}"
php artisan migrate --force

# 8. Build Production Assets
echo -e "${YELLOW}Building React frontend assets (this may take a few minutes)...${NC}"
yarn build:production

# 9. Clear Caches
echo -e "${YELLOW}Clearing application caches...${NC}"
php artisan view:clear
php artisan config:clear
php artisan route:clear
php artisan cache:clear

# 10. Set Permissions
echo -e "${YELLOW}Setting correct permissions...${NC}"
chown -R www-data:www-data "$PANEL_DIR"/*

# 11. Exit Maintenance Mode
echo -e "${YELLOW}Bringing panel back online...${NC}"
php artisan up

echo -e "${GREEN}======================================================${NC}"
echo -e "${GREEN}Installation Complete!${NC}"
echo -e "${GREEN}You can now access the Theme Editor in the Admin Panel.${NC}"
echo -e "${GREEN}======================================================${NC}"
