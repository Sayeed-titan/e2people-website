/*
 * COMPONENT: Navbar
 * WHAT IT DOES: Sticky nav. Logo + tagline on the left, 7 section links
 *               + primary CTA on the right. Becomes a frosted-glass
 *               surface after the first 8px of scroll. Active section
 *               gets a center-out underline (see index.css).
 * HOW TO TWEAK:
 *  • Change links: edit `navLinks` in src/constants/data.js
 *  • Change CTA: edit the string below (look for 'Get Started')
 *  • Change scroll offset: edit NAV_OFFSET in src/constants/data.js
 */
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, brand, NAV_OFFSET } from '../constants/data'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300 ${
        scrolled
          ? 'bg-canvas/75 backdrop-blur-xl border-b border-ink/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Brand */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="cursor-pointer flex items-center gap-3"
            aria-label="Go to top"
          >
            <img src="/logo.png" alt="e2People" className="h-[3.5rem] sm:h-[4rem] w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-x-7 xl:gap-x-9">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={NAV_OFFSET}
                activeClass="nav-link-active text-ink"
                className="nav-link text-[0.86rem] tracking-wide text-ink/65 hover:text-ink cursor-pointer transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="btn-primary px-5 py-2 rounded-full text-[0.86rem] font-medium cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-ink/10"
            >
              <div className="py-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    activeClass="text-ink bg-ink/5"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm text-ink/70 hover:bg-ink/5 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={NAV_OFFSET}
                  onClick={() => setIsOpen(false)}
                  className="btn-primary mx-4 my-3 block text-center px-4 py-3 rounded-full text-sm font-medium cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
