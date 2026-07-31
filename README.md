# Gunjan Khut — Portfolio

Interactive 3D portfolio for **Gunjan Khut**, Senior Staff Robotics Controls Engineer.

**Live site:** [https://gkkhut.github.io/](https://gkkhut.github.io/)  
**Repo:** [gkkhut/gkkhut.github.io](https://github.com/gkkhut/gkkhut.github.io)

Based on the open-source [Naresh-Khatri/3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) template (MIT). Credit appreciated.

## Features

- Interactive 3D skills keyboard (Spline)
- Light / dark mode **slider** (persisted via `next-themes`)
- Projects, experience, and OT/manufacturing stack from the updated resume
- Static export for **GitHub Pages**

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build (static)

```bash
npm run build
```

Output is written to `out/` (Next.js `output: "export"`).

## Deploy to GitHub Pages

1. Push this project to [gkkhut/gkkhut.github.io](https://github.com/gkkhut/gkkhut.github.io) (recommend backing up the old static site on a `legacy-static` branch first).
2. In repo **Settings → Pages**, set Source to **GitHub Actions**.
3. The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes `out/` on every push to `main`/`master`.

## Customize

| File | Purpose |
|------|---------|
| `src/data/config.ts` | Name, SEO, email, social links |
| `src/data/constants.ts` | Skills + experience |
| `src/data/projects.tsx` | Featured projects |
| `src/components/theme/theme-slider.tsx` | Light/dark slider |

Update `email` and `social.linkedin` in `config.ts` if needed.
