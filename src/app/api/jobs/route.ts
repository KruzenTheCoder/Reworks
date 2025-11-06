import type { NextRequest } from "next/server";

type RecruitCrmJob = {
  id: string | number;
  name?: string;
  title?: string;
  job_title?: string;
  company_name?: string;
  location?: string;
  city?: string;
  country?: string;
  job_location_type?: number;
  job_status?: { id?: number; label?: string };
  application_form_url?: string;
  application_url?: string;
  job_application_url?: string;
  job_application_link?: string;
  url?: string;
};

type RecruitCrmResponse = {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  last_page?: number;
  total?: number;
  last_page_url?: string | null;
  data?: RecruitCrmJob[];
};

async function fetchAllJobs(token: string): Promise<RecruitCrmJob[]> {
  // Use Open API host with Bearer auth, as per your working curl
  const baseUrl = "https://api.recruitcrm.io/v1/jobs";
  let page = 1;
  const all: RecruitCrmJob[] = [];

  while (true) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(50),
      sort_by: "updatedon",
      sort_order: "desc",
    });
    // Build headers based on detected/attempted auth style
    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // Try existing authStyle first if known, otherwise attempt Bearer then Token
    const url = `${baseUrl}?${params.toString()}`;
    const res = await fetch(url, { headers, cache: 'no-store' });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`RecruitCRM ${res.status}: ${text.slice(0, 400)}`);
    }
    const ct = res.headers.get('content-type') || '';
    if (!ct.toLowerCase().includes('application/json')) {
      const text = await res.text().catch(() => '');
      throw new Error(`RecruitCRM non-JSON response (${ct || 'unknown'}): ${text.slice(0, 300)}`);
    }
    const json: RecruitCrmResponse = await res.json();
    const data = Array.isArray(json as any) ? (json as any as RecruitCrmJob[]) : json.data || [];
    all.push(...data);
    const lastPage = json.last_page ?? page;
    const hasNext = json.next_page_url !== null && page < lastPage;
    if (!hasNext) break;
    page += 1;
  }

  return all;
}

async function fetchJobsPage(token: string, page: number): Promise<RecruitCrmResponse> {
  // Lock to documented Open API host; App host serves HTML Single-SPA, not JSON
  const url = new URL("https://api.recruitcrm.io/v1/jobs");
  const params = new URLSearchParams();
  params.set("page", String(page));
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RecruitCRM ${res.status}: ${text.slice(0, 300)}`);
  }
  if (!ct.toLowerCase().includes("application/json")) {
    const text = await res.text().catch(() => "");
    throw new Error(`RecruitCRM non-JSON (${ct || "unknown"}): ${text.slice(0, 300)}`);
  }

  const json: RecruitCrmResponse = await res.json();
  return json;
}

export async function GET(_req: NextRequest) {
  const token = process.env.RECRUITCRM_API_KEY;
  if (!token) {
    return Response.json(
      { error: "Missing RECRUITCRM_API_KEY in environment" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(_req.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;
    const json = await fetchJobsPage(token, page);
    return Response.json(json);
  } catch (e: any) {
    return Response.json({ error: e?.message || "Failed to fetch jobs" }, { status: 500 });
  }
}
