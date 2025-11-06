import type { NextRequest } from "next/server";
// Use vanilla Puppeteer to avoid bundling issues with puppeteer-extra

// Ensure Node.js runtime for Puppeteer and force dynamic rendering
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
  next_page_url?: string | null;
  last_page?: number;
  data?: RecruitCrmJob[];
};

export async function POST(req: NextRequest) {
  const { default: puppeteer } = await import("puppeteer");
  let email: string | undefined;
  let password: string | undefined;
  let debug: boolean = false;
  try {
    const body = await req.json().catch(() => ({}));
    email = body?.email || process.env.RECRUITCRM_USERNAME;
    password = body?.password || process.env.RECRUITCRM_PASSWORD;
    debug = !!body?.debug;
  } catch (_) {}

  if (!email || !password) {
    return Response.json(
      { error: "Missing credentials. Provide { email, password } in JSON body or set RECRUITCRM_USERNAME/RECRUITCRM_PASSWORD in env." },
      { status: 400 }
    );
  }

  // Use standard headless mode for compatibility with current Puppeteer types
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(45000);
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
    await page.goto("https://app.recruitcrm.io/login", { waitUntil: "domcontentloaded" });
    // Accept cookie policy if shown
    await page.click("button:has-text('Accept'), button:has-text('I Agree'), [data-testid='cookie-accept']").catch(() => {});

    // Fill login form
    await page.waitForSelector("input[type=email], input[name=email]");
    await page.type("input[type=email], input[name=email]", email, { delay: 15 });
    await page.waitForSelector("input[type=password], input[name=password]");
    await page.type("input[type=password], input[name=password]", password, { delay: 15 });

    // Submit and wait for navigation
    const submitSelector = "button[type=submit], button[name=login], #login-button, .btn-primary, button:has-text('Sign In'), button:has-text('Login')";
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
      page.click(submitSelector).catch(async () => {
        // Fallback: press Enter in password field
        await page.focus("input[type=password], input[name=password]");
        await page.keyboard.press("Enter");
      }),
    ]);

    // Try to confirm we are past login; navigate to Jobs page explicitly
    await page.waitForFunction(() => !location.pathname.includes('login'), { timeout: 15000 }).catch(() => {});
    // Also wait for an authenticated API response if possible
    await page.waitForResponse((res) => {
      const u = res.url();
      return (u.includes("/api/v1/user") || u.includes("/api/v1/jobs") || u.includes("/api/jobs")) && res.status() === 200;
    }, { timeout: 15000 }).catch(() => {});
    await page.goto("https://app.recruitcrm.io/app/jobs", { waitUntil: "networkidle2" }).catch(() => {});

    // Confirm we are logged in by checking for any jobs UI element
    const loggedIn = await page.waitForSelector("a[href*='/app/job'], a[href*='/jobs/'], nav, header, [data-testid='sidebar']", { timeout: 12000 })
      .then(() => true)
      .catch(() => !page.url().includes("/login"));

    if (!loggedIn) {
      const html = await page.content().catch(() => "");
      const debug = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input')).map((i) => ({
          name: (i as HTMLInputElement).name,
          type: (i as HTMLInputElement).type,
          id: i.id,
          placeholder: (i as HTMLInputElement).placeholder,
          classes: i.className,
        })).slice(0, 30);
        const buttons = Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).map((b) => {
          const t = (b.textContent || '').trim();
          const val = (b as HTMLInputElement).value || '';
          const aria = b.getAttribute('aria-label') || '';
          return { text: t, value: val, aria, id: (b as HTMLElement).id, classes: (b as HTMLElement).className };
        }).slice(0, 30);
        const iframes = Array.from(document.querySelectorAll('iframe')).map((f) => ({ src: (f as HTMLIFrameElement).src, id: f.id }));
        const text = document.body.innerText.slice(0, 2000);
        return { inputs, buttons, iframes, text };
      }).catch(() => undefined);
      return Response.json({ error: "Login failed. Check credentials or 2FA/SSO requirements.", page: page.url(), html_sample: html ? html.slice(0, 4000) : undefined, debug }, { status: 401 });
    }

    // Try internal JSON API first (with cookies), then fallback to DOM scraping
    let jobs: RecruitCrmJob[] = await page.evaluate(async () => {
      const endpoints = [
        (pageNum: number) => `https://app.recruitcrm.io/api/v1/jobs?page=${pageNum}&limit=50&sort_by=updatedon&sort_order=desc`,
        (pageNum: number) => `https://app.recruitcrm.io/api/jobs?page=${pageNum}&limit=50&sort_by=updatedon&sort_order=desc`,
      ];

      async function fetchJsonSeries(pageNum: number): Promise<RecruitCrmResponse | null> {
        for (const build of endpoints) {
          try {
            const url = build(pageNum);
            const res = await fetch(url, { headers: { Accept: "application/json" }, credentials: "include" });
            const ct = res.headers.get("content-type") || "";
            if (!res.ok) continue;
            if (!ct.toLowerCase().includes("application/json")) continue;
            return (await res.json()) as RecruitCrmResponse;
          } catch (_) {
            // try next endpoint
          }
        }
        return null;
      }

      // Attempt JSON pagination
      const jsonCollected: RecruitCrmJob[] = [];
      let p = 1;
      while (true) {
        const json = await fetchJsonSeries(p);
        if (!json) break;
        const data = Array.isArray(json as any) ? ((json as any) as RecruitCrmJob[]) : json.data || [];
        jsonCollected.push(...data);
        const last = json.last_page ?? p;
        const hasNext = json.next_page_url !== null && p < last;
        if (!hasNext) break;
        p += 1;
      }
      return jsonCollected;
    });

    // If JSON collection failed or returned empty, fallback to DOM scraping
    if (!jobs || jobs.length === 0) {
      await page.goto("https://app.recruitcrm.io/app/jobs", { waitUntil: "networkidle2" });
      // Give SPA time to render
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Try to auto-scroll to load results
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight - window.innerHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 250);
        });
      }).catch(() => {});

      // Widen selector to capture most job links
      await page.waitForSelector('a[href], [role="link"]', { timeout: 15000 }).catch(() => {});
      const domJobs: RecruitCrmJob[] = await page.$$eval('a[href], [role="link"]', (nodes) => {
        return (nodes as HTMLAnchorElement[])
          .map((a) => {
            const href = (a as HTMLAnchorElement).href || a.getAttribute('href') || '';
            let title = a.textContent?.trim() || a.getAttribute('title') || '';
            // Try to get a better title from parent nodes
            if (!title) {
              const parentText = a.parentElement?.textContent?.trim() || '';
              if (parentText && parentText.length < 200) title = parentText;
            }
            title = title || 'Untitled Role';
            return { id: href, name: title || undefined, title: title || undefined, url: href } as any;
          })
          .filter((j) => {
            try {
              const u = new URL(j.url as string);
              const p = u.pathname || '';
              const isApp = u.hostname === 'app.recruitcrm.io';
              const isJobPath = /\/app\/(job|jobs)(\/|$)/.test(p);
              const isApi = p.includes('/api/') || p.includes('/v1/');
              return isApp && isJobPath && !isApi;
            } catch { return false; }
          });
      });
      jobs = domJobs;

      // If still empty, attempt to infer job IDs from visible job cards/rows and construct detail URLs
      if (!jobs || jobs.length === 0) {
        const inferred: RecruitCrmJob[] = await page.evaluate(() => {
          const candidates = Array.from(document.querySelectorAll('[data-testid*="job" i], [class*="job" i], [id*="job" i]')) as HTMLElement[];
          const results: RecruitCrmJob[] = [] as any;
          const seen = new Set<string>();
          const rx = /\b(\d{5,})\b/; // guess job id numbers of length >=5
          for (const el of candidates) {
            const attrs = [el.id, el.getAttribute('data-testid') || '', el.getAttribute('data-id') || '', el.className || ''].join(' ');
            const m = attrs.match(rx) || (el.innerText || '').match(rx);
            if (m) {
              const id = m[1];
              if (seen.has(id)) continue;
              seen.add(id);
              const title = (el.innerText || '').trim().split('\n')[0].slice(0, 140) || 'Untitled Role';
              const url = `https://app.recruitcrm.io/v1/app/job/${id}`;
              results.push({ id, name: title, title, url } as any);
            }
          }
          return results;
        }).catch(() => [] as RecruitCrmJob[]);
        jobs = inferred;
      }
    }

    const withApply = jobs.filter(
      (j) =>
        j.application_form_url ||
        j.application_url ||
        j.job_application_url ||
        j.job_application_link ||
        j.url
    );

    if (debug) {
      const info = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href], [role="link"]')) as any[];
        const text = document.body.innerText.slice(0, 1000);
        return { anchorsCount: anchors.length, textSample: text };
      }).catch(() => ({ anchorsCount: -1, textSample: '' }));
      const debugInfo = {
        url: page.url(),
        hasSidebar: !!(await page.$('[data-testid="sidebar"], nav, header')),
        anchorsCount: info.anchorsCount,
        textSample: info.textSample,
      };
      return Response.json({ total: jobs.length, with_application_link: withApply.length, sample: jobs.slice(0, 5), data: jobs, debug: debugInfo });
    }
    return Response.json({ total: jobs.length, with_application_link: withApply.length, sample: jobs.slice(0, 5), data: jobs });
  } catch (err: any) {
    return Response.json({ error: err?.message || String(err) }, { status: 500 });
  } finally {
    await browser.close().catch(() => {});
  }
}
