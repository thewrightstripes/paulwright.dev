# paulwright.dev — Portfolio Site Design

**Date:** 2026-04-01
**Status:** Approved

## Overview

A personal portfolio site at `paulwright.dev` showcasing Paul Wright's profile and projects. Single-page static site with a brutalist aesthetic. No blog at launch — can be added later.

## Goals

- Present a personal bio and professional identity
- Showcase personal projects with name, description, and link
- Provide a simple contact mechanism (mailto)
- Be fast, maintainable, and easy to publish to

## Non-Goals (out of scope for v1)

- Blog / writing section (deferred — add when there's content to publish)
- Resume / downloadable CV
- Comments, search, or any dynamic features
- CMS or admin interface

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 (static output) |
| Styling | Plain CSS — no utility framework |
| Heading font | Black Han Sans (Google Fonts) |
| Body/mono font | IBM Plex Mono (Google Fonts) |
| Content | `src/data/projects.ts` — typed array |
| Output | Static HTML/CSS, zero client JS |

## Site Structure

Single HTML page (`/`). All sections are anchored within the page — no separate routes.

### Sections (top to bottom)

1. **Nav** — sticky top bar: `PW` monogram left, anchor links right (About, Projects, Contact)
2. **Hero** — name in large Impact-style type, tagline/role badge in yellow, one-line bio
3. **About** — 2–4 sentence bio, mailto contact button
4. **Projects** — list of projects, each as a bordered row: yellow accent bar + name + description + external link arrow
5. **Footer** — copyright, GitHub and LinkedIn links

### Anchor links

| Label | Target |
|---|---|
| About | `#about` |
| Projects | `#projects` |
| Contact | `mailto:me@paulwright.dev` |

## Design System

### Palette

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Foreground | `#000000` |
| Accent | `#ffff00` |
| Muted text | `#555555` |
| Section bg (alternating) | `#f5f5f5` |

### Typography

| Use | Font | Style |
|---|---|---|
| Hero name | Black Han Sans | 72px+, uppercase |
| Section labels | IBM Plex Mono | 9px, uppercase, 3px letter-spacing, `#999` |
| Body text | IBM Plex Mono | 11–13px, 1.7 line-height |
| Nav links | IBM Plex Mono | 9px, uppercase, bold |

### Rules

- **No border-radius** anywhere
- **No shadows**
- **No gradients**
- **No CSS transitions or animations**
- All borders: `3px solid #000` (structural) or `2px solid #000` (components)
- Hover states: immediate yellow background swap, no easing
- Section dividers: `3px solid #000` horizontal rules

### Components

**Nav bar**
- Black background, white text
- `PW` monogram in monospace left
- Anchor links right in white; Contact link is always yellow (static, no JS scroll detection)

**Hero**
- Yellow badge chip above the name (`Software Engineer`)
- Name: massive, black, uppercase, Impact weight
- Bio: monospace, small, left-bordered with 3px black rule

**Project row**
```
┌─────────────────────────────────────────┐
│ ▐ PROJECT NAME          description...↗ │
└─────────────────────────────────────────┘
```
- Yellow or black left accent bar (alternating)
- Name in Black Han Sans uppercase
- Description in IBM Plex Mono
- Black right cell with white `↗` arrow, links to project URL

**Contact button**
- Black background, white text, no border-radius
- Label: `→ Get in touch`
- `href="mailto:me@paulwright.dev"`

**Footer**
- Black background
- Copyright left, social links right (GitHub in yellow, LinkedIn in muted)

## Content

### Projects data shape

```typescript
// src/data/projects.ts
export const projects = [
  {
    name: string,       // e.g. "PenteXR"
    description: string, // one sentence
    url: string,        // external link
  }
]
```

### About text

Placeholder — Paul to supply 2–4 sentence bio.

## Deployment

### Build

```bash
npm run build   # outputs to dist/
```

### Hosting

Namecheap shared hosting. Files served from `public_html/`.

### Automated deploy pipeline

1. Push to `main` on GitHub
2. GitHub Actions runs `npm run build`
3. FTP deploy action uploads `dist/` to Namecheap `public_html/`
4. Namecheap FTP credentials stored as GitHub secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`

### DNS

- `paulwright.dev` A record → Namecheap hosting IP (set in Namecheap DNS panel)
- MX records for PrivateEmail remain unchanged

## Repository

New standalone repo: `paulwright/paulwright.dev` (separate from PenteXR).

## Future Additions

- `/blog` — when there's content to publish. Astro content collections + markdown files.
- Resume/CV page
