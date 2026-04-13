/**
 * auction-rules.js
 * Displays auction rules and guidelines page
 */

import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AuctionRules() {
  const [user, setUser] = useState({ name: 'HAMIDI' });

  const handleLogout = () => {
    setUser(null);
    alert('Logged out (placeholder).');
  };

  const handleLogin = () => {
    setUser({ name: 'HAMIDI' });
    alert('Logged in (placeholder).');
  };

  return (
    <>
      <Head>
        <title>ArtisAuc - Auction Rules</title>
      </Head>

      <div id="container">
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

        <div id="content01" style={{ padding: '40px' }}>
          <h2 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Auction Rules & Guidelines</h2>
          
          <div style={{ lineHeight: '1.8' }}>
            <h3 style={{ color: '#2c5aa0', marginTop: '20px' }}>Bidding Rules</h3>
            <ul>
              <li>All bids are final and binding</li>
              <li>Minimum bid increments apply</li>
              <li>Payment must be completed within 3 business days</li>
            </ul>

            <h3 style={{ color: '#2c5aa0', marginTop: '20px' }}>Vehicle Inspection</h3>
            <ul>
              <li>All vehicles are sold as-is</li>
              <li>Inspection reports available before bidding</li>
              <li>Grade system applies to all vehicles</li>
            </ul>

            <h3 style={{ color: '#2c5aa0', marginTop: '20px' }}>Payment & Shipping</h3>
            <ul>
              <li>Multiple payment methods accepted</li>
              <li>Shipping arrangements available worldwide</li>
              <li>Export documentation provided</li>
            </ul>

            <h3 style={{ color: '#2c5aa0', marginTop: '20px' }}>Contact Support</h3>
            <p>For questions about auction rules, please contact our support team.</p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
