"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers3, ChevronDown } from "lucide-react";
import { LAYERS } from "@/lib/data/layers";
import { useCityStore } from "@/lib/store";

export function LayerControls() {
  const activeLayers = useCityStore((s) => s.activeLayers);
  const toggleLayer = useCityStore((s) => s.toggleLayer);
  const [open, setOpen] = useState(true);

  return (
    <div className="pointer-events-auto absolute bottom-6 left-4 z-30">
      <div className="glass overflow-hidden rounded-2xl">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-8 px-4 py-3"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-white">
            <Layers3 className="h-4 w-4 text-aurora-cyan" />
            Map Layers
            {activeLayers.size > 0 && (
              <span className="rounded-full bg-aurora-cyan/20 px-1.5 text-[10px] text-aurora-cyan">
                {activeLayers.size}
              </span>
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-white/50 transition-transform ${
              open ? "" : "-rotate-90"
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid w-[230px] grid-cols-1 gap-1 p-2 pt-0">
                {LAYERS.map((layer) => {
                  const active = activeLayers.has(layer.id);
                  const Icon = layer.icon;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => toggleLayer(layer.id)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 transition ${
                        active
                          ? "border-white/15 bg-white/[0.08]"
                          : "border-transparent hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm text-white/85">
                        <span
                          className="grid h-7 w-7 place-items-center rounded-lg"
                          style={{
                            background: `${layer.color}1f`,
                            color: layer.color,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {layer.label}
                      </span>
                      <span
                        className={`relative h-5 w-9 rounded-full border transition ${
                          active ? "border-transparent" : "border-white/15 bg-white/5"
                        }`}
                        style={active ? { background: layer.color } : undefined}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                            active ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
