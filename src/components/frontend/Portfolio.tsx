import Image from "next/image";
import { Portfolio } from "@/lib/types";

interface Props {
  portfolios: Portfolio[];
}

export default function PortfolioBlock({ portfolios }: Props) {
  if (portfolios.length === 0) return null;

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-sm font-medium rounded-full mb-4">
            My Work 📂
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Commercial Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolios.map((item) => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                  width={400}
                  height={224}
                  unoptimized
                />
              ) : (
                <div className="w-full h-56 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                  <span className="text-5xl opacity-50">🎬</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white text-pink-600 text-xs font-medium rounded-full border border-pink-200"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
