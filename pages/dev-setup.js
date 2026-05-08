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

      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-[#2c5aa0] text-3xl font-bold mb-4">Development Setup</h1>
        <p className="text-[#666] mb-8">
          Set up test membership and deposit data for development
        </p>

        <div className="bg-[#fff3cd] p-5 rounded-lg mb-8 border border-[#ffc107]">
          <h3 className="mt-0 font-bold">⚠️ Development Only</h3>
          <p className="m-0">This page is for development purposes only. Remove before deploying to production.</p>
        </div>

        {currentMembership ? (
          <div className="bg-[#d4edda] p-5 rounded-lg mb-5 border border-[#28a745]">
            <h3 className="mt-0 text-[#155724] font-bold">Current Membership</h3>
            <pre className="bg-white p-4 rounded mt-2 overflow-auto text-sm">
              {JSON.stringify(currentMembership, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="bg-[#f8d7da] p-5 rounded-lg mb-5 border border-[#dc3545]">
            <p className="m-0 text-[#721c24]">No membership data found</p>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button
            onClick={setupTestMembership}
            className="px-6 py-3 bg-[#27ae60] text-white border-none rounded cursor-pointer font-bold text-base hover:bg-[#219150] transition-colors"
          >
            Setup Test Membership
          </button>

          <button
            onClick={clearTestData}
            className="px-6 py-3 bg-[#e74c3c] text-white border-none rounded cursor-pointer font-bold text-base hover:bg-[#c0392b] transition-colors"
          >
            Clear Test Data
          </button>
        </div>

        {status && (
          <div className="bg-[#f0f4f8] p-4 rounded-lg text-base mb-8">
            {status}
          </div>
        )}

        <hr className="my-10 border-0 border-t border-[#ddd]" />

        <div>
          <h3 className="text-xl font-bold mb-4">Test URLs</h3>
          <ul className="list-disc ml-5 space-y-2">
            <li><a href="/" className="text-[#2c5aa0] hover:underline">Home (Car Search)</a></li>
            <li><a href="/bike-search" className="text-[#2c5aa0] hover:underline">Bike Search</a></li>
            <li><a href="/results?make=TOYOTA&model=ALL&auction=ALL AUCTIONS" className="text-[#2c5aa0] hover:underline">Search Results</a></li>
            <li><a href="/lot/USS-241122-01" className="text-[#2c5aa0] hover:underline">Lot Detail</a></li>
            <li><a href="/my-bids" className="text-[#2c5aa0] hover:underline">My Bids</a></li>
            <li><a href="/membership" className="text-[#2c5aa0] hover:underline">Membership Info</a></li>
            <li><a href="/auction-rules" className="text-[#2c5aa0] hover:underline">Auction Rules</a></li>
            <li><a href="/terms/artisauc" className="text-[#2c5aa0] hover:underline">Terms of Service</a></li>
            <li><a href="/privacy/artisauc" className="text-[#2c5aa0] hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
