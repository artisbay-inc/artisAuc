# ArtisAuc - Frontend Prototype & UI Framework
**Project Status:** In-Development / UI Reconstruction
**Current Focus:** Standardizing Layout & User Flow for Auction Search

## 📝 Project Scope
This project is a **frontend prototype** designed to establish the user interface and experience for a Japanese automobile auction platform. It serves as a visual and structural blueprint for a future integrated bidding system.

## 🏗️ Current Technical State (Development Phase)
- **Data Source:** **100% Mock Data.** All vehicle listings, auction houses, and specifications are loaded from local JSON files (`auctions.json`, `make_models.json`) or hardcoded mock scripts.
- **Real-time Logic:** **Simulated.** Features like the JST Clock and "Live Feed" use local browser time and mock intervals to simulate the behavior of a live auction environment. There is **no real-time connection** to external auction houses at this stage.
- **Bidding System:** **Incomplete/Local-only.** The "Place Bid" functionality is a frontend simulation. Bids are tracked within the browser's `localStorage` for demonstration purposes and are not transmitted to any real auction engine or backend database.
- **Architecture:** Next.js "Static Export" setup, optimized for static hosting environments.

## 🚀 Implemented UI Components (Prototypes)
- **Search Interface:** Custom search forms for cars and motorcycles using dynamic mock dropdown data.
- **Lot Detail Page:** Comprehensive auction detail view including specification tables, inspection sheet placeholders, and a simulated bid panel.
- **Live Dashboard (Simulation):** A frontend layout demonstrating the presentation of active auction lots using mock data objects.
- **Membership Gate:** A demonstration of access control logic using `localStorage` flags to simulate member-only areas.

## 🔧 Infrastructure
- **Environment Support:** Configured to operate seamlessly on `localhost` (root) and production subfolders via conditional configuration in `next.config.mjs`.
- **Styling:** Transitioning to a unified Tailwind CSS framework to improve maintainability and responsive performance across the platform.

## 📈 Immediate Development Goals
1.  **UI Consistency:** Refine the "Results" and "Lot" pages to ensure a professional, utilitarian layout suitable for high-volume data display.
2.  **Mock Data Expansion:** Increase the variety of mock vehicles to better test filtering and search algorithms.
3.  **Link Integrity:** Maintain zero-error navigation (Search -> Results -> Detail) across all deployment environments.
4.  **Backend Integration Prep:** Structuring frontend hooks and state management to be "API-ready" for future backend connectivity.

---
*Updated: April 20, 2026*
*Notice: This is a development prototype and does not represent a functional bidding platform.*
