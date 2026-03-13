"use client";

import { useEffect, useState } from "react";

interface Settings {
  site_name: string;
  site_tagline: string;
  contact_email: string;
  instagram_url: string;
  youtube_url: string;
  meta_description: string;
  [key: string]: string;
}

const INITIAL: Settings = {
  site_name: "",
  site_tagline: "",
  contact_email: "",
  instagram_url: "",
  youtube_url: "",
  meta_description: "",
};

export default function SettingsAdminPage() {
  const [data, setData] = useState<Settings>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((r) => {
      if (r.success) setData({ ...INITIAL, ...r.data });
    });
  }, []);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMsg(result.success ? "Tersimpan!" : result.error || "Gagal menyimpan");
    setSaving(false);
  };

  const update = (key: string, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input type="text" value={data.site_name} onChange={(e) => update("site_name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input type="text" value={data.site_tagline} onChange={(e) => update("site_tagline", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input type="email" value={data.contact_email} onChange={(e) => update("contact_email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
          <input type="url" value={data.instagram_url} onChange={(e) => update("instagram_url", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
          <input type="url" value={data.youtube_url} onChange={(e) => update("youtube_url", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
          <textarea value={data.meta_description} onChange={(e) => update("meta_description", e.target.value)} rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-gray-800" />
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
