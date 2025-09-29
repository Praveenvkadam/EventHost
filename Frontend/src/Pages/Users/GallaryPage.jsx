import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'

const GallaryPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:8080/api/images')
        const mapped = (res.data || []).map(img => ({
          id: img.id,
          title: img.title,
          description: img.description,
          date: img.date,
          urls: [img.image1, img.image2, img.image3, img.image4].filter(Boolean)
        }))
        setItems(mapped)
      } catch (e) {
        setError('Failed to load gallery')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: true
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading gallery...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">

        {/* Thought line + heading */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base md:text-lg leading-relaxed text-slate-700">
            Welcome to our gallery, where every picture tells a story. From everyday
            moments to special memories, these images capture the essence of our journey.
            Take a look around, explore, and relive the moments with us.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <p className="text-gray-500 text-lg">No items to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map(item => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white transition transform hover:-translate-y-1 duration-300"
              >
                {item.urls && item.urls.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {item.urls.map((url, i) => (
                      <div key={i}>
                        <img
                          src={url}
                          alt={`${item.title || 'image'}-${i}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-5 font-sans">
                  {item.title ? (
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 tracking-wide">
                      {item.title}
                    </h3>
                  ) : null}
                  {(item.title && (item.description || item.date)) ? (
                    <div className="mt-2 h-0.5 w-12 bg-indigo-100 rounded" />
                  ) : null}
                  {item.description ? (
                    <p className="mt-3 text-slate-700 text-sm sm:text-base md:text-lg leading-7 break-words">
                      {item.description}
                    </p>
                  ) : null}
                  {item.date ? (
                    <p className="mt-3 text-xs sm:text-sm text-slate-500 italic">
                      {item.date}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default GallaryPage
