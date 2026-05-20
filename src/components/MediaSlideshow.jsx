/*
 * COMPONENT: MediaSlideshow
 * Auto-playing photo carousel with prev/next arrows, dot indicators.
 * Pauses on hover. Smooth fade transition via Framer Motion.
 */
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MediaSlideshow({ slides = [] }) {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [dir,     setDir]     = useState(1) // 1 = forward, -1 = backward

  const goTo = useCallback((idx, direction = 1) => {
    setDir(direction)
    setCurrent(idx)
  }, [])

  const prev = () => {
    const idx = (current - 1 + slides.length) % slides.length
    goTo(idx, -1)
  }

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length
    goTo(idx, 1)
  }, [current, slides.length, goTo])

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next, slides.length])

  if (!slides.length) return null

  const variants = {
    enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-slate-100 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div className="relative aspect-[16/9]">
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].url}
              alt={slides[current].title || ''}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for caption */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        {(slides[current].title || slides[current].caption) && (
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
            {slides[current].title && (
              <p className="font-display font-bold text-white text-lg sm:text-xl leading-snug drop-shadow">
                {slides[current].title}
              </p>
            )}
            {slides[current].caption && (
              <p className="text-white/80 text-sm mt-1 drop-shadow">
                {slides[current].caption}
              </p>
            )}
          </div>
        )}

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 bg-slate-900/80">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2.5 bg-brand-400'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
