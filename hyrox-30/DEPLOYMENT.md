# Deploy HYROX 30

## Mobile access
This is a responsive mobile-first site and a small Progressive Web App (PWA). On a public HTTPS deployment, open it on your phone:
- iPhone: Safari → Share → Add to Home Screen
- Android: Chrome → ⋮ menu → Install app / Add to Home screen
The service worker caches the main app shell for repeat visits/offline launch where supported. Workout logs are stored in browser localStorage per device/browser.

## GitHub Pages
1. Open the repository in GitHub and go to Settings → Pages.
2. Set Build and deployment to "Deploy from a branch".
3. Choose branch `main` and folder `/ (root)`, Save.
4. The project path is `/hyrox-30/`; after Pages is enabled, open:
   `https://dipayandey1244.github.io/ddrlearning/hyrox-30/`
   If GitHub Pages isn't enabled for this repo, enable it first.

## Saving data
Local save is on by default and survives refreshes and browser restarts in that browser profile. It doesn't sync between your phone and computer. Export JSON from the app regularly. Cloud sync requires a database plus login and row-level security; do not store a Supabase service-role key in the browser.

## Email after workout
In Settings you can configure a server endpoint that accepts JSON POST:
`{ to, workout, session }`
The browser will send this only when an email address is entered and an endpoint URL is configured. The endpoint must validate the recipient, require authentication/rate limiting, and send mail server-side with a provider such as Resend. Never expose the email provider API key in the frontend. Email is not enabled until a real endpoint is deployed and tested.

## Exercise data source
The app links to https://github.com/hasaneyldrm/exercises-dataset and does not bundle its media. The upstream README says code/data structure/instructions use MIT terms but images and animations are Gym visual media under separate terms. Review upstream LICENSE and NOTICE before redistributing media.
