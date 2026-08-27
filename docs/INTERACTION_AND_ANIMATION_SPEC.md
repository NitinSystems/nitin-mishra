# UI/UX Interaction & Animation Specification

## 1. The Easing Curve (Global Standard)
All premium UI transitions must use this exact bezier curve to maintain the "Apple/SaaS" tier feel:
*   **Standard Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
*   **Standard Duration:** `0.6s` to `0.8s`

## 2. Page Load & Sticky Nav Logic
*   **Body State:** On load, `body` gets `page-load-smooth`, which transitions to `page-loaded`.
*   **Sticky Nav Critical Rule:** The `body.page-loaded` state MUST use `transform: none;`. If a transform is applied to the body, `position: fixed` on the navbar will break.
*   **Navbar Scroll:** Triggered by JS when `window.scrollY > 50`. Adds class `.navbar-scrolled` which injects a dark glassmorphic background `rgba(7, 9, 17, 0.95)` and a shadow `0 10px 40px rgba(0, 0, 0, 0.6)`.

## 3. Reveal System (Scroll Animation)
*   **Initial State (`.reveal-on-scroll`, `.reveal-on-load`):** 
    *   `opacity: 0`
    *   `transform: translateY(24px)`
*   **Active State (`.is-revealed`):**
    *   `opacity: 1`
    *   `transform: translateY(0)`
*   **Staggering:** Use `.reveal-delay-1` through `3` to stagger load times by `150ms` increments.

## 4. Glow Orb Engine (Atmospheric Lighting)
*   **Positioning:** Fixed inside `.glow-background` at the back of the DOM (`z-index: -1`).
*   **Visuals:** `radial-gradient(circle at 50% 50%, rgba(28, 78, 216, 0.15) 0%, transparent 50%)`
*   **Motion:** Slow translation animations (`float-orb`, `float-orb-alt`) ranging from 15s to 20s infinite linear loops.

## 5. Buttons (Magnetic & Hover)
*   **Hover Lift:** `transform: translateY(-2px)`
*   **Shadow Expansion:** Box-shadow opacity increases by ~20% on hover.
