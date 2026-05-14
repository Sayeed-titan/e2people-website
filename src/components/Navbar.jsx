import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'

// Sticky navigation bar with smooth-scroll links, active-section spy, and a mobile hamburger menu.
// The `offset` matches the navbar height (h-16 = 64px) so scrolled-to sections aren't hidden underneath.
const NAV_OFFSET = -64

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Solutions', to: 'solutions' },
  { label: 'Portfolio', to: 'products' },
  { label: 'Blog', to: 'blog' },
  { label: 'Team', to: 'team' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBase =
    'nav-link relative text-gray-700 hover:text-brand-700 cursor-pointer text-sm font-medium transition-colors duration-300 py-1'
  const linkActive = 'nav-link-active text-brand-700'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/40 shadow-soft' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="cursor-pointer flex items-center"
            aria-label="Go to top"
          >
            <img src="/logo.png" alt="e2People — Smart Evolution" className="h-9 sm:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={NAV_OFFSET}
                activeClass={linkActive}
                className={linkBase}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="bg-brand-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-800 transition-colors duration-300 cursor-pointer shadow-soft"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    activeClass="text-brand-700 bg-brand-50"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer text-sm font-medium transition-colors"
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
                  className="block mx-4 my-3 bg-brand-700 text-white px-4 py-2.5 rounded-lg font-medium text-center cursor-pointer hover:bg-brand-800 transition-colors duration-300"
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
