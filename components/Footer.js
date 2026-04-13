/**
 * Footer.js
 * Site footer component with brand blurb + copyright
 */

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="Artisbay Inc logo"
              width={72}
              height={72}
              className="footer-logo logo-transparent"
            />
            <p>
              ArtisAuc gives you direct access to Japan&apos;s auto auctions with transparent rules,
              clear timelines, and responsive support.
            </p>
          </div>

        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Artisbay Inc. — ArtisAuc Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
