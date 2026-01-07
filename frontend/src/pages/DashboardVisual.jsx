import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "leaflet/dist/leaflet.css";

export default function DashboardVisual() {
  const [geoData, setGeoData] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [year, setYear] = useState(2019);

  useEffect(() => {
    fetch("/geojson/bojonegoro.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/cases/clustering?tahun=${year}`)
      .then((res) => res.json())
      .then((data) => setClusters(data));
  }, [year]);

  const getColor = (risk) => {
    switch (risk) {
      case "Tinggi":
        return "red";
      case "Sedang":
        return "orange";
      case "Rendah":
        return "green";
      default:
        return "gray";
    }
  };

  const normalize = (str) =>
    str?.toString().trim().toLowerCase().replace(/\s+/g, "");

  const styleFeature = (feature) => {
    const kecamatan = feature.properties.nama;
    const cluster = clusters.find(
      (c) => normalize(c.kecamatan) === normalize(kecamatan)
    );
    const risk = cluster ? cluster.risk_label : null;

    return {
      color: "black",
      weight: 1,
      fillColor: getColor(risk),
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature, layer) => {
    const kecamatanGeo = normalize(feature.properties.nama);
    const cluster = clusters.find(
      (c) => normalize(c.kecamatan) === kecamatanGeo
    );

    if (cluster) {
      layer.bindPopup(`
        <div style="font-size: 14px;">
          <b>Wilayah:</b> ${feature.properties.nama}<br/>
          <b>Jumlah Kasus:</b> ${cluster.jumlah_kasus}<br/>
          <b>Meninggal:</b> ${cluster.meninggal}<br/>
          <b>Kepadatan Penduduk:</b> ${cluster.kepadatan_penduduk}<br/>
          <b>Sanitasi:</b> ${cluster.sanitasi}<br/>
          <b>Curah Hujan:</b> ${cluster.curah_hujan}<br/>
          <b>Kategori Risiko:</b> ${cluster.risk_label}
        </div>
      `);
    }
  };

  const colorMap = {
    jumlah_kasus: "rgba(255, 99, 132, 0.7)",
    meninggal: "rgba(54, 162, 235, 0.7)",
    kepadatan_penduduk: "rgba(255, 206, 86, 0.7)",
    curah_hujan: "rgba(75, 192, 192, 0.7)",
    sanitasi: "rgba(153, 102, 255, 0.7)",
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-4">
        Visualisasi Risiko DBD di Kabupaten Bojonegoro
      </h1>

      {/* Filter Tahun */}
      <div className="flex justify-center mb-4">
        <label className="mr-2">Pilih Tahun:</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-black border p-2 rounded"
        >
          {[2019, 2020, 2021, 2022, 2023].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Layout Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Peta */}
        <div className="relative">
          <MapContainer
            style={{ height: "70vh", width: "100%" }}
            center={[-7.15, 111.88]}
            zoom={10}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData && (
              <GeoJSON
                data={geoData}
                style={styleFeature}
                onEachFeature={onEachFeature}
              />
            )}
          </MapContainer>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white text-black shadow-md rounded px-4 py-2 text-sm flex gap-4">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-red-500 inline-block rounded"></span>
              <span>Tinggi</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-orange-500 inline-block rounded"></span>
              <span>Sedang</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-green-500 inline-block rounded"></span>
              <span>Rendah</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Statistik Tiap Kecamatan</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={clusters}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kecamatan" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="jumlah_kasus" fill={colorMap.jumlah_kasus} />
              <Bar dataKey="meninggal" fill={colorMap.meninggal} />
              <Bar dataKey="kepadatan_penduduk" fill={colorMap.kepadatan_penduduk} />
              <Bar dataKey="sanitasi" fill={colorMap.sanitasi} />
              <Bar dataKey="curah_hujan" fill={colorMap.curah_hujan} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
