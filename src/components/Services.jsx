/*
 * COMPONENT: Services
 * WHAT IT DOES: Showcases the full 13-service offering. Top of the bento
 *               are two large "featured" cards; the remaining 11 services
 *               sit in a refined uniform grid below. Every tile lifts on
 *               hover and the icon inverts (background fills brand,
 *               glyph turns white).
 * HOW TO TWEAK:
 *  • Edit services list: `services` in src/constants/data.js
 *  • Promote a service: set `featured: true` on it (max 2 featured)
 *  • Each service's `icon` key matches one of the inline SVGs below
 *  • Adjust hover lift: change the -y values + transition durations
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { services, NAV_OFFSET } from '../constants/data'

/* ── inline icon set (13 glyphs) ─────────────────────────────────── */
const ICON_PROPS = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icon = ({ name }) => {
  switch (name) {
    case 'web':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M7 6h0M10 6h0M13 6h0" /></svg>)
    case 'mobile':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>)
    case 'palette':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1.5-1.5-1.5-3 0-1 1-1.5 2.5-1.5h1A4 4 0 0 0 21 10.5C21 6.5 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10.5" cy="7.5" r="1" /><circle cx="14.5" cy="7.5" r="1" /><circle cx="17.5" cy="11" r="1" /></svg>)
    case 'enterprise':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="18" rx="1.2" /><rect x="14" y="9" width="7" height="12" rx="1.2" /><path d="M6.5 7v0M6.5 11v0M6.5 15v0M17.5 13v0M17.5 17v0" /></svg>)
    case 'crm':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4" /><circle cx="17" cy="10" r="2.6" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M14.5 19c0-2 1.7-3.5 4-3.5S22 17 22 19" /></svg>)
    case 'migrate':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><path d="M3 8h13M13 4l3 4-3 4M21 16H8M11 12l-3 4 3 4" /></svg>)
    case 'platform':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 10h18M7 14h2M11 14h2M15 14h2" /></svg>)
    case 'video':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M17 10l4-2v8l-4-2" /></svg>)
    case 'motion':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0" /><circle cx="12" cy="12" r="2" /><path d="M4 18l4-2M20 18l-4-2" /></svg>)
    case 'social':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7.6 7.2l3 8M16.4 7.2l-3 8" /></svg>)
    case 'desktop':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>)
    case 'api':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><path d="M10 14l-4 4a2.8 2.8 0 1 1-4-4l4-4M14 10l4-4a2.8 2.8 0 1 1 4 4l-4 4M8 16l8-8" /></svg>)
    case 'database':
      return (<svg {...ICON_PROPS} viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="2.5" /><path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" /></svg>)
    default:
      return null
  }
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceTile({ service, size = 'small' }) {
  const isLarge = size === 'large'
  return (
    <motion.article
      variants={tileVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border border-ink/[0.06] shadow-card hover:shadow-soft transition-shadow duration-300 ${
        isLarge ? 'p-8 sm:p-10 min-h-[260px]' : 'p-6 sm:p-7 min-h-[200px]'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
          <Icon name={service.icon} />
        </span>
        {isLarge && (
          <span aria-hidden="true" className="text-ink/25 group-hover:text-brand-700 transition-colors duration-300 text-xs tracking-editorial uppercase">
            — Flagship
          </span>
        )}
      </div>

      <div className={isLarge ? 'mt-10' : 'mt-8'}>
        <h3 className={`font-display font-bold text-ink leading-tight ${isLarge ? 'text-3xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
          {service.title}
        </h3>
        <p className={`mt-3 text-ink/60 leading-relaxed ${isLarge ? 'max-w-md text-base sm:text-lg' : 'text-sm'}`}>
          {service.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const featured = services.filter((s) => s.featured)
  const rest = services.filter((s) => !s.featured)

  return (
    <section id="services" className="relative py-24 md:py-32 bg-canvas scroll-mt-20">
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
              Our Services
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95]">
              A full toolkit for
              <br />
              <span className="text-brand-700">digital growth.</span>
            </h2>
            <p className="mt-5 max-w-xl text-ink/60 leading-relaxed">
              A wide range of digital services that help businesses grow, improve efficiency, and stay competitive — designed and delivered end-to-end.
            </p>
          </div>
        </motion.div>

        {/* Featured tier — bento large */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6"
        >
          {featured.map((s) => (
            <ServiceTile key={s.title} service={s} size="large" />
          ))}
        </motion.div>

        {/* Remaining 11 in a clean uniform grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {rest.map((s) => (
            <ServiceTile key={s.title} service={s} size="small" />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 text-center"
        >
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer"
          >
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
