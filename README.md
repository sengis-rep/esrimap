# esrimap

A small Next.js starter showing an ArcGIS map/scene using `@arcgis/core`.

## What this is

- Demonstrates loading `@arcgis/core` dynamically in a Next.js client component.
- Includes a fallback for `WebMap` and `WebScene`, and a local 3D scene focused on Singapore.

## Prerequisites

- Node.js 18+ and npm

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
# open http://localhost:3000
```

## Build / Start (production)

```bash
npm run build
npm run start
```

## Notes

- The project uses `@arcgis/core@^4.34.8` and loads the matching CSS from the ArcGIS CDN.
- If you want the local 3D scene disabled, edit `components/MapContainer.tsx` and set `useLocalScene` to `false`.
- To change the portal item used as a fallback, update the `portalItemId` variable in `components/MapContainer.tsx`.

## Troubleshooting

- If you see a 502 when accessing the app in a remote editor preview, confirm the Next dev server is running and reachable (port 3000).
- For ArcGIS runtime errors, check the browser console for messages about `Web Map` vs `Web Scene` and use the fallback logic in `MapContainer.tsx`.

## License

MIT

