# Responsive Design Rules

## 1. Breakpoints
- **Desktop (Large)**: `1200px+`
- **Desktop (Standard)**: `1024px`
- **Tablet**: `768px`
- **Mobile**: `480px`

---

## 2. Mobile Philosophy
- **Stacking**: All multi-column layouts stack vertically.
- **Typography**: Headline sizes scale down by `30-40%` for readability.
- **Spacing**: Section padding reduces from `160px` to `80px`.
- **Navigation**: Centered floating nav becomes a simplified mobile menu or persistent minimal bar.

---

## 3. Interaction Changes
- **FAQ**: Desktop hover becomes Mobile "Tap to Open."
- **Tools Stack**: Speed increases slightly on mobile to maintain visual movement.
- **Hero Animation**: Simplified or slowed down to preserve battery and performance.

---

## 4. Visual Scaling
- **Images**: Maintain aspect ratio. Never allow images to stretch.
- **Buttons**: Full-width on mobile for thumb-friendly interaction.
- **Borders**: Maintain thin consistency across all screen sizes.

---

## 5. Performance
- **Lazy Loading**: Enabled for all images below the fold.
- **Motion Reduction**: Respect `prefers-reduced-motion` media queries.
