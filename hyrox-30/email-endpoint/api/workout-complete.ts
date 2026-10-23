// Vercel serverless endpoint example: api/workout-complete.ts
// Deploy this in a separate Vercel project or host the function alongside a static site.
// Required server environment variables: RESEND_API_KEY, NOTIFY_EMAIL, ALLOWED_ORIGIN
// Optional: ENDPOINT_TOKEN (if using an authenticated webhook; the static site will need a safe token flow).
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function json(statusCode: number, body: unknown, origin: string | null) {
  const allowed = process.env.ALLOWED_ORIGIN;
  const headers: Record<string, string> = { "Content-Type": "application/json", "Vary": "Origin" };
  if (origin && allowed && origin === allowed) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return { statusCode, headers, body: JSON.stringify(body) };
}

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin ?? null;
  const allowed = process.env.ALLOWED_ORIGIN;
  if (req.method === "OPTIONS") {
    if (origin && allowed && origin === allowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Vary", "Origin");
      return res.status(204).end();
    }
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL || !allowed) {
    return res.status(500).json({ error: "Email endpoint is missing server configuration" });
  }
  if (origin !== allowed) return res.status(403).json({ error: "Origin not allowed" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }
  const to = typeof body?.to === "string" ? body.to.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return res.status(400).json({ error: "Valid recipient email required" });

  const workout = body?.workout ?? {};
  const session = body?.session ?? {};
  const safe = (v: unknown, max = 1500) => String(v ?? "").replace(/[<>]/g, "").slice(0, max);
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
    "Pre-workout note: " + safe(session.before?.note || "", 1200),
    "",
    "Post-workout reflection: " + safe(session.after?.note || "", 1200)
  ].join("\n");

  const { error } = await resend.emails.send({
    from: "HYROX Tracker <onboarding@resend.dev>",
    to: [to],
    subject,
    text
  });
  if (error) return res.status(502).json({ error: "Email provider rejected the request" });
  return res.status(200).json({ ok: true });
}
