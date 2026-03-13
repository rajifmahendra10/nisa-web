"use client";

import { useEffect, useState } from "react";

interface StatRibbon { id: number; label: string; value: string; sort_order: number; }
interface IGStat { id: number; label: string; value: string; sub_label: string; icon: string; color: string; sort_order: number; }

export default function StatsAdminPage() {
  const [ribbons, setRibbons] = useState<StatRibbon[]>([]);
  const [igStats, setIgStats] = useState<IGStat[]>([]);
  const [editRibbon, setEditRibbon] = useState<Partial<StatRibbon> | null>(null);
  const [editIG, setEditIG] = useState<Partial<IGStat> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/stats-ribbon").then(r => r.json()).then(r => {
      if (r.success) setRibbons(r.data);
    });
    fetch("/api/instagram-stats").then(r => r.json()).then(r => {
      if (r.success) setIgStats(r.data);
    });
  }, []);

  const reloadRibbons = async () => {
    const res = await fetch("/api/stats-ribbon");
    const data = await res.json();
    if (data.success) setRibbons(data.data);
  };

  const reloadIG = async () => {
    const res = await fetch("/api/instagram-stats");
    const data = await res.json();
    if (data.success) setIgStats(data.data);
  };

  const saveRibbon = async () => {
    if (!editRibbon) return;
    setSaving(true);
    const isNew = !editRibbon.id;
    const res = await fetch(isNew ? "/api/stats-ribbon" : `/api/stats-ribbon/${editRibbon.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editRibbon),
    });
    if ((await res.json()).success) { setEditRibbon(null); reloadRibbons(); }
    setSaving(false);
  };

  const deleteRibbon = async (id: number) => {
    if (!confirm("Hapus stat ini?")) return;
    await fetch(`/api/stats-ribbon/${id}`, { method: "DELETE" });
    reloadRibbons();
  };

  const saveIG = async () => {
    if (!editIG) return;
    setSaving(true);
    const isNew = !editIG.id;
    const res = await fetch(isNew ? "/api/instagram-stats" : `/api/instagram-stats/${editIG.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editIG),
    });
    if ((await res.json()).success) { setEditIG(null); reloadIG(); }
    setSaving(false);
  };

  const deleteIG = async (id: number) => {
    if (!confirm("Hapus stat ini?")) return;
    await fetch(`/api/instagram-stats/${id}`, { method: "DELETE" });
    reloadIG();
  };

  return (
    <div className="max-w-3xl space-y-10">
      {/* Stats Ribbon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Stats Ribbon</h1>
          <button onClick={() => setEditRibbon({ label: "", value: "", sort_order: 0 })}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg">+ Tambah</button>
        </div>
        {editRibbon && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" value={editRibbon.label || ""} onChange={(e) => setEditRibbon({ ...editRibbon, label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input type="text" value={editRibbon.value || ""} onChange={(e) => setEditRibbon({ ...editRibbon, value: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input type="number" value={editRibbon.sort_order || 0} onChange={(e) => setEditRibbon({ ...editRibbon, sort_order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={saveRibbon} disabled={saving} className="px-4 py-2 bg-pink-500 text-white text-sm rounded-lg disabled:opacity-50">Simpan</button>
              <button onClick={() => setEditRibbon(null)} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg">Batal</button>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Label</th>
                <th className="text-left px-4 py-3">Value</th>
                <th className="text-left px-4 py-3">Order</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ribbons.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{r.label}</td>
                  <td className="px-4 py-3 font-bold text-pink-600">{r.value}</td>
                  <td className="px-4 py-3 text-gray-500">{r.sort_order}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => setEditRibbon(r)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => deleteRibbon(r.id)} className="text-red-500 hover:text-red-700">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instagram Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Instagram Stats</h2>
          <button onClick={() => setEditIG({ label: "", value: "", sub_label: "", icon: "📊", color: "pink", sort_order: 0 })}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg">+ Tambah</button>
        </div>
        {editIG && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" value={editIG.label || ""} onChange={(e) => setEditIG({ ...editIG, label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input type="text" value={editIG.value || ""} onChange={(e) => setEditIG({ ...editIG, value: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Label</label>
                <input type="text" value={editIG.sub_label || ""} onChange={(e) => setEditIG({ ...editIG, sub_label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input type="text" value={editIG.icon || ""} onChange={(e) => setEditIG({ ...editIG, icon: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select value={editIG.color || "pink"} onChange={(e) => setEditIG({ ...editIG, color: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800">
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input type="number" value={editIG.sort_order || 0} onChange={(e) => setEditIG({ ...editIG, sort_order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-800" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={saveIG} disabled={saving} className="px-4 py-2 bg-pink-500 text-white text-sm rounded-lg disabled:opacity-50">Simpan</button>
              <button onClick={() => setEditIG(null)} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg">Batal</button>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Icon</th>
                <th className="text-left px-4 py-3">Label</th>
                <th className="text-left px-4 py-3">Value</th>
                <th className="text-left px-4 py-3">Sub</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {igStats.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-lg">{s.icon}</td>
                  <td className="px-4 py-3 text-gray-800">{s.label}</td>
                  <td className="px-4 py-3 font-bold text-pink-600">{s.value}</td>
                  <td className="px-4 py-3 text-gray-500">{s.sub_label}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => setEditIG(s)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => deleteIG(s.id)} className="text-red-500 hover:text-red-700">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
