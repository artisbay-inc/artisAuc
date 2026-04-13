import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockAuctions, mockCars } from '../lib/live-mock-data';
import { applyFilters, sortAuctions } from '../utils/live-filters';

const DEFAULT_FILTERS = {
  searchQuery: '',
  makes: [],
  models: [],
  years: [1900, 2030],
  mileage: [0, 300000],
  priceRange: [0, 500000],
  grades: [],
  transmissions: [],
  fuelTypes: [],
  exteriorColors: [],
  interiorColors: [],
  auctionStatuses: ['Live', 'Upcoming'],
  reserveOnly: false,
  buyNowAvailable: false,
  endingSoon: false,
  watchlistOnly: false,
  dealerLocations: [],
  sortBy: 'endTime_asc',
  sortDirection: 'asc',
};

const useAuctionStore = create(
  devtools(
    (set, get) => {
      const API_BASE_URL = 'http://localhost/ArtisbayCombined/api';
      
      return {
        auctions: [],
        cars: [],
        filters: DEFAULT_FILTERS,
        sidebarCollapsed: false,
        currentCurrency: 'USD',
        connectionStatus: 'disconnected',
        loading: false,
        latencyMs: 0,
        watchlist: [],
        
        exchangeRates: {
          USD: 1,
          JPY: 151.45,
          RUB: 92.50
        },
        
        setCurrency: (currency) => set({ currentCurrency: currency }),
        
        convertPrice: (amount, from = 'USD', to) => {
          const rates = get().exchangeRates;
          const targetCurrency = to || get().currentCurrency;
          if (from === targetCurrency) return amount;
          
          // Convert from source to USD first
          const inUSD = amount / rates[from];
          // Convert from USD to target
          return inUSD * rates[targetCurrency];
        },
        
        setFilters: (newFilters) => {
          set({ filters: { ...get().filters, ...newFilters } });
        },

        clearFilters: () => {
          set({ filters: DEFAULT_FILTERS });
        },
        
        toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        
        setLatencyMs: (latency) => set({ latencyMs: latency }),
        
        connectWebSocket: () => {
          // Mock connection
          set({ connectionStatus: 'connected', latencyMs: 42 });
        },
        
        removeFromWatchlist: (carId) => {
          set((state) => ({
            watchlist: state.watchlist.filter(id => id !== carId)
          }));
        },
        
        toggleWatchlist: (carId) => {
          const { watchlist } = get();
          if (watchlist.includes(carId)) {
            set({ watchlist: watchlist.filter(id => id !== carId) });
          } else {
            set({ watchlist: [...watchlist, carId] });
          }
        },
        
        addToWatchlist: (carId) => {
          const { watchlist } = get();
          if (!watchlist.includes(carId)) {
            set({ watchlist: [...watchlist, carId] });
          }
        },
        
        placeBid: async (auctionId, amount) => {
          const { auctions, currentCurrency, convertPrice } = get();
          const auctionIndex = auctions.findIndex(a => a.id === auctionId);
          
          if (auctionIndex === -1) return;
          
          const auction = auctions[auctionIndex];
          
          // Ensure we are working with USD for the DB
          const bidInUSD = currentCurrency === 'USD' ? amount : convertPrice(amount, currentCurrency, 'USD');
          
          if (bidInUSD <= auction.currentBid) {
            alert(`Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}`);
            return;
          }

          try {
            const response = await fetch(`${API_BASE_URL}/place_bid.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                lotId: auction.car.lotId || auction.id,
                bidAmount: bidInUSD,
                userId: 1 // TODO: Get actual user ID
              })
            });
            
            const result = await response.json();
            
            if (result.success) {
              const updatedAuctions = [...auctions];
              updatedAuctions[auctionIndex] = {
                ...auction,
                currentBid: bidInUSD,
                bidCount: (auction.bidCount || 0) + 1,
                isUserHighBidder: true,
              };
              set({ auctions: updatedAuctions });
            } else {
              alert(result.error || "Failed to place bid");
            }
          } catch (error) {
            console.error("Bid error:", error);
            // Fallback to local update if API is unreachable (for dev)
            const updatedAuctions = [...auctions];
            updatedAuctions[auctionIndex] = {
              ...auction,
              currentBid: bidInUSD,
              bidCount: (auction.bidCount || 0) + 1,
              isUserHighBidder: true,
            };
            set({ auctions: updatedAuctions });
          }
        },
        
        fetchAuctions: async () => {
          set({ loading: true });
          
          try {
            const response = await fetch(`${API_BASE_URL}/get_live_auctions.php`);
            if (response.ok) {
              const data = await response.json();
              if (Array.isArray(data) && data.length > 0) {
                set({ 
                  auctions: data, 
                  cars: data.map(a => a.car),
                  loading: false 
                });
                return;
              }
            }
          } catch (error) {
            console.warn("API Error, falling back to mock data:", error);
          }

          // Fallback to mock data if API fails
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const enrichedCars = mockCars.map(car => ({
            ...car,
            displayTitle: `${car.year} ${car.make} ${car.model}`,
            shortChassis: car.chassisNumber?.slice(-6) || '',
            imageThumbnail: car.images?.[0] || '',
            imageCount: car.images?.length || 0,
          }));
          
          const enrichedAuctions = mockAuctions.map(auction => {
            const car = enrichedCars.find(c => c.id === auction.carId) || enrichedCars[0];
            
            return {
              ...auction,
              car: car,
              bidIncrement: auction.currentBid < 1000 ? 50 : 100,
            };
          });
          
          set({ auctions: enrichedAuctions, cars: enrichedCars, loading: false });
        },
        
        getFilteredAuctions: () => {
          const state = get();
          const filtered = applyFilters(state.auctions, { ...state.filters, watchlist: state.watchlist });
          const sorted = sortAuctions(filtered, state.filters.sortBy, state.filters.sortDirection);
          return sorted;
        },
      }
    }
  )
);

export default useAuctionStore;
