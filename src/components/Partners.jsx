import { motion } from 'framer-motion'

// Partners section showcasing trusted partner logos
export default function Partners() {
  const partners = [
    { name: 'Cypheme', logo: '/partners/cypheme.webp' },
    { name: 'Bondstein', logo: '/partners/bondstein_black_logo.png' },
    { name: 'Spellbound Communications', logo: '/partners/spellbound communications ltd.png' },
    { name: 'The Earth', logo: '/partners/the earth.png' },
    { name: 'Singularity', logo: '/partners/singularity.png' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted partnerships with leading technology and service providers.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Partners grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-5 sm:grid-cols-2 gap-8"
        >
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-24 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg">
            Partner with us to drive innovation and create lasting impact in the digital space.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
