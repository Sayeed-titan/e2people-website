import { motion } from 'framer-motion'

// Partners section — partner logos in a responsive grid with subtle hover lift.
const partners = [
  { name: 'Cypheme', logo: '/partners/cypheme.webp' },
  { name: 'Bondstein', logo: '/partners/bondstein_black_logo.png' },
  { name: 'Spellbound Communications', logo: '/partners/spellbound communications ltd.png' },
  { name: 'The Earth', logo: '/partners/the earth.png' },
  { name: 'Singularity', logo: '/partners/singularity.png' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Partners() {
  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-16">
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
            Our Partners
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted partnerships with leading technology and service providers.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Partners grid — mobile-first breakpoints */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="flex items-center justify-center bg-white border border-gray-100 p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                loading="lazy"
                className="max-w-full max-h-16 sm:max-h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-gray-600 text-base sm:text-lg">
            Partner with us to drive innovation and create lasting impact in the digital space.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
