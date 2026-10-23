# HYROX workout email endpoint (Vercel + Resend)

The GitHub Pages app is static: it cannot send email on its own. This separate Vercel function sends a workout summary via Resend. The endpoint and email delivery are **not live until you deploy it and configure secrets**.

## Deploy
1. Create/import a Vercel project whose root directory is `hyrox-30/email-endpoint` in this repository.
2. Install dependencies during deployment from the included `package.json` (`resend`).
3. Set environment variables in Vercel:
   - `RESEND_API_KEY`: Resend API key; server side only.
   - `NOTIFY_EMAIL`: your fixed destination inbox. The endpoint rejects a recipient that does not match this value.
   - `ALLOWED_ORIGIN`: exact website origin, e.g. `https://dipayandey1244.github.io` (no trailing slash).
   - `EMAIL_FROM` (optional): a sender identity verified by Resend, such as `HYROX Tracker <workouts@yourdomain.com>`.
4. In Resend, configure/verify your sender domain for production. The example's `onboarding@resend.dev` sender is for limited testing and may only deliver to permitted test recipients.
5. Deploy and copy the function URL, e.g. `https://YOUR-PROJECT.vercel.app/api/workout-complete`.
6. In HYROX Settings, save that HTTPS URL. In the workout form, enter the same recipient as `NOTIFY_EMAIL`, finish a session, and confirm email delivery.

## Security
- Never place `RESEND_API_KEY` in GitHub Pages, the front end or a public repo.
- The endpoint checks the browser origin and only sends to the configured `NOTIFY_EMAIL`, reducing the chance of being abused to send to arbitrary addresses.
- Origin checks are not authentication and can be spoofed by non-browser clients. Add platform rate limiting and stronger authentication before broad public use. Keep this endpoint for personal use until that is configured.
- A completed session's feelings and notes are sent to the email provider. Leave the email field empty if you don't want to transmit the reflection.
