import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const NAV_OFFSET = -64

const services = [
  {
    id: 1,
    icon: '🏢',
    title: 'Enterprise Software Solutions',
    description: 'Custom-built software platforms tailored to streamline your business operations and enhance efficiency.',
    featured: true,
  },
  {
    id: 2,
    icon: '🔄',
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation services to modernize your business processes and systems.',
    featured: true,
  },
  {
    id: 3,
    icon: '👥',
    title: 'Customer Engagement',
    description: 'Solutions designed to enhance customer interaction and build lasting relationships.',
    featured: false,
  },
  {
    id: 4,
    icon: '📊',
    title: 'Data & Analytics',
    description: 'Harness data-driven insights to make informed decisions and optimize operations.',
    featured: false,
  },
  {
    id: 5,
    icon: '🔐',
    title: 'Secure Infrastructure',
    description: 'Robust and secure digital infrastructure protecting your business and data.',
    featured: false,
  },
  {
    id: 6,
    icon: '🚀',
    title: 'Cloud Solutions',
    description: 'Scalable cloud-based solutions for flexibility, reliability, and growth.',
    featured: false,
  },
]

function ServiceCard({ service, index }) {
  const isFeatured = service.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`
        group relative p-8 sm:p-10 rounded-2xl border border-gray-100 bg-white
        transition-all duration-300 hover:shadow-soft hover:-translate-y-1.5
        cursor-pointer overflow-hidden
        ${isFeatured ? 'lg:col-span-2 min-h-80' : 'min-h-64'}
      `}
    >
      {/* Background glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-2xl" />

      {/* Icon with dynamic background */}
      <motion.div
        className="relative inline-flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-brand-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.8)' }} />
        <span className="text-5xl sm:text-6xl relative z-10 group-hover:text-white transition-colors duration-300">
          {service.icon}
        </span>
      </motion.div>

      {/* Content */}
      <div>
        <h3 className={`font-bold text-gray-900 mb-3 leading-snug ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-base">
          {service.description}
        </p>
      </div>

      {/* Subtle hover indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-700 to-brand-400"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export default function Services() {
  const featuredServices = services.filter(s => s.featured)
  const smallServices = services.filter(s => !s.featured)

  return (
    <section id="services" className="py-24 bg-white scroll-mt-16 relative overflow-hidden">
      {/* Subtle dot grid background on left */}
      <div
        className="absolute left-0 top-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(61, 58, 140, 0.08) 1px, transparent 1px)",
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with left-aligned title and blue accent bar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-start gap-6">
            {/* Blue accent bar */}
            <div className="w-1 h-20 bg-gradient-to-b from-brand-700 to-brand-400 rounded-full mt-2" />
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-800 text-ink-DEFAULT leading-[0.95] mb-4">
                Services
              </h2>
              <p className="text-lg text-mute-soft font-light max-w-2xl">
                Comprehensive digital solutions designed to meet your business needs and drive growth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Featured services — span 2 columns */}
          {featuredServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}

          {/* Small services — span 1 column each */}
          {smallServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx + 2} />
          ))}
        </div>

        {/* CTA to contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-mute-soft mb-6">
            Ready to transform your business?
          </p>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="btn-primary px-10 py-4 rounded-lg font-semibold text-center cursor-pointer inline-block hover:shadow-soft transition-shadow duration-300"
          >
            Start Your Project →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
