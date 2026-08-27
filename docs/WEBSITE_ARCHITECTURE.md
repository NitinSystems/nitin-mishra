# Website Architecture: Nitin Mishra Portfolio (Production V1)

## 1. Directory Structure (Flat-Root Model)
The project utilizes a clean, flat-root architecture to maximize deployment efficiency and simplify relative routing on GitHub Pages.

- `index.html` (Main Production Landing Page)
- `about.html` (Dedicated Human-First Credibility Page)
- `thank-you.html` (Lead Capture Success & Next Steps)
- `style.css` (Global styling, dark horizon aesthetics, and responsive systems)
- `script.js` (Interaction orchestration, URL hashtag manipulation, and webhook processing)
- `/assets/` (Shared asset directory for workflows, icons, and platform logos)
- `/logo/` (Master logo storage, utilizing `nm-logo-wrapper` constraints)
- `/docs/` (Architecture logic)
- `/archive/` (Deep recovery backup mirroring the latest stable live files, not for experiment storage)
- `/rollback-backups/main-rollback/` (The sole stable backup snapshot of live production)
- `/ops-gap-preview.*` (Separated build/preview files used for safe sandbox prototyping. Kept intact for fallback and reference before merging into main)

---

## 2. Page Hierarchy & Routing Logic

### Landing Page (index.html)
Follows a **Conversion Sequencing** model designed to move a visitor from "Problem Awareness" to "Solution Trust."
1.  **Navigation**: Floating architectural shell. Anchor links target specific sections (e.g., `#home`, `#systems`).
2.  **Hero Section**: Cinematic hook (`#home`), optimized for direct URL sharing (`.../#home`).
3.  **Trust Strip**: Dual-direction motion lanes of operational infrastructure.
4.  **Operational Gaps We Solve**: Pipeline architecture displaying the transition from fragmented workflows to verified system reliability.
5.  **Services (Operational Capabilities)**: 6 core pillars of systems design.
6.  **Systems Showcase**: Editorial case studies of real workflow implementation.
7.  **Process (Operational Delivery)**: A visual journey of how systems are built.
7.  **Contact (Review Your Workflow)**: Consultative lead capture routing to a Make.com webhook.

### About & Thank You Pages
- Designed as satellite pages supporting the core funnel.
- **Clean URL Implementation**: Navigation links pointing back to the homepage utilize extensionless root-relative paths (`href="./"`, `href="about"`) to natively strip `.html` from the URL bar on GitHub Pages.

---

## 3. Structural Design Systems
- **Logo Containment**: Global `nm-logo-wrapper` class forces exact structural alignment for the primary SVG/PNG monograms across all pages (nav and footer).
- **Smooth Scrolling**: Handled natively in `script.js` which captures link clicks, smoothly scrolls to the target section, and injects the `#hash` into the URL bar without visual jumping (`history.pushState`).
- **Responsive Execution**: Stacked single-column mobile priority, leveraging `max-width: 1200px` standard containers for desktop equilibrium.
