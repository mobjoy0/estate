"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowUp, X, Loader2, Wand2 } from "lucide-react";
import { runAiQuery, SUGGESTED_PROMPTS, type AiResult } from "@/lib/data/ai";
import { useCityStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);

  const setHighlights = useCityStore((s) => s.setHighlights);
  const clearHighlights = useCityStore((s) => s.clearHighlights);
  const selectApartment = useCityStore((s) => s.selectApartment);

  const ask = (raw: string) => {
    if (!raw.trim()) return;
    setQuery(raw);
    setOpen(true);
    setLoading(true);
    setResult(null);
    // simulate model latency
    setTimeout(() => {
      const res = runAiQuery(raw);
      setResult(res);
      setHighlights(res.highlightBuildingIds);
      setLoading(false);
    }, 850);
  };

  const reset = () => {
    setOpen(false);
    setResult(null);
    setQuery("");
    clearHighlights();
  };

  return (
    <div className="pointer-events-auto absolute bottom-6 left-1/2 z-30 w-[min(640px,92vw)] -translate-x-1/2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="glass mb-3 max-h-[46vh] overflow-hidden rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4 text-aurora-cyan" />
                Aurora Intelligence
              </span>
              <button
                onClick={reset}
                className="grid h-7 w-7 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="no-scrollbar max-h-[34vh] overflow-y-auto p-4">
              {loading && (
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin text-aurora-cyan" />
                  Analysing {query ? `“${query}”` : "inventory"} across the digital twin…
                </div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-sm leading-relaxed text-white/85">
                    {result.summary}
                  </p>

                  {result.stat && (
                    <div className="flex gap-2">
                      {result.stat.map((s) => (
                        <div
                          key={s.label}
                          className="glass-soft rounded-xl px-3 py-2"
                        >
                          <div className="text-[10px] text-muted-foreground">
                            {s.label}
                          </div>
                          <div className="text-gradient font-display text-base font-semibold">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid gap-1.5">
                    {result.matches.map(({ apt, buildingName }) => (
                      <button
                        key={apt.id}
                        onClick={() => selectApartment(apt.id)}
                        className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-left transition hover:border-aurora-cyan/40 hover:bg-white/[0.06]"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">
                            {buildingName} · {apt.number}
                          </div>
                          <div className="text-[11px] text-white/50">
                            {apt.bedrooms} bd · {apt.area} m² · {apt.orientation}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">
                            {formatCurrency(apt.price, true)}
                          </div>
                          <div className="text-[10px] text-emerald-300/80">
                            {apt.roi.toFixed(1)}% ROI
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {!result && !loading && (
                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Try asking
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => ask(p)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition hover:border-aurora-cyan/40 hover:text-white"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(query);
        }}
        className="glass flex items-center gap-3 rounded-full px-4 py-2.5"
      >
        <Wand2 className="h-5 w-5 shrink-0 text-aurora-cyan" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Aurora — “3-bed sea-view under $1.5M with best ROI”"
          className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <button
          type="submit"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-blue text-aurora-ink transition hover:brightness-110"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
