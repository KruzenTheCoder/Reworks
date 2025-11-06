import fs from "fs";
import path from "path";

export type JobsCacheData = {
  total: number;
  with_application_link: number;
  data: any[];
  lastUpdated: string; // ISO timestamp
  sourceUrl?: string;
};

const CACHE_DIR = path.join(process.cwd(), "data");
const CACHE_FILE = path.join(CACHE_DIR, "jobs-public.json");

export async function ensureCacheDir() {
  await fs.promises.mkdir(CACHE_DIR, { recursive: true });
}

export async function readJobsCache(): Promise<JobsCacheData | null> {
  try {
    const buf = await fs.promises.readFile(CACHE_FILE, "utf-8");
    const json = JSON.parse(buf);
    return json as JobsCacheData;
  } catch {
    return null;
  }
}

export async function writeJobsCache(payload: Omit<JobsCacheData, "lastUpdated"> & { lastUpdated?: string }) {
  await ensureCacheDir();
  const data: JobsCacheData = {
    total: payload.total,
    with_application_link: payload.with_application_link,
    data: payload.data || [],
    sourceUrl: payload.sourceUrl,
    lastUpdated: payload.lastUpdated || new Date().toISOString(),
  };
  await fs.promises.writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

export function isFreshCache(cache: JobsCacheData | null, maxAgeMs: number): boolean {
  if (!cache) return false;
  const t = Date.parse(cache.lastUpdated || "");
  if (Number.isNaN(t)) return false;
  return Date.now() - t < maxAgeMs;
}

export function cacheFilePath() {
  return CACHE_FILE;
}
