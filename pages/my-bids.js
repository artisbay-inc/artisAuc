/**
 * my-bids.js
 * Displays user's saved auction bids from localStorage.
 * Shows bid summary stats and allows viewing/deleting bids.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { hasMembership } from '../utils/membership';
import { getMyBids } from '../lib/mock-api';
import { Loader2, RefreshCcw, Trash2, Eye } from 'lucide-react';

function MyBidsPage() {
  const router = useRouter();
  const [bids, setBids] = useState([]);
  const [user] = useState({ name: 'HAMIDI' });
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loadingBids, setLoadingBids] = useState(false);

  const fetchBids = async () => {
    setLoadingBids(true);
    const data = await getMyBids(1); // Default user ID
    setBids(data || []);
    setLoadingBids(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!hasMembership()) {
      const redirect = encodeURIComponent(router.asPath || '/my-bids');
      router.replace(`/membership?redirect=${redirect}`);
    } else {
      setAllowed(true);
    }
    setChecking(false);
  }, [router]);

  useEffect(() => {
    if (allowed) {
      fetchBids();
    }
  }, [allowed]);

  const handleDeleteBid = (bidId) => {
    if (!confirm('Remove this bid from your watchlist?')) return;
    // For now, we just filter it out locally as we haven't built delete_bid.php yet
    setBids(bids.filter((b) => b.bidId !== bidId));
  };

  const handleViewLot = (lotId) => {
    router.push(`/lot/${lotId}`);
  };

  const summary = bids.reduce(
    (acc, bid) => {
      acc.total += 1;
      const status = (bid.bidStatus || 'pending').toLowerCase();
      if (status === 'pending') acc.active += 1;
      if (status === 'won') acc.won += 1;
      if (status === 'lost') acc.outbid += 1;
      return acc;
    },
    { total: 0, active: 0, watching: 0, outbid: 0, won: 0 }
  );

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'won':
        return 'pill pill-won';
      case 'lost':
        return 'pill pill-outbid';
      case 'cancelled':
        return 'pill pill-watch';
      default:
        return 'pill pill-active';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (checking) {
    return (
      <>
        <Header user={user} />
        <main className="my-bids-content">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-[#1e398a]" size={32} />
            <p className="ml-3 font-bold uppercase text-[10px] text-[#1e398a]">Checking membership…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!allowed) return null;

  return (
    <>
      <Head>
        <title>My Bids | ArtisAuc</title>
        <meta name="description" content="Track your active auction bids and watchlist." />
      </Head>
      <Header user={user} />

      <main className="my-bids-content">
        <header className="my-bids-hero flex justify-between items-center">
          <div>
            <h1>My Bids</h1>
            <p className="lede">Track and manage your auction bids</p>
          </div>
          <button 
            onClick={fetchBids} 
            disabled={loadingBids}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-[#1e398a] hover:bg-gray-50 transition-all shadow-sm"
          >
            {loadingBids ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
            Refresh
          </button>
        </header>

        <div className="page-shell">
          <section className="bid-summary">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Account Summary</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-value">{summary.total}</span>
                <span className="summary-label">Total Bids</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{summary.active}</span>
                <span className="summary-label">Active</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{summary.outbid}</span>
                <span className="summary-label">Outbid</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{summary.won}</span>
                <span className="summary-label">Won</span>
              </div>
            </div>
          </section>

          {loadingBids && bids.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100">
               <Loader2 className="animate-spin text-[#1e398a] mb-4" size={32} />
               <p className="font-black uppercase text-[10px] text-[#1e398a]">Loading your bids...</p>
            </div>
          ) : bids.length === 0 ? (
            <section className="empty-state">
              <h3>No bids yet</h3>
              <p>Search for vehicles and add bids to start tracking auctions.</p>
              <button
                className="btn primary"
                onClick={() => router.push('/')}
              >
                Start Searching
              </button>
            </section>
          ) : (
            <section className="bid-table-section">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bid History ({bids.length})</h2>
              <div className="table-wrapper">
                <table className="bids-table-full">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Lot ID</th>
                      <th>Make/Model</th>
                      <th>Year</th>
                      <th>Bid Amount</th>
                      <th>Date Placed</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bid) => (
                      <tr key={bid.bidId}>
                        <td>
                          {bid.thumbnail ? (
                            <img src={bid.thumbnail} alt="Car" className="w-16 h-10 object-cover rounded-lg border border-gray-100" />
                          ) : (
                            <div className="w-16 h-10 bg-gray-50 rounded-lg border border-dashed border-gray-200" />
                          )}
                        </td>
                        <td className="font-black text-[#1e398a]">{bid.lotId}</td>
                        <td className="font-bold">
                          {bid.make ? `${bid.make} ${bid.model}` : 'Unknown Vehicle'}
                        </td>
                        <td className="font-black text-[#1e398a]">
                          {bid.selectedGroup ? `${bid.selectedGroup}-${bid.selectedUnits}` : '—'}
                        </td>
                        <td>{bid.year || '—'}</td>
                        <td className="font-black text-green-600">¥{Number(bid.bidAmount).toLocaleString()}</td>
                        <td className="text-[11px] text-gray-500">{formatDate(bid.created_at)}</td>
                        <td>
                          <span className={getStatusClass(bid.bidStatus)}>{bid.bidStatus || 'Pending'}</span>
                        </td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              className="p-2 hover:bg-blue-50 text-[#1e398a] rounded-lg transition-all" 
                              onClick={() => handleViewLot(bid.lotId)}
                              title="View Lot"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all" 
                              onClick={() => handleDeleteBid(bid.bidId)}
                              title="Delete Bid"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      {/* (Styles remain the same) */}

      <style jsx>{`
        .my-bids-content {
          min-height: calc(100vh - 140px);
          background: linear-gradient(135deg, #f5f7fa 0%, #e1e8f5 100%);
          padding: clamp(1.5rem, 3vw, 3rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2vw, 2rem);
        }
        .my-bids-hero {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1.75rem clamp(1rem, 3vw, 2.5rem);
        }
        .my-bids-hero h1 {
          font-size: clamp(2rem, 3vw, 2.5rem);
          margin: 0 0 0.35rem;
          color: #1e398a;
        }
        .lede {
          font-size: 1.05rem;
          color: #4b5563;
          margin: 0;
        }
        .page-shell {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2vw, 2rem);
          min-height: 0;
        }
        .bid-summary h2 {
          margin: 0 0 0.75rem;
          color: #0f172a;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }
        .summary-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 1.25rem;
          text-align: center;
        }
        .summary-value {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #1e398a;
        }
        .summary-label {
          display: block;
          color: #6b7280;
          margin-top: 0.25rem;
          letter-spacing: 0.5px;
        }
        .bid-table-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .bid-table-section h2 {
          margin-bottom: 0.75rem;
        }
        .table-wrapper {
          flex: 1;
          min-height: 0;
          overflow: auto;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .bids-table-full {
          width: 100%;
          border-collapse: collapse;
          min-width: 960px;
        }
        .bids-table-full th,
        .bids-table-full td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
          font-size: 0.95rem;
        }
        .bids-table-full th {
          background: #f3f4f6;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          color: #6b7280;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .bids-table-full tr:last-child td {
          border-bottom: none;
        }
        .max-bid {
          margin-top: 0.35rem;
          font-size: 0.85rem;
          color: #059669;
        }
        .table-actions {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .empty-state h3 {
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .empty-state p {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 768px) {
          .my-bids-content {
            padding: 1.25rem;
          }
          .table-wrapper {
            border-radius: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default MyBidsPage;
