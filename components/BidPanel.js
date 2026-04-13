/**
 * BidPanel.js
 * Redesigned premium bid submission panel for lot pages.
 * Optimized for light backgrounds.
 */

import { useState, useEffect } from 'react';
import { Gavel, AlertCircle, MessageSquare, Info, Layers, Hash, CheckCircle2, Loader2 } from 'lucide-react';
import { placeBid } from '../lib/mock-api';

export default function BidPanel({ lot, onSubmit }) {
  const [bidAmount, setBidAmount] = useState('');
  const [maxCeiling, setMaxCeiling] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedUnits, setSelectedUnits] = useState('');
  const [isAfter15h, setIsAfter15h] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const EXCHANGE_RATE = 155; // 1 USD = 155 JPY (approximate)
  const AUCTION_FEE = 50000;
  const SHIPPING_EST = 120000;

  useEffect(() => {
    // Check if auction starts after 15:00 JST
    if (lot && lot.auctionTime) {
      const [hours, minutes] = lot.auctionTime.split(':').map(Number);
      if (hours >= 15) {
        setIsAfter15h(true);
        setSelectedGroup('');
        setSelectedUnits('');
      } else {
        setIsAfter15h(false);
      }
    }
  }, [lot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const bid = parseFloat(bidAmount);
    const ceiling = parseFloat(maxCeiling);

    if (isNaN(bid) || bid < 1000) {
      setError('Minimum bid amount is ¥1,000');
      setIsSubmitting(false);
      return;
    }

    if (isNaN(ceiling) || ceiling < bid) {
      setError('Maximum ceiling must be greater than or equal to bid amount');
      setIsSubmitting(false);
      return;
    }

    const bidData = {
      lotId: lot.lotId,
      bidAmount: bid,
      maxCeiling: ceiling,
      customerNote,
      selectedGroup,
      selectedUnits,
      userId: 1, // Default for now
    };

    const result = await placeBid(bidData);

    if (result.success) {
      setIsSuccess(true);
      if (onSubmit) onSubmit(bidData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setBidAmount('');
        setMaxCeiling('');
        setCustomerNote('');
        setSelectedGroup('');
        setSelectedUnits('');
      }, 3000);
    } else {
      setError(result.error || 'Failed to place bid. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const calculateLandedJPY = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    return num + AUCTION_FEE + SHIPPING_EST;
  };

  const formatUSD = (jpy) => {
    if (!jpy || isNaN(jpy)) return '0.00';
    return (parseFloat(jpy) / EXCHANGE_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const groups = ['A', 'B', 'C', 'D', 'E', 'F'];
  const units = [1, 2, 3, 4, 5];

  if (isSuccess) {
    return (
      <div className="bid-panel-content flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-xl font-black text-[#1e398a] uppercase tracking-wider">Bid Placed!</h3>
        <p className="text-sm font-bold text-gray-500 uppercase max-w-[250px]">
          Your bid for lot {lot.lotId} has been successfully submitted to the auction system.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-[10px] font-black uppercase text-blue-600 hover:underline"
        >
          Place another bid
        </button>
      </div>
    );
  }

  return (
    <div className="bid-panel-content">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Bid Amount Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e398a]">
            <Gavel size={14} className="text-orange-400" />
            Proxy Bid Amount (JPY ¥)
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-gray-300 group-focus-within:text-[#1e398a] transition-colors">¥</span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="e.g. 1,500,000"
              disabled={isSubmitting}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-xl font-black text-[#1e398a] placeholder:text-gray-300 focus:outline-none focus:border-blue-200 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              required
            />
          </div>
          <div className="flex flex-col gap-1 px-1">
            <div className="flex justify-between items-center">
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                * Standard auction increments apply
              </p>
              <p className="text-[10px] text-[#1e398a] font-black uppercase">
                Approx. ${formatUSD(bidAmount)} USD
              </p>
            </div>
            
            {/* Landed Cost Estimator */}
            {bidAmount && (
              <div className="mt-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tight text-blue-900/40">
                  <span>Est. Landed Total (Incl. Fees & Shipping)</span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-sm font-black text-[#1e398a]">¥{calculateLandedJPY(bidAmount).toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-blue-600">${formatUSD(calculateLandedJPY(bidAmount))} USD</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Group and Units Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e398a]">
              <Layers size={14} className="text-orange-400" />
              Group (ABCD...)
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              disabled={isAfter15h || isSubmitting}
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-black text-[#1e398a] focus:outline-none focus:border-blue-200 focus:bg-white transition-all shadow-inner appearance-none ${isAfter15h || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">No Group</option>
              {groups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e398a]">
              <Hash size={14} className="text-orange-400" />
              Units Wanted
            </label>
            <select
              value={selectedUnits}
              onChange={(e) => setSelectedUnits(e.target.value)}
              disabled={isAfter15h || !selectedGroup || isSubmitting}
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-black text-[#1e398a] focus:outline-none focus:border-blue-200 focus:bg-white transition-all shadow-inner appearance-none ${isAfter15h || !selectedGroup || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">Qty</option>
              {units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        
        {isAfter15h && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex gap-2 items-center">
            <AlertCircle size={14} className="text-orange-500" />
            <p className="text-[9px] text-orange-700 font-bold uppercase">Groups disabled for auctions after 15:00 JST</p>
          </div>
        )}

        {/* Max Ceiling Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e398a]">
            <AlertCircle size={14} className="text-orange-400" />
            Maximum Ceiling (JPY ¥)
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-gray-300 group-focus-within:text-[#1e398a] transition-colors">¥</span>
            <input
              type="number"
              value={maxCeiling}
              onChange={(e) => setMaxCeiling(e.target.value)}
              placeholder="e.g. 1,800,000"
              disabled={isSubmitting}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-xl font-black text-[#1e398a] placeholder:text-gray-300 focus:outline-none focus:border-blue-200 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              required
            />
          </div>
          <div className="flex justify-between items-center px-1">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              * Your absolute limit including fees
            </p>
            <p className="text-[10px] text-[#1e398a] font-black uppercase">
              Approx. ${formatUSD(maxCeiling)} USD
            </p>
          </div>
        </div>

        {/* Notes Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e398a]">
            <MessageSquare size={14} className="text-orange-400" />
            Bidding Instructions
          </label>
          <textarea
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            placeholder="Any specific requests or inspection focus points..."
            rows={3}
            disabled={isSubmitting}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-medium text-[#1e398a] placeholder:text-gray-300 focus:outline-none focus:border-blue-200 focus:bg-white transition-all resize-none shadow-inner disabled:opacity-50"
          />
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 items-start border border-blue-100">
          <Info size={18} className="text-[#1e398a] flex-shrink-0 mt-0.5" />
          <div className="text-[10px] text-blue-900/60 leading-relaxed font-bold uppercase tracking-tight">
            Bids are submitted directly to the auction house system. 
            Once confirmed, cancellations may incur penalties.
            {selectedGroup && selectedUnits && (
              <div className="mt-2 text-blue-700 font-black">
                GROUP BID: {selectedGroup}-{selectedUnits} (Buying {selectedUnits} unit{selectedUnits > 1 ? 's' : ''} from Group {selectedGroup})
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#1e398a] hover:bg-[#1d4ed8] text-white py-5 rounded-[1.5rem] font-black tracking-[0.2em] uppercase text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Gavel size={18} className="group-hover:rotate-12 transition-transform" />
          )}
          {isSubmitting ? 'Placing Bid...' : 'Confirm & Place Bid'}
        </button>

        <p className="text-center text-[9px] text-gray-400 font-black uppercase tracking-[0.1em]">
          Secured by Artisbay Inc. Auction Gateway
        </p>
      </form>
    </div>
  );
}
