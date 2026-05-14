/*
 * COMPONENT: Portfolio
 * WHAT IT DOES: "Our work speaks for itself." Showcases real flagship
 *               projects in an alternating image/content layout. Each
 *               item has a small "Project 0X" label, the client, a
 *               descriptive paragraph, and tags.
 * HOW TO TWEAK:
 *  • Edit item list: `portfolio` in src/constants/data.js
 *  • Adjust layout: each item alternates left/right via `idx % 2 === 1`
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { portfolio, NAV_OFFSET } from '../constants/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-canvas scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 flex items-start gap-5 max-w-3xl"
        >
          <span aria-hidden="true" className="mt-2 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full" />
          <div>
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-3">
              {portfolio.eyebrow}
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95] whitespace-pre-line">
              {portfolio.title}
            </h2>
            <p className="mt-5 max-w-xl text-ink/60 leading-relaxed">
              {portfolio.intro}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-14 md:space-y-20"
        >
          {portfolio.items.map((item, idx) => {
            const reverse = idx % 2 === 1
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Image block */}
                <div className={`md:col-span-7 ${reverse ? 'md:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink/[0.06] shadow-card group">
                    <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none [mask-image:linear-gradient(180deg,black,transparent)]" />
                    <div className="relative aspect-[16/10] flex items-center justify-center p-6 sm:p-10">
                      <img
                        src={item.image}
                        alt={`${item.title} preview`}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Text block */}
                <div className={`md:col-span-5 ${reverse ? 'md:order-1' : ''}`}>
                  <div className="text-eyebrow uppercase font-semibold text-brand-700 mb-3">
                    {item.label}
                  </div>
                  <div className="text-sm text-ink/55 mb-2">For {item.client}</div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-ink/65 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li key={t} className="text-xs uppercase tracking-wider text-ink/60 border border-ink/15 rounded-full px-3 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to={portfolio.cta.to}
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer"
          >
            {portfolio.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
