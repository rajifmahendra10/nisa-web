import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCounts() {
  const [talents] = await query<[{ c: number }]>("SELECT COUNT(*) as c FROM talents");
  const [portfolios] = await query<[{ c: number }]>("SELECT COUNT(*) as c FROM portfolios");
  const [music] = await query<[{ c: number }]>("SELECT COUNT(*) as c FROM music");
  const [media] = await query<[{ c: number }]>("SELECT COUNT(*) as c FROM media_coverages");
  const [gallery] = await query<[{ c: number }]>("SELECT COUNT(*) as c FROM gallery");
  return {
    talents: talents?.c || 0,
    portfolios: portfolios?.c || 0,
    music: music?.c || 0,
    media: media?.c || 0,
    gallery: gallery?.c || 0,
  };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Talents", value: counts.talents, icon: "⭐", color: "bg-yellow-100 text-yellow-700" },
    { label: "Portfolios", value: counts.portfolios, icon: "📂", color: "bg-blue-100 text-blue-700" },
    { label: "Music", value: counts.music, icon: "🎵", color: "bg-pink-100 text-pink-700" },
    { label: "Media Coverage", value: counts.media, icon: "📰", color: "bg-green-100 text-green-700" },
    { label: "Gallery", value: counts.gallery, icon: "🖼️", color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`${card.color} rounded-xl p-5 flex items-center gap-4`}
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm opacity-80">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/admin/hero", label: "Edit Hero", icon: "🏠" },
            { href: "/admin/about", label: "Edit About", icon: "👤" },
            { href: "/admin/music", label: "Manage Music", icon: "🎵" },
            { href: "/admin/settings", label: "Site Settings", icon: "⚙️" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
