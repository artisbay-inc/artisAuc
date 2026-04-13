/**
 * SkeletonLot.js
 * Loading placeholder for lot detail page hero + content panels.
 */

export default function SkeletonLot() {
  return (
    <main className="lot-skeleton" aria-hidden="true">
      <div className="hero shimmer" />
      <div className="body">
        <div className="media shimmer" />
        <div className="side">
          <div className="block shimmer" />
          <div className="block shimmer" />
        </div>
      </div>
      <style jsx>{`
        .lot-skeleton {
          min-height: calc(100vh - 160px);
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          padding-bottom: 3rem;
        }
        .hero {
          height: 200px;
          margin-bottom: 2rem;
        }
        .body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.5rem;
        }
        .media {
          height: 520px;
          border-radius: 18px;
        }
        .side {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .block {
          height: 240px;
          border-radius: 18px;
        }
        .shimmer {
          border-radius: 0;
          background: linear-gradient(
            120deg,
            rgba(30, 57, 138, 0.12) 25%,
            rgba(29, 161, 242, 0.32) 50%,
            rgba(30, 57, 138, 0.12) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @media (max-width: 960px) {
          .body {
            grid-template-columns: 1fr;
          }
          .media {
            height: 360px;
          }
          .side .block {
            height: 200px;
          }
        }
      `}</style>
    </main>
  );
}
