# ArtisAuc Deployment Guide

## Overview
Instructions for deploying ArtisAuc auction platform in development and production environments.

---

## Development Deployment

### Local Development Server

**Port**: 3002

**Start Server**:
```bash
cd F:\ArtisAuc
npm install
npm run dev
```

**Access**:
- Local: http://localhost:3002
- Network: http://[your-ip]:3002

**Features**:
- Hot reload enabled
- React Fast Refresh
- Development error overlay
- Source maps for debugging

---

## Production Deployment

### Build for Production

**Step 1: Install Dependencies**
```bash
cd F:\ArtisAuc
npm install --production
```

**Step 2: Build Application**
```bash
npm run build
```

This creates an optimized production build in `.next/` folder.

**Step 3: Start Production Server**
```bash
npm start
```

Default port is 3000 (can be changed with `-p` flag).

---

## Deployment Options

### Option 1: Node.js Server (Self-Hosted)

**Requirements**:
- Node.js v18+
- PM2 (process manager)

**Install PM2**:
```bash
npm install -g pm2
```

**Start with PM2**:
```bash
cd F:\ArtisAuc
pm2 start npm --name "artisauc" -- start
pm2 save
pm2 startup
```

**PM2 Commands**:
```bash
pm2 status                  # Check status
pm2 logs artisauc          # View logs
pm2 restart artisauc       # Restart app
pm2 stop artisauc          # Stop app
```

---

### Option 2: Vercel (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd F:\ArtisAuc
vercel
```

Follow prompts to link project and deploy.

**Production Deploy**:
```bash
vercel --prod
```

**Environment Variables**:
Set in Vercel dashboard or via CLI:
```bash
vercel env add NEXT_PUBLIC_API_URL
```

---

### Option 3: Docker

**Create Dockerfile**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Build Image**:
```bash
docker build -t artisauc:latest .
```

**Run Container**:
```bash
docker run -d -p 3000:3000 --name artisauc artisauc:latest
```

---

## Environment Configuration

### Development (.env.local)
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Production (.env.production)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm start`
- [ ] Verify all environment variables are set
- [ ] Check all images and assets load correctly
- [ ] Test on multiple browsers
- [ ] Verify API endpoints work in production
- [ ] Configure domain/DNS settings
- [ ] Set up SSL certificate (HTTPS)
- [ ] Enable monitoring/logging

---

## Performance Optimization

**Image Optimization**:
- Use Next.js `<Image>` component
- Serve images in WebP format
- Implement lazy loading

**Code Splitting**:
- Automatic with Next.js
- Use dynamic imports for heavy components

**Caching**:
- Configure CDN for static assets
- Set proper Cache-Control headers

---

## Monitoring

**Recommended Tools**:
- Vercel Analytics (if using Vercel)
- Google Analytics
- Sentry (error tracking)
- New Relic or Datadog (APM)

---

## Workspace Backup Script

Use the provided PowerShell helper to clone the repo without heavy dependencies:

**Script**: `F:\ArtisAuc\readme\Clone_ArtisAuc.ps1`

Examples:
```powershell
# Dry run (list only)
& "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1" -WhatIf

# Default backup to G:\ArtisAuc_Backup
& "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1"

# Custom destination and threads
& "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1" -Destination "D:\Backups\ArtisAuc" -Threads 8
```

The script excludes `node_modules`, caches, logs, uploads, and other heavy artifacts. Full logs are written to a temp file (path shown in output).

---

## Troubleshooting

**Build fails**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Port already in use**:
```bash
# Windows
netstat -ano | findstr :3002
taskkill /PID [PID] /F

# Use different port
npm run dev -- -p 3003
```

**Production server won't start**:
- Check Node.js version (must be v18+)
- Verify `npm run build` completed
- Check for missing environment variables
