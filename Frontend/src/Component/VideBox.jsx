import React from 'react'

const VideBox = ({
  title = 'Your Video Title',
  description = 'Add a short description for this video to give users more context.',
  primaryButtonText = 'Play',
  secondaryButtonText = 'Learn More',
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  videoSrc = 'C:\Users\prave\Downloads\Corporate Event Videography _ Same Day Edit 1 _ Sugar & Tea Philippines _ Skyworth Global',
  poster = '',
}) => {
  return (
    <div className='relative w-full h-[85vh] overflow-hidden rounded-xl bg-black'>
      <video
        className='absolute inset-0 h-full w-full object-cover opacity-80'
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

      <div className='relative z-10 flex h-full items-end justify-center px-6 pb-10 md:px-12 md:pb-14'>
        <div className='max-w-3xl text-white text-center'>
          <h2 className='text-3xl font-bold md:text-5xl'>{title}</h2>
          <p className='mt-3 text-sm leading-relaxed text-gray-200 md:mt-4 md:text-base'>
            {description}
          </p>

          <div className='mt-5 flex flex-wrap items-center justify-center gap-3'>
            <button
              onClick={onPrimaryClick}
              className='inline-flex items-center justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 active:scale-[0.98] min-w-[140px] md:min-w-[160px]'
            >
              {primaryButtonText}
            </button>
            <button
              onClick={onSecondaryClick}
              className='inline-flex items-center justify-center rounded-md border border-white/80 bg-transparent px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 active:scale-[0.98] min-w-[140px] md:min-w-[160px]'
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideBox