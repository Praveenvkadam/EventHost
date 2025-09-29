import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imageForm, setImageForm] = useState({
    id: null,
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // ✅ default today
    urls: ["", "", "", ""],
  });
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Fetch images
  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/images");
      const mapped = res.data.map((img) => ({
        ...img,
        urls: [img.image1, img.image2, img.image3, img.image4],
      }));
      setImages(mapped);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle form input
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "urls" && index !== null) {
      const newUrls = [...imageForm.urls];
      newUrls[index] = value;
      setImageForm({ ...imageForm, urls: newUrls });
    } else {
      setImageForm({ ...imageForm, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageForm.title || imageForm.urls.some((u) => !u)) return;

    const payload = {
      title: imageForm.title,
      description: imageForm.description,
      date: imageForm.date || new Date().toISOString().split("T")[0],
      urls: imageForm.urls, // ✅ correct for backend
    };

    try {
      if (imageForm.id) {
        await axios.put(
          `http://localhost:8080/api/images/${imageForm.id}`,
          payload
        );
      } else {
        await axios.post("http://localhost:8080/api/images", payload);
      }

      setImageForm({
        id: null,
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0], // reset to today
        urls: ["", "", "", ""],
      });
      setIsImageOpen(false);
      fetchGallery();
    } catch (err) {
      console.error("Error saving image:", err);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/images/${id}`);
      fetchGallery();
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // Edit image
  const handleEdit = (item) => {
    setImageForm({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      urls: [item.image1, item.image2, item.image3, item.image4],
    });
    setIsImageOpen(true);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>

      {/* Add Image Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsImageOpen(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Image
        </button>
      </div>

      {/* Modal */}
      {isImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setIsImageOpen(false)}
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={imageForm.title}
                onChange={handleChange}
                className="border rounded-lg p-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={imageForm.description}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <input
                type="date"
                name="date"
                value={imageForm.date}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              {imageForm.urls.map((url, index) => (
                <input
                  key={index}
                  type="text"
                  name="urls"
                  placeholder={`Image URL ${index + 1}`}
                  value={url}
                  onChange={(e) => handleChange(e, index)}
                  className="border rounded-lg p-2"
                  required
                />
              ))}

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {imageForm.id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="rounded-xl overflow-hidden shadow-lg border border-white/30 bg-white/20 backdrop-blur-md transition hover:shadow-2xl"
          >
            <Slider {...sliderSettings}>
              {img.urls.filter(Boolean).map((url, i) => (
                <div key={i}>
                  <img
                    src={url}
                    alt={`${img.title}-${i}`}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </div>
              ))}
            </Slider>

            <div className="p-4 bg-white/30 backdrop-blur-sm">
              <h4 className="font-semibold text-lg text-gray-800">{img.title}</h4>
              <p className="text-gray-700">{img.description}</p>
              <p className="text-gray-500 text-sm mt-1">{img.date}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(img)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
