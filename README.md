# Totem

The Totem website at epignos.dev. Built with Astro.

A simple four-quadrant homepage: Totem and state transitions (top left), audio examples (top right), the synthetic mind and feedback (bottom left), and the founding quote with links (bottom right). The quadrants stack on mobile.

## Development

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Use the local URL printed by Astro. Run `npm run build` for the production build.

## Content

- `src/content.ts`: metadata and recordings.
- `src/pages/index.astro`: the four-quadrant overview, with one detail link per card.
- `src/pages/{totem,examples,synthetic-mind,principle}.astro`: focused detail pages.
- `src/layouts/Detail.astro`: shared detail-page layout and return navigation.
- `src/components/AudioExamples.astro`: shared recordings and playback behavior.
- `public/audio/`: existing Totem prototype recordings, copied from totem-driver; no live generation or inference.
- `scripts/generate-brand-assets.mjs`: creates the social preview and touch icon from SVG with Sharp.

The state and feedback paths illustrate the concept. The synthetic observer is planned research. Audio plays only on request; starting another recording pauses the previous one.

The prior studio, consulting, product showcase, and contact form have been removed. Existing domain and Node hosting configuration remain in place.

Cards use native links that cover the panel. Audio controls and external links remain independent. Detail pages work with direct URLs, browser Back, and JavaScript disabled; only the route selector needs JavaScript.

## Deployment

Production is served at https://epignos.dev on the Contabo host configured locally as `epignos-dev-test`. nginx proxies to the `epignos-site` systemd service on `127.0.0.1:3001`.

Deploy committed source into a new directory under `/opt/epignos-site/releases/`. Run `npm ci` and `npm run build` there before changing `/opt/epignos-site/current`. Switch that symlink atomically to the new release, then run `sudo systemctl restart epignos-site` and verify the public pages and assets. Keep the previous release for rollback: restore the symlink to it and restart the service.

Runtime configuration remains in `/home/epignos/.config/epignos-site/app.env`; do not copy local environment files into a release. Deployment affects only this website’s service; EpiNote has separate hosting.
