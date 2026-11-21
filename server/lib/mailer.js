// Emails each new quote request to the company.
//
// Option A (works on Render free): Brevo HTTP API
//   BREVO_API_KEY, MAIL_FROM, NOTIFY_EMAIL
// Option B (paid hosts / VPS): plain SMTP
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
//
// Free Render services block SMTP ports, so use Option A there.

import nodemailer from "nodemailer";

const env = process.env;

const useBrevo = env.BREVO_API_KEY && env.NOTIFY_EMAIL;

const smtp =
  !useBrevo &&
  env.SMTP_HOST &&
  env.SMTP_USER &&
  env.SMTP_PASS &&
  env.NOTIFY_EMAIL
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT || 465),
        secure: Number(env.SMTP_PORT || 465) === 465,
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      })
    : null;

export const mailMode = useBrevo ? "brevo" : smtp ? "smtp" : "off";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);

function buildEmail(q) {
  const rows = [
    ["Name", q.name],
    ["Phone", q.phone],
    ["Email", q.email || "—"],
    ["Service", q.service],
    ["Location", q.location || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5f6b78">${k}</td>` +
        `<td style="padding:6px 12px"><b>${esc(v)}</b></td></tr>`
    )
    .join("");

  return {
    subject: `New quote request: ${q.service} — ${q.name}`,
    html:
      `<h2 style="font-family:sans-serif">New quote request</h2>` +
      `<table style="font-family:sans-serif">${rows}</table>` +
      `<p style="font-family:sans-serif;white-space:pre-wrap">` +
      `${esc(q.message)}</p>`,
  };
}

async function sendWithBrevo(q, { subject, html }) {
  const from = env.MAIL_FROM || env.NOTIFY_EMAIL;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Rackolas Website", email: from },
      to: env.NOTIFY_EMAIL.split(",").map((email) => ({
        email: email.trim(),
      })),
      replyTo: q.email ? { email: q.email, name: q.name } : undefined,
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
}

export async function notifyNewQuote(q) {
  const mail = buildEmail(q);

  if (useBrevo) {
    await sendWithBrevo(q, mail);
    return true;
  }

  if (smtp) {
    await smtp.sendMail({
      from: `"Rackolas Website" <${env.SMTP_USER}>`,
      to: env.NOTIFY_EMAIL,
      replyTo: q.email || undefined,
      ...mail,
    });
    return true;
  }

  return false;
}
