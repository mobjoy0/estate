import { create } from "zustand";
import type { LayerId } from "./data/types";

interface CityState {
  // selection
  hoveredBuildingId: string | null;
  selectedBuildingId: string | null;
  selectedApartmentId: string | null;

  // map layers
  activeLayers: Set<LayerId>;

  // AI highlight set
  highlightedBuildingIds: Set<string>;

  // camera / cinematic
  autoOrbit: boolean;
  focusTarget: [number, number, number] | null;

  setHovered: (id: string | null) => void;
  selectBuilding: (id: string | null) => void;
  selectApartment: (id: string | null) => void;
  toggleLayer: (id: LayerId) => void;
  setHighlights: (ids: string[]) => void;
  clearHighlights: () => void;
  setAutoOrbit: (v: boolean) => void;
  setFocusTarget: (t: [number, number, number] | null) => void;
}

export const useCityStore = create<CityState>((set) => ({
  hoveredBuildingId: null,
  selectedBuildingId: null,
  selectedApartmentId: null,
  activeLayers: new Set<LayerId>(),
  highlightedBuildingIds: new Set<string>(),
  autoOrbit: true,
  focusTarget: null,

  setHovered: (id) => set({ hoveredBuildingId: id }),
  selectBuilding: (id) =>
    set({
      selectedBuildingId: id,
      selectedApartmentId: null,
      autoOrbit: id ? false : true,
    }),
  selectApartment: (id) => set({ selectedApartmentId: id }),
  toggleLayer: (id) =>
    set((s) => {
      const next = new Set(s.activeLayers);
      next.has(id) ? next.delete(id) : next.add(id);
      return { activeLayers: next };
    }),
  setHighlights: (ids) =>
    set({ highlightedBuildingIds: new Set(ids), autoOrbit: false }),
  clearHighlights: () => set({ highlightedBuildingIds: new Set() }),
  setAutoOrbit: (v) => set({ autoOrbit: v }),
  setFocusTarget: (t) => set({ focusTarget: t }),
}));
