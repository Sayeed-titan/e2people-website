import { motion } from 'framer-motion'

// About section — mission statement, three pillars, and focus-areas callout.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const pillars = [
  {
    icon: '💡',
    title: 'Innovation',
    desc: 'We leverage cutting-edge technology to deliver forward-thinking solutions.',
  },
  {
    icon: '🎯',
    title: 'Scalability',
    desc: 'Our solutions grow with your business, adapting to changing needs.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    desc: 'We focus on long-term impact and sustainable digital transformation.',
  },
]

const focusAreas = [
  'End-to-end software solutions for business operations',
  'Customer engagement and digital transformation',
  'Sustainable growth strategies and scalable systems',
  'Industry-specific solutions tailored to your vision',
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About e2People
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto rounded-full" />
          </motion.div>

          {/* Mission statement */}
          <motion.div variants={itemVariants} className="mb-14 text-center max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At e2People Limited, we empower businesses and communities through digital innovation. As a fast-growing, tech-enabled service provider, we deliver smart, scalable, and sustainable solutions to clients across various sectors in Bangladesh. Our mission is to lead impactful projects that create real change — both on the ground and in the digital space.
            </p>
          </motion.div>

          {/* Three key pillars */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="bg-brand-50 p-8 rounded-xl text-center border border-brand-100/60 hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4" aria-hidden="true">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Organization details */}
          <motion.div
            variants={itemVariants}
            className="mt-14 bg-gradient-to-r from-brand-700 to-brand-500 text-white p-8 sm:p-10 rounded-xl shadow-soft"
          >
            <h3 className="text-2xl font-bold mb-5">Our Focus Areas</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5">✓</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
