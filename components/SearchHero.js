/**
 * SearchHero.js
 * Hero section for search pages with image and JST clock
 * Displays search title, clock, and auction rules link
 */

import ClockJST from './ClockJST';

export default function SearchHero({ title = 'CAR SEARCH' }) {
  return (
    <div className="bg-white rounded-none sm:rounded-[2rem] shadow-none sm:shadow-lg p-6 mb-0 sm:mb-8 border-b sm:border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6 w-full sm:w-auto">
        <img 
          src="/images/search.svg" 
          width="120" 
          height="80"
          alt="find your vehicle"
          className="hidden md:block"
        />
        <div className="text-center sm:text-left w-full">
          <h3 className="text-[#1e398a] font-black text-2xl uppercase tracking-tight">{title}</h3>
          <div className="mt-2">
            <a href="/auction-rules" className="text-[10px] font-black text-orange-400 uppercase tracking-widest hover:underline" target="_blank">
              Auction Rules & Guidelines
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 text-center md:text-right w-full sm:w-auto">
        <ClockJST />
      </div>
    </div>
  );
}
