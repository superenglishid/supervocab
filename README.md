# SuperVocab — repo skeleton

This is a minimal skeleton for **SuperVocab** (flashcard + TTS + quizzes later).
I generated this based on your uploaded prototype (original file included in this repo as `original-vocab-card.html`).
Original uploaded asset path in the environment: `/mnt/data/vocab card 01.html`. fileciteturn0file0

## What is inside
- `index.html` — main polished UI (loads `vocab.json`)  
- `vocab.json` — sample 10-word deck (you can replace/extend)  
- `original-vocab-card.html` — copy of your original uploaded HTML (for reference).  
- `.gitignore` — basic ignore  
- `README.md` — this file

## Quick local test
1. Open `index.html` in your browser (double-click) — for TTS to work fully, use Chrome/Edge/Brave with site interaction enabled.  
2. To view `vocab.json` content, open it in a code editor.

## Deploy to GitHub + Cloudflare Pages (recommended)
1. Create a new GitHub repository (e.g. `supervocab`).  
2. Push this folder (all files) to the repo root.

### Connect to Cloudflare Pages
1. Go to Cloudflare Pages → Create a project → Connect your GitHub repo.  
2. For **Build settings** choose:
   - **Framework**: None (or leave blank)  
   - **Build command**: *leave empty*  
   - **Build directory**: `/` (root)  
3. Deploy. Cloudflare Pages will serve `index.html` at the site root.

### Set custom subdomain (supervocab.superenglish.co.id)
1. On your domain registrar (or Cloudflare DNS), add a CNAME record:
   - **Name**: `supervocab`  
   - **Target**: the CNAME value Cloudflare Pages gives (e.g. `projectname.pages.dev`)  
2. In Cloudflare Pages, add the custom domain and follow verification steps.  
3. Enable HTTPS (Cloudflare will provision cert automatically).

## Notes about auth & DB (next steps)
- For simple MVP keep it **no-login** and public (v1.0) — users try 10 words.
- Later you can add Cloudflare Workers + D1 or Supabase for auth/progress storage.
- For SRS and user progress we recommend Cloudflare Workers + D1 (or Supabase).

## How to extend vocab
- Replace `vocab.json` with a larger JSON file (same schema). You can generate/import from CSV with a small script.

## Credits & files
Original prototype (copied): `original-vocab-card.html` — path in environment: `/mnt/data/vocab card 01.html`. fileciteturn0file0
