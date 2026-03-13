import Image from "next/image";
import { AboutSection } from "@/lib/types";

interface Props {
  data: AboutSection | null;
}

export default function AboutBlock({ data }: Props) {
  if (!data) return null;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-sm font-medium rounded-full mb-4">
            About Me ✨
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {data.title}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            {data.photo ? (
              <Image
                src={data.photo}
                alt="Precious Annisa"
                className="w-64 h-80 object-cover rounded-3xl shadow-xl border-4 border-pink-100"
                width={256}
                height={320}
                unoptimized
              />
            ) : (
              <div className="w-64 h-80 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-xl flex items-center justify-center">
                <span className="text-7xl">👧</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-gray-600 leading-relaxed mb-6">{data.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Born", value: data.birth_date, icon: "🎂" },
                { label: "Height", value: data.height, icon: "📏" },
                { label: "Weight", value: data.weight, icon: "⚖️" },
                { label: "Based in", value: data.domicile, icon: "📍" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-pink-50 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="font-semibold text-gray-800 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
