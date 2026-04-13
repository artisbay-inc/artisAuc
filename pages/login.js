/**
 * pages/login.js
 * Enhanced Premium Login Page for ArtisbayCombined.
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!userId || !password) {
      setError('Required: Please enter your credentials');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('artisauc_user', JSON.stringify({
        userId: userId,
        name: userId.charAt(0).toUpperCase() + userId.slice(1),
        loggedInAt: new Date().toISOString()
      }));

      setLoading(false);
      const returnTo = router.query.returnTo || '/';
      router.push(returnTo);
    }, 800);
  };

  return (
    <>
      <Head>
        <title>Sign In | ArtisAuc Platform</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header user={null} />

        <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#1e398a]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-orange-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-500">
            {/* Logo/Brand Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-xl mb-6 border border-gray-50">
                <Image src="/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
              </div>
              <h1 className="text-3xl font-black text-[#1e398a] tracking-tight uppercase mb-2">Welcome Back</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Secure Auction Gateway</p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1e398a] via-[#1da1f2] to-orange-400"></div>
              
              <div className="mb-8 bg-blue-50/50 rounded-2xl p-4 flex gap-3 items-center border border-blue-100/50">
                <ShieldCheck className="text-[#1e398a] flex-shrink-0" size={20} />
                <p className="text-[10px] font-bold text-[#1e398a]/70 uppercase tracking-wider leading-relaxed">
                  Authorized access only. Your session is encrypted and monitored.
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-shake">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">User Identification</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1e398a] transition-colors" size={18} />
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Username or Staff ID"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-[#1e398a] outline-none focus:bg-white focus:border-blue-100 transition-all placeholder:text-gray-300"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Key</label>
                    <a href="#" className="text-[9px] font-black text-[#1da1f2] uppercase tracking-widest hover:underline">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1e398a] transition-colors" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-[#1e398a] outline-none focus:bg-white focus:border-blue-100 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1e398a] hover:bg-[#1d4ed8] text-white py-5 rounded-2xl font-black tracking-[0.2em] uppercase text-xs shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Secure Sign In
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">New to Artisbay?</p>
                <a
                  href="https://artisbay.com/register/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#1e398a] font-black text-xs uppercase tracking-[0.1em] hover:text-[#1da1f2] transition-colors"
                >
                  Create Business Account
                  <Info size={14} />
                </a>
              </div>
            </div>

            <p className="text-center mt-10 text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Artisbay Inc. All Rights Reserved.
            </p>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </>
  );
}
