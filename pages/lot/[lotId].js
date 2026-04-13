import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VehicleSpecsTable from '../../components/VehicleSpecsTable';
import SheetViewer from '../../components/SheetViewer';
import BidPanel from '../../components/BidPanel';
import SkeletonLot from '../../components/SkeletonLot';
import { hasMembership } from '../../utils/membership';
import { mockSearchCars } from '../../lib/mock-api';
import { mockCars as liveMockCars } from '../../lib/live-mock-data';

export default function LotDetailPage() {
  const router = useRouter();
  const { lotId } = router.query;
  const [user, setUser] = useState(null);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('artisauc_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (!hasMembership()) {
      const redirect = encodeURIComponent(router.asPath || `/lot/${lotId || ''}`);
      router.replace(`/membership?redirect=${redirect}`);
    } else {
      setAllowed(true);
    }
    setChecking(false);
  }, [router, lotId]);

  useEffect(() => {
    const updateTime = () => {
      const jst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      setCurrentTime(jst);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLotData = async () => {
      if (lotId && allowed) {
        setLoading(true);
        // Search in standard mock API data
        const allCars = await mockSearchCars();
        let foundLot = allCars.find(l => l.lotId === lotId || l.id === lotId);
        
        // If not found, search in Live mock data
        if (!foundLot) {
          const liveCar = liveMockCars.find(c => c.id === lotId || c.lotId === lotId);
          if (liveCar) {
            foundLot = {
              ...liveCar,
              lotId: liveCar.id,
              auctionHouse: 'Live Auction',
              auctionDate: 'LIVE NOW'
            };
          }
        }
        
        if (foundLot) {
          setLot({
            ...foundLot,
            // Add extra fields needed for detail page if not in mock
            lotId: foundLot.lotId || foundLot.id,
            chassis: foundLot.chassis || foundLot.chassisNumber || 'GRS214-0012345',
            fuel: foundLot.fuel || foundLot.fuelType || 'Gasoline',
            color: foundLot.color || foundLot.exteriorColor || 'Pearl White',
            steering: foundLot.steering || 'Right',
            engine: foundLot.engine || foundLot.engineSize || '2500cc',
            startPrice: foundLot.startPrice || (foundLot.startingBid ? `¥${foundLot.startingBid.toLocaleString()}` : '¥1,200,000'),
            sheetUrl: foundLot.sheetUrl || '/images/placeholder-sheet.png',
            images: foundLot.images || [foundLot.thumbnail, foundLot.thumbnail, foundLot.thumbnail]
          });
        }
        setLoading(false);
      }
    };
    fetchLotData();
  }, [lotId, allowed]);

  const handleAddToBids = ({ bidAmount, maxCeiling, customerNote, selectedGroup, selectedUnits }) => {
    // We remove the mandatory redirect to /login and /my-bids
    // to allow the BidPanel to show its success state.
    
    // Fallback user if not logged in
    const currentUser = user || { name: 'Guest' };
    
    console.log("Bid added locally to localStorage for redundancy:", {
      lotId: lot.lotId,
      bidAmount,
      selectedGroup,
      selectedUnits
    });

    // We still keep localStorage for backup, but the main work
    // is now handled by the BidPanel's direct API call to PHP.
    const bid = {
      lotId: lot.lotId,
      auction: lot.auctionHouse,
      auctionHouse: lot.auctionHouse,
      year: lot.year,
      make: lot.make,
      model: lot.model,
      vehicle: `${lot.year} ${lot.make} ${lot.model}`,
      chassis: lot.chassis,
      fuel: lot.fuel,
      grade: lot.grade,
      mileage: lot.mileage,
      color: lot.color,
      bidAmount,
      maxCeiling,
      customerNote,
      group: selectedGroup,
      units: selectedUnits,
      status: 'Pending',
      addedAt: new Date().toISOString()
    };
    const existingBids = JSON.parse(localStorage.getItem('myBids') || '[]');
    existingBids.push(bid);
    localStorage.setItem('myBids', JSON.stringify(existingBids));
  };

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { if (typeof window !== 'undefined') localStorage.removeItem('artisauc_user'); setUser(null); }} />
        <div className="flex-1 flex items-center justify-center p-12 bg-gray-50">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-[#1e398a] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!allowed) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }} />
        <SkeletonLot />
        <Footer />
      </div>
    );
  }

  if (!lot) return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }} />
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gray-50">
        <h2 className="text-2xl font-black text-[#1e398a] mb-2 uppercase">LOT NOT FOUND</h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">The requested vehicle is unavailable</p>
      </div>
      <Footer />
    </div>
  );

  const specRows = [
    { label: 'Year', value: lot.year },
    { label: 'Make', value: lot.make },
    { label: 'Model', value: lot.model },
    { label: 'Chassis', value: lot.chassis },
    { label: 'Mileage', value: lot.mileage },
    { label: 'Grade', value: lot.grade },
    { label: 'Fuel', value: lot.fuel },
    { label: 'Transmission', value: lot.transmission },
    { label: 'Color', value: lot.color },
    { label: 'Steering', value: lot.steering },
    { label: 'Engine', value: lot.engine },
    { label: 'Start Price', value: lot.startPrice },
  ];

  return (
    <>
      <Head>
        <title>{lot.year} {lot.make} {lot.model} - Lot {lot.lotId} | ArtisAuc</title>
      </Head>
      <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }} />
      <main className="lot-page">
        <div className="bg-gradient-to-br from-[#1e398a] to-[#1d4ed8] py-12 md:py-20 text-white px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase leading-none">
                {lot.year} {lot.make} {lot.model}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">LOT: {lot.lotId}</span>
                <span className="bg-orange-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{lot.auctionHouse}</span>
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{lot.auctionDate}</span>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md text-center md:text-right w-full md:w-auto">
              <div className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-1">Japan Standard Time</div>
              <div className="text-2xl font-mono font-bold text-orange-400">{currentTime}</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Media Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                <div className="relative h-[300px] md:h-[500px] bg-gray-50 dark:bg-slate-800 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center">
                  <Image 
                    src={lot.images[currentImage]} 
                    alt={lot.model} 
                    fill 
                    unoptimized={true}
                    className="object-contain p-4" 
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                  {lot.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImage(idx)}
                      className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-4 transition-all ${idx === currentImage ? 'border-orange-400' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img} alt="" fill unoptimized={true} className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                <h2 className="text-xl font-black text-[#1e398a] dark:text-blue-400 mb-6 uppercase tracking-tight">Inspection Sheet</h2>
                <SheetViewer sheetUrl={lot.sheetUrl} notes="Official auction house verification documents." />
              </div>
            </div>

            {/* Right Details Column - Sticky */}
            <div className="space-y-8 sticky top-24">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-[#1e398a] dark:text-blue-400 mb-6 uppercase tracking-tight">Specifications</h2>
                <div className="space-y-4">
                  {specRows.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-50 dark:border-slate-800 last:border-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{spec.label}</span>
                      <span className="text-sm font-bold text-[#1e398a] dark:text-blue-200">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-[#1e398a] dark:text-blue-400 mb-6 uppercase tracking-tight">Place Your Bid</h2>
                <BidPanel lot={lot} user={user} onSubmit={handleAddToBids} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
