# Argon Design System - Deployment Guide

This guide covers deploying the Argon Design System application on any machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Manual Setup](#manual-setup)
- [Production Deployment](#production-deployment)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For Docker Deployment (Recommended)
- Docker 20.10+
- Docker Compose 2.0+

### For Manual Deployment
- Node.js 20+
- PostgreSQL 16+
- npm 9+

---

## Quick Start with Docker

The fastest way to deploy on any machine:

```bash
# 1. Clone the repository
git clone <repository-url>
cd VueJsModernisation_V1-main

# 2. Run the deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Or manually with docker-compose
docker-compose up --build
```

**Services will be available at:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

**Default test credentials:**
- Email: `test@test.com`
- Password: `password123`

---

## Manual Setup

If Docker is not available, follow these steps:

### 1. Database Setup

**Option A: Using Docker for PostgreSQL only**
```bash
docker run -d --name argon-postgres \
  -e POSTGRES_DB=argon_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B: Native PostgreSQL**
```bash
# Create database
createdb argon_db

# Or via psql
psql -U postgres -c "CREATE DATABASE argon_db;"
```

### 2. Backend Setup

```bash
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# nano .env or vim .env

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Using the Setup Script

```bash
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh
```

---

## Production Deployment

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
# Static files output to dist/ folder
```

**Backend:**
```bash
cd backend
npm run build  # If TypeScript compilation needed
NODE_ENV=production npm start
```

### Serving the Frontend

The frontend build outputs static files that can be served by:

**Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Docker Production Build

```bash
# Use production compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## Environment Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Server
NODE_ENV=production
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=argon_db
DB_USER=postgres
DB_PASSWORD=your-secure-password

# JWT (Generate secure secrets for production!)
JWT_ACCESS_SECRET=generate-32-char-secret-here
JWT_REFRESH_SECRET=generate-32-char-secret-here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS (Update with your frontend URL)
CORS_ORIGIN=https://your-frontend-domain.com

# Security
COOKIE_SECRET=generate-32-char-secret-here
BCRYPT_ROUNDS=12
```

**Generate secure secrets:**
```bash
openssl rand -base64 32
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_APP_NAME=Argon Design System
```

---

## Cloud Deployment Options

### AWS
- **Frontend:** S3 + CloudFront
- **Backend:** EC2, ECS, or Lambda
- **Database:** RDS PostgreSQL

### Google Cloud
- **Frontend:** Cloud Storage + Cloud CDN
- **Backend:** Cloud Run or GKE
- **Database:** Cloud SQL PostgreSQL

### Azure
- **Frontend:** Blob Storage + CDN
- **Backend:** App Service or AKS
- **Database:** Azure Database for PostgreSQL

### Heroku
```bash
# Backend
heroku create argon-backend
heroku addons:create heroku-postgresql:hobby-dev
git subtree push --prefix backend heroku main

# Frontend (use Netlify/Vercel instead)
```

### Netlify (Frontend)
```bash
# Build command: npm run build
# Publish directory: dist
# Add _redirects file for SPA routing:
echo "/* /index.html 200" > frontend/public/_redirects
```

### Vercel (Frontend)
```bash
cd frontend
vercel
```

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Database connection failed:**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check PostgreSQL logs
docker logs argon-postgres

# Test connection
psql -h localhost -U postgres -d argon_db
```

**CORS errors:**
- Ensure `CORS_ORIGIN` in backend matches your frontend URL exactly
- Include protocol (http:// or https://)

**Login not working:**
1. Check backend is running: `curl http://localhost:3000`
2. Check database has users: `docker exec argon-postgres psql -U postgres -d argon_db -c "SELECT * FROM users;"`
3. Check browser console for errors

### Logs

```bash
# Docker logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# Frontend logs only
docker-compose logs -f frontend
```

### Reset Everything

```bash
# Stop and remove all containers
docker-compose down -v

# Remove database volume (WARNING: deletes all data)
docker volume rm vuejsmodernisation_v1-main_postgres_data

# Rebuild from scratch
docker-compose up --build
```

---

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs
3. Open an issue in the repository
