# MASTER B2B CASE STUDY ARCHITECTURE SPECIFICATION
> **Version**: 1.0  
> **Scope**: Standardized Case Study Architecture for all Portfolio Systems  
> **Applies to**: `lead-capture-to-booking-systems.html`, `ai-customer-journey-operations-and-recovery-system.html`, `lead-intake-duplicate-verification.html`, and all future case study pages.

---

## 1. Executive Summary & Purpose

This specification defines the **World-Class B2B Case Study Narrative Order & Grid Component Architecture**. 

Every case study page in the **Nitin Mishra Portfolio** MUST follow this exact 6-step narrative flow to ensure 100% structural consistency, executive B2B credibility, and high-conversion clarity (**Friction ➔ Solution ➔ Logic ➔ Outcomes ➔ Proof ➔ CTA**).

---

## 2. Mandatory 6-Step Case Study Narrative Framework

```text
[ 1. Hero Summary Lockup ]
  ├── Left Column: Category Badge, Title, Executive Summary, Meta Badges (Stack, Timeline)
  └── Right Column: Hero Macro System Node Diagram (3-Second Visual Understanding)

[ 2. Executive Context & Operational Problem ]
  ├── Business Context & Broken Manual Process (Where leads/revenue were leaking)
  └── The Cost of Doing Nothing (Why disconnected tools failed)

[ 3. System Architecture & Solution Strategy ]
  ├── Operational Strategy (How the system connects tools & structures data)
  └── System Architecture Blueprint Card (Data Schemas & Scenario Maps)

[ 4. Deep-Dive Scenario Breakdowns & Operational Logic ]
  ├── Step-by-Step Scenario Tab/Grid Explanations
  └── Technical Screenshots, Webhook Data Flows & Fail-Open Safeguards

[ 5. Verified Business Impact & Outcomes ]
  ├── Quantifiable Results Grid (Velocity metrics, 0 lost leads, recovery speed)
  └── Key Operational Takeaways for Operations Leaders

[ 6. Technical Proof & Conversion CTA ]
  ├── Interactive Executive Case Study / Embed Card
  └── Conversion CTA Card: "Discuss a Similar System for Your Business"
```

---

## 3. Section-by-Section Component Standards

### Step 1: Hero Section (`section.systems-hero`)
- **Grid Layout**: `display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;` (`.case-study-grid`).
- **Left Column**:
  - Category Badge: `<span class="category-heading">// FLAGSHIP SYSTEM 0X</span>`
  - Main Title: `<h1 class="hero-title">...</h1>`
  - Executive Summary Text: `<p class="hero-sub">...</p>`
  - Meta Badges Grid: Software stack badges (e.g. `Make.com`, `HubSpot`, `GoHighLevel`, `Airtable`).
- **Right Column**:
  - Hero Macro System Node Diagram (`.hero-diagram-card`): An interactive or SVG node visual displaying the high-level input ➔ processing ➔ outcome loop.

### Step 2: Executive Context & Operational Problem (`#problem`)
- **Heading**: `## Executive Context & Operational Friction`
- **Left Column**: Business problem narrative detailing where operational drag and revenue leaks occurred.
- **Right Column**: `.why-matters-box` (Highlighted callout detailing *Why This System Matters*).

### Step 3: System Architecture & Strategy (`#architecture`)
- **Heading**: `## System Architecture & Solution Strategy`
- **Card Component**: `.architecture-card` with linear gradient background, glowing system-blue border (`border: 1px solid rgba(28, 78, 216, 0.38)`), and deep obsidian box shadow.

### Step 4: Operational Scenarios & Logic (`#logic`)
- **Heading**: `## Operational Scenarios & Data Flow Logic`
- **Component**: Tabbed scenario container or modular 2-column grid (`.tab-bullets`, `.tab-screenshot-wrapper`).
- **Includes**: Technical screenshots, payload schemas, and fail-open safeguard explanations.

### Step 5: Verified Business Outcomes (`#outcomes`)
- **Heading**: `## Verified Business Outcomes & Impact`
- **Component**: 3-column metric grid (`.outcomes-grid`) displaying quantifiable velocity, error reduction, and recovery performance metrics.

### Step 6: Technical Proof & Conversion CTA (`#proof`)
- **Heading**: `## Technical Documentation & Inspection`
- **Component 1**: `.documentation-card` containing the embedded PDF System Architecture Blueprint.
- **Component 2**: Bottom CTA Card with `[ Request a System Audit ]` button pointing to `index.html#contact`.

---

## 4. CSS Class Standards & Tokens

All case study pages MUST consume the master design tokens in `style.css`:
- **Desktop Hero Padding**: `padding-top: 170px !important; padding-bottom: 96px;` (Per `.agents/AGENTS.md` Rule).
- **Mobile Hero Padding (<= 960px)**: `padding-top: 112px !important; padding-bottom: 64px;`
- **Primary Blue Accent**: `var(--system-blue)` (`#1C4ED8`)
- **Card Background**: `rgba(6, 9, 24, 0.7)`
- **Border Scale**: `1px solid rgba(28, 78, 216, 0.25)`

---

## 5. Mandatory Agent Execution Checklist

Whenever updating an existing case study or creating a new case study page:
1. Verify the HTML file follows Steps 1 through 6 in exact sequential order.
2. Ensure the Hero section uses the 2-column grid (`Title Left` + `Macro Diagram Right`).
3. Maintain zero broken links, working PDF embeds, and responsive mobile stacking (`@media (max-width: 960px)`).
4. Perform consultative review & receive explicit user approval before touching code.
