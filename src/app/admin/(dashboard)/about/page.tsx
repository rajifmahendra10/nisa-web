"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface AboutData {
  title: string;
  description: string;
  photo: string;
  birth_date: string;
  height: string;
  weight: string;
  domicile: string;
}

const INITIAL: AboutData = { title: "", description: "", photo: "", birth_date: "", height: "", weight: "", domicile: "" };

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutData>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/about").then((r) => r.json()).then((r) => {
      if (r.success && r.data) setData({ ...INITIAL, ...r.data });
    });
  }, []);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMsg(result.success ? "Tersimpan!" : result.error || "Gagal menyimpan");
    setSaving(false);
  };

  const update = (key: keyof AboutData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About Section</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" value={data.title} onChange={(e) => update("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={data.description} onChange={(e) => update("description", e.target.value)} rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <ImageUpload value={data.photo} onChange={(url) => update("photo", url)} folder="about" label="Photo" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
            <input type="text" value={data.birth_date} onChange={(e) => update("birth_date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domicile</label>
            <input type="text" value={data.domicile} onChange={(e) => update("domicile", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <input type="text" value={data.height} onChange={(e) => update("height", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input type="text" value={data.weight} onChange={(e) => update("weight", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
          </div>
        </div>
        {msg && <div className={`text-sm p-2 rounded ${msg === "Tersimpan!" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{msg}</div>}
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}
