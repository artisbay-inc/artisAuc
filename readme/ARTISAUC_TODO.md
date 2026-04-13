============================================================
ARTISAUC — FULL PLATFORM BUILD PLAN (MASTER SPEC)
============================================================
SOURCE BLUEPRINT FILES

The following reference files MUST be used to reconstruct page structure, content, layout, and UI behavior:

F:\ArtisAuc\readme\Samples\Bid List HTML Element.doc
F:\ArtisAuc\readme\Samples\Bid List outer HTML.doc
F:\ArtisAuc\readme\Samples\Car page HTML Element.doc
F:\ArtisAuc\readme\Samples\Car page outer HTML.doc
F:\ArtisAuc\readme\Samples\Home HTML Element.doc
F:\ArtisAuc\readme\Samples\Home outer HTML.doc
F:\ArtisAuc\readme\Samples\Login HTML Element.doc
F:\ArtisAuc\readme\Samples\Login outer HTML.doc


All UI reconstruction MUST follow these documents.
No deviation unless explicitly approved.

============================================================
PROGRESS SNAPSHOT (Nov 24, 2025)
============================================================

[x] Components added: `SearchForm`, `ClockJST` (used in Home, Lot, My Bids), `LotCard` (used in Results), `VehicleSpecsTable`
THEME
============================================================

Create the following reusable components:

- [x] ClockJST (reusable, used in all main pages)
- [x] LotCard (used in Results, matches sample HTML)
- [x] ResultsGrid
- [x] VehicleSpecsTable
- [x] SheetViewer
- [x] BidPanel
- [x] SkeletonCard
- [x] SkeletonLot

These must match the UI defined in the sample HTML documents.
Links

Highlights

Headers

Icons

Dividers

Progress indicators

============================================================
GLOBAL RULES
============================================================

The system is a sub-site of Artisbay Inc.

No profile editing

No deposit editing

No user settings inside ArtisAuc

ArtisAuc only handles:

Auction search

Auction results

Lot viewer

Bid creation

Local or future API-based bid management

Membership, deposit, and account management occur on Artisbay Inc, not within this sub-site.

No functionality outside this plan is allowed without explicit approval.

Keep the structure modular, clean, and match the modern ArtisAuc style.

All pages must inherit or match the existing header/footer structure already in the project.

All layouts must be fully responsive.

============================================================
1. LOGIN PAGE
============================================================
Source blueprints:

Login HTML Element.doc

Login outer HTML.doc

Requirements (use checkboxes to track progress)

- [x] Reconstruct the login UI based on the original HTML.
- [x] Apply ArtisAuc theme colors.
- [x] Form fields:
  - [x] Username
  - [x] Password
  - [x] “Sign In” button
- [x] Add visible note: “ArtisAuc access requires an active Artisbay Inc membership.”
- [x] Ensure redirects always reuse the shared header logic.

Behavior
- [x] Keep it dummy-auth only (no real backend yet).
- [x] Store a local “logged-in” flag for testing.

============================================================
2. HOME / SEARCH PAGE (CAR SEARCH)
============================================================
Source blueprints:

Home HTML Element.doc

Home outer HTML.doc

Requirements

- [x] Rebuild the entire search interface:
  - [x] Make dropdown
  - [x] Model dropdown
  - [x] Auction dropdown
  - [x] Search button
  - [x] JST clock
  - [x] Header title “CAR SEARCH”
  - [x] Auction Rules link

Behavior
- [x] Submit routes to `/results` with query parameters.
- [x] Populate dropdowns from `make_models.json` and `auctions.json`.
- [x] Recreate dynamic model filtering (Make selection limits Model options).

============================================================
3. RESULTS PAGE
============================================================
Source blueprints:

Use reconstructed logic from:

Home pages

Car page outer HTML.doc (structure references)

Requirements

- [x] Display a grid/list matching sample structure including:
  - [x] Thumbnail
  - [x] Year / Make / Model
  - [x] Mileage
  - [x] Grade
  - [x] Auction House
  - [x] Lot number
  - [x] “View Lot” button

Data
- [x] Use mock data until API arrives.
- [ ] Wire real API later when ready.

============================================================
4. LOT DETAIL PAGE
============================================================
Source blueprints:

Car page HTML Element.doc

Car page outer HTML.doc

Requirements

- [ ] Rebuild the lot viewer including:
  - [x] Image gallery
  - [x] Auction sheet image
  - [x] Full spec table (year, make/model, mileage, fuel, transmission, color, steering, engine size, condition grade)
  - [ ] Seller notes (admin account only)
  - [ ] Auction schedule details / timeline block
  - [x] “Place Bid” panel

Bid Panel (local only)
- [x] Bid amount field
- [x] Maximum ceiling field
- [x] Customer note field
- [x] “Add to My Bids” button that stores data locally

============================================================
5. MY BIDS PAGE
============================================================
Source blueprints:

Bid List HTML Element.doc

Bid List outer HTML.doc

Requirements

- [x] Recreate the bid table with columns:
  - [x] Auction
  - [x] Lot
  - [x] Time
  - [x] Year
  - [x] Make/Model
  - [x] Chassis
  - [x] Fuel
  - [x] Condition
  - [x] Mileage
  - [x] Color
  - [x] Yard
  - [x] Bid price
  - [x] Notes
  - [x] Status

Behavior
- [x] Load bids from localStorage.
- [x] Support edit/delete.
- [x] Status remains “Pending” until backend arrives.

============================================================
6. BIKE SEARCH PAGE
============================================================
Source blueprints:

Structure similar to Car Search; reference existing replicas.

Requirements

- [x] Mirror the car search layout (make/model/auction dropdowns, search button, JST clock, rules link).
- [x] Populate dropdowns using `bike_models.json`.
============================================================
7. MEMBERSHIP GATE
============================================================
Purpose

Block access to:

/results

/lot

/my-bids

Rules

- [x] Gate relies on `localStorage` flag `membership = true`.
- [x] Deny access to `/results`, `/lot/*`, `/my-bids` until set.

Display message:
- [x] “ArtisAuc requires an active Artisbay Inc membership and deposit.”

CTA Buttons
- [x] "Go to Artisbay Account"
- [x] "Learn more" (Artisbay deposit info)
- [x] Link both buttons to existing Artisbay pages.

============================================================
8. MOCK API LAYER
============================================================

Create a simple mock system:

- [x] mockSearchCars()
- [x] mockFetchLot()
- [x] mockSearchBikes()

These return static JSON objects shaped according to the structure extracted from the sample HTML.

The goal is to simulate:

Search results

Lot details

Bid interactions

until the real backend API is connected.

============================================================
9. COMPONENT LIBRARY
============================================================

Create the following reusable components:

- [x] ClockJST
- [x] LotCard
- [x] ResultsGrid
- [x] VehicleSpecsTable
- [x] SheetViewer
- [x] BidPanel
- [x] SkeletonCard
- [x] SkeletonLot

These must match the UI defined in the sample HTML documents.

============================================================
10. VISUAL & STRUCTURAL REFACTOR
============================================================
Mandatory cleanup:

Replace all <img> tags with Next.js <Image>.

Move inline styles into modular CSS.

Ensure consistent paddings, shadows, radiuses.

All buttons use theme colors:

Primary: Main Blue

Secondary: Secondary Blue

Accent: Orange

Layout refinements

Responsive grid on search results.

Lot page responsive for mobile.

Header navigation consistent across pages.

============================================================
11. FUTURE API READY HOOKS
============================================================

Prepare empty logic for:

syncBids()

fetchResultsFromAPI()

fetchLotFromAPI()

These must exist but remain empty until real API arrives.

============================================================
12. FINAL VALIDATION
============================================================

Entire site loads without backend.

All routes functional with mock data.

Layout visually matches sample HTML.

Styling matches ArtisAuc brand colors.

Search → Results → Lot → Bid → My Bids completes a full loop.

Membership gate works on protected pages.

============================================================
END OF PLAN
============================================================
