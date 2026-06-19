"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hexagon } from "lucide-react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#05070d]"
        >
          <div className="bg-radial-glow absolute inset-0" />
          <div className="bg-grid mask-fade-b absolute inset-0 opacity-40" />

          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative grid h-24 w-24 place-items-center"
            >
              <Hexagon className="h-24 w-24 text-aurora-cyan/30" strokeWidth={0.8} />
              <Hexagon
                className="absolute h-16 w-16 text-aurora-blue/60"
                strokeWidth={1}
              />
            </motion.div>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 h-3 w-3 -translate-y-12 rounded-full bg-aurora-cyan shadow-[0_0_20px_4px_rgba(94,234,212,0.8)]"
            />

            <div className="mt-10 text-center">
              <div className="font-display text-2xl font-semibold tracking-[0.2em] text-white">
                AURORA
              </div>
              <div className="mt-1 text-[11px] tracking-[0.4em] text-white/40">
                CONSTRUCTING DIGITAL TWIN
              </div>
            </div>

            <div className="mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-blue"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 font-mono text-[11px] text-white/40">
              {progress}% · rendering {Math.round(progress * 0.3)} structures
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
