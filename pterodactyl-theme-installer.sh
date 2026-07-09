#!/bin/bash
# ==============================================================================
# Pterodactyl Theme Suite - Auto Installer
# ==============================================================================
# This script handles automatic environment detection, file permissions, 
# dependency installation, and database migration triggering for the Theme Suite.
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PANEL_DIR="/var/www/pterodactyl"

echo -e "${CYAN}========================================================================${NC}"
echo -e "${CYAN}             Pterodactyl Theme Suite - Automated Installer              ${NC}"
echo -e "${CYAN}========================================================================${NC}"
echo ""

# 1. Environment Detection
echo -e "${YELLOW}[1/5] Detecting Pterodactyl installation environment...${NC}"

if [ ! -d "$PANEL_DIR" ]; then
    echo -e "${RED}Error: Pterodactyl panel directory not found at $PANEL_DIR${NC}"
    echo -e "${RED}Are you sure Pterodactyl is installed on this machine?${NC}"
    exit 1
fi

if [ ! -f "$PANEL_DIR/artisan" ]; then
    echo -e "${RED}Error: Artisan file not found. Ensure this is the correct Pterodactyl root.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Pterodactyl installation found.${NC}"

# 2. File Permissions Setup
echo -e "${YELLOW}[2/5] Setting up proper file permissions...${NC}"
cd "$PANEL_DIR"

chown -R www-data:www-data "$PANEL_DIR"
chmod -R 755 storage/* bootstrap/cache/

echo -e "${GREEN}✓ File permissions set.${NC}"

# 3. Dependency Installation
echo -e "${YELLOW}[3/5] Installing required dependencies (Yarn / Composer)...${NC}"

if ! command -v yarn &> /dev/null; then
    echo -e "${CYAN}Yarn not found. Installing via npm...${NC}"
    npm install -g yarn
fi

echo -e "${CYAN}Running yarn install...${NC}"
yarn install --frozen-lockfile

echo -e "${CYAN}Running composer install...${NC}"
composer install --no-dev --optimize-autoloader

echo -e "${GREEN}✓ Dependencies installed successfully.${NC}"

# 4. Database Migrations
echo -e "${YELLOW}[4/5] Running database migrations for the Theme Suite...${NC}"

php artisan down
php artisan migrate --force

echo -e "${GREEN}✓ Database migrations completed.${NC}"

# 5. Build Assets & Cache Clearing
echo -e "${YELLOW}[5/5] Building theme assets and clearing cache...${NC}"

echo -e "${CYAN}Building frontend assets (this may take a few minutes)...${NC}"
yarn build:production

echo -e "${CYAN}Clearing view cache...${NC}"
php artisan view:clear
echo -e "${CYAN}Clearing config cache...${NC}"
php artisan config:clear
php artisan route:clear

echo -e "${CYAN}Optimizing Laravel...${NC}"
php artisan optimize

php artisan up

echo -e "${GREEN}✓ Theme assets built and cache cleared.${NC}"
echo ""
echo -e "${CYAN}========================================================================${NC}"
echo -e "${GREEN}  Installation Complete! The Theme Suite is now active on your panel. ${NC}"
echo -e "${CYAN}========================================================================${NC}"
