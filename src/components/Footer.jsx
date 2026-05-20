/*
 * COMPONENT: Footer
 * WHAT IT DOES: Clean dark footer.
 *   Row 1 — Logo + tagline + socials | Quick Links | Services | Get In Touch + Legal
 *   Row 2 — Full-width Google Map with address
 *   Row 3 — Copyright bar
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
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
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Top glow */}
      <div aria-hidden="true" className="absolute -top-40 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-700/20 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute -top-24 right-1/4 w-[280px] h-[280px] rounded-full bg-brand-700/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP ROW: brand + links ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-16 pb-12 grid gap-10 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <img
              src="/logo.png"
              alt={brand.full}
              className="h-16 w-auto brightness-0 invert mb-5"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-light">
              {footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {footer.socialLinks.map((s) => {
                const Icon = Icons[s.icon]
                return (
                  <motion.a
                    key={`social-${s.icon}`}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.22 }}
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                  >
                    {Icon ? <Icon width={15} height={15} /> : null}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/40 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((l) => (
                <li key={`quick-${l.href || l.to}`}>
                  {l.href ? (
                    <RouterLink
                      to={l.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {l.label}
                    </RouterLink>
                  ) : (
                    <Link
                      to={l.to}
                      smooth={true}
                      duration={500}
                      offset={NAV_OFFSET}
                      className="text-sm text-white/65 hover:text-white cursor-pointer transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/40 mb-4">Services</p>
            <ul className="space-y-2.5">
              {footer.serviceLinks.map((l) => (
                <li key={`svc-${l.label}`}>
                  <Link
                    to={l.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-sm text-white/65 hover:text-white cursor-pointer transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch + Legal */}
          <div className="lg:col-span-3">
            <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/40 mb-4">Get In Touch</p>
            <ul className="space-y-2.5 text-sm mb-8">
              <li>
                <a href={`mailto:${contact.email}`} className="text-white/65 hover:text-white transition-colors break-all">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.tel}`} className="text-white/65 hover:text-white transition-colors">
                  {contact.phone.display}
                </a>
              </li>
              <li className="text-white/45 leading-relaxed pt-1">
                {contact.address}
              </li>
            </ul>

            <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/40 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {footer.legalLinks.map((l) => (
                <li key={`legal-${l.label}`}>
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-white/[0.08]" />

        {/* ── MAP ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="py-10"
        >
          <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-white/40 mb-4">Our Office</p>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <iframe
              title="e2People Office Location"
              src="https://maps.google.com/maps?q=Baridhara+DOHS+Road+1+Dhaka+Bangladesh&output=embed&z=16"
              width="100%"
              height="220"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/[0.08] py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/35">
          <p>© {year} {brand.full}. All rights reserved.</p>
          <p>{footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
