/*
 * COMPONENT: Blog
 * WHAT IT DOES: "Insights & Resources." Three editorial article cards.
 *               Each card has a gradient cover with the article number
 *               for visual interest, then category, title, excerpt, and
 *               a read link. Closes with a "Read Our Blog" CTA.
 * HOW TO TWEAK:
 *  • Edit articles list: `blog` in src/constants/data.js
 *  • Card gradient: each article's `tone` is a Tailwind from/to pair
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { blog, NAV_OFFSET } from '../constants/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ArticleCover({ number, tone }) {
  return (
    <div className={`relative aspect-[16/10] bg-gradient-to-br ${tone} overflow-hidden`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <span className="absolute left-6 bottom-5 font-display font-extrabold text-7xl sm:text-8xl text-white/80 leading-none tracking-tightest">
        {number}
      </span>
      <span className="absolute right-6 top-5 text-eyebrow uppercase text-white/75 font-semibold">
        Journal
      </span>
    </div>
  )
}

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 md:py-32 bg-canvas scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 flex items-start gap-5 max-w-3xl"
        >
          <span aria-hidden="true" className="mt-2 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full" />
          <div>
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-3">
              {blog.eyebrow}
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95]">
              {blog.title}
            </h2>
            <p className="mt-5 max-w-xl text-ink/60 leading-relaxed">
              {blog.intro}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {blog.articles.map((article) => (
            <motion.article
              key={article.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-ink/[0.06] shadow-card hover:shadow-soft transition-shadow duration-300"
            >
              <ArticleCover number={article.number} tone={article.tone} />

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-ink/55 mb-3">
                  <span className="text-brand-700 font-semibold">{article.category}</span>
                  <span className="h-px w-6 bg-ink/15" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-[1.45rem] text-ink leading-snug">
                  {article.title}
                </h3>
                <p className="mt-3 text-ink/60 text-sm leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={NAV_OFFSET}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink cursor-pointer"
                >
                  <span className="text-link">Read article</span>
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to={blog.cta.to}
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink cursor-pointer group"
          >
            <span className="text-link">{blog.cta.label}</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
