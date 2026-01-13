## Answer
Yes — switching from a rendered/animated background (animated gradients + particles + mouse-follow blur) to a single static background image will usually remove the “jittery on load” feeling on low-end machines. What you’re seeing is the browser struggling to paint/compose multiple moving + blurred layers at 60fps immediately after first render.

Hosting the background locally on Vercel is ideal: anything inside `public/` is served as a fast static asset with caching. A local `/public/...` image avoids extra DNS/SSL work and is more reliable than hotlinking.

## What We’ll Do
- Use your provided image as a fixed, site-wide background layer.
- Remove the animated/rendered global background (ColorBloom: particles + animated gradients + mouse-follow glow), since that’s one of the biggest sources of first-load jank.
- Keep the rest of the site intact (sections/content), but ensure text readability over the new background with a subtle overlay.

## Implementation Plan
### 1) Add the background image locally
- Download/copy your image to: `public/images/site-bg.webp` (or similar).
- Confirm file size is reasonable (goal: under ~500KB–1.5MB). If larger, we’ll resize/compress.

### 2) Apply background globally via CSS (fastest + simplest)
- Update `src/app/globals.css` to set a site-wide background using a fixed pseudo-element:
  - `body::before { position: fixed; inset: 0; background-image: url('/images/site-bg.webp'); background-size: cover; background-position: center; z-index: -20; }`
  - Add a second overlay layer (very light dark/white wash) to keep typography readable.
- Avoid `background-attachment: fixed` (it can be slower on some browsers). The fixed pseudo-element achieves the look with better stability.

### 3) Remove the animated global background component
- In `src/app/layout.tsx`, remove `<ColorBloom />` so the background is no longer “rendered”/animated.

### 4) Reduce background duplication on the homepage hero
- In `src/components/sections/Hero.tsx`, remove or greatly simplify the Hero-specific animated orb background (since the new site-wide image replaces it).
  - This avoids stacking multiple backgrounds and reduces GPU load further.

### 5) Verify
- Run a production build and confirm:
  - Smooth initial load on the homepage.
  - Smooth scroll on lower-end devices.
  - Text contrast is still premium/clean across pages.

## Files I’ll Touch
- `public/images/site-bg.webp` (new asset)
- `src/app/globals.css` (global background + overlay)
- `src/app/layout.tsx` (remove ColorBloom)
- `src/components/sections/Hero.tsx` (remove/simplify background orbs)

If you confirm this plan, I’ll implement it exactly (using your image, hosted locally, across the entire site).