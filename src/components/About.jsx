import { motion } from 'framer-motion'

// About section describing the company mission and values
export default function About() {
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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About e2People
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto"></div>
          </motion.div>

          {/* Mission statement */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              At e2People Limited, we empower businesses and communities through digital innovation. As a fast-growing, tech-enabled service provider, we deliver smart, scalable, and sustainable solutions to clients across various sectors in Bangladesh. Our mission is to lead impactful projects that create real change — both on the ground and in the digital space.
            </p>
          </motion.div>

          {/* Three key pillars */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-blue-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Organization details */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Our Focus Areas</h3>
            <ul className="space-y-2">
              <li>✓ End-to-end software solutions for business operations</li>
              <li>✓ Customer engagement and digital transformation</li>
              <li>✓ Sustainable growth strategies and scalable systems</li>
              <li>✓ Industry-specific solutions tailored to your vision</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
