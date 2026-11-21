// Simple JSON-file store for quote requests.
// Good enough for a small business site; swap for
// MongoDB/MySQL later without touching the routes.

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

const file = path.resolve(
  process.env.DATA_FILE ||
    path.join(here, "../data/quotes.json")
);

async function readAll() {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveQuote(quote) {
  const all = await readAll();
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...quote,
  };
  all.unshift(record);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(all, null, 2));
  return record;
}

export async function listQuotes() {
  return readAll();
}
