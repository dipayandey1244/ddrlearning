# Deploy HYROX 30

## GitHub Pages
1. Open https://github.com/dipayandey1244/ddrlearning/settings/pages
2. Under Build and deployment, choose GitHub Actions as the source.
3. Check https://github.com/dipayandey1244/ddrlearning/actions.
4. Expected site URL: https://dipayandey1244.github.io/ddrlearning/hyrox-30/

## Mobile access
Open the published HTTPS site in Safari or Chrome and use Add to Home Screen / Install app. The tracker is mobile responsive and uses local browser storage.

## Local data
Logs are saved in localStorage on this browser/device. Export JSON for backups. There is no cross-device sync.

## Email after a workout
The static site cannot send emails without a server. Deploy the sample Vercel + Resend endpoint in `email-endpoint/` and follow its README. Configure Resend and all secrets in Vercel, not in this repository. After deployment:
- paste the function URL into Settings and save it;
- enter the configured `NOTIFY_EMAIL` in the workout's optional email field;
- use Test endpoint for reachability, then complete a session to test delivery.

The endpoint is not deployed by this repository commit. For broad public use, add rate limiting and stronger authentication.
