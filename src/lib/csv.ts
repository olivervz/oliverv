// Minimal RFC4180-ish CSV parse/stringify — no dependency needed for a
// schema this simple. Handles quoted fields containing commas, quotes, or
// newlines (which `notes` regularly will). Shared conceptually with
// scripts/tag-photos.mjs (that file can't import .ts directly since it
// runs under plain Node, not Astro's Vite pipeline, so it keeps its own
// copy of the same logic — keep the two in sync if you change this).

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
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
    } else {
      if (c === '"') {
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
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export function stringifyCsvField(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function stringifyCsvRow(fields: unknown[]): string {
  return fields.map(stringifyCsvField).join(",");
}
