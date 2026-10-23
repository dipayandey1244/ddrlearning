# Deploy HYROX 30

## Enable GitHub Pages (required once)
The first Pages workflow run showed that Pages is not currently enabled/configured for this repository.

1. Open https://github.com/dipayandey1244/ddrlearning/settings/pages
2. Under **Build and deployment**, choose **GitHub Actions** as the source if offered. Save.
3. Open https://github.com/dipayandey1244/ddrlearning/actions/workflows/pages.yml and choose **Run workflow** (or push a small change under `hyrox-30/`).
4. Once the workflow succeeds, visit https://dipayandey1244.github.io/ddrlearning/hyrox-30/

## Mobile access
This is responsive and installable as a Progressive Web App (PWA). On the published HTTPS site:
- iPhone: open in Safari → Share → Add to Home Screen.
- Android: open in Chrome → ⋮ → Install app / Add to Home screen.

The app shell is cached for offline/repeat launches where supported. Workout logs use browser localStorage and are specific to the device/browser profile.

## Saving data
Local save works immediately and survives refreshes/browser restarts on the same browser profile. It does **not** sync phone to laptop. Export a JSON backup regularly. Cloud sync requires a database, login and row-level security; never put service-role keys in browser code.

## Email after each workout
In Settings, add your secure server endpoint URL. When an email address is entered, completion sends a JSON POST with `{ to, workout, session }`. You must deploy a secure endpoint that validates input and recipient, applies authentication/rate-limiting and sends via a server-side provider (e.g. Resend). Do not put provider keys in the frontend. Email is not active until an endpoint is configured and tested.

## Exercise data source
The app links to https://github.com/hasaneyldrm/exercises-dataset and does not bundle its media. The upstream README says code/data structure/instructions use MIT terms but GIF/image media is © Gym visual under separate terms. Review upstream LICENSE and NOTICE before redistributing media.
