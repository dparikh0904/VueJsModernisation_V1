#!/bin/bash

# Argon Design System - Local Setup Script (Without Docker)
# Usage: ./scripts/setup-local.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=========================================="
echo "Argon Design System - Local Setup"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check Node.js
check_node() {
    log_info "Checking Node.js..."
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 20+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_error "Node.js version 18+ required. Current: $(node -v)"
        exit 1
    fi
    log_info "Node.js $(node -v) ✓"
}

# Check PostgreSQL
check_postgres() {
    log_info "Checking PostgreSQL..."
    if ! command -v psql &> /dev/null; then
        log_warn "PostgreSQL CLI not found. Make sure PostgreSQL is running."
        return
    fi
    log_info "PostgreSQL CLI found ✓"
}

# Setup Backend
setup_backend() {
    log_info "Setting up backend..."
    cd "$PROJECT_ROOT/backend"
    
    # Create .env if not exists
    if [ ! -f .env ]; then
        cp .env.example .env
        log_info "Created backend/.env from example"
    fi
    
    # Install dependencies
    log_info "Installing backend dependencies..."
    npm install
    
    log_info "Backend setup complete ✓"
}

# Setup Frontend
setup_frontend() {
    log_info "Setting up frontend..."
    cd "$PROJECT_ROOT/frontend"
    
    # Create .env if not exists
    if [ ! -f .env ]; then
        echo "VITE_API_BASE_URL=http://localhost:3000" > .env
        log_info "Created frontend/.env"
    fi
    
    # Install dependencies
    log_info "Installing frontend dependencies..."
    npm install
    
    log_info "Frontend setup complete ✓"
}

# Print instructions
print_instructions() {
    echo ""
    echo "=========================================="
    echo "Setup Complete!"
    echo "=========================================="
    echo ""
    echo "To start the application:"
    echo ""
    echo "1. Start PostgreSQL (if not running):"
    echo "   # Using Docker:"
    echo "   docker run -d --name argon-postgres \\"
    echo "     -e POSTGRES_DB=argon_db \\"
    echo "     -e POSTGRES_USER=postgres \\"
    echo "     -e POSTGRES_PASSWORD=postgres \\"
    echo "     -p 5432:5432 postgres:16-alpine"
    echo ""
    echo "2. Start the backend (Terminal 1):"
    echo "   cd backend && npm run dev"
    echo ""
    echo "3. Start the frontend (Terminal 2):"
    echo "   cd frontend && npm run dev"
    echo ""
    echo "4. Open http://localhost:5173 in your browser"
    echo ""
    echo "Test credentials:"
    echo "  Email:    test@test.com"
    echo "  Password: password123"
    echo ""
}

# Main
main() {
    check_node
    check_postgres
    setup_backend
    setup_frontend
    print_instructions
}

main "$@"
