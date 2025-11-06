import type { NextRequest } from "next/server";
import { isFreshCache, readJobsCache, writeJobsCache } from "@/lib/jobsCache";
import { scrapeRecruitCrmPublic } from "@/lib/recruitcrm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Job = {
  id: string | number;
  name?: string;
  title?: string;
  company_name?: string;
  location?: string;
  url?: string;
  application_url?: string;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageUrl =
    url.searchParams.get("url") ||
    url.searchParams.get("page") ||
    process.env.RECRUITCRM_PUBLIC_JOBS_URL ||
    "https://recruitcrm.io/jobs/Reworks_Solutions_2_jobs";
  const force = url.searchParams.get("force") === "true" || url.searchParams.get("refresh") === "true";
  const maxAgeMs = 24 * 60 * 60 * 1000; // 24 hours
  // Try cache first unless forced refresh
  const cache = await readJobsCache();
  if (!force && isFreshCache(cache, maxAgeMs) && cache?.data?.length) {
    return Response.json(cache);
  }

  // Scrape and update cache
  try {
    const scraped = await scrapeRecruitCrmPublic(pageUrl);
    const saved = await writeJobsCache({
      total: scraped.total,
      with_application_link: scraped.with_application_link,
      data: scraped.data,
      sourceUrl: pageUrl,
    });
    return Response.json(saved);
  } catch (e: any) {
    // On failure, serve stale cache if available
    const msg = e?.message || "Failed to parse public jobs page";
    if (cache) {
      return Response.json({ ...cache, stale: true, error: msg }, { status: 200 });
    }
    return Response.json({ error: msg }, { status: 500 });
  }
}

