"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Layers, Boxes, Cpu, ArrowUpRight } from "lucide-react";
import { DEVELOPER_PROJECTS } from "@/lib/data/properties";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORIES = [
  { id: "All", icon: Boxes },
  { id: "Residential", icon: Building },
  { id: "Commercial", icon: Layers },
  { id: "Mixed-Use", icon: Boxes },
  { id: "Smart District", icon: Cpu },
];

export function DeveloperShowcase() {
  const [active, setActive] = useState("All");
  const projects =
    active === "All"
      ? DEVELOPER_PROJECTS
      : DEVELOPER_PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="developments"
      className="relative mx-auto max-w-7xl px-6 py-28"
    >
      <SectionHeading
        eyebrow="Developer Console"
        title="Orchestrate an entire"
        highlight="portfolio of cities."
        description="From a single residential tower to a net-zero smart district — manage delivery, sales velocity and capital across every project in one cockpit."
        align="center"
      />

      <div className="mt-10 flex justify-center">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="flex-wrap">
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                <c.icon className="mr-1.5 h-3.5 w-3.5" />
                {c.id}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#070b14]/90 via-[#070b14]/70 to-[#070b14]/40" />
              </div>

              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="accent">{p.category}</Badge>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 max-w-sm text-sm text-white/60">
                      {p.blurb}
                    </p>
                  </div>
                  <Badge
                    variant={
                      p.status === "Selling"
                        ? "success"
                        : p.status === "Under Construction"
                        ? "warning"
                        : "gold"
                    }
                  >
                    {p.status}
                  </Badge>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Metric label="Units" value={p.units.toLocaleString()} />
                  <Metric label="GDV" value={p.value} />
                  <Metric label="Delivery" value={`${p.progress}%`} />
                </div>

                <div className="mt-4">
                  <Progress value={p.progress} />
                </div>

                <button className="mt-5 inline-flex items-center gap-1.5 text-sm text-aurora-cyan transition hover:gap-2.5">
                  Open project console <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-soft rounded-xl px-3 py-2.5">
      <div className="text-[10px] text-white/45">{label}</div>
      <div className="font-display text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
