import type { NextRequest } from "next/server";
import { writeJobsCache } from "@/lib/jobsCache";
import { scrapeRecruitCrmPublic } from "@/lib/recruitcrm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageUrl =
    url.searchParams.get("url") ||
    url.searchParams.get("page") ||
    process.env.RECRUITCRM_PUBLIC_JOBS_URL ||
    "https://recruitcrm.io/jobs/Reworks_Solutions_2_jobs";

  try {
    const scraped = await scrapeRecruitCrmPublic(pageUrl);
    const saved = await writeJobsCache({
      total: scraped.total,
      with_application_link: scraped.with_application_link,
      data: scraped.data,
      sourceUrl: pageUrl,
    });
    return Response.json({ refreshed: true, ...saved });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Failed to refresh jobs cache" }, { status: 500 });
  }
}
