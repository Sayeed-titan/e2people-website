import { motion } from 'framer-motion'

const values = [
  'Innovation',
  'Integrity',
  'Collaboration',
  'Excellence',
  'Customer-Centricity',
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white scroll-mt-16 relative overflow-hidden">
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.13 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 md:items-start">
          
          {/* LEFT COLUMN — Text content */}
          <motion.div 
            className="space-y-10 md:flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <div>
              <span className="text-sm font-bold tracking-wider text-blue-700 uppercase">
                Who We Are
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mt-4">
                About<br />e2People
              </h2>
            </div>

            {/* Main paragraph */}
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg">
              At e2People Limited, we empower businesses and communities through digital innovation. As a fast-growing, tech-enabled service provider, we deliver smart, scalable, and sustainable solutions to clients across various sectors in Bangladesh.
            </p>

            {/* Mission statement */}
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-700 uppercase mb-3">Our Mission</h3>
              <p className="text-gray-800 font-light leading-relaxed">
                To lead impactful projects that create real change — both on the ground and in the digital space.
              </p>
            </div>

            {/* Vision statement */}
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-700 uppercase mb-3">Our Vision</h3>
              <p className="text-gray-800 font-light leading-relaxed">
                To be the leading digital innovation partner for businesses and communities across South Asia.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Dark card with values */}
          <motion.div
            className="w-full md:flex-1 bg-gray-900 rounded-3xl p-10 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Header */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Our Core Values
            </h3>

            {/* Values list with hover animation */}
            <div className="space-y-2">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="py-4 px-5 rounded-lg bg-gray-800/40 cursor-default hover:bg-blue-600/30 transition-colors duration-500"
                  whileHover={{ paddingLeft: '1.5rem' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-white/80 font-medium hover:text-white transition-colors duration-500">
                    {value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="text-white/50 text-sm font-light">
                These values guide every decision we make and every solution we create.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}