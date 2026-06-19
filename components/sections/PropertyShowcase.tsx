"use client";

import { motion } from "framer-motion";
import { BedDouble, Bath, Ruler, TrendingUp, ArrowUpRight } from "lucide-react";
import { SHOWCASE_PROPERTIES } from "@/lib/data/properties";
import { formatCurrency } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PropertyShowcase() {
  return (
    <section id="residences" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Signature Collection"
          title="Residences that"
          highlight="redefine the skyline."
          description="A curated portfolio of trophy assets — each with live availability, ROI projections and immersive tours."
        />
        <Button variant="outline" className="hidden md:inline-flex">
          View all 142 listings <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SHOWCASE_PROPERTIES.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/50"
          >
            <div className="relative h-60 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge variant="gold">{p.tag}</Badge>
                <Badge
                  variant={p.availability === "Available" ? "success" : "warning"}
                >
                  {p.availability}
                </Badge>
              </div>
              <div className="absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-black/50 px-2.5 py-1 text-[11px] text-emerald-300 backdrop-blur">
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {p.roi}% ROI
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-aurora-cyan">
                {p.location}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold text-white">
                {p.name}
              </h3>

              <div className="mt-3 flex items-center gap-4 text-xs text-white/55">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4" /> {p.beds} bd
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" /> {p.baths} ba
                </span>
                <span className="flex items-center gap-1.5">
                  <Ruler className="h-4 w-4" /> {p.area} m²
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <div>
                  <div className="text-[10px] text-white/40">Guide price</div>
                  <div className="font-display text-xl font-semibold text-white">
                    {formatCurrency(p.price, true)}
                  </div>
                </div>
                <Button size="sm" variant="glass">
                  Details <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition group-hover:ring-aurora-cyan/30" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
