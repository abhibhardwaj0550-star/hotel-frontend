import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import axios from "axios";
import menuIcon from "../../../assets/menu.png";
import api from "../../../components/Axios";

const ContentDashboard = () => {
  const { setSidebarOpen } = useOutletContext();
  const [activePage, setActivePage] = useState("table");
  const [message, setMessage] = useState("");
  const [uploadingPreview, setUploadingPreview] = useState(false);
  const [uploadingMultiple, setUploadingMultiple] = useState(false);
  const singleImageRef = useRef(null);
  const multipleImagesRef = useRef(null);

  const [formData, setFormData] = useState({
    previewImage: "",
    images: [],
    rating: 4,
    package: "Basic",
    rate: "",
    tags: [],
    description: "",
  });

  const [hotels, setHotels] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch hotels
  useEffect(() => {
    if (activePage === "table" || activePage === "card") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/hotel/get`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setHotels(res.data.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [activePage, token]);

  // Ctrl+S triggers image selection in create page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s" && activePage === "create") {
        e.preventDefault();
        singleImageRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Single preview image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    setUploadingPreview(true);
    try {
      const res = await api.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, previewImage: res.data.url }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploadingPreview(false);
    }
  };

  // Multiple images upload
  const handleMultipleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const data = new FormData();
    files.forEach((file) => data.append("images", file));

    setUploadingMultiple(true);
    try {
      const res = await api.post("/upload/bulk", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrls = res.data.images.map((img) => img.url);
      setFormData((prev) => ({ ...prev, images: uploadedUrls }));
    } catch (err) {
      console.error("Bulk upload failed:", err);
    } finally {
      setUploadingMultiple(false);
    }
  };

  const handleTagsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Hotel created successfully!");
      setFormData({
        previewImage: "",
        images: [],
        rating: 4,
        package: "Basic",
        rate: "",
        tags: [],
        description: "",
      });
      setActivePage("table");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating hotel");
    }
  };

  const renderPage = () => {
    // Table view
    if (activePage === "table") {
      return (
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Package</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No hotels found
                  </td>
                </tr>
              ) : (
                hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-gray-50">
                    <td className="border p-2">{hotel.package}</td>
                    <td className="border p-2">{hotel.rate}</td>
                    <td className="border p-2">{hotel.rating}</td>
                    <td className="border p-2">{hotel.tags.join(", ")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
    }

    // Card view
    if (activePage === "card") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={hotel.previewImage}
                alt={hotel.package}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <p>Package: {hotel.package}</p>
              <p>Rate: {hotel.rate}</p>
              <p>Rating: {hotel.rating}</p>
              <p>Tags: {hotel.tags.join(", ")}</p>
            </div>
          ))}
        </div>
      );
    }

    // Create view
    return (
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto relative">
        <button
          onClick={() => setActivePage("table")}
          className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          &larr; Back
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Package */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Package</label>
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Basic</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Premium</option>
            </select>
          </div>

          {/* Rate */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Rate</label>
            <input
              name="rate"
              type="number"
              placeholder="Rate"
              value={formData.rate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Rating</label>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1">Tags</label>
            <input
              placeholder="Tags (wifi, pool)"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Preview Image */}
          <div className="flex flex-col gap-2">
            <label className="font-medium mb-1">Select Preview Image</label>
            <button
              type="button"
              onClick={() => singleImageRef.current?.click()}
              className="border p-2 rounded bg-gray-100 hover:bg-gray-200 transition w-max"
            >
              Select Image
            </button>
            <input
              ref={singleImageRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploadingPreview && !formData.previewImage && (
              <div className="w-40 h-40 flex items-center justify-center border rounded">
                <span className="animate-spin border-4 border-gray-300 border-t-gray-500 rounded-full w-6 h-6"></span>
              </div>
            )}
            {formData.previewImage && (
              <div className="relative mt-2 w-40 h-40">
                <img
                  src={formData.previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, previewImage: "" }))
                  }
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Multiple Images */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Additional Images</label>
            <button
              type="button"
              onClick={() => multipleImagesRef.current?.click()}
              className="border p-2 rounded bg-gray-100 hover:bg-gray-200 transition w-max mb-2"
            >
              Select Images
            </button>
            <input
              ref={multipleImagesRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleUpload}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {uploadingMultiple && formData.images.length === 0 && (
                <div className="w-20 h-20 flex items-center justify-center border rounded">
                  <span className="animate-spin border-4 border-gray-300 border-t-gray-500 rounded-full w-4 h-4"></span>
                </div>
              )}
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={img}
                    alt={`img-${idx}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== idx),
                      }))
                    }
                    className="absolute top-0 right-0 bg-white rounded-full p-1 text-sm shadow hover:bg-gray-200 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button className="bg-[#5457a6] text-white px-6 py-2 rounded hover:bg-[#3f437a] transition">
              Create Hotel
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <AdminHeader
          title="Hotel Management"
          subtitle="Manage hotels using tabs"
          menuIcon={menuIcon}
          onMenuClick={() => setSidebarOpen(true)}
          rightContent={
            activePage !== "create" && (
              <button
                onClick={() => setActivePage("create")}
                className="bg-white text-[#5457a6] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                + Create Hotel
              </button>
            )
          }
        />

        {activePage !== "create" && (
          <div className="bg-white rounded-xl shadow mb-6 mt-6">
            <div className="flex border-b">
              {["table", "card"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePage(tab)}
                  className={`px-6 py-3 font-medium ${
                    activePage === tab
                      ? "border-b-2 border-[#5457a6] text-[#5457a6]"
                      : "text-gray-500 hover:text-[#5457a6]"
                  }`}
                >
                  {tab === "table" ? "Table View" : "Card View"}
                </button>
              ))}
            </div>
          </div>
        )}

        {renderPage()}
      </div>
    </div>
  );
};

export default ContentDashboard;
