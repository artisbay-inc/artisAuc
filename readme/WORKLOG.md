# Work Log – Auction Platform Modernization

Date: 2025-11-24

## Scope
- Built a modern auction experience in the Artisbay codebase using the legacy HTML reference from `REFERENCE.md`.
- Added authentication-aware surfaces (login/logout), quick access to My Account, My Bids, and Terms & Conditions.
- Applied the requested palette: Primary `#1E398A`, Secondary `#1DA1F2`, Accent `#FF9900`.

## Changes Made
- **New page**: `F:/artisbay/pages/auction/index.js`  
  - Hero with live stats, CTA anchors, and authentication panel tied to the existing `useUser` context.  
  - Control center cards for My Account, My Bids, and Terms.  
  - Search form modeled on the reference (make, model, year, budget, grade, transmission) plus quick filters.  
  - Live auction cards and a My Bids board with status pills (Live, Watching, Outbid, Won).  
  - Terms & Conditions callout pointing to `/help/artisbayInc/terms-and-conditions`.
- **Styling**: `F:/artisbay/styles/custom/pages/auctionPlatform.css` + import in `_app.js` to deliver the new modern look using the provided colors, gradients, pills, and responsive grids.
- **Navigation**: Added “Auction Platform” link to the main header (`F:/artisbay/components/common/header.js`) so the page is reachable site-wide.
- **Registration links**: Register now points to the main site (`https://artisbay.com/register/`) in the global header and within the auction page’s auth helper/hero actions.

## Notes
- Login form uses the existing `login` helper; logout uses `logout`, both from `components/user/userContext.js`.
- Live/My Bids data is static seed content for UI/UX demonstration; wire to real feeds when ready.
- Terms button links to the current terms page in the help center.

---

# Update – ArtisAuc UI + Auth Placeholders

Date: 2025-11-24 (later the same day)

## Scope
- Align ArtisAuc header/footer with the main Artisbay site style and requested palette.
- Surface login/logout/register placeholders and ensure register links point to the main website.
- Apply brand colors (Primary `#1E398A`, Secondary `#1DA1F2`, Accent `#FF9900`) across the base pages.

## Changes Made
- **Header** (`components/Header.js`): New layout matching main-site feel, top bar links, nav links, login/logout buttons, and register CTA that opens `https://artisbay.com/register/`. Handles both logged-in (shows name, My Account, Logout) and logged-out (Login + Register) states.
- **Footer** (`components/Footer.js`): Modernized footer with platform/account links and a register CTA targeting the main site.
- **Pages** (`pages/index.js`, `pages/bike-search.js`, `pages/auction-rules.js`): Added simple auth state toggles (login/logout placeholders) and wired them into the header props.
- **Styling** (`styles/globals.css`): Added brand color variables, refreshed header/footer styles, updated buttons, and aligned the search page visuals to the new palette.

## Notes
- Login/logout are placeholders for now (alerts) and can be replaced with real session logic when available.
- Register always opens the main website registration page in a new tab.

---

# Update – Logo, Ghost Search Removal, User Name Styling

Date: 2025-11-24 (later)

## Scope
- Remove the stray “SEARCH” placeholder in the intro panels.
- Ensure the brand logo renders from `F:/ArtisAuc/logo.png`.
- Make the username display plain text (not pill/button).

## Changes Made
- **Images**: Copied `logo.png` into `public/logo.png` so the header uses the real logo.
- **Intro cleanup**: Removed the placeholder search image from `pages/index.js` and `pages/bike-search.js`.
- **Header styling**: Updated `.user-pill` in `styles/globals.css` to render as plain text with no button styling.

---

# Update – Transparent Logo Styling

Date: 2025-11-24 (later)

## Scope
- Make the logo sit cleanly on any background by removing container fill/shadow and forcing transparency.

## Changes Made
- **Header/Footer logos** (`components/Header.js`, `components/Footer.js`): Added `logo-transparent` class to the logo image tags.
- **Styling** (`styles/globals.css`): Removed logo background/padding/box-shadow and applied `mix-blend-mode: multiply` so white backgrounds on the asset blend away; added `.logo-transparent` helper.

---

# Update – Logo Visibility Fix

Date: 2025-11-24 (later)

## Scope
- Restore logo visibility on the dark header background.

## Changes Made
- **Styling** (`styles/globals.css`): Removed the blend mode from logo styles so the PNG shows normally on dark blue; kept transparent backgrounds and clean edges.

---

# Update – Header Navigation Styling

Date: 2025-11-24 (later)

## Scope
- Restyle the main nav bar to match the Artisbay theme and add clearer hover/active affordances.

## Changes Made
- **Styling** (`styles/globals.css`): Refined header spacing, wrapped nav links in a soft pill container with inset highlight, added hover underline accent (secondary → accent gradient), and tightened grid spacing so the nav sits comfortably between the logo and auth buttons; mobile tweaks preserve the container and soften shadows.

---

# Update – Nav Label Wrapping Fix

Date: 2025-11-24 (later)

## Scope
- Prevent nav text from stacking inside buttons/links.

## Changes Made
- **Header** (`components/Header.js`): Added non-breaking spaces to keep nav labels on one line.
- **Styling** (`styles/globals.css`): Set `white-space: nowrap` on nav links to avoid stacking text.

---

# Update – Clickable Brand Link

Date: 2025-11-24 (later)

## Scope
- Make the logo + “ArtisAuc” brand lockup clickable to home and keep alignment tight.

## Changes Made
- **Header** (`components/Header.js`): Wrapped the logo/name/tagline in a single clickable brand link to `/`.
- **Styling** (`styles/globals.css`): Ensured the brand link inherits color and removes underline.

---

# Update – Unified Button Behavior

Date: 2025-11-24 (later)

## Scope
- Ensure all buttons/CTA links react consistently.

## Changes Made
- **Styling** (`styles/globals.css`): Standardized `.btn` across anchors and buttons (shared padding, radius, hover/active, focus-visible, disabled states, no text decoration) so Login/Register/My Account/Logout all behave the same.

---

# Update – My Bids Page

Date: 2025-11-24 (later)

## Scope
- Add a dedicated “My Bids” page with a summary and bid list, wire nav links, and include seller notes/legend.

## Changes Made
- **Page** (`pages/my-bids.js`): New My Bids dashboard with summary counts, bid table, AB Notes per lot, and a legend explaining AB Notes, Watching, Outbid, and Won (no live bids).
- **Nav links** (`components/Header.js`, `components/Footer.js`): Point “My Bids” to `/my-bids`.

---

# Update – Full-Width Footer Matching Header

Date: 2025-11-24 (later)

## Scope
- Align footer with the header look: full-width gradient bar, consistent padding, and centered content.

## Changes Made
- **Styling** (`styles/globals.css`): Footer uses the same primary gradient palette and spans full width; added `.page-shell` for centered inner content.
- **Footer** (`components/Footer.js`): Wrapped footer content in `.page-shell` to mirror header width and keep links/CTA centered.

---

# Update – Footer CTA Removal

Date: 2025-11-24 (later)

## Scope
- Remove public CTA from footer since only signed-in AB users access this platform.

## Changes Made
- **Footer** (`components/Footer.js`): Removed “Ready to bid?” text and “Create Account” button to keep the footer lean for authenticated users.

---

# Update – Square Layout (No Rounded Frames)

Date: 2025-11-24 (later)

## Scope
- Remove rounded corners from main frames and key panels to match a sharper design preference.

## Changes Made
- **Styling** (`styles/globals.css`): Set `#container`, `#intro`, `#sch_body`, nav links, selects, and footer logo to use `border-radius: 0`, and simplified nav group styling so the overall frame has straight edges while keeping button pills where desired.

---

# Update – Results Page & Mock Data

Date: 2025-11-24 (later)

## Scope
- Enable the search form to route to a dedicated results page backed by mock data and lot cards.

## Changes Made
- **Mock helpers** (`lib/mock-api.js`): Added `mockSearchCars`/`mockFetchLot` with sample lots.
- **Component** (`components/LotCard.js`): Card UI for displaying vehicles in lists.
- **Page** (`pages/results/index.js`): New results page that reads query params, shows filters/summary, and renders `LotCard` entries.
- **Routing** (`pages/index.js`): Search form now routes to `/results` with the selected filters.

---

# Update – Shared Components, Lot Details, and Styling Cleanup

Date: 2025-11-24 (later)

## Scope
- Continue the roadmap by modularizing the search/clock UI, adding the lot details page, and moving inline styles out of `my-bids.js`.

## Changes Made
- **Components**: Added `components/SearchForm.js` and `components/ClockJST.js`, reusing them on the homepage/results hero. Created `components/LotCard.js` earlier for listings.
- **Lot Page**: Built `pages/lot/[lot].js` powered by the mock API with carousel placeholder, sheet box, specs, seller comments, timeline, and a working “Place Bid” link to `/my-bids`.
- **Styling**: Added `styles/my-bids.css`, imported in `_app.js`, and removed the inline styled-jsx block from `my-bids.js`.

---

# Update – Membership Gate + Account Links

Date: 2025-11-24 (later)

## Scope
- Enforce the membership requirement from the master spec and point “My Account” links to Artisbay.

## Changes Made
- **Header/Footer**: “My Account” now opens `https://artisbay.com/#my-account` in a new tab.
- **Membership utility** (`utils/membership.js`): Added helpers to read/write the `artisauc_membership` flag in `localStorage`.
- **Membership page** (`pages/membership/index.js`): Explains the requirement, links to Artisbay login/deposit, and includes a tester button that sets the membership flag before redirecting back.
- **Route gating**: `/results`, `/lot/[lotId]`, and `/my-bids` now check membership on mount and redirect to `/membership?redirect=…` when needed.
- **My Bids**: Reads bids from `localStorage`, respects the gate, and reuses the external CSS file; also now persists actual bids from the lot bid form.
- **Vehicle specs**: Added `components/VehicleSpecsTable` and wired it into the lot page instead of inline table markup.

---

# Update – Bike Search, mockSearchBikes, and Sheet Viewer

Date: 2025-11-24 (later)

## Scope
- Modernize the bike search page, support bike-specific mock data, and add a reusable auction sheet viewer.

## Changes Made
- **Mock API** (`lib/mock-api.js`): Added `mockSearchBikes` with sample motorcycle lots.
- **Results page**: Now accepts `type=bike` query params and renders bike data using the appropriate mock fetcher.
- **Bike search page** (`pages/bike-search.js`): Reused `ClockJST`/`SearchForm`, routes to `/results?type=bike`, and keeps the same header/terms layout.
- **SheetViewer** (`components/SheetViewer.js`): New component for the auction sheet preview/download; integrated into `pages/lot/[lotId].js` alongside the existing spec table.

---

# Update – Bid Panel, Skeletons, and Spec-Aligned My Bids

Date: 2025-11-24 (later)

## Scope
- Add remaining reusable components (BidPanel, SkeletonCard, SkeletonLot), wire them into lot/results pages, and expand My Bids to match the required table columns.

## Changes Made
- **Components**: Added `BidPanel`, `SkeletonCard`, and `SkeletonLot`; ResultsGrid now uses SkeletonCard placeholders, and lot detail shows SkeletonLot while loading.
- **Lot page**: Replaced inline form with `BidPanel`, storing `maxCeiling`, notes, chassis, etc., so My Bids has full data.
- **My Bids** (`pages/my-bids.js`): New table layout covering Auction, Lot, Time, Year, Make/Model, Chassis, Fuel, Condition, Mileage, Color, Bid price, Notes, Status, and Actions. Added edit/delete controls and surfaced max ceiling + timestamps.

---

# Update – Skeleton Loaders, Login Fidelity, Next.js Image Cleanup

Date: 2025-11-26

## Scope
- Finish the outstanding skeleton loading tasks from the master spec.
- Modernize the login page so it mirrors the archived HTML reference (hero image + JST clock, membership notice, ArtisAuc palette).
- Replace the last legacy `<img>` tags with optimized `next/image`.
- Refresh docs with new test URLs and TODO status.

## Changes Made
- **Components**: Added `components/SkeletonCard.js` and `components/SkeletonLot.js`, wired to `ResultsGrid` and the lot detail loading state.
- **Login page** (`pages/login.js`): Added hero block with photo + `ClockJST`, added membership alert, remember-me row, and tightened styling to the requested blues/orange.
- **Images**: Swapped footer logo, lot card thumbnails, and SheetViewer preview to `next/image` so all media now benefits from Next.js optimization.
- **Docs**: Updated `readme/ARTISAUC_TODO.md` to check off skeleton + login requirements and expanded `readme/DEVELOPMENT.md` with new quick-test URLs (bike routes + membership redirect).

## Notes
- Login continues to store the dummy `artisauc_user` flag for testing and respects header routing.
- Skeleton components follow the palette gradients so they blend into the rest of the UI.
