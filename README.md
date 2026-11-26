# Shreyas M · Portfolio

React + Vite + Framer Motion + Lenis smooth scrolling.

## Run it

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Make it yours

| What | Where |
| --- | --- |
| Your photo | Replace `public/profile.jpg` (portrait, ~4:5, 800px+ wide looks best) |
| Résumé download | Replace `public/Shreyas_M_Resume.pdf` |
| All text: summary, jobs, projects, skills, Salesforce, links | `src/data/profile.js` |
| Colours (dark + light themes) | Tokens at the top of `src/styles/base.css` |

If `public/profile.jpg` is missing, the panel shows an "SM" monogram instead.

## Deploy

Any static host works. On Vercel or Netlify, use build command `npm run build`
and output directory `dist`.
