import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Footer section with links, copyright, and social info
export default function Footer() {
  const footerLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'About', to: 'about' },
    { label: 'Services', to: 'services' },
    { label: 'Products', to: 'products' },
    { label: 'Team', to: 'team' },
    { label: 'Contact', to: 'contact' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 pb-8 border-b border-gray-700"
        >
          {/* Company info */}
          <div>
            <img src="/logo.png" alt="e2People" className="h-10 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              e2People Limited is a fast-growing tech-enabled service company delivering smart, scalable, and sustainable solutions to businesses and communities across Bangladesh.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href="mailto:contact@e2people.com"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  contact@e2people.com
                </a>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <a
                  href="tel:+880173335334"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  +880 1713 335334
                </a>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p className="text-white">
                  Floor 3rd, House 147, Road 1 (East),<br />
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
          className="pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} e2People Limited. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
