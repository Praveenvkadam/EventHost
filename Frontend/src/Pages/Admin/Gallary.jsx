import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallary = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [videoForm, setVideoForm] = useState({ title: "", url: "" });
  const [imageForm, setImageForm] = useState({ title: "", url: "", file: null });

  const [galleryItems, setGalleryItems] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // preview selected image

  // Fetch gallery items
  const fetchGallery = async () => {
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
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle form changes
  const handleVideoChange = (e) => setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setImageForm({ ...imageForm, file: files[0] });
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setImageForm({ ...imageForm, [name]: value });
      setImagePreview(value || null); // if URL entered
    }
  };

  // Submit video
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/videos/add", {
        title: videoForm.title,
        videoUrl: videoForm.url,
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

  // Submit image
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", imageForm.title);

    if (imageForm.file) {
      formData.append("file", imageForm.file);
    } else if (imageForm.url) {
      formData.append("url", imageForm.url);
    } else {
      alert("Please provide image file or URL!");
      return;
    }

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

      {/* Popup Overlay */}
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
                  className="border rounded-lg p-3 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <input
                  type="text"
                  name="url"
                  placeholder="Video URL"
                  value={videoForm.url}
                  onChange={handleVideoChange}
                  className="border rounded-lg p-3 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                  className="border rounded-lg p-3 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="text"
                  name="url"
                  placeholder="Image URL (optional if uploading file)"
                  value={imageForm.url}
                  onChange={handleImageChange}
                  className="border rounded-lg p-3 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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

      {/* Gallery Grid */}
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
    </div>
  );
};

export default Gallary;
