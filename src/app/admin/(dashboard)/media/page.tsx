"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface MediaItem {
  id: number;
  media_name: string;
  url: string;
  logo: string;
  sort_order: number;
  is_active: number;
}

const EMPTY: Omit<MediaItem, "id"> = { media_name: "", url: "", logo: "", sort_order: 0, is_active: 1 };

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState<Partial<MediaItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/media").then(r => r.json()).then(r => {
      if (r.success) setItems(r.data);
    });
  }, []);

  const reload = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    if (data.success) setItems(data.data);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const res = await fetch(isNew ? "/api/media" : `/api/media/${editing.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if ((await res.json()).success) { setEditing(null); reload(); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus media ini?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Media Coverage</h1>
        <button onClick={() => setEditing({ ...EMPTY })}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg">
          + Tambah Media
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editing.id ? "Edit Media" : "Tambah Media"}</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Media Name</label>
            <input type="text" value={editing.media_name || ""} onChange={(e) => setEditing({ ...editing, media_name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input type="url" value={editing.url || ""} onChange={(e) => setEditing({ ...editing, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-gray-800" />
          </div>
          <ImageUpload value={editing.logo || ""} onChange={(url) => setEditing({ ...editing, logo: url })} folder="media" label="Logo" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input type="number" value={editing.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg text-gray-800" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={editing.is_active === 1}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked ? 1 : 0 })} />
                Active
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg">Batal</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Media Name</th>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{item.media_name}</td>
                <td className="px-4 py-3 text-gray-500">{item.sort_order}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(item)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">Hapus</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Belum ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
