import { InstagramStat } from "@/lib/types";

interface Props {
  stats: InstagramStat[];
}

const COLOR_MAP: Record<string, string> = {
  pink: "from-pink-400 to-pink-500",
  purple: "from-purple-400 to-purple-500",
  blue: "from-blue-400 to-blue-500",
  orange: "from-orange-400 to-orange-500",
  green: "from-green-400 to-green-500",
};

export default function InstagramBlock({ stats }: Props) {
  if (stats.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-sm font-medium rounded-full mb-4">
            Social Media 📱
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Instagram Insights
          </h2>
          <p className="text-gray-500 mt-2">Growing organically with love</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`bg-gradient-to-br ${COLOR_MAP[stat.color] || COLOR_MAP.pink} rounded-2xl p-6 text-center text-white shadow-lg hover:scale-105 transition-transform`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
              {stat.sub_label && (
                <div className="text-xs mt-1 opacity-70">{stat.sub_label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
