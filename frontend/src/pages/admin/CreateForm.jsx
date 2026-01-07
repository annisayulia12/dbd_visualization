import { useState } from "react";
import axios from "axios";

export default function CreateForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    kecamatan: "",
    jumlah_kasus: "",
    meninggal: "",
    kepadatan_penduduk: "",
    desa_stbm: "",
    desa_sbs: "",
    curah_hujan: "",
    tahun: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/cases/", form);
      alert("✅ Data berhasil ditambahkan!");
      setForm({
        kecamatan: "",
        jumlah_kasus: "",
        meninggal: "",
        kepadatan_penduduk: "",
        desa_stbm: "",
        desa_sbs: "",
        curah_hujan: "",
        tahun: "",
      });
      onSuccess && onSuccess(); // refresh list & kembali ke data list
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data!");
    }
  };

 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md w-full bg-white p-6 rounded shadow"
    >
      <h2 className="text-lg font-semibold text-blue-600 mb-2">
        Tambah Data Baru
      </h2>

      <input
        name="kecamatan"
        value={form.kecamatan}
        onChange={handleChange}
        placeholder="Kecamatan"
        className="w-full border p-2 rounded"
      />

      <input
        name="jumlah_kasus"
        type="number"
        value={form.jumlah_kasus}
        onChange={handleChange}
        placeholder="Jumlah Kasus"
        className="w-full border p-2 rounded"
      />

      <input
        name="meninggal"
        type="number"
        value={form.meninggal}
        onChange={handleChange}
        placeholder="Jumlah Meninggal"
        className="w-full border p-2 rounded"
      />

      <input
        name="kepadatan_penduduk"
        type="number"
        value={form.kepadatan_penduduk}
        onChange={handleChange}
        placeholder="Kepadatan Penduduk"
        className="w-full border p-2 rounded"
      />

      <input
        name="desa_stbm"
        type="number"
        value={form.desa_stbm}
        onChange={handleChange}
        placeholder="Jumlah Desa STBM"
        className="w-full border p-2 rounded"
      />

      <input
        name="desa_sbs"
        type="number"
        value={form.desa_sbs}
        onChange={handleChange}
        placeholder="Jumlah Desa SBS"
        className="w-full border p-2 rounded"
      />

      <input
        name="curah_hujan"
        type="number"
        value={form.curah_hujan}
        onChange={handleChange}
        placeholder="Curah Hujan"
        className="w-full border p-2 rounded"
      />

      <input
        name="tahun"
        type="number"
        value={form.tahun}
        onChange={handleChange}
        placeholder="Tahun"
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
          Save
        </button>
      </div>
    </form>
  </div>
);

}
