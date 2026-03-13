import Image from "next/image";
import { HeroSection } from "@/lib/types";

interface Props {
  data: HeroSection | null;
  settings: Record<string, string>;
}

export default function HeroBlock({ data, settings }: Props) {
  if (!data) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-60">✨</div>
      <div className="absolute top-20 right-20 text-3xl animate-float opacity-40" style={{ animationDelay: "0.5s" }}>⭐</div>
      <div className="absolute bottom-20 left-20 text-2xl animate-float opacity-50" style={{ animationDelay: "1s" }}>🌸</div>
      <div className="absolute top-1/3 right-10 text-2xl animate-sparkle opacity-40">💖</div>
      <div className="absolute bottom-40 right-1/4 text-3xl animate-float opacity-30" style={{ animationDelay: "1.5s" }}>🦋</div>

      {/* Gradient circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 py-20">
        {/* Logo at top */}
        {settings.site_logo && (
          <div className="flex justify-center mb-8">
            <Image
              src={settings.site_logo}
              alt={settings.site_name || "Annisa Dalimunthe"}
              width={280}
              height={100}
              className="h-20 w-auto object-contain drop-shadow-md"
              unoptimized
              priority
            />
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            {/* Badge */}
            <div className="inline-block px-5 py-2 bg-white/80 rounded-full shadow-md mb-6">
              <span className="text-sm font-medium text-pink-600">{data.badge_text}</span>
            </div>

            {/* Title with Crown */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-gray-700">{data.title_line1}</span>
              <br />
              <span className="relative inline-block text-pink-500">
                {/* Crown SVG above the name */}
                <svg
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-12 animate-crown-glow"
                  viewBox="0 0 64 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 40L12 16L24 28L32 4L40 28L52 16L60 40H4Z"
                    fill="url(#crownGrad)"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="14" r="3" fill="#f472b6" />
                  <circle cx="32" cy="2" r="3" fill="#ec4899" />
                  <circle cx="52" cy="14" r="3" fill="#f472b6" />
                  {/* Sparkle gems */}
                  <circle cx="20" cy="36" r="2" fill="#fde047" className="animate-sparkle" />
                  <circle cx="32" cy="34" r="2.5" fill="#fde047" className="animate-sparkle" style={{ animationDelay: "0.3s" }} />
                  <circle cx="44" cy="36" r="2" fill="#fde047" className="animate-sparkle" style={{ animationDelay: "0.6s" }} />
                  <defs>
                    <linearGradient id="crownGrad" x1="4" y1="4" x2="60" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f9a8d4" />
                      <stop offset="0.5" stopColor="#ec4899" />
                      <stop offset="1" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
                {data.title_line2}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400">
                {data.title_line3}
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={data.cta_link1}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {data.cta_text1} 🎬
              </a>
              <a
                href={data.cta_link2}
                className="px-8 py-3 border-2 border-pink-300 text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-all"
              >
                {data.cta_text2} 🎵
              </a>
            </div>

            {/* Social tagline */}
            <p className="mt-6 text-sm text-gray-400">
              {settings.site_tagline}
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center z-10">
            <div className="relative">
              {/* Pink glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-30 scale-110" />

              {data.hero_image ? (
                <Image
                  src={data.hero_image}
                  alt={settings.site_name || "Precious Annisa"}
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white shadow-2xl"
                  width={400}
                  height={400}
                  unoptimized
                />
              ) : (
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                  <span className="text-8xl">👑</span>
                </div>
              )}

              {/* Floating crown badge */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl">👑</span>
              </div>

              {/* Sparkle decorations */}
              <div className="absolute bottom-4 -left-4 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center shadow-md animate-sparkle">
                <span className="text-lg">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
