import Image from "next/image";
import { MediaCoverage } from "@/lib/types";

interface Props {
  coverages: MediaCoverage[];
}

export default function MediaBlock({ coverages }: Props) {
  if (coverages.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-pink-600 text-sm font-medium rounded-full mb-4 shadow-sm">
            Press & Media 📰
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Media Coverage
          </h2>
          <p className="text-gray-500 mt-2">Featured in 80+ media outlets nationwide</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
          {coverages.map((media) => (
            <a
              key={media.id}
              href={media.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              {media.logo ? (
                <Image src={media.logo} alt={media.media_name} className="h-6 w-auto" width={100} height={24} unoptimized />
              ) : null}
              <span className="font-medium text-gray-700">{media.media_name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
