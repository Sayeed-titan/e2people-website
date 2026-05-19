/*
 * COMPONENT: Partners
 * WHAT IT DOES: One refined horizontal ribbon of partner logos.
 *               Logos sit on a light canvas with thin dividers between
 *               them; on hover, each logo fades from grayscale to color.
 * HOW TO TWEAK:
 *  • Edit logo list: `partners` in src/constants/data.js
 *  • Adjust ribbon height: max-h-* on the <img>
 */
import { motion } from 'framer-motion'
import { partners } from '../constants/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Partners() {
  return (
    <section id="partners" className="relative py-20 md:py-24 bg-canvas scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="text-eyebrow uppercase font-semibold text-ink/55">Trusted by</span>
          <span className="h-px flex-1 bg-ink/15" />
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-ink/[0.07] border border-ink/[0.07] rounded-2xl overflow-hidden bg-white/60 backdrop-blur"
        >
          {partners.map((p) => (
            <motion.li
              key={p.name}
              variants={itemVariants}
              className="flex items-center justify-center px-6 py-10 sm:py-12"
            >
              <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className="max-w-full max-h-12 sm:max-h-14 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-500"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
