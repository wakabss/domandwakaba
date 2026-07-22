# Our Tokyo Week

## Setup (one-time, ~10 minutes)

### 1. Push to GitHub
```
git init
git add .
git commit -m "our tokyo week"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 2. Import into Vercel
- vercel.com → Add New → Project → import the GitHub repo
- Framework preset: "Other" (no build step needed)
- Deploy

### 3. Add the shared database (Vercel KV)
- In the Vercel project → **Storage** tab → **Create Database** → **KV**
- Name it anything (e.g. `tokyo-kv`), create it, then **Connect** it to this project
- Vercel automatically adds the required env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) — no manual copying needed
- Go to **Deployments** → redeploy the latest deployment so it picks up the new env vars

That's it — the site is live, and both of you hitting the same URL share the same saved data (items, notes, countdown, edited text). Every add/edit/toggle autosaves.

## Editing later
Change `index.html`, then:
```
git add .
git commit -m "update"
git push
```
Vercel redeploys automatically in ~30 seconds.

## Notes
- The URL is unlisted but public — anyone with the link can view/edit it. Fine for a private trip page, just don't post the link publicly.
- All data lives in one shared record, so the last save wins if you both edit the exact same field at the exact same second — not an issue in normal use.
