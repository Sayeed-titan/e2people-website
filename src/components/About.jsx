/*
 * COMPONENT: About
 * WHAT IT DOES: Editorial two-column. Left: "Who We Are" eyebrow,
 *               oversized headline, paragraph, Vision + Mission blocks,
 *               then a "Meet Our Team" CTA. Right: dark Core Values card
 *               with row-hover lavender accent.
 * HOW TO TWEAK:
 *  • Copy: edit `about` in src/constants/data.js
 *  • Value row hover style: `.value-row` in src/index.css
 *  • Where the Meet Our Team CTA scrolls to: `about.cta.to`
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { about, NAV_OFFSET } from '../constants/data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-canvas scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT — editorial */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeLeft}
            className="lg:col-span-7"
          >
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-5">
              {about.eyebrow}
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95] whitespace-pre-line">
              {about.title}
            </h2>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ink/65 font-light">
              {about.paragraph}
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-xl">
              <div>
                <div className="text-eyebrow uppercase text-brand-700 font-semibold mb-3">Vision</div>
                <p className="text-ink/75 leading-relaxed">{about.vision}</p>
              </div>
              <div>
                <div className="text-eyebrow uppercase text-brand-700 font-semibold mb-3">Mission</div>
                <p className="text-ink/75 leading-relaxed">{about.mission}</p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to={about.cta.to}
                smooth={true}
                duration={500}
                offset={NAV_OFFSET}
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink cursor-pointer"
              >
                <span className="text-link">{about.cta.label}</span>
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — dark Core Values card */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeRight}
            className="lg:col-span-5 lg:sticky lg:top-24 self-start"
          >
            <div className="relative rounded-3xl bg-ink text-white p-8 sm:p-10 shadow-soft">
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-700/40 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="text-eyebrow uppercase text-white/55 mb-4 font-semibold">
                  Core Values
                </div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                  What guides<br />the work.
                </h3>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                  className="mt-10 divide-y divide-white/10 border-y border-white/10"
                >
                  {about.values.map((v) => (
                    <motion.li key={v.title} variants={fadeUp}>
                      <div className="value-row py-4 flex items-baseline justify-between gap-4 text-white/80">
                        <span className="font-semibold text-base sm:text-lg">{v.title}</span>
                        <span className="text-sm text-white/50 max-w-[18ch] text-right">{v.desc}</span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>

                <p className="mt-8 text-sm text-white/45 leading-relaxed">
                  These values guide every decision we make and every solution we ship.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
