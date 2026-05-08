# Design Improvements & Feature Changes

## New Features

### 1. Lightbox Image Viewer (`pages/lot/[lotId].js`)
- Click the main gallery image to open a fullscreen lightbox overlay
- Close via backdrop click, Escape key, or the close button
- Displays the currently selected image at full size with black backdrop

### 2. Toast Notification System (`components/Toast.js`)
- Replaces all `alert()` calls with animated toast notifications
- Supports `success`, `error`, and `info` toast types with corresponding icons
- Auto-dismisses after 4 seconds, manually closable
- Positioned bottom-right, stacks multiple toasts vertically
- Wrapped via `ToastProvider` in `_app.js` — available app-wide
- Usage: `const addToast = useToast(); addToast('Message', 'success');`

### 3. LiveLotCard Image Carousel (`components/LiveLotCard.js`)
- Navigation dots appear below the image when multiple images exist
- Click dots to cycle through vehicle images without leaving the card
- Current dot highlighted in white, others semi-transparent
- Dots hidden when only one image is available

### 4. Price Pulse Animation (`components/LiveLotCard.js`)
- Newly loaded cards briefly pulse the price to draw attention
- 1.6s pulse animation on mount via CSS `animate-pulse`

### 5. Comparison Drawer Diff Highlighting (`components/ComparisonDrawer.js`)
- Specs with identical values across all compared vehicles highlighted in green with checkmark
- Specs with differing values highlighted in orange to draw attention
- Empty slots show a "Add Vehicle" placeholder with Plus icon instead of "Empty Slot"

## Visual Improvements

### 6. Gradient Hero Sections (`pages/lot/[lotId].js`, `pages/live.js`, `pages/results/index.js`)
- Hero banners changed from flat `#1e398a` to `bg-gradient-to-br from-[#1e398a] via-[#1e398a] to-[#1DA1F2]`
- Subtle dot-pattern overlay adds texture

### 7. Hover Effects on Spec Boxes (`components/LiveLotCard.js`)
- Spec boxes (mileage, trans, engine) scale up subtly on hover (`hover:scale-105`)

### 8. Custom Scrollbar & Focus Styles (`styles/globals.css`)
- Thin 6px custom scrollbar matching brand colors
- Custom `::selection` highlight in brand blue
- Consistent `:focus-visible` outline using accent orange
- New `.shimmer` CSS utility class for loading animations
- `scrollbar-gutter: stable` prevents layout shift from scrollbar appearance

## Data Integration

### 9. External API Proxy (`api/external_proxy.php`)
- PHP proxy for `144.76.203.145` external API
- Tries cURL first, falls back to `file_get_contents`
- Returns data with CORS headers from `db_connect.php`

### 10. External Data on Live Page (`store/auctionStore.js`, `pages/live.js`)
- `fetchExternalAuctions()` action fetches from external API
- Merged with local auctions in `getFilteredAuctions()`
- Visual source badge on cards: purple "External", gray "Mock"

### 11. External Data on Results Page (`pages/results/index.js`)
- Search results merged with external API data
- Field mapping via `externalFieldMap` for column name translation

### 12. Lot Detail for External Vehicles (`pages/lot/[lotId].js`)
- `getStaticPaths` generates paths for external data (ext-0, ext-1, etc.)
- Client-side fallback fetches direct from external API if PHP proxy unavailable
- Field mapped to match expected schema (MARKA_NAME→make, etc.)

## Files Modified

| File | Changes |
|------|---------|
| `pages/_app.js` | Added `ToastProvider` wrapper |
| `pages/lot/[lotId].js` | Lightbox, gradient hero, toast, external data fallback, getStaticPaths expansion |
| `pages/live.js` | External data fetch on mount |
| `pages/results/index.js` | External data merge in search results |
| `components/Toast.js` | NEW — Toast notification system |
| `components/LiveLotCard.js` | Image carousel dots, price pulse, hover effects, source badge |
| `components/LotCard.js` | Source badge for external data |
| `components/ComparisonDrawer.js` | Spec diff highlighting, better placeholders |
| `store/auctionStore.js` | External auctions, field map, toast-friendly placeBid return values |
| `lib/mock-api.js` | `fetchExternalApi()` function with field mapping |
| `api/external_proxy.php` | NEW — PHP proxy with curl/file_get_contents fallback |
| `styles/globals.css` | Custom scrollbar, selection, focus, shimmer utility |
| `utils/live-filters.js` | Filter/sort logic (unchanged) |
