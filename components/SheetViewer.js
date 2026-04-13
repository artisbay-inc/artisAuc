/**
 * SheetViewer.js
 * Displays the auction sheet image/placeholder with download link.
 */

import Image from 'next/image';

export default function SheetViewer({ sheetUrl, notes }) {
  return (
    <div className="sheet-viewer">
      <div className="sheet-header">
        <h3>Auction Sheet</h3>
        {sheetUrl && (
          <a href={sheetUrl} target="_blank" rel="noreferrer">
            Download Sheet
          </a>
        )}
      </div>
      {sheetUrl ? (
        <div className="sheet-image-wrapper">
          <Image
            src={sheetUrl}
            alt="Auction sheet"
            width={640}
            height={900}
            sizes="(max-width: 768px) 100vw, 600px"
            className="sheet-image"
          />
        </div>
      ) : (
        <div className="sheet-placeholder">
          <p>Sheet preview placeholder</p>
        </div>
      )}
      {notes && <p className="sheet-notes">{notes}</p>}
      <style jsx>{`
        .sheet-viewer {
          border: 1px solid #e5e7eb;
          padding: 16px;
          background: #fff;
        }
        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .sheet-header h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #1e398a;
        }
        .sheet-header a {
          color: #1da1f2;
          font-weight: 600;
          text-decoration: none;
        }
        .sheet-header a:hover {
          text-decoration: underline;
        }
        .sheet-image-wrapper {
          position: relative;
          width: 100%;
          min-height: 320px;
          border: 1px solid #e5e7eb;
          background: #f5f7fb;
          border-radius: 8px;
          overflow: hidden;
        }
        :global(.sheet-image) {
          object-fit: contain;
        }
        .sheet-placeholder {
          border: 2px dashed #cbd5f5;
          padding: 40px;
          text-align: center;
          color: #6b7280;
          background: #f9fbff;
        }
        .sheet-notes {
          margin-top: 12px;
          font-size: 0.95rem;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
