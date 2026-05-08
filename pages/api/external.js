export default async function handler(req, res) {
  const { sql = 'SELECT * FROM main LIMIT 10' } = req.query;
  const code = 'DvemR43s';
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '1.2.3.4';

  const url = `http://144.76.203.145/api/?ip=${ip}&json&code=${code}&sql=${encodeURIComponent(sql)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ error: 'External API request failed', details: error.message });
  }
}
