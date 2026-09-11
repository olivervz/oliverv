import csvText from "./photos.csv?raw";
import { parseCsv } from "../lib/csv";

export type Photo = {
  id: string;
  /** YYYY-MM-DD — never shown anywhere, used only to order photos. Older
   *  rows may still be just YYYY-MM or YYYY (all three sort correctly
   *  against each other since it's a plain string compare); the day on
   *  those was backfilled arbitrarily per tagging batch, not a real date. */
  date: string;
  /** never shown — a monotonically increasing number, one per `npm run
   *  tag-photos` session, so the photos page can keep a whole roll
   *  contiguous even when two rolls share the same YYYY-MM date */
  batch: string;
  /** not shown anywhere currently — a short label for what was going on
   *  during this batch (e.g. "Snowstorm 2026"), kept purely for your own
   *  reference, one per `npm run tag-photos` session */
  title: string;
  camera: string;
  film: string;
  location: string;
  notes: string;
  /** path under /photos/ (public/photos/<file>) once a real scan/export
   *  exists for this entry — produced by `npm run tag-photos` */
  image?: string;
  /** real pixel dimensions of `image` (after the tag-photos resize), used
   *  to compute the masonry grid layout in one pass, without waiting for
   *  each image to load — absent for legacy color-only rows */
  width?: number;
  height?: number;
  /** placeholder tile color, used only as a fallback while there's no
   *  `image` yet */
  color?: string;
};

const rows = parseCsv(csvText).filter(
  (r) => r.length > 1 || (r[0] ?? "").trim() !== ""
);
const [header, ...dataRows] = rows;

function col(row: string[], name: string): string {
  const idx = header.indexOf(name);
  return idx === -1 ? "" : (row[idx] ?? "").trim();
}

function numCol(row: string[], name: string): number | undefined {
  const v = col(row, name);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export const photos: Photo[] = dataRows.map((row) => ({
  id: col(row, "id"),
  date: col(row, "date"),
  batch: col(row, "batch") || "0",
  title: col(row, "title"),
  camera: col(row, "camera"),
  film: col(row, "film"),
  location: col(row, "location"),
  notes: col(row, "notes"),
  image: col(row, "image") || undefined,
  width: numCol(row, "width"),
  height: numCol(row, "height"),
  color: col(row, "color") || undefined,
}));
