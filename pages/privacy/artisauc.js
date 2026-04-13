/**
 * privacy/artisauc.js
 * Privacy Policy page for ArtisAuc platform
 */

import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  const [username] = useState('HAMIDI');

  const handleLogout = () => {
    alert('Logout functionality to be implemented');
  };

  return (
    <>
      <Head>
        <title>Privacy Policy - ArtisAuc</title>
      </Head>

      <div id="container">
        <Header username={username} onLogout={handleLogout} />

        <div className="legal-container">
          <h1>ArtisAuc Privacy Policy</h1>
          <p className="updated">Last Updated: November 24, 2025</p>

          <section>
            <h2>1. Introduction</h2>
            <p>This Privacy Policy explains how Artisbay Inc. ("we," "us," or "our") collects, uses, and protects your personal information when you use ArtisAuc ("the Platform"). ArtisAuc is a sub-service of Artisbay Inc.</p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Account Information</h3>
            <p>Through your Artisbay Inc account, we collect:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment and deposit information</li>
            </ul>

            <h3>2.2 Bidding and Transaction Data</h3>
            <ul>
              <li>Bid history and preferences</li>
              <li>Search queries and filters used</li>
              <li>Vehicles viewed and saved</li>
              <li>Purchase history</li>
              <li>Communication with support</li>
            </ul>

            <h3>2.3 Technical Information</h3>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Usage patterns and Platform interactions</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process your bids and purchases</li>
              <li>Manage your account and deposits</li>
              <li>Communicate auction results and updates</li>
              <li>Provide customer support</li>
              <li>Improve the Platform and user experience</li>
              <li>Prevent fraud and unauthorized access</li>
              <li>Comply with legal obligations</li>
              <li>Send service updates and notifications</li>
            </ul>
          </section>

          <section>
            <h2>4. Information Sharing</h2>
            
            <h3>4.1 With Auction Houses</h3>
            <p>We share necessary information with Japanese auction houses to:</p>
            <ul>
              <li>Submit bids on your behalf</li>
              <li>Process purchases</li>
              <li>Arrange vehicle inspections</li>
              <li>Facilitate shipping and export</li>
            </ul>

            <h3>4.2 With Service Providers</h3>
            <p>We may share information with trusted third parties who assist us with:</p>
            <ul>
              <li>Payment processing</li>
              <li>Shipping and logistics</li>
              <li>Customer support services</li>
              <li>Platform hosting and maintenance</li>
            </ul>

            <h3>4.3 Legal Requirements</h3>
            <p>We may disclose information when required by law or to:</p>
            <ul>
              <li>Comply with legal process</li>
              <li>Enforce our Terms of Service</li>
              <li>Protect our rights and property</li>
              <li>Prevent fraud or illegal activities</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Storage and Security</h2>
            
            <h3>5.1 Storage</h3>
            <p>Your data is stored securely on servers located in Japan and other jurisdictions where Artisbay Inc. operates.</p>

            <h3>5.2 Security Measures</h3>
            <p>We implement industry-standard security measures including:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure socket layer (SSL) technology</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>

            <h3>5.3 Data Retention</h3>
            <p>We retain your information for as long as your account is active and for a reasonable period thereafter to comply with legal obligations and resolve disputes.</p>
          </section>

          <section>
            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze Platform usage and performance</li>
              <li>Personalize your experience</li>
              <li>Track auction searches and bids</li>
            </ul>
            <p>You can control cookie settings through your browser, but some features may not function properly if cookies are disabled.</p>
          </section>

          <section>
            <h2>7. Your Rights and Choices</h2>
            
            <h3>7.1 Access and Correction</h3>
            <p>You can access and update your personal information through your Artisbay Inc account at https://artisbay.com.</p>

            <h3>7.2 Data Deletion</h3>
            <p>You may request deletion of your data by contacting us. Note that some information may be retained as required by law or for legitimate business purposes.</p>

            <h3>7.3 Marketing Communications</h3>
            <p>You can opt out of marketing emails by using the unsubscribe link in our messages or updating your preferences in your Artisbay Inc account.</p>

            <h3>7.4 Do Not Track</h3>
            <p>We currently do not respond to "Do Not Track" browser signals, but you can control tracking through cookie settings.</p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>ArtisAuc is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.</p>
          </section>

          <section>
            <h2>9. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.</p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by:</p>
            <ul>
              <li>Posting the updated policy on the Platform</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending email notifications for material changes</li>
            </ul>
            <p>Your continued use of ArtisAuc after changes indicates acceptance of the updated policy.</p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how we handle your data, please contact:</p>
            <p><strong>Artisbay Inc.</strong><br />
            Privacy Officer<br />
            Email: privacy@https://artisbay.com<br />
            Website: https://artisbay.com</p>
          </section>

          <div className="acceptance">
            <p><strong>By using ArtisAuc, you consent to the collection and use of your information as described in this Privacy Policy.</strong></p>
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
