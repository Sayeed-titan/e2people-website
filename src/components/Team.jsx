import { motion } from 'framer-motion'

// Team section showcasing key executives
export default function Team() {
  const team = [
    {
      name: 'Major General A K M Muzahid Uddin (Retd.)',
      title: 'Chairman',
      image: '/team/Major General A K M Muzahid Uddin (Retd.).webp',
      description: 'With over 35 years of distinguished service, Major General Muzahid Uddin has held key leadership roles including Adjutant General of the Bangladesh Army. As Chairman, he leverages his extensive experience in administration and corporate leadership to drive the company\'s strategic growth and success.',
    },
    {
      name: 'Shah Hasibur Rahman',
      title: 'Managing Director',
      image: '/team/Shah Hasibur Rahman.webp',
      description: 'As Managing Director, Shah Hasibur Rahman uses over 18 years of expertise in brand building, PR, and strategic planning to revolutionize Bangladesh\'s healthcare sector. His leadership drives the adoption of cloud-based medical ERP software while fostering the company\'s sustainable growth.',
    },
    {
      name: 'Mohammad Sadequl Arefeen',
      title: 'Director',
      image: '/team/Mohammad Sadequl Arefeen.webp',
      description: 'As a Director, Mohammad Sadequl Arefeen brings over 20 years of expertise as a visionary entrepreneur, investor, and PR strategist. He is pivotal in shaping the company\'s strategic direction and expanding its footprint, using his experience to drive innovation.',
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
    <section id="team" className="py-20 bg-gray-50">
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
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced leaders dedicated to delivering excellence and driving innovation.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Team members grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image - Full display without cutting */}
              <div className="relative bg-gray-100 p-4 flex items-center justify-center min-h-96">
                <img
                  src={member.image}
                  alt={member.name}
                  className="max-w-full max-h-96 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-blue-50 p-8 rounded-xl"
        >
          <p className="text-gray-700 text-lg">
            Together, our team brings decades of combined experience in digital solutions, business transformation, and technology leadership. We're committed to delivering exceptional results for every project.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
