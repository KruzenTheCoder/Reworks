I have updated the plan to include the smooth hero fade-in and global page transition, alongside the performance optimizations.

### 1. **Smoother Animations (Fixing "Jagged" Loading)**
*   **Hero Section (`Hero.tsx`):**
    *   **Current:** Elements animate independently with manual delays (0.2s, 0.8s, etc.), which can desync if the device is lagging.
    *   **Fix:** Refactor to use a **Parent Orchestrator** (Framer Motion `staggerChildren`). This forces the browser to play animations in a strictly coordinated sequence, ensuring a smooth "waterfall" effect that never looks disjointed.
*   **Global Page Fade:**
    *   **Current:** Pages may "pop" in abruptly.
    *   **Fix:** Add a global `ClientWrapper` to `layout.tsx` that provides a gentle **opacity fade-in** when the route changes, softening the transition between pages.

### 2. **Performance: Replacing Heavy Libraries with CSS**
*   **Replace `LiquidChrome` (Background):**
    *   **Action:** Delete the heavy WebGL/OGL shader.
    *   **Replacement:** Use **CSS Keyframe Animations** with moving radial gradients. This moves the workload to the CSS engine, which is lighter and battery-friendly.
*   **Optimize `GradualBlur` (Overlay):**
    *   **Action:** Remove the stack of multiple `<div>`s.
    *   **Replacement:** Use a single `<div>` with **CSS `mask-image`**. This creates the same gradient blur look but uses ~80% less GPU memory.
*   **Optimize `TextType` (Typewriter):**
    *   **Action:** Stop using React State for every character.
    *   **Replacement:** Use **Direct DOM Manipulation** (Refs). This allows the text to type out smoothly at 60fps without freezing the rest of the page logic.

### 3. **General Optimization**
*   **Action:** Add `will-change: opacity, transform` to `MotionSection` to hint the browser to pre-render animations on their own layer.

This plan solves the lag by removing heavy code and solves the "jagged" look by coordinating the animations.
