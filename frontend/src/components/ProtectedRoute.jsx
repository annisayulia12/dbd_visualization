import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    // kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }

  return children; // kalau sudah login, tampilkan halaman
}
