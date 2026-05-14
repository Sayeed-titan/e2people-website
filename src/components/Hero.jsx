import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Hero section — main headline, subheading, primary CTAs, and quick value badges.
const NAV_OFFSET = -64

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const badges = [
  { icon: '⚡', label: 'Fast Implementation' },
  { icon: '🔒', label: 'Secure Solutions' },
  { icon: '📈', label: 'Scalable Growth' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-brand-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Main heading — use non-breaking space to prevent awkward orphans */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Empowering Your Business Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-400 whitespace-nowrap">
              Digital&nbsp;Innovation
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            e2People Limited is a fast-growing tech-enabled service company delivering smart, scalable, and sustainable solutions to businesses and communities across Bangladesh.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="inline-block bg-brand-700 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-brand-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-soft cursor-pointer"
            >
              Get Started
            </Link>
            <Link
              to="services"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="inline-block border-2 border-brand-700 text-brand-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-brand-50 transition-all duration-300 cursor-pointer"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600"
          >
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
