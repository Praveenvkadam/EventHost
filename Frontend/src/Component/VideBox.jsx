import React from 'react'

const VideoBox = ({
  title = 'Tech Innovators 2025',
  description = 'Join the leading minds in technology for an immersive experience of innovation, AI breakthroughs, cloud transformation, and the future of digital engineering.',
  videoSrc = 'https://www.youtube.com/embed/qcTG5NXzuR0?si=b6Qirif4Tq8z9Quc&autoplay=1&mute=1&loop=1&playlist=qcTG5NXzuR0', // autoplay + loop
}) => {
  return (
    <div className='relative w-full h-[85vh] overflow-hidden rounded-xl bg-black'>
  
      <iframe
        className='absolute inset-0 h-full w-full object-cover'
        src={videoSrc}
        title='IT Event Video Background'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

      {/* Content */}
      <div className='relative z-10 flex h-full items-end justify-center px-6 pb-10 md:px-12 md:pb-14'>
        <div className='max-w-3xl text-white text-center'>
          <h2 className='text-3xl font-bold md:text-5xl'>{title}</h2>
          <p className='mt-3 text-sm leading-relaxed text-gray-200 md:mt-4 md:text-base'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoBox
