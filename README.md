# ArtisAuc - Japan Auto Auction Platform

**Sub-platform of Artisbay Inc.** providing direct access to Japanese automobile auctions.

🚗 **Live Demo**: http://localhost:3002

---

## 🎯 Project Overview

ArtisAuc is a Next.js-based auction search and bidding platform that connects users to Japan's major auto auctions (USS, TAA, JU, CAA, etc.). It operates as a sub-service of Artisbay Inc., leveraging the parent platform's account and deposit management.

### Key Features

- ✅ **Real-time auction search** - Filter by make, model, auction house
- ✅ **Detailed lot pages** - Vehicle specs, auction sheets, image galleries
- ✅ **Bid management** - Place bids, track history, manage max ceilings
- ✅ **Motorcycle auctions** - Separate search for bikes
- ✅ **JST clock** - Real-time Japan Standard Time display
- ✅ **Mock API** - Development data until backend integration

---

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Next.js 15.3.3, React 19
- **Styling**: CSS Modules, styled-jsx
- **Data**: JSON files (make_models.json, auctions.json, bike_models.json)
- **State**: React Hooks, localStorage
- **Backend**: Mock API (lib/mock-api.js) - ready for Artisbay Inc API integration

### Project Structure

```
F:\ArtisAuc/
├── components/          # React components
│   ├── ClockJST.js     # Japan time clock
│   ├── Footer.js       # Site footer with links
│   ├── Header.js       # Navigation header
│   ├── LotCard.js      # Vehicle listing card
│   ├── SearchForm.js   # Make/model/auction form
│   ├── SearchHero.js   # Search page hero section
│   └── withMembership.js # HOC for protected pages
├── lib/
│   └── mock-api.js     # Mock auction data API
├── pages/
│   ├── index.js        # Car search homepage
│   ├── bike-search.js  # Motorcycle search
│   ├── auction-rules.js
│   ├── dev-setup.js    # Development membership setup
│   ├── my-bids.js      # User bid management
│   ├── lot/[lot].js    # Dynamic lot detail page
│   ├── membership/index.js
│   ├── privacy/artisauc.js
│   ├── results/index.js
│   └── terms/artisauc.js
├── public/
│   ├── auctions.json   # Japanese auction houses
│   ├── bike_models.json # Motorcycle makes/models
│   ├── make_models.json # Car makes/models
│   └── images/
├── utils/
│   └── membership.js   # Membership checking utilities
└── readme/
    ├── DEPLOYMENT.md   # Deployment guide
    ├── DEVELOPMENT.md  # Setup instructions
    ├── REFERENCE.md    # HTML sample reference
    └── todo.md         # Development checklist
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
cd F:\ArtisAuc
npm install
```

### Development Server

```bash
npm run dev
```

Visit **http://localhost:3002**

### Setting Up Test Data

1. Go to http://localhost:3002/dev-setup
2. Click "Setup Test Membership"
3. This creates:
   - Active membership (valid for 12 months)
   - Deposit balance (¥500,000)

**Important**: Remove `/pages/dev-setup.js` before production deployment!

---

## 📋 User Flow

### Complete Journey

1. **Search** → Homepage or Bike Search
   - Select make, model, auction house
   - Submit search

2. **Results** → `/results?make=TOYOTA&model=ALL&auction=ALL AUCTIONS`
   - Browse filtered vehicle listings
   - View cards with key specs
   - Click "View Lot Details"

3. **Lot Detail** → `/lot/LOT-001`
   - See full specifications
   - View image carousel
   - Review auction sheet
   - Fill bid form (amount, max ceiling, notes)
   - Click "Add to My Bids"

4. **My Bids** → `/my-bids`
   - View all submitted bids
   - Edit or delete bids
   - Track bid status

### Protected Pages

These pages require membership (checked via `utils/membership.js`):

- `/results` - Search results
- `/lot/*` - Lot details
- `/my-bids` - Bid management

Without membership, users are redirected to `/membership` page.

---

## 🔐 Account Integration

### Artisbay Inc. Integration

ArtisAuc does **NOT** manage:
- User profiles
- Email verification
- Deposits
- Password reset
- Membership plans

All account management is handled at **https://artisbay.com**

### User Account Links

From ArtisAuc, users are directed to Artisbay Inc for:
- Login: `https://artisbay.com/#login`
- Register: `https://artisbay.com/#register`
- My Account: `https://artisbay.com/#my-account`
- Deposits: `https://artisbay.com/#my-account/deposits`

---

## 📦 Data Files

### Car Makes & Models (`public/make_models.json`)

13 manufacturers with 300+ models:
- Toyota (70+ models)
- Nissan, Honda, Mazda, Subaru
- Mercedes Benz, BMW, VW, Audi
- Daihatsu, Suzuki, Mitsubishi

### Motorcycle Models (`public/bike_models.json`)

4 manufacturers:
- Honda (14 models)
- Yamaha (14 models)
- Suzuki (14 models)
- Kawasaki (15 models)

### Auction Houses (`public/auctions.json`)

22 major Japanese auction venues:
- USS (Tokyo, Yokohama, Nagoya, Osaka, Sapporo, Fukuoka)
- TAA (Kanto, Yokohama, Kinki, Chubu)
- JU (Saitama, Tokyo, Kanagawa, Aichi)
- CAA, HAA, IAA, HERO, BAYAUC, LAA

---

## 🛠️ Development Notes

### Mock API

Located in `lib/mock-api.js`:

- `mockSearchCars({ make, model, auction })` - Returns filtered car listings
- `mockSearchBikes({ make, model, auction })` - Returns filtered bike listings  
- `mockFetchLot(lotId)` - Returns detailed lot information

**Sample Data**: 5 cars, 2 motorcycles with realistic specs

### Membership System

Development workflow:
1. Use `/dev-setup` to create test membership
2. localStorage stores: `artisauc_membership`, `Artisbay Inc_deposit`
3. Protected pages check membership via `checkMembership()`
4. Production: Replace with Artisbay Inc API calls

### Bid Storage

Currently uses **localStorage**:
- Bids stored as JSON array in `myBids` key
- Fields: lotId, vehicle, bidAmount, maxBid, notes, timestamp, status
- Ready for backend sync via `lib/syncBids.js` (to be implemented)

---

## 📄 Pages & Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Car search homepage | No |
| `/bike-search` | Motorcycle search | No |
| `/results` | Search results listing | Yes |
| `/lot/[lot]` | Lot detail with bidding | Yes |
| `/my-bids` | User bid management | Yes |
| `/membership` | Membership requirements | No |
| `/auction-rules` | Auction guidelines | No |
| `/terms/artisauc` | Terms of Service | No |
| `/privacy/artisauc` | Privacy Policy | No |
| `/dev-setup` | Dev membership setup | No (dev only) |

---

## 🎨 Components

### Reusable Components

- **ClockJST** - Real-time Japan Standard Time (updates every minute)
- **SearchForm** - Make/model/auction filter form
- **SearchHero** - Search page hero with clock
- **LotCard** - Vehicle listing card (used in results grid)
- **Header** - Site navigation with user menu
- **Footer** - Footer with platform, account, legal links

### Higher-Order Components

- **withMembership** - Protects pages requiring membership

---

## 🚢 Deployment

See `readme/DEPLOYMENT.md` for detailed deployment instructions covering:

- **Development** (port 3002)
- **Production** (Node.js, PM2, Docker)
- **Vercel** (recommended)
- **Environment variables**
- **Pre-deployment checklist**

### Quick Production Build

```bash
npm run build
npm start
```

---

## ✅ Completed Features (from todo.md)

### Core Structure
- [x] Search results page with filtering
- [x] Dynamic lot detail pages
- [x] Lot card components
- [x] Search form routing

### Account Integration
- [x] Artisbay Inc account links (no local profile edit)
- [x] Membership checking utility
- [x] Membership information page

### Bidding Engine
- [x] Bid form on lot pages
- [x] My Bids page (localStorage)
- [x] Bid CRUD operations

### Data & Components
- [x] Mock API for development
- [x] Extracted reusable components (ClockJST, SearchForm, SearchHero)
- [x] Next.js Image optimization

### Legal & Quality
- [x] Terms of Service page
- [x] Privacy Policy page
- [x] Footer with legal links
- [x] Code documentation headers

---

## 🔧 Configuration

### Next.js Config (`next.config.mjs`)

```javascript
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### Package.json Scripts

```json
{
  "dev": "next dev -p 3002",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 📞 Support

For issues or questions:
- **Platform**: ArtisAuc (this project)
- **Parent Service**: Artisbay Inc.
- **Contact**: sales@artisbay.com
- **Website**: https://artisbay.com

---

## 📝 License

© 2025 Artisbay Inc. All rights reserved.

---

## 🎯 Next Steps (Backend Integration)

When Artisbay Inc backend API is ready:

1. Replace `lib/mock-api.js` with real API calls
2. Implement `lib/syncBids.js` for bid submission
3. Add authentication middleware
4. Connect membership check to Artisbay Inc user API
5. Replace localStorage with API-backed state
6. Add real-time auction updates (WebSocket)
7. Implement payment flow integration

**API Endpoints Needed**:
- `GET /api/auctions/search` - Search vehicles
- `GET /api/auctions/lot/:id` - Lot details
- `POST /api/bids` - Submit bid
- `GET /api/bids/user/:userId` - User bids
- `GET /api/membership/check` - Verify membership
- `GET /api/user/deposit` - Check deposit balance
