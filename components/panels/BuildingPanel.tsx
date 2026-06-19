"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Building2,
  Layers,
  Home,
  Activity,
  Tag,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { getBuilding, getDistrict } from "@/lib/data/city";
import { useCityStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Stat } from "./Stat";
import type { Availability } from "@/lib/data/types";

const statusVariant = (status: string) =>
  status === "Completed"
    ? "success"
    : status === "Selling"
    ? "accent"
    : status === "Under Construction"
    ? "warning"
    : "gold";

const availColor: Record<Availability, string> = {
  Available: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20",
  Reserved: "border-amber-400/40 bg-amber-400/10 text-amber-300/80",
  Sold: "border-white/10 bg-white/[0.03] text-white/35",
};

export function BuildingPanel() {
  const selectedBuildingId = useCityStore((s) => s.selectedBuildingId);
  const selectBuilding = useCityStore((s) => s.selectBuilding);
  const selectApartment = useCityStore((s) => s.selectApartment);
  const building = getBuilding(selectedBuildingId);
  const [floor, setFloor] = useState<number | null>(null);

  useEffect(() => {
    setFloor(building ? building.floors : null);
  }, [selectedBuildingId, building]);

  const district = building ? getDistrict(building.districtId) : null;
  const floorApts = useMemo(
    () =>
      building && floor
        ? building.apartments.filter((a) => a.floor === floor)
        : [],
    [building, floor]
  );

  return (
    <AnimatePresence mode="wait">
      {building && (
        <motion.aside
          key={building.id}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="glass pointer-events-auto absolute right-4 top-20 z-30 flex max-h-[calc(100vh-7rem)] w-[372px] flex-col overflow-hidden rounded-3xl"
        >
          {/* Hero image */}
          <div className="relative h-40 shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={building.image}
              alt={building.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1b] via-[#0a0f1b]/30 to-transparent" />
            <button
              onClick={() => selectBuilding(null)}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-black/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-2">
                <Badge variant={statusVariant(building.status) as any}>
                  {building.status}
                </Badge>
                <span
                  className="inline-flex items-center gap-1 text-[11px] text-white/70"
                  style={{ color: district?.accent }}
                >
                  <MapPin className="h-3 w-3" /> {district?.name}
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                {building.name}
              </h2>
            </div>
          </div>

          <div className="no-scrollbar flex-1 overflow-y-auto p-4">
            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-2">
              <Stat icon={Home} label="Available Units" value={`${building.availableUnits}`} accent />
              <Stat icon={Activity} label="Occupancy" value={`${building.occupancy}%`} />
              <Stat icon={Building2} label="Total Apartments" value={`${building.totalApartments}`} />
              <Stat icon={Tag} label="Starting Price" value={formatCurrency(building.startingPrice, true)} />
            </div>

            {/* Occupancy bar */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Sales & occupancy</span>
                <span className="text-white/70">{building.occupancy}% occupied</span>
              </div>
              <Progress value={building.occupancy} />
            </div>

            {/* Amenities */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {building.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Floor selector */}
            <div className="mt-5">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Layers className="h-3.5 w-3.5 text-aurora-cyan" /> Select a floor
              </div>
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                {Array.from({ length: building.floors }, (_, i) => building.floors - i).map(
                  (f) => {
                    const avail = building.apartments.filter(
                      (a) => a.floor === f && a.availability === "Available"
                    ).length;
                    const active = floor === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFloor(f)}
                        className={`relative flex h-12 min-w-[44px] shrink-0 flex-col items-center justify-center rounded-lg border text-xs transition ${
                          active
                            ? "border-aurora-cyan/60 bg-aurora-cyan/15 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className="font-semibold">L{f}</span>
                        <span className="text-[9px] text-aurora-cyan/80">{avail} avail</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Apartments on floor */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-white/80">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-aurora-violet" />
                  Floor {floor} residences
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {floorApts.length} units
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {floorApts.map((a) => (
                  <button
                    key={a.id}
                    disabled={a.availability === "Sold"}
                    onClick={() => selectApartment(a.id)}
                    className={`group flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${availColor[a.availability]}`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        {a.number}
                        <span className="text-[11px] font-normal text-white/50">
                          {a.bedrooms} bd · {a.area} m²
                        </span>
                      </div>
                      <div className="text-[11px] text-white/50">{a.orientation}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          {formatCurrency(a.price, true)}
                        </div>
                        <div className="text-[10px] text-emerald-300/80">
                          {a.roi.toFixed(1)}% ROI
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white/70" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
