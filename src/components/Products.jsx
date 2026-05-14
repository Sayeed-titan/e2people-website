import { motion } from 'framer-motion'

// Products section showcasing main products with descriptions and images
export default function Products() {
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
      color: 'from-blue-600 to-blue-400',
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
      color: 'from-green-600 to-green-400',
    },
    {
      id: 3,
      title: 'Textile ERP',
      subtitle: 'Enterprise Resource Planning for Textiles',
      description:
        'Enterprise Resource Planning (ERP) software designed for the textile and RMG (Ready-Made Garment) sector. This comprehensive system serves all actors and stakeholders in the textile industry, with modules and sub-modules finalized to maximize benefits for both industry players and Bangladesh\'s economy.',
      features: [
        'RMG integration',
        'Stakeholder support',
        'HR management',
        'Supply chain',
        'Financial tracking',
      ],
      image: '/products/textile__erp_dashboard.png',
      color: 'from-purple-600 to-purple-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-leading solutions trusted by government agencies and enterprises.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Products showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`grid md:grid-cols-2 gap-8 p-8`}>
                {/* Content side */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${product.color} text-transparent bg-clip-text mb-4`}>
                    {product.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="text-blue-600 font-bold mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className={`self-start px-6 py-2 text-white rounded-lg font-semibold bg-gradient-to-r ${product.color} hover:opacity-90 transition-opacity`}>
                    Learn More
                  </button>
                </div>

                {/* Image side - Full display without cutting */}
                <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 min-h-80">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
