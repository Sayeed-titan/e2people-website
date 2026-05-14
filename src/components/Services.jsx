import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Services section — six core offerings in an equal-height card grid, with a Contact CTA.
const NAV_OFFSET = -64

const services = [
  {
    icon: '🏢',
    title: 'Enterprise Software Solutions',
    description:
      'Custom-built software platforms tailored to streamline your business operations and enhance efficiency.',
  },
  {
    icon: '🔄',
    title: 'Digital Transformation',
    description:
      'End-to-end digital transformation services to modernize your business processes and systems.',
  },
  {
    icon: '👥',
    title: 'Customer Engagement',
    description:
      'Solutions designed to enhance customer interaction and build lasting relationships.',
  },
  {
    icon: '📊',
    title: 'Data & Analytics',
    description:
      'Harness data-driven insights to make informed decisions and optimize operations.',
  },
  {
    icon: '🔐',
    title: 'Secure Infrastructure',
    description:
      'Robust and secure digital infrastructure protecting your business and data.',
  },
  {
    icon: '🚀',
    title: 'Cloud Solutions',
    description:
      'Scalable cloud-based solutions for flexibility, reliability, and growth.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 scroll-mt-16">
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
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to meet your business needs and drive growth.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="flex flex-col bg-white p-8 rounded-xl shadow-md hover:shadow-soft hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-gray-600 mb-6">
            Ready to transform your business? Let's talk about your needs.
          </p>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="inline-block bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-800 transition-colors duration-300 cursor-pointer shadow-soft"
          >
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
