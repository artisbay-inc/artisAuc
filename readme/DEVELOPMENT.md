# ArtisAuc Development Guide

## Overview
ArtisAuc is an auction platform for Japan's auto auctions, built with Next.js 15.3.3 and React 19.
Branding uses Primary `#1E398A`, Secondary `#1DA1F2`, and Accent `#FF9900`.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation
```bash
cd F:\ArtisAuc
npm install
```

## Development Server
```bash
npm run dev
```
The application runs on **http://localhost:3002**

### Quick Test Links
- Home (Car Search): http://localhost:3002/
- Bike Search: http://localhost:3002/bike-search
- Login: http://localhost:3002/login
- Car Results (mock data): http://localhost:3002/results?make=Toyota&model=Prius&auction=USS%20Tokyo
- Bike Results (mock data): http://localhost:3002/results?type=bike&make=Honda&model=CBR600RR&auction=USS%20Osaka
- Lot detail sample: http://localhost:3002/lot/USS-241122-01
- My Bids: http://localhost:3002/my-bids
- Membership gate: http://localhost:3002/membership
- Membership gate redirect back to lot: http://localhost:3002/membership?redirect=%2Flot%2FUSS-241122-01

## Project Structure
```
F:\ArtisAuc/
├── pages/
│   ├── _app.js           # Next.js app wrapper
│   └── index.js          # Main auction search page
├── components/
│   ├── Header.js         # Site header (brand link to home, nav, login/logout/register CTAs)
│   └── Footer.js         # Site footer (platform/account links + CTA)
├── styles/
│   └── globals.css       # Global styles
└── public/
    └── images/           # Static assets
```

## Key Features
- **Car Search Interface**: Search by make, model, and auction
- **Japan Standard Time Clock**: Real-time JST display via `ClockJST`
- **User Session**: Placeholder login/logout with consistent CTA styling
- **Unified Buttons**: `.btn` shared across anchors and buttons for consistent hover/focus/active states
- **Brand Link**: Logo + “ArtisAuc” lockup is clickable to home
- **Membership Gate**: `/membership` page + `artisauc_membership` flag required for `/results`, `/lot/*`, `/my-bids`
- **Reusable Components**: `SearchForm`, `LotCard`, `ResultsGrid`, `VehicleSpecsTable`, `SheetViewer`, `BidPanel`, `SkeletonCard`, `SkeletonLot`

## Code Standards
- **Every file must have a header comment** explaining what the code does
- Use functional React components with hooks
- Follow Next.js conventions for pages and routing
- Keep files small: avoid exceeding ~300–400 lines of code per file; break into modules when growing.

## Building for Production
```bash
npm run build
npm start
```

## Environment
- Development port: 3002
- Production port: Will use default Next.js port (3000)

# Development Progress

## Completed Components
- ClockJST (Japan Standard Time clock, used in Home, Lot, My Bids)
- Header, Footer, SearchForm, ResultsGrid
- LotCard (Auction lot card for results views)
- VehicleSpecsTable + SheetViewer (lot details)
- BidPanel plus SkeletonCard/SkeletonLot loaders

## Test URLs
- Home: http://localhost:3002/
- Login: http://localhost:3002/login
- Car Results: http://localhost:3002/results?make=TOYOTA&models=CROWN&auctions=USS%20Tokyo
- Bike Results: http://localhost:3002/results?type=bike&make=Honda&model=CBR600RR&auction=USS%20Osaka
- Lot Detail: http://localhost:3002/lot/12345
- My Bids: http://localhost:3002/my-bids

## Notes
- All main pages use brand theme colors + unified button states.
- Membership gate logic removed from My Bids for dev/testing.
- Mock data used for results and lot details. All vehicle/brand/sheet imagery now uses `next/image` for optimization.
