/**
 * PAGE: /blog/:slug
 * Single blog post page — full article with TipTap HTML rendered beautifully.
 * Styled to match the home page design system.
 */
import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { brand } from '../constants/data'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const calc = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', calc, { passive: true })
    return () => window.removeEventListener('scroll', calc)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full bg-gradient-to-r from-brand-700 to-brand-accent transition-all duration-100"
        style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function BlogPost() {
  const { slug }      = useParams()
  const navigate      = useNavigate()
  const [post, setPost]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true)
        else setPost(data)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="w-full overflow-x-hidden bg-canvas text-ink">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-40 pb-24 space-y-6 animate-pulse">
          <div className="h-4 bg-slate-100 rounded w-1/4" />
          <div className="h-10 bg-slate-100 rounded" />
          <div className="h-10 bg-slate-100 rounded w-4/5" />
          <div className="h-64 bg-slate-100 rounded-2xl mt-8" />
        </div>
        <Footer />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="w-full overflow-x-hidden bg-canvas text-ink">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-48 pb-24 text-center">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-widest mb-4">404</p>
          <h1 className="font-display font-extrabold text-5xl text-ink mb-6">Article not found.</h1>
          <p className="text-ink/60 mb-10">The article you're looking for doesn't exist or has been unpublished.</p>
          <RouterLink to="/blog" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold">
            ← Back to Blog
          </RouterLink>
        </div>
        <Footer />
      </div>
    )
  }

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="w-full overflow-x-hidden bg-canvas text-ink">
      <ReadingProgress />
      <Navbar />

      {/* Article header */}
      <header className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-50 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-ink/45 mb-8 font-medium">
              <RouterLink to="/" className="hover:text-ink transition-colors">Home</RouterLink>
              <span>›</span>
              <RouterLink to="/blog" className="hover:text-ink transition-colors">Blog</RouterLink>
              <span>›</span>
              <span className="text-ink/70 truncate max-w-[20ch]">{post.title}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-brand-700/10 text-brand-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-ink/30">·</span>
              <span className="text-xs text-ink/50">{post.read_time}</span>
              {publishDate && <>
                <span className="text-ink/30">·</span>
                <span className="text-xs text-ink/50">{publishDate}</span>
              </>}
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-[3.25rem] text-ink tracking-tightest leading-[1.05]">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-6 text-lg text-ink/60 leading-relaxed font-light max-w-2xl">
              {post.excerpt}
            </p>

            {/* Cover gradient strip */}
            <div className={`mt-10 w-full h-2 rounded-full bg-gradient-to-r ${post.cover_tone}`} />
          </motion.div>
        </div>
      </header>

      {/* Article body */}
      <main className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ink
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-ink/70 prose-p:leading-relaxed
              prose-strong:text-ink prose-strong:font-semibold
              prose-li:text-ink/70
              prose-blockquote:border-l-brand-700 prose-blockquote:bg-brand-700/5 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:not-italic
              prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-soft"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back + share */}
          <div className="mt-16 pt-10 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <RouterLink to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink transition-colors group">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              Back to all articles
            </RouterLink>
            <div className="flex items-center gap-2 text-xs text-ink/40">
              <span>Published by</span>
              <img src="/logo.png" alt={brand.full} className="h-4 w-auto opacity-50" />
              <span>{brand.full}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
