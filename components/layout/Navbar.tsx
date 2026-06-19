"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "Residences", href: "#residences" },
  { label: "Analytics", href: "#analytics" },
  { label: "Developments", href: "#developments" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "glass" : "border border-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2.5 pl-2">
          <span className="relative grid h-9 w-9 place-items-center">
            <Hexagon className="h-9 w-9 text-aurora-cyan" strokeWidth={1.2} />
            <span className="absolute h-2 w-2 rounded-full bg-aurora-cyan shadow-[0_0_12px_2px_rgba(94,234,212,0.8)]" />
          </span>
          <div className="leading-none">
            <div className="font-display text-lg font-semibold tracking-tight text-white">
              AURORA
            </div>
            <div className="text-[10px] tracking-[0.3em] text-white/40">
              DIGITAL TWIN
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-1">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button variant="gold" size="sm">
            Request Access
          </Button>
          <button className="grid h-9 w-9 place-items-center rounded-full text-white/70 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
