# Cook to Admire — Curated-Ready Build

- Cosmic, colorful UI + watermark
- 100 popular Indian dishes preloaded
- Image pipeline:
  1) If a recipe has `images` (CDN links), they are used.
  2) Else it auto-loads **real photos** via **proxied Unsplash Source** (reliable on Vercel).
  3) If that fails, it falls back to **Picsum**.

## Add curated images (permanent CDN)
Edit `public/recipes.json`, and for any recipe add:
```json
"images": [
  "https://images.unsplash.com/photo-XXXXXXXX?auto=format&fit=crop&w=1080&h=1080",
  "https://images.unsplash.com/photo-YYYYYYYY?auto=format&fit=crop&w=1080&h=1080",
  "https://images.unsplash.com/photo-ZZZZZZZZ?auto=format&fit=crop&w=1080&h=1080"
]
```
Then redeploy. No code changes required.

## Run
npm install
npm run dev

## Build
npm run build
