import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { listQuotes, saveQuote } from "./lib/store.js";
import { mailMode, notifyNewQuote } from "./lib/mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3500;

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "frame-src": ["https://maps.google.com", "https://www.google.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(
  cors({ origin: process.env.CORS_ORIGIN?.split(",") || true })
);
app.use(express.json({ limit: "20kb" }));

// ---------- API ----------

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const quoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: "Too many requests. Please call us instead." },
});

const clean = (v, max) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

app.post("/api/quotes", quoteLimiter, async (req, res) => {
  const b = req.body || {};

  // Honeypot: bots fill hidden fields. Pretend success.
  if (b.website) return res.status(201).json({ ok: true });

  const quote = {
    name: clean(b.name, 100),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    service: clean(b.service, 80),
    location: clean(b.location, 120),
    message: clean(b.message, 3000),
  };

  if (!quote.name || !quote.phone || !quote.service || !quote.message) {
    return res.status(400).json({
      error: "Please fill in your name, phone, service and project details.",
    });
  }
  if (!/^[+\d][\d\s()-]{6,}$/.test(quote.phone)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid phone number." });
  }
  if (quote.email && !/^\S+@\S+\.\S+$/.test(quote.email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  try {
    const saved = await saveQuote(quote);
    notifyNewQuote(saved).catch((err) =>
      console.error("Email failed:", err.message)
    );
    res.status(201).json({ ok: true, id: saved.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "We couldn't save your request. Please call us.",
    });
  }
});

// Admin: view quote requests.
// GET /api/quotes  with header  x-admin-token: <ADMIN_TOKEN>
app.get("/api/quotes", async (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.get("x-admin-token") !== token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(await listQuotes());
});

app.use("/api", (_req, res) =>
  res.status(404).json({ error: "Not found" })
);

// ---------- Serve React build in production ----------

const dist = path.resolve(__dirname, "../client/dist");
if (fs.existsSync(dist)) {
  app.use(
    express.static(dist, { maxAge: "7d", index: false })
  );
  app.get("*", (_req, res) =>
    res.sendFile(path.join(dist, "index.html"))
  );
}

const server = app.listen(PORT, () => {
  console.log(`Rackolas server running on http://localhost:${PORT}`);
  console.log(`Quote email notifications: ${mailMode}`);
});

server.on("error", (err) => {
  if (err.code === "EACCES" || err.code === "EADDRINUSE") {
    console.error(
      `\nPort ${PORT} is blocked or already in use.\n` +
        `Set another port in server/.env, e.g. PORT=3600\n`
    );
    process.exit(1);
  }
  throw err;
});
