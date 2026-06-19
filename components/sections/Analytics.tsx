"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import {
  APPRECIATION_FORECAST,
  ASSET_MIX,
  DISTRICT_GROWTH,
  KPI_STATS,
  OCCUPANCY_TREND,
} from "@/lib/data/analytics";
import { SectionHeading } from "./SectionHeading";
import { Card } from "@/components/ui/card";

const tooltipStyle = {
  background: "rgba(10,15,27,0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
  backdropFilter: "blur(8px)",
};

export function Analytics() {
  return (
    <section id="analytics" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="bg-radial-glow pointer-events-none absolute inset-0 -z-10" />
      <SectionHeading
        eyebrow="Investment Intelligence"
        title="Market analytics built for"
        highlight="capital decisions."
        description="Live appreciation forecasts, yield curves and occupancy signals across every district — the numbers a board needs before committing."
      />

      {/* KPI row */}
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {KPI_STATS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <div className="text-[11px] text-white/50">{k.label}</div>
            <div className="mt-1.5 font-display text-2xl font-semibold text-white">
              {k.value}
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-300">
              <ArrowUpRight className="h-3 w-3" />
              {k.delta}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Appreciation forecast (spans 2) */}
        <ChartCard
          className="lg:col-span-2"
          title="Property Appreciation Forecast"
          subtitle="Indexed value · base 100 (2021)"
          badge="+158% by 2028"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={APPRECIATION_FORECAST} margin={{ left: -18, right: 6, top: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="conservative" stroke="#60a5fa" strokeWidth={1.5} fill="url(#g2)" name="Conservative" />
              <Area type="monotone" dataKey="value" stroke="#5eead4" strokeWidth={2.5} fill="url(#g1)" name="Projected" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Asset mix pie */}
        <ChartCard title="Portfolio Asset Mix" subtitle="By gross development value">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Pie
                data={ASSET_MIX}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={94}
                paddingAngle={3}
                stroke="none"
              >
                {ASSET_MIX.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ASSET_MIX.map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-[11px] text-white/60">
                <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                {a.name} · {a.value}%
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Occupancy + yield */}
        <ChartCard
          className="lg:col-span-2"
          title="Occupancy & Yield Trend"
          subtitle="Trailing 9 months"
          badge="95% peak occupancy"
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={OCCUPANCY_TREND} margin={{ left: -18, right: 6, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="occupancy" stroke="#a78bfa" strokeWidth={2.5} dot={false} name="Occupancy %" />
              <Line type="monotone" dataKey="yield" stroke="#f0b27a" strokeWidth={2.5} dot={false} name="Yield %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* District growth */}
        <ChartCard title="District Growth" subtitle="YoY capital growth %">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DISTRICT_GROWTH} margin={{ left: -22, right: 6, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="district" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="growth" radius={[6, 6, 0, 0]} name="Growth %">
                {DISTRICT_GROWTH.map((_, i) => (
                  <Cell key={i} fill={`url(#barG)`} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  subtitle,
  badge,
  className,
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <Card className={`glass h-full p-5 ${className ?? ""}`}>
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-white">{title}</h3>
            <p className="text-[11px] text-white/45">{subtitle}</p>
          </div>
          {badge && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              {badge}
            </span>
          )}
        </div>
        {children}
      </Card>
    </motion.div>
  );
}
