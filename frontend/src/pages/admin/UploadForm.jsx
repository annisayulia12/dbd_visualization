import axios from "axios";

export default function UploadForm() {
  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/cases/upload_csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded!");
      fileInput.value = ""; // reset input
    } catch (err) {
      console.error(err);
      alert("Gagal upload file");
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        name="file"
        accept=".csv"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Upload CSV
      </button>
    </form>
  );
}
