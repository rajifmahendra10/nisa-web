"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface HeroData {
  badge_text: string;
  title_line1: string;
  title_line2: string;
  title_line3: string;
  subtitle: string;
  cta_text1: string;
  cta_link1: string;
  cta_text2: string;
  cta_link2: string;
  hero_image: string;
}

const INITIAL: HeroData = {
  badge_text: "",
  title_line1: "",
  title_line2: "",
  title_line3: "",
  subtitle: "",
  cta_text1: "",
  cta_link1: "",
  cta_text2: "",
  cta_link2: "",
  hero_image: "",
};

export default function HeroAdminPage() {
  const [data, setData] = useState<HeroData>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((r) => {
        if (r.success && r.data) setData({ ...INITIAL, ...r.data });
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMsg(result.success ? "Tersimpan!" : result.error || "Gagal menyimpan");
    setSaving(false);
  };

  const update = (key: keyof HeroData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hero Section</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
          <input
            type="text"
            value={data.badge_text}
            onChange={(e) => update("badge_text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none text-gray-800"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 1</label>
            <input type="text" value={data.title_line1} onChange={(e) => update("title_line1", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 2</label>
            <input type="text" value={data.title_line2} onChange={(e) => update("title_line2", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 3</label>
            <input type="text" value={data.title_line3} onChange={(e) => update("title_line3", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 1 Text</label>
            <input type="text" value={data.cta_text1} onChange={(e) => update("cta_text1", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 1 Link</label>
            <input type="text" value={data.cta_link1} onChange={(e) => update("cta_link1", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 2 Text</label>
            <input type="text" value={data.cta_text2} onChange={(e) => update("cta_text2", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 2 Link</label>
            <input type="text" value={data.cta_link2} onChange={(e) => update("cta_link2", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
        </div>

        <ImageUpload
          value={data.hero_image}
          onChange={(url) => update("hero_image", url)}
          folder="hero"
          label="Hero Image"
        />

        {msg && (
          <div className={`text-sm p-2 rounded ${msg === "Tersimpan!" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {msg}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}
