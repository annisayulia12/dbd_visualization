import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "./DataTable";
import CreateForm from "./CreateForm";
import UploadForm from "./UploadForm";
import EditForm from "./EditForm";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("list");
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 🔹 Ambil data dari backend
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/cases");
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // hapus session
    navigate("/login"); // redirect ke login
  };

  return (
    <div className="p-6">

      {/* Tab Menu + Logout */}
      <div className="flex justify-between items-center mb-6">
        {/* Tab Menu */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("list");
              setEditData(null);
            }}
          >
            📋 Data List
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "create" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("create");
              setEditData(null);
            }}
          >
            ➕ Create Data
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("upload");
              setEditData(null);
            }}
          >
            ⬆️ Upload CSV
          </button>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Logout
        </button>
      </div>

      {/* Content */}
      {activeTab === "list" && (
        <DataTable
          data={data}
          fetchData={fetchData}
          onEdit={(row) => {
            setEditData(row);
            setActiveTab("edit");
          }}
        />
      )}
      {activeTab === "create" && (
        <CreateForm
          onSuccess={() => {
            fetchData();
            setActiveTab("list");
          }}
          onCancel={() => setActiveTab("list")}
        />
      )}

      {activeTab === "upload" && (
        <UploadForm
          onSuccess={() => {
            fetchData();
            setActiveTab("list");
          }}
        />
      )}
      {activeTab === "edit" && (
        <EditForm
          data={editData}
          onSuccess={() => {
            fetchData();
            setActiveTab("list"); // setelah update, balik ke list
          }}
          onCancel={() => setActiveTab("list")} // kalau cancel, balik ke list juga
        />
      )}

    </div>
  );
}
