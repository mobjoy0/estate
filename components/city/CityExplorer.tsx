"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MousePointerClick, Orbit, Sparkles, ChevronDown } from "lucide-react";
import { CITY_STATS } from "@/lib/data/city";
import { formatNumber } from "@/lib/utils";
import { BuildingPanel } from "@/components/panels/BuildingPanel";
import { ApartmentPanel } from "@/components/panels/ApartmentPanel";
import { AIAssistant } from "@/components/panels/AIAssistant";
import { LayerControls } from "@/components/panels/LayerControls";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#05070d]" />,
});

const heroStats = [
  { label: "Smart Towers", value: formatNumber(CITY_STATS.towers) },
  { label: "Districts", value: formatNumber(CITY_STATS.districts) },
  { label: "Residences", value: formatNumber(CITY_STATS.totalUnits) },
  { label: "Avg. Occupancy", value: `${CITY_STATS.avgOccupancy}%` },
];

export function CityExplorer() {
  return (
    <section id="explore" className="relative h-screen w-full overflow-hidden">
      {/* 3D city */}
      <div className="absolute inset-0">
        <CityScene />
      </div>

      {/* Cinematic vignette + frame */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_100%_at_50%_0%,transparent_55%,rgba(5,7,13,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_180px_40px_rgba(5,7,13,0.9)]" />

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Hero copy */}
        <div className="absolute left-6 top-28 max-w-xl md:left-10 md:top-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] tracking-wider text-white/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-aurora-cyan" />
              LIVE DIGITAL TWIN · AURORA CITY
            </span>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl">
              Explore the city
              <br />
              <span className="text-gradient">before it exists.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              A real-time, navigable digital twin of an entire smart city —
              orbit districts, walk into towers, and reserve residences with
              live investment intelligence.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span className="flex items-center gap-1.5">
                <Orbit className="h-4 w-4 text-aurora-cyan" /> Drag to orbit
              </span>
              <span className="flex items-center gap-1.5">
                <MousePointerClick className="h-4 w-4 text-aurora-blue" /> Click a tower
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute right-6 top-28 hidden gap-3 md:flex md:top-32 lg:right-10"
        >
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl">
            {heroStats.map((s) => (
              <div key={s.label} className="px-5 py-4">
                <div className="font-display text-2xl font-semibold text-white">
                  {s.value}
                </div>
                <div className="text-[11px] tracking-wide text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating panels & controls live in the HUD layer */}
        <BuildingPanel />
        <LayerControls />
        <AIAssistant />

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 right-6 hidden items-center gap-2 text-[11px] text-white/40 lg:flex"
        >
          Scroll to explore the platform
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>

      {/* Apartment modal sits above everything */}
      <ApartmentPanel />
    </section>
  );
}
