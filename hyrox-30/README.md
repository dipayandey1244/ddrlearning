# HYROX 30 — Training Companion

A 30-day HYROX starter tracker with workout history and pre-/post-workout reflections.

## Features
- Four-week training plan and session completion tracking
- Before-workout mood, energy, motivation and notes
- After-workout mood, effort, duration, distance and reflections
- Dashboard, history and JSON backup/import
- Browser-local persistence
- Optional workout-completion email integration via a separately deployed server endpoint

## Local use
Open `index.html` in a modern browser or run `python -m http.server 8000` from this folder.

## Local data
Logs and the optional endpoint URL are saved in localStorage in this browser on this device. Use Export JSON for backups. There is no cross-device sync.

## Email notifications
The tracker only sends email if you enter an email address in the workout form and save a deployed HTTPS endpoint in Settings. The server endpoint example is under `email-endpoint/`.
1. Deploy `hyrox-30/email-endpoint` as a Vercel project and configure its server-side variables. Follow `email-endpoint/README.md`.
2. Use a Resend API key only in Vercel environment variables; never put it in the browser.
3. Set `NOTIFY_EMAIL` to your inbox and enter the same address in the workout email field.
4. Save the deployed endpoint URL in Settings. Use Test endpoint to check connectivity; then complete a workout to test actual delivery.

Email is not active until deployed and configured. The Test endpoint button checks reachability, not delivery. The current endpoint example is suitable for a personal prototype; add rate limiting and stronger authentication before broad public use.

## Exercise reference
This app links to [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) and does not redistribute the dataset's GIF media. Check its terms before reuse.
