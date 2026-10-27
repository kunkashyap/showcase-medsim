# MedSim Organ Gallery

Frontend-only, sunlight-readable gallery of 3D anatomical models. Cards open a virtual dome viewer (viewer work starts after this gallery checkpoint).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Static export (no server):

```bash
npm run build
```

Output is in `/out`. Serve that folder with any static host.

Copy `.env.example` to `.env.local` if needed. Default:

```
NEXT_PUBLIC_ASSETS_BASE_URL=/assets
```

## Adding a model

1. Add an object to `data/models.json` (id, name, system, copy, `modelPath`, `thumbnail`).
2. Put `{id}.glb` in `{ASSETS}/models/` and `{id}.jpg` in `{ASSETS}/thumbs/`.
3. No component edits. Filter chips come from unique `system` values.

## Local vs external assets

- Local: files live in `public/assets/` and the env var stays `/assets`.
- External/CDN: set `NEXT_PUBLIC_ASSETS_BASE_URL` to the host origin (no trailing slash). All `useGLTF` and thumbnail loads go through `assetUrl()` in `lib/assets.ts`.
- External hosts **must** send CORS headers (`Access-Control-Allow-Origin`) so the browser can fetch GLB files for WebGL.

## Kiosk mode

Append `?kiosk=1` to hide system filter chips and enlarge cards.

## Debug mode

Viewer debug (`?debug=1`) will be added with the dome: click the model to copy 3D hit points into `models.json`. Labels at exactly `[0, 0, 0]` are not drawn.

## GLB compression (viewer)

Keep each GLB under ~15 MB. Example with [gltf-transform](https://gltf-transform.dev/):

```bash
gltf-transform optimize model.glb model-draco.glb --compress draco
```

Meshopt is also fine. Prefer Draco/meshopt over uncompressed geometry.

## Contrast (WCAG AAA 7:1)

| Pair | Approx. ratio | Notes |
| --- | --- | --- |
| `#0A0A0A` on `#FFFFFF` | 21:1 | Primary text |
| `#1F2933` on `#FFFFFF` | ~13:1 | Secondary text |
| `#1F2933` on `#F4F6F8` | ~12:1 | Body on cards |
| `#0033A0` on `#FFFFFF` | ~8.6:1 | Accent / links |
| `#FFFFFF` on `#0033A0` | ~8.6:1 | Button labels |
| `#FFFFFF` on `#0A0A0A` | 21:1 | Inverted hover |
| `#B00020` on `#FFFFFF` | ~8.2:1 | Alerts |

No dark mode. Body text is 20px+. Nothing is below 16px.

## Choices made in this checkpoint

- Next.js 14.2 App Router, React 18. `@react-three/fiber` **v8** (v9 needs React 19).
- `next.config.js` with `output: "export"` and `images.unoptimized`.
- Extra breakpoint `ultra` at **1920px** for the 4-column grid.
- Kiosk and filters are client-side so they work on a static export.
- Missing thumbnails: `onError` shows a navy name plate (no GLB files yet).
- `/organ/[id]` currently shows a routing placeholder; the 3D dome is the next step.
- Site title: **MedSim**.
