/**
 * Header.js
 * Optimized responsive header with mobile menu support.
 * Reduced font sizes and fixed layout issues for small screens.
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import useStore from '../store';

export default function Header({ user, onLogin = () => {}, onLogout = () => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = Boolean(user && user.name);

  const navLinks = [
    { href: '/', label: 'Search' },
    { href: '/live', label: 'Live' },
    { href: '/bike-search', label: 'Bikes' },
    { href: '/auction-rules', label: 'Rules' },
    { href: '/my-bids', label: 'Bids' },
    { href: '/auction-rules', label: 'Help' },
  ];

  return (
    <header className="site-header relative z-50 shadow-lg">
      <div className="page-shell">
        {/* We use a unique class 'header-container' to avoid conflicts with legacy CSS '.header-main' */}
        <div className="header-container flex flex-row items-center justify-between py-3 flex-nowrap">
          
          {/* Brand - Scaled down for mobile */}
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-sm md:text-base tracking-tight">ArtisAuc</span>
              <span className="text-white/60 text-[8px] uppercase tracking-widest font-bold hidden xs:block">Platform</span>
            </div>
          </Link>

          {/* Desktop Nav - Tightened spacing and smaller font */}
          <nav className="hidden lg:flex items-center gap-px">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <button onClick={onLogin} className="px-3 py-1 text-white font-bold text-[11px] hover:underline uppercase">
                    Login
                  </button>
                  <a
                    href="https://artisbay.com/register/"
                    className="bg-[#FF9900] text-white px-4 py-1.5 rounded-lg font-black text-[10px] uppercase shadow-md hover:bg-orange-600 transition-all tracking-wider"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Register
                  </a>
                </>
              ) : (
                <div className="flex items-center gap-2 bg-white/10 pl-3 pr-1 py-0.5 rounded-xl border border-white/10">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">Hi, {user.name}</span>
                  <button onClick={onLogout} className="bg-white text-[#1e398a] p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all">
                    <LogOut size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle - Fixed size to prevent wrapping */}
            <button 
              className="lg:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - More compact */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1e398a] border-t border-white/10 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col p-2">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="p-3 text-white text-xs font-bold border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <button onClick={() => { onLogin(); setIsMenuOpen(false); }} className="p-3 text-white text-xs font-bold text-center bg-white/10 rounded-lg uppercase">
                    LOGIN
                  </button>
                  <a
                    href="https://artisbay.com/register/"
                    className="p-3 bg-[#FF9900] text-white font-black text-xs text-center rounded-lg shadow-lg uppercase tracking-wider"
                    target="_blank"
                    rel="noreferrer"
                  >
                    JOIN NOW
                  </a>
                </>
              ) : (
                <>
                  <div className="p-2 text-white/50 text-center font-bold uppercase tracking-widest text-[9px]">
                    Hi, {user.name}
                  </div>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="p-3 bg-red-500 text-white font-black text-xs text-center rounded-lg shadow-lg uppercase">
                    LOGOUT
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 350px) {
          .xs\:block { display: none !important; }
        }
      `}</style>
    </header>
  );
}
