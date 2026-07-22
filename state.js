import { kv } from '@vercel/kv';

// Single shared key — both of you read/write the same trip data.
const KEY = 'tokyo-itinerary-state';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const value = await kv.get(KEY);
      res.status(200).json({ value: value || null });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = req.body; // Vercel auto-parses JSON when Content-Type is application/json
      await kv.set(KEY, body);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ error: 'Method not allowed' });
}
