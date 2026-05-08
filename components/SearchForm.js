/**
 * SearchForm.js
 * Shared search form for selecting make, model, and auction.
 * Refactored with Tailwind CSS for modern look and feel.
 */

export default function SearchForm({
  make,
  model,
  auction,
  makeOptions = [],
  modelOptions = [],
  auctionOptions = [],
  onMakeChange,
  onModelChange,
  onAuctionChange,
  onSubmit,
  submitLabel = 'Search Vehicles',
}) {
  return (
    <form name="searchForm" method="get" onSubmit={onSubmit} className="space-y-0 sm:space-y-6">
      <div className="bg-white rounded-none sm:rounded-[2rem] shadow-none sm:shadow-xl p-6 sm:p-8 border-b sm:border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Make Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Make</label>
            <select 
              name="make" 
              value={make} 
              onChange={(e) => onMakeChange(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-xl sm:rounded-2xl py-4 px-4 text-sm font-bold text-[#1e398a] outline-none focus:bg-white focus:border-blue-100 transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="ALL">-- ALL MAKES --</option>
              {makeOptions.map((makeName) => (
                <option key={makeName} value={makeName}>{makeName}</option>
              ))}
            </select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Model</label>
            <select 
              name="model" 
              value={model} 
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-xl sm:rounded-2xl py-4 px-4 text-sm font-bold text-[#1e398a] outline-none focus:bg-white focus:border-blue-100 transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="ALL">-- ALL MODELS --</option>
              {modelOptions.map((modelName) => (
                <option key={modelName} value={modelName}>{modelName}</option>
              ))}
            </select>
          </div>

          {/* Auction Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Auction House</label>
            <select 
              name="auction" 
              value={auction} 
              onChange={(e) => onAuctionChange(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-xl sm:rounded-2xl py-4 px-4 text-sm font-bold text-[#1e398a] outline-none focus:bg-white focus:border-blue-100 transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="ALL">-- ALL AUCTIONS --</option>
              {auctionOptions.map((auctionName) => (
                <option key={auctionName} value={auctionName}>{auctionName}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="mt-8 flex justify-center">
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-[#1e398a] hover:bg-[#1d4ed8] text-white px-12 py-4 rounded-xl sm:rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl active:scale-[0.98] transition-all"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
