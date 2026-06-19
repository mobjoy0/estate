import { BUILDINGS } from "./city";
import type { Apartment } from "./types";

export interface AiResult {
  summary: string;
  highlightBuildingIds: string[];
  matches: { apt: Apartment; buildingName: string }[];
  stat?: { label: string; value: string }[];
}

export const SUGGESTED_PROMPTS = [
  "Show 3-bedroom apartments under $350,000",
  "Find sea-view apartments",
  "Highlight investment opportunities",
  "Best rental yield in the Marina",
];

const allApartments = (): { apt: Apartment; buildingName: string }[] =>
  BUILDINGS.flatMap((b) =>
    b.apartments.map((apt) => ({ apt, buildingName: b.name }))
  );

function topN<T>(arr: T[], n: number) {
  return arr.slice(0, n);
}

// Simulated NLU — intent matching over real mock inventory.
export function runAiQuery(raw: string): AiResult {
  const q = raw.toLowerCase();
  const inv = allApartments();

  const bedMatch = q.match(/(\d)\s*-?\s*(bed|bedroom|br)/);
  const priceMatch = q.match(/(\d[\d,.]*)\s*(k|m|million)?/);

  // Intent: sea view
  if (q.includes("sea") || q.includes("ocean") || q.includes("water")) {
    const matches = topN(
      inv
        .filter((x) => x.apt.seaView && x.apt.availability === "Available")
        .sort((a, b) => b.apt.area - a.apt.area),
      6
    );
    return {
      summary: `Found ${matches.length} available sea-view residences across the Marina district, prioritised by size and light orientation.`,
      highlightBuildingIds: dedupe(matches.map((m) => m.apt.buildingId)),
      matches,
      stat: [
        { label: "Avg price", value: fmtAvg(matches.map((m) => m.apt.price)) },
        { label: "Avg ROI", value: avgPct(matches.map((m) => m.apt.roi)) },
      ],
    };
  }

  // Intent: investment opportunities (high ROI)
  if (
    q.includes("invest") ||
    q.includes("roi") ||
    q.includes("yield") ||
    q.includes("opportun")
  ) {
    const marina = q.includes("marina");
    const matches = topN(
      inv
        .filter(
          (x) =>
            x.apt.availability === "Available" &&
            (!marina || x.apt.buildingId.includes("marina"))
        )
        .sort((a, b) => b.apt.roi - a.apt.roi),
      6
    );
    return {
      summary: `Ranked the top ${matches.length} highest-return units${
        marina ? " in Aurora Marina" : " across the city"
      } by estimated ROI and rental yield.`,
      highlightBuildingIds: dedupe(matches.map((m) => m.apt.buildingId)),
      matches,
      stat: [
        { label: "Top ROI", value: `${matches[0]?.apt.roi.toFixed(1)}%` },
        { label: "Avg yield", value: avgPct(matches.map((m) => m.apt.rentalYield)) },
      ],
    };
  }

  // Intent: bedrooms + optional price ceiling
  if (bedMatch) {
    const beds = Number(bedMatch[1]);
    let ceiling = Infinity;
    if (priceMatch && (q.includes("under") || q.includes("below") || q.includes("<"))) {
      let n = Number(priceMatch[1].replace(/,/g, ""));
      const unit = priceMatch[2];
      if (unit === "k") n *= 1_000;
      if (unit === "m" || unit === "million") n *= 1_000_000;
      if (!unit && n < 10000) n *= 1000; // "350" -> 350k
      ceiling = n;
    }
    const matches = topN(
      inv
        .filter(
          (x) =>
            x.apt.bedrooms === beds &&
            x.apt.price <= ceiling &&
            x.apt.availability === "Available"
        )
        .sort((a, b) => a.apt.price - b.apt.price),
      6
    );
    return {
      summary: `Located ${matches.length} available ${beds}-bedroom homes${
        ceiling !== Infinity ? ` under $${(ceiling / 1000).toFixed(0)}k` : ""
      }, sorted by best value.`,
      highlightBuildingIds: dedupe(matches.map((m) => m.apt.buildingId)),
      matches,
      stat: [
        { label: "From", value: matches.length ? `$${(matches[0].apt.price / 1000).toFixed(0)}k` : "—" },
        { label: "Avg area", value: `${avg(matches.map((m) => m.apt.area)).toFixed(0)} m²` },
      ],
    };
  }

  // Fallback: best value available units
  const matches = topN(
    inv
      .filter((x) => x.apt.availability === "Available")
      .sort((a, b) => b.apt.roi - a.apt.roi),
    6
  );
  return {
    summary: `Here is a curated mix of standout residences across Aurora. Try asking about bedrooms, budget, sea views or ROI.`,
    highlightBuildingIds: dedupe(matches.map((m) => m.apt.buildingId)),
    matches,
  };
}

const dedupe = (a: string[]) => Array.from(new Set(a));
const avg = (a: number[]) => (a.length ? a.reduce((s, n) => s + n, 0) / a.length : 0);
const avgPct = (a: number[]) => `${avg(a).toFixed(1)}%`;
const fmtAvg = (a: number[]) => `$${(avg(a) / 1000).toFixed(0)}k`;
