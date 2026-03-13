import { query } from "@/lib/db";

// ============ Generic helpers ============

export async function getAll<T = Record<string, unknown>>(
  table: string,
  orderBy = "sort_order ASC"
): Promise<T[]> {
  return query<T[]>(`SELECT * FROM \`${table}\` ORDER BY ${orderBy}`);
}

export async function getById<T = Record<string, unknown>>(
  table: string,
  id: number
): Promise<T | null> {
  const rows = await query<T[]>(
    `SELECT * FROM \`${table}\` WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function getFirst<T = Record<string, unknown>>(
  table: string
): Promise<T | null> {
  const rows = await query<T[]>(`SELECT * FROM \`${table}\` LIMIT 1`);
  return rows[0] || null;
}

// ============ Site Settings ============

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await query<{ key_name: string; value: string }[]>(
    "SELECT key_name, value FROM site_settings"
  );
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key_name] = row.value;
  }
  return map;
}

export async function updateSetting(key: string, value: string) {
  return query(
    "INSERT INTO site_settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?",
    [key, value, value]
  );
}

// ============ Active items for frontend ============

export async function getActiveTalents() {
  return query(
    "SELECT * FROM talents WHERE is_active = 1 ORDER BY sort_order ASC"
  );
}

export async function getActivePortfolios() {
  return query(
    "SELECT * FROM portfolios WHERE is_active = 1 ORDER BY sort_order ASC"
  );
}

export async function getActiveMusic() {
  return query(
    "SELECT * FROM music WHERE is_active = 1 ORDER BY sort_order ASC"
  );
}

export async function getActiveMediaCoverages() {
  return query(
    "SELECT * FROM media_coverages WHERE is_active = 1 ORDER BY sort_order ASC"
  );
}

export async function getActiveGallery() {
  return query(
    "SELECT * FROM gallery WHERE is_active = 1 ORDER BY sort_order ASC"
  );
}

export async function getStatsRibbon() {
  return query("SELECT * FROM stats_ribbon ORDER BY sort_order ASC");
}

export async function getInstagramStats() {
  return query("SELECT * FROM instagram_stats ORDER BY sort_order ASC");
}
