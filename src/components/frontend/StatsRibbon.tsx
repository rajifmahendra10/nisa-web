import { StatsRibbon } from "@/lib/types";

interface Props {
  stats: StatsRibbon[];
}

export default function StatsRibbonBlock({ stats }: Props) {
  if (stats.length === 0) return null;

  return (
    <section className="py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-bold text-white">{stat.value}</span>
            <span className="text-white/80 text-sm">{stat.label}</span>
            <span className="text-white/40 text-lg">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
