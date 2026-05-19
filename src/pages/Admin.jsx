/**
 * PAGE: /admin
 * Full CMS admin panel. Protected by Supabase Auth (email + password).
 * MD can edit every section of the website and save instantly — no developer needed.
 */
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import * as staticData from '../constants/data'

/* ─── helpers ─────────────────────────────────────────────────── */
function buildInitialContent() {
  return {
    brand:     staticData.brand,
    nav:       { navLinks: staticData.navLinks, NAV_OFFSET: staticData.NAV_OFFSET },
    hero:      staticData.hero,
    services:  { items: staticData.services },
    about:     staticData.about,
    solutions: staticData.solutions,
    portfolio: staticData.portfolio,
    team:      { members: staticData.team },
    partners:  { items: staticData.partners },
    blog:      staticData.blog,
    contact:   staticData.contact,
    footer:    staticData.footer,
  }
}

/* ─── tiny UI atoms ────────────────────────────────────────────── */
const Input = ({ label, value, onChange, type = 'text', className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    />
  </div>
)

const Textarea = ({ label, value, onChange, rows = 3, className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
    <textarea
      rows={rows}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-y"
    />
  </div>
)

const SectionCard = ({ title, children, onSave, saving }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
      <h2 className="font-semibold text-slate-800">{title}</h2>
      <button
        onClick={onSave}
        disabled={saving}
        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
)

const ArrayCard = ({ title, items, onAdd, onRemove, onSave, saving, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
      <h2 className="font-semibold text-slate-800">{title}</h2>
      <div className="flex items-center gap-2">
        <button onClick={onAdd} className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full hover:bg-emerald-600 transition-colors">+ Add</button>
        <button onClick={onSave} disabled={saving} className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
)

const ItemBlock = ({ index, onRemove, children }) => (
  <div className="relative border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/50">
    <button onClick={onRemove} className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-xs font-bold">✕ Remove</button>
    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Item {index + 1}</p>
    {children}
  </div>
)

/* ─── LOGIN ────────────────────────────────────────────────────── */
function Login({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <img src="/logo.png" alt="e2People" className="h-10 w-auto mx-auto mb-6" />
        <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Admin Panel</h1>
        <p className="text-xs text-slate-500 text-center mb-8">e2People Limited · Content Management</p>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" value={email} onChange={setEmail} type="email" />
          <Input label="Password" value={password} onChange={setPassword} type="password" />
          {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── MAIN ADMIN ───────────────────────────────────────────────── */
export default function Admin() {
  const [session,  setSession]  = useState(null)
  const [checking, setChecking] = useState(true)
  const [content,  setContent]  = useState(buildInitialContent())
  const [toast,    setToast]    = useState('')
  const [saving,   setSaving]   = useState({})
  const [activeSection, setActiveSection] = useState('brand')

  /* auth check */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  /* load content from DB */
  useEffect(() => {
    if (!session) return
    supabase.from('site_content').select('section, data').then(({ data }) => {
      if (data && data.length > 0) {
        const map = {}
        data.forEach(row => { map[row.section] = row.data })
        setContent(prev => ({ ...prev, ...map }))
      }
    })
  }, [session])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const save = useCallback(async (section) => {
    setSaving(s => ({ ...s, [section]: true }))
    const { error } = await supabase.from('site_content').upsert(
      { section, data: content[section], updated_at: new Date().toISOString() },
      { onConflict: 'section' }
    )
    setSaving(s => ({ ...s, [section]: false }))
    if (error) showToast(`❌ Error saving ${section}: ${error.message}`)
    else showToast(`✅ ${section} saved — live on site!`)
  }, [content])

  const set = useCallback((section, updater) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof updater === 'function' ? updater(prev[section]) : updater
    }))
  }, [])

  if (checking) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading…</div>
  if (!session) return <Login onLogin={() => {}} />

  const c = content
  const sections = [
    { key: 'brand',     label: '🏷️  Brand' },
    { key: 'nav',       label: '🔗  Navigation' },
    { key: 'hero',      label: '🚀  Hero' },
    { key: 'about',     label: 'ℹ️  About' },
    { key: 'services',  label: '⚙️  Services' },
    { key: 'solutions', label: '💡  Solutions' },
    { key: 'portfolio', label: '📁  Portfolio' },
    { key: 'team',      label: '👥  Team' },
    { key: 'partners',  label: '🤝  Partners' },
    { key: 'blog',      label: '📝  Blog' },
    { key: 'contact',   label: '📞  Contact' },
    { key: 'footer',    label: '🔲  Footer & Socials' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-indigo-950 text-white flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-white/10">
          <img src="/logo.png" alt="e2People" className="h-8 w-auto brightness-0 invert mb-3" />
          <p className="text-[0.65rem] text-indigo-300 uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                activeSection === s.key
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-[0.65rem] text-indigo-400 mb-2 truncate">{session.user.email}</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* ── BRAND ── */}
          {activeSection === 'brand' && (
            <SectionCard title="Brand Settings" onSave={() => save('brand')} saving={saving.brand}>
              <Input label="Company Name" value={c.brand?.name} onChange={v => set('brand', b => ({ ...b, name: v }))} />
              <Input label="Full Legal Name" value={c.brand?.full} onChange={v => set('brand', b => ({ ...b, full: v }))} />
              <Textarea label="Tagline (hero area)" value={c.brand?.tagline} onChange={v => set('brand', b => ({ ...b, tagline: v }))} rows={2} />
            </SectionCard>
          )}

          {/* ── NAV ── */}
          {activeSection === 'nav' && (
            <ArrayCard
              title="Navigation Links"
              onAdd={() => set('nav', n => ({ ...n, navLinks: [...(n.navLinks || []), { label: 'New Link', to: 'section-id' }] }))}
              onSave={() => save('nav')}
              saving={saving.nav}
            >
              {(c.nav?.navLinks || []).map((link, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('nav', n => ({ ...n, navLinks: n.navLinks.filter((_, j) => j !== i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Label" value={link.label} onChange={v => set('nav', n => { const l = [...n.navLinks]; l[i] = { ...l[i], label: v }; return { ...n, navLinks: l } })} />
                    <Input label="Section ID (scroll target)" value={link.to} onChange={v => set('nav', n => { const l = [...n.navLinks]; l[i] = { ...l[i], to: v }; return { ...n, navLinks: l } })} />
                  </div>
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* ── HERO ── */}
          {activeSection === 'hero' && (
            <SectionCard title="Hero Section" onSave={() => save('hero')} saving={saving.hero}>
              <Input label="Eyebrow Text" value={c.hero?.eyebrow} onChange={v => set('hero', h => ({ ...h, eyebrow: v }))} />
              <Textarea label="Subtext (below headline)" value={c.hero?.subtext} onChange={v => set('hero', h => ({ ...h, subtext: v }))} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Primary CTA Label" value={c.hero?.primaryCta?.label} onChange={v => set('hero', h => ({ ...h, primaryCta: { ...h.primaryCta, label: v } }))} />
                <Input label="Secondary CTA Label" value={c.hero?.secondaryCta?.label} onChange={v => set('hero', h => ({ ...h, secondaryCta: { ...h.secondaryCta, label: v } }))} />
              </div>
              <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">💡 Headline words are managed in code (design element). Contact developer to change the headline text.</p>
            </SectionCard>
          )}

          {/* ── ABOUT ── */}
          {activeSection === 'about' && (
            <SectionCard title="About Section" onSave={() => save('about')} saving={saving.about}>
              <Input label="Eyebrow" value={c.about?.eyebrow} onChange={v => set('about', a => ({ ...a, eyebrow: v }))} />
              <Input label="Headline" value={c.about?.title} onChange={v => set('about', a => ({ ...a, title: v }))} />
              <Textarea label="Main Paragraph" value={c.about?.paragraph} onChange={v => set('about', a => ({ ...a, paragraph: v }))} rows={4} />
              <div className="grid grid-cols-2 gap-3">
                <Textarea label="Vision" value={c.about?.vision} onChange={v => set('about', a => ({ ...a, vision: v }))} rows={3} />
                <Textarea label="Mission" value={c.about?.mission} onChange={v => set('about', a => ({ ...a, mission: v }))} rows={3} />
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-2">Core Values</p>
              {(c.about?.values || []).map((val, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                  <Input label="Value Name" value={val.title} onChange={v => set('about', a => { const vals = [...a.values]; vals[i] = { ...vals[i], title: v }; return { ...a, values: vals } })} />
                  <Input label="Short Description" value={val.desc} onChange={v => set('about', a => { const vals = [...a.values]; vals[i] = { ...vals[i], desc: v }; return { ...a, values: vals } })} />
                </div>
              ))}
            </SectionCard>
          )}

          {/* ── SERVICES ── */}
          {activeSection === 'services' && (
            <ArrayCard
              title="Services"
              onAdd={() => set('services', s => ({ ...s, items: [...(s.items || []), { title: 'New Service', icon: 'web', featured: false, description: 'Service description.' }] }))}
              onSave={() => save('services')}
              saving={saving.services}
            >
              {(c.services?.items || []).map((svc, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('services', s => ({ ...s, items: s.items.filter((_, j) => j !== i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Title" value={svc.title} onChange={v => set('services', s => { const it = [...s.items]; it[i] = { ...it[i], title: v }; return { ...s, items: it } })} />
                    <Input label="Icon key" value={svc.icon} onChange={v => set('services', s => { const it = [...s.items]; it[i] = { ...it[i], icon: v }; return { ...s, items: it } })} />
                  </div>
                  <Textarea label="Description" value={svc.description} onChange={v => set('services', s => { const it = [...s.items]; it[i] = { ...it[i], description: v }; return { ...s, items: it } })} rows={2} />
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={!!svc.featured} onChange={e => set('services', s => { const it = [...s.items]; it[i] = { ...it[i], featured: e.target.checked }; return { ...s, items: it } })} className="accent-indigo-600" />
                    Featured (large card in bento grid)
                  </label>
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* ── SOLUTIONS ── */}
          {activeSection === 'solutions' && (
            <div className="space-y-6">
              <SectionCard title="Solutions — Header" onSave={() => save('solutions')} saving={saving.solutions}>
                <Input label="Eyebrow" value={c.solutions?.eyebrow} onChange={v => set('solutions', s => ({ ...s, eyebrow: v }))} />
                <Input label="Title" value={c.solutions?.title} onChange={v => set('solutions', s => ({ ...s, title: v }))} />
                <Textarea label="Intro" value={c.solutions?.intro} onChange={v => set('solutions', s => ({ ...s, intro: v }))} rows={3} />
              </SectionCard>
              <ArrayCard
                title="Solutions — Rows"
                onAdd={() => set('solutions', s => ({ ...s, rows: [...(s.rows || []), { number: String((s.rows?.length || 0) + 1).padStart(2, '0'), title: 'New Solution', description: '' }] }))}
                onSave={() => save('solutions')}
                saving={saving.solutions}
              >
                {(c.solutions?.rows || []).map((row, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('solutions', s => ({ ...s, rows: s.rows.filter((_, j) => j !== i) }))}>
                    <div className="grid grid-cols-3 gap-3">
                      <Input label="Number" value={row.number} onChange={v => set('solutions', s => { const r = [...s.rows]; r[i] = { ...r[i], number: v }; return { ...s, rows: r } })} />
                      <Input label="Title" value={row.title} className="col-span-2" onChange={v => set('solutions', s => { const r = [...s.rows]; r[i] = { ...r[i], title: v }; return { ...s, rows: r } })} />
                    </div>
                    <Textarea label="Description" value={row.description} onChange={v => set('solutions', s => { const r = [...s.rows]; r[i] = { ...r[i], description: v }; return { ...s, rows: r } })} rows={2} />
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* ── PORTFOLIO ── */}
          {activeSection === 'portfolio' && (
            <div className="space-y-6">
              <SectionCard title="Portfolio — Header" onSave={() => save('portfolio')} saving={saving.portfolio}>
                <Input label="Eyebrow" value={c.portfolio?.eyebrow} onChange={v => set('portfolio', p => ({ ...p, eyebrow: v }))} />
                <Input label="Title" value={c.portfolio?.title} onChange={v => set('portfolio', p => ({ ...p, title: v }))} />
                <Textarea label="Intro" value={c.portfolio?.intro} onChange={v => set('portfolio', p => ({ ...p, intro: v }))} rows={2} />
              </SectionCard>
              <ArrayCard
                title="Portfolio — Projects"
                onAdd={() => set('portfolio', p => ({ ...p, items: [...(p.items || []), { label: 'Project', client: '', title: 'New Project', description: '', tags: [], image: '' }] }))}
                onSave={() => save('portfolio')}
                saving={saving.portfolio}
              >
                {(c.portfolio?.items || []).map((item, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('portfolio', p => ({ ...p, items: p.items.filter((_, j) => j !== i) }))}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Label" value={item.label} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], label: v }; return { ...p, items: it } })} />
                      <Input label="Client" value={item.client} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], client: v }; return { ...p, items: it } })} />
                    </div>
                    <Input label="Project Title" value={item.title} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], title: v }; return { ...p, items: it } })} />
                    <Textarea label="Description" value={item.description} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], description: v }; return { ...p, items: it } })} rows={3} />
                    <Input label="Image path (e.g. /products/image.png)" value={item.image} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], image: v }; return { ...p, items: it } })} />
                    <Input label="Tags (comma separated)" value={(item.tags || []).join(', ')} onChange={v => set('portfolio', p => { const it = [...p.items]; it[i] = { ...it[i], tags: v.split(',').map(t => t.trim()).filter(Boolean) }; return { ...p, items: it } })} />
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* ── TEAM ── */}
          {activeSection === 'team' && (
            <ArrayCard
              title="Team Members"
              onAdd={() => set('team', t => ({ ...t, members: [...(t.members || []), { name: 'New Member', role: 'Role', bio: '', image: '' }] }))}
              onSave={() => save('team')}
              saving={saving.team}
            >
              {(c.team?.members || []).map((member, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('team', t => ({ ...t, members: t.members.filter((_, j) => j !== i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Full Name" value={member.name} onChange={v => set('team', t => { const m = [...t.members]; m[i] = { ...m[i], name: v }; return { ...t, members: m } })} />
                    <Input label="Role / Title" value={member.role} onChange={v => set('team', t => { const m = [...t.members]; m[i] = { ...m[i], role: v }; return { ...t, members: m } })} />
                  </div>
                  <Input label="Photo path (e.g. /team/photo.webp)" value={member.image} onChange={v => set('team', t => { const m = [...t.members]; m[i] = { ...m[i], image: v }; return { ...t, members: m } })} />
                  <Textarea label="Bio" value={member.bio} onChange={v => set('team', t => { const m = [...t.members]; m[i] = { ...m[i], bio: v }; return { ...t, members: m } })} rows={3} />
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* ── PARTNERS ── */}
          {activeSection === 'partners' && (
            <ArrayCard
              title="Partners"
              onAdd={() => set('partners', p => ({ ...p, items: [...(p.items || []), { name: 'Partner Name', logo: '', href: 'https://' }] }))}
              onSave={() => save('partners')}
              saving={saving.partners}
            >
              {(c.partners?.items || []).map((partner, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('partners', p => ({ ...p, items: p.items.filter((_, j) => j !== i) }))}>
                  <Input label="Partner Name" value={partner.name} onChange={v => set('partners', p => { const it = [...p.items]; it[i] = { ...it[i], name: v }; return { ...p, items: it } })} />
                  <Input label="Logo path (e.g. /partners/logo.png)" value={partner.logo} onChange={v => set('partners', p => { const it = [...p.items]; it[i] = { ...it[i], logo: v }; return { ...p, items: it } })} />
                  <Input label="Website URL" value={partner.href} onChange={v => set('partners', p => { const it = [...p.items]; it[i] = { ...it[i], href: v }; return { ...p, items: it } })} />
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* ── BLOG ── */}
          {activeSection === 'blog' && (
            <div className="space-y-6">
              <SectionCard title="Blog — Header" onSave={() => save('blog')} saving={saving.blog}>
                <Input label="Eyebrow" value={c.blog?.eyebrow} onChange={v => set('blog', b => ({ ...b, eyebrow: v }))} />
                <Input label="Title" value={c.blog?.title} onChange={v => set('blog', b => ({ ...b, title: v }))} />
                <Textarea label="Intro" value={c.blog?.intro} onChange={v => set('blog', b => ({ ...b, intro: v }))} rows={2} />
              </SectionCard>
              <ArrayCard
                title="Blog — Articles"
                onAdd={() => set('blog', b => ({ ...b, articles: [...(b.articles || []), { number: String((b.articles?.length || 0) + 1).padStart(2, '0'), category: 'Category', title: 'Article Title', excerpt: '', readTime: '5 min read', tone: 'from-brand-700 to-brand-400' }] }))}
                onSave={() => save('blog')}
                saving={saving.blog}
              >
                {(c.blog?.articles || []).map((art, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('blog', b => ({ ...b, articles: b.articles.filter((_, j) => j !== i) }))}>
                    <div className="grid grid-cols-3 gap-3">
                      <Input label="Number" value={art.number} onChange={v => set('blog', b => { const a = [...b.articles]; a[i] = { ...a[i], number: v }; return { ...b, articles: a } })} />
                      <Input label="Category" value={art.category} onChange={v => set('blog', b => { const a = [...b.articles]; a[i] = { ...a[i], category: v }; return { ...b, articles: a } })} />
                      <Input label="Read Time" value={art.readTime} onChange={v => set('blog', b => { const a = [...b.articles]; a[i] = { ...a[i], readTime: v }; return { ...b, articles: a } })} />
                    </div>
                    <Input label="Title" value={art.title} onChange={v => set('blog', b => { const a = [...b.articles]; a[i] = { ...a[i], title: v }; return { ...b, articles: a } })} />
                    <Textarea label="Excerpt" value={art.excerpt} onChange={v => set('blog', b => { const a = [...b.articles]; a[i] = { ...a[i], excerpt: v }; return { ...b, articles: a } })} rows={2} />
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* ── CONTACT ── */}
          {activeSection === 'contact' && (
            <SectionCard title="Contact Details" onSave={() => save('contact')} saving={saving.contact}>
              <Input label="Eyebrow" value={c.contact?.eyebrow} onChange={v => set('contact', ct => ({ ...ct, eyebrow: v }))} />
              <Input label="Headline" value={c.contact?.title} onChange={v => set('contact', ct => ({ ...ct, title: v }))} />
              <Textarea label="Subtext" value={c.contact?.subtext} onChange={v => set('contact', ct => ({ ...ct, subtext: v }))} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email" value={c.contact?.email} type="email" onChange={v => set('contact', ct => ({ ...ct, email: v }))} />
                <Input label="Phone (display)" value={c.contact?.phone?.display} onChange={v => set('contact', ct => ({ ...ct, phone: { ...ct.phone, display: v } }))} />
              </div>
              <Input label="Phone (tel: link, no spaces)" value={c.contact?.phone?.tel} onChange={v => set('contact', ct => ({ ...ct, phone: { ...ct.phone, tel: v } }))} />
              <Textarea label="Office Address" value={c.contact?.address} onChange={v => set('contact', ct => ({ ...ct, address: v }))} rows={2} />
            </SectionCard>
          )}

          {/* ── FOOTER ── */}
          {activeSection === 'footer' && (
            <div className="space-y-6">
              <SectionCard title="Footer — General" onSave={() => save('footer')} saving={saving.footer}>
                <Textarea label="Tagline" value={c.footer?.tagline} onChange={v => set('footer', f => ({ ...f, tagline: v }))} rows={2} />
                <Input label="'Made with care' text" value={c.footer?.madeWith} onChange={v => set('footer', f => ({ ...f, madeWith: v }))} />
              </SectionCard>

              <SectionCard title="Social Media URLs" onSave={() => save('footer')} saving={saving.footer}>
                {(c.footer?.socialLinks || []).map((s, i) => (
                  <Input
                    key={i}
                    label={`${s.icon.charAt(0).toUpperCase() + s.icon.slice(1)} URL`}
                    value={s.href}
                    onChange={v => set('footer', f => { const sl = [...f.socialLinks]; sl[i] = { ...sl[i], href: v }; return { ...f, socialLinks: sl } })}
                  />
                ))}
              </SectionCard>

              <ArrayCard
                title="Footer — Service Links"
                onAdd={() => set('footer', f => ({ ...f, serviceLinks: [...(f.serviceLinks || []), { label: 'New Link', to: 'services' }] }))}
                onSave={() => save('footer')}
                saving={saving.footer}
              >
                {(c.footer?.serviceLinks || []).map((l, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('footer', f => ({ ...f, serviceLinks: f.serviceLinks.filter((_, j) => j !== i) }))}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Label" value={l.label} onChange={v => set('footer', f => { const sl = [...f.serviceLinks]; sl[i] = { ...sl[i], label: v }; return { ...f, serviceLinks: sl } })} />
                      <Input label="Section target" value={l.to} onChange={v => set('footer', f => { const sl = [...f.serviceLinks]; sl[i] = { ...sl[i], to: v }; return { ...f, serviceLinks: sl } })} />
                    </div>
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

        </div>
      </main>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm shadow-2xl z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
