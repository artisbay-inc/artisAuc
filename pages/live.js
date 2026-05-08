import { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { Search, Filter as FilterIcon, RotateCcw, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveSidebar from '../components/LiveSidebar';
import LiveLotCard from '../components/LiveLotCard';
import SkeletonCard from '../components/SkeletonCard';
import useAuctionStore from '../store/auctionStore';

export default function LiveAuctionsPage() {
  const { 
    fetchAuctions, 
    fetchExternalAuctions,
    getFilteredAuctions, 
    connectionStatus,
    loading,
    externalLoading,
    latencyMs,
    connectWebSocket,
    currentCurrency,
    setCurrency,
    setFilters,
    clearFilters,
    auctions,
    externalAuctions,
    filters
  } = useAuctionStore();
  
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('artisauc_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    
    fetchAuctions();
    fetchExternalAuctions('SELECT * FROM main LIMIT 50');
    connectWebSocket();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const jst = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(jst);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredAuctions = useMemo(() => getFilteredAuctions(), [auctions, externalAuctions, filters, getFilteredAuctions]);

  return (
    <>
      <Head>
        <title>Live Auctions | ArtisAuc</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header 
          user={user} 
          onLogin={() => window.location.href = '/login'} 
          onLogout={() => {
            localStorage.removeItem('artisauc_user');
            setUser(null);
          }}
        />

        <main className="flex-1 flex relative">
          <LiveSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Live Header Strip */}
            <div className="bg-gradient-to-br from-[#1e398a] via-[#1e398a] to-[#1DA1F2] px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-white shadow-md z-10 gap-4 sticky top-0">
              <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                >
                  <FilterIcon size={20} />
                </button>
                <div>
                  <h1 className="text-sm md:text-xl font-black tracking-tight uppercase">Live Feed</h1>
                  <p className="text-[8px] md:text-[10px] text-blue-200 font-bold uppercase tracking-widest mt-0.5">
                    Auction Dashboard
                  </p>
                </div>
                <div className="h-8 w-px bg-white/10 hidden lg:block"></div>
                <div className="hidden lg:block">
                  <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-0.5 text-blue-100">Japan Standard Time</div>
                  <div className="text-sm font-mono font-bold text-orange-400">{currentTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-between md:justify-end">
                {/* Currency Switcher */}
                <div className="flex items-center bg-black/20 rounded-xl p-1 border border-white/5">
                  {['JPY', 'USD', 'RUB'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${currentCurrency === curr ? 'bg-orange-400 text-white shadow-lg' : 'text-blue-200 hover:text-white'}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-0.5 text-blue-100">Sync</div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {connectionStatus === 'connected' ? `${latencyMs}ms` : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/10 px-3 md:px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                    <span className="text-sm md:text-lg font-black">{loading ? '...' : filteredAuctions.length}</span>
                    {externalLoading && <span className="text-[8px] text-blue-200 animate-pulse ml-1">+loading</span>}
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-70">Lots</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {!loading && (
              <div className="px-4 md:px-8 pt-4 md:pt-6 flex flex-wrap items-center gap-2">
                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-[#1e398a]/10 text-[#1e398a] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    Search: {filters.searchQuery}
                    <button onClick={() => setFilters({ searchQuery: '' })} className="hover:bg-[#1e398a]/20 rounded-full p-0.5"><X size={12} /></button>
                  </span>
                )}
                {filters.auctionStatuses?.length > 0 && filters.auctionStatuses.length < 3 && filters.auctionStatuses.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {s}
                    <button onClick={() => setFilters({ auctionStatuses: filters.auctionStatuses.filter(x => x !== s) })} className="hover:bg-orange-100 rounded-full p-0.5"><X size={12} /></button>
                  </span>
                ))}
                {filters.makes?.map(m => (
                  <span key={m} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {m}
                    <button onClick={() => setFilters({ makes: filters.makes.filter(x => x !== m) })} className="hover:bg-blue-100 rounded-full p-0.5"><X size={12} /></button>
                  </span>
                ))}
                {filters.endingSoon && (
                  <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    Ending Soon
                    <button onClick={() => setFilters({ endingSoon: false })} className="hover:bg-red-100 rounded-full p-0.5"><X size={12} /></button>
                  </span>
                )}
                {(filters.searchQuery || filters.makes.length || filters.endingSoon) && (
                  <button onClick={clearFilters} className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 ml-1">
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Results Grid Area */}
            <div className="p-4 md:p-8 flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredAuctions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredAuctions.map((auction) => (
                    <LiveLotCard key={auction.id} auction={auction} />
                  ))}
                </div>
              ) : (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-inner">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Search className="h-10 w-10 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-[#1e398a] uppercase tracking-wider mb-2">No Match Found</h3>
                  <p className="text-gray-400 text-xs max-w-xs mx-auto font-bold uppercase tracking-widest leading-loose mb-6">
                    Try Broadening Your Filters
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-black text-xs transition-all uppercase tracking-widest"
                  >
                    <RotateCcw size={16} />
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </>
  );
}
