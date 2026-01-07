import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/cases", // nanti gampang kalau diganti base url
});

// ambil semua data
export const getData = () => API.get("/data");

// tambah data baru
export const createData = (payload) => API.post("/data", payload);

// hapus data by id
export const deleteData = (id) => API.delete(`/data/${id}`);

// edit data by id
export const updateData = (id, payload) => API.put(`/data/${id}`, payload);
