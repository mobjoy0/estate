// ---------------------------------------------------------------------------
// Domain types for the Aurora digital-twin proptech concept.
// All data is mock data generated deterministically in lib/data/city.ts.
// ---------------------------------------------------------------------------

export type DistrictId =
  | "marina"
  | "skyline"
  | "garden"
  | "innovation"
  | "heritage";

export interface District {
  id: DistrictId;
  name: string;
  tagline: string;
  accent: string; // hex accent used in 3D + UI
  center: [number, number]; // x,z on the city grid
}

export type CompletionStatus =
  | "Completed"
  | "Selling"
  | "Under Construction"
  | "Pre-Launch";

export type Orientation =
  | "Sea View"
  | "City View"
  | "Park View"
  | "Marina View"
  | "Skyline View";

export type Availability = "Available" | "Reserved" | "Sold";

export interface Apartment {
  id: string;
  number: string;
  buildingId: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqm
  orientation: Orientation;
  price: number;
  availability: Availability;
  roi: number; // % estimated annual ROI
  rentalYield: number; // %
  seaView: boolean;
}

export interface Building {
  id: string;
  name: string;
  districtId: DistrictId;
  // 3D placement
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  floors: number;
  accent: string;
  // commercial metadata
  status: CompletionStatus;
  totalApartments: number;
  availableUnits: number;
  occupancy: number; // %
  startingPrice: number;
  image: string;
  description: string;
  amenities: string[];
  apartments: Apartment[];
}

export type LayerId =
  | "schools"
  | "hospitals"
  | "restaurants"
  | "shopping"
  | "transport"
  | "parks"
  | "beaches";

export interface MapPoi {
  id: string;
  layer: LayerId;
  name: string;
  position: [number, number, number];
}

export interface PropertyCard {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  area: number;
  roi: number;
  beds: number;
  baths: number;
  availability: Availability;
  features: string[];
  tag: string;
}

export interface DeveloperProject {
  id: string;
  name: string;
  category: "Residential" | "Commercial" | "Mixed-Use" | "Smart District";
  units: number;
  value: string;
  progress: number; // %
  status: CompletionStatus;
  image: string;
  blurb: string;
}
