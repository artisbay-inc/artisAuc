/**
 * SkeletonCard.js
 * Loading placeholder for search results cards.
 */

export default function SkeletonCard({ viewMode = 'list' }) {
  return (
    <div className={`skeleton-card ${viewMode}`} aria-hidden="true">
      <div className="thumb shimmer" />
      <div className="content">
        <div className="line title shimmer" />
        <div className="line meta shimmer" />
        <div className="line meta shimmer" />
      </div>
      <style jsx>{`
        .skeleton-card {
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
          display: flex;
        }
        .skeleton-card.list {
          flex-direction: row;
          height: 120px;
        }
        .skeleton-card.grid {
          flex-direction: column;
          height: auto;
        }
        .thumb {
          background: #f8fafc;
          flex-shrink: 0;
        }
        .skeleton-card.list .thumb {
          width: 180px;
          height: 100%;
        }
        .skeleton-card.grid .thumb {
          width: 100%;
          aspect-ratio: 16/9;
        }
        .content {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .line {
          height: 12px;
          border-radius: 6px;
          background: #f1f5f9;
        }
        .title { width: 60%; height: 14px; }
        .meta { width: 40%; }
        
        .shimmer {
          background: linear-gradient(
            90deg,
            #f1f5f9 25%,
            #f8fafc 50%,
            #f1f5f9 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 767px) {
          .skeleton-card {
            flex-direction: row !important;
            height: 100px !important;
          }
          .thumb {
            width: 120px !important;
            height: 100% !important;
          }
          .content {
            padding: 8px 12px !important;
          }
          .title { width: 80%; }
        }
      `}</style>
    </div>
  );
}
