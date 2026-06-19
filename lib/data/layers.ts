import {
  GraduationCap,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  TrainFront,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { LayerId } from "./types";

export interface LayerMeta {
  id: LayerId;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const LAYERS: LayerMeta[] = [
  { id: "schools", label: "Schools", icon: GraduationCap, color: "#fbbf24" },
  { id: "hospitals", label: "Hospitals", icon: Stethoscope, color: "#f87171" },
  { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed, color: "#fb923c" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "#e879f9" },
  { id: "transport", label: "Transport", icon: TrainFront, color: "#60a5fa" },
  { id: "parks", label: "Parks", icon: Trees, color: "#4ade80" },
  { id: "beaches", label: "Beaches", icon: Waves, color: "#22d3ee" },
];

export const LAYER_MAP: Record<LayerId, LayerMeta> = LAYERS.reduce(
  (acc, l) => ({ ...acc, [l.id]: l }),
  {} as Record<LayerId, LayerMeta>
);
