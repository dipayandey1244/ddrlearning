// Vercel serverless endpoint example: api/workout-complete.ts
// Secrets live in Vercel environment settings, never in the static tracker.
// Required environment variables: RESEND_API_KEY, NOTIFY_EMAIL, ALLOWED_ORIGIN
import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin ?? "";
  const allowedOrigin = process.env.ALLOWED_ORIGIN;

  if (origin && allowedOrigin && origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    if (origin !== allowedOrigin) return res.status(403).json({ error: "Origin not allowed" });
    return res.status(204).end();
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL || !allowedOrigin) {
    return res.status(500).json({ error: "Email service is not configured" });
  }
  if (origin !== allowedOrigin) return res.status(403).json({ error: "Origin not allowed" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }
  const to = typeof body?.to === "string" ? body.to.trim().toLowerCase() : "";
  const fixedInbox = process.env.NOTIFY_EMAIL.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return res.status(400).json({ error: "Valid recipient email required" });
  // Prevent this public endpoint being used to send emails to arbitrary recipients.
  if (to !== fixedInbox) return res.status(403).json({ error: "Recipient must match the configured notification inbox" });

  const workout = body?.workout ?? {};
  const session = body?.session ?? {};
  const safe = (v: unknown, max = 1000) => String(v ?? "").replace(/[<>]/g, "").slice(0, max);
  const subject = "HYROX workout completed: " + safe(workout.title || workout.day || "Training session", 100);
  const text = [
    "Your HYROX workout was saved.",
    "",
    "Workout: " + safe(workout.title || "Training session", 150),
    "Day: " + safe(workout.day || "", 80),
    "Completed: " + safe(session.completedAt || new Date().toISOString(), 80),
    "Duration (minutes): " + safe(session.after?.duration || "", 20),
    "Effort (1-10): " + safe(session.after?.effort || "", 20),
    "Feeling before: " + safe(session.before?.mood || "", 80),
    "Feeling after: " + safe(session.after?.mood || "", 80),
    "",
    "Pre-workout note: " + safe(session.before?.note || "", 1000),
    "",
    "Post-workout reflection: " + safe(session.after?.note || "", 1000)
  ].join("\n");

  // Configure a verified sender domain before production. Replace this demo sender as needed.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "HYROX Tracker <onboarding@resend.dev>",
    to: [fixedInbox],
    subject,
    text
  });
  if (error) return res.status(502).json({ error: "Email provider rejected the request" });
  return res.status(200).json({ ok: true });
}
