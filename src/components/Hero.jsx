import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Hero section — dramatic headline with word-by-word animation, geometric SVG element,
// soft gradient fade, and asymmetric layout for visual interest.
const NAV_OFFSET = -64

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.2,
    },
  },
}

// Each word slides up with fade
const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

// Geometric SVG element (thin circles and dots)
const GeometricElement = () => (
  <motion.svg
    className="absolute -right-20 top-1/3 w-96 h-96 opacity-60"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, rotate: -20 }}
    animate={{ opacity: 0.4, rotate: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    {/* Concentric circles */}
    <circle cx="200" cy="200" r="180" stroke="#3D3A8C" strokeWidth="1" opacity="0.4" />
    <circle cx="200" cy="200" r="140" stroke="#8B89D9" strokeWidth="1" opacity="0.3" />
    <circle cx="200" cy="200" r="100" stroke="#3D3A8C" strokeWidth="1.5" opacity="0.5" />
    <circle cx="200" cy="200" r="60" stroke="#8B89D9" strokeWidth="1" opacity="0.3" />
    
    {/* Grid of dots */}
    {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) =>
      [0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
        <circle
          key={`${x}-${y}`}
          cx={x + 20}
          cy={y + 20}
          r="1.5"
          fill="#3D3A8C"
          opacity="0.3"
        />
      ))
    )}
  </motion.svg>
)

export default function Hero() {
  const headline = ["Empowering", "Your Business", "Through", "Digital", "Innovation"]
  const brandWord = 3 // "Digital" is index 3

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
      style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FAFAFA 80%, rgba(250,250,250,0) 100%)' }}
    >
      {/* Geometric SVG background element */}
      <GeometricElement />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.13 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Main headline — split across lines with brand word highlighted */}
          <div className="mb-8">
            <h1 className="text-display font-display font-800 leading-[0.95] tracking-tight text-ink-DEFAULT mb-6">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className={i === brandWord ? "text-brand-700 block" : "block"}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Thin blue line accent */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-1 bg-gradient-to-r from-brand-700 to-brand-400 rounded-full mt-8"
            />
          </div>

          {/* Subheading — small, light, creates dramatic contrast */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-mute-soft font-light leading-relaxed max-w-2xl mb-12"
          >
            Fast-growing tech-enabled service provider delivering smart, scalable, and sustainable solutions to businesses and communities across Bangladesh.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6"
          >
            {/* Primary button — solid brand */}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-center cursor-pointer inline-block hover:shadow-soft transition-shadow duration-300"
            >
              Get Started →
            </Link>

            {/* Secondary button — text only with arrow */}
            <Link
              to="services"
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="px-8 py-4 rounded-lg font-semibold text-brand-700 border-2 border-brand-700 cursor-pointer inline-block text-center hover:bg-brand-50 transition-colors duration-300"
            >
              Explore Services →
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges (minimal, at the bottom) */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mute-soft"
        >
          <div className="flex items-center gap-2">
            <span className="text-brand-700 font-bold">→</span>
            <span>Fast Implementation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-700 font-bold">■</span>
            <span>Secure Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-700 font-bold">↗</span>
            <span>Scalable Growth</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
