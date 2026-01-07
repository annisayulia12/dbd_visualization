import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name) newErrors.name = "Nama wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.username) newErrors.username = "Username wajib diisi";

    // 🔹 Validasi password
    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    // 🔹 Validasi confirm password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password dan Konfirmasi Password tidak sama";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post("http://localhost:8000/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    } catch (err) {
      if (err.response && err.response.data.detail) {
        alert(err.response.data.detail); // contoh: "Email sudah terdaftar"
      } else {
        alert("Registrasi gagal!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register Admin</h2>

        {/* Nama */}
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          maxLength={50}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          maxLength={50}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          maxLength={20}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          maxLength={30}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Konfirmasi Password"
          value={form.confirmPassword}
          maxLength={30}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {errors.confirmPassword}
          </p>
        )}

        {/* Tombol */}
        <button
          type="submit"
          disabled={
            !form.name ||
            !form.email ||
            !form.username ||
            !form.password ||
            !form.confirmPassword
          }
          className={`w-full py-2 rounded text-white mt-4 
            ${
              !form.name ||
              !form.email ||
              !form.username ||
              !form.password ||
              !form.confirmPassword
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Register
        </button>
      </form>
    </div>
  );
}
