import React, { useState } from "react";

export default function DataTable({ data, fetchData, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 👈 jumlah data per halaman

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus data ini?")) return;
    await fetch(`http://localhost:8000/cases/${id}`, { method: "DELETE" });
    fetchData();
  };

  // 📌 Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Kasus DBD</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">No</th> {/* 👈 Kolom Nomor */}
            <th className="p-2 border">Kecamatan</th>
            <th className="p-2 border">Kasus</th>
            <th className="p-2 border">Meninggal</th>
            <th className="p-2 border">Kepadatan</th>
            <th className="p-2 border">Desa STBM</th>
            <th className="p-2 border">Desa SBS</th>
            <th className="p-2 border">Curah Hujan</th>
            <th className="p-2 border">Tahun</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {/* Nomor otomatis sesuai halaman */}
              <td className="p-2 border">{startIndex + index + 1}</td>

              <td className="p-2 border">{item.kecamatan}</td>
              <td className="p-2 border">{item.jumlah_kasus}</td>
              <td className="p-2 border">{item.meninggal}</td>
              <td className="p-2 border">{item.kepadatan_penduduk}</td>
              <td className="p-2 border">{item.desa_stbm}</td>
              <td className="p-2 border">{item.desa_sbs}</td>
              <td className="p-2 border">{item.curah_hujan}</td>
              <td className="p-2 border">{item.tahun}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔽 Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>

        <div className="space-x-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={currentPage === 1}
          >
            ⬅️ Prev
          </button>

          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={currentPage === totalPages}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
