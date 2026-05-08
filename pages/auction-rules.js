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
  };

  const handleLogin = () => {
    setUser({ name: 'HAMIDI' });
  };

  return (
    <>
      <Head>
        <title>ArtisAuc - Auction Rules</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-3xl font-black text-[#1e398a] mb-8 uppercase tracking-tight border-b pb-6">
                Auction Rules & Guidelines
              </h2>
              
              <div className="space-y-10 text-gray-700 leading-relaxed">
                <section>
                  <h3 className="text-xl font-black text-[#1e398a] mb-4 uppercase tracking-wide">Bidding Rules</h3>
                  <ul className="list-disc ml-6 space-y-2 font-medium">
                    <li>All bids are final and binding</li>
                    <li>Minimum bid increments apply</li>
                    <li>Payment must be completed within 3 business days</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-black text-[#1e398a] mb-4 uppercase tracking-wide">Vehicle Inspection</h3>
                  <ul className="list-disc ml-6 space-y-2 font-medium">
                    <li>All vehicles are sold as-is</li>
                    <li>Inspection reports available before bidding</li>
                    <li>Grade system applies to all vehicles</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-black text-[#1e398a] mb-4 uppercase tracking-wide">Payment & Shipping</h3>
                  <ul className="list-disc ml-6 space-y-2 font-medium">
                    <li>Multiple payment methods accepted</li>
                    <li>Shipping arrangements available worldwide</li>
                    <li>Export documentation provided</li>
                  </ul>
                </section>

                <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-black text-[#1e398a] mb-2 uppercase tracking-wide">Contact Support</h3>
                  <p className="font-bold">For questions about auction rules, please contact our support team.</p>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
