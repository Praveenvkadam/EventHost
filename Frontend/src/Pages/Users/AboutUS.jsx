import React from 'react'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'

const AboutUS = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                Crafting Events, Curating Memories
              </h1>
              <p className="mt-5 text-slate-700 text-base md:text-lg leading-relaxed">
                We are a passionate team dedicated to transforming ideas into unforgettable
                experiences. From intimate gatherings to grand celebrations, we bring your
                vision to life with creativity, precision, and care.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#mission" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Our Mission
                </a>
                <a href="#contact" className="px-5 py-2.5 rounded-lg bg-white text-indigo-700 border border-indigo-200 hover:border-indigo-300 shadow-sm">
                  Get in touch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 border border-indigo-50 shadow-inner flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-indigo-700 font-semibold">Your Story. Beautifully Told.</p>
                  <p className="text-slate-600 mt-2">Design • Production • Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-4 text-slate-700 leading-7">
                To deliver seamless, innovative, and memorable events that resonate with
                people. We combine strategic planning, creative design, and flawless
                execution to ensure every moment feels effortless and special.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span> Client-first approach with transparent communication</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span> Detail-obsessed planning and execution</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span> Sustainable and responsible practices where possible</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/60 backdrop-blur border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">What we bring</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-3xl font-bold text-indigo-700">+ Creativity</p>
                  <p className="text-slate-600 mt-1 text-sm">Concept to experience</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <p className="text-3xl font-bold text-purple-700">+ Precision</p>
                  <p className="text-slate-600 mt-1 text-sm">Flawless execution</p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <p className="text-3xl font-bold text-teal-700">+ Care</p>
                  <p className="text-slate-600 mt-1 text-sm">Human-centered service</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-3xl font-bold text-amber-700">+ Impact</p>
                  <p className="text-slate-600 mt-1 text-sm">Memories that last</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">250+</p>
              <p className="mt-1 text-slate-600">Events Delivered</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">50K+</p>
              <p className="mt-1 text-slate-600">Attendees Impacted</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">98%</p>
              <p className="mt-1 text-slate-600">Client Satisfaction</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">10+</p>
              <p className="mt-1 text-slate-600">Years of Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 text-white shadow-md">
            <h3 className="font-serif text-2xl md:text-3xl font-bold">Let's build your next event</h3>
            <p className="mt-3 text-white/90 max-w-2xl">
              Ready to turn your vision into reality? Tell us about your goals,
              audience, and vibe—and we’ll craft an experience that feels uniquely you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/gallaryPage" className="px-5 py-2.5 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition">
                Explore Gallery
              </a>
              <a href="/login" className="px-5 py-2.5 rounded-lg border border-white/40 hover:bg-white/10">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUS


