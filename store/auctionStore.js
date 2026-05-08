import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockAuctions, mockCars } from '../lib/live-mock-data';
import { fetchExternalApi } from '../lib/mock-api';
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
                const tagged = data.map(a => ({ ...a, _source: 'local_api' }));
                set({ 
                  auctions: tagged, 
                  cars: tagged.map(a => ({ ...a.car, _source: 'local_api' })),
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
            _source: 'mock',
            displayTitle: `${car.year} ${car.make} ${car.model}`,
            shortChassis: car.chassisNumber?.slice(-6) || '',
            imageThumbnail: car.images?.[0] || '',
            imageCount: car.images?.length || 0,
          }));
          
          const enrichedAuctions = mockAuctions.map(auction => {
            const car = enrichedCars.find(c => c.id === auction.carId) || enrichedCars[0];
            
            return {
              ...auction,
              _source: 'mock',
              car: car,
              bidIncrement: auction.currentBid < 1000 ? 50 : 100,
            };
          });
          
          set({ auctions: enrichedAuctions, cars: enrichedCars, loading: false });
        },
        
        externalAuctions: [],
        externalLoading: false,
        externalFieldMap: {
          lotId: 'LOT', year: 'YEAR', make: 'MARKA_NAME', model: 'MODEL_NAME',
          mileage: 'MILEAGE', grade: 'RATE', transmission: 'KPP',
          auctionHouse: 'TOWN', thumbnail: 'IMAGES',
          currentBid: 'START', startingBid: 'START', status: 'STATUS',
          chassisNumber: 'KUZOV', exteriorColor: 'COLOR',
          endTime: 'AUCTION_DATE',
        },

        setExternalFieldMap: (map) => set({ externalFieldMap: { ...get().externalFieldMap, ...map } }),

        fetchExternalAuctions: async (sqlQuery = 'SELECT * FROM main LIMIT 10') => {
          set({ externalLoading: true });
          const fieldMap = get().externalFieldMap;

          try {
            const rows = await fetchExternalApi(sqlQuery);
            if (rows.length > 0) {
              const auctions = rows.map((row, idx) => {
                const imgRaw = row[fieldMap.thumbnail] || '';
                const images = imgRaw ? [imgRaw] : [];

                const car = {
                  id: `ext-${idx}`,
                  _source: 'external_api',
                  make: row[fieldMap.make] || '',
                  model: row[fieldMap.model] || '',
                  year: row[fieldMap.year] || '',
                  mileage: parseInt(row[fieldMap.mileage]) || 0,
                  grade: row[fieldMap.grade] || '',
                  transmission: row[fieldMap.transmission] || '',
                  engineSize: row['ENG_V'] ? row['ENG_V'] + 'cc' : '',
                  chassisNumber: row[fieldMap.chassisNumber] || '',
                  exteriorColor: row[fieldMap.exteriorColor] || '',
                  interiorColor: row['INTERIOR'] || '',
                  fuelType: row['FUEL'] || '',
                  images,
                  imageThumbnail: images[0] || '',
                  shortChassis: (row[fieldMap.chassisNumber] || '').slice(-6) || '',
                  displayTitle: `${row[fieldMap.year] || ''} ${row[fieldMap.make] || ''} ${row[fieldMap.model] || ''}`,
                };

                return {
                  id: `ext-${idx}`,
                  _source: 'external_api',
                  car,
                  lotId: row[fieldMap.lotId] || `EXT-${idx}`,
                  currentBid: parseFloat(row[fieldMap.currentBid]) || 0,
                  startingBid: parseFloat(row[fieldMap.startingBid]) || 0,
                  endTime: row[fieldMap.endTime] ? new Date(row[fieldMap.endTime]) : new Date(Date.now() + 86400000),
                  status: row[fieldMap.status] || 'Live',
                  bidderCount: parseInt(row['BIDDER_COUNT']) || 0,
                  reserveMet: row['RESERVE_MET'] === '1' || false,
                  buyNowPrice: parseFloat(row['BUY_NOW']) || 0,
                  bidIncrement: 100,
                };
              });

              set({ externalAuctions: auctions, externalLoading: false });
            } else {
              set({ externalAuctions: [], externalLoading: false });
            }
          } catch (error) {
            console.warn("Failed to fetch external auctions:", error);
            set({ externalAuctions: [], externalLoading: false });
          }
        },
        
        getFilteredAuctions: () => {
          const state = get();
          const allAuctions = [...state.auctions, ...state.externalAuctions];
          const filtered = applyFilters(allAuctions, { ...state.filters, watchlist: state.watchlist });
          const sorted = sortAuctions(filtered, state.filters.sortBy, state.filters.sortDirection);
          return sorted;
        },
      }
    }
  )
);

export default useAuctionStore;
