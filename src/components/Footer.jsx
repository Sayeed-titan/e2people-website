import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Footer — refined and complete with dark background, multi-column layout,
// outline social icons, and bottom bar with copyright + tagline.
const NAV_OFFSET = -64

const quickLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Solutions', to: 'solutions' },
  { label: 'Team', to: 'team' },
]

const serviceLinks = [
  { label: 'Enterprise Software', to: 'services' },
  { label: 'Digital Transformation', to: 'services' },
  { label: 'Mobile Development', to: 'services' },
  { label: 'Cloud Solutions', to: 'services' },
  { label: 'Data & Analytics', to: 'services' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Code of Conduct', href: '#' },
]

const socialLinks = [
  { icon: 'f', label: 'Facebook', href: '#' },
  { icon: 'in', label: 'LinkedIn', href: '#' },
  { icon: 'tw', label: 'Twitter', href: '#' },
  { icon: 'gh', label: 'GitHub', href: '#' },
]

const PHONE_DISPLAY = '+880 1713 335334'
const PHONE_TEL = '+8801713335334'
const EMAIL = 'contact@e2people.com'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white text-ink-DEFAULT relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-canvas-DEFAULT pointer-events-none" />

      {/* Subtle texture overlay — noise pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 result=%22noise%22 /><feDisplacementMap in=%22SourceGraphic%22 in2=%22noise%22 scale=%226%22 /></filter><rect width=%22100%22 height=%22100%22 fill=%220F1020%22 filter=%22url(%23noise)%22 /></svg>')",
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 grid md:grid-cols-5 gap-10 md:gap-8 border-b border-ink-DEFAULT/10"
        >
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/logo.png"
              alt="e2People"
              className="h-24 mb-6 rounded-lg"
            />
            <p className="text-ink-DEFAULT/70 text-sm leading-relaxed font-light">
              Digital innovation partner delivering smart, scalable, and sustainable solutions.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold tracking-editorial uppercase text-ink-DEFAULT/80 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-ink-DEFAULT/60 hover:text-ink-DEFAULT transition-colors duration-300 cursor-pointer text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold tracking-editorial uppercase text-ink-DEFAULT/80 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-ink-DEFAULT/60 hover:text-ink-DEFAULT transition-colors duration-300 cursor-pointer text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold tracking-editorial uppercase text-ink-DEFAULT/80 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink-DEFAULT/60 hover:text-ink-DEFAULT transition-colors duration-300 text-sm font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold tracking-editorial uppercase text-ink-DEFAULT/80 mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-ink-DEFAULT/40 uppercase tracking-wider mb-1">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-ink-DEFAULT/80 hover:text-ink-DEFAULT transition-colors duration-300 text-sm font-light break-words"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="text-xs text-ink-DEFAULT/40 uppercase tracking-wider mb-1">Phone</p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="text-ink-DEFAULT/80 hover:text-ink-DEFAULT transition-colors duration-300 text-sm font-light"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer bottom — copyright + tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-ink-DEFAULT/50 font-light">
            &copy; {currentYear} e2People Limited. All rights reserved.
          </div>

          {/* Social icons — outline style */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center border border-ink-DEFAULT/30 rounded-full bg-ink-DEFAULT/5 text-ink-DEFAULT/60 hover:bg-ink-DEFAULT/10 hover:text-ink-DEFAULT hover:border-ink-DEFAULT/60 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <span className="text-sm font-medium">{social.icon}</span>
              </motion.a>
            ))}
          </div>

          <div className="text-sm text-ink-DEFAULT/50 font-light">
            Made with care • Smart Evolution
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
