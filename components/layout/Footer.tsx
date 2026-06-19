import { Hexagon } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: ["Digital Twin", "AI Concierge", "Analytics", "Developer Console"],
  },
  {
    title: "Districts",
    links: ["Aurora Marina", "Skyline Quarter", "Garden Terraces", "Innovation Mile"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center">
              <Hexagon className="h-9 w-9 text-aurora-cyan" strokeWidth={1.2} />
              <span className="absolute h-2 w-2 rounded-full bg-aurora-cyan" />
            </span>
            <div className="font-display text-lg font-semibold tracking-tight text-white">
              AURORA
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            The cinematic digital-twin platform for the world&apos;s most
            ambitious developments. A concept experience.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-[11px] text-white/40 md:flex-row">
        <span>© {new Date().getFullYear()} Aurora Digital Twin · Concept demo. Not a real product.</span>
        <span className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <span className="text-white/30">Built with Next.js · R3F · Three.js</span>
        </span>
      </div>
    </footer>
  );
}
