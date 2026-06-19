import type {
  Apartment,
  Availability,
  Building,
  CompletionStatus,
  District,
  MapPoi,
  Orientation,
} from "./types";

// ---------------------------------------------------------------------------
// Deterministic PRNG (mulberry32) so the city is identical on server & client.
// This keeps React Three Fiber hydration stable and the data reproducible.
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(73_421);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const between = (min: number, max: number) => min + rand() * (max - min);
const round = (n: number, step = 1) => Math.round(n / step) * step;

export const DISTRICTS: District[] = [
  {
    id: "marina",
    name: "Aurora Marina",
    tagline: "Waterfront living & superyacht berths",
    accent: "#5eead4",
    center: [-22, -16],
  },
  {
    id: "skyline",
    name: "Skyline Quarter",
    tagline: "The supertall financial spine",
    accent: "#60a5fa",
    center: [10, -6],
  },
  {
    id: "garden",
    name: "Garden Terraces",
    tagline: "Biophilic residential sanctuary",
    accent: "#86efac",
    center: [-6, 20],
  },
  {
    id: "innovation",
    name: "Innovation Mile",
    tagline: "Smart commercial & R&D campus",
    accent: "#a78bfa",
    center: [26, 16],
  },
  {
    id: "heritage",
    name: "Heritage Walk",
    tagline: "Boutique low-rise & culture",
    accent: "#f0b27a",
    center: [-30, 8],
  },
];

const BUILDING_NAMES = [
  "Celestia", "Lumière", "Azure Crest", "The Meridian", "Solstice",
  "Vela Tower", "Orion Heights", "Aurelia", "The Pearl", "Nova Spire",
  "Halcyon", "Étoile", "Marina Bay One", "Verdant", "Skyhaven",
  "The Atrium", "Belvedere", "Cascade", "Lustre", "Pinnacle",
  "Serenity", "The Cove", "Empyrean", "Cobalt", "Grandview",
  "Riviera", "Onyx", "The Botanic", "Selene", "Quantum",
];

const AMENITY_POOL = [
  "Infinity Pool", "Sky Lounge", "Private Spa", "EV Charging",
  "Smart Concierge", "Padel Court", "Rooftop Garden", "Cinema Room",
  "Co-working Hub", "24/7 Security", "Wine Cellar", "Pet Spa",
  "Yoga Pavilion", "Marina Access", "Private Cinema", "Golf Simulator",
];

const STATUS_BY_PROGRESS: CompletionStatus[] = [
  "Pre-Launch", "Under Construction", "Selling", "Completed",
];

const UNSPLASH = (q: string, sig: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80&sig=${sig}`;

const BUILDING_IMAGES = [
  "photo-1545324418-cc1a3fa10c00",
  "photo-1512453979798-5ea266f8880c",
  "photo-1600585154340-be6161a56a0c",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1518780664697-55e3ad937233",
  "photo-1502672260266-1c1ef2d93688",
  "photo-1567684014761-b65e2e59b9eb",
  "photo-1493809842364-78817add7ffb",
];

function makeApartments(building: Omit<Building, "apartments">): Apartment[] {
  const apts: Apartment[] = [];
  const perFloor = building.width > 6 ? 4 : 3;
  const seaCapable = building.districtId === "marina";

  for (let f = 1; f <= building.floors; f++) {
    for (let u = 0; u < perFloor; u++) {
      const bedrooms = (pick([1, 1, 2, 2, 2, 3, 3, 4]) as number);
      const bathrooms = Math.max(1, bedrooms - (rand() > 0.5 ? 0 : 1));
      const area = round(38 + bedrooms * 32 + between(-8, 26), 1);
      const floorPremium = 1 + (f / building.floors) * 0.55;
      const basePrice = (2600 + between(-300, 1400)) * area * floorPremium;
      const price = round(basePrice, 1000);
      const availability = pick([
        "Available", "Available", "Available", "Reserved", "Sold",
      ] as Availability[]);
      const high = f / building.floors > 0.45;
      const seaView = seaCapable && high && rand() > 0.35;
      const orientation: Orientation = seaView
        ? "Sea View"
        : pick([
            "City View", "Park View", "Marina View", "Skyline View",
          ] as Orientation[]);
      const rentalYield = round(between(5.2, 8.6), 0.1);
      const roi = round(rentalYield + between(2.5, 6.5), 0.1);

      apts.push({
        id: `${building.id}-${f}-${u}`,
        number: `${f.toString().padStart(2, "0")}${String.fromCharCode(65 + u)}`,
        buildingId: building.id,
        floor: f,
        bedrooms,
        bathrooms,
        area,
        orientation,
        price,
        availability,
        roi,
        rentalYield,
        seaView,
      });
    }
  }
  return apts;
}

function buildCity(): Building[] {
  const buildings: Building[] = [];
  let nameIdx = 0;

  DISTRICTS.forEach((district) => {
    const count =
      district.id === "skyline" ? 7 : district.id === "heritage" ? 5 : 6;
    const [cx, cz] = district.center;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand();
      const radius = between(3, 11);
      const x = round(cx + Math.cos(angle) * radius, 0.5);
      const z = round(cz + Math.sin(angle) * radius, 0.5);

      // Height profile per district personality
      let height: number;
      let width: number;
      let depth: number;
      switch (district.id) {
        case "skyline":
          height = between(18, 42);
          width = between(3.2, 5);
          depth = between(3.2, 5);
          break;
        case "marina":
          height = between(10, 24);
          width = between(3.6, 6);
          depth = between(3.6, 5.5);
          break;
        case "heritage":
          height = between(3.5, 7);
          width = between(4.5, 7);
          depth = between(4.5, 6.5);
          break;
        case "innovation":
          height = between(8, 18);
          width = between(5, 8);
          depth = between(5, 7);
          break;
        default:
          height = between(7, 16);
          width = between(4, 6);
          depth = between(4, 6);
      }

      const floors = Math.max(3, Math.round(height / 1.15));
      const progress = round(between(15, 100));
      const status =
        STATUS_BY_PROGRESS[
          Math.min(3, Math.floor((progress / 100) * 4))
        ];
      const totalApartments =
        floors * (width > 6 ? 4 : 3);
      const occupancy = round(between(58, 97));
      const availableUnits =
        status === "Completed"
          ? Math.round(totalApartments * between(0.03, 0.18))
          : Math.round(totalApartments * between(0.25, 0.7));

      const id = `bld-${district.id}-${i}`;
      const base: Omit<Building, "apartments"> = {
        id,
        name: BUILDING_NAMES[nameIdx % BUILDING_NAMES.length],
        districtId: district.id,
        position: [x, height / 2, z],
        width,
        depth,
        height,
        floors,
        accent: district.accent,
        status,
        totalApartments,
        availableUnits,
        occupancy,
        startingPrice: round(between(280, 940) * 1000, 5000),
        image: UNSPLASH(BUILDING_IMAGES[nameIdx % BUILDING_IMAGES.length], nameIdx),
        description: `${district.name} — ${district.tagline}. ${BUILDING_NAMES[nameIdx % BUILDING_NAMES.length]} blends concierge living with circadian smart-home systems and panoramic glazing.`,
        amenities: [...AMENITY_POOL]
          .sort(() => rand() - 0.5)
          .slice(0, 5),
      };
      nameIdx++;

      buildings.push({ ...base, apartments: makeApartments(base) });
    }
  });

  return buildings;
}

export const BUILDINGS: Building[] = buildCity();

export const getBuilding = (id: string | null) =>
  BUILDINGS.find((b) => b.id === id) ?? null;

export const getDistrict = (id: string) =>
  DISTRICTS.find((d) => d.id === id) ?? DISTRICTS[0];

// ---------------------------------------------------------------------------
// Map-layer points of interest (schools, hospitals, beaches, ...)
// ---------------------------------------------------------------------------
const POI_DEFS: { layer: MapPoi["layer"]; names: string[]; count: number }[] = [
  { layer: "schools", count: 4, names: ["Aurora International School", "Marina Academy", "STEM Lyceum", "Garden Montessori"] },
  { layer: "hospitals", count: 3, names: ["Aurora Medical Center", "Skyline Clinic", "Coastal Health Hub"] },
  { layer: "restaurants", count: 6, names: ["Azure Rooftop", "Lumen Brasserie", "Sora Omakase", "The Marina Grill", "Verde Kitchen", "Cinq Sens"] },
  { layer: "shopping", count: 3, names: ["Aurora Galleria", "Marina Promenade", "Innovation Market"] },
  { layer: "transport", count: 5, names: ["Skyline Metro", "Marina Tram", "Garden Station", "Innovation Hub", "Heritage Stop"] },
  { layer: "parks", count: 4, names: ["Central Green", "Tidal Park", "Botanic Terrace", "Skyline Plaza"] },
  { layer: "beaches", count: 3, names: ["Aurora Cove", "Pearl Beach", "Sunset Strand"] },
];

function buildPois(): MapPoi[] {
  const out: MapPoi[] = [];
  const prng = mulberry32(99_001);
  POI_DEFS.forEach((def) => {
    for (let i = 0; i < def.count; i++) {
      const x =
        def.layer === "beaches"
          ? -46 + prng() * 6
          : (prng() - 0.5) * 96;
      const z =
        def.layer === "beaches"
          ? -34 + prng() * 50
          : (prng() - 0.5) * 78;
      out.push({
        id: `${def.layer}-${i}`,
        layer: def.layer,
        name: def.names[i % def.names.length],
        position: [round(x, 0.5), 0, round(z, 0.5)],
      });
    }
  });
  return out;
}

export const POIS: MapPoi[] = buildPois();

// ---------------------------------------------------------------------------
// Aggregate stats used in hero counters.
// ---------------------------------------------------------------------------
export const CITY_STATS = (() => {
  const totalUnits = BUILDINGS.reduce((s, b) => s + b.totalApartments, 0);
  const available = BUILDINGS.reduce((s, b) => s + b.availableUnits, 0);
  const avgOccupancy = Math.round(
    BUILDINGS.reduce((s, b) => s + b.occupancy, 0) / BUILDINGS.length
  );
  return {
    towers: BUILDINGS.length,
    districts: DISTRICTS.length,
    totalUnits,
    available,
    avgOccupancy,
  };
})();
