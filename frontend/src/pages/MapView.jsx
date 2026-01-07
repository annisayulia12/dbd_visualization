import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [year, setYear] = useState(2019);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetch("/geojson/bojonegoro.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

 useEffect(() => {
  const url =
    year == 2024
      ? `http://localhost:8000/cases/clustering/prediction?tahun=${year}`
      : `http://localhost:8000/cases/clustering?tahun=${year}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clustersData = year == 2024 ? data.clusters : data;
      setClusters(clustersData || []);
      setSelectedData(null);
    });
}, [year]);


  // ===================== UTILITIES ===================== //
  const getColor = (risk) => {
    if (risk === "Tinggi") return "red";
    if (risk === "Sedang") return "orange";
    if (risk === "Rendah") return "green";
    return "#999";
  };

  const normalize = (str) =>
    str?.toString().trim().toLowerCase().replace(/\s+/g, "");

  const per100 = (ratio) => {
    if (ratio === null || ratio === undefined) return "-";
    return `${(ratio * 100).toFixed(2)} kasus / 100 penduduk`;
  };

  // ===================== STYLING FEATURE ===================== //
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

  // ===================== INTERACTION ===================== //
  const onEachFeature = (feature, layer) => {
    const kecamatanGeo = normalize(feature.properties.nama);
    const cluster = clusters.find(
      (c) => normalize(c.kecamatan) === kecamatanGeo
    );

    const defaultStyle = { weight: 1, fillOpacity: 0.6 };
    const highlightStyle = { weight: 3, fillOpacity: 0.85 };

    // Hover effect
    layer.on("mouseover", function () {
      this.setStyle(highlightStyle);
    });

    // Hover out
    layer.on("mouseout", function () {
      if (!selectedData || selectedData.nama !== feature.properties.nama) {
        this.setStyle(defaultStyle);
      }
    });

    // Click effect
    layer.on("click", function () {
      setSelectedData({
        nama: feature.properties.nama,
        ...cluster,
      });

      // Reset all polygons first
      layer._map.eachLayer((ly) => {
        if (ly.setStyle) ly.setStyle(defaultStyle);
      });

      // Highlight selected polygon
      this.setStyle(highlightStyle);
    });
  };

  // ===================== RENDER ===================== //
  return (
    <div className="flex w-full min-h-screen">
      {/* =================== SIDEBAR =================== */}
      <div className="w-[25%] bg-white shadow-lg p-4 text-sm border-r border-gray-300">
        {/* FILTER TAHUN */}
        <div className="mb-5">
          <label className="font-semibold text-gray-700">Pilih Tahun:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded mt-2 w-full"
          >
            {[2019, 2020, 2021, 2022, 2023, 2024].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* LEGEND */}
        <div className="bg-gray-50 border rounded p-3 mb-5">
          <h4 className="font-semibold mb-2">Kategori Risiko</h4>
          <div className="flex flex-col gap-2 text-xs">

            <div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 inline-block rounded"></span>
                <span>Tinggi</span>
              </div>
              <span className="text-[10px] ml-6 text-gray-600">
                ≥ 7 kasus / 100 penduduk
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-orange-500 inline-block rounded"></span>
                <span>Sedang</span>
              </div>
              <span className="text-[10px] ml-6 text-gray-600">
                5 – 7 kasus / 100 penduduk
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 inline-block rounded"></span>
                <span>Rendah</span>
              </div>
              <span className="text-[10px] ml-6 text-gray-600">
                0 – 5 kasus / 100 penduduk
              </span>
            </div>

          </div>
        </div>

        {/* DATA KECAMATAN */}
        {selectedData && (
          <div className="border rounded p-3 bg-gray-50">
            <h4 className="font-semibold text-center mb-2">
               {selectedData.nama}
            </h4>
            <table className="w-full text-[11px] border border-gray-300">
              <tbody>
                <tr>
                  <td className="border px-1 py-[3px] font-semibold">Jumlah Kasus</td>
                  <td className="border px-1 py-[3px] text-right">{selectedData.jumlah_kasus}</td>
                </tr>
                <tr>
                  <td className="border px-1 py-[3px] font-semibold">Meninggal</td>
                  <td className="border px-1 py-[3px] text-right">{selectedData.meninggal}</td>
                </tr>
                <tr>
                  <td className="border px-1 py-[3px] font-semibold">Kepadatan</td>
                  <td className="border px-1 py-[3px] text-right">{selectedData.kepadatan_penduduk}</td>
                </tr>
                <tr>
                  <td className="border px-1 py-[3px] font-semibold">Kategori</td>
                  <td
                    className="border px-1 py-[3px] text-right font-bold"
                    style={{ color: getColor(selectedData.risk_label) }}
                  >
                    {selectedData.risk_label}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =================== MAP =================== */}
      <div className="w-[75%]">
        <MapContainer
          style={{ height: "100vh", width: "100%" }}
          center={[-7.15, 111.88]}
          zoom={10}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geoData && (
            <GeoJSON
              key={JSON.stringify(clusters)}
              data={geoData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
