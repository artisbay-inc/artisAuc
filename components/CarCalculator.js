import React, { useState, useEffect, useCallback } from 'react';
import { mockCalcFull, calc_custom_price } from '../lib/mock-api';

const CarCalculator = ({ onClick }) => {
  // States matching your original component
  const [auctionPriceJPY, setAuctionPriceJPY] = useState(5000); 
  const [year, setYear] = useState(2023);
  const [volume, setVolume] = useState(1800);
  const [fuel, setFuel] = useState(2); 
  const [powerPS, setPowerPS] = useState(52);
  const [powerElecPS, setPowerElecPS] = useState(0);
  const [dvs30, setDvs30] = useState(true);
  const [customPrice, setCustomPrice] = useState('5260');
  const [isProh, setIsProh] = useState(false);
  const [isProhVisible, setIsProhVisible] = useState(false);
  const [isProhDisabled, setIsProhDisabled] = useState(true);
  
  // Results
  const [jurUSD, setJurUSD] = useState('');
  const [fizUSD, setFizUSD] = useState('');
  const [totalOut, setTotalOut] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [priceCustomReadonly, setPriceCustomReadonly] = useState(0);

  // Exact rates from the sample footer
  const rates = { 
    JPY_RUB: 50.86 / 100, 
    USD_JPY: 155.53, 
    USD_RUB: 81.14, 
    EUR_RUB: 93.42 
  };

  const handleYearChange = useCallback(() => {
    const prohLow = 2021, prohLow2 = 2019, prohHigh = 2023;
    setIsProhVisible(true);
    if (year <= prohLow2) { setIsProh(false); setIsProhDisabled(true); } 
    else if (year <= prohLow) { setIsProh(true); setIsProhDisabled(false); } 
    else if (year >= prohHigh) { setIsProh(true); setIsProhDisabled(true); } 
    else { setIsProh(false); setIsProhDisabled(true); }
  }, [year]);

  const updateCustomPrice = useCallback(() => {
    if (priceCustomReadonly === 1) return;
    const price = calc_custom_price(fuel, year, volume, 'TOYOTA', 'COROLLA');
    setCustomPrice(price || 5260); // Defaulting to sample value
  }, [fuel, year, volume, priceCustomReadonly]);

  const updateCustomFromAuction = () => {
    if (priceCustomReadonly === 0) {
      const tc = Math.ceil(auctionPriceJPY / rates.USD_JPY);
      setCustomPrice(tc);
      setPriceCustomReadonly(1);
    }
  };

  const calculateFull = async () => {
    setCalculating(true);
    try {
      // 1. Expenditures in Japan
      const expJapanJPY = 65000;
      const freightUSD = 350;
      const totalJapanJPY = auctionPriceJPY + expJapanJPY;
      const totalJapanUSD = (totalJapanJPY / rates.USD_JPY) + freightUSD; // ~$788
      const totalJapanRUB = totalJapanUSD * rates.USD_RUB; // ~$64,002

      // 2. Expenses in Russia
      const dutyUSD = parseInt(customPrice) || 5260; 
      const feesRUB = 6000 + 6000 + 50000; // Warehouse + Broker + Glonass
      const totalRussiaRUB = (dutyUSD * rates.USD_RUB) + feesRUB; // ~$488,819

      // 3. Final Totals
      const grandTotalRUB = Math.round(totalJapanRUB + totalRussiaRUB);
      const grandTotalUSD = Math.round(grandTotalRUB / rates.USD_RUB);

      setFizUSD(`${dutyUSD} USD`);
      setJurUSD(`18498 USD`); // Sample static value for Legal Entity
      setTotalOut(`TOTAL IN DELIVERY CITY: ${grandTotalRUB} rub ($${grandTotalUSD})`);
      
      const fizEl = document.getElementById('poshl_fiz');
      if (fizEl) fizEl.style.background = '#eed79e';
    } catch (e) {
      alert('Error during calculation');
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => {
    handleYearChange();
    updateCustomPrice();
  }, [year, volume, fuel, handleYearChange, updateCustomPrice]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto" onClick={onClick}>
      <style jsx>{`
        .field-name { width: 180px; display: inline-block; text-align: right; padding-right: 10px; color: #364e8d; font-weight: bold; }
        .calc-input { border: 1px solid #bbb; padding: 2px 5px; width: 120px; outline: none; }
        .res-table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #f9f9f9; }
        .res-table td { padding: 8px; border: 1px solid #ddd; font-size: 14px; }
        .total-banner { color: #82b900; font-size: 20px; font-weight: bold; margin: 20px 0; }
      `}</style>
      
      <h2 className="text-xl font-bold mb-6 text-center">Calculator Cost of a car</h2>
      
      <div className="space-y-2">
        <div>
          <span className="field-name">Auction cost JPY</span>
          <input type="text" value={auctionPriceJPY} onChange={(e) => setAuctionPriceJPY(Number(e.target.value))} className="calc-input" onInput={updateCustomFromAuction} />
        </div>
        <div>
          <span className="field-name">* Year of release</span>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="calc-input" />
          <span className="ml-2 text-xs text-gray-500">{year >= 2023 && 'younger than 3 years'}</span>
        </div>
        <div className="flex items-start">
          <div className="flex-1">
            <div className="mb-2"><span className="field-name">* Volume of cube.c.</span><input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="calc-input" /></div>
            <div className="mb-2"><span className="field-name">* Power of L.s.</span><input type="number" value={powerPS} onChange={(e) => setPowerPS(Number(e.target.value))} className="calc-input" /></div>
            <div><span className="field-name">Powerful.electro L.S.</span><input type="number" value={powerElecPS} onChange={(e) => setPowerElecPS(Number(e.target.value))} className="calc-input" /></div>
          </div>
          <div className="text-xs space-y-1 pt-1">
            <label className="block"><input type="radio" checked={fuel === 2} onChange={() => setFuel(2)} /> Gasoline</label>
            <label className="block"><input type="radio" checked={fuel === 1} onChange={() => setFuel(1)} /> Diesel</label>
            <label className="block"><input type="radio" checked={fuel === 3} onChange={() => setFuel(3)} /> Electro</label>
            <label className="block"><input type="checkbox" checked={dvs30} onChange={(e) => setDvs30(e.target.checked)} /> Powerful.DVS &gt; max.30-min.ED</label>
          </div>
        </div>
      </div>

      <button onClick={calculateFull} className="w-full bg-blue-500 text-white py-2 rounded mt-6 font-bold hover:bg-blue-600">
        {calculating ? 'Calculating...' : 'Calculate'}
      </button>

      <table className="res-table text-center mt-4">
        <tbody>
          <tr>
            <td>Jure Fly</td><td>{jurUSD}</td>
            <td>Physical person</td><td id="poshl_fiz">{fizUSD}</td>
          </tr>
        </tbody>
      </table>

      <div className="total-banner">{totalOut}</div>

      <div className="text-xs text-gray-500 border-t pt-4 mt-4 font-mono">
        {rates.USD_RUB} USD/RUB | {rates.USD_JPY} USD/JPY | {rates.JPY_RUB * 100} 100JPY/RUB
      </div>
    </div>
  );
};

export default CarCalculator;