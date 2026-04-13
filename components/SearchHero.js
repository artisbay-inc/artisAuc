/**
 * SearchHero.js
 * Hero section for search pages with image and JST clock
 * Displays search title, clock, and auction rules link
 */

import ClockJST from './ClockJST';
import Image from 'next/image';

export default function SearchHero({ title = 'CAR SEARCH' }) {
  return (
    <div id="intro">
      <Image 
        src="/images/search.svg" 
        width={120} 
        height={80}
        alt="find your vehicle"
        style={{ float: 'left' }}
        priority
      />
      <h3 className="in_title">{title}</h3>
      <ClockJST />
      <div className="terms">
        <a href="/auction-rules" className="rule" target="_blank">Auction Rule</a><br />
      </div>
    </div>
  );
}
