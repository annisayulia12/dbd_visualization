import dashboardImg from "../assets/heroicon.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center bg-gray-50 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Kiri - Gambar */}
        <div className="flex justify-center">
          <img
            src={dashboardImg}
            alt="Ilustrasi Dashboard"
            className="w-full max-w-md rounded-2xl shadow-md"
          />
        </div>

        {/* Kanan - Teks */}
        <div className="text-center md:text-left">
          <p className="text-gray-600 text-lg mb-2">
            Pemetaan Risiko Demam Berdarah
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            SELAMAT DATANG di{" "}
            <span className="text-indigo-700">
              DASHBOARD PETA RISIKO DEMAM BERDARAH
            </span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Dinas Kesehatan Kabupaten Bojonegoro
          </p>
          <a
            href="/peta"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            🚀 Mulai Lihat Peta
          </a>
        </div>
      </div>
    </div>
  );
}
