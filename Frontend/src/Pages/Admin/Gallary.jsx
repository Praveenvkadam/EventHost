import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import Uploading from "../../assets/Uploading to cloud.json";
import ErrorAnimation from "../../assets/Error 404.json";

const Gallary = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [videoForm, setVideoForm] = useState({ title: "", url: "" });
  const [imageForm, setImageForm] = useState({ title: "", url: "", file: null });

  const [galleryItems, setGalleryItems] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch gallery
  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const [imagesRes, videosRes] = await Promise.all([
        axios.get("http://localhost:8080/api/images"),
        axios.get("http://localhost:8080/api/videos"),
      ]);
      setGalleryItems([
        ...imagesRes.data.map((item) => ({ ...item, type: "image" })),
        ...videosRes.data.map((item) => ({ ...item, type: "video" })),
      ]);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch gallery!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Video form handlers
  const handleVideoChange = (e) =>
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.url) {
      alert("Please fill both title and URL!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/videos/add", {
        title: videoForm.title,
        url: videoForm.url,
      });
      alert("Video added!");
      setVideoForm({ title: "", url: "" });
      setIsVideoOpen(false);
      fetchGallery();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error adding video!");
    }
  };

  // Image form handlers
  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setImageForm({ ...imageForm, file: files[0] });
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setImageForm({ ...imageForm, [name]: value });
      setImagePreview(value || null);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageForm.title || (!imageForm.url && !imageForm.file)) {
      alert("Please provide image title and URL or file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", imageForm.title);
    if (imageForm.file) formData.append("file", imageForm.file);
    else formData.append("url", imageForm.url);

    try {
      await axios.post("http://localhost:8080/api/images/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image added!");
      setImageForm({ title: "", url: "", file: null });
      setImagePreview(null);
      setIsImageOpen(false);
      fetchGallery();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error adding image!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Gallery</h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIsVideoOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Add Video
        </button>
        <button
          onClick={() => setIsImageOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Add Image
        </button>
      </div>

      {/* Popup */}
      {(isVideoOpen || isImageOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md text-gray-900 shadow-lg animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-2xl"
              onClick={() => {
                setIsVideoOpen(false);
                setIsImageOpen(false);
                setImagePreview(null);
              }}
            >
              &times;
            </button>

            {/* Video Form */}
            {isVideoOpen && (
              <form onSubmit={handleVideoSubmit} className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold mb-2">Add Video</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="Video Title"
                  value={videoForm.title}
                  onChange={handleVideoChange}
                  className="border rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <input
                  type="text"
                  name="url"
                  placeholder="Video URL"
                  value={videoForm.url}
                  onChange={handleVideoChange}
                  className="border rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Submit
                </button>
              </form>
            )}

            {/* Image Form */}
            {isImageOpen && (
              <form onSubmit={handleImageSubmit} className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold mb-2">Add Image</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="Image Title"
                  value={imageForm.title}
                  onChange={handleImageChange}
                  className="border rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="text"
                  name="url"
                  placeholder="Image URL (optional if uploading file)"
                  value={imageForm.url}
                  onChange={handleImageChange}
                  className="border rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="file"
                  name="file"
                  onChange={handleImageChange}
                  className="p-2 bg-white/70 rounded-lg"
                  accept="image/*"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg border"
                  />
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Loading/Error */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <Lottie animationData={Uploading} loop={true} className="w-64 h-64" />
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center items-center mt-10">
          <Lottie animationData={ErrorAnimation} loop={true} className="w-64 h-64" />
          <p className="text-red-600 mt-4 font-semibold">{error}</p>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 bg-white"
            >
              <h4 className="font-semibold p-2 text-gray-800">{item.title}</h4>
              {item.type === "image" ? (
                <img
                  src={item.url || item.fileUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video controls className="w-full h-48 object-cover">
                  <source src={item.url || item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallary;
