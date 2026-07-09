#!/bin/bash
# ==============================================================================
# Pterodactyl Theme Suite - Automated Setup & Reinstallation Script
# ==============================================================================
# This script handles environment detection, dependencies (PHP, Composer, Yarn),
# and provides a menu-driven interface for initial setup or forced reinstallation.
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PANEL_DIR="/var/www/pterodactyl"

echo -e "${CYAN}========================================================================${NC}"
echo -e "${CYAN}        Pterodactyl Theme Suite - Automated Environment Setup           ${NC}"
echo -e "${CYAN}========================================================================${NC}"
echo ""

# 1. Environment Detection
check_dependencies() {
    echo -e "${YELLOW}Checking required dependencies...${NC}"

    if ! command -v php &> /dev/null; then
        echo -e "${RED}Error: PHP is not installed. Please install PHP 8.1+.${NC}"
        exit 1
    fi

    if ! command -v composer &> /dev/null; then
        echo -e "${RED}Error: Composer is not installed. Please install Composer.${NC}"
        exit 1
    fi

    if ! command -v yarn &> /dev/null; then
        echo -e "${YELLOW}Yarn is not installed. Installing via npm...${NC}"
        if ! command -v npm &> /dev/null; then
            echo -e "${RED}Error: Node.js/NPM is not installed. Please install Node.js 16+.${NC}"
            exit 1
        fi
        npm install -g yarn
    fi

    if [ ! -d "$PANEL_DIR" ]; then
        echo -e "${RED}Error: Pterodactyl panel directory not found at $PANEL_DIR${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ All dependencies found.${NC}"
}

run_installation() {
    local force=$1
    echo -e "${YELLOW}Starting installation process...${NC}"
    cd "$PANEL_DIR"

    if [ "$force" = true ]; then
        echo -e "${CYAN}Force Reinstall: Clearing existing vendor and node_modules...${NC}"
        rm -rf vendor node_modules
    fi

    echo -e "${CYAN}Setting file permissions...${NC}"
    chown -R www-data:www-data "$PANEL_DIR"
    chmod -R 755 storage/* bootstrap/cache/

    echo -e "${CYAN}Installing PHP dependencies...${NC}"
    composer install --no-dev --optimize-autoloader

    echo -e "${CYAN}Installing Node dependencies...${NC}"
    yarn install --frozen-lockfile

    echo -e "${CYAN}Running database migrations...${NC}"
    php artisan down
    php artisan migrate --force

    echo -e "${CYAN}Building frontend assets...${NC}"
    yarn build:production

    echo -e "${CYAN}Optimizing panel...${NC}"
    php artisan view:clear
    php artisan config:clear
    php artisan route:clear
    php artisan optimize
    php artisan up

    echo -e "${GREEN}✓ Installation complete!${NC}"
}

show_menu() {
    echo -e "Please select an option:"
    echo "1. Initial Suite Setup"
    echo "2. Force Reinstall Core Assets"
    echo "3. Exit"
    read -p "Choice [1-3]: " choice

    case $choice in
        1)
            check_dependencies
            run_installation false
            ;;
        2)
            check_dependencies
            run_installation true
            ;;
        3)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option selected.${NC}"
            show_menu
            ;;
    esac
}

check_dependencies
show_menu
