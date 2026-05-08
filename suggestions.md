# ArtisAuc Development Roadmap: Phase 2
**Strategic Recommendations for Prototype Advancement**

Following the initial UI reconstruction, the goal is to shift from a static presentation to a dynamic, functional prototype that prepares the codebase for real-world data integration.

---

## 1. Advanced Search & Personalization
To improve the utility of the search interface, focus on data persistence and user-specific states.
* **Persistent Search Filters**: Implement logic to save current search parameters (Make, Model, Year, Grade) to `localStorage`. This allows the UI to "remember" user preferences upon return.
* **Search History Component**: Build a "Recently Viewed" or "Recent Searches" sidebar on the main search page to streamline the user flow.

## 2. Technical Inspection Interactivity
The inspection sheet is the most critical document in an auto auction. Moving beyond a placeholder will significantly increase the prototype's value.
* **SVG-Based Damage Mapping**: Replace static placeholder images with an interactive SVG of a vehicle chassis. Use your mock JSON data to highlight specific areas (e.g., front bumper, rear door) with standard auction codes like A1 (scratch) or U1 (dent).
* **High-Resolution Modal**: Implement a custom lightbox component for viewing original inspection documents, ensuring it supports pinch-to-zoom for mobile responsiveness.

## 3. "API-Ready" Architecture
Prepare the frontend to be swapped with a real backend with minimal friction.
* **Abstraction of Data Fetching**: Instead of importing `auctions.json` directly into components, create a `services/` directory with asynchronous functions (e.g., `getAuctionList()`). This mimics real API behavior.
* **Skeleton UI Loading**: Implement Tailwind-based skeleton loaders for the "Results" and "Lot Detail" pages. This establishes a professional feel and handles the visual transition during data fetching.

## 4. Responsive Data Visualization
Auction platforms are data-heavy. The UI must remain utilitarian across all devices.
* **Hybrid View Layout**: Create a toggle on the results page allowing users to switch between a 'Dense Table View' (optimized for desktop data analysis) and a 'Card Grid View' (optimized for mobile browsing).
* **Sticky Action Bar**: Ensure the bidding panel or "Inquiry" buttons are pinned to the bottom of the viewport on mobile devices to maintain a clear Call to Action (CTA).

## 5. Live Environment Simulation
Enhance the "Live Feed" logic to make the prototype feel active.
* **Mock Bid Stream**: Use `setInterval` to inject random mock bids into a "Current Activity" log on the dashboard. This tests the UI's ability to handle frequent DOM updates.
* **Countdown Logic**: Create a real-time countdown timer for each lot based on the JST clock, triggering a "Closed" state once the mock auction time is reached.

---
*Target Completion: May 2026*