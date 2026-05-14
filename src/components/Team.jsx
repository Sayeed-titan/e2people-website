/*
 * COMPONENT: Team
 * WHAT IT DOES: Editorial leadership cards. Tall portrait frame on top
 *               (subtle gradient backdrop), eyebrow role beneath, name in
 *               display weight, then bio. Card lifts on hover and the
 *               portrait scales gently.
 * HOW TO TWEAK:
 *  • Edit team list: `team` in src/constants/data.js
 *  • Portrait height: change h-[420px] below
 */
import { motion } from 'framer-motion'
import { team } from '../constants/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32 bg-canvas scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20 flex items-start gap-5 max-w-3xl"
        >
          <span aria-hidden="true" className="mt-2 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full" />
          <div>
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-3">
              Leadership
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tightest leading-[0.95]">
              The people behind
              <br />
              <span className="text-brand-700">the work.</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col bg-white rounded-2xl border border-ink/[0.06] shadow-card hover:shadow-soft overflow-hidden transition-shadow duration-300"
            >
              <div className="relative h-[360px] sm:h-[400px] bg-gradient-to-b from-brand-50 via-canvas to-white flex items-center justify-center overflow-hidden">
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                <img
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  className="relative max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-col gap-2 px-7 py-7">
                <div className="text-eyebrow uppercase text-brand-700 font-semibold">
                  {member.role}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-[1.45rem] text-ink leading-snug">
                  {member.name}
                </h3>
                <p className="mt-2 text-ink/60 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
