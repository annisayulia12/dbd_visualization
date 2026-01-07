import { useState, useEffect } from "react";
import axios from "axios";

export default function EditForm({ data, onSuccess, onCancel }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/cases/${form.id}`, form);
      alert("✅ Data berhasil diperbarui!");
      onSuccess(); // balik ke data list setelah berhasil
    } catch (err) {
      console.error("Gagal update data:", err);
      alert("❌ Gagal memperbarui data!");
    }
  };

  if (!form) return <p className="text-gray-500">Pilih data dulu untuk diedit.</p>;

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="space-y-3 w-full max-w-md bg-white p-5 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-2 text-blue-600 text-center">
        Edit Data Kasus
      </h3>

      {/* Input Fields */}
      <input
        name="kecamatan"
        value={form.kecamatan || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="jumlah_kasus"
        type="number"
        value={form.jumlah_kasus || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="meninggal"
        type="number"
        value={form.meninggal || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="kepadatan_penduduk"
        type="number"
        value={form.kepadatan_penduduk || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="desa_stbm"
        type="number"
        value={form.desa_stbm || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="desa_sbs"
        type="number"
        value={form.desa_sbs || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="curah_hujan"
        type="number"
        value={form.curah_hujan || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="tahun"
        type="number"
        value={form.tahun || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* Tombol Aksi */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
);

}
