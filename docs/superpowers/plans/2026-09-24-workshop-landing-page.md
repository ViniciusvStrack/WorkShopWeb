# Workshop Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive Portuguese landing page that presents the January 2027 workshop and converts visitors into WhatsApp conversations.

**Architecture:** A static React 19 application built by Vite and deployed from Netlify's CDN. All changing event data lives in one typed content module; focused presentational components consume that data, while CSS owns the editorial visual system and responsive behavior.

**Tech Stack:** React 19, TypeScript 5, Vite 7, Vitest, Testing Library, ESLint, CSS, Netlify static hosting

**Spec:** `docs/superpowers/specs/2026-09-24-workshop-landing-page-design.md`

## Global Constraints

- Confirmed date: 19–21 January 2027.
- Confirmed investment: R$ 1.800.
- Every registration CTA targets WhatsApp number `558191853191`.
- The initial release has no backend, payment flow, database, first-party form, analytics, advertising pixels, or cookies.
- Unknown name, host, theme, city, biography, detailed schedule, capacity, and final photography remain visibly provisional and centralized in `src/content/workshop.ts`.
- The reference page informs category and editorial rhythm only; do not reproduce its text, images, logo, or distinctive composition.
- The interface is Brazilian Portuguese, mobile-first, keyboard accessible, WCAG AA-aware, and respects `prefers-reduced-motion`.
- Netlify builds with `npm run build` and publishes `dist`.
- Production images, when supplied, must use explicit dimensions, responsive sources, WebP/AVIF formats, and lazy loading outside the hero.
- Target at least 90 in Lighthouse Performance, Accessibility, Best Practices, and SEO on a representative production build.

## Review Focus

- WhatsApp message characters such as accents, spaces, and punctuation must be URL-encoded without corrupting the phone number.
- Every visible registration CTA must resolve to the same canonical WhatsApp URL and open safely in a new tab.
- Unknown event facts must render as honest provisional copy, never as fabricated names, locations, capacity, or credentials.
- A visitor using keyboard-only navigation or reduced-motion preferences must retain visible focus, usable CTAs, and readable content.
- Missing final photographs must not produce broken images, layout shifts, empty links, or misleading alternative text.

---

## File Structure

- `package.json`: scripts and locked dependency declarations.
- `package-lock.json`: reproducible dependency graph.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: browser, test, and tooling type rules.
- `vite.config.ts`: React and Vitest configuration.
- `eslint.config.js`: TypeScript and React lint rules.
- `index.html`: document shell and baseline SEO metadata.
- `src/main.tsx`: application bootstrap.
- `src/App.tsx`: ordered page composition only.
- `src/content/workshop.ts`: the single source of truth for workshop facts and editable copy.
- `src/lib/whatsapp.ts`: canonical WhatsApp URL construction.
- `src/lib/whatsapp.test.ts`: URL encoding and normalization tests.
- `src/components/PageHeader.tsx`: navigation and desktop registration action.
- `src/components/Hero.tsx`: primary promise, dates, location state, and hero artwork.
- `src/components/EditorialSection.tsx`: manifesto and audience narrative.
- `src/components/Schedule.tsx`: typed three-day program.
- `src/components/Gallery.tsx`: decorative image-ready layout without broken assets.
- `src/components/EventDetails.tsx`: dates, location state, capacity state, and price.
- `src/components/Registration.tsx`: final conversion section and canonical CTA.
- `src/components/MobileCta.tsx`: compact mobile-only CTA.
- `src/components/PageFooter.tsx`: contact and copyright.
- `src/components/App.test.tsx`: content integrity, CTA, accessibility, and fallback behavior tests.
- `src/styles/global.css`: tokens, reset, typography, global layout, focus, and motion rules.
- `src/styles/page.css`: component composition and responsive styling.
- `public/favicon.svg`: original neutral monogram asset.
- `public/og-image.svg`: provisional share image with workshop date.
- `public/robots.txt`, `public/sitemap.xml`: crawler discovery.
- `netlify.toml`: build, SPA fallback, security, and cache headers.
- `README.md`: local editing, image replacement, testing, build, and deployment instructions.

### Task 1: Establish the Tested Static Application

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`
- Create: `src/components/App.test.tsx`

**Interfaces:**
- Consumes: no earlier application interfaces.
- Produces: default `App(): JSX.Element`, npm scripts `dev`, `build`, `lint`, `test`, and `test:run`.

- [ ] **Step 1: Add the package and tool configuration**

Create a private Vite package with exact scripts:

```json
{
  "name": "workshop-web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@eslint/js": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-plugin-react-hooks": "latest",
    "eslint-plugin-react-refresh": "latest",
    "globals": "latest",
    "jsdom": "latest",
    "typescript-eslint": "latest",
    "vitest": "latest"
  }
}
```

Configure Vite with the React plugin and Vitest using `jsdom`, globals, and `src/test/setup.ts`. Configure TypeScript strict mode and ESLint's recommended TypeScript, React Hooks, and React Refresh rules.

- [ ] **Step 2: Install dependencies and record the lockfile**

Run: `npm install`

Expected: `package-lock.json` is created and `npm audit` completes without blocking installation.

- [ ] **Step 3: Write the failing application smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

it('renders the workshop application landmark', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeInTheDocument()
})
```

- [ ] **Step 4: Run the test and verify the missing application fails**

Run: `npm run test:run -- src/components/App.test.tsx`

Expected: FAIL because `src/App.tsx` or its main landmark does not exist.

- [ ] **Step 5: Add the minimal application shell**

Implement `App` with a semantic `<main id="conteudo">Workshop de fotografia</main>`, bootstrap it from `src/main.tsx`, and add `@testing-library/jest-dom/vitest` to the test setup.

- [ ] **Step 6: Verify the toolchain**

Run: `npm run test:run && npm run lint && npm run build`

Expected: all commands exit 0 and `dist/index.html` exists.

- [ ] **Step 7: Commit the working foundation**

```bash
git add package.json package-lock.json tsconfig*.json vite.config.ts eslint.config.js index.html src
git commit -m "chore: scaffold tested workshop site"
```

### Task 2: Centralize Event Content and WhatsApp Conversion

**Files:**
- Create: `src/content/workshop.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: Vitest configuration from Task 1.
- Produces: `WorkshopContent`, `workshop`, and `buildWhatsAppUrl(phone: string, message: string): string`.

- [ ] **Step 1: Write failing URL and content-integrity tests**

```ts
import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp'
import { workshop } from '../content/workshop'

describe('buildWhatsAppUrl', () => {
  it('normalizes the phone and safely encodes Portuguese copy', () => {
    expect(buildWhatsAppUrl('+55 (81) 9185-3191', 'Olá! Quero uma vaga.')).toBe(
      'https://wa.me/558191853191?text=Ol%C3%A1!%20Quero%20uma%20vaga.',
    )
  })

  it('rejects an empty normalized phone', () => {
    expect(() => buildWhatsAppUrl('---', 'Olá')).toThrow('WhatsApp phone is required')
  })
})

it('keeps confirmed facts and provisional facts explicit', () => {
  expect(workshop.dates.display).toBe('19—21 JAN 2027')
  expect(workshop.price).toBe(1800)
  expect(workshop.whatsapp.phone).toBe('558191853191')
  expect(workshop.location.isConfirmed).toBe(false)
  expect(workshop.capacity.isConfirmed).toBe(false)
  expect(workshop.schedule).toHaveLength(3)
})
```

- [ ] **Step 2: Run tests and verify both modules are missing**

Run: `npm run test:run -- src/lib/whatsapp.test.ts`

Expected: FAIL with unresolved imports for `whatsapp` and `workshop`.

- [ ] **Step 3: Implement the canonical URL helper**

```ts
export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, '')
  if (!normalizedPhone) throw new Error('WhatsApp phone is required')
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}
```

- [ ] **Step 4: Add typed event content**

Define exact types for `Fact`, `WorkshopDay`, and `WorkshopContent`. Export `workshop` with a neutral working title “Imersão Presencial”, the confirmed date, `price: 1800`, phone `558191853191`, the approved message, three provisional day descriptions, honest “Local a confirmar” and “Turma limitada — quantidade a confirmar” facts, audience copy, manifesto copy, and six decorative gallery slots identified by stable IDs.

- [ ] **Step 5: Verify URL encoding and unknown-fact behavior**

Run: `npm run test:run -- src/lib/whatsapp.test.ts`

Expected: PASS for all four assertions, including accents and empty-phone rejection.

- [ ] **Step 6: Commit the content boundary**

```bash
git add src/content/workshop.ts src/lib/whatsapp.ts src/lib/whatsapp.test.ts
git commit -m "feat: centralize workshop content and registration link"
```

### Task 3: Build the Semantic Conversion Page

**Files:**
- Create: `src/components/PageHeader.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/EditorialSection.tsx`
- Create: `src/components/Schedule.tsx`
- Create: `src/components/Gallery.tsx`
- Create: `src/components/EventDetails.tsx`
- Create: `src/components/Registration.tsx`
- Create: `src/components/MobileCta.tsx`
- Create: `src/components/PageFooter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/App.test.tsx`

**Interfaces:**
- Consumes: `workshop: WorkshopContent` and `buildWhatsAppUrl(phone, message)` from Task 2.
- Produces: a single semantic page with link label “Quero me inscrever”, section IDs `sobre`, `experiencia`, `informacoes`, and canonical WhatsApp actions.

- [ ] **Step 1: Replace the smoke test with failing user-flow tests**

Test that the page renders one level-one heading, confirmed date text, formatted `R$ 1.800`, exactly three schedule articles, “Local a confirmar”, no `<img>` with an empty `src`, and at least three registration links. For every registration link, assert the same canonical `href`, `target="_blank"`, and `rel="noreferrer"`. Use `userEvent.tab()` to assert the first CTA receives focus and has an accessible name.

- [ ] **Step 2: Run the page tests and verify missing sections fail**

Run: `npm run test:run -- src/components/App.test.tsx`

Expected: FAIL because the complete heading, schedule, details, and CTA set are absent.

- [ ] **Step 3: Implement the header, hero, and skip link**

Build a header with a text mark, in-page navigation, and registration link. In `App`, place a “Pular para o conteúdo” link before the header. Build the hero from `workshop` data with one `<h1>`, visible dates, honest location state, CTA, and a decorative `<div aria-hidden="true">` artwork instead of a missing image.

- [ ] **Step 4: Implement editorial, schedule, and gallery sections**

Render manifesto and audience content as semantic sections. Map the three typed schedule entries to `<article>` elements with day/date headings. Map gallery slots to decorative figure blocks with `aria-hidden="true"`; do not render fake filenames or empty image elements.

- [ ] **Step 5: Implement details, registration, mobile CTA, and footer**

Format the price with `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })`. Render confirmed dates, explicit unconfirmed location/capacity, and a final CTA. Reuse the exact URL helper for header, hero, final, and mobile CTAs. Add the phone in readable form to the footer.

- [ ] **Step 6: Verify semantic and conversion behavior**

Run: `npm run test:run -- src/components/App.test.tsx`

Expected: PASS; every CTA shares the canonical URL and provisional facts remain explicit.

- [ ] **Step 7: Commit the functional page**

```bash
git add src/App.tsx src/components
git commit -m "feat: build semantic workshop landing page"
```

### Task 4: Apply the Editorial Visual System

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/page.css`
- Modify: `src/main.tsx`
- Modify: `src/components/App.test.tsx`

**Interfaces:**
- Consumes: semantic class names and section structure from Task 3.
- Produces: responsive layouts at 360px, 768px, and 1280px; visible `:focus-visible`; reduced-motion overrides; mobile CTA visibility rules.

- [ ] **Step 1: Add failing style-contract tests**

Read both CSS files as text through Vite's `?raw` import and assert they contain `:focus-visible`, `@media (prefers-reduced-motion: reduce)`, `.mobile-cta`, a mobile-first base, and a desktop `@media (min-width: 64rem)` query. Add a DOM assertion that decorative gallery items have `aria-hidden="true"`.

- [ ] **Step 2: Run tests and verify the absent styles fail**

Run: `npm run test:run -- src/components/App.test.tsx`

Expected: FAIL because style modules and required accessibility rules do not exist.

- [ ] **Step 3: Implement global tokens and accessibility rules**

Define custom properties for ivory, charcoal, muted olive, terracotta, border, fluid spacing, maximum content width, serif display stack, and sans-serif body stack. Add a reset, readable line lengths, skip-link behavior, visible focus ring, and reduced-motion rule that removes transitions, animations, and smooth scrolling.

- [ ] **Step 4: Implement component and responsive composition**

Style the hero with an original typographic composition and abstract gradient/photo-ready frame. Use CSS Grid for schedule, gallery, and details; vary gallery aspect ratios without copying the reference layout. Keep touch targets at least 44px high. Show `.mobile-cta` only below 48rem and reserve bottom space so it never covers footer content.

- [ ] **Step 5: Import styles and verify contracts**

Import both stylesheets once from `src/main.tsx`.

Run: `npm run test:run && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 6: Inspect responsive output**

Run: `npm run dev -- --host 127.0.0.1`

Inspect at 360×800 and 1440×1000. Confirm no horizontal overflow, readable headings, non-overlapping mobile CTA, visible keyboard focus, working anchor navigation, and stable decorative media blocks. Enable reduced motion in browser emulation and confirm reveal effects disappear.

- [ ] **Step 7: Commit the visual system**

```bash
git add src/main.tsx src/styles src/components/App.test.tsx
git commit -m "feat: add responsive editorial visual system"
```

### Task 5: Add Discoverability and Netlify Production Configuration

**Files:**
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `public/og-image.svg`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `netlify.toml`
- Create: `src/configuration.test.ts`

**Interfaces:**
- Consumes: Vite `dist` output and workshop public metadata.
- Produces: crawlable metadata, share artwork, and Netlify build/cache/security configuration.

- [ ] **Step 1: Write failing production-configuration tests**

Use Node file reads to assert `index.html` contains `lang="pt-BR"`, a non-empty description, canonical link, Open Graph title/description/image, theme color, and favicon. Assert `netlify.toml` publishes `dist`, runs `npm run build`, adds immutable cache for `/assets/*`, short revalidation for `/index.html`, and security headers `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.

- [ ] **Step 2: Run tests and verify missing files and metadata fail**

Run: `npm run test:run -- src/configuration.test.ts`

Expected: FAIL because the production metadata and Netlify configuration are incomplete.

- [ ] **Step 3: Add original metadata and static discovery files**

Use neutral provisional title “Imersão Presencial | 19–21 Jan 2027”, a description that mentions a three-day in-person creative workshop without inventing its host or city, and a replaceable canonical URL `https://workshop-imersao.netlify.app/`. Create original SVG assets with date typography and abstract shapes only. Point `robots.txt` to `/sitemap.xml` and include the same canonical URL in the sitemap.

- [ ] **Step 4: Configure Netlify**

Set `[build] command = "npm run build"` and `publish = "dist"`. Add `/assets/*` cache control `public, max-age=31536000, immutable`; add `/index.html` cache control `public, max-age=0, must-revalidate`; add the three security headers globally. Do not add functions, forms, redirects to external sites, or runtime secrets.

- [ ] **Step 5: Verify configuration and production output**

Run: `npm run test:run -- src/configuration.test.ts && npm run build`

Expected: PASS and generated `dist` contains `index.html`, `favicon.svg`, `og-image.svg`, `robots.txt`, and `sitemap.xml`.

- [ ] **Step 6: Commit deployment readiness**

```bash
git add index.html public netlify.toml src/configuration.test.ts
git commit -m "feat: prepare workshop site for Netlify"
```

### Task 6: Document Editing and Complete Release Verification

**Files:**
- Create: `README.md`
- Modify: `src/content/workshop.ts` only if verification exposes inaccurate provisional wording.

**Interfaces:**
- Consumes: all scripts, content schema, asset paths, and Netlify configuration from Tasks 1–5.
- Produces: maintainer instructions and a verified release candidate.

- [ ] **Step 1: Document local development and content replacement**

Write exact commands for Node installation expectations, `npm install`, `npm run dev`, `npm run test:run`, `npm run lint`, and `npm run build`. Explain that all event facts live in `src/content/workshop.ts`, list the unconfirmed fields, show how to replace gallery slots with real responsive images, require meaningful Portuguese alt text, and explain how to update the canonical Netlify/domain URL in `index.html`, `robots.txt`, and `sitemap.xml`.

- [ ] **Step 2: Document Netlify connection**

Describe importing the GitHub repository in Netlify, relying on `netlify.toml`, reviewing the production preview, and adding a custom domain. State that no function, database, payment provider, form submission, or environment variable is required.

- [ ] **Step 3: Run the complete automated verification**

Run: `npm run test:run && npm run lint && npm run build`

Expected: all tests pass, lint reports no errors, TypeScript compiles, Vite completes, and `dist` is generated.

- [ ] **Step 4: Run content and artifact checks**

Run: `rg -n "FIXME|undefined|aproximarfotografia|images-pw" src public index.html README.md netlify.toml`

Expected: no matches. Then run `rg -n "558191853191|19—21 JAN 2027|1800" src` and confirm all three canonical facts are present in the content/tests rather than duplicated inconsistently across components.

- [ ] **Step 5: Perform final visual and interaction verification**

Serve `dist` locally and inspect mobile and desktop. Activate every CTA, stopping before sending a WhatsApp message; confirm the URL contains `558191853191` and encoded approved copy. Tab through the page, confirm focus visibility, verify anchors, disable JavaScript and confirm the prerendered document shell limitation is understood: because this is a Vite client-rendered app, the canonical WhatsApp fallback remains in `index.html` inside `<noscript>`.

- [ ] **Step 6: Add the no-JavaScript registration fallback if absent**

Ensure `index.html` contains a `<noscript>` notice with a direct `https://wa.me/558191853191` anchor and the confirmed date/price. Re-run `npm run build` and inspect `dist/index.html` for the link.

- [ ] **Step 7: Commit documentation and release verification fixes**

```bash
git add README.md index.html src
git commit -m "docs: add workshop maintenance and deployment guide"
```

- [ ] **Step 8: Review the final commit range**

Run: `git status --short && git log --oneline --decorate -8`

Expected: clean working tree and a readable series of focused commits after the design and plan commits.
