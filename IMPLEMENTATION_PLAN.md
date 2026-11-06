# RTJ Website: Comprehensive 5-Page Implementation & Engineering Plan

## 1. Executive Summary & Architecture Overview

This document defines the complete architectural blueprint and page-by-page specification for building the **RTJ** agency digital platform. The project is engineered to achieve a **100% pixel-perfect reproduction** of the Figma design SVGs located in `./designs/`:
1. `landing page.svg` (1440 × 3155)
2. `work page.svg` (1440 × 2253)
3. `service page.svg` (1440 × 3182)
4. `about page.svg` (1440 × 1963)
5. `contact page.svg` (1440 × 1136)

### Technology Stack
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Vanilla CSS + CSS Modules (Zero Tailwind, custom design tokens, maximum control)
- **Typography**: Editorial Display Serif (`Playfair Display` / `Fraunces`) + Modern Geometric Sans (`Plus Jakarta Sans` / `Inter`)
- **Backend API**: Next.js App Router API Route (`/api/contact`)
- **Validation**: Zod schema validation
- **Data Persistence**: Local structured JSON store (`/data/inquiries.json`) with atomic file locking and error handling
- **Email Service**: Simulated transactional mailer with console dispatch logging and webhook hook points

---

## 2. Design System & Token Specifications

### 2.1 Color Palette
Extracted directly from the design vector fills and color stops:
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `--color-bg-primary` | `#F4F2EB` | Primary page canvas (warm linen / stone) |
| `--color-bg-secondary` | `#EDE9DE` | Subtle card background & hover states |
| `--color-bg-dark` | `#121212` | Dark CTA banners, header button, footer |
| `--color-card-dark` | `#222325` | Dark case study cards |
| `--color-card-neutral` | `#DCD6C9` | Muted neutral case study cards |
| `--color-accent` | `#E3542B` | Brand signature terracotta/orange accent |
| `--color-accent-hover` | `#C8431C` | Interactive terracotta hover |
| `--color-text-primary` | `#121212` | Main headlines, body copy, strong labels |
| `--color-text-secondary`| `#6E6D68` | Eyebrows, captions, subtitles, placeholders |
| `--color-text-light` | `#F4F2EB` | High-contrast text on dark backgrounds |
| `--color-border-subtle` | `#DDD8CB` | Dividers, card borders, horizontal rules |
| `--color-border-dark` | `#2D2F32` | Dividers on dark panels |

### 2.2 Typography Hierarchy
- **Brand Serif**: High-contrast, elegant editorial serif
  - `font-display-serif`: `'Playfair Display', serif`
  - Weights: `400` (Regular), `400i` (Italic for emphasis words), `600` (Bold)
- **Interface Sans**: Clean, high-legibility grotesque
  - `font-sans`: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
  - Weights: `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold)
- **Eyebrow / Category Badges**:
  - `font-size`: `11px` - `12px`
  - `font-weight`: `600`
  - `text-transform`: `uppercase`
  - `letter-spacing`: `0.12em`
- **Headlines**:
  - Hero H1: `clamp(48px, 6vw, 76px)`, line-height `1.05`, letter-spacing `-0.02em`
  - Section H2: `clamp(32px, 4vw, 48px)`, line-height `1.15`
  - Card H3: `24px` - `28px`, line-height `1.2`

### 2.3 Spacing & Layout Tokens
- **Maximum Width**: `1440px` centered canvas
- **Container Padding**: `clamp(24px, 5vw, 80px)` horizontal padding
- **Section Spacing**: `96px` to `140px` vertical rhythm between content blocks
- **Grid System**: 12-column responsive grid with `24px` - `32px` gutters

---

## 3. Shared Global Components

### 3.1 Universal Header (`<Navbar />`)
- **Brand Logo**: "RTJ" in bold editorial serif + signature square terracotta dot (`#E3542B`).
- **Navigation Links**:
  - `Work` (`/work`)
  - `Services` (`/services`)
  - `About` (`/about`)
  - `Contact` (`/contact`)
  - Active indicator: subtle underline and active weight matching design.
- **Header Action Button**:
  - Text: "Start a project"
  - Style: Sharp rectangle, `#121212` background, white text, subtle hover lift.
- **Mobile Menu**: Responsive full-screen slide-down overlay for viewport widths `< 768px`.

### 3.2 Universal Dark CTA Banner (`<CTABanner />`)
- **Appearance**: Full-width deep charcoal canvas (`#121212`).
- **Heading**: "Tell us what you're building." (editorial serif display, crisp white).
- **Subtext**: Contextual copy welcoming collaboration.
- **CTA Button**: Terracotta filled rectangle (`#E3542B`) with text "Start a project" linking directly to `/contact`.
- Present on: Landing Page, Services Page, and About Page.

### 3.3 Universal Footer (`<Footer />`)
- **Top Row**: Brand logo "RTJ." + primary navigation links.
- **Divider**: Hairline border (`#2D2F32` on dark mode, `#DDD8CB` on light).
- **Bottom Row**: Copyright notice `© 2026 RTJ. All rights reserved.`, location note, and social links (`Instagram`, `LinkedIn`, `X / Twitter`).

---

## 4. Page-by-Page Specifications (100% Fidelity)

### 4.1 Page 1: Landing Page (`/`)
- **Hero Section**:
  - Eyebrow: `MARKETING / DESIGN / DEVELOPMENT`
  - Headline: "Three skills. One team. Work you can't ignore." (with terracotta period).
  - Body: "We plan the campaign, design the brand and build the website, so nothing gets lost between agencies."
  - Action: "See our work →" with arrow micro-interaction.
- **Featured Work Section**:
  - Section Header: `SELECTED WORK`
  - 2×2 Grid of large case study cards with colored canvases:
    - Card 1: `BRAND + WEB` - Dark canvas (`#121212`)
    - Card 2: `CAMPAIGN` - Terracotta canvas (`#E3542B`)
    - Card 3: `PRODUCT DESIGN` - Warm linen canvas (`#DCD6C9`)
    - Card 4: `DEVELOPMENT` - Deep charcoal canvas (`#222325`)
  - Hover states: Subtle image zoom, elevation, and direct link to case studies.
- **What We Do (Disciplines)**:
  - Eyebrow: `WHAT WE DO`
  - 3 large numbered horizontal rows with clean dividers:
    - `01 Marketing`: Strategy, Paid Media, Content, Campaigns
    - `02 Design`: Brand Identity, UI/UX, Design Systems, Art Direction
    - `03 Development`: Web Applications, E-Commerce, Headless CMS, Performance
- **CTA Section & Footer**: Universal `<CTABanner />` + `<Footer />`.

### 4.2 Page 2: Work Page (`/work`)
- **Hero**:
  - Eyebrow: `WORK`
  - Headline: "Work." in monumental display serif.
  - Subtitle: Selected client projects across branding, digital products, and web engineering.
- **Interactive Category Filter Bar**:
  - Options: `All`, `Marketing`, `Design`, `Development`
  - Active button: Solid charcoal pill (`#121212`) with white text.
  - Inactive buttons: Transparent pill with hairline border (`#DDD8CB`).
  - Client-side smooth transition filtering cards with zero layout shift.
- **Project Grid (6 Case Studies)**:
  - 2-column or 3-column asymmetric layout with rich visual cards.
  - Deliverable pills, client name, scope year, and project summary.
  - Case studies:
    1. *Aura Financial* (Brand & Platform)
    2. *Verve Studio* (Full Rebrand & Digital Experience)
    3. *Kroma Sound* (E-Commerce & Campaign)
    4. *Northwind Labs* (SaaS Web Application)
    5. *Solace Goods* (Identity & Packaging)
    6. *Echo Capital* (Institutional Web Platform)
- **Bottom CTA & Footer**.

### 4.3 Page 3: Services Page (`/services`)
- **Hero**:
  - Eyebrow: `SERVICES`
  - Headline: "What we do."
  - Subtitle: Comprehensive digital solutions delivered under one roof.
- **Core Pillars (Detailed Capability Matrix)**:
  - **Marketing**:
    - Deliverables: Brand Strategy, Go-to-Market, Performance Ads, Content Production.
    - Narrative explanation of methodology.
  - **Design**:
    - Deliverables: Visual Identity, UI/UX Systems, Prototyping, Packaging & Print.
    - Narrative explanation of craftsmanship.
  - **Development**:
    - Deliverables: Next.js/React Engineering, API Integrations, Headless CMS, Core Web Vitals Optimization.
    - Narrative explanation of technical excellence.
- **How We Work (3-Step Process)**:
  - Eyebrow: `HOW WE WORK`
  - 3 process cards:
    - `01 Listen`: Deep-dive research, discovery workshops, and requirements mapping.
    - `02 Plan`: Strategic roadmap, wireframing, architecture, and design sprints.
    - `03 Build`: Rapid iteration, production-ready code, testing, and launch execution.
- **CTA Banner & Footer**.

### 4.4 Page 4: About Page (`/about`)
- **Hero**:
  - Eyebrow: `ABOUT`
  - Headline: "Small team. Big standards."
  - Story paragraph: Why RTJ was founded to eliminate agency silos and deliver unified work.
- **Team Roster Section**:
  - Eyebrow: `THE TEAM`
  - 3 Team Member Cards:
    - Member 1: Founder & Brand Director (portrait block, bio, background)
    - Member 2: Head of Design (portrait block, bio, background)
    - Member 3: Head of Technology (portrait block, bio, background)
- **Values / Core Beliefs**:
  - Eyebrow: `WHAT WE BELIEVE`
  - 3 core tenets:
    - `One team`: No handoffs to junior contractors; direct senior partner involvement.
    - `Straight talk`: Radical transparency on scope, timelines, and budgets.
    - `Built to last`: Clean design and robust code made to scale.
- **CTA Banner & Footer**.

### 4.5 Page 5: Contact Page (`/contact`)
- **Hero**:
  - Eyebrow: `CONTACT`
  - Headline: "Say hello" (with signature terracotta highlight accent).
- **Two-Column Split Layout**:
  - **Left Column: Direct Contacts & Office Details**:
    - Email: `hello@rtj-agency.com` (clickable `mailto:`)
    - Phone: `+1 (555) 234-5678` (clickable `tel:`)
    - Address: London & New York studio details.
    - Social Links: Instagram, LinkedIn, X / Twitter.
  - **Right Column: Interactive Project Inquiry Form**:
    - Field 1: `Name` (Text input, clean underline border)
    - Field 2: `Email Address` (Email input, validation)
    - Field 3: `Company / Organization` (Text input)
    - Field 4: `Services Needed` (Multi-select pill toggles: `Marketing`, `Design`, `Development`)
    - Field 5: `Budget Range` (Select dropdown or pills)
    - Field 6: `Project Details` (Textarea, clean underline border)
    - Submit Button: Full-width or right-aligned solid dark button "Send message →"
    - Form States: Idle, Submitting (animated spinner), Success message, Error alerts.

---

## 5. Backend Architecture & Contact Form System

### 5.1 Endpoint Specification: `POST /api/contact`
- **Request Headers**: `Content-Type: application/json`
- **Request Payload**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "company": "Acme Studios",
  "services": ["Design", "Development"],
  "budget": "$25k - $50k",
  "message": "We need a complete rebrand and new web platform.",
  "honeypot": ""
}
```
- **Zod Validation Schema**:
  - `name`: String, min 2 chars, max 100 chars, trimmed.
  - `email`: String, valid email format, normalized to lowercase.
  - `company`: Optional string, max 100 chars.
  - `services`: Array of strings (`Marketing`, `Design`, `Development`), at least 1 required.
  - `budget`: Optional string.
  - `message`: String, min 10 chars, max 3000 chars.
  - `honeypot`: String must be empty (anti-bot protection).

### 5.2 Persistence & Storage Layer
- Directory: `/data/inquiries.json`
- Inquiries are appended with:
  - `id`: Unique UUIDv4
  - `createdAt`: ISO 8601 timestamp
  - `status`: `"new"` | `"reviewed"`
  - `ip`: Client IP (masked for privacy)
  - `userAgent`: Client user-agent string
- Safe atomic file-write with retry logic to ensure zero data corruption during concurrent submissions.

### 5.3 Notification & Email Dispatching
- Simulated Mailer module (`src/lib/mailer.ts`):
  - Emits formatted JSON log to server console.
  - Pre-configured webhook hook to easily forward to Slack / Discord / Resend / SendGrid without code refactoring.

### 5.4 Admin Status Endpoint: `GET /api/contact`
- Query parameter authentication `?secret=...` to inspect stored inquiries for verification and testing.

---

## 6. Implementation Phasing & Milestones

1. **Phase 1: Foundation & Design System**:
   - Establish CSS variables, global styles, reset, and container layout in `src/app/globals.css`.
   - Configure typography with `next/font/google` (`Playfair Display` and `Plus Jakarta Sans`).
   - Create shared UI components: `<Navbar />`, `<Footer />`, `<CTABanner />`, `<Button />`.
2. **Phase 2: Page 1 (Landing) & Page 2 (Work)**:
   - Assemble Landing Page with Hero, Selected Work grid, What We Do rows, and CTA.
   - Assemble Work Page with Hero, dynamic category filter, and 6 case study cards.
3. **Phase 3: Page 3 (Services) & Page 4 (About)**:
   - Assemble Services Page with service breakdowns, deliverable lists, and 3-step process.
   - Assemble About Page with narrative, team roster cards, and belief pillars.
4. **Phase 4: Page 5 (Contact) & Full Backend Integration**:
   - Create `/api/contact` route handler with Zod validation and atomic JSON persistence.
   - Implement Contact Page form with interactive pills, live validation, and state handling.
5. **Phase 5: Visual Verification, Testing & Polish**:
   - Verify layout, typography, colors, and responsive behavior against SVG design slices.
   - End-to-end browser testing of navigation, form submission, and filter states.
