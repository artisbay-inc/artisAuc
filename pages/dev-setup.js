/**
 * dev-setup.js
 * Development utility page to set up test membership and deposit data
 * Only for development - remove in production
 */

import { useState } from 'react';
import Head from 'next/head';
import { setMembership, getMembershipDetails, clearMembership } from '../utils/membership';

export default function DevSetup() {
  const [status, setStatus] = useState('');
  const currentMembership = getMembershipDetails();

  const setupTestMembership = () => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 12); // Valid for 12 months

    const membershipData = {
      status: 'active',
      userId: 'TEST_USER_123',
      username: 'HAMIDI',
      email: 'test@example.com',
      expiryDate: expiryDate.toISOString(),
      createdAt: new Date().toISOString()
    };

    setMembership(membershipData);

    // Also set deposit data
    const depositData = {
      balance: 500000,
      currency: 'JPY',
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('Artisbay Inc_deposit', JSON.stringify(depositData));

    setStatus('✅ Test membership and deposit set up successfully!');
  };

  const clearTestData = () => {
    clearMembership();
    localStorage.removeItem('Artisbay Inc_deposit');
    setStatus('🗑️ Test data cleared');
  };

  return (
    <>
      <Head>
        <title>Dev Setup - ArtisAuc</title>
      </Head>

      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#2c5aa0' }}>Development Setup</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Set up test membership and deposit data for development
        </p>

        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ffc107' }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Development Only</h3>
          <p style={{ margin: 0 }}>This page is for development purposes only. Remove before deploying to production.</p>
        </div>

        {currentMembership ? (
          <div style={{ background: '#d4edda', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #28a745' }}>
            <h3 style={{ marginTop: 0, color: '#155724' }}>Current Membership</h3>
            <pre style={{ background: 'white', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(currentMembership, null, 2)}
            </pre>
          </div>
        ) : (
          <div style={{ background: '#f8d7da', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #dc3545' }}>
            <p style={{ margin: 0, color: '#721c24' }}>No membership data found</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={setupTestMembership}
            style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Setup Test Membership
          </button>

          <button
            onClick={clearTestData}
            style={{
              padding: '12px 24px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Clear Test Data
          </button>
        </div>

        {status && (
          <div style={{ background: '#f0f4f8', padding: '15px', borderRadius: '8px', fontSize: '16px' }}>
            {status}
          </div>
        )}

        <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

        <div>
          <h3>Test URLs</h3>
          <ul style={{ lineHeight: '2' }}>
            <li><a href="/" style={{ color: '#2c5aa0' }}>Home (Car Search)</a></li>
            <li><a href="/bike-search" style={{ color: '#2c5aa0' }}>Bike Search</a></li>
            <li><a href="/results?make=TOYOTA&model=ALL&auction=ALL AUCTIONS" style={{ color: '#2c5aa0' }}>Search Results</a></li>
            <li><a href="/lot/LOT-001" style={{ color: '#2c5aa0' }}>Lot Detail</a></li>
            <li><a href="/my-bids" style={{ color: '#2c5aa0' }}>My Bids</a></li>
            <li><a href="/membership" style={{ color: '#2c5aa0' }}>Membership Info</a></li>
            <li><a href="/auction-rules" style={{ color: '#2c5aa0' }}>Auction Rules</a></li>
            <li><a href="/terms/artisauc" style={{ color: '#2c5aa0' }}>Terms of Service</a></li>
            <li><a href="/privacy/artisauc" style={{ color: '#2c5aa0' }}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
