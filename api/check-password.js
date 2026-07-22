// Checks a submitted password against the SITE_PASSWORD environment variable.
// The real password never gets sent to the browser — only true/false comes back.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const correct = process.env.SITE_PASSWORD;
  if (!correct) {
    // No password has been set up yet in Vercel — fail safe by rejecting,
    // rather than silently letting everyone through.
    res.status(500).json({ ok: false, error: 'Site password not configured yet' });
    return;
  }

  try {
    const { password } = req.body || {};
    const submitted = (password || '').trim().toLowerCase();
    const expected = correct.trim().toLowerCase();
    res.status(200).json({ ok: submitted === expected });
  } catch (e) {
    res.status(400).json({ ok: false, error: 'Bad request' });
  }
}
