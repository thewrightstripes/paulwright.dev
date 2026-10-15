# paulwright.dev

Paul Wright's personal site. Single-page static Astro site with a brutalist
design system (black / white / yellow, Black Han Sans + IBM Plex Mono, no
radius, no shadows, no gradients).

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # outputs static site to dist/
npm run preview  # preview the production build
```

Content lives in `src/components/` (Hero, About, Projects, Footer) and
projects are a typed array in `src/data/projects.ts`.

## Deployment notes (verified 2026-10-15)

- `www.paulwright.dev` is served from S3 + CloudFront (the AWS Amplify
  setup). The apex, `paulwright.dev`, does **not** serve the site: HTTPS
  to the apex returns an empty reply and HTTP returns a Namecheap URL
  Forward 404. Fix in the Amplify / Route 53 (or Namecheap DNS) console:
  attach the apex domain to the same distribution as `www`, or redirect
  the apex to `https://www.paulwright.dev`, and make sure the certificate
  covers the apex name.
- Point the host's 404 / error document at `/404.html` (built from
  `src/pages/404.astro`) so missing paths stop falling back to the
  homepage.
- MX records for PrivateEmail (me@paulwright.dev) must stay untouched.
