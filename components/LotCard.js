/**
 * LotCard.js
 * Redesigned Card component for displaying vehicle lots in search results.
 * Matches the modern, premium Artisbay branding.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Gauge, Shield, Zap, ExternalLink, Heart, Scale } from 'lucide-react';
import useStore from '../store';

export default function LotCard({ lot, viewMode = 'list' }) {
  const { favorites, toggleFavorite, addToComparison, removeFromComparison, comparisonList } = useStore();
  if (!lot) return null;
  const { lotId, year, make, model, thumbnail, mileage, grade, transmission, auctionHouse } = lot;

  const isFavorite = favorites.includes(lotId);
  const isInComparison = comparisonList.some(item => item.lotId === lotId);

  return (
    <article className={`lot-card ${viewMode} group`}>
      <div className="lot-card-thumb">
        <Image
          src={thumbnail || '/images/placeholder-car.svg'}
          alt={`${make} ${model}`}
          fill
          unoptimized={true}
          className="lot-card-thumb-img transition-transform duration-500 group-hover:scale-105"
        />
        <div className="lot-badge">
          {grade || 'N/A'}
        </div>
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.preventDefault(); toggleFavorite(lotId); }}
            className={`p-1.5 rounded-full shadow-lg transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'}`}
            title={isFavorite ? 'Remove' : 'Add to Watchlist'}
          >
            <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              isInComparison ? removeFromComparison(lotId) : addToComparison(lot); 
            }}
            className={`p-1.5 rounded-full shadow-lg transition-all ${isInComparison ? 'bg-blue-600 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'}`}
            title={isInComparison ? 'Remove' : 'Add to Comparison'}
          >
            <Scale size={14} />
          </button>
        </div>
      </div>
      
      <div className="lot-card-body">
        <div className="lot-info">
          <div className="lot-header">
            <div className="lot-id-box">
              <span className="label">Lot #{lotId}</span>
              <span className="separator">•</span>
              <span className="auction-name">{auctionHouse}</span>
            </div>
          </div>

          <h3 className="lot-title truncate">
            {year} {make} {model}
          </h3>

          <div className="lot-specs-horizontal">
            <div className="spec-item">
              <Gauge size={12} className="spec-icon" />
              <span className="spec-value">{mileage}</span>
            </div>
            <span className="spec-divider">|</span>
            <div className="spec-item">
              <Shield size={12} className="spec-icon" />
              <span className="spec-value">{grade}</span>
            </div>
            <span className="spec-divider">|</span>
            <div className="spec-item">
              <Zap size={12} className="spec-icon" />
              <span className="spec-value truncate">{transmission}</span>
            </div>
          </div>
        </div>

        <div className="lot-card-actions">
          <Link href={`/lot/${encodeURIComponent(lotId)}`} className="btn-view">
            <span>Details</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .lot-card {
          display: flex;
          background: var(--card-bg);
          border-radius: 12px;
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .lot-card:hover {
          border-color: var(--primary);
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .lot-card.list {
          flex-direction: row;
          height: 120px;
        }

        .lot-card.grid {
          flex-direction: column;
        }

        .lot-card-thumb {
          position: relative;
          background: var(--surface);
          flex-shrink: 0;
          overflow: hidden;
        }

        .lot-card.list .lot-card-thumb {
          width: 180px;
          height: 100%;
        }

        .lot-card.grid .lot-card-thumb {
          width: 100%;
          aspect-ratio: 16/9;
        }

        :global(.lot-card-thumb-img) {
          object-fit: cover;
        }

        .lot-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: var(--accent);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(255, 153, 0, 0.3);
        }

        .lot-card-body {
          flex: 1;
          padding: 12px;
          display: flex;
          min-width: 0;
        }

        .lot-card.list .lot-card-body {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .lot-card.grid .lot-card-body {
          flex-direction: column;
          gap: 8px;
        }

        .lot-info {
          flex: 1;
          min-width: 0;
        }

        .lot-header {
          margin-bottom: 4px;
        }

        .lot-id-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
        }

        .separator {
          opacity: 0.3;
        }

        .lot-title {
          font-size: 16px;
          font-weight: 900;
          color: var(--ink);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .lot-specs-horizontal {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
        }

        .spec-icon {
          color: var(--primary);
          opacity: 0.7;
        }

        .spec-divider {
          color: var(--border);
          font-size: 11px;
        }

        .lot-card-actions {
          flex-shrink: 0;
          margin-left: 16px;
        }

        .btn-view {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--primary);
          color: white;
          padding: 12px 20px;
          min-height: 44px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 800;
          transition: all 0.2s;
          text-transform: uppercase;
          white-space: nowrap;
          justify-content: center;
        }

        .btn-view:hover {
          background: var(--secondary);
          transform: translateX(2px);
        }

        @media (max-width: 767px) {
          .lot-card, .lot-card.list, .lot-card.grid {
            flex-direction: row !important;
            height: 100px !important;
            align-items: stretch !important;
          }
          .lot-card-thumb {
            width: 120px !important;
            height: 100% !important;
            aspect-ratio: auto !important;
          }
          .lot-card-body {
            flex-direction: row !important;
            padding: 8px 12px !important;
            gap: 8px !important;
            align-items: center !important;
          }
          .lot-info {
            flex: 1;
          }
          .lot-title {
            font-size: 13px !important;
            margin-bottom: 4px !important;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            white-space: normal;
          }
          .lot-card-actions {
            margin-left: 4px !important;
            width: auto !important;
          }
          .btn-view {
            width: 36px !important;
            height: 36px !important;
            min-height: 36px !important;
            padding: 0 !important;
            border-radius: 50% !important;
          }
          .btn-view span {
            display: none;
          }
          .lot-specs-horizontal {
            gap: 6px !important;
          }
          .spec-item {
            font-size: 9px !important;
          }
          .spec-icon {
            width: 10px;
            height: 10px;
          }
          .spec-divider {
            display: none !important;
          }
          .lot-id-box {
            font-size: 7px !important;
            margin-bottom: 2px !important;
          }
          .lot-badge {
            top: 4px !important;
            left: 4px !important;
            font-size: 7px !important;
            padding: 1px 4px !important;
          }
        }
      `}</style>
    </article>
  );
}
