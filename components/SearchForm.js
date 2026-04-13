/**
 * SearchForm.js
 * Shared search form for selecting make, model, and auction.
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
    <form name="searchForm" method="get" onSubmit={onSubmit}>
      <table className="search_table">
        <tbody>
          <tr>
            <td className="label">Make:</td>
            <td>
              <select name="make" value={make} onChange={(e) => onMakeChange(e.target.value)}>
                <option value="ALL">ALL MAKES</option>
                {makeOptions.map((makeName) => (
                  <option key={makeName} value={makeName}>
                    {makeName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">Model:</td>
            <td>
              <select name="model" value={model} onChange={(e) => onModelChange(e.target.value)}>
                <option value="ALL">ALL MODELS</option>
                {modelOptions.map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">Auction:</td>
            <td>
              <select name="auction" value={auction} onChange={(e) => onAuctionChange(e.target.value)}>
                <option value="ALL">ALL AUCTIONS</option>
                {auctionOptions.map((auctionName) => (
                  <option key={auctionName} value={auctionName}>
                    {auctionName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' }}>
              <button type="submit" className="btn primary search_button">
                {submitLabel}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
