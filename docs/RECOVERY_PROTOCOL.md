# Recovery Protocol & Maintenance

## 1. Emergency Rollback
In the event of a deployment failure or visual breakdown:
1.  **Identify Failure Point**: Check browser console for CSS/JS load errors.
2.  **Revert to Documentation**: Compare current code against the `DESIGN_SYSTEM.md` and `MOTION_SYSTEM.md` principles.
3.  **Restoration**: Use GitHub Desktop to discard changes, or navigate to your official local backup at `/rollback-backups/main-rollback/` to retrieve the last stable snapshot.

---

## 2. Sandbox to Production Deployment
- **Prototyping**: Build new sections exclusively in isolated files (e.g., `ops-gap-preview.html` and `.css`).
- **Working Migration**: Move approved layouts into `*-working.html` and `*-working.css` files first to test for CSS collisions and layout shifts.
- **Main Merge**: Only merge into `index.html` and `style.css` once the working files are fully stable.
- **Pushing via GitHub Desktop**: 
    1. Verify changes only exist in intended files.
    2. Commit with a clear summary.
    3. Push to `main`.
    4. Verify live deployment immediately on mobile and desktop.

---

## 2. Maintenance Checklist
Before making changes:
- [ ] Verify that new sections follow the `Editorial Spacing` rules.
- [ ] Ensure any new colors align with the `Deep Graphite / Electric Blue` palette.
- [ ] Test all animations on mobile devices.
- [ ] Check that `about.html` still functions as a separate entity.

---

## 3. Protected Systems
The following modules should not be modified without architectural review:
- **Navigation Shell**: Any change to positioning or blur intensity.
- **Hero Routing Animation**: The SVG logic and CSS pulse timing.
- **Motion Orchestration**: The global reveal timing and easing curves.

---

## 4. Production Hardening
- **Asset Integrity**: Ensure all image paths are relative.
- **Form Validation**: Test the "Review Your Workflow" submission logic.
- **SEO**: Verify meta tags and heading hierarchy.
