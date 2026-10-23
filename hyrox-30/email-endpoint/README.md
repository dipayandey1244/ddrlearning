# HYROX workout completion email endpoint (Vercel + Resend)

This is a separate server-side email function. The static GitHub Pages app cannot send emails on its own.

## Deploy
1. Create a Vercel project for a small Node.js/TypeScript project, or put this file at `api/workout-complete.ts` in an existing Vercel project.
2. Install the dependency: `npm install resend`.
3. Configure server-side Vercel environment variables:
   - `RESEND_API_KEY`: your Resend API key
   - `NOTIFY_EMAIL`: recipient/notification inbox (reserved for future routing; the example currently sends to the `to` supplied in the request)
   - `ALLOWED_ORIGIN`: the exact origin of the published site, e.g. `https://dipayandey1244.github.io`
4. Configure a verified sender domain in Resend before production. The demo uses `onboarding@resend.dev`, which may only deliver to verified/test recipients; replace `from` with your verified sender.
5. Deploy and copy the function URL, for example `https://YOUR-VERCEL-PROJECT.vercel.app/api/workout-complete`.
6. Paste that URL into HYROX → Settings → Server endpoint URL, Save settings, then Test endpoint.
7. Complete a workout with the recipient email filled in to test actual email delivery.

## Security notes
- Never place `RESEND_API_KEY` in the tracker or GitHub Pages.
- Configure `ALLOWED_ORIGIN` to the exact deployed web origin.
- The endpoint uses origin allowlisting, but Origin is not authentication and can be spoofed by non-browser clients. Before public use, add rate limiting and an unguessable signed/authenticated token mechanism or authenticated server-to-server relay. Do not expose this endpoint broadly without abuse protection.
- Don't send notes/reflections to email if you don't want those details leaving the device.
- Recipient addresses are user-provided and validated, but the endpoint can still be abused if publicly exposed; add rate limiting before production.
