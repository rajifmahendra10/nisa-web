import { Talent } from "@/lib/types";

interface Props {
  talents: Talent[];
}

export default function TalentsBlock({ talents }: Props) {
  if (talents.length === 0) return null;

  return (
    <section id="talents" className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white text-pink-600 text-sm font-medium rounded-full mb-4 shadow-sm">
            What I Do ⭐
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Multi-Talented Star
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-3">{talent.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{talent.title}</h3>
              <p className="text-sm text-gray-500">{talent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
