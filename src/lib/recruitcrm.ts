export type ScrapeResult = {
  total: number;
  with_application_link: number;
  data: any[];
};

export async function scrapeRecruitCrmPublic(pageUrl: string): Promise<ScrapeResult> {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 900 },
  } as any);
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36"
    );
    await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 60000 });

    try {
      await page.waitForFunction(() => document.querySelectorAll('iframe').length > 0, { timeout: 15000 });
    } catch {}

    const frames = page.frames();
    const crmFrames = frames.filter((f) => {
      const u = f.url() || "";
      return u.includes("recruitcrm.io");
    });

    async function collectFromFrame(frame: any): Promise<any[]> {
      try {
        await frame.evaluate(async () => {
          const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
          let last = 0;
          for (let i = 0; i < 8; i++) {
            window.scrollTo(0, document.body.scrollHeight);
            await delay(800);
            const count = document.querySelectorAll('a[href]').length;
            if (count <= last) break;
            last = count;
          }
        });
      } catch {}

      const anchors = await frame.$$eval("a[href]", (els: Element[]) =>
        els.map((el: Element) => ({
          href: (el as HTMLAnchorElement).href || "",
          text: (el.textContent || "").trim(),
        }))
      );

      const jobs: any[] = [];
      const seen = new Set<string>();
      for (const a of anchors) {
        try {
          const u = new URL(a.href);
          const path = u.pathname || "";
          const isJobPath = /\/job\//.test(path) || /\/jobs\//.test(path) || /\/apply\//.test(path);
          if (!isJobPath || !u.host.includes("recruitcrm.io")) continue;
          const urlAbs = u.toString();
          if (seen.has(urlAbs)) continue;
          seen.add(urlAbs);
          const title = a.text || "Untitled Role";
          jobs.push({ id: urlAbs, name: title, title, url: urlAbs, application_url: urlAbs });
        } catch {}
      }
      return jobs;
    }

    let jobs: any[] = [];
    if (crmFrames.length > 0) {
      for (const f of crmFrames) {
        const frameJobs = await collectFromFrame(f);
        jobs = jobs.concat(frameJobs);
      }
      const seenAll = new Set<string>();
      jobs = jobs.filter((j) => {
        const key = `${j.title}|${j.url}`;
        if (seenAll.has(key)) return false;
        seenAll.add(key);
        return true;
      });
    } else {
      const anchors = await page.$$eval("a[href]", (els: Element[]) =>
        els.map((el: Element) => ({
          href: (el as HTMLAnchorElement).href || "",
          text: (el.textContent || "").trim(),
        }))
      );
      const seen = new Set<string>();
      for (const a of anchors) {
        try {
          const u = new URL(a.href);
          const path = u.pathname || "";
          const isJobPath = /\/job\//.test(path) || /\/jobs\//.test(path) || /\/apply\//.test(path);
          if (!isJobPath || !u.host.includes("recruitcrm.io")) continue;
          const urlAbs = u.toString();
          if (seen.has(urlAbs)) continue;
          seen.add(urlAbs);
          const title = a.text || "Untitled Role";
          jobs.push({ id: urlAbs, name: title, title, url: urlAbs, application_url: urlAbs });
        } catch {}
      }
    }

    // Attempt to enrich each job with a location by fetching the apply page HTML
    async function tryFetchLocation(applyUrl: string): Promise<string> {
      try {
        const res = await fetch(applyUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          cache: 'no-store'
        } as any);
        if (!res.ok) return '';
        let html = await res.text();
        // Strip scripts/styles/comments, then all tags to reduce noise
        let cleaned = html
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/&amp;/gi, '&')
          .replace(/\s+/g, ' ')
          .trim();

        // Primary: capture after "Location" label
        let locMatch = cleaned.match(/(?:Job\s*)?Location\s*[:\-]?\s*([A-Za-z][A-Za-z0-9 ,()\-\/]{2,80})/i);
        let loc = (locMatch?.[1] || '').trim();

        // Secondary: text immediately before "Share This Job"
        if (!loc) {
          const shareMatch = cleaned.match(/([A-Za-z][A-Za-z0-9 ,()\-\/]{2,80})\s+Share\s+This\s+Job/i);
          loc = (shareMatch?.[1] || '').trim();
        }

        // Sanitization: discard suspicious strings
        if (loc && /(svg|fetchPriority|http|www\.|\.png|\.jpg)/i.test(loc)) {
          loc = '';
        }

        // Filter out common non-location noise
        if (loc && /Job\s*Description/i.test(loc)) {
          loc = '';
        }

        // Keep only strings that look like real locations or "Remote"
        if (loc && !(/\bRemote\b|[,]|\bPhilippines\b|\bUnited\s*States\b|\bUSA\b|\bUK\b|\bCanada\b/i.test(loc))) {
          loc = '';
        }

        return loc;
      } catch {
        return '';
      }
    }

    const withApply = jobs.filter((j) => j.application_url || j.url);
    // Limit concurrent fetches to avoid overwhelming host
    const concurrency = 6;
    const queue = [...jobs];
    const workers: Promise<void>[] = [];
    for (let i = 0; i < concurrency; i++) {
      workers.push((async () => {
        while (queue.length) {
          const j = queue.shift();
          if (!j) break;
          const apply = j.application_url || j.url;
          const loc = apply ? await tryFetchLocation(apply) : '';
          if (loc) j.location = loc;
        }
      })());
    }
    await Promise.all(workers);

    return { total: jobs.length, with_application_link: withApply.length, data: jobs };
  } finally {
    try { await browser.close(); } catch {}
  }
}
