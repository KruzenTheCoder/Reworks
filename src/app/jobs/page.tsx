import MotionSection from "@/components/ui/MotionSection";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/common/Button";
import Link from "next/link";
import { readJobsCache } from "@/lib/jobsCache";

type RecruitCrmJob = {
  id: string | number;
  name?: string; // Primary job name from RecruitCRM
  title?: string;
  job_title?: string;
  company_name?: string;
  job_category?: string;
  location?: string;
  city?: string;
  country?: string;
  job_location_type?: number; // 0 On-Site, 1 Remote, 2 Hybrid
  job_status?: { id?: number; label?: string };
  min_annual_salary?: number;
  max_annual_salary?: number;
  application_form_url?: string;
  application_url?: string;
  job_application_url?: string;
  job_application_link?: string;
  url?: string;
};

type ApiJobsResponse = {
  total?: number;
  with_application_link?: number;
  data?: RecruitCrmJob[];
  error?: string;
};

async function getJobs(source?: string): Promise<RecruitCrmJob[]> {
  try {
    if (source === 'scrape') {
      const body = {
        email: process.env.RECRUITCRM_USERNAME,
        password: process.env.RECRUITCRM_PASSWORD,
      };
      const res = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
      });
      if (!res.ok) return [];
      const ct = res.headers.get('content-type') || '';
      if (!ct.toLowerCase().includes('application/json')) return [];
      const json: ApiJobsResponse = await res.json();
      return Array.isArray(json as any) ? (json as any as RecruitCrmJob[]) : json.data || [];
    }

    if (source === 'rss') {
      const feedUrl = process.env.RSS_FEED_URL || process.env.RECRUITCRM_RSS_URL || '';
      const u = new URL('/api/jobs/rss', 'http://localhost');
      if (feedUrl) u.searchParams.set('feed_url', feedUrl);
      const res = await fetch(u.pathname + (u.search || ''), { cache: 'no-store' });
      if (!res.ok) return [];
      const ct = res.headers.get('content-type') || '';
      if (!ct.toLowerCase().includes('application/json')) return [];
      const json: ApiJobsResponse = await res.json();
      return Array.isArray(json as any) ? (json as any as RecruitCrmJob[]) : json.data || [];
    }

    if (source === 'public') {
      // Prefer local cached file to avoid scraping on page render
      const cache = await readJobsCache();
      if (cache?.data?.length) return cache.data as RecruitCrmJob[];
      // Fallback to API if cache missing
      const res = await fetch('/api/jobs/public', { cache: 'no-store' });
      if (!res.ok) return [];
      const ct = res.headers.get('content-type') || '';
      if (!ct.toLowerCase().includes('application/json')) return [];
      const json: ApiJobsResponse = await res.json();
      return Array.isArray(json as any) ? (json as any as RecruitCrmJob[]) : json.data || [];
    }

    const res = await fetch('/api/jobs', { cache: 'no-store' });
    if (!res.ok) return [];
    const ct = res.headers.get('content-type') || '';
    if (!ct.toLowerCase().includes('application/json')) return [];
    const json: ApiJobsResponse = await res.json();
    return Array.isArray(json as any) ? (json as any as RecruitCrmJob[]) : json.data || [];
  } catch {
    return [];
  }
}

export default async function JobsPage({ searchParams }: any) {
  const sp = await searchParams;
  const source = sp?.source ?? 'public';
  const jobs = await getJobs(source);
  const publicUrl = process.env.RECRUITCRM_PUBLIC_JOBS_URL || 'https://recruitcrm.io/jobs/Reworks_Solutions_2_jobs';
  const totalFetched = jobs.length;

  const normalize = (job: RecruitCrmJob) => {
    const title = job.name || job.title || job.job_title || "Untitled Role";
    const company = job.company_name || "";
    const locationBase = job.location || [job.city, job.country].filter(Boolean).join(", ") || "Remote";
    const locationTypeLabel =
      job.job_location_type === 1
        ? "Remote"
        : job.job_location_type === 2
        ? "Hybrid"
        : job.job_location_type === 0
        ? "On‑Site"
        : "";
    const location = [locationBase, locationTypeLabel].filter(Boolean).join(" • ");
    const applyUrl =
      job.application_form_url ||
      job.application_url ||
      job.job_application_url ||
      job.job_application_link ||
      job.url ||
      "";
    const statusLabel = job.job_status?.label || "";
    return { id: job.id, title, company, location, applyUrl, statusLabel };
  };

  const normalizedJobs = jobs.map(normalize).filter(j => j.applyUrl);
  const withApplyCount = normalizedJobs.length;

  return (
    <div className="min-h-screen">
      <MotionSection className="section-wrap" variant="fade" viewportAmount={0}>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <TypewriterText
              text="Find Your Next Remote Role"
              speed={32}
              caretHeightClass="h-10"
              shimmerOnComplete
            />
          </h1>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Browse live openings and apply to roles directly on our Recruit CRM.
          </p>
        </div>

        {sp?.debug === '1' ? (
          <div className="rounded-2xl bg-white/60 border border-white/40 p-6">
            <h2 className="text-lg font-semibold mb-2">Debug: RecruitCRM Fetch</h2>
            <p className="text-sm text-text-muted">Fetched {totalFetched} total jobs; {withApplyCount} have application links.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {jobs.slice(0, 8).map(j => (
                <div key={j.id} className="rounded-lg border border-gray-200 bg-white/70 p-3">
                  <div className="font-medium">{j.name || j.title || j.job_title || j.id}</div>
                  <div className="text-gray-600 break-all">
                    {j.application_form_url || j.application_url || j.job_application_url || j.job_application_link || j.url || 'No application link'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button href="/api/jobs" variant="ghost" size="md">View Raw JSON (API)</Button>
              <Button href="/api/jobs/rss" variant="ghost" size="md">View Raw JSON (RSS)</Button>
              <Button href="/api/jobs/public" variant="ghost" size="md">View Raw JSON (Public)</Button>
            </div>
          </div>
        ) : normalizedJobs.length === 0 ? (
          <div className="rounded-2xl bg-white/60 border border-white/40 p-6 text-center">
            <p className="text-text-muted">No live jobs found. Please check back soon.</p>
            <p className="text-sm text-text-muted mt-2">Fetched {totalFetched} jobs from RecruitCRM; {withApplyCount} have application links.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {normalizedJobs.map(job => (
              <Link
                key={job.id}
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-card glass-card rounded-2xl px-6 py-5 block transition-transform hover:translate-y-[-2px]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold title-gradient font-display leading-tight">{job.title}</h3>
                    {job.location && (
                      <p className="text-sm text-text-muted mt-1 flex items-center gap-2">
                        <img src="/pin.svg" alt="Location" width="16" height="16" className="inline-block opacity-80" />
                        {job.location}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <Button variant="luxury" size="md">
                      View Job
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button href="/contact" variant="ghost" size="lg">
            Can’t find your role? Talk to us
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
