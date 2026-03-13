import Image from "next/image";
import { GalleryItem } from "@/lib/types";

interface Props {
  items: GalleryItem[];
}

export default function GalleryBlock({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-sm font-medium rounded-full mb-4">
            Gallery 🖼️
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Precious Moments
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={item.image_url}
                alt={item.alt_text || item.title || "Gallery"}
                className="w-full object-cover group-hover:scale-105 transition-transform"
                width={400}
                height={300}
                unoptimized
              />
              {item.title && (
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-700">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
