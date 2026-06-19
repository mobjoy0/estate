"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Radar,
  BrainCircuit,
  Gauge,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const FEATURES = [
  {
    icon: Boxes,
    title: "Living Digital Twin",
    body: "Every tower, road and utility mirrored in real time — a 1:1 model that updates as the city breathes.",
  },
  {
    icon: BrainCircuit,
    title: "AI Property Concierge",
    body: "Natural-language search across inventory, finance and lifestyle — answers in milliseconds, not days.",
  },
  {
    icon: Radar,
    title: "Live Sales Telemetry",
    body: "Reservation velocity, footfall and demand heatmaps streamed straight into the developer console.",
  },
  {
    icon: Gauge,
    title: "Investment Engine",
    body: "Per-unit ROI, yield and appreciation modelled continuously against live market signals.",
  },
  {
    icon: Leaf,
    title: "Net-Zero Intelligence",
    body: "District-wide energy mesh tracks carbon, solar yield and grid load across the whole twin.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Grade",
    body: "Role-based access, audit trails and SSO — built for sovereign funds and global developers.",
  },
];

export function Technology() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="Platform"
        title="Not a listings site —"
        highlight="an operating system for cities."
        description="Aurora unifies 3D visualisation, AI and live market data into one cinematic surface that scales from a single asset to an entire metropolis."
        align="center"
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-6 transition hover:bg-card/70"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-aurora-cyan/10 blur-3xl transition group-hover:bg-aurora-cyan/20" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-aurora-cyan">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {f.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
