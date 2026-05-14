/*
 * COMPONENT: Footer
 * WHAT IT DOES: Refined dark footer. Brand block (logo + tagline + socials)
 *               at left, three link columns (Quick Links, Services, Legal),
 *               plus a Get In Touch column. Bottom bar with copyright and
 *               "Made with care by e2People."
 * HOW TO TWEAK:
 *  • Link lists / social URLs: edit `footer` in src/constants/data.js
 *  • Tagline / "Made with care": edit `footer.tagline` and `footer.madeWith`
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { footer, brand, contact, NAV_OFFSET } from '../constants/data'

const Icons = {
  facebook: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h-2a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h2.5l.5-4H14V8a1 1 0 0 1 1-1h2V4z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7.2v.1M12 17v-4.5a2.5 2.5 0 0 1 5 0V17M12 17v-7" />
    </svg>
  ),
  twitter: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l7.5 9.5L4.5 20H7l5.6-6 4.4 6H21l-7.8-10.4L20 4h-2.4l-4.6 5.1L9 4H4z" />
    </svg>
  ),
  instagram: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div aria-hidden="true" className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-brand-700/15 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="py-20 grid gap-12 lg:gap-16 lg:grid-cols-12"
        >
          {/* Brand block */}
          <div className="lg:col-span-4">
            <img
              src="/logo.png"
              alt={brand.full}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-6 text-white/70 leading-relaxed text-sm max-w-sm font-light">
              {footer.tagline}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {footer.socialLinks.map((s) => {
                const Icon = Icons[s.icon]
                return (
                  <motion.a
                    key={`social-${s.icon}`}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/45 transition-colors"
                  >
                    {Icon ? <Icon width={16} height={16} /> : null}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <div className="text-eyebrow uppercase font-semibold text-white/55 mb-5">Quick Links</div>
            <ul className="space-y-3">
              {footer.quickLinks.map((l) => (
                <li key={`quick-${l.to}`}>
                  <Link
                    to={l.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <div className="text-eyebrow uppercase font-semibold text-white/55 mb-5">Services</div>
            <ul className="space-y-3">
              {footer.serviceLinks.map((l) => (
                <li key={`svc-${l.label}`}>
                  <Link
                    to={l.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch + Legal */}
          <div className="lg:col-span-3">
            <div className="text-eyebrow uppercase font-semibold text-white/55 mb-5">Get In Touch</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="text-white/80 hover:text-white transition-colors break-words">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.tel}`} className="text-white/80 hover:text-white transition-colors">
                  {contact.phone.display}
                </a>
              </li>
            </ul>

            <div className="text-eyebrow uppercase font-semibold text-white/55 mt-8 mb-4">Legal</div>
            <ul className="space-y-3">
              {footer.legalLinks.map((l) => (
                <li key={`legal-${l.label}`}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href === '#') e.preventDefault()
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-white/10 py-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {year} {brand.full}. All rights reserved.</p>
          <p>{footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
