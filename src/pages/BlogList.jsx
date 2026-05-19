/**
 * PAGE: /blog
 * Blog listing page — styled to match the home page design system.
 * Fetches published posts from Supabase, falls back to static articles.
 */
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { blog as staticBlog, brand } from '../constants/data'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function CoverGradient({ tone, number, image }) {
  if (image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img src={image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    )
  }
  return (
    <div className={`relative aspect-[16/9] bg-gradient-to-br ${tone} overflow-hidden`}>
      <div aria-hidden="true" className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <span className="absolute left-6 bottom-4 font-display font-extrabold text-7xl text-white/20 leading-none select-none">
        {number}
      </span>
      <span className="absolute right-6 top-5 text-[0.65rem] uppercase tracking-widest text-white/70 font-semibold">Journal</span>
    </div>
  )
}

function PostCard({ post, index }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-ink/[0.06] shadow-card hover:shadow-soft transition-shadow duration-300"
    >
      <CoverGradient tone={post.cover_tone || 'from-brand-700 to-brand-400'} number={String(index + 1).padStart(2, '0')} image={post.cover_image} />
      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-ink/50 mb-3">
          <span className="text-brand-700 font-semibold">{post.category}</span>
          <span className="h-px w-5 bg-ink/15" />
          <span>{post.read_time}</span>
        </div>
        <h2 className="font-display font-bold text-xl sm:text-[1.35rem] text-ink leading-snug group-hover:text-brand-700 transition-colors">
          {post.title}
        </h2>
        <p className="mt-3 text-ink/60 text-sm leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <RouterLink
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
        >
          <span className="text-link">Read article</span>
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </RouterLink>
      </div>
    </motion.article>
  )
}

export default function BlogList() {
  const [posts, setPosts]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('slug, title, category, excerpt, cover_tone, cover_image, read_time, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          // Fallback to static articles shaped as posts
          setPosts(staticBlog.articles.map((a, i) => ({
            slug: `article-${i + 1}`,
            title: a.title,
            category: a.category,
            excerpt: a.excerpt,
            cover_tone: a.tone,
            read_time: a.readTime,
          })))
        } else {
          setPosts(data)
        }
        setLoading(false)
      })
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-canvas text-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 bg-canvas overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-700/8 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-5"
          >
            <span aria-hidden="true" className="mt-3 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full shrink-0" />
            <div>
              <p className="text-eyebrow uppercase font-semibold text-ink/50 mb-4">{staticBlog.eyebrow}</p>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-ink tracking-tightest leading-[0.92]">
                Insights &<br />
                <span className="text-brand-700">Resources.</span>
              </h1>
              <p className="mt-6 max-w-xl text-ink/60 leading-relaxed font-light text-lg">
                {staticBlog.intro}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-2xl bg-white border border-ink/[0.05] animate-pulse">
                  <div className="aspect-[16/9] bg-slate-100 rounded-t-2xl" />
                  <div className="p-7 space-y-3">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-5 bg-slate-100 rounded" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                    <div className="h-4 bg-slate-100 rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {posts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)}
            </motion.div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-24 text-ink/40">
              <p className="font-display font-bold text-3xl mb-3">No articles yet</p>
              <p className="text-sm">Check back soon — great content is on its way.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
