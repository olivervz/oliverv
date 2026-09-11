#!/usr/bin/env node
// Local-only photo review tool.
//
// Usage:
//   npm run review-photos
//
// Starts a tiny HTTP server bound to localhost and opens a browser tab
// showing every photo in src/data/photos.csv as a real thumbnail grid.
// Click a photo's flag icon to mark it "needs a re-crop/re-tilt" for
// later — that's just a hidden `flagged` column in the CSV, never shown
// on the actual site. Drag a corrected image file onto ANY photo (flagged
// or not) to replace it on the spot: it goes through the exact same
// resize/recompress pipeline as `tag-photos.mjs`, overwrites the existing
// file in public/photos/ under its existing name, and the CSV row (date,
// batch, title, camera, film, location, notes) is left completely alone —
// only the pixels change. A successful replace also clears the flag.
//
// This is NOT part of the built site — it's a separate, plain Node HTTP
// server that only listens on localhost, only while this script is
// running. `astro build` never sees it, and nothing about it is reachable
// from oliverv.xyz.

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "src/data/photos.csv");
const PHOTOS_DIR = path.join(ROOT, "public/photos");
const PAGE_PATH = path.join(__dirname, "review-photos.html");
const PORT = 4848;

// same settings tag-photos.mjs uses, so a replaced photo matches the rest
// of the site (see that file for the reasoning)
const MAX_LONG_EDGE = 2400;
const JPEG_QUALITY = 85;

// ---------- tiny CSV parse/stringify (copy of tag-photos.mjs's — this
// runs under plain Node, not Astro's Vite pipeline, so it can't import a
// .ts version directly; kept in sync with src/lib/csv.ts by hand) ----------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const s = text.replace(/\r\n/g, "\n");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function stringifyCsvField(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function stringifyCsvRow(fields) {
  return fields.map(stringifyCsvField).join(",");
}

function readCsv() {
  const text = fs.readFileSync(CSV_PATH, "utf-8");
  const parsed = parseCsv(text).filter((r) => r.length > 1 || (r[0] ?? "").trim() !== "");
  const [header, ...rows] = parsed;
  return { header, rows };
}

function writeCsv(header, rows) {
  const lines = [stringifyCsvRow(header), ...rows.map(stringifyCsvRow)];
  fs.writeFileSync(CSV_PATH, lines.join("\n") + "\n", "utf-8");
}

// ---------- JSON helpers ----------

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

// ---------- route handlers ----------

function handlePhotosList(res) {
  const { header, rows } = readCsv();
  const idx = (name) => header.indexOf(name);
  const idIdx = idx("id");
  const imageIdx = idx("image");
  const flaggedIdx = idx("flagged");
  const locationIdx = idx("location");
  const notesIdx = idx("notes");

  const photos = rows
    .filter((r) => (r[imageIdx] ?? "").trim() !== "") // skip legacy color-only rows — nothing to review/replace
    .map((r) => ({
      id: r[idIdx] ?? "",
      image: r[imageIdx] ?? "",
      location: r[locationIdx] ?? "",
      notes: r[notesIdx] ?? "",
      flagged: flaggedIdx !== -1 && (r[flaggedIdx] ?? "").trim() === "1",
    }));

  sendJson(res, 200, photos);
}

function handleFlag(url, res) {
  const id = url.searchParams.get("id");
  const flagged = url.searchParams.get("flagged") === "1";
  if (!id) return sendText(res, 400, "missing id");

  const { header, rows } = readCsv();
  let flaggedIdx = header.indexOf("flagged");
  if (flaggedIdx === -1) {
    header.push("flagged");
    flaggedIdx = header.length - 1;
  }
  const idIdx = header.indexOf("id");

  let found = false;
  for (const row of rows) {
    while (row.length < header.length) row.push("");
    if (row[idIdx] === id) {
      row[flaggedIdx] = flagged ? "1" : "";
      found = true;
    }
  }
  if (!found) return sendText(res, 404, `no photo with id ${id}`);

  writeCsv(header, rows);
  sendJson(res, 200, { ok: true });
}

async function handleReplace(url, req, res) {
  const id = url.searchParams.get("id");
  if (!id) return sendText(res, 400, "missing id");

  const { header, rows } = readCsv();
  const idIdx = header.indexOf("id");
  const imageIdx = header.indexOf("image");
  const row = rows.find((r) => r[idIdx] === id);
  if (!row) return sendText(res, 404, `no photo with id ${id}`);

  const imagePath = row[imageIdx];
  if (!imagePath) return sendText(res, 400, `photo ${id} has no image to replace`);

  // /photos/<name>.jpg → public/photos/<name>.jpg — same filename kept, so
  // the CSV's `image` path (and every other column) never has to change
  const destPath = path.join(PHOTOS_DIR, path.basename(imagePath));
  const tmpPath = destPath + ".tmp";

  let buf;
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    buf = Buffer.concat(chunks);
    if (buf.length === 0) throw new Error("empty upload");
  } catch (err) {
    return sendText(res, 400, `couldn't read upload: ${err.message}`);
  }

  let outWidth, outHeight;
  try {
    const info = await sharp(buf)
      .rotate() // apply EXIF orientation before resizing, then drop the tag — same as tag-photos.mjs
      .resize({
        width: MAX_LONG_EDGE,
        height: MAX_LONG_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toFile(tmpPath);
    outWidth = info.width;
    outHeight = info.height;
  } catch (err) {
    try {
      fs.unlinkSync(tmpPath);
    } catch {}
    return sendText(res, 400, `couldn't process image: ${err.message}`);
  }

  // swap in-place only after the new file fully wrote — so a mid-write
  // crash can never leave the site's actual photo half-written
  fs.renameSync(tmpPath, destPath);

  // it's fixed now, so clear the flag if it had one — and since a
  // replacement image can have different pixel dimensions than the one it
  // replaced (recropped, rotated, a different source entirely), refresh
  // width/height too so the site's masonry layout doesn't lay it out
  // using stale dimensions
  function ensureCol(name) {
    let i = header.indexOf(name);
    if (i === -1) {
      header.push(name);
      i = header.length - 1;
      for (const r of rows) r.push("");
    }
    return i;
  }
  const flaggedIdx = ensureCol("flagged");
  const widthIdx = ensureCol("width");
  const heightIdx = ensureCol("height");
  row[flaggedIdx] = "";
  row[widthIdx] = String(outWidth);
  row[heightIdx] = String(outHeight);
  writeCsv(header, rows);

  sendJson(res, 200, { ok: true });
}

const IMAGE_CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function handleServeImage(url, res) {
  // path.basename strips any directory components, so this can never
  // escape PHOTOS_DIR regardless of what's in the URL
  const name = path.basename(url.pathname);
  const filePath = path.join(PHOTOS_DIR, name);
  const ext = path.extname(name).toLowerCase();
  const contentType = IMAGE_CONTENT_TYPES[ext];
  if (!contentType || !fs.existsSync(filePath)) {
    sendText(res, 404, "not found");
    return;
  }
  res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
  fs.createReadStream(filePath).pipe(res);
}

function handleServePage(res) {
  const html = fs.readFileSync(PAGE_PATH, "utf-8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

// ---------- server ----------

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/") return handleServePage(res);
  if (req.method === "GET" && url.pathname === "/api/photos") return handlePhotosList(res);
  if (req.method === "POST" && url.pathname === "/api/flag") return handleFlag(url, res);
  if (req.method === "POST" && url.pathname === "/api/replace") {
    handleReplace(url, req, res).catch((err) => sendText(res, 500, `unexpected error: ${err.message}`));
    return;
  }
  if (req.method === "GET" && url.pathname.startsWith("/photos/")) return handleServeImage(url, res);

  sendText(res, 404, "not found");
});

function openBrowser(targetUrl) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${targetUrl}"`
      : process.platform === "darwin"
      ? `open "${targetUrl}"`
      : `xdg-open "${targetUrl}"`;
  exec(cmd, () => {});
}

if (!fs.existsSync(CSV_PATH)) {
  console.error(`No photos.csv found at ${CSV_PATH} — nothing to review.`);
  process.exit(1);
}

server.listen(PORT, "127.0.0.1", () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Review tool running at ${url} (local only — Ctrl+C to stop)`);
  openBrowser(url);
});
