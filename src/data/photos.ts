import csvText from "./photos.csv?raw";
import { parseCsv } from "../lib/csv";

export type Photo = {
  id: string;
  /** YYYY-MM, or just YYYY when you only know the year (both sort correctly) */
  date: string;
  /** never shown — a monotonically increasing number, one per `npm run
   *  tag-photos` session, so the photos page can keep a whole roll
   *  contiguous even when two rolls share the same YYYY-MM date */
  batch: string;
  camera: string;
  film: string;
  location: string;
  notes: string;
  /** path under /photos/ (public/photos/<file>) once a real scan/export
   *  exists for this entry — produced by `npm run tag-photos` */
  image?: string;
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

export const photos: Photo[] = dataRows.map((row) => ({
  id: col(row, "id"),
  date: col(row, "date"),
  batch: col(row, "batch") || "0",
  camera: col(row, "camera"),
  film: col(row, "film"),
  location: col(row, "location"),
  notes: col(row, "notes"),
  image: col(row, "image") || undefined,
  color: col(row, "color") || undefined,
}));
