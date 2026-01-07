import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut, Scatter } from "react-chartjs-2";

// Register ChartJS Components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default function ChartView() {
  const [dataByYear, setDataByYear] = useState({});
  const [clusters, setClusters] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2019);

  // ===============================
  // FETCH DATA DARI API
  // ===============================
  useEffect(() => {
    const fetchAll = async () => {
      const years = [2019, 2020, 2021, 2022, 2023];
      let yearly = {};
      let allClusters = [];

      for (let year of years) {
        const res = await fetch(
          `http://localhost:8000/cases/clustering?tahun=${year}`
        );
        const data = await res.json();
        allClusters.push(...data);

        const totals = data.reduce(
          (acc, c) => {
            acc.jumlah_kasus += c.jumlah_kasus || 0;
            acc.meninggal += c.meninggal || 0;
            if (c.risk_label === "Rendah") acc.rendah++;
            if (c.risk_label === "Sedang") acc.sedang++;
            if (c.risk_label === "Tinggi") acc.tinggi++;
            return acc;
          },
          { jumlah_kasus: 0, meninggal: 0, rendah: 0, sedang: 0, tinggi: 0 }
        );

        yearly[year] = totals;
      }

      setDataByYear(yearly);
      setClusters(allClusters);
    };

    fetchAll();
  }, []);

  const years = Object.keys(dataByYear);
  const totals = Object.values(dataByYear);

  // ===============================
  // DATA PER TAHUN YANG DIPILIH
  // ===============================
  const filtered = clusters.filter(
    (c) => c.tahun === Number(selectedYear)
  );

  // ===============================
  // TOP 5 KECAMATAN
  // ===============================
  const topKecamatan = [...filtered]
    .sort((a, b) => b.jumlah_kasus - a.jumlah_kasus)
    .slice(0, 5);

  // ===============================
  // LINE – TREND PER TAHUN
  // ===============================
  const lineData = {
    labels: years,
    datasets: [
      {
        label: "Jumlah Kasus DBD",
        data: totals.map((t) => t.jumlah_kasus),
        borderColor: "#C70039",
        backgroundColor: "rgba(199,0,57,0.3)",
        fill: true,
      },
      {
        label: "Jumlah Meninggal",
        data: totals.map((t) => t.meninggal),
        borderColor: "#FF9F1C",
        backgroundColor: "rgba(255,159,28,0.3)",
        fill: true,
      },
    ],
  };

  // ===============================
  // BAR – PER KECAMATAN
  // ===============================
  const barRiskByDistrict = {
    labels: filtered.map((c) => c.kecamatan),
    datasets: [
      {
        label: "Jumlah Kasus",
        data: filtered.map((c) => c.jumlah_kasus),
        backgroundColor: filtered.map((c) =>
          c.risk_label === "Tinggi"
            ? "#C70039"
            : c.risk_label === "Sedang"
            ? "#FFC300"
            : "#1D9A6C"
        ),
        borderRadius: 5,
      },
    ],
  };

  // ===============================
  // BAR – TOP 5
  // ===============================
  const topBarData = {
    labels: topKecamatan.map((c) => c.kecamatan),
    datasets: [
      {
        label: `Kasus Tertinggi (${selectedYear})`,
        data: topKecamatan.map((c) => c.jumlah_kasus),
        backgroundColor: "#FF9F1C",
      },
    ],
  };

  // ===============================
  // SCATTER – KEPADATAN VS KASUS
  // ===============================
  const scatterData = {
    datasets: filtered.map((c) => ({
      label: c.kecamatan,
      data: [{ x: c.kepadatan_penduduk, y: c.jumlah_kasus }],
      backgroundColor:
        c.risk_label === "Tinggi"
          ? "#C70039"
          : c.risk_label === "Sedang"
          ? "#FFC300"
          : "#1D9A6C",
    })),
  };

  // ===============================
  // DOUGHNUT – PROPORSI RISK
  // ===============================
  const totalRendah = totals.reduce((a, b) => a + b.rendah, 0);
  const totalSedang = totals.reduce((a, b) => a + b.sedang, 0);
  const totalTinggi = totals.reduce((a, b) => a + b.tinggi, 0);

  const doughnutData = {
    labels: ["Rendah", "Sedang", "Tinggi"],
    datasets: [
      {
        data: [totalRendah, totalSedang, totalTinggi],
        backgroundColor: ["#1D9A6C", "#FFC300", "#C70039"],
      },
    ],
  };

  // ===============================
  // NARASI TREND OTOMATIS
  // ===============================
  const getTrendNarration = () => {
    if (years.length < 2) return "Data belum lengkap.";
    const diff =
      totals[totals.length - 1].jumlah_kasus -
      totals[0].jumlah_kasus;

    return diff > 0
      ? `Terjadi kenaikan total kasus DBD sebesar ${diff} kasus dari ${years[0]} ke ${years[years.length - 1]}.`
      : diff < 0
      ? `Terjadi penurunan total kasus DBD sebesar ${Math.abs(
          diff
        )} kasus dalam periode tersebut.`
      : "Tidak terdapat perubahan signifikan pada jumlah kasus DBD dalam periode tersebut.";
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="p-4">

      {/* FILTER TAHUN */}
      <div className="mb-4 flex justify-end">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-3 py-1 rounded-md shadow-sm text-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              Tahun {y}
            </option>
          ))}
        </select>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* SEBARAN PER KECAMATAN */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-center mb-2">
            Sebaran Risiko per Kecamatan ({selectedYear})
          </h2>
          <Bar
            data={barRiskByDistrict}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                  },
                },
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        {/* TOP 5 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-center mb-2">
            5 Kecamatan Kasus Tertinggi ({selectedYear})
          </h2>
          <Bar data={topBarData} options={options} />
        </div>

      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        {/* SCATTER */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-center mb-2">
            Kepadatan vs Kasus ({selectedYear})
          </h2>
          <Scatter
            data={scatterData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { title: { display: true, text: "Kepadatan Penduduk" } },
                y: { title: { display: true, text: "Jumlah Kasus" } },
              },
            }}
          />
        </div>

        {/* DOUGHNUT */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-center mb-2">
            Proporsi Risiko (2019–2023)
          </h2>
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Doughnut
                data={doughnutData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 12,
                        font: { size: 10 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* TREND */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-center mb-2">
            Tren Kasus DBD per Tahun
          </h2>
          <Line data={lineData} options={options} />
          <p className="text-gray-700 text-sm mt-3 text-justify">
            {getTrendNarration()}
          </p>
        </div>

      </div>

    </div>
  );
}
