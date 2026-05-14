import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Products section — featured product cards alternating image / text, each linked to the Contact form.
const NAV_OFFSET = -64

const products = [
  {
    id: 1,
    title: 'Visitor Management System (VMS)',
    subtitle: 'Prison Visit Management',
    description:
      'A cloud-based platform designed for the Department of Prisons, Bangladesh. The VMS enables secure online booking of prison visits with NID and OTP verification, supports up to 5 visitors per slot, and offers calendar-based scheduling with payment integration. Features include digital pass downloads, admin reporting, and real-time monitoring for enhanced security and efficiency.',
    features: [
      'Online visit booking',
      'NID & OTP verification',
      'Payment integration',
      'Digital pass generation',
      'Real-time monitoring',
    ],
    image: '/products/Visitior Management System (2).jpg',
    accent: 'from-brand-700 to-brand-400',
  },
  {
    id: 2,
    title: 'PEPMIS',
    subtitle: 'Primary Education Property Management',
    description:
      'Primary Education Property Management Information System operated by the Ministry of Primary and Mass Education through the Directorate of Primary Education (DPE). Developed in association with LGED and DPHE, this system enables comprehensive property management for primary education institutions across Bangladesh.',
    features: [
      'Property tracking',
      'Ministry integration',
      'DPE coordination',
      'LGED partnership',
      'DPHE support',
    ],
    image: '/products/pepmis_dashboard.png',
    accent: 'from-emerald-600 to-emerald-400',
  },
  {
    id: 3,
    title: 'Textile ERP',
    subtitle: 'Enterprise Resource Planning for Textiles',
    description:
      "Enterprise Resource Planning (ERP) software designed for the textile and RMG (Ready-Made Garment) sector. This comprehensive system serves all actors and stakeholders in the textile industry, with modules and sub-modules finalized to maximize benefits for both industry players and Bangladesh's economy.",
    features: [
      'RMG integration',
      'Stakeholder support',
      'HR management',
      'Supply chain',
      'Financial tracking',
    ],
    image: '/products/textile__erp_dashboard.png',
    accent: 'from-violet-600 to-violet-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-leading solutions trusted by government agencies and enterprises.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Products showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-10 md:space-y-12"
        >
          {products.map((product, idx) => {
            const reverse = idx % 2 === 1
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-soft transition-shadow duration-300 border border-gray-100"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 p-6 sm:p-8 md:p-10 items-center">
                  {/* Content side */}
                  <div className={`flex flex-col justify-center ${reverse ? 'md:order-2' : ''}`}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${product.accent} text-transparent bg-clip-text mb-4`}>
                      {product.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-600">
                            <span className="text-brand-700 font-bold mr-2" aria-hidden="true">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="contact"
                      smooth={true}
                      duration={500}
                      offset={NAV_OFFSET}
                      className={`self-start px-6 py-2.5 text-white rounded-lg font-semibold bg-gradient-to-r ${product.accent} hover:opacity-90 transition-opacity duration-300 cursor-pointer shadow-soft`}
                    >
                      Request a Demo
                    </Link>
                  </div>

                  {/* Image side — clean white frame, full-fit image */}
                  <div className={`flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/60 rounded-xl p-4 sm:p-6 ${reverse ? 'md:order-1' : ''}`}>
                    <img
                      src={product.image}
                      alt={`${product.title} dashboard preview`}
                      loading="lazy"
                      className="max-w-full max-h-80 md:max-h-96 object-contain hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
