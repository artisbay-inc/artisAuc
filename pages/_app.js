/**
 * _app.js
 * Next.js application wrapper component
 * Wraps all pages and imports global styles
 */

import '../styles/globals.css';
import '../styles/my-bids.css';
import ComparisonDrawer from '../components/ComparisonDrawer';
import { ToastProvider } from '../components/Toast';

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
      <ComparisonDrawer />
    </ToastProvider>
  );
}
