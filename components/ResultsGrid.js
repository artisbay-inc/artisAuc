/**
 * ResultsGrid.js
 * Wraps lot cards with responsive grid and optional skeletons.
 */

import LotCard from './LotCard';
import SkeletonCard from './SkeletonCard';

export default function ResultsGrid({ results = [], loading, viewMode = 'list', skeletonCount = 6 }) {
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
