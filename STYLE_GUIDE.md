# Design System & Styling Guide (Source of Truth)

This document establishes the spacing, padding, and layout standards for the Nitin Mishra Portfolio project, based on the flagship **AI Customer Journey Leak Recovery System** page. Follow these exact CSS properties and HTML classes for all new systems pages to prevent mobile alignment issues.

---

## 1. Hero Layout & Top Spacing System

All hero sections (`section.systems-hero`) must use top-aligned flex layout with absolute padding specifications to leave consistent breathing room under the floating navigation bar (which occupies the top 80px of mobile viewports).

### CSS Specification
```css
section.systems-hero {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    padding-top: 170px !important;
    padding-bottom: 96px;
    box-sizing: border-box;
}

@media (max-width: 960px) {
    section.systems-hero {
        padding-top: 112px !important; /* Spacing below floating nav: exactly 32px gap */
        padding-bottom: 64px;
    }
}
```

---

## 2. Section Paddings

Paddings must be set on section wrappers rather than inner containers to prevent mobile stacking bugs.

*   **Standard Case Study Section (`.case-study-section`)**:
    *   Vertical Padding: `80px` top and bottom.
*   **Documentation Section (`.documentation-section`)**:
    *   Desktop Padding: `120px !important` top and bottom.
    *   Mobile Padding (max-width: 767px): `96px !important` top and bottom.
*   **Inner Containers (`.container-standard` inside sections)**:
    *   **Rule**: Never write inline top or bottom padding on the interior container (e.g. `<div class="container-standard" style="padding: 100px 24px;">`).
    *   Use `<div class="container-standard">` to inherit global padding (24px desktop / 20px mobile) with zero vertical container padding.

---

## 3. Case Study Grid Spacing

*   **Desktop Grid Layout**:
    *   2-column configuration: `grid-template-columns: 1fr 1fr;`
    *   Gap size: `64px`
*   **Mobile Grid Layout (max-width: 960px)**:
    *   1-column configuration: `grid-template-columns: 1fr;`
    *   Gap size: `40px`

---

## 4. Mobile Action Buttons Stacking

Primary and secondary call-to-action buttons in documentation cards or footers must stack vertically on mobile.

*   **HTML Structure**:
    ```html
    <div class="pdf-action-buttons" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <button class="btn btn-primary">Action Primary</button>
        <a href="#" class="btn btn-secondary">Action Secondary</a>
    </div>
    ```
    *   *Do not* write inline styles like `flex-direction: row !important` or `width: auto !important` on the wrapper, as this breaks mobile responsiveness.
*   **CSS Stylesheet Override**:
    ```css
    @media (max-width: 767px) {
        .pdf-action-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 12px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 320px;
        }
        .pdf-action-buttons .btn {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
        }
    }
    ```

---

## 5. Project Metadata Specification Bar

Documentation vaults or technical briefs should feature a grid metadata bar at the top that scales properly on mobile.

*   **HTML Structure**:
    ```html
    <div class="doc-metadata-bar" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; max-width: 760px; margin: 40px auto 0 auto; padding: 24px 32px; background: rgba(255, 255, 255, 0.015); border: 1px solid rgba(255, 255, 255, 0.06); border-bottom: none; border-top-left-radius: 16px; border-top-right-radius: 16px; text-align: left; box-sizing: border-box;">
        <div>
            <span>Organization</span>
            <span>Example Inc</span>
        </div>
        <!-- 3 more columns -->
    </div>
    ```
    *   **Rule**: Always include the class `class="doc-metadata-bar"` so the media query wraps it to 2 columns on mobile.
*   **CSS Stylesheet Override**:
    ```css
    @media (max-width: 767px) {
        .doc-metadata-bar {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px 12px !important;
            border-radius: 12px 12px 0 0 !important;
            padding: 16px !important;
        }
    }
    ```
