# Design System: MoatHero

## 1. Visual Theme & Atmosphere
A clinical, high-density brand authority dashboard with an editorial aesthetic. The atmosphere balances the precision of an engineering cockpit with the warmth of a luxury serif-led publication. Layouts are strictly segmented by subtle 1px dividers, utilizing generous negative space and a premium dark glassmorphic depth.

## 2. Color Palette & Roles
*   **Matte Canvas** (#050507) — Main background backing surface.
*   **Charcoal Panel** (#0c0c0f) — Container, panel, and modal backgrounds.
*   **Whisper Border** (rgba(255, 255, 255, 0.06)) — Interactive component borders and fine dividers.
*   **Luxury Gold** (#d4af37) — Primary branding accent, main headers, and verification checks.
*   **Vibrant Copper** (#b87333) — Secondary action button gradients, baseline anchors, and delta metrics.
*   **Amber Glow** (#e5c158) — Dynamic warning borders, warning labels, and pending alerts.
*   **Muted Zinc** (#a1a1aa) — Supporting body copy and description labels.
*   **Monochrome Text** (#fdfbf7) — Primary readability color.

## 3. Typography Rules
*   **Display / Headlines:** `Outfit` (or `Satoshi`) — Track-tight, controlled scaling, utilizing bold weights for visual anchor points.
*   **Body Copy:** `Geist` — Clean, legible, capped at 65 characters per line to reduce reading cognitive overload.
*   **Mono / Telemetry:** `Geist Mono` (or `JetBrains Mono`) — Applied to all code blocks, JSON-LD schemas, alignment percentages, and crawler logs.
*   **Banned Fonts:** `Inter` is strictly forbidden. Generic system fonts are banned.

## 4. Component Stylings
*   **Primary Action Buttons:** Flat dark borders transitioning to a vibrant copper/gold gradient (#b87333 to #d4af37) on hover, with a tactile active click transition (-1px vertical shift).
*   **Interactive Cards:** Rounded corners (12px), subtle semitransparent borders, and a deep diffused zinc-950 shadow. Used only when elevation communicates hierarchy.
*   **Telemetry Logs:** Flat matte-black container shells featuring styled monospace code streams and color-coded status pills.
*   **Inputs / Forms:** Label positioned strictly above inputs. Borders transition to Luxury Gold (#d4af37) on active focus states.
*   **Loaders:** Custom spinning-dash circular rings and skeletal shimmers matching the container's layout dimensions.

## 5. Layout Principles
*   **Asymmetric Bento Grid:** Features a dual-column layout with split-screen hero parameters on the left and heavy telemetry graphs on the right.
*   **Strict Space Boundaries:** Elements never overlap. Every component occupies its own distinct, clean pixel boundary.
*   **Mobile-First Collapse:** Multi-column interfaces collapse to a clean single column below 768px.
*   **Touch Boundaries:** All touch triggers have a minimum 44px active tap target.

## 6. Motion & Interaction
*   **Spring Physics:** Weighty transitions for all menu overlays and modal popups (`stiffness: 100, damping: 20`).
*   **Hover Micro-Animations:** Chevron icons slide forward smoothly (`group-hover:translate-x-1`) and active spark icons spin on hover.
*   **Staggered Entrance:** Telemetry results cascade down sequentially rather than mounting instantly.
*   **Hardware Acceleration:** Animating exclusively via `transform` and `opacity` to avoid layout re-flow stutters.

## 7. Anti-Patterns (Banned)
*   **No Neon Green:** Absolute ban on neon green accents, glowing borders, laser lines, or glowing text.
*   **No Emojis:** Strictly banned in all public interfaces, metadata, and generated copy (except standard Lucide vector icons).
*   **No Overlapping Content:** Text blocks and containers must never overlap.
*   **No Filler COPY:** No meaningless placeholders ("John Doe", "Acme Corp") — use realistic sample brands (e.g. `rankbeacon.dev`).
*   **No AI Copywriting Clichés:** Words like "seamless", "next-gen", "unleash", or "elevate" are completely banned.
