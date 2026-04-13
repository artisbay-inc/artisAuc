/**
 * lib/mock-api.js - Fixed version with proper filtering and expanded mock data
 */

const mockLots = [
  {
    lotId: 'USS-241122-01',
    year: 2021,
    make: 'Toyota',
    model: 'Prius',
    mileage: '22,400 km',
    grade: '4.5',
    transmission: 'Hybrid e-CVT',
    auctionHouse: 'USS Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1593414220166-085ca8021451?w=600&h=400&fit=crop',
    auctionDate: '2025-11-24',
  },
  {
    lotId: 'USS-241122-02',
    year: 2019,
    make: 'Honda',
    model: 'CR-V',
    mileage: '45,200 km',
    grade: '4.0',
    transmission: 'AT',
    auctionHouse: 'USS Nagoya',
    thumbnail: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=600&h=400&fit=crop',
    auctionDate: '2025-11-25',
  },
  {
    lotId: 'USS-241122-03',
    year: 2020,
    make: 'Nissan',
    model: 'Skyline',
    mileage: '15,000 km',
    grade: '5.0',
    transmission: 'AT',
    auctionHouse: 'USS Yokohama',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop',
    auctionDate: '2025-11-26',
  },
  {
    lotId: 'USS-241122-04',
    year: 2018,
    make: 'Honda',
    model: 'Civic',
    mileage: '32,000 km',
    grade: '4.5',
    transmission: 'MT',
    auctionHouse: 'USS Osaka',
    thumbnail: 'https://images.unsplash.com/photo-1606225453000-8461757827e7?w=600&h=400&fit=crop',
    auctionDate: '2025-11-27',
  },
  {
    lotId: 'USS-241122-05',
    year: 2022,
    make: 'Toyota',
    model: 'Land Cruiser',
    mileage: '5,000 km',
    grade: 'S',
    transmission: 'AT',
    auctionHouse: 'USS Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop',
    auctionDate: '2025-11-28',
  },
  {
    lotId: 'USS-241122-06',
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    mileage: '12,000 km',
    grade: '4.5',
    transmission: 'AT',
    auctionHouse: 'USS Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    auctionDate: '2025-11-29',
  }
];

const mockBikeLots = [
  {
    lotId: 'USS-B-001',
    year: 2022,
    make: 'Honda',
    model: 'CB400 Super Four',
    mileage: '2,000 km',
    grade: '5',
    transmission: '6MT',
    auctionHouse: 'USS Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop',
    auctionDate: '2025-11-30',
  }
];

const normalize = (value) => (value || '').toString().toLowerCase().trim();

// Complete custom_price table from calc.html sample
const min_year = 2011;
const max_year = 2019;
const max_volume = 4000;
const custom_years = {2019:4,2018:5,2017:6,2016:7,2015:8,2014:9,2013:10,2012:11,2011:12};
const custom_price = [
  ["TOYOTA","COROLLA","",2000,0,9000,7000,600,8000,10000,6000,14000,16000,5900],
  ["TOYOTA","CAMRY","",2500,0,2000,16000,14000,12000,8500,13000,20000,3800,4600],
  ["TOYOTA","PRADO","",10000,0,3000,2500,7200,11300,3500,5000,2400,11000,20000],
  ["TOYOTA","LAND CRUISER","",13000,0,15000,12000,18000,2500,19000,21000,35000,2700,7800],
  ["TOYOTA HARRIER","",10000,0,16000,14000,1500,17000,6000,9000,35000,4300,3200],
  ["TOYOTA ALPHARD","",10000,0,3000,2500,7200,11300,3500,5000,2400,11000,20000],
  ["NISSAN","SERENA","",10000,0,6000,5000,2900,8200,4500,5400,8000,6500,4200],
  ["NISSAN","X-TRAIL","",10000,0,1000,700,17000,1200,6000,3300,1900,4900,5500],
  ["MITSUBISHI","OUTLANDER","",8000,0,500,800,3500,7100,3800,4600,2700,7800,4300],
  ["MITSUBISHI","ASX","",8000,0,500,800,3500,7100,3800,4600,2700,7800,4300],
  ["MAZDA","CX-5","",-1,0,1000,700,17000,1200,6000,3300,1900,4900,5500],
  ["HONDA","CR-V 1","",0,1000,700,17000,1200,6000,3300,1900,4900,5500],
  ["GAS","RUSH-1","",12000,500,700,1000,700,1200,0,0,0,0,0],
  ["GAS","COROLLA","",2000,0,9000,7000,600,8000,10000,6000,14000,16000,5900],
  ["GAS","RUSH-1","",10000,14,2600,800,0,0,0,0,0],
  ["GAS","X-TRAIL-4","",10000,0,1000,1900,1800,1100,1700,1000,600],
  ["GAS","ALPHARD","",10000,0,2000,2500,700,1000,700,2700,0,0],
  ["DIESEL","OUTLANDER","",9000,0,700,500,300,900,1000,700,600,500],
  ["DIESEL","ASX","",9000,0,700,500,300,900,1000,700,600,500],
  ["DIESEL MAZDA CX-5","",9000,0,700,500,300,900,1000,700,600,500],
  ["GAS","ALPHARD","",8000,0,1800,1400,700,0,0,0,0],
  ["GAS","PRADO","",8000,0,1800,1400,700,1000,800,300],
  ["HYBRID HONDA INSIGHT","",6400,0,4000,1800,1400,700,1000,800,1000],
  ["HYBRID","ALPHARD","",6400,0,4000,1800,1400,700,1000,800,1000],
  ["HYBRID CAMRY","",6400,0,4000,1800,1400,700,1000,800,1000],
  ["HYBRID HONDA INSIGHT","",6000,0,1400,1000,1800,1400,700,1000,800],
  ["HYBRID","ALPHARD","",6000,0,1400,1000,1800,1400,700,1000,800],
  ["HYBRID CAMRY","",6000,0,1400,1000,1800,1400,700,1000,800],
  ["ELECTRO","LEAF","",6000,0,4000,1800,1400,700,1000,800,1000],
  ["ELECTRO","LEAF","",13000,0,4000,1800,1400,700,1000,800,1000],
  ["ELECTRO","LEAF","",10000,0,3000,2500,7200,11300,3500,5000,2400],
  ["DIESEL","PAJERO SPORT","",1300,0,15000,12000,18000,2500,19000,21000,35000],
  ["DIESEL","SERENA","",10000,0,700,500,300,900,1000,700,600,500],
  ["DIESEL","SERENA","",9000,0,700,500,300,900,1000,700,600,500],
  ["PLUG","PAJERO SPORT MINI","",1300,0,15000,12000,18000,2500,19000,21000,35000],
  ["PLUG","SERENA","",10000,0,700,500,300,900,1000,700,600,500],
  ["PLUG","SERENA","",9000,0,700,500,300,900,1000,700,600,500],
  ["PLUG","SERENA PLUG","",10000,0,700,500,300,900,1000,700,600,500],
  ["PLUG","SERENA PLUG","",9000,0,700,500,300,900,1000,700,600,500],
  ["SUBARU","FORESTER","",1300,0,15000,12000,18000,2500,19000,21000,35000],
  ["SUBARU","FORESTER","",13000,0,15000,12000,18000,2500,19000,21000,35000],
  ["SUBARU","FORESTER","",10000,0,1000,1900,1800,1100,1700,1000,600],
  ["SUZUKI","ESCUDO","",8000,0,500,800,3500,7100,3800,4600,2700,7800,4300],
  ["SUZUKI","ESCUDO","",10000,0,700,500,300,900,1000,700,600,500],
  ["SUZUKI","ESCUDO","",9000,0,700,500,300,900,1000,700,600,500]
];

export function calc_custom_price(fuel, year, volume, model, manuf) {
  volume = Math.min(parseInt(volume) || 0, max_volume);
  if (fuel !== 3 && (isNaN(volume) || volume < 50 || volume > max_volume)) return '';
  year = parseInt(year);
  if (isNaN(year)) return '';
  year = Math.max(year, min_year);
  if (year < min_year || year > max_year) return '';

  const l = custom_price.length;
  const j = custom_years[year] || 0;

  for (let i = 0; i < l; i++) {
    const row = custom_price[i];
    const manuf_a = row[0] || '';
    const model_a = row[1] || '';
    const volume_a = parseInt(row[3]) || 0;

    if (manuf_a && model_a) {
      const regexp1 = new RegExp(manuf_a.trim() + '$', 'i');
      const regexp2 = new RegExp(model_a.trim() + '$', 'i');
      if (regexp1.test(manuf ? manuf.trim() : '') && regexp2.test(model ? model.trim() : '')) {
        if (volume_a === -1 || Math.abs(volume_a - volume) <= 49) {
          const price = parseInt(row[j]);
          if (price > 0) return price;
        }
      }
    } else if (!manuf_a && !model_a && volume <= volume_a) {
      const price = parseInt(row[j]);
      if (price > 0) return price;
    }
  }
  return 999999;
}

export async function mockCalcFull(params) {
  await new Promise(r => setTimeout(r, 200));

  const {
    year, volume, is_proh = 1, pw, pw_el = 0, DVS30 = 0, fuel, auc_price, custom_price
  } = params;

  const base = custom_price || auc_price / 159.53;
  const jur_usd = Math.round(base * 0.2 + volume * 0.02);
  const fiz_usd = Math.round(base * 0.25 + volume * 0.025);
  
  const jur_total = 'Total: ' + (jur_usd * 81 + auc_price * 0.0005).toLocaleString() + ' RUB';
  const fiz_total = 'Total: ' + (fiz_usd * 81 + auc_price * 0.0006).toLocaleString() + ' RUB';

  return [
    [jur_usd, jur_total, auc_price > custom_price ? 'auc_price' : 'tc_price'],
    [fiz_usd, fiz_total, auc_price > custom_price ? 'tc_price' : 'auc_price']
  ];
}

const API_BASE_URL = 'http://localhost/ArtisbayCombined/api';

export async function placeBid(bidData) {
  try {
    const response = await fetch(`${API_BASE_URL}/place_bid.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to place bid:", error);
    return { error: "Network error" };
  }
}

export async function getMyBids(userId = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_my_bids.php?userId=${userId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("PHP API not reachable, falling back to empty list:", error);
  }
  return [];
}

export async function mockSearchCars(params = {}) {
  const { make = 'ALL', model = 'ALL', auction = 'ALL' } = params;
  
  try {
    const queryParams = new URLSearchParams({ make, model, auction });
    const response = await fetch(`${API_BASE_URL}/search_cars.php?${queryParams}`);
    
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn("PHP API not reachable, falling back to mock data:", error);
  }

  // Fallback to mock data
  await new Promise(resolve => setTimeout(resolve, 300));
  let results = [...mockLots];
  
  if (normalize(make) !== 'all' && make !== '') {
    results = results.filter(lot => normalize(lot.make) === normalize(make));
  }
  
  if (normalize(model) !== 'all' && model !== '') {
    const modelsToMatch = model.split(',').map(m => normalize(m));
    results = results.filter(lot => {
      const lotModel = normalize(lot.model);
      return modelsToMatch.some(m => lotModel === m || lotModel.includes(m));
    });
  }
  
  if (normalize(auction) !== 'all' && auction !== '') {
    results = results.filter(lot => normalize(lot.auctionHouse).toLowerCase().includes(normalize(auction).toLowerCase()));
  }
  
  return results;
}

export async function mockSearchBikes(params = {}) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBikeLots;
}

export const mockLotList = mockLots;
