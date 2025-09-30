import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Service = () => {
  const [eventsByCategory, setEventsByCategory] = useState({})
  const [loading, setLoading] = useState(true)
  const sliderRefs = useRef({})
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/services')
      const events = res.data
      const grouped = events.reduce((acc, ev) => {
        const cat = ev.category || 'Other'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push({
          id: ev.id,
          name: ev.title,
          price: ev.price,
          img: ev.image1, // primary image
          images: [ev.image1, ev.image2, ev.image3, ev.image4].filter(Boolean),
          description: ev.description || ev.details || ev.desc
        })
        return acc
      }, {})
      setEventsByCategory(grouped)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching events:', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  }

  const cardImageSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  const handleBook = (ev) => {
    navigate('/booking', { state: { event: ev } })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-indigo-700">
        Loading events...
      </div>
    )
  }

  const categories = Object.keys(eventsByCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-10">
          Explore Events by Category
        </h2>

        {categories.map(cat => (
          <div key={cat} className="mb-12 sm:mb-14 relative">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 sm:mb-5">{cat} Events</h3>

            {/* Arrows */}
            <button
              onClick={() => sliderRefs.current[cat]?.slickPrev()}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-indigo-50 border border-indigo-200 transition-all duration-200 hover:scale-110 sm:p-3"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-700" />
            </button>
            <button
              onClick={() => sliderRefs.current[cat]?.slickNext()}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-indigo-50 border border-indigo-200 transition-all duration-200 hover:scale-110 sm:p-3"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-700" />
            </button>

            <Slider {...sliderSettings} ref={slider => (sliderRefs.current[cat] = slider)}>
              {eventsByCategory[cat]?.map(ev => (
                <div key={ev.id} className="px-1 sm:px-3">
                  <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white hover:shadow-lg transition">
                    <Slider {...cardImageSettings}>
                      {ev.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${ev.name} ${idx + 1}`}
                          className="h-40 sm:h-48 w-full object-cover"
                        />
                      ))}
                    </Slider>
                    <div className="p-3 sm:p-4">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">{ev.name}</h4>
                      <p className="text-indigo-600 font-medium mt-1">₹{ev.price}</p>
                      <p className="mt-2 text-sm text-slate-600 leading-6 line-clamp-6">{ev.description}</p>
                      <button
                        className="mt-2 sm:mt-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm sm:text-base"
                        onClick={() => handleBook(ev)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  )
}

export default Service
