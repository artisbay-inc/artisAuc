export const applyFilters = (auctions, filters) => {
  let filtered = [...auctions];
  
  // Watchlist filter
  if (filters.watchlistOnly && filters.watchlist) {
    filtered = filtered.filter(auction => filters.watchlist.includes(auction.car.id));
  }

  // Search filter
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(auction => {
      const car = auction.car;
      return (
        auction.id.toLowerCase().includes(query) ||
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        `${car.make} ${car.model}`.toLowerCase().includes(query) ||
        (car.chassisNumber && car.chassisNumber.toLowerCase().includes(query)) ||
        (car.chassisNumber && car.chassisNumber.slice(-6).toLowerCase().includes(query))
      );
    });
  }
  
  // Status filter
  if (filters.auctionStatuses && filters.auctionStatuses.length > 0) {
    filtered = filtered.filter(auction => filters.auctionStatuses.includes(auction.status));
  }
  
  // Make filter
  if (filters.makes && filters.makes.length > 0) {
    filtered = filtered.filter(auction => filters.makes.includes(auction.car.make));
  }
  
  // Year range filter
  if (filters.years) {
    filtered = filtered.filter(auction => 
      auction.car.year >= filters.years[0] && auction.car.year <= filters.years[1]
    );
  }
  
  // Mileage filter
  if (filters.mileage) {
    filtered = filtered.filter(auction => 
      auction.car.mileage >= filters.mileage[0] && auction.car.mileage <= filters.mileage[1]
    );
  }
  
  // Price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(auction => 
      auction.currentBid >= filters.priceRange[0] && auction.currentBid <= filters.priceRange[1]
    );
  }
  
  // Ending soon filter
  if (filters.endingSoon) {
    const oneHourMs = 60 * 60 * 1000;
    filtered = filtered.filter(auction => {
      const timeRemaining = new Date(auction.endTime).getTime() - Date.now();
      return timeRemaining > 0 && timeRemaining < oneHourMs;
    });
  }
  
  return filtered;
};

export const sortAuctions = (auctions, sortBy, direction) => {
  const sorted = [...auctions];
  
  switch (sortBy) {
    case 'endTime_asc':
      sorted.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
      break;
    case 'currentBid_desc':
      sorted.sort((a, b) => b.currentBid - a.currentBid);
      break;
    case 'currentBid_asc':
      sorted.sort((a, b) => a.currentBid - b.currentBid);
      break;
    case 'year_desc':
      sorted.sort((a, b) => b.car.year - a.car.year);
      break;
    case 'mileage_asc':
      sorted.sort((a, b) => a.car.mileage - b.car.mileage);
      break;
    default:
      sorted.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
  }
  
  if (direction === 'desc' && sortBy !== 'endTime_asc') {
    sorted.reverse();
  }
  
  return sorted;
};
