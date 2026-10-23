# HYROX 30 — Training Companion

A 30-day, five-days-per-week HYROX starter tracker. The app tracks the plan, workout completion, before/after feelings, perceived effort, duration, notes, and exportable records.

## Features
- 4-week beginner-oriented HYROX plan (5 sessions/week)
- Before-workout check-in: mood, energy, motivation, readiness, free text
- After-workout check-in: mood, energy, perceived effort, duration, notes
- Dashboard and workout history
- Local-first data storage with JSON export/import
- Email notification hook via a secure server endpoint (no secrets in browser code)
- Exercise reference links to the upstream exercise dataset

## Run locally
Open `index.html` in a modern browser or serve this folder with a static HTTP server, e.g. `python -m http.server 8000`.

## Data persistence
The standalone front-end saves locally in the browser's localStorage. This survives browser restarts on the same browser/device, but is not cross-device or a backup. Use Export JSON regularly. To enable cross-device persistence, configure Supabase (SQL schema and setup in `DEPLOYMENT.md`).

## Workout completion emails
The front-end supports a configurable secure webhook URL. To enable email:
1. Deploy the Supabase Edge Function described in `supabase/functions/workout-complete/index.ts`.
2. Set server-side secrets `RESEND_API_KEY` and `NOTIFY_EMAIL`.
3. Configure the app's notification endpoint in Settings.
4. Use Supabase Auth and Row Level Security before storing personal records in a hosted database.

Do not put SMTP passwords, Supabase service-role keys, or Resend API keys in the front-end.

## Exercise dataset
This app links to [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset), which documents 1,324 exercises. Its code/data structure uses MIT terms; image/GIF media is © Gym visual and has separate terms. This app does not redistribute their media. Refer to the dataset's [README and licensing section](https://github.com/hasaneyldrm/exercises-dataset#-license--use) before reuse.

## Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages and optional hosted persistence/email setup.
