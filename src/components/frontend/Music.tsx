"use client";
import { useState } from "react";
import Image from "next/image";
import { Music } from "@/lib/types";

interface Props {
  music: Music[];
}

export default function MusicBlock({ music }: Props) {
  const [showLyrics, setShowLyrics] = useState(false);
  if (music.length === 0) return null;

  const latest = music.find((m) => m.is_latest) || music[0];

  return (
    <section id="music" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-purple-600 text-sm font-medium rounded-full mb-4 shadow-sm">
            Music 🎵
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Latest Release
          </h2>
        </div>

        {latest && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Cover */}
              <div className="lg:w-1/3 relative">
                {latest.cover_image ? (
                  <Image
                    src={latest.cover_image}
                    alt={latest.title}
                    className="w-full h-64 lg:h-full object-cover"
                    width={400}
                    height={300}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-64 lg:h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                    <span className="text-7xl">🎵</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                  NEW RELEASE
                </div>
              </div>

              {/* Info */}
              <div className="lg:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  &quot;{latest.title}&quot;
                </h3>
                <p className="text-pink-500 font-medium mb-4">{latest.label}</p>

                {latest.composer && (
                  <div className="bg-purple-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Composed by</p>
                    <p className="font-semibold text-gray-800">{latest.composer}</p>
                    {latest.composer_info && (
                      <p className="text-sm text-gray-500 mt-1">{latest.composer_info}</p>
                    )}
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-6">{latest.description}</p>

                {/* Lyrics */}
                {latest.lyrics && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowLyrics(!showLyrics)}
                      className="flex items-center gap-2 text-purple-600 font-medium text-sm hover:text-purple-800 transition-colors"
                    >
                      <span>🎶</span>
                      {showLyrics ? "Sembunyikan Lirik" : "Lihat Lirik"}
                      <span className={`transition-transform ${showLyrics ? "rotate-180" : ""}`}>▼</span>
                    </button>
                    {showLyrics && (
                      <div className="mt-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                          {latest.lyrics}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {latest.youtube_url && (
                    <a
                      href={latest.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors text-sm"
                    >
                      ▶ YouTube
                    </a>
                  )}
                  {latest.spotify_url && (
                    <a
                      href={latest.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors text-sm"
                    >
                      🎧 Spotify
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
