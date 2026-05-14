/*
 * HOOK: useScrollReveal
 *
 * WHAT IT DOES:
 *  Attaches an IntersectionObserver to a ref. When the element enters
 *  the viewport, the returned `inView` flag flips to true. Pair it
 *  with the `.reveal` / `.reveal.is-visible` utilities in index.css
 *  to fade-and-rise content into view.
 *
 * HOW TO USE:
 *   const { ref, inView } = useScrollReveal()
 *   <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>...
 *
 * OPTIONS:
 *   threshold (0–1): how much of the element must be visible before it triggers
 *   once (bool):     stop observing after first trigger (default true)
 *   rootMargin:      passed straight to IntersectionObserver
 */
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal({ threshold = 0.15, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return { ref, inView }
}
