/*
 * COMPONENT: Solutions (the ONE dark moment on the page)
 * WHAT IT DOES: Bold dark section. Each flagship platform is a numbered
 *               row: 01 — Title — description. A thin 1px white line
 *               separates each row. Hover tints the row with a soft blue
 *               overlay and nudges its inner padding. A "Why choose us"
 *               4-column stats strip closes the section.
 * HOW TO TWEAK:
 *  • Rows & stats: edit `solutions` in src/constants/data.js
 *  • Hover effect: see `.solution-row` in src/index.css
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { solutions, NAV_OFFSET } from '../constants/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const titleVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative py-24 md:py-36 bg-ink text-white scroll-mt-16 overflow-hidden"
    >
      {/* faint dot grid + corner glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div aria-hidden="true" className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-brand-700/30 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-brand-accent/20 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <div className="text-eyebrow uppercase font-semibold text-white/55 mb-5">
            {solutions.eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tightest whitespace-pre-line">
            {solutions.title}
          </h2>
        </motion.div>

        {/* Numbered rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="border-t border-white/10"
        >
          {solutions.rows.map((row) => (
            <motion.div key={row.number} variants={rowVariants}>
              <article className="solution-row group py-10 md:py-12 border-b border-white/10 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start">
                <div className="flex items-baseline gap-4 md:w-44 shrink-0">
                  <span className="font-display font-extrabold text-5xl md:text-6xl text-white/20 leading-none select-none">
                    {row.number}
                  </span>
                  <span className="h-px w-10 bg-white/30 mt-6 md:hidden" />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-white/65 font-light leading-relaxed max-w-2xl">
                    {row.description}
                  </p>
                </div>

                <div className="md:pt-2">
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white cursor-pointer transition-colors"
                  >
                    <span className="text-link">Discuss</span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden"
        >
          {solutions.stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 sm:p-7">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-brand-accent">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-white/60 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
