# Integration & System Logic Specification

## 1. Calendar Modal Architecture (`customCalModal`)
This is the global booking system used to prevent users from leaving the site.

*   **HTML Location:** Must be placed directly before the closing `</body>` tag in ALL core HTML files.
*   **Trigger:** `<button onclick="openCalModal(event)">`
*   **JS Logic (`script.js`):**
    *   Stops event propagation.
    *   Checks if `#customCalModal` exists. If it fails, falls back to: `window.open('https://cal.com/nitinmishra/30min', '_blank')`.
    *   Injects iframe src dynamically to save page load speed: `https://cal.com/nitinmishra/30min?embed=true&layout=month_view&theme=dark`.
    *   Locks body scrolling: `document.body.style.overflow = 'hidden'`.

## 2. Intake Form Infrastructure (`#operationalForm`)
Standard operational intake form for lead qualification.

**Required `name` Attributes (Do not change without updating backend CRM/Webhooks):**
1.  `name="name"` (Text)
2.  `name="email"` (Email)
3.  `name="business_type"` (Text)
4.  `name="help_type"` (Select Dropdown - strict categorical mapping)
5.  `name="operational_challenge"` (Textarea)
6.  `name="current_tools"` (Text - Optional)

**Fallback UX:**
The form section contains a secondary direct booking CTA (`Book a 20-Min Call Directly`) to capture high-intent users who abandon the form fields.

## 3. Dropdown Navigation Component
*   **Trigger:** Hovering over `.nav-item-dropdown`.
*   **Behavior:** CSS-only hover state reveals `.nav-dropdown-menu`.
*   **Animation:** The Chevron SVG rotates 180 degrees `transform: rotate(180deg)` on hover for visual feedback.
