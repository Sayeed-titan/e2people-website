import { motion } from 'framer-motion'

// Solutions section — full-width dark section with horizontal numbered rows.
// Each row has a large faded number + title + description.
// On hover: subtle blue-tinted overlay slides in.

const solutions = [
  {
    number: '01',
    title: 'Custom Web Solutions',
    description: 'Build powerful web applications tailored to your unique business requirements with modern technologies and best practices.',
  },
  {
    number: '02',
    title: 'Mobile App Development',
    description: 'Create intuitive mobile apps that engage users and drive business growth across iOS and Android platforms.',
  },
  {
    number: '03',
    title: 'API Integration',
    description: 'Seamlessly connect your systems with third-party services through robust API design and integration solutions.',
  },
  {
    number: '04',
    title: 'Cloud Migration',
    description: 'Transition your infrastructure to the cloud with minimal downtime and maximum security and efficiency.',
  },
]

const whyChooseUs = [
  { label: '500+', value: 'Projects Completed' },
  { label: '98%', value: 'Client Satisfaction' },
  { label: '15+', value: 'Years Combined Experience' },
  { label: '24/7', value: 'Support Available' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function SolutionRow({ solution, index }) {
  return (
    <motion.div
      variants={itemVariants}
      className="solution-row py-10 border-t border-white/10 first:border-t-0 last:border-b last:border-b-white/10 transition-all duration-300"
    >
      <div className="flex items-start gap-8 md:gap-12">
        {/* Large faded number */}
        <div className="flex-shrink-0">
          <span className="text-7xl md:text-8xl font-display font-900 text-white/15 leading-none select-none">
            {solution.number}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
            {solution.title}
          </h3>
          <p className="text-lg text-white/60 leading-relaxed">
            {solution.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative py-24 md:py-32 bg-ink-DEFAULT scroll-mt-16 overflow-hidden"
    >
      {/* Subtle gradient overlay (darker at edges) */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-soft to-ink-DEFAULT pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-800 text-white leading-[0.95] mb-6">
            Why Choose<br />e2People
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-accent rounded-full" />
        </motion.div>

        {/* Solutions rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          {solutions.map((solution, index) => (
            <SolutionRow key={solution.number} solution={solution} index={index} />
          ))}
        </motion.div>

        {/* Stats grid — "Why Choose Us" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-16 border-t border-white/10"
        >
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-800 text-brand-400 mb-2">
                {item.label}
              </div>
              <div className="text-white/60 font-medium">
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
