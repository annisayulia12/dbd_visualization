import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  MapIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo3.png";

export default function Navbar() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard Visualisasi Spatial Temporal Kasus Demam Berdarah",
    "/peta": "Halaman Peta Risiko",
    "/grafik": "Grafik Demam Berdarah",
    "/info": "Informasi Demam Berdarah",
    "/dashboard": "Dashboard Admin",
  };

  const currentTitle =
    titles[location.pathname] ||
    "Dashboard Visualisasi Spatial Temporal Kasus Demam Berdarah";

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">

      {/* Baris Judul */}
      <div className="bg-indigo-500 text-white px-6 py-3 font-semibold text-lg text-center md:text-left">
        {currentTitle}
      </div>

      {/* Baris Navbar */}
      <nav className="bg-indigo-700 text-white px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo kiri */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo Bojonegoro" className="w-10 h-auto" />
          <span className="font-medium text-sm md:text-base leading-tight">
            PEMERINTAH KABUPATEN BOJONEGORO <br />
            DINAS KESEHATAN
          </span>
        </div>

        {/* Menu kanan */}
        <div className="flex flex-wrap gap-6 text-lg font-medium">
          <Link
            to="/"
            className={`flex items-center gap-2 hover:underline ${
              location.pathname === "/" ? "underline font-bold" : ""
            }`}
          >
            <HomeIcon className="w-6 h-6" /> Home
          </Link>

          <Link
            to="/peta"
            className={`flex items-center gap-2 hover:underline ${
              location.pathname === "/peta" ? "underline font-bold" : ""
            }`}
          >
            <MapIcon className="w-6 h-6" /> Peta Risiko
          </Link>

          <Link
            to="/grafik"
            className={`flex items-center gap-2 hover:underline ${
              location.pathname === "/grafik" ? "underline font-bold" : ""
            }`}
          >
            <ChartBarIcon className="w-6 h-6" /> Grafik
          </Link>

          <Link
            to="/info"
            className={`flex items-center gap-2 hover:underline ${
              location.pathname === "/info" ? "underline font-bold" : ""
            }`}
          >
            <InformationCircleIcon className="w-6 h-6" /> Informasi
          </Link>
        </div>
      </nav>
    </header>
  );
}
