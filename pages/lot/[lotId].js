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
import { mockSearchCars, mockLotList, fetchExternalApi } from '../../lib/mock-api';
import { mockCars as liveMockCars } from '../../lib/live-mock-data';
import { ShieldCheck, Info, Clock, FileText, Gavel, X } from 'lucide-react';
import { useToast } from '../../components/Toast';

export async function getStaticPaths() {
  const allCars = await mockSearchCars();
  const carPaths = allCars.map((car) => ({
    params: { lotId: car.lotId || car.id },
  }));
  const livePaths = liveMockCars.map((car) => ({
    params: { lotId: car.id || car.lotId },
  }));

  // Fetch PHP API live data to get DB IDs used by the store
  let apiPaths = [];
  try {
    const res = await fetch('http://localhost/ArtisbayCombined/api/get_live_auctions.php');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        apiPaths = data.flatMap(a => {
          const ids = [];
          if (a.id != null) ids.push({ params: { lotId: String(a.id) } });
          if (a.car?.id != null) ids.push({ params: { lotId: String(a.car.id) } });
          if (a.car?.lotId) ids.push({ params: { lotId: a.car.lotId } });
          return ids;
        });
      }
    }
  } catch (_) {}

  let extPaths = [];
  try {
    const res = await fetch('http://144.76.203.145/api/?ip=1.2.3.4&json&code=DvemR43s&sql=' + encodeURIComponent('SELECT * FROM main LIMIT 50'));
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        extPaths = data.map((_, idx) => ({ params: { lotId: `ext-${idx}` } }));
      }
    }
  } catch (_) {}

  return {
    paths: [...carPaths, ...livePaths, ...apiPaths, ...extPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { initialLotId: params.lotId } };
}

export default function LotDetailPage({ initialLotId }) {
  const router = useRouter();
  const lotId = router.query.lotId || initialLotId;
  const [user, setUser] = useState(null);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
        const allCars = await mockSearchCars();
        let foundLot = allCars.find(l => l.lotId === lotId || String(l.id) === lotId || String(l.lotId) === lotId);
        if (!foundLot) {
          const liveCar = liveMockCars.find(c => c.id === lotId || c.lotId === lotId);
          if (liveCar) {
            foundLot = { ...liveCar, lotId: liveCar.id, auctionHouse: 'Live Auction', auctionDate: 'LIVE NOW' };
          }
        }
        if (!foundLot && !lotId.startsWith('ext-')) {
          try {
            const r = await fetch('http://localhost/ArtisbayCombined/api/get_live_auctions.php');
            if (r.ok) {
              const data = await r.json();
              const match = data.find(a => String(a.id) === lotId || String(a.car?.id) === lotId || String(a.car?.lotId) === lotId);
              if (match) {
                const c = match.car || match;
                foundLot = {
                  lotId: c.lotId || match.id,
                  id: match.id,
                  year: c.year || '', make: c.make || '', model: c.model || '',
                  mileage: c.mileage || '', grade: c.grade || '', transmission: c.transmission || '',
                  auctionHouse: c.auctionHouse || '', auctionDate: c.auctionDate || '',
                  thumbnail: c.thumbnail || '', chassisNumber: c.chassisNumber || '',
                  exteriorColor: c.exteriorColor || '', engineSize: c.engineSize || '',
                  images: c.images || [c.thumbnail], startingBid: match.startingBid || 0,
                };
              }
            }
          } catch (_) {}
        }
        if (!foundLot && lotId.startsWith('ext-')) {
          let extData = await fetchExternalApi('SELECT * FROM main LIMIT 50');
          if (!extData.length) {
            try {
              const r = await fetch('http://144.76.203.145/api/?ip=1.2.3.4&json&code=DvemR43s&sql=' + encodeURIComponent('SELECT * FROM main LIMIT 50'));
              if (r.ok) extData = await r.json();
            } catch (_) {}
          }
          const idx = parseInt(lotId.replace('ext-', ''));
          const extRow = extData[idx];
          if (extRow) {
            foundLot = {
              lotId: lotId,
              id: lotId,
              year: extRow.YEAR || '',
              make: extRow.MARKA_NAME || '',
              model: extRow.MODEL_NAME || '',
              mileage: extRow.MILEAGE || '',
              grade: extRow.RATE || '',
              transmission: extRow.KPP || '',
              auctionHouse: extRow.TOWN || 'External Auction',
              auctionDate: extRow.AUCTION_DATE || '',
              thumbnail: extRow.IMAGES || '',
              chassisNumber: extRow.KUZOV || '',
              exteriorColor: extRow.COLOR || '',
              engineSize: extRow.ENG_V ? extRow.ENG_V + 'cc' : '',
              fuelType: extRow.FUEL || '',
              images: extRow.IMAGES ? [extRow.IMAGES] : [],
              startingBid: parseFloat(extRow.START) || 0,
              _source: 'external_api',
            };
          }
        }
        if (foundLot) {
          setLot({
            ...foundLot,
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

  const addToast = useToast();

  const handleAddToBids = (bidData) => {
    const bid = { ...bidData, lotId: lot.lotId, addedAt: new Date().toISOString(), status: 'Pending' };
    const existingBids = JSON.parse(localStorage.getItem('myBids') || '[]');
    existingBids.push(bid);
    localStorage.setItem('myBids', JSON.stringify(existingBids));
    addToast('Bid placed successfully!', 'success');
  };

  if (checking || loading) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-white">
        <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }} />
        <div className="flex-1 flex items-center justify-center p-12">{loading ? <SkeletonLot /> : <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>}</div>
        <Footer />
      </div>
    );
  }

  if (!allowed || !lot) return null;

  const specRows = [
    { label: 'Auction', value: lot.auctionHouse },
    { label: 'Lot No.', value: lot.lotId },
    { label: 'Year', value: lot.year },
    { label: 'Make', value: lot.make },
    { label: 'Model', value: lot.model },
    { label: 'Grade', value: lot.grade },
    { label: 'Mileage', value: lot.mileage },
    { label: 'Engine', value: lot.engine },
    { label: 'Chassis', value: lot.chassis },
    { label: 'Trans', value: lot.transmission },
    { label: 'Color', value: lot.color },
    { label: 'Price', value: lot.startPrice },
  ];

  const isAdmin = user?.userId?.toLowerCase() === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full overflow-x-hidden">
      <Head>
        <title>{lot.year} {lot.make} {lot.model} - Lot {lot.lotId}</title>
      </Head>
      
      <Header user={user} onLogin={() => router.push('/login')} onLogout={() => { localStorage.removeItem('artisauc_user'); setUser(null); }} />

      <main className="flex-1 w-full pb-24 md:pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#1e398a] via-[#1e398a] to-[#1DA1F2] text-white px-4 py-8 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="text-center md:text-left w-full">
              <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight leading-tight">{lot.year} {lot.make} {lot.model}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/10 uppercase tracking-widest">LOT: {lot.lotId}</span>
                <span className="bg-orange-400 px-3 py-1 rounded-full text-[10px] font-black shadow-lg uppercase tracking-widest">{lot.auctionHouse}</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/10 uppercase tracking-widest">{lot.auctionDate}</span>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md text-center md:text-right shrink-0">
              <div className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Japan Time</div>
              <div className="text-xl md:text-2xl font-mono font-bold text-orange-400">{currentTime}</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            
            {/* Left/Main Content: 8 columns on large screens */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Media Gallery */}
              <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="relative h-[250px] md:h-[500px] bg-slate-50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center border border-gray-50">
                  <img src={lot.images[currentImage]} alt={lot.model} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => setLightboxOpen(true)} />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {lot.images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImage(idx)} className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${idx === currentImage ? 'border-orange-400' : 'border-transparent opacity-60'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Specs: Visible only on small screens, comes after gallery */}
              <div className="lg:hidden bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-black text-[#1e398a] mb-4 uppercase flex items-center gap-2"><Info size={18} /> Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {specRows.map((spec, i) => (
                    <div key={i} className="border-b border-slate-50 pb-2">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</div>
                      <div className="text-xs font-bold text-slate-800 truncate">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auction Schedule */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-lg font-black text-[#1e398a] mb-6 uppercase flex items-center gap-2"><Clock size={18} /> Auction Schedule</h2>
                <div className="space-y-4">
                  {[
                    { time: '09:00', event: 'Final Inspection', status: 'done' },
                    { time: '11:30', event: 'Public Preview', status: 'done' },
                    { time: '14:45', event: 'Bidding Begins', status: 'now' },
                    { time: '17:00', event: 'Auction Close', status: 'next' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${s.status === 'done' ? 'bg-green-500' : s.status === 'now' ? 'bg-orange-400 animate-pulse' : 'bg-slate-200'}`}></div>
                      <div className="font-mono text-xs font-bold w-12 text-slate-400">{s.time}</div>
                      <div className={`text-sm font-bold flex-1 ${s.status === 'now' ? 'text-[#1e398a]' : 'text-slate-600'}`}>{s.event}</div>
                      <div className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${s.status === 'done' ? 'bg-green-50 text-green-600' : s.status === 'now' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>{s.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Sheet */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-lg font-black text-[#1e398a] mb-6 uppercase flex items-center gap-2"><FileText size={18} /> Inspection Sheet</h2>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center min-h-[300px]">
                   <img src={lot.sheetUrl} alt="Inspection" className="max-w-full rounded-lg shadow-sm" />
                </div>
              </div>

              {/* Admin Notes */}
              {isAdmin && (
                <div className="bg-orange-50 rounded-3xl p-6 md:p-8 border border-orange-100">
                  <div className="flex items-center gap-2 mb-4 text-orange-900"><ShieldCheck size={20} /> <span className="font-black uppercase tracking-tight">Staff Notes</span></div>
                  <p className="text-sm font-medium text-orange-800 leading-relaxed italic bg-white/50 p-4 rounded-xl">"Recommended for export. Condition matches sheet. Minor driver seat wear."</p>
                </div>
              )}
            </div>

            {/* Right Sidebar: 4 columns on large screens */}
            <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-[#1e398a] mb-6 uppercase tracking-tight">Specifications</h2>
                <div className="space-y-4">
                  {specRows.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</span>
                      <span className="text-sm font-bold text-[#1e398a] truncate ml-4">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div id="bid-section-desktop" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-xl font-black text-[#1e398a] mb-6 uppercase tracking-tight">Place Your Bid</h2>
                <BidPanel lot={lot} user={user} onSubmit={handleAddToBids} />
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Bid Section: Anchor for sticky bar */}
        <div id="bid-section-mobile" className="lg:hidden px-4 pb-12">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
             <h2 className="text-lg font-black text-[#1e398a] mb-4 uppercase flex items-center gap-2"><Gavel size={18} /> Place Bid</h2>
             <BidPanel lot={lot} user={user} onSubmit={handleAddToBids} />
          </div>
        </div>

        {/* Mobile Sticky Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 z-50 flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Start Price</span>
            <span className="text-lg font-black text-[#1e398a]">{lot.startPrice}</span>
          </div>
          <button 
            onClick={() => document.getElementById('bid-section-mobile')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 bg-[#1e398a] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
          >
            BID NOW
          </button>
        </div>
      </main>

      <Footer />

      {lightboxOpen && (
        <div className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white z-10 bg-black/30 p-2 rounded-full">
            <X size={28} />
          </button>
          <img src={lot.images[currentImage]} alt="" className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
