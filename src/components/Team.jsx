import { motion } from 'framer-motion'

// Team section — leadership profile cards in an equal-height grid.
const team = [
  {
    name: 'Major General A K M Muzahid Uddin (Retd.)',
    title: 'Chairman',
    image: '/team/Major General A K M Muzahid Uddin (Retd.).webp',
    description:
      "With over 35 years of distinguished service, Major General Muzahid Uddin has held key leadership roles including Adjutant General of the Bangladesh Army. As Chairman, he leverages his extensive experience in administration and corporate leadership to drive the company's strategic growth and success.",
  },
  {
    name: 'Shah Hasibur Rahman',
    title: 'Managing Director',
    image: '/team/Shah Hasibur Rahman.webp',
    description:
      "As Managing Director, Shah Hasibur Rahman uses over 18 years of expertise in brand building, PR, and strategic planning to revolutionize Bangladesh's healthcare sector. His leadership drives the adoption of cloud-based medical ERP software while fostering the company's sustainable growth.",
  },
  {
    name: 'Mohammad Sadequl Arefeen',
    title: 'Director',
    image: '/team/Mohammad Sadequl Arefeen.webp',
    description:
      "As a Director, Mohammad Sadequl Arefeen brings over 20 years of expertise as a visionary entrepreneur, investor, and PR strategist. He is pivotal in shaping the company's strategic direction and expanding its footprint, using his experience to drive innovation.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-50 scroll-mt-16">
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
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced leaders dedicated to delivering excellence and driving innovation.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Team members grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={itemVariants}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group border border-gray-100"
            >
              {/* Image — fixed-height frame so cards are visually consistent */}
              <div className="relative bg-gradient-to-br from-brand-50 to-gray-50 flex items-center justify-center h-72 sm:h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-7">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {member.name}
                </h3>
                <p className="text-brand-700 font-semibold mt-1 mb-4">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Team message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-14 bg-brand-50 p-8 rounded-xl border border-brand-100/60"
        >
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Together, our team brings decades of combined experience in digital solutions, business transformation, and technology leadership. We're committed to delivering exceptional results for every project.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
