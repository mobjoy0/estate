import type { Apartment } from "@/lib/data/types";

// A lightweight generated SVG floor plan that adapts to bedroom count.
export function FloorPlan({ apt }: { apt: Apartment }) {
  const rooms = Math.max(1, apt.bedrooms);
  return (
    <svg
      viewBox="0 0 200 130"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <linearGradient id="fp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* outer wall */}
      <rect
        x="6"
        y="6"
        width="188"
        height="118"
        rx="4"
        fill="url(#fp)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      {/* living + kitchen */}
      <rect x="12" y="12" width="92" height="64" stroke="rgba(94,234,212,0.5)" strokeWidth="1" />
      <line x1="12" y1="46" x2="60" y2="46" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      {/* bedrooms grid on the right */}
      {Array.from({ length: rooms }).map((_, i) => {
        const cols = rooms > 2 ? 2 : 1;
        const rws = Math.ceil(rooms / cols);
        const w = 78 / cols;
        const h = 106 / rws;
        const cx = 110 + (i % cols) * w;
        const cy = 12 + Math.floor(i / cols) * h;
        return (
          <rect
            key={i}
            x={cx}
            y={cy}
            width={w - 4}
            height={h - 4}
            stroke="rgba(96,165,250,0.5)"
            strokeWidth="1"
          />
        );
      })}
      {/* bathrooms */}
      <rect x="12" y="82" width="40" height="36" stroke="rgba(167,139,250,0.5)" strokeWidth="1" />
      {apt.bathrooms > 1 && (
        <rect x="58" y="82" width="40" height="36" stroke="rgba(167,139,250,0.5)" strokeWidth="1" />
      )}
      {/* door swing */}
      <path d="M52 124 A 12 12 0 0 0 64 112" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="20" y="40" fontSize="7" fill="rgba(255,255,255,0.5)" stroke="none">
        LIVING
      </text>
      <text x="118" y="26" fontSize="7" fill="rgba(255,255,255,0.5)" stroke="none">
        BED
      </text>
    </svg>
  );
}
