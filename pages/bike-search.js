/**
 * bike-search.js
 * Motorcycle search form modeled after car search, reusing shared components.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bikeModelsData from '../public/bike_models.json';
import auctionsData from '../public/auctions.json';

export default function BikeSearch() {
  const router = useRouter();
  const [make, setMake] = useState('ALL');
  const [model, setModel] = useState('ALL');
  const [auction, setAuction] = useState('ALL');
  const [user, setUser] = useState({ name: 'HAMIDI' });
  const [availableModels, setAvailableModels] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (make && make !== 'ALL' && bikeModelsData[make]) {
      setAvailableModels(bikeModelsData[make]);
      setModel('ALL');
    } else {
      setAvailableModels([]);
      setModel('ALL');
    }
  }, [make]);

  useEffect(() => {
    const updateTime = () => {
      const jst = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(jst);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setUser(null);
    alert('Logged out (placeholder).');
  };

  const handleLogin = () => {
    setUser({ name: 'HAMIDI' });
    alert('Logged in (placeholder).');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/results',
      query: { make, model, auction, type: 'bike' },
    });
  };

  // Fix: Add missing handleReset function
  const handleReset = () => {
    setMake('ALL');
    setModel('ALL');
    setAuction('ALL');
  };

  return (
    <>
      <Head>
        <title>Motorcycle Search | ArtisAuc</title>
      </Head>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="search-page">
        <div className="hero">
          <div className="hero-content">
            <h1>MOTORCYCLE SEARCH</h1>
            <div className="jst-clock">
              <div className="jst-label">Japan Standard Time</div>
              <div className="jst-time">{currentTime}</div>
            </div>
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="col">
              <h4>MAKE:</h4>
              <select
                size="10"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              >
                <option value="ALL">ALL MAKES</option>
                {Object.keys(bikeModelsData).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <h4>MODEL:</h4>
              <select
                size="10"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={make === 'ALL'}
              >
                <option value="ALL">ALL MODELS</option>
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <h4>AUCTION:</h4>
              <select
                size="10"
                value={auction}
                onChange={(e) => setAuction(e.target.value)}
              >
                <option value="ALL">ALL AUCTIONS</option>
                {auctionsData.auctions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="actions">
              <button type="submit" className="btn primary">
                SEARCH
              </button>
              <button type="button" className="btn ghost" onClick={handleReset}>
                CLEAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .search-page { background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%); min-height: calc(100vh - 120px); display: flex; flex-direction: column; }
        .hero { background: linear-gradient(135deg, #1E398A 0%, #1DA1F2 100%); padding: clamp(2rem, 6vh, 3rem) 1rem; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .hero-content { max-width: 720px; }
        .hero h1 { font-size: clamp(2.15rem, 4vw, 2.6rem); margin: 0 0 0.75rem; font-weight: 700; }
        .jst-clock { margin: 0.5rem 0 0; }
        .jst-label { font-size: 0.9rem; font-weight: 600; opacity: 0.9; margin-bottom: 0.25rem; }
        .jst-time { font-size: 1.1rem; font-weight: 700; }
        .container { width: min(1200px, 100%); margin: 0 auto; padding: clamp(1.25rem, 4vh, 2rem) clamp(1rem, 3vw, 1.5rem); flex: 1; display: flex; align-items: stretch; }
        .search-form { width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(30, 57, 138, 0.1); padding: clamp(1.5rem, 3vw, 2rem); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; min-height: clamp(320px, 55vh, 460px); }
        .col { display: flex; flex-direction: column; }
        .col h4 { color: #1E398A; font-size: 0.95rem; font-weight: 700; margin: 0 0 0.75rem; text-transform: uppercase; }
        .col select { width: 100%; padding: 0.5rem; border: 2px solid #e1e8ed; border-radius: 6px; font-size: 0.9rem; flex: 1; min-height: 200px; }
        .col select:focus { outline: none; border-color: #1DA1F2; box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1); }
        .actions { grid-column: 1 / -1; display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.5rem; padding-top: 1rem; border-top: 2px solid #e5e7eb; flex-wrap: wrap; }
        @media (max-width: 1024px) {
          .search-form { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .actions button { flex: 1 1 45%; }
        }
        @media (max-width: 768px) {
          .hero { padding: 2.2rem 1rem; }
          .search-form { grid-template-columns: 1fr; padding: 1.25rem; }
          .col select { min-height: 180px; }
          .actions button { width: 100%; }
        }
      `}</style>
    </>
  );
}
