# paulwright.dev Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a brutalist single-page portfolio site at paulwright.dev showcasing profile and projects.

**Architecture:** New standalone Astro 4 static site repo. Single `index.astro` page assembles five focused `.astro` components (Nav, Hero, About, Projects, Footer). All content lives in `src/data/projects.ts`. GitHub Actions deploys `dist/` to Namecheap shared hosting via FTP on every push to `main`.

**Tech Stack:** Astro 4, plain CSS with CSS variables, Black Han Sans + IBM Plex Mono (Google Fonts), TypeScript, GitHub Actions + SamKirkland/FTP-Deploy-Action

---

## File Map

| File | Responsibility |
|---|---|
| `astro.config.mjs` | Static output config, site URL |
| `src/styles/global.css` | CSS variables (design tokens), font imports, reset, base styles |
| `src/data/projects.ts` | Typed project array — the only content file |
| `src/components/Nav.astro` | Sticky black nav bar, PW monogram, anchor links |
| `src/components/Hero.astro` | Giant name, yellow role badge, bio |
| `src/components/About.astro` | Bio text, mailto contact button |
| `src/components/Projects.astro` | Renders project rows from `projects.ts` |
| `src/components/Footer.astro` | Copyright, GitHub + LinkedIn links |
| `src/pages/index.astro` | Root page: imports all components, sets `<head>` |
| `public/favicon.svg` | PW monogram favicon |
| `.github/workflows/deploy.yml` | Build + FTP deploy on push to main |

---

## Task 1: Scaffold the repo and Astro project

**Files:**
- Create: `paulwright.dev/` (new directory, new git repo)
- Create: `astro.config.mjs`
- Create: `.gitignore`

> **Note:** This task creates a new repo at `~/Git/paulwright.dev` (or wherever you keep repos), separate from PenteXR.

- [ ] **Step 1: Create directory and initialize git**

```bash
mkdir ~/Git/paulwright.dev
cd ~/Git/paulwright.dev
git init
git checkout -b main
```

- [ ] **Step 2: Scaffold Astro with the minimal template**

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

When prompted:
- Template: `A basic, minimal starter` (already passed via flag, but confirm if asked)
- TypeScript: `Strict` (already passed)
- Install dependencies: `No` (we'll do it next)
- Initialize git: `No` (already done)

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 4: Replace `astro.config.mjs` with static output config**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://paulwright.dev',
});
```

- [ ] **Step 5: Verify the scaffold builds**

```bash
npm run build
```

Expected: `dist/` created, no errors.

- [ ] **Step 6: Add `.gitignore`**

```
node_modules/
dist/
.astro/
.env
.DS_Store
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold Astro project"
```

---

## Task 2: Design tokens and global CSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --bg:          #ffffff;
  --fg:          #000000;
  --accent:      #ffff00;
  --muted:       #555555;
  --section-alt: #f5f5f5;

  --border:      3px solid #000000;
  --border-thin: 2px solid #000000;

  --font-display: 'Black Han Sans', Impact, sans-serif;
  --font-mono:    'IBM Plex Mono', 'Courier New', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
}

a {
  color: inherit;
  text-decoration: none;
}

section {
  border-bottom: var(--border);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #999;
  margin-bottom: 16px;
}
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```

Expected: exits 0, no errors. (CSS not yet imported anywhere — that's fine.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add design tokens and global CSS"
```

---

## Task 3: Projects data

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create `src/data/projects.ts`**

```typescript
export interface Project {
  name: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'PenteXR',
    description: 'Multiplayer Pente in virtual reality. Built with WebXR and Three.js.',
    url: 'https://pentexr.com',
  },
  // Add more projects here
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: exits 0, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data"
```

---

## Task 4: Nav component

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
---
<nav>
  <a href="#top" class="monogram">PW</a>
  <div class="links">
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="mailto:me@paulwright.dev" class="contact">Contact</a>
  </div>
</nav>

<style>
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  border-bottom: var(--border);
}

.monogram {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
}

.links a.contact {
  color: var(--accent);
}

.links a:hover {
  background: var(--accent);
  color: #000;
  padding: 2px 4px;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add Nav component"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
---
<section id="top" class="hero">
  <div class="badge">Software Engineer</div>
  <h1>PAUL<br/>WRIGHT</h1>
  <p class="bio">I build things that work.</p>
</section>

<style>
.hero {
  padding: 48px 24px 56px;
  background: var(--bg);
}

.badge {
  display: inline-block;
  background: var(--accent);
  border: var(--border-thin);
  padding: 2px 10px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(72px, 14vw, 140px);
  line-height: 0.9;
  text-transform: uppercase;
  color: var(--fg);
  margin-bottom: 24px;
}

.bio {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  border-left: var(--border);
  padding-left: 14px;
  max-width: 480px;
  line-height: 1.7;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component"
```

---

## Task 6: About component

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Create `src/components/About.astro`**

> Replace the placeholder bio text with your actual 2–4 sentence bio before deploying.

```astro
---
---
<section id="about">
  <div class="inner">
    <div class="section-label">§ About</div>
    <p class="bio">
      Replace this with your actual bio. Two to four sentences about who you are,
      what you build, and what you care about.
    </p>
    <a href="mailto:me@paulwright.dev" class="contact-btn">→ Get in touch</a>
  </div>
</section>

<style>
#about {
  background: var(--section-alt);
}

.inner {
  padding: 40px 24px;
}

.bio {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: #111;
  max-width: 560px;
  margin-bottom: 24px;
}

.contact-btn {
  display: inline-block;
  background: var(--fg);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
}

.contact-btn:hover {
  background: var(--accent);
  color: var(--fg);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add About component"
```

---

## Task 7: Projects component

**Files:**
- Create: `src/components/Projects.astro`

- [ ] **Step 1: Create `src/components/Projects.astro`**

```astro
---
import { projects } from '../data/projects';
---
<section id="projects">
  <div class="inner">
    <div class="section-label">§ Projects</div>
    <div class="project-list">
      {projects.map((project, i) => (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          class="project-row"
        >
          <div class={`accent-bar ${i % 2 === 0 ? 'yellow' : 'black'}`}></div>
          <div class="project-info">
            <div class="project-name">{project.name}</div>
            <div class="project-desc">{project.description}</div>
          </div>
          <div class="project-link">↗</div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
#projects {
  background: var(--bg);
}

.inner {
  padding: 40px 24px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 720px;
}

.project-row {
  display: flex;
  align-items: stretch;
  border: var(--border-thin);
  color: inherit;
}

.project-row:hover {
  background: var(--accent);
}

.accent-bar {
  width: 8px;
  flex-shrink: 0;
}

.accent-bar.yellow { background: var(--accent); }
.accent-bar.black  { background: var(--fg); }

.project-info {
  flex: 1;
  padding: 10px 14px;
}

.project-name {
  font-family: var(--font-display);
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.project-desc {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  line-height: 1.5;
}

.project-link {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 14px;
  background: var(--fg);
  color: var(--bg);
  font-size: 14px;
  font-weight: 700;
}

.project-row:hover .project-link {
  color: var(--accent);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.astro
git commit -m "feat: add Projects component"
```

---

## Task 8: Footer component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

> Replace `YOUR_GITHUB_USERNAME` and `YOUR_LINKEDIN_HANDLE` with your actual handles before deploying.

```astro
---
const year = new Date().getFullYear();
---
<footer>
  <span class="copy">© {year} Paul Wright</span>
  <div class="social">
    <a
      href="https://github.com/YOUR_GITHUB_USERNAME"
      target="_blank"
      rel="noopener noreferrer"
      class="github"
    >GitHub</a>
    <a
      href="https://linkedin.com/in/YOUR_LINKEDIN_HANDLE"
      target="_blank"
      rel="noopener noreferrer"
      class="linkedin"
    >LinkedIn</a>
  </div>
</footer>

<style>
footer {
  background: var(--fg);
  color: var(--bg);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #555;
}

.social {
  display: flex;
  gap: 20px;
}

.social a {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.github  { color: var(--accent); }
.linkedin { color: #888; }

.social a:hover { color: #fff; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 9: Assemble the index page, add favicon, verify build

**Files:**
- Modify: `src/pages/index.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Paul Wright</title>
    <meta name="description" content="Paul Wright — Software Engineer" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <Nav />
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#000000"/>
  <text
    x="3"
    y="24"
    font-family="monospace"
    font-size="18"
    font-weight="bold"
    fill="#ffff00"
  >PW</text>
</svg>
```

- [ ] **Step 3: Build and visually verify**

```bash
npm run build
npx astro preview
```

Open `http://localhost:4321` in a browser. Verify:
- Nav sticks to top when scrolling
- Hero name is very large, yellow badge is visible
- About section has grey background, contact button works
- Projects section shows all entries with alternating accent bars
- Footer is black with yellow GitHub link
- No rounded corners, no shadows anywhere
- Page looks correct on mobile width (resize browser to ~375px)

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro public/favicon.svg
git commit -m "feat: assemble index page and add favicon"
```

---

## Task 10: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Namecheap

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions FTP deploy workflow"
```

---

## Task 11: Create GitHub repo and configure secrets

This task is manual — no code changes.

- [ ] **Step 1: Create the GitHub repo**

Go to https://github.com/new and create `paulwright.dev` (public or private). Do **not** initialize with a README.

- [ ] **Step 2: Push the local repo**

```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/paulwright.dev.git
git push -u origin main
```

- [ ] **Step 3: Add GitHub secrets**

Go to the repo → Settings → Secrets and variables → Actions → New repository secret. Add three secrets:

| Name | Value |
|---|---|
| `FTP_HOST` | Your Namecheap FTP hostname (find in cPanel → FTP Accounts, e.g. `ftp.paulwright.dev`) |
| `FTP_USER` | Your Namecheap cPanel FTP username (format: `username@paulwright.dev`) |
| `FTP_PASSWORD` | Your Namecheap cPanel FTP password |

- [ ] **Step 4: Trigger the first deploy**

Make a trivial commit to `main` (e.g. add a comment) and push. Watch the Actions tab — the workflow should run, build, and FTP the files to Namecheap.

Expected: workflow completes with green checkmark.

---

## Task 12: DNS and final verification

This task is manual — Namecheap dashboard changes.

- [ ] **Step 1: Find your Namecheap hosting IP**

Log into Namecheap → Hosting → Manage → the IP address is shown on the overview page.

- [ ] **Step 2: Update the A record**

In Namecheap → Domain List → paulwright.dev → Manage → Advanced DNS:

- Find the `A Record` for `@` (root domain)
- Set value to your Namecheap hosting IP
- TTL: Automatic

Add a second A record if not present:
- Host: `www`
- Value: same hosting IP

> **Important:** Do NOT change MX records — those control your PrivateEmail and must remain as Namecheap set them.

- [ ] **Step 3: Wait for DNS propagation**

DNS changes typically propagate within 30 minutes. Check with:

```bash
dig paulwright.dev A
```

Expected: returns your Namecheap hosting IP.

- [ ] **Step 4: Final visual check**

Open `https://paulwright.dev` in a browser. Verify:
- Site loads over HTTPS (Namecheap shared hosting provides a free SSL cert via cPanel → SSL/TLS)
- All sections render correctly
- Contact link opens mail client with `me@paulwright.dev`
- Project links open in new tabs
- Site looks correct on mobile

- [ ] **Step 5: Enable SSL in cPanel (if not automatic)**

cPanel → SSL/TLS → AutoSSL → Run AutoSSL. This provisions a free Let's Encrypt cert for your domain.
