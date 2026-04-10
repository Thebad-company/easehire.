# Design System: EaseHire "Kinetic Command"
**Project ID:** 10353819890213918902

## 1. Visual Theme & Atmosphere
**Atmosphere: "Operational Calm"**
The design rejects the "busy" look of traditional HR software. It is rooted in **Obsidian Minimalism**—a deep, dark canvas where information is layered with surgical precision. The aesthetic is "Kinetic"—it should feel fast and interactive, like a high-performance command center. We use radical whitespace and massive typography to command attention.

## 2. Color Palette & Roles
*   **Obsidian Depth (#020617):** The base background. A rich, deep navy-black that provides infinite optical depth.
*   **Electric Cobalt (#1111D4):** The primary action color. Used for critical CTAs and high-priority signals.
*   **Cyan Pulse (#22D3EE):** Secondary accent. Used for AI signals, "Live" indicators, and secondary metrics.
*   **Sovereign White (#F8FAFC):** Primary text color. High-contrast but slightly softened to prevent eye strain.
*   **Muted Slate (#64748B):** Used for metadata, labels, and secondary supporting text.

## 3. Typography Rules
*   **Headlines (Inter):** Weight 800 (Extra Bold) with `tracking-tighter` (-0.05em). Headlines must be large (`display-lg` to `headline-lg`) to establish authority.
*   **Body (Inter):** Regular weight with `line-height: 1.6`. Clean, utilitarian, and highly readable.
*   **Labels:** `label-sm` in all-caps with `tracking-widest` (0.15em) to contrast with heavy headlines.

## 4. Component Stylings
*   **Buttons:** 
    *   **Primary:** Solid Electric Cobalt with a subtle "inner glow" gradient. Sharp 8px (`lg`) corners.
    *   **Secondary:** Ghost style with a "Electric Cobalt" border at 40% opacity.
*   **Cards/Containers:** 
    *   Use **Tonal Layering**. Place `surface-container-high` cards on the obsidian background.
    *   **Glassmorphism:** Navigation and floating modals use a 70% opaque background with a `24px` backdrop blur.
*   **Inputs:** Minimalist with only a bottom border that "glows" Cobalt on focus.

## 5. Layout Principles
*   **Asymmetry:** Avoid perfect symmetry. Use bento-style grids where cards have varying heights and widths to create visual interest.
*   **The 120px Padding Rule:** Use large vertical margins (Spacing Token 24) between sections to let the design breathe.
*   **Responsive Flow:** Grid columns must stack logically on mobile (1 col) while maintaining airy padding.

## 6. Design System Notes for Stitch Generation
[Copy this block into your Stitch prompt for consistency]

**UI STYLE: PREVENT GENERIC SAAS LOOK**
- **NO LINES:** Prohibit the use of 1px solid borders for sectioning. Use background color shifts from `surface` to `surface-container-low` for separation.
- **TONAL DEPTH:** Layer elements. Place `surface-container-highest` cards on a `surface` background to create a "soft lift" without heavy shadows.
- **INTERACTIVE GLOW:** Use a subtle `Cobalt` ( #1111D4) drop-shadow with 60px blur and 4% opacity for floating elements.
- **TYPOGRAPHY SCALE:** Massive contrast between `display-lg` headlines and `body-md` text.
- **BENTO GRID:** Layout should use asymmetrical "Bento" blocks for features and data.
- **GLASSMORPHISM:** Apply backdrop-blur (20px) to the navigation bar and floating notifications.
