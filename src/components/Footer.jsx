import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Footer — company blurb, in-page quick links, and contact info. No dead anchor links.
const NAV_OFFSET = -64

const footerLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Products', to: 'products' },
  { label: 'Team', to: 'team' },
  { label: 'Contact', to: 'contact' },
]

const PHONE_DISPLAY = '+880 1713 335334'
const PHONE_TEL = '+8801713335334'
const EMAIL = 'contact@e2people.com'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 pb-8 border-b border-gray-800"
        >
          {/* Company info */}
          <div>
            <img
              src="/logo.png"
              alt="e2People"
              className="h-10 mb-4 bg-white rounded-md p-1.5"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              e2People Limited is a fast-growing tech-enabled service company delivering smart, scalable, and sustainable solutions to businesses and communities across Bangladesh.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={NAV_OFFSET}
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300 break-words"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p className="text-white leading-relaxed">
                  3rd Floor, House 147, Road 1 (East),<br />
                  Baridhara DOHS, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} e2People Limited. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">Smart Evolution.</p>
        </motion.div>
      </div>
    </footer>
  )
}
