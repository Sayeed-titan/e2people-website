import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const NAV_OFFSET = -64

const blogArticles = [
  {
    id: 1,
    title: 'Why Every Business Needs a Custom ERP System',
    excerpt: 'Learn why ERP systems are no longer optional for businesses that want to scale and optimize operations. Discover how tailored solutions drive efficiency and growth.',
    category: 'Enterprise Solutions',
    readTime: '8 min read',
    image: '/blog/erp-system.jpg',
  },
  {
    id: 2,
    title: 'Mobile Apps: The Future of Customer Engagement',
    excerpt: 'Discover how mobile apps are transforming customer experiences and driving business success. Explore strategies for building apps that engage and retain users.',
    category: 'Mobile Development',
    readTime: '6 min read',
    image: '/blog/mobile-apps.jpg',
  },
  {
    id: 3,
    title: 'How to Build a Successful Website',
    excerpt: 'Key considerations for creating a website that aligns with your business objectives and engages your audience. Learn best practices for modern web design.',
    category: 'Web Development',
    readTime: '7 min read',
    image: '/blog/website-design.jpg',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Blog() {
  return (
    <section id="blog" className="py-24 md:py-32 bg-white scroll-mt-16 relative overflow-hidden">
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.13 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="text-sm font-bold tracking-wider text-blue-700 uppercase">
              Insights & Resources
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mt-4 mb-6">
              Stay Updated
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Discover the latest industry trends, tips, and best practices from e2People Limited. Our blog covers topics ranging from digital transformation to innovative software solutions.
            </p>
          </motion.div>
        </motion.div>

        {/* Blog articles grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden relative">
                <div className="text-6xl opacity-20">📰</div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-300">
                  Read Article
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 text-center"
        >
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={NAV_OFFSET}
            className="btn-primary px-8 py-4 rounded-lg font-semibold inline-block hover:shadow-soft transition-shadow duration-300"
          >
            Subscribe to Our Newsletter
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
