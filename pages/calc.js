import Head from 'next/head';
import CarCalculator from '../components/CarCalculator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useStore from '../store.js';

export default function CalcPage() {
  const { user } = useStore();

  return (
    <>
      <Head>
        <title>Car Calculator | ArtisAuc</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Header user={user} />
        <main className="pt-4 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-800 mb-4">Full Car Import Calculator</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Calculate exact import costs for legal/physical persons with custom value lookup</p>
              </div>
              <CarCalculator />
              <div className="mt-12 text-center">
                <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
                  ← Back to Search
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

