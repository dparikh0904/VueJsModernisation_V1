#!/bin/bash

# Argon Design System - Deployment Script
# Usage: ./scripts/deploy.sh [development|production]

set -e

ENVIRONMENT=${1:-development}
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=========================================="
echo "Argon Design System - Deployment Script"
echo "Environment: $ENVIRONMENT"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_info "Prerequisites check passed!"
}

# Generate secure secrets
generate_secrets() {
    if [ "$ENVIRONMENT" = "production" ]; then
        log_info "Generating secure secrets for production..."
        
        JWT_ACCESS_SECRET=$(openssl rand -base64 32)
        JWT_REFRESH_SECRET=$(openssl rand -base64 32)
        COOKIE_SECRET=$(openssl rand -base64 32)
        DB_PASSWORD=$(openssl rand -base64 16)
        
        export JWT_ACCESS_SECRET
        export JWT_REFRESH_SECRET
        export COOKIE_SECRET
        export DB_PASSWORD
        
        log_info "Secrets generated successfully"
    fi
}

# Create environment files
setup_environment() {
    log_info "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
        cp "$PROJECT_ROOT/backend/.env.example" "$PROJECT_ROOT/backend/.env"
        log_info "Created backend/.env from example"
    fi
    
    # Frontend .env
    if [ ! -f "$PROJECT_ROOT/frontend/.env" ]; then
        cp "$PROJECT_ROOT/frontend/.env.example" "$PROJECT_ROOT/frontend/.env" 2>/dev/null || \
        echo "VITE_API_BASE_URL=http://localhost:3000" > "$PROJECT_ROOT/frontend/.env"
        log_info "Created frontend/.env"
    fi
}

# Deploy with Docker Compose
deploy_docker() {
    log_info "Deploying with Docker Compose..."
    
    cd "$PROJECT_ROOT"
    
    # Stop existing containers
    docker-compose down 2>/dev/null || true
    
    # Build and start
    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
    else
        docker-compose up -d --build
    fi
    
    log_info "Waiting for services to be ready..."
    sleep 10
    
    # Health check
    check_health
}

# Health check
check_health() {
    log_info "Running health checks..."
    
    # Check PostgreSQL
    if docker exec argon-postgres pg_isready -U postgres &> /dev/null; then
        log_info "✓ PostgreSQL is healthy"
    else
        log_warn "✗ PostgreSQL health check failed"
    fi
    
    # Check Backend
    if curl -s http://localhost:3000/api/health &> /dev/null || curl -s http://localhost:3000 &> /dev/null; then
        log_info "✓ Backend is healthy"
    else
        log_warn "✗ Backend health check failed (may still be starting)"
    fi
    
    # Check Frontend
    if curl -s http://localhost:5173 &> /dev/null; then
        log_info "✓ Frontend is healthy"
    else
        log_warn "✗ Frontend health check failed (may still be starting)"
    fi
}

# Print access information
print_access_info() {
    echo ""
    echo "=========================================="
    echo "Deployment Complete!"
    echo "=========================================="
    echo ""
    echo "Access the application:"
    echo "  Frontend: http://localhost:5173"
    echo "  Backend:  http://localhost:3000"
    echo ""
    echo "Default test credentials:"
    echo "  Email:    test@test.com"
    echo "  Password: password123"
    echo ""
    echo "Useful commands:"
    echo "  View logs:     docker-compose logs -f"
    echo "  Stop:          docker-compose down"
    echo "  Restart:       docker-compose restart"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    generate_secrets
    setup_environment
    deploy_docker
    print_access_info
}

main "$@"
