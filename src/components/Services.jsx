import { motion } from 'framer-motion'

// Services section highlighting key offerings
export default function Services() {
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
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
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to meet your business needs and drive growth.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Services grid with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Ready to transform your business? Let's talk about your needs.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Explore All Services
          </button>
        </motion.div>
      </div>
    </section>
  )
}
