import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Filter, Clock, Heart, Gavel, TrendingUp, 
  ChevronDown, ChevronUp, Search, Calendar, DollarSign, X
} from 'lucide-react';
import useAuctionStore from '../store/auctionStore';

export default function LiveSidebar({ isOpen, onClose }) {
  const { 
    setFilters, 
    filters,
    watchlist,
    auctions,
    cars,
    clearFilters,
    removeFromWatchlist
  } = useAuctionStore();

  const clearAllFilters = clearFilters;
  
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    makeModel: true,
    year: false,
    price: false,
    watchlist: true
  });
  
  const liveCount = (auctions || []).filter(a => a.status === 'Live').length;
  const upcomingCount = (auctions || []).filter(a => a.status === 'Upcoming').length;
  const availableMakes = [...new Set((cars || []).map(car => car.make))];
  
  // Get actual car objects for the watchlist
  const watchlistCars = (cars || []).filter(car => watchlist.includes(car.id));
  
  const toggleFilter = (key, value) => {
    if (key === 'endingSoon') {
      setFilters({ endingSoon: !filters.endingSoon });
    } else if (key === 'auctionStatuses') {
      const current = filters.auctionStatuses || [];
      let newStatuses;
      if (current.includes(value)) {
        newStatuses = current.filter(s => s !== value);
      } else {
        newStatuses = [...current, value];
      }
      setFilters({ auctionStatuses: newStatuses });
    }
  };
  
  const toggleMake = (make) => {
    const current = filters.makes;
    const newMakes = current.includes(make)
      ? current.filter(m => m !== make)
      : [...current, make];
    setFilters({ makes: newMakes, models: [] });
  };
  
  const updateYearRange = (min, max) => {
    setFilters({ years: [min, max] });
  };
  
  const updatePriceRange = (min, max) => {
    setFilters({ priceRange: [min, max] });
  };
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const isStatusActive = (status) => filters.auctionStatuses?.includes(status);

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-100 flex flex-col h-full 
    transition-transform duration-300 ease-in-out lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:translate-x-0
    ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300" 
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="p-6 border-b border-gray-50 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#1e398a]" />
              <span className="font-black text-[#1e398a] uppercase tracking-widest text-sm">Filters</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={clearFilters} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors">
                Clear
              </button>
              <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={filters.searchQuery}
              onChange={(e) => setFilters({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 rounded-xl text-xs outline-none transition-all font-bold"
            />
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Status Section */}
          <div>
            <button onClick={() => toggleSection('status')} className="w-full flex items-center justify-between group">
              <span className="font-black text-[#1e398a] text-xs uppercase tracking-[0.2em]">Auction Status</span>
              {expandedSections.status ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>
            {expandedSections.status && (
              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => toggleFilter('auctionStatuses', 'Live')} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${isStatusActive('Live') ? 'bg-blue-50 text-[#1e398a] ring-1 ring-blue-100' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <Gavel className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left text-xs font-bold uppercase tracking-wider">Live</span>
                  {liveCount > 0 && <span className="bg-[#FF9900] text-white text-[10px] px-2 py-0.5 rounded-full font-black">{liveCount}</span>}
                </button>
                <button 
                  onClick={() => toggleFilter('auctionStatuses', 'Upcoming')} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${isStatusActive('Upcoming') ? 'bg-blue-50 text-[#1e398a] ring-1 ring-blue-100' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <Clock className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left text-xs font-bold uppercase tracking-wider">Upcoming</span>
                  {upcomingCount > 0 && <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-black">{upcomingCount}</span>}
                </button>
                <button 
                  onClick={() => toggleFilter('endingSoon', true)} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${filters.endingSoon ? 'bg-orange-50 text-[#FF9900] ring-1 ring-orange-100' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left text-xs font-bold uppercase tracking-wider">Ending Soon</span>
                </button>
                <button 
                  onClick={() => setFilters({ watchlistOnly: !filters.watchlistOnly })} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${filters.watchlistOnly ? 'bg-red-50 text-red-500 ring-1 ring-red-100' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <Heart className={`h-4 w-4 mr-3 ${filters.watchlistOnly ? 'fill-red-500' : ''}`} />
                  <span className="flex-1 text-left text-xs font-bold uppercase tracking-wider">Watchlist Only</span>
                  {watchlist.length > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{watchlist.length}</span>}
                </button>
              </div>
            )}
          </div>
          
          {/* Make Section */}
          <div>
            <button onClick={() => toggleSection('makeModel')} className="w-full flex items-center justify-between group">
              <span className="font-black text-[#1e398a] text-xs uppercase tracking-[0.2em]">Vehicle Make</span>
              {expandedSections.makeModel ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>
            {expandedSections.makeModel && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {availableMakes.map(make => (
                  <button 
                    key={make} 
                    onClick={() => toggleMake(make)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${filters.makes.includes(make) ? 'bg-[#1e398a] text-white border-[#1e398a]' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'}`}
                  >
                    {make}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Range */}
          <div>
            <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between group">
              <span className="font-black text-[#1e398a] text-xs uppercase tracking-[0.2em]">Year Range</span>
              {expandedSections.year ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>
            {expandedSections.year && (
              <div className="mt-4 flex gap-3 items-center">
                <div className="relative flex-1">
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <input 
                    type="number" 
                    value={filters.years[0]} 
                    onChange={(e) => updateYearRange(parseInt(e.target.value) || 1900, filters.years[1])}
                    className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold outline-none focus:bg-white focus:border-blue-100 transition-all"
                    placeholder="MIN"
                  />
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <input 
                    type="number" 
                    value={filters.years[1]} 
                    onChange={(e) => updateYearRange(filters.years[0], parseInt(e.target.value) || 2030)}
                    className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold outline-none focus:bg-white focus:border-blue-100 transition-all"
                    placeholder="MAX"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button onClick={() => toggleSection('price')} className="w-full flex items-center justify-between group">
              <span className="font-black text-[#1e398a] text-xs uppercase tracking-[0.2em]">Price Range</span>
              {expandedSections.price ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>
            {expandedSections.price && (
              <div className="mt-4 flex gap-3 items-center">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <input 
                    type="number" 
                    value={filters.priceRange[0]} 
                    onChange={(e) => updatePriceRange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                    className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold outline-none focus:bg-white focus:border-blue-100 transition-all"
                    placeholder="MIN"
                  />
                </div>
                <div className="relative flex-1">
                  <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <input 
                    type="number" 
                    value={filters.priceRange[1]} 
                    onChange={(e) => updatePriceRange(filters.priceRange[0], parseInt(e.target.value) || 500000)}
                    className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold outline-none focus:bg-white focus:border-blue-100 transition-all"
                    placeholder="MAX"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Watchlist Section */}
          {watchlistCars.length > 0 && (
            <div>
              <button onClick={() => toggleSection('watchlist')} className="w-full flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1e398a] text-xs uppercase tracking-[0.2em]">Your Watchlist</span>
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
                    {watchlistCars.length}
                  </span>
                </div>
                {expandedSections.watchlist ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
              </button>
              
              {expandedSections.watchlist && (
                <div className="mt-4 space-y-3">
                  {watchlistCars.map(car => (
                    <div key={car.id} className="group relative flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-transparent hover:border-red-100 hover:bg-red-50/30 transition-all">
                      <div className="relative w-12 h-10 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                        <Image 
                          src={car.images?.[0] || car.thumbnail} 
                          alt="" 
                          fill 
                          className="object-cover" 
                          unoptimized 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black text-[#1e398a] truncate">{car.year} {car.make}</p>
                        <p className="text-[9px] text-gray-400 font-bold truncate uppercase">{car.model}</p>
                      </div>
                      <button 
                        onClick={() => removeFromWatchlist(car.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-all"
                        title="Remove"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setFilters({ watchlistOnly: !filters.watchlistOnly })}
                    className={`w-full mt-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${filters.watchlistOnly ? 'bg-red-500 text-white border-red-500 shadow-md' : 'bg-white text-red-500 border-red-100 hover:bg-red-50'}`}
                  >
                    {filters.watchlistOnly ? 'Showing Watchlist Only' : 'View Watchlist on Feed'}
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
        
        <div className="p-6 border-t border-gray-50 mt-auto bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Live</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
