import React, { useEffect, useRef } from 'react'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'

const useRevealOnScroll = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = Array.from(container.querySelectorAll('[data-reveal]'))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return containerRef
}

const Service = () => {
  const revealRef = useRevealOnScroll()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <style>{`
        .reveal {
          opacity: 0; transform: translateY(16px) scale(0.98);
          transition: opacity .7s ease, transform .7s ease;
        }
        .reveal-in {
          opacity: 1; transform: translateY(0) scale(1);
        }
        .card-hover{transition: transform .25s ease, box-shadow .25s ease}
        .card-hover:hover{transform: translateY(-6px);}
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden" ref={revealRef}>
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-10">
          <div className="text-center">
            <h1 data-reveal className="reveal font-serif text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              Services that Elevate Every Event
            </h1>
            <p data-reveal className="reveal mt-4 text-slate-700 text-base md:text-lg max-w-3xl mx-auto">
              From end-to-end management to bespoke design, we provide flexible, high-impact
              services tailored to your goals, audience, and brand.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-6" ref={revealRef}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Event Strategy', desc: 'Audience-first planning, program design, run-of-show, and KPIs to measure success.', color: 'from-indigo-50 to-white', accent: 'indigo' },
              { title: 'Creative & Design', desc: 'Brand experiences, stage design, motion, and collateral that tell your story.', color: 'from-purple-50 to-white', accent: 'purple' },
              { title: 'Production', desc: 'Vendors, AV, staffing, logistics, and on-site coordination handled end-to-end.', color: 'from-amber-50 to-white', accent: 'amber' },
              { title: 'Guest Experience', desc: 'Registration flows, hospitality, and micro-moments that guests remember.', color: 'from-teal-50 to-white', accent: 'teal' },
              { title: 'Digital & Hybrid', desc: 'Live streaming, portals, interactivity, and analytics for remote audiences.', color: 'from-sky-50 to-white', accent: 'sky' },
              { title: 'Post-Event Impact', desc: 'Surveys, recap content, and insights to extend the life of your event.', color: 'from-rose-50 to-white', accent: 'rose' }
            ].map((s, i) => (
              <div key={i} data-reveal className={`reveal rounded-2xl border border-slate-200 bg-gradient-to-b ${s.color} p-6 md:p-7 card-hover shadow-sm`}>
                <div className="flex items-start gap-4">
                  <span className={`inline-block h-10 w-10 rounded-xl bg-${s.accent}-100 border border-${s.accent}-200`} />
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-slate-700 leading-7">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-6" ref={revealRef}>
          <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-10 shadow-sm">
            <h2 data-reveal className="reveal font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center">Our Process</h2>
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discover', desc: 'We learn your goals, audience, constraints, and success metrics.' },
                { step: '02', title: 'Design', desc: 'We shape the narrative, visual language, and program experience.' },
                { step: '03', title: 'Deliver', desc: 'We coordinate, produce, and run the event with precision.' },
                { step: '04', title: 'Debrief', desc: 'We analyze results and package insights for future impact.' }
              ].map((p, i) => (
                <div key={i} data-reveal className="reveal text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-indigo-600 text-white font-semibold shadow-md">
                    {p.step}
                  </div>
                  <h4 className="mt-3 font-semibold text-slate-900">{p.title}</h4>
                  <p className="mt-1 text-slate-700 text-sm leading-6">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6" ref={revealRef}>
          <div data-reveal className="reveal rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 text-white shadow-md text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold">Plan something unforgettable</h3>
            <p className="mt-3 text-white/90">Tell us about your vision—let’s make it real together.</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/gallaryPage" className="px-5 py-2.5 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition">Explore Gallery</a>
              <a href="/login" className="px-5 py-2.5 rounded-lg border border-white/40 hover:bg-white/10">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Service


