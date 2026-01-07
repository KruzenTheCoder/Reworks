import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RssItem = {
  title?: string;
  link?: string;
  guid?: string | number;
  pubDate?: string;
  description?: string;
  content?: string;
  categories?: string[];
};

type Job = {
  id: string | number;
  name?: string;
  title?: string;
  company_name?: string;
  location?: string;
  job_category?: string;
  application_url?: string;
  url?: string;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const feedUrlParam = url.searchParams.get("feed_url") || url.searchParams.get("url");
  const feedUrl = feedUrlParam || process.env.RSS_FEED_URL || process.env.RECRUITCRM_RSS_URL;
  if (!feedUrl) {
    return Response.json({ error: "Missing RSS feed URL. Provide ?feed_url=… or set RSS_FEED_URL/RECRUITCRM_RSS_URL in env." }, { status: 400 });
  }

  try {
    const Parser = (await import("rss-parser")).default as any;
    const parser = new Parser({ timeout: 30000 });
    const feed = await parser.parseURL(feedUrl);

    const items: RssItem[] = Array.isArray(feed.items) ? feed.items : [];
    const jobs: Job[] = items.map((it) => {
      const title = it.title || "Untitled Role";
      const link = it.link || "";
      const id = (it.guid as any) || link || title;
      const categories = Array.isArray(it.categories) ? it.categories : [];
      // Best-effort company/location extraction from title or description
      const desc = (it.content || it.description || "").trim();
      let company = "";
      let location = "";
      const mCompany = desc.match(/Company:\s*([^\n<>]+)/i);
      if (mCompany) company = mCompany[1].trim();
      const mLoc = desc.match(/Location:\s*([^\n<>]+)/i);
      if (mLoc) location = mLoc[1].trim();

      return {
        id,
        name: title,
        title,
        company_name: company || undefined,
        location: location || undefined,
        job_category: categories.join(", ") || undefined,
        application_url: link || undefined,
        url: link || undefined,
      };
    });

    const withApply = jobs.filter((j) => j.application_url || j.url);
    return Response.json({ total: jobs.length, with_application_link: withApply.length, data: jobs });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Failed to parse RSS feed" }, { status: 500 });
  }
}

