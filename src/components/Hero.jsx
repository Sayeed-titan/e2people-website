/*
 * COMPONENT: Hero
 * WHAT IT DOES: Full-viewport opening section. Eyebrow on top,
 *               oversized 3-line headline (each word slides up on
 *               stagger), light subtext, primary CTA + ghost CTA with
 *               arrow. Abstract concentric rings SVG sits back-right.
 * HOW TO TWEAK:
 *  • Edit copy and CTA labels: `hero` in src/constants/data.js
 *  • Word stagger speed: change `staggerChildren` below
 *  • Concentric rings opacity: tweak the `opacity-` class on <ConcentricRings/>
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { hero, brand, NAV_OFFSET } from '../constants/data'

const lineVariants = {
  hidden: { opacity: 0, y: '60%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}

const fadeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function ConcentricRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-24 sm:right-0 top-1/2 -translate-y-1/2 w-[520px] sm:w-[640px] lg:w-[820px] opacity-50 lg:opacity-60"
    >
      <defs>
        <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3D3A8C" stopOpacity="0.0" />
          <stop offset="60%"  stopColor="#3D3A8C" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3D3A8C" stopOpacity="0.0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#ringFade)" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx="300" cy="300" r={40 + i * 18} />
        ))}
      </g>
      <circle cx="300" cy="300" r="6" fill="#3D3A8C" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="grain relative min-h-screen flex items-center bg-canvas overflow-hidden"
    >
      <ConcentricRings />

      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-canvas pointer-events-none z-[1]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeVariants} className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="text-eyebrow uppercase font-semibold text-ink/70">
              {hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold text-display tracking-tightest text-ink">
            {hero.headline.map((line, idx) => (
              <span key={idx} className="block overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className={`inline-block ${line.accent ? 'text-brand-700' : ''}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeVariants}
            className="mt-8 max-w-xl text-base sm:text-lg font-light leading-relaxed text-ink/65"
          >
            {hero.subtext}
          </motion.p>

          <motion.div variants={fadeVariants} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              to={hero.primaryCta.to}
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              to={hero.secondaryCta.to}
              smooth={true}
              duration={500}
              offset={NAV_OFFSET}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink cursor-pointer"
            >
              <span className="text-link">{hero.secondaryCta.label}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeVariants}
            className="mt-20 flex items-center gap-4 text-eyebrow uppercase text-ink/50"
          >
            <span>{brand.shortTagline}</span>
            <span className="h-px flex-1 bg-ink/15 max-w-[280px]" />
            <span>Dhaka · Bangladesh</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
