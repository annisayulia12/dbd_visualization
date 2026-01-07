import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", form);

      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      if (onLogin) onLogin(res.data);

      // Redirect ke dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Login gagal! Username atau password salah.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border p-2 mb-4 rounded"
          maxLength={20}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <section>
          <p className="text-gray-700 leading-relaxed mt-4 text-center">
            Belum punya akun? silahkan{" "}
            <a href="/register" className="text-blue-600 font-medium">
              Register
            </a>
          </p>
        </section>
      </form>
    </div>
  );
}
