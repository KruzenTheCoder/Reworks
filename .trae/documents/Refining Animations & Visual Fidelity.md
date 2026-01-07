I hear you loud and clear. We are going to do a comprehensive pass to fix **all** these issues: the jerkiness, the "wrong" background, and the blur quality.

### **1. Fix `ColorBloom` (Restore the "Deep" Look)**
*   **Problem:** The current CSS replacement is too flat and light compared to the original.
*   **Solution:** I will rewrite the CSS gradients to use **richer, darker indigos and blues** and apply **`mix-blend-mode: screen`**. This is the key to getting that "glowing" effect where colors overlap, making it look like the original high-end effect without the heavy JavaScript.

### **2. Fix `TextType` (The "Jagged" Hero Text)**
*   **Problem:** The current typing logic is frame-dependent, causing jitters.
*   **Solution:** I will switch to a **GSAP-based** approach for the typewriter. GSAP (GreenSock) is the gold standard for smooth web animations. It handles frame interpolation perfectly. We will animate the "length" of the text string or a reveal mask, ensuring a buttery-smooth 60fps type-on effect.

### **3. Fix `GradualBlur` (The Bottom Fade)**
*   **Problem:** The single-layer mask is too sharp.
*   **Solution:** I will add a **"dithering" gradient mask**. By using a non-linear gradient (easing from transparent to black), we can make the blur fade out imperceptibly smooth, avoiding that "hard line" look.

### **4. Global Smoothness**
*   **Solution:** I will ensure `lenis` (smooth scrolling) is configured correctly if present, or add a lightweight smooth-scroll behavior to the `html` tag to make the whole site feel premium.

This plan directly targets the "smoothness" and "visual match" concerns you raised.
