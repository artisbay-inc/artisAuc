import { X, Scale, Trash2, CheckCircle2 } from 'lucide-react';
import useStore from '../store';
import Image from 'next/image';
import { useState } from 'react';

export default function ComparisonDrawer() {
  const { comparisonList, removeFromComparison, clearComparison } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (comparisonList.length === 0) return null;

  const specs = [
    { label: 'Year', key: 'year' },
    { label: 'Grade', key: 'grade' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Trans', key: 'transmission' },
    { label: 'Auction', key: 'auctionHouse' },
  ];

  return (
    <>
      {/* Comparison Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[85vh] rounded-[1.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/10">
            <div className="p-4 md:p-5 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <Scale size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#1e398a] dark:text-blue-400 uppercase tracking-tight">Comparison</h2>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">{comparisonList.length} Vehicles</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-3 md:p-5 bg-gray-50/30 dark:bg-slate-900/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {comparisonList.map(lot => (
                  <div key={lot.lotId} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col">
                    {/* Header Image: 40% Shorter, Wide Aspect */}
                    <div className="relative h-28 w-full bg-gray-100 dark:bg-slate-900">
                      <Image 
                        src={lot.thumbnail} 
                        alt="" 
                        fill 
                        className="object-cover" 
                        unoptimized 
                      />
                      {/* Integrated Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Lot #{lot.lotId}</p>
                            <h3 className="text-xs font-black text-white uppercase leading-none truncate w-40">
                              <span className="text-orange-400 mr-1">{lot.year}</span>
                              {lot.make} {lot.model}
                            </h3>
                          </div>
                          <button 
                            onClick={() => removeFromComparison(lot.lotId)}
                            className="p-1.5 bg-white/10 hover:bg-red-500/80 text-white rounded-lg backdrop-blur-md transition-all"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Condensed Data Grid (Cell Style) */}
                    <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-3">
                      {specs.map(spec => (
                        <div key={spec.key} className="flex flex-col border-b border-gray-50 dark:border-slate-700/50 pb-1.5">
                          <span className="text-[7px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                            {spec.label}
                          </span>
                          <span className="text-[13px] font-bold text-[#1e398a] dark:text-blue-100 truncate">
                            {lot[spec.key] || '—'}
                          </span>
                        </div>
                      ))}
                      {/* Auction Cell (Full Width) */}
                      <div className="col-span-2 flex flex-col pt-1">
                        <span className="text-[7px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                          Auction House
                        </span>
                        <span className="text-[11px] font-bold text-gray-600 dark:text-slate-400 truncate">
                          {lot.auctionHouse}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Placeholder for Add More */}
                {comparisonList.length < 4 && (
                  <div className="hidden lg:flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-2xl p-6 text-center">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-full mb-3 text-gray-300">
                      <Scale size={24} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Add up to {4 - comparisonList.length} more<br/>to compare
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-white dark:bg-slate-800 text-gray-400 font-black text-[10px] uppercase rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-100">
                Close
              </button>
              <button 
                onClick={() => { clearComparison(); setShowModal(false); }}
                className="px-5 py-2 bg-red-500 text-white font-black text-[10px] uppercase rounded-lg shadow-md hover:bg-red-600 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Drawer */}
      <div className={`fixed bottom-0 left-0 w-full z-[60] transition-transform duration-300 ease-in-out ${isMinimized ? 'translate-y-[calc(100%-48px)]' : 'translate-y-0'}`}>
        <div className="bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          {/* Header/Toggle Bar */}
          <div className="bg-[#1e398a] text-white px-4 py-2 flex justify-between items-center cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
            <div className="flex items-center gap-2">
              <Scale size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Comparison Drawer ({comparisonList.length})</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[9px] font-bold uppercase tracking-wider hover:underline">
                {isMinimized ? 'Expand' : 'Collapse'}
              </button>
              {isMinimized && (
                <button 
                  onClick={(e) => { e.stopPropagation(); clearComparison(); }}
                  className="text-[9px] font-black text-red-300 uppercase tracking-widest hover:text-red-100"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="p-3 md:p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">
                <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Comparison Queue</span>
                <span className="text-[10px] font-bold text-[#1e398a] dark:text-blue-400">{comparisonList.length} of 4 items selected</span>
              </div>
              <div className="flex gap-2">
                {comparisonList.length >= 2 && (
                  <button 
                    onClick={() => setShowModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-1.5"
                  >
                    Compare <CheckCircle2 size={12} />
                  </button>
                )}
                <button onClick={clearComparison} className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all">
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {comparisonList.map((lot) => (
                <div key={lot.lotId} className="relative bg-gray-50 dark:bg-slate-800 p-2 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center gap-2 group transition-all hover:border-blue-200">
                  <div className="relative w-12 h-9 flex-shrink-0 bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-gray-100 dark:border-slate-700">
                    <Image src={lot.thumbnail} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black text-[#1e398a] dark:text-blue-200 truncate">{lot.year} {lot.make}</p>
                    <p className="text-[8px] text-gray-400 font-bold truncate uppercase">{lot.model}</p>
                  </div>
                  <button 
                    onClick={() => removeFromComparison(lot.lotId)}
                    className="absolute -top-1.5 -right-1.5 bg-white dark:bg-slate-900 text-gray-400 hover:text-red-500 p-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-800"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              
              {/* Placeholders */}
              {Array.from({ length: 4 - comparisonList.length }).map((_, i) => (
                <div key={i} className="hidden md:flex items-center justify-center p-2 rounded-xl border-2 border-dashed border-gray-100 dark:border-slate-800 text-gray-200 dark:text-slate-800 font-black text-[9px] uppercase">
                  Empty Slot
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
