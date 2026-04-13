/**
 * terms/artisauc.js
 * Terms and Conditions page for ArtisAuc platform
 */

import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfService() {
  const [username] = useState('HAMIDI');

  const handleLogout = () => {
    alert('Logout functionality to be implemented');
  };

  return (
    <>
      <Head>
        <title>Terms of Service - ArtisAuc</title>
      </Head>

      <div id="container">
        <Header username={username} onLogout={handleLogout} />

        <div className="legal-container">
          <h1>ArtisAuc Terms of Service</h1>
          <p className="updated">Last Updated: November 24, 2025</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using ArtisAuc ("the Platform"), a service provided by Artisbay Inc., you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.</p>
          </section>

          <section>
            <h2>2. Service Description</h2>
            <p>ArtisAuc provides access to Japanese auto auction listings and facilitates bid placement on behalf of users. The Platform is a sub-service of Artisbay Inc. and requires a valid Artisbay Inc account.</p>
          </section>

          <section>
            <h2>3. Account Requirements</h2>
            <h3>3.1 Artisbay Inc Account</h3>
            <p>To use ArtisAuc, you must:</p>
            <ul>
              <li>Maintain an active Artisbay Inc account</li>
              <li>Have a verified email address</li>
              <li>Maintain a deposit balance with Artisbay Inc.</li>
              <li>Comply with all Artisbay Inc Terms of Service</li>
            </ul>

            <h3>3.2 Account Management</h3>
            <p>All account management, including profile updates, deposit management, and membership settings, must be performed through your main Artisbay Inc account at https://artisbay.com. ArtisAuc does not provide independent account management features.</p>
          </section>

          <section>
            <h2>4. Bidding and Purchases</h2>
            <h3>4.1 Bid Submission</h3>
            <p>When you place a bid through ArtisAuc:</p>
            <ul>
              <li>Your bid is a legally binding offer to purchase</li>
              <li>You authorize Artisbay Inc. to bid on your behalf at the auction</li>
              <li>You commit to completing the purchase if your bid wins</li>
              <li>Sufficient deposit funds must be available to cover your bid</li>
            </ul>

            <h3>4.2 Winning Bids</h3>
            <p>If your bid is successful:</p>
            <ul>
              <li>You are obligated to complete the purchase</li>
              <li>Payment will be deducted from your Artisbay Inc deposit</li>
              <li>Additional fees (auction fees, shipping, etc.) will apply</li>
              <li>Cancellation may result in penalties or account suspension</li>
            </ul>
          </section>

          <section>
            <h2>5. Deposits and Payments</h2>
            <h3>5.1 Deposit Requirement</h3>
            <p>A minimum deposit is required to place bids. Deposit amounts and requirements are set by Artisbay Inc. and managed through your Artisbay Inc account.</p>

            <h3>5.2 Payment Processing</h3>
            <p>All payments are processed by Artisbay Inc. ArtisAuc does not directly handle financial transactions.</p>
          </section>

          <section>
            <h2>6. Vehicle Information</h2>
            <h3>6.1 Accuracy</h3>
            <p>While we strive for accuracy, vehicle information is provided by auction houses and third parties. We do not guarantee the accuracy of:</p>
            <ul>
              <li>Vehicle specifications</li>
              <li>Mileage readings</li>
              <li>Condition reports</li>
              <li>Auction grades</li>
            </ul>

            <h3>6.2 Inspection</h3>
            <p>Vehicles are sold "as-is" based on auction inspection reports. We recommend reviewing all available documentation before bidding.</p>
          </section>

          <section>
            <h2>7. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and current information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the Platform only for lawful purposes</li>
              <li>Not manipulate or attempt to manipulate auction results</li>
              <li>Comply with all applicable import/export regulations</li>
            </ul>
          </section>

          <section>
            <h2>8. Prohibited Activities</h2>
            <p>You may not:</p>
            <ul>
              <li>Place bids without intent or ability to purchase</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to circumvent the Platform to bid directly</li>
              <li>Use automated tools or bots for bidding</li>
              <li>Violate any auction house rules or regulations</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>Artisbay Inc. and ArtisAuc are not liable for:</p>
            <ul>
              <li>Auction house errors or disputes</li>
              <li>Vehicle defects or misrepresentation by sellers</li>
              <li>Shipping delays or damages</li>
              <li>Currency exchange rate fluctuations</li>
              <li>Import/customs issues</li>
            </ul>
          </section>

          <section>
            <h2>10. Service Modifications</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Modify or discontinue the Platform at any time</li>
              <li>Change fees and pricing with notice</li>
              <li>Update these Terms of Service</li>
              <li>Suspend or terminate accounts for violations</li>
            </ul>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>These Terms are governed by the laws of Japan and the jurisdiction where Artisbay Inc. is registered.</p>
          </section>

          <section>
            <h2>12. Contact Information</h2>
            <p>For questions about these Terms, please contact:</p>
            <p><strong>Artisbay Inc.</strong><br />
            Email: sales@artisbay.com<br />
            Website: https://artisbay.com</p>
          </section>

          <div className="acceptance">
            <p><strong>By using ArtisAuc, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong></p>
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{`
        .legal-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        h1 {
          color: #2c5aa0;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .updated {
          color: #666;
          font-size: 14px;
          margin-bottom: 30px;
        }

        section {
          margin-bottom: 35px;
        }

        h2 {
          color: #2c5aa0;
          font-size: 24px;
          margin-bottom: 15px;
          margin-top: 25px;
        }

        h3 {
          color: #333;
          font-size: 18px;
          margin-bottom: 12px;
          margin-top: 18px;
        }

        p {
          line-height: 1.7;
          color: #333;
          margin-bottom: 12px;
        }

        ul {
          margin-left: 20px;
          margin-bottom: 15px;
        }

        li {
          line-height: 1.8;
          color: #333;
          margin-bottom: 8px;
        }

        .acceptance {
          background: #f0f4f8;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2c5aa0;
          margin-top: 40px;
        }

        .acceptance p {
          margin: 0;
          color: #2c5aa0;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
