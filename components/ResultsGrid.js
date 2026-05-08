/**
 * ResultsGrid.js
 * Wraps lot cards with responsive grid, list, or dense table views.
 */

import LotCard from './LotCard';
import SkeletonCard from './SkeletonCard';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ResultsGrid({ results = [], loading, viewMode = 'list', skeletonCount = 6 }) {
  if (viewMode === 'table' && !loading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lot Info</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Year/Make/Model</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Mileage</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Auction</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {results.map((lot) => (
              <tr key={lot.lotId} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-4">
                  <span className="text-[10px] font-black text-[#1e398a] bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tight">#{lot.lotId}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-slate-800">{lot.year} {lot.make} {lot.model}</div>
                </td>
                <td className="p-4 text-xs font-bold text-slate-600">{lot.mileage}</td>
                <td className="p-4">
                  <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">Grade {lot.grade}</span>
                </td>
                <td className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{lot.auctionHouse}</td>
                <td className="p-4 text-right">
                  <Link href={`/lot/${lot.lotId}/`} className="inline-flex items-center gap-2 text-[#1e398a] font-black text-[10px] uppercase tracking-widest hover:underline">
                    View <ExternalLink size={10} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={`results-grid ${viewMode}`}>
      {loading
        ? Array.from({ length: skeletonCount }).map((_, idx) => (
            <SkeletonCard key={idx} viewMode={viewMode} />
          ))
        : results.map((lot) => <LotCard key={lot.lotId} lot={lot} viewMode={viewMode} />)}

      <style jsx>{`
        .results-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        
        @media (min-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .results-grid.list {
            grid-template-columns: 1fr;
          }
          .results-grid.grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .results-grid.grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
