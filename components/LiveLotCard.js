import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Gavel, ExternalLink } from 'lucide-react';
import useAuctionStore from '../store/auctionStore';
import AuctionTimer from './AuctionTimer';

export default function LiveLotCard({ auction }) {
  const { toggleWatchlist, watchlist, currentCurrency, convertPrice } = useAuctionStore();
  const car = auction.car;
  const isWatched = watchlist.includes(car.id);
  const [imgIdx, setImgIdx] = useState(0);
  const [pricePulse, setPricePulse] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPricePulse(true), 100);
    const t2 = setTimeout(() => setPricePulse(false), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const formatPrice = (priceUSD) => {
    const converted = convertPrice(priceUSD, 'USD', currentCurrency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 group flex flex-col">
      <div className="relative h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <Link href={`/lot/${car.id}`} target="_blank" className="relative w-full h-full block">
          <Image
            src={car.images?.[imgIdx] || car.imageThumbnail || 'https://images.unsplash.com/photo-1600712242805-5f4d5f8bc70c?w=600&h=450&fit=crop'}
            alt={`${car.make} ${car.model}`}
            fill
            unoptimized={true}
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-xl text-[#1e398a]">
              <ExternalLink size={20} />
            </div>
          </div>
        </Link>
        
        <div className="absolute top-3 left-3 bg-[#FF9900] text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md uppercase">
          Grade {car.grade || '4.5'}
        </div>
        
        {auction._source && (
          <div className={`absolute top-3 right-12 px-2 py-1 rounded-md shadow-md text-[8px] font-black uppercase tracking-wider ${
            auction._source === 'external_api' 
              ? 'bg-purple-600 text-white' 
              : auction._source === 'local_api'
              ? 'bg-green-600 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {auction._source === 'external_api' ? 'External' : auction._source === 'local_api' ? 'Local' : 'Mock'}
          </div>
        )}
        
        <button
          onClick={() => toggleWatchlist(car.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors z-10"
        >
          <Heart 
            size={18} 
            className={`${isWatched ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`}
          />
        </button>
        
        {car.images?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {car.images.map((_, i) => (
              <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/lot/${car.id}`} target="_blank" className="hover:underline group/title">
            <h3 className="font-black text-lg text-slate-900 leading-tight flex items-center gap-2">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">
              Chassis: {car.shortChassis || car.chassisNumber?.slice(-6)}
            </p>
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100/50 hover:scale-105 transition-transform">
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Mileage</span>
            <span className="text-xs font-bold text-slate-700">{car.mileage?.toLocaleString()} km</span>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100/50 hover:scale-105 transition-transform">
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Trans</span>
            <span className="text-xs font-bold text-slate-700">{car.transmission?.slice(0, 2) || 'AT'}</span>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100/50 hover:scale-105 transition-transform">
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Engine</span>
            <span className="text-xs font-bold text-slate-700">{car.engineSize?.split(' ')[0] || '3.0L'}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-1">Start Price</span>
              <span className={`text-xl font-black text-[#1e398a] ${pricePulse ? 'animate-pulse' : ''}`}>{formatPrice(auction.startingBid)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 items-center mt-auto">
          <div className="flex-1">
            <AuctionTimer endTime={auction.endTime} />
          </div>
          <Link 
            href={`/lot/${car.id}`}
            target="_blank"
            className="flex items-center gap-2 bg-[#FF9900] text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-[#e68a00] transition-all shadow-lg active:scale-95 uppercase tracking-widest"
          >
            <Gavel size={14} />
            BID
          </Link>
        </div>
      </div>
    </div>
  );
}

