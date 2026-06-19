"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 px-8 py-16 text-center md:px-16 md:py-24"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-aurora-cyan/15 via-aurora-blue/10 to-aurora-violet/15" />
        <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
        <div className="absolute -left-20 top-0 -z-10 h-72 w-72 rounded-full bg-aurora-cyan/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-aurora-violet/20 blur-[100px]" />

        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] tracking-wider text-white/80">
          <Sparkles className="h-3.5 w-3.5 text-aurora-cyan" />
          PRIVATE PREVIEW
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          Show your investors the future
          <br />
          <span className="text-gradient-gold">they can walk through.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/65">
          Commission a bespoke digital twin of your development and turn every
          pitch into an unforgettable, interactive experience.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="gold" size="lg">
            Book a private demo <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="lg">
            Download the brochure
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
