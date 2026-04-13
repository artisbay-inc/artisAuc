/**
 * pages/results/index.js
 * Responsive Vehicle results grid.
 */

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResultsGrid from '../../components/ResultsGrid';
import { mockSearchCars, mockSearchBikes, mockLotList } from '../../lib/mock-api';
import useStore from '../../store';
import { LayoutGrid, List } from 'lucide-react';

function ResultsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const { favorites } = useStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('artisauc_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { make = 'ALL', model = 'ALL', auction = 'ALL', type = 'car' } = router.query || {};
      const fetcher = type === 'bike' ? mockSearchBikes : mockSearchCars;
      const cars = await fetcher({ make, model, auction });
      setResults(cars);
      setFilteredResults(cars);
      setLoading(false);
      setActiveFilter('ALL');
    };
    if (router.isReady) {
      fetchData();
    }
  }, [router.query, router.isReady]);

  useEffect(() => {
    const updateTime = () => {
      const jst = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(jst);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const applyFilter = (filter) => {
    setActiveFilter(filter);
    let updated = [...results];
    
    if (filter === 'HIGH_GRADE') {
      updated = results.filter(r => {
        const grade = parseFloat(r.grade);
        return !isNaN(grade) && grade >= 4.0;
      });
    } else if (filter === 'LOW_MILEAGE') {
      updated = results.filter(r => {
        const km = parseInt(r.mileage.replace(/[^0-9]/g, ''));
        return !isNaN(km) && km < 50000;
      });
    } else if (filter === 'CLOSING_SOON') {
      // Mock: just take first half
      updated = results.slice(0, Math.ceil(results.length / 2));
    } else if (filter === 'WATCHLIST') {
      // Filter from ALL known lots that are in favorites
      updated = mockLotList.filter(lot => favorites.includes(lot.lotId));
    }
    
    setFilteredResults(updated);
  };

  return (
    <>
      <Head>
        <title>Search Results | ArtisAuc</title>
      </Head>
      <Header 
        user={user} 
        onLogin={() => router.push('/login')} 
        onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }}
      />
      <main className="results-page bg-gray-50 dark:bg-slate-950 min-h-screen">
        {/* Compact Hero Section */}
        <div className="bg-[#1e398a] py-4 md:py-8 text-white px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                <h1 className="text-lg md:text-2xl font-black uppercase tracking-tight">
                  {router.query?.type === 'bike' ? 'Bike' : 'Car'} Results
                </h1>
                <div className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                  {loading ? '...' : filteredResults.length} ITEMS
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded-full border border-white/10">
                  <span className="text-[7px] font-black opacity-70 uppercase tracking-widest">JST:</span>
                  <span className="text-[9px] font-bold text-orange-200">{currentTime}</span>
                </div>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-white/10 p-0.5 md:p-1 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#1e398a] shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#1e398a] shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 md:px-3 sm:px-6 lg:px-8 py-4 md:py-8">
          {/* Sticky Quick Filters */}
          {!loading && results.length > 0 && (
            <div className="sticky top-[56px] md:top-[72px] z-30 mb-4 md:mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 md:gap-2">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-2 shrink-0 hidden sm:block">Filter:</span>
                <button 
                  onClick={() => applyFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shrink-0 ${activeFilter === 'ALL' ? 'bg-[#1e398a] text-white shadow-lg' : 'bg-gray-50 dark:bg-slate-800 text-gray-400'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => applyFilter('HIGH_GRADE')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shrink-0 ${activeFilter === 'HIGH_GRADE' ? 'bg-[#1e398a] text-white shadow-lg' : 'bg-gray-50 dark:bg-slate-800 text-gray-400'}`}
                >
                  High Grade
                </button>
                <button 
                  onClick={() => applyFilter('LOW_MILEAGE')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shrink-0 ${activeFilter === 'LOW_MILEAGE' ? 'bg-[#1e398a] text-white shadow-lg' : 'bg-gray-50 dark:bg-slate-800 text-gray-400'}`}
                >
                  Low Mileage
                </button>
                <button 
                  onClick={() => applyFilter('WATCHLIST')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1 shrink-0 ${activeFilter === 'WATCHLIST' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-50 text-red-500'}`}
                >
                  Watchlist ({favorites.length})
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-[#1e398a] rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading listings...</p>
            </div>
          )}
          
          {!loading && results.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center shadow-xl border border-gray-100 dark:border-slate-800 max-w-2xl mx-auto">
              <div className="bg-gray-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1e398a] dark:text-blue-400 mb-4 uppercase">NO VEHICLES FOUND</h2>
              <p className="text-gray-400 mb-8 font-medium">We couldn't find any vehicles matching your current filters. Try broadening your search criteria.</p>
              <button onClick={() => router.push('/')} className="bg-[#1e398a] text-white px-10 py-4 rounded-2xl font-black tracking-widest hover:bg-blue-800 transition-all shadow-xl">
                BACK TO SEARCH
              </button>
            </div>
          )}

          {!loading && results.length > 0 && filteredResults.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No vehicles match the selected quick filter.</p>
              <button onClick={() => applyFilter('ALL')} className="mt-4 text-[#1e398a] font-black uppercase text-xs hover:underline">Show All Results</button>
            </div>
          )}
          
          {!loading && filteredResults.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ResultsGrid loading={loading} results={filteredResults} viewMode={viewMode} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ResultsPage;
