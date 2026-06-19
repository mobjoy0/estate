"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  BedDouble,
  Bath,
  Ruler,
  Layers,
  Compass,
  TrendingUp,
  Percent,
  Play,
  Heart,
  Check,
  Eye,
} from "lucide-react";
import { BUILDINGS } from "@/lib/data/city";
import { useCityStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stat } from "./Stat";
import { FloorPlan } from "./FloorPlan";

export function ApartmentPanel() {
  const selectedApartmentId = useCityStore((s) => s.selectedApartmentId);
  const selectApartment = useCityStore((s) => s.selectApartment);
  const [saved, setSaved] = useState(false);
  const [tour, setTour] = useState(false);

  const found = selectedApartmentId
    ? BUILDINGS.flatMap((b) => b.apartments.map((a) => ({ a, b }))).find(
        (x) => x.a.id === selectedApartmentId
      )
    : null;

  return (
    <AnimatePresence>
      {found && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => selectApartment(null)}
          />
          <motion.div
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/8 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="accent">{found.b.name}</Badge>
                  <Badge
                    variant={
                      found.a.availability === "Available"
                        ? "success"
                        : found.a.availability === "Reserved"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {found.a.availability}
                  </Badge>
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                  Residence{" "}
                  <span className="text-gradient">{found.a.number}</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {found.a.orientation} · Floor {found.a.floor}
                </p>
              </div>
              <button
                onClick={() => selectApartment(null)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              {/* Floor plan / virtual tour */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
                <AnimatePresence mode="wait">
                  {tour ? (
                    <motion.div
                      key="tour"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={found.b.image}
                        alt="tour"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/30" />
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
                        360° immersive tour · simulated
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-5 text-white/70"
                    >
                      <FloorPlan apt={found.a} />
                      <div className="absolute bottom-3 left-3 text-[11px] text-white/40">
                        Floor plan · {found.a.area} m²
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-2">
                  <Stat icon={BedDouble} label="Bedrooms" value={`${found.a.bedrooms}`} />
                  <Stat icon={Bath} label="Bathrooms" value={`${found.a.bathrooms}`} />
                  <Stat icon={Ruler} label="Area" value={`${found.a.area} m²`} />
                  <Stat icon={Layers} label="Floor" value={`L${found.a.floor}`} />
                  <Stat icon={Compass} label="Aspect" value={found.a.orientation.replace(" View", "")} />
                  <Stat icon={Eye} label="Sea view" value={found.a.seaView ? "Yes" : "No"} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Stat icon={TrendingUp} label="Est. ROI" value={`${found.a.roi.toFixed(1)}%`} accent />
                  <Stat icon={Percent} label="Rental Yield" value={`${found.a.rentalYield.toFixed(1)}%`} accent />
                </div>

                <div className="mt-3 rounded-2xl border border-white/10 bg-gradient-to-br from-aurora-cyan/10 to-aurora-blue/5 p-4">
                  <div className="text-[11px] text-muted-foreground">Guide price</div>
                  <div className="font-display text-3xl font-semibold text-white">
                    {formatCurrency(found.a.price)}
                  </div>
                  <div className="text-[11px] text-white/50">
                    ≈ {formatCurrency(Math.round(found.a.price / found.a.area))}/m²
                  </div>
                </div>

                <div className="mt-auto flex gap-2 pt-4">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => setTour((t) => !t)}
                  >
                    <Play className="h-4 w-4" />
                    {tour ? "View Floor Plan" : "Virtual Tour"}
                  </Button>
                  <Button
                    variant={saved ? "gold" : "glass"}
                    onClick={() => setSaved((s) => !s)}
                  >
                    {saved ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                    {saved ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
