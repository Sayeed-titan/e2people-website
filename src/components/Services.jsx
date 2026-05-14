/*
 * COMPONENT: Services
 * WHAT IT DOES: Bento grid of services. Two large flagship tiles on top
 *               and four small tiles below. Hover lifts a tile and inverts
 *               the icon (background fills brand blue, glyph turns white).
 * HOW TO TWEAK:
 *  • Edit services list: `services` in src/constants/data.js
 *  • Each service has an `icon` key matching one of the SVGs below
 *  • Adjust hover lift: -translate-y values + transition durations
 */
import { motion } from 'framer-motion'
import { services } from '../constants/data'

/* ── tiny inline icon set ─────────────────────────────────────────── */
const Icon = ({ name }) => {
  const common = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'enterprise':
      return (<svg {...common} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="18" rx="1.2" /><rect x="14" y="9" width="7" height="12" rx="1.2" /><path d="M6.5 7v0M6.5 11v0M6.5 15v0M17.5 13v0M17.5 17v0" /></svg>)
    case 'transform':
      return (<svg {...common} viewBox="0 0 24 24"><path d="M4 7a8 8 0 0 1 13.66-3M20 17a8 8 0 0 1-13.66 3" /><path d="M17 3v5h-5M7 21v-5h5" /></svg>)
    case 'engagement':
      return (<svg {...common} viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4" /><circle cx="17" cy="10" r="2.6" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M14.5 19c0-2 1.7-3.5 4-3.5S22 17 22 19" /></svg>)
    case 'analytics':
      return (<svg {...common} viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>)
    case 'shield':
      return (<svg {...common} viewBox="0 0 24 24"><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>)
    case 'cloud':
      return (<svg {...common} viewBox="0 0 24 24"><path d="M7 18a5 5 0 0 1-1-9.9A6 6 0 0 1 18 9.5 4.5 4.5 0 0 1 17.5 18H7z" /></svg>)
    default:
      return null
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceTile({ service, className }) {
  return (
    <motion.article
      variants={tileVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border border-ink/[0.06] shadow-card hover:shadow-soft transition-shadow duration-300 p-7 sm:p-9 ${className}`}
    >
      {/* Icon — bg fills with brand on hover, glyph turns white */}
      <div className="flex items-start justify-between">
        <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
          <Icon name={service.icon} />
        </span>
        <span aria-hidden="true" className="text-ink/20 group-hover:text-brand-700 transition-colors duration-300 text-xs tracking-editorial uppercase">
          {service.span === 'large' ? '— Flagship' : ''}
        </span>
      </div>

      <div className="mt-10">
        <h3 className={`font-display font-bold text-ink leading-tight ${service.span === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          {service.title}
        </h3>
        <p className={`mt-3 text-ink/60 leading-relaxed ${service.span === 'large' ? 'max-w-md text-base sm:text-lg' : 'text-sm'}`}>
          {service.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const [a, b, ...small] = services

  return (
    <section id="services" className="relative py-24 md:py-32 bg-canvas scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title — left aligned with thin brand vertical bar */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20 flex items-start gap-5 max-w-3xl"
        >
          <span aria-hidden="true" className="mt-2 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full" />
          <div>
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-3">
              What we do
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95]">
              Services that move
              <br />
              <span className="text-brand-700">businesses forward.</span>
            </h2>
          </div>
        </motion.div>

        {/* Bento grid — 12-col: top 7+5, bottom 4×3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
        >
          <ServiceTile service={a} className="md:col-span-7 md:row-span-1 min-h-[280px]" />
          <ServiceTile service={b} className="md:col-span-5 md:row-span-1 min-h-[280px]" />
          {small.map((s) => (
            <ServiceTile key={s.title} service={s} className="md:col-span-3 min-h-[240px]" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
