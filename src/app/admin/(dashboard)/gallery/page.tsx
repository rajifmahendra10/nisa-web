"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  alt_text: string;
  category: string;
  sort_order: number;
  is_active: number;
}

const EMPTY: Omit<GalleryItem, "id"> = {
  title: "", image_url: "", alt_text: "", category: "general", sort_order: 0, is_active: 1,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/gallery").then(r => r.json()).then(r => {
      if (r.success) setItems(r.data);
    });
  }, []);

  const reload = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    if (data.success) setItems(data.data);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const res = await fetch(isNew ? "/api/gallery" : `/api/gallery/${editing.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if ((await res.json()).success) { setEditing(null); reload(); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus gambar ini?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
        <button onClick={() => setEditing({ ...EMPTY })}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg">
          + Tambah Gambar
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editing.id ? "Edit Gambar" : "Tambah Gambar"}</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-gray-800" />
          </div>
          <ImageUpload value={editing.image_url || ""} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="gallery" label="Image" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
              <input type="text" value={editing.alt_text || ""} onChange={(e) => setEditing({ ...editing, alt_text: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={editing.category || "general"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-gray-800">
                <option value="general">General</option>
                <option value="photoshoot">Photoshoot</option>
                <option value="event">Event</option>
                <option value="behind-the-scenes">Behind the Scenes</option>
              </select>
            </div>
          </div>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group relative">
            {item.image_url ? (
              <Image src={item.image_url} alt={item.alt_text || item.title} className="w-full h-40 object-cover" width={400} height={160} unoptimized />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">{item.title || "Untitled"}</p>
              <p className="text-xs text-gray-400 capitalize">{item.category}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button onClick={() => setEditing(item)} className="bg-white/90 text-blue-500 p-1.5 rounded-lg text-xs shadow">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="bg-white/90 text-red-500 p-1.5 rounded-lg text-xs shadow">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">Belum ada gambar</div>
      )}
    </div>
  );
}
