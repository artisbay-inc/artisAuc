/**
 * pages/index.js
 * Responsive Car search page with dynamic filters and calculator.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useStore from '../store.js';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Data imports for filters
import makeModelsData from '../public/make_models.json';
import auctionsData from '../public/auctions.json';

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useStore();
  
  // Search States
  const [make, setMake] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedAuctions, setSelectedAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  const makes = Object.keys(makeModelsData);

  // Sync User Session
  useEffect(() => {
    const storedUser = localStorage.getItem('artisauc_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [setUser]); 

  // Japan Standard Time Clock
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

  // Logic to update models list when make changes
  useEffect(() => {
    if (make && makeModelsData[make]) {
      setModels(makeModelsData[make]);
      setSelectedModels([]); // Reset selection when make changes
    } else {
      setModels([]);
    }
  }, [make]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.append('make', make);
    if (selectedModels.length) params.append('model', selectedModels.join(','));
    if (selectedAuctions.length) params.append('auction', selectedAuctions.join(','));
    router.push(`/results?${params.toString()}`);
  };

  const handleReset = () => {
    setMake('');
    setSelectedModels([]);
    setSelectedAuctions([]);
  };

  return (
    <>
      <Head>
        <title>Car Search | ArtisAuc</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header 
          user={user} 
          onLogin={() => router.push('/login')} 
          onLogout={() => {
            localStorage.removeItem('artisauc_user');
            useStore.getState().logout();
          }}
        />

        <main className="flex-1 bg-gray-50">
          {/* Hero Section */}
          <div className="bg-[#1e398a] py-12 md:py-20 flex items-center justify-center text-white px-6">
            <div className="text-center max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-2">CAR SEARCH</h1>
                <p className="text-blue-200 font-bold uppercase tracking-[0.2em] text-xs">Direct Japan Auction Access</p>
              </div>
              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md text-right w-full md:w-auto">
                <div className="text-[10px] font-black opacity-70 uppercase tracking-[0.3em] mb-1">Japan Standard Time</div>
                <div className="text-2xl md:text-3xl font-mono font-bold text-orange-400">{currentTime}</div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
            <div className="grid lg:grid-cols-4 gap-8 items-start">
              
              {/* --- DYNAMIC SEARCH FORM --- */}
              <form onSubmit={handleSearch} className="lg:col-span-3 bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* MAKE SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e398a] font-black text-xs">01</span>
                    <h4 className="text-[#1e398a] font-black text-xs uppercase tracking-widest">Select Make</h4>
                  </div>
                  <select 
                    size="1" 
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="md:hidden w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-blue-500/20 outline-none text-sm font-bold"
                  >
                    <option value="">-- All Makes --</option>
                    {makes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select 
                    size="12" 
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="hidden md:block w-full p-3 border border-gray-100 rounded-2xl focus:ring-2 ring-blue-500/20 outline-none text-sm h-80 overflow-auto custom-scrollbar shadow-inner bg-gray-50/50"
                  >
                    <option value="">-- All Makes --</option>
                    {makes.map((m) => (
                      <option key={m} value={m} className="py-2 px-3 rounded-lg m-1 hover:bg-white hover:text-blue-600 font-bold transition-all cursor-pointer">{m}</option>
                    ))}
                  </select>
                </div>

                {/* MODEL SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e398a] font-black text-xs">02</span>
                    <h4 className="text-[#1e398a] font-black text-xs uppercase tracking-widest">Select Model</h4>
                  </div>
                  <div className="md:hidden text-xs text-gray-400 font-bold mb-2">Choose models below</div>
                  <select 
                    multiple 
                    size="12" 
                    value={selectedModels}
                    disabled={!make}
                    onChange={(e) => setSelectedModels(Array.from(e.target.selectedOptions, (o) => o.value))}
                    className="w-full p-3 border border-gray-100 rounded-2xl focus:ring-2 ring-blue-500/20 outline-none text-sm h-80 overflow-auto custom-scrollbar disabled:opacity-30 bg-gray-50/50"
                  >
                    {models.map((model) => (
                      <option key={model} value={model} className="py-2 px-3 rounded-lg m-1 hover:bg-white hover:text-blue-600 font-bold transition-all cursor-pointer">{model}</option>
                    ))}
                  </select>
                </div>

                {/* AUCTION SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e398a] font-black text-xs">03</span>
                    <h4 className="text-[#1e398a] font-black text-xs uppercase tracking-widest">Select Auction</h4>
                  </div>
                  <select 
                    multiple 
                    size="12" 
                    value={selectedAuctions}
                    onChange={(e) => setSelectedAuctions(Array.from(e.target.selectedOptions, (o) => o.value))}
                    className="w-full p-3 border border-gray-100 rounded-2xl focus:ring-2 ring-blue-500/20 outline-none text-sm h-80 overflow-auto custom-scrollbar bg-gray-50/50"
                  >
                    {auctionsData.auctions.map((a) => (
                      <option key={a} value={a} className="py-2 px-3 rounded-lg m-1 hover:bg-white hover:text-blue-600 font-bold transition-all cursor-pointer">{a}</option>
                    ))}
                  </select>
                </div>

                {/* SEARCH ACTIONS */}
                <div className="md:col-span-3 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center">
                  <button type="submit" className="w-full md:w-auto bg-[#1e398a] text-white px-16 py-4 rounded-2xl font-black tracking-widest hover:bg-blue-800 transition-all shadow-xl active:scale-95 text-lg">
                    SEARCH VEHICLES
                  </button>
                  <button type="button" onClick={handleReset} className="w-full md:w-auto bg-gray-100 text-gray-500 px-16 py-4 rounded-2xl font-black tracking-widest hover:bg-gray-200 transition-all text-sm">
                    RESET FILTERS
                  </button>
                </div>
              </form>

              {/* --- COMPACT CALCULATOR SIDEBAR --- */}
              <aside className="lg:col-span-1 space-y-6">
                <button 
                  onClick={() => router.push('/calc')}
                  className="w-full group bg-gradient-to-br from-[#1e398a] to-blue-900 p-10 rounded-[2.5rem] shadow-xl border border-white/10 text-center transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700"></div>
                  <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-[#1e398a] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white group-hover:text-[#1e398a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-black text-2xl mb-2 tracking-tight">Tax Calculator</h3>
                  <p className="text-blue-100 text-xs leading-relaxed mb-8 opacity-70 font-bold uppercase tracking-widest">
                    Live Customs & Duties
                  </p>
                  <div className="inline-block bg-orange-400 text-white text-[10px] font-black tracking-[0.2em] px-8 py-3 rounded-full group-hover:bg-white group-hover:text-[#1e398a] transition-all">
                    START CALCULATION
                  </div>
                </button>

                {/* Live Rates Display */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-lg text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-4">Market Rates</span>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl">
                      <span className="text-[10px] font-black text-blue-900 uppercase">USD / JPY</span>
                      <span className="text-sm font-black text-[#1e398a]">159.53</span>
                    </div>
                    <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl">
                      <span className="text-[10px] font-black text-blue-900 uppercase">USD / RUB</span>
                      <span className="text-sm font-black text-[#1e398a]">81.14</span>
                    </div>
                  </div>
                </div>
              </aside>

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
