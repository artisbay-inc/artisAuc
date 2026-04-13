/**
 * membership/index.js
 * Explains membership requirements and allows setting the local membership flag.
 */

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { setMembership } from '../../utils/membership';

export default function MembershipPage() {
  const router = useRouter();
  const redirect = router.query.redirect;

  const handleConfirm = useCallback(() => {
    setMembership(true);
    if (typeof redirect === 'string') {
      router.replace(redirect);
    } else {
      router.replace('/');
    }
  }, [redirect, router]);

  return (
    <>
      <Head>
        <title>Membership Required | ArtisAuc</title>
      </Head>
      <div id="container">
        <Header user={{ name: 'HAMIDI' }} />
        <main className="membership-page">
          <section className="membership-card">
            <p className="eyebrow">Membership Required</p>
            <h1>ArtisAuc requires an active Artisbay Inc membership and deposit.</h1>
            <p>
              Access to auction data, bids, and lot details is limited to verified Artisbay members.
              Please confirm your membership status on Artisbay before continuing.
            </p>
            <div className="cta-group">
              <a
                className="btn ghost"
                href="https://artisbay.com/login"
                target="_blank"
                rel="noreferrer"
              >
                Go to Artisbay Account
              </a>
              <a
                className="btn ghost"
                href="https://artisbay.com/#deposits"
                target="_blank"
                rel="noreferrer"
              >
                Learn about Deposits
              </a>
              <button className="btn primary" type="button" onClick={handleConfirm}>
                I have membership
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <style jsx>{`
        .membership-page {
          padding: 28px;
        }
        .membership-card {
          border: 1px solid #e5e7eb;
          padding: 24px;
          background: #fff;
          max-width: 760px;
        }
        .cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
