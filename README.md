# Aurora — Digital Twin Real Estate Platform (Concept)

A cinematic, **frontend-only** proptech concept: a navigable 3D digital twin of an
entire smart city, with AI property search, live investment analytics and a
developer console. Built to feel like a premium platform a luxury developer or
sovereign fund would commission.

> This is a **concept demo**. There is no backend, database, auth or API — all
> data is realistic mock data generated deterministically in `lib/data/`.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** + shadcn/ui-style primitives
- **Three.js** + **React Three Fiber** + **@react-three/drei** (the 3D city)
- **Framer Motion** (cinematic transitions)
- **Recharts** (analytics dashboard) · **Zustand** (selection state) · **Lucide** icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## The experience

| Area | What it does |
| --- | --- |
| **3D City Explorer** | Full-screen digital twin that auto-orbits on load. Hover towers for labels, click to focus the camera and open the building panel. Five districts (Marina, Skyline, Garden, Innovation, Heritage) with waterfront, roads, parks and ~30 procedurally-placed towers with lit-window façades. |
| **Building panel** | Floating glass side panel: status, available units, occupancy, total apartments, starting price, render image, amenities, a **floor selector** and per-floor apartment list. |
| **Apartment view** | Cinematic modal: beds/baths/area/floor/orientation, price, availability, **estimated ROI & rental yield**, generated **floor plan**, simulated **virtual tour** toggle and **save** action. |
| **Map layers** | Toggle schools, hospitals, restaurants, shopping, transport, parks and beaches — animated markers appear in the twin. |
| **AI concierge** | Futuristic search bar. Try *"Show 3-bedroom apartments under $350,000"*, *"Find sea-view apartments"*, *"Highlight investment opportunities"*. Simulated NLU filters the real mock inventory and highlights matching towers in 3D. |
| **Analytics** | Appreciation forecast, occupancy & yield trend, district growth, asset mix and KPI cards. |
| **Showcase / Developers** | Luxury property cards with hover effects, and a developer console for residential / commercial / mixed-use / smart-district projects. |

## Project structure

```
app/                 Next.js App Router (layout, page, globals)
components/
  city/              R3F scene — CityScene, Building, Terrain, MapMarkers, CameraRig, CityExplorer
  panels/            BuildingPanel, ApartmentPanel, AIAssistant, LayerControls, FloorPlan
  sections/          Analytics, PropertyShowcase, DeveloperShowcase, Technology, CallToAction
  layout/            Navbar, Footer
  ui/                shadcn-style primitives (button, card, badge, tabs, switch, progress)
lib/
  data/              Deterministic mock data (city, properties, analytics, layers, ai, types)
  store.ts           Zustand selection / layer / camera state
  utils.ts           formatting + cn()
```

## Notes

- The city is generated with a seeded PRNG so server and client render identically
  (stable hydration) and the data is reproducible.
- Building façades use procedurally-painted "lit windows at night" canvas textures.
- Reflections come from in-scene drei `Lightformer`s — no external HDR is fetched.
- Property/render imagery is loaded from Unsplash; everything else is local.
