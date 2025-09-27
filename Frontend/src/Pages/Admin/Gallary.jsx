import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);

  const [videoForm, setVideoForm] = useState({ id: null, title: "", url: "", file: null });
  const [imageForm, setImageForm] = useState({ id: null, title: "", url: "", file: null });

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch gallery from backend
  const fetchGallery = async () => {
    try {
      const [videoRes, imageRes] = await Promise.all([
        axios.get("http://localhost:8080/api/videos"),
        axios.get("http://localhost:8080/api/images")
      ]);
      setVideos(videoRes.data);
      setImages(imageRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle form input
  const handleChange = (e, type) => {
    const { name, value, files } = e.target;
    if (type === "video") {
      if (name === "file") {
        setVideoForm({ ...videoForm, file: files[0] });
        setVideoPreview(files[0] ? URL.createObjectURL(files[0]) : null);
      } else {
        setVideoForm({ ...videoForm, [name]: value });
        setVideoPreview(value || null);
      }
    } else {
      if (name === "file") {
        setImageForm({ ...imageForm, file: files[0] });
        setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
      } else {
        setImageForm({ ...imageForm, [name]: value });
        setImagePreview(value || null);
      }
    }
  };

  // Submit form (Add or Edit)
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const form = type === "video" ? videoForm : imageForm;

    if (!form.title || (!form.url && !form.file)) return;

    const formData = new FormData();
    formData.append("title", form.title);
    if (form.file) formData.append("file", form.file);
    else formData.append("url", form.url);

    try {
      if (form.id) {
        // Edit existing
        const url = type === "video"
          ? `http://localhost:8080/api/videos/${form.id}`
          : `http://localhost:8080/api/images/${form.id}`;
        await axios.put(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        // Add new
        const url = type === "video"
          ? "http://localhost:8080/api/videos/add"
          : "http://localhost:8080/api/images/add";
        await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }

      // Reset form
      if (type === "video") {
        setVideoForm({ id: null, title: "", url: "", file: null });
        setVideoPreview(null);
        setIsVideoOpen(false);
      } else {
        setImageForm({ id: null, title: "", url: "", file: null });
        setImagePreview(null);
        setIsImageOpen(false);
      }

      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete video/image
  const handleDelete = async (id, type) => {
    const url = type === "video"
      ? `http://localhost:8080/api/videos/${id}`
      : `http://localhost:8080/api/images/${id}`;
    try {
      await axios.delete(url);
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit video/image
  const handleEdit = (item, type) => {
    if (type === "video") {
      setVideoForm({ id: item.id, title: item.title, url: item.url, file: null });
      setVideoPreview(item.url);
      setIsVideoOpen(true);
    } else {
      setImageForm({ id: item.id, title: item.title, url: item.url, file: null });
      setImagePreview(item.url);
      setIsImageOpen(true);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Gallery</h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => { setIsVideoOpen(true); setVideoForm({ id: null, title: "", url: "", file: null }); setVideoPreview(null); }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
          Add Video
        </button>
        <button onClick={() => { setIsImageOpen(true); setImageForm({ id: null, title: "", url: "", file: null }); setImagePreview(null); }} className="px-6 py-2 bg-green-600 text-white rounded-lg">
          Add Image
        </button>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-xl font-bold" onClick={() => { setIsVideoOpen(false); setVideoPreview(null); setVideoForm({ id: null, title: "", url: "", file: null }); }}>&times;</button>
            <form onSubmit={(e) => handleSubmit(e, "video")} className="flex flex-col gap-4">
              <input type="text" name="title" placeholder="Video Title" value={videoForm.title} onChange={(e) => handleChange(e, "video")} className="border rounded-lg p-2" required />
              <input type="text" name="url" placeholder="Video URL (optional)" value={videoForm.url} onChange={(e) => handleChange(e, "video")} className="border rounded-lg p-2" />
              <input type="file" name="file" accept="video/*" onChange={(e) => handleChange(e, "video")} />
              {videoPreview && <video controls className="w-full h-48 mt-2"><source src={videoPreview} type="video/mp4" /></video>}
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">{videoForm.id ? "Update" : "Submit"}</button>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-xl font-bold" onClick={() => { setIsImageOpen(false); setImagePreview(null); setImageForm({ id: null, title: "", url: "", file: null }); }}>&times;</button>
            <form onSubmit={(e) => handleSubmit(e, "image")} className="flex flex-col gap-4">
              <input type="text" name="title" placeholder="Image Title" value={imageForm.title} onChange={(e) => handleChange(e, "image")} className="border rounded-lg p-2" required />
              <input type="text" name="url" placeholder="Image URL (optional)" value={imageForm.url} onChange={(e) => handleChange(e, "image")} className="border rounded-lg p-2" />
              <input type="file" name="file" accept="image/*" onChange={(e) => handleChange(e, "image")} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover mt-2 rounded-lg" />}
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">{imageForm.id ? "Update" : "Submit"}</button>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {videos.map((v) => (
          <div key={v.id}>
            <h4 className="font-semibold">{v.title}</h4>
            <video controls className="w-full h-48">
              <source src={v.url} type="video/mp4" />
            </video>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(v, "video")} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(v.id, "video")} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}

        {images.map((img) => (
          <div key={img.id}>
            <h4 className="font-semibold">{img.title}</h4>
            <img src={img.url} alt={img.title} className="w-full h-48 object-cover" />
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(img, "image")} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(img.id, "image")} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
