import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import CreateForm from "./pages/admin/CreateForm.jsx";
import EditForm from "./pages/admin/EditForm.jsx";
import MapRisk from "./pages/MapView.jsx";
import Chart from "./pages/ChartView.jsx";
import Information from "./pages/Information.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import RegisterPage from "./pages/login/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardVisual from "./pages/DashboardVisual.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow pt-[120px]">
          <Routes>
            <Route path="/dashboard-visual" element={<DashboardVisual />} />
            <Route path="/" element={<Home />} />
            <Route path="/peta" element={<MapRisk />} />
            <Route path="/grafik" element={<Chart />} />
            <Route path="/info" element={<Information />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/create" element={<CreateForm />} />
            <Route path="/dashboard/edit" element={<EditForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
