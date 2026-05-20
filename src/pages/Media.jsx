/*
 * PAGE: /media
 * Public-facing media gallery. Photos in auto-slideshow, videos in a grid.
 * Content managed from /admin → Media section.
 */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MediaSlideshow from '../components/MediaSlideshow'
import { supabase } from '../lib/supabase'

/* ── helpers ─────────────────────────────────────────────────── */
function getVideoEmbed(url) {
  if (!url) return null
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  // Direct file
  return null
}

function isDirectVideo(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
}

/* ── Video Card ──────────────────────────────────────────────── */
function VideoCard({ item }) {
  const embedUrl = getVideoEmbed(item.url)
  const isDirect  = isDirectVideo(item.url)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl overflow-hidden border border-ink/[0.06] shadow-card"
    >
      <div className="relative aspect-video bg-slate-900">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={item.title || 'Video'}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : isDirect ? (
          <video
            src={item.url}
            controls
            poster={item.thumbnail_url || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
            Unsupported video format
          </div>
        )}
      </div>
      {(item.title || item.caption) && (
        <div className="p-5">
          {item.title && (
            <h3 className="font-display font-bold text-ink text-lg leading-snug">{item.title}</h3>
          )}
          {item.caption && (
            <p className="text-ink/60 text-sm mt-1 leading-relaxed">{item.caption}</p>
          )}
        </div>
      )}
    </motion.div>
  )
}

/* ── Empty State ─────────────────────────────────────────────── */
function EmptyState({ type }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-700/10 flex items-center justify-center mb-4">
        {type === 'photo'
          ? <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          : <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        }
      </div>
      <p className="text-ink/40 text-sm">No {type === 'photo' ? 'photos' : 'videos'} yet.</p>
    </div>
  )
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function Media() {
  const [header,  setHeader]  = useState({ eyebrow: 'Our Media', title: 'Gallery & Videos', intro: 'A glimpse into our work, events, and milestones.' })
  const [photos,  setPhotos]  = useState([])
  const [videos,  setVideos]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Load header text from site_content
      const { data: sc } = await supabase
        .from('site_content')
        .select('data')
        .eq('section', 'media')
        .single()
      if (sc?.data) setHeader(sc.data)

      // Load media items
      const { data: items } = await supabase
        .from('media_items')
        .select('*')
        .eq('published', true)
        .order('position', { ascending: true })
        .order('created_at', { ascending: false })

      if (items) {
        setPhotos(items.filter(i => i.type === 'photo'))
        setVideos(items.filter(i => i.type === 'video'))
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-canvas text-ink">
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero strip ── */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-canvas border-b border-ink/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-5 max-w-3xl"
            >
              <span aria-hidden="true" className="mt-2 block w-[3px] h-16 bg-gradient-to-b from-brand-700 to-brand-accent rounded-full shrink-0" />
              <div>
                <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-3 tracking-wider text-xs">
                  {header.eyebrow}
                </div>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95]">
                  {header.title}
                </h1>
                {header.intro && (
                  <p className="mt-5 max-w-xl text-ink/60 leading-relaxed">{header.intro}</p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Photos section ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
              </svg>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Photo Gallery</h2>
            </div>

            {loading ? (
              <div className="aspect-[16/9] rounded-2xl bg-slate-100 animate-pulse" />
            ) : photos.length > 0 ? (
              <MediaSlideshow slides={photos} />
            ) : (
              <EmptyState type="photo" />
            )}
          </div>
        </section>

        {/* ── Videos section ── */}
        <section className="py-16 md:py-24 bg-slate-50/60 border-t border-ink/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Videos</h2>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="aspect-video rounded-2xl bg-slate-200 animate-pulse" />)}
              </div>
            ) : videos.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {videos.map(v => <VideoCard key={v.id} item={v} />)}
              </div>
            ) : (
              <EmptyState type="video" />
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
