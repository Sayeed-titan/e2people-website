/**
 * PAGE: /admin
 * Full CMS admin panel. Protected by Supabase Auth (email + password).
 * Lucide icons in sidebar. TipTap rich text editor for blog posts.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import * as staticData from '../constants/data'
import ImageUpload from '../components/admin/ImageUpload'
import {
  Building2, Navigation, Rocket, Info, Settings2, Lightbulb,
  FolderOpen, Users, Handshake, BookOpen, Phone, LayoutTemplate,
  LogOut, Plus, Trash2, Save, Check, AlertCircle, ChevronRight,
  Eye, EyeOff, Pencil, ArrowLeft, Clock, Tag, Type, ExternalLink,
  UserCog, KeyRound, Mail,
} from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'

/* ─── helpers ───────────────────────────────────────────────── */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
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

/* ─── UI atoms ──────────────────────────────────────────────── */
const Input = ({ label, value, onChange, type = 'text', className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">{label}</label>}
    <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)}
      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white transition-shadow" />
  </div>
)
const Textarea = ({ label, value, onChange, rows = 3, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">{label}</label>}
    <textarea rows={rows} value={value ?? ''} onChange={e => onChange(e.target.value)}
      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white resize-y" />
  </div>
)
const SectionCard = ({ title, children, onSave, saving }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
      <h2 className="font-semibold text-slate-700 text-sm">{title}</h2>
      <button onClick={onSave} disabled={saving}
        className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
        {saving ? <><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</> : <><Save size={12} />Save</>}
      </button>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
)
const ArrayCard = ({ title, onAdd, onSave, saving, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
      <h2 className="font-semibold text-slate-700 text-sm">{title}</h2>
      <div className="flex items-center gap-2">
        <button onClick={onAdd} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full hover:bg-emerald-600 transition-colors"><Plus size={12} />Add</button>
        <button onClick={onSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {saving ? 'Saving…' : <><Save size={12} />Save All</>}
        </button>
      </div>
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
)
const ItemBlock = ({ index, onRemove, children }) => (
  <div className="relative border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[0.62rem] font-bold uppercase tracking-widest text-slate-300">Item {index + 1}</span>
      <button onClick={onRemove} className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-semibold transition-colors"><Trash2 size={12} />Remove</button>
    </div>
    {children}
  </div>
)

/* ─── TipTap toolbar ────────────────────────────────────────── */
function ToolbarBtn({ onClick, active, title, children }) {
  return (
    <button type="button" onClick={onClick} title={title}
      className={`p-1.5 rounded text-sm transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
      {children}
    </button>
  )
}
function RichEditor({ value, onChange }) {
  const imgInputRef = useRef(null)
  const [imgUploading, setImgUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full my-4' } }),
      Placeholder.configure({ placeholder: 'Start writing your article here…' }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const uploadInlineImage = async (file) => {
    if (!file) return
    setImgUploading(true)
    const ext  = file.name.split('.').pop()
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('blog-images').upload(name, file, { cacheControl: '3600' })
    if (!error) {
      const { data } = supabase.storage.from('blog-images').getPublicUrl(name)
      editor.chain().focus().setImage({ src: data.publicUrl }).run()
    }
    setImgUploading(false)
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      {/* Hidden file input for inline image upload */}
      <input ref={imgInputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { uploadInlineImage(e.target.files?.[0]); e.target.value = '' }} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-100 bg-slate-50/80">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <strong className="text-[11px]">B</strong>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <em className="text-[11px]">I</em>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <span className="text-[11px] underline">U</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
          <span className="text-[11px] bg-yellow-200 px-0.5">H</span>
        </ToolbarBtn>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        {[1,2,3].map(n => (
          <ToolbarBtn key={n} onClick={() => editor.chain().focus().toggleHeading({ level: n }).run()} active={editor.isActive('heading', { level: n })} title={`Heading ${n}`}>
            <span className="text-[11px] font-bold">H{n}</span>
          </ToolbarBtn>
        ))}
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          <span className="text-[11px]">• List</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          <span className="text-[11px]">1. List</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <span className="text-[11px]">" Quote</span>
        </ToolbarBtn>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
          <span className="text-[11px]">Left</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center">
          <span className="text-[11px]">Center</span>
        </ToolbarBtn>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn onClick={() => {
          const url = window.prompt('Enter URL:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }} active={editor.isActive('link')} title="Add link">
          <span className="text-[11px]">Link</span>
        </ToolbarBtn>
        {/* Real file upload for inline images */}
        <ToolbarBtn onClick={() => imgInputRef.current?.click()} active={false} title="Upload image from device">
          <span className={`text-[11px] flex items-center gap-1 ${imgUploading ? 'opacity-50' : ''}`}>
            {imgUploading ? '⏳' : '📷'} Image
          </span>
        </ToolbarBtn>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
          <span className="text-[11px]">↩ Undo</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
          <span className="text-[11px]">↪ Redo</span>
        </ToolbarBtn>
      </div>
      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-sm prose-slate max-w-none p-5 min-h-[320px] focus-within:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-300 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
    </div>
  )
}

/* ─── Blog post editor ──────────────────────────────────────── */
const TONES = [
  { label: 'Brand Purple',  value: 'from-brand-700 to-brand-400' },
  { label: 'Emerald Green', value: 'from-emerald-700 to-emerald-400' },
  { label: 'Violet',        value: 'from-violet-700 to-violet-400' },
  { label: 'Rose',          value: 'from-rose-700 to-rose-400' },
  { label: 'Amber',         value: 'from-amber-600 to-amber-400' },
  { label: 'Sky Blue',      value: 'from-sky-700 to-sky-400' },
  { label: 'Teal',          value: 'from-teal-700 to-teal-400' },
]

function BlogEditor({ post, onBack, onSaved, showToast }) {
  const [form, setForm] = useState(post || {
    slug: '', title: '', category: '', excerpt: '', content: '',
    cover_tone: 'from-brand-700 to-brand-400', read_time: '5 min read',
    published: false,
  })
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const upd = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const autoSlug = (title) => {
    upd('title', title)
    if (!form.slug || form.slug === slugify(form.title)) {
      upd('slug', slugify(title))
    }
  }

  const save = async (publishState) => {
    if (!form.title.trim()) { showToast('❌ Title is required'); return }
    if (!form.slug.trim())  { showToast('❌ Slug is required');  return }
    const btn = publishState !== undefined ? setPublishing : setSaving
    btn(true)
    const payload = {
      ...form,
      published: publishState !== undefined ? publishState : form.published,
      published_at: publishState ? new Date().toISOString() : form.published_at,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase
      .from('blog_posts')
      .upsert(payload, { onConflict: 'slug' })
    btn(false)
    if (error) { showToast(`❌ ${error.message}`); return }
    setForm(f => ({ ...f, published: payload.published }))
    showToast(publishState ? '🚀 Published!' : '✅ Draft saved!')
    onSaved()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium">
          <ArrowLeft size={16} />Back to posts
        </button>
        <span className="text-slate-200">|</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${form.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {form.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <Input label="Article Title" value={form.title} onChange={autoSlug} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="URL Slug (auto-generated)" value={form.slug} onChange={v => upd('slug', slugify(v))} />
          <Input label="Category" value={form.category} onChange={v => upd('category', v)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Read Time (e.g. 5 min read)" value={form.read_time} onChange={v => upd('read_time', v)} />
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">
              Cover Colour <span className="normal-case text-slate-300">(fallback if no photo)</span>
            </label>
            <select value={form.cover_tone} onChange={e => upd('cover_tone', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
              {TONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <Textarea label="Excerpt / Summary (shown on blog listing)" value={form.excerpt} onChange={v => upd('excerpt', v)} rows={2} />

        {/* Cover / thumbnail image */}
        <div className="pt-2 border-t border-slate-100">
          <ImageUpload
            label="Cover / Thumbnail Photo (shown on blog cards and article header)"
            hint="JPG, PNG or WebP · 16:9 recommended · max 10 MB"
            aspect="aspect-video"
            value={form.cover_image || ''}
            onUpload={url => upd('cover_image', url)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <h2 className="font-semibold text-slate-700 text-sm">Article Content</h2>
          <p className="text-xs text-slate-400 mt-0.5">Use the toolbar to format. Changes save with the buttons below.</p>
        </div>
        <div className="p-4">
          <RichEditor value={form.content} onChange={v => upd('content', v)} />
        </div>
      </div>

      <div className="flex items-center gap-3 pb-8">
        <button onClick={() => save()} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 text-white text-sm font-semibold rounded-full hover:bg-slate-800 disabled:opacity-50 transition-colors">
          {saving ? 'Saving…' : <><Save size={14} />Save Draft</>}
        </button>
        <button onClick={() => save(true)} disabled={publishing}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-colors">
          {publishing ? 'Publishing…' : <><Eye size={14} />Publish</>}
        </button>
        {form.published && (
          <button onClick={() => save(false)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-full hover:bg-amber-600 transition-colors">
            <EyeOff size={14} />Unpublish
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Blog list view ────────────────────────────────────────── */
function BlogManager({ showToast }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = list, 'new' = new, {post} = edit

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const deletePost = async (slug) => {
    if (!window.confirm('Delete this post?')) return
    await supabase.from('blog_posts').delete().eq('slug', slug)
    showToast('🗑️ Post deleted')
    load()
  }

  if (editing === 'new' || (editing && editing.slug)) {
    return (
      <BlogEditor
        post={editing === 'new' ? null : editing}
        onBack={() => setEditing(null)}
        onSaved={load}
        showToast={showToast}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-800">Blog Posts</h2>
          <p className="text-xs text-slate-400 mt-0.5">{posts.length} total · {posts.filter(p => p.published).length} published</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors">
          <Plus size={14} />New Post
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-16">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-400 py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen size={32} className="mx-auto mb-3 text-slate-200" />
          <p className="font-medium">No posts yet</p>
          <p className="text-sm mt-1">Click "New Post" to write your first article.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.slug} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${post.cover_tone} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[0.62rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-[0.68rem] text-slate-400">{post.category}</span>
                  <span className="text-[0.68rem] text-slate-300">·</span>
                  <span className="text-[0.68rem] text-slate-400">{post.read_time}</span>
                </div>
                <p className="font-semibold text-slate-800 text-sm truncate">{post.title}</p>
                <p className="text-xs text-slate-400 truncate">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(post)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Pencil size={12} />Edit
                </button>
                <button onClick={() => deletePost(post.slug)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={12} />Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── LOGIN ─────────────────────────────────────────────────── */
function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <img src="/logo.png" alt="e2People" className="h-10 w-auto mx-auto mb-6" />
        <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Admin Panel</h1>
        <p className="text-xs text-slate-400 text-center mb-8">e2People Limited · Content Management</p>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" value={email} onChange={setEmail} type="email" />
          <Input label="Password" value={password} onChange={setPassword} type="password" />
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
              <AlertCircle size={14} />{error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── ACCOUNT SETTINGS ──────────────────────────────────────── */
function AccountSettings() {
  const [user, setUser] = useState(null)
  const [newEmail, setNewEmail]       = useState('')
  const [newPass,  setNewPass]        = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [emailStatus, setEmailStatus] = useState(null)   // { ok, msg }
  const [passStatus,  setPassStatus]  = useState(null)
  const [emailSaving, setEmailSaving] = useState(false)
  const [passSaving,  setPassSaving]  = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
  }, [])

  async function handleEmailUpdate(e) {
    e.preventDefault()
    if (!newEmail.trim()) return setEmailStatus({ ok: false, msg: 'Please enter a new email address.' })
    setEmailSaving(true); setEmailStatus(null)
    const { error } = await supabase.auth.updateUser({ email: newEmail.trim() })
    setEmailSaving(false)
    if (error) {
      setEmailStatus({ ok: false, msg: error.message })
    } else {
      setEmailStatus({ ok: true, msg: 'Confirmation link sent to your new email. Click it to complete the change.' })
      setNewEmail('')
    }
  }

  async function handlePassUpdate(e) {
    e.preventDefault()
    if (newPass.length < 8) return setPassStatus({ ok: false, msg: 'Password must be at least 8 characters.' })
    if (newPass !== confirmPass) return setPassStatus({ ok: false, msg: 'Passwords do not match.' })
    setPassSaving(true); setPassStatus(null)
    const { error } = await supabase.auth.updateUser({ password: newPass })
    setPassSaving(false)
    if (error) {
      setPassStatus({ ok: false, msg: error.message })
    } else {
      setPassStatus({ ok: true, msg: 'Password updated successfully.' })
      setNewPass(''); setConfirmPass('')
    }
  }

  const StatusBanner = ({ status }) => status ? (
    <div className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${status.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
      {status.ok ? <Check size={15} className="mt-0.5 shrink-0" /> : <AlertCircle size={15} className="mt-0.5 shrink-0" />}
      <span>{status.msg}</span>
    </div>
  ) : null

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-xl font-bold text-slate-800">My Account</h1>
        <p className="text-sm text-slate-500 mt-1">Update your admin login credentials below.</p>
        {user && (
          <div className="mt-3 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <Mail size={12} /> Signed in as <strong>{user.email}</strong>
          </div>
        )}
      </div>

      {/* Change Email */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center gap-2">
          <Mail size={15} className="text-indigo-500" />
          <h2 className="font-semibold text-slate-700 text-sm">Change Email Address</h2>
        </div>
        <form onSubmit={handleEmailUpdate} className="p-6 space-y-4">
          <Input
            label="New Email Address"
            type="email"
            value={newEmail}
            onChange={setNewEmail}
          />
          <StatusBanner status={emailStatus} />
          <button type="submit" disabled={emailSaving}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
            {emailSaving
              ? <><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</>
              : <><Mail size={13} />Send Confirmation</>
            }
          </button>
          <p className="text-xs text-slate-400">A confirmation link will be sent to the new address. The change takes effect after you click the link.</p>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center gap-2">
          <KeyRound size={15} className="text-indigo-500" />
          <h2 className="font-semibold text-slate-700 text-sm">Change Password</h2>
        </div>
        <form onSubmit={handlePassUpdate} className="p-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">New Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">Confirm New Password</label>
            <input
              type={showPass ? 'text' : 'password'}
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              placeholder="Repeat password"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            />
          </div>
          <StatusBanner status={passStatus} />
          <button type="submit" disabled={passSaving}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
            {passSaving
              ? <><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />Updating…</>
              : <><KeyRound size={13} />Update Password</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── SIDEBAR NAV ───────────────────────────────────────────── */
const NAV_ITEMS = [
  { key: 'brand',     label: 'Brand',       Icon: Building2      },
  { key: 'nav',       label: 'Navigation',  Icon: Navigation     },
  { key: 'hero',      label: 'Hero',        Icon: Rocket         },
  { key: 'about',     label: 'About',       Icon: Info           },
  { key: 'services',  label: 'Services',    Icon: Settings2      },
  { key: 'solutions', label: 'Solutions',   Icon: Lightbulb      },
  { key: 'portfolio', label: 'Portfolio',   Icon: FolderOpen     },
  { key: 'team',      label: 'Team',        Icon: Users          },
  { key: 'partners',  label: 'Partners',    Icon: Handshake      },
  { key: 'blog',      label: 'Blog Posts',  Icon: BookOpen       },
  { key: 'contact',   label: 'Contact',     Icon: Phone          },
  { key: 'footer',    label: 'Footer',      Icon: LayoutTemplate },
  { key: 'account',   label: 'My Account',  Icon: UserCog        },
]

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function Admin() {
  const [session,  setSession]  = useState(null)
  const [checking, setChecking] = useState(true)
  const [content,  setContent]  = useState(buildInitialContent())
  const [toast,    setToast]    = useState('')
  const [saving,   setSaving]   = useState({})
  const [activeSection, setActiveSection] = useState('brand')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setChecking(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    supabase.from('site_content').select('section, data').then(({ data }) => {
      if (data?.length) {
        const map = {}
        data.forEach(r => { map[r.section] = r.data })
        setContent(p => ({ ...p, ...map }))
      }
    })
  }, [session])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const save = useCallback(async (section) => {
    setSaving(s => ({ ...s, [section]: true }))
    const { error } = await supabase.from('site_content').upsert(
      { section, data: content[section], updated_at: new Date().toISOString() },
      { onConflict: 'section' }
    )
    setSaving(s => ({ ...s, [section]: false }))
    error ? showToast(`❌ ${error.message}`) : showToast(`✅ ${section} saved — live!`)
  }, [content])

  const set = useCallback((section, updater) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof updater === 'function' ? updater(prev[section]) : updater,
    }))
  }, [])

  if (checking) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-300 text-sm">Loading…</div>
  if (!session) return <Login />

  const c = content

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-[#0f1020] text-white flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-white/10">
          <img src="/logo.png" alt="e2People" className="h-7 w-auto brightness-0 invert mb-3" />
          <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-semibold">Content Manager</span>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-[0.72rem] text-white/40 hover:text-white/80 transition-colors group">
            <ExternalLink size={11} />
            <span>View live site</span>
          </a>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeSection === key
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-white/50 hover:bg-white/8 hover:text-white/80'
              }`}>
              <Icon size={16} />
              {label}
              {activeSection === key && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <p className="text-[0.6rem] text-white/30 truncate">{session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-colors">
            <LogOut size={13} />Sign Out
          </button>
        </div>
      </aside>

      {/* ── Content area ── */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* BRAND */}
          {activeSection === 'brand' && (
            <SectionCard title="Brand Settings" onSave={() => save('brand')} saving={saving.brand}>
              <Input label="Company Name" value={c.brand?.name} onChange={v => set('brand', b => ({ ...b, name: v }))} />
              <Input label="Full Legal Name" value={c.brand?.full} onChange={v => set('brand', b => ({ ...b, full: v }))} />
              <Textarea label="Main Tagline" value={c.brand?.tagline} onChange={v => set('brand', b => ({ ...b, tagline: v }))} rows={2} />
            </SectionCard>
          )}

          {/* NAV */}
          {activeSection === 'nav' && (
            <ArrayCard title="Navigation Links"
              onAdd={() => set('nav', n => ({ ...n, navLinks: [...(n.navLinks||[]), { label: 'New Link', to: 'section-id' }] }))}
              onSave={() => save('nav')} saving={saving.nav}>
              {(c.nav?.navLinks||[]).map((link, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('nav', n => ({ ...n, navLinks: n.navLinks.filter((_,j) => j!==i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Label" value={link.label} onChange={v => set('nav', n => { const l=[...n.navLinks]; l[i]={...l[i],label:v}; return {...n,navLinks:l} })} />
                    <Input label="Section ID" value={link.to} onChange={v => set('nav', n => { const l=[...n.navLinks]; l[i]={...l[i],to:v}; return {...n,navLinks:l} })} />
                  </div>
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* HERO */}
          {activeSection === 'hero' && (
            <SectionCard title="Hero Section" onSave={() => save('hero')} saving={saving.hero}>
              <Input label="Eyebrow Text" value={c.hero?.eyebrow} onChange={v => set('hero', h => ({ ...h, eyebrow: v }))} />
              <Textarea label="Subtext" value={c.hero?.subtext} onChange={v => set('hero', h => ({ ...h, subtext: v }))} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Primary CTA" value={c.hero?.primaryCta?.label} onChange={v => set('hero', h => ({ ...h, primaryCta: { ...h.primaryCta, label: v } }))} />
                <Input label="Secondary CTA" value={c.hero?.secondaryCta?.label} onChange={v => set('hero', h => ({ ...h, secondaryCta: { ...h.secondaryCta, label: v } }))} />
              </div>
            </SectionCard>
          )}

          {/* ABOUT */}
          {activeSection === 'about' && (
            <SectionCard title="About Section" onSave={() => save('about')} saving={saving.about}>
              <Input label="Eyebrow" value={c.about?.eyebrow} onChange={v => set('about', a => ({ ...a, eyebrow: v }))} />
              <Input label="Headline" value={c.about?.title} onChange={v => set('about', a => ({ ...a, title: v }))} />
              <Textarea label="Main Paragraph" value={c.about?.paragraph} onChange={v => set('about', a => ({ ...a, paragraph: v }))} rows={4} />
              <div className="grid grid-cols-2 gap-3">
                <Textarea label="Vision" value={c.about?.vision} onChange={v => set('about', a => ({ ...a, vision: v }))} rows={3} />
                <Textarea label="Mission" value={c.about?.mission} onChange={v => set('about', a => ({ ...a, mission: v }))} rows={3} />
              </div>
              <p className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400 pt-2">Core Values</p>
              {(c.about?.values||[]).map((val, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                  <Input label="Value Name" value={val.title} onChange={v => set('about', a => { const vals=[...a.values]; vals[i]={...vals[i],title:v}; return {...a,values:vals} })} />
                  <Input label="Description" value={val.desc} onChange={v => set('about', a => { const vals=[...a.values]; vals[i]={...vals[i],desc:v}; return {...a,values:vals} })} />
                </div>
              ))}
            </SectionCard>
          )}

          {/* SERVICES */}
          {activeSection === 'services' && (
            <ArrayCard title="Services"
              onAdd={() => set('services', s => ({ ...s, items: [...(s.items||[]), { title: 'New Service', icon: 'web', featured: false, description: '' }] }))}
              onSave={() => save('services')} saving={saving.services}>
              {(c.services?.items||[]).map((svc, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('services', s => ({ ...s, items: s.items.filter((_,j) => j!==i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Title" value={svc.title} onChange={v => set('services', s => { const it=[...s.items]; it[i]={...it[i],title:v}; return {...s,items:it} })} />
                    <Input label="Icon key" value={svc.icon} onChange={v => set('services', s => { const it=[...s.items]; it[i]={...it[i],icon:v}; return {...s,items:it} })} />
                  </div>
                  <Textarea label="Description" value={svc.description} onChange={v => set('services', s => { const it=[...s.items]; it[i]={...it[i],description:v}; return {...s,items:it} })} rows={2} />
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                    <input type="checkbox" checked={!!svc.featured} onChange={e => set('services', s => { const it=[...s.items]; it[i]={...it[i],featured:e.target.checked}; return {...s,items:it} })} className="accent-indigo-600" />
                    Featured (large bento card)
                  </label>
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* SOLUTIONS */}
          {activeSection === 'solutions' && (
            <div className="space-y-5">
              <SectionCard title="Solutions — Header" onSave={() => save('solutions')} saving={saving.solutions}>
                <Input label="Eyebrow" value={c.solutions?.eyebrow} onChange={v => set('solutions', s => ({ ...s, eyebrow: v }))} />
                <Input label="Title" value={c.solutions?.title} onChange={v => set('solutions', s => ({ ...s, title: v }))} />
                <Textarea label="Intro" value={c.solutions?.intro} onChange={v => set('solutions', s => ({ ...s, intro: v }))} rows={3} />
              </SectionCard>
              <ArrayCard title="Solution Rows"
                onAdd={() => set('solutions', s => ({ ...s, rows: [...(s.rows||[]), { number: String((s.rows?.length||0)+1).padStart(2,'0'), title: '', description: '' }] }))}
                onSave={() => save('solutions')} saving={saving.solutions}>
                {(c.solutions?.rows||[]).map((row, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('solutions', s => ({ ...s, rows: s.rows.filter((_,j) => j!==i) }))}>
                    <div className="grid grid-cols-4 gap-3">
                      <Input label="No." value={row.number} onChange={v => set('solutions', s => { const r=[...s.rows]; r[i]={...r[i],number:v}; return {...s,rows:r} })} />
                      <Input label="Title" value={row.title} className="col-span-3" onChange={v => set('solutions', s => { const r=[...s.rows]; r[i]={...r[i],title:v}; return {...s,rows:r} })} />
                    </div>
                    <Textarea label="Description" value={row.description} onChange={v => set('solutions', s => { const r=[...s.rows]; r[i]={...r[i],description:v}; return {...s,rows:r} })} rows={2} />
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* PORTFOLIO */}
          {activeSection === 'portfolio' && (
            <div className="space-y-5">
              <SectionCard title="Portfolio — Header" onSave={() => save('portfolio')} saving={saving.portfolio}>
                <Input label="Eyebrow" value={c.portfolio?.eyebrow} onChange={v => set('portfolio', p => ({ ...p, eyebrow: v }))} />
                <Input label="Title" value={c.portfolio?.title} onChange={v => set('portfolio', p => ({ ...p, title: v }))} />
                <Textarea label="Intro" value={c.portfolio?.intro} onChange={v => set('portfolio', p => ({ ...p, intro: v }))} rows={2} />
              </SectionCard>
              <ArrayCard title="Projects"
                onAdd={() => set('portfolio', p => ({ ...p, items: [...(p.items||[]), { label: 'Project', client: '', title: '', description: '', tags: [], image: '' }] }))}
                onSave={() => save('portfolio')} saving={saving.portfolio}>
                {(c.portfolio?.items||[]).map((item, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('portfolio', p => ({ ...p, items: p.items.filter((_,j) => j!==i) }))}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Label" value={item.label} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],label:v}; return {...p,items:it} })} />
                      <Input label="Client" value={item.client} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],client:v}; return {...p,items:it} })} />
                    </div>
                    <Input label="Title" value={item.title} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],title:v}; return {...p,items:it} })} />
                    <Textarea label="Description" value={item.description} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],description:v}; return {...p,items:it} })} rows={2} />
                    <Input label="Image path" value={item.image} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],image:v}; return {...p,items:it} })} />
                    <Input label="Tags (comma separated)" value={(item.tags||[]).join(', ')} onChange={v => set('portfolio', p => { const it=[...p.items]; it[i]={...it[i],tags:v.split(',').map(t=>t.trim()).filter(Boolean)}; return {...p,items:it} })} />
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* TEAM */}
          {activeSection === 'team' && (
            <ArrayCard title="Team Members"
              onAdd={() => set('team', t => ({ ...t, members: [...(t.members||[]), { name: '', role: '', bio: '', image: '' }] }))}
              onSave={() => save('team')} saving={saving.team}>
              {(c.team?.members||[]).map((m, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('team', t => ({ ...t, members: t.members.filter((_,j) => j!==i) }))}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Full Name" value={m.name} onChange={v => set('team', t => { const mb=[...t.members]; mb[i]={...mb[i],name:v}; return {...t,members:mb} })} />
                    <Input label="Role / Title" value={m.role} onChange={v => set('team', t => { const mb=[...t.members]; mb[i]={...mb[i],role:v}; return {...t,members:mb} })} />
                  </div>
                  <Input label="Photo path (e.g. /team/photo.webp)" value={m.image} onChange={v => set('team', t => { const mb=[...t.members]; mb[i]={...mb[i],image:v}; return {...t,members:mb} })} />
                  <Textarea label="Bio" value={m.bio} onChange={v => set('team', t => { const mb=[...t.members]; mb[i]={...mb[i],bio:v}; return {...t,members:mb} })} rows={3} />
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* PARTNERS */}
          {activeSection === 'partners' && (
            <ArrayCard title="Partners"
              onAdd={() => set('partners', p => ({ ...p, items: [...(p.items||[]), { name: '', logo: '', href: 'https://' }] }))}
              onSave={() => save('partners')} saving={saving.partners}>
              {(c.partners?.items||[]).map((partner, i) => (
                <ItemBlock key={i} index={i} onRemove={() => set('partners', p => ({ ...p, items: p.items.filter((_,j) => j!==i) }))}>
                  <Input label="Partner Name" value={partner.name} onChange={v => set('partners', p => { const it=[...p.items]; it[i]={...it[i],name:v}; return {...p,items:it} })} />
                  <Input label="Logo path" value={partner.logo} onChange={v => set('partners', p => { const it=[...p.items]; it[i]={...it[i],logo:v}; return {...p,items:it} })} />
                  <Input label="Website URL" value={partner.href} onChange={v => set('partners', p => { const it=[...p.items]; it[i]={...it[i],href:v}; return {...p,items:it} })} />
                </ItemBlock>
              ))}
            </ArrayCard>
          )}

          {/* BLOG */}
          {activeSection === 'blog' && <BlogManager showToast={showToast} />}

          {/* CONTACT */}
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

          {/* FOOTER */}
          {activeSection === 'footer' && (
            <div className="space-y-5">
              <SectionCard title="Footer — General" onSave={() => save('footer')} saving={saving.footer}>
                <Textarea label="Tagline" value={c.footer?.tagline} onChange={v => set('footer', f => ({ ...f, tagline: v }))} rows={2} />
                <Input label="'Made with care' text" value={c.footer?.madeWith} onChange={v => set('footer', f => ({ ...f, madeWith: v }))} />
              </SectionCard>
              <SectionCard title="Social Media URLs" onSave={() => save('footer')} saving={saving.footer}>
                {(c.footer?.socialLinks||[]).map((s, i) => (
                  <Input key={i}
                    label={`${s.icon.charAt(0).toUpperCase()+s.icon.slice(1)} URL`}
                    value={s.href}
                    onChange={v => set('footer', f => { const sl=[...f.socialLinks]; sl[i]={...sl[i],href:v}; return {...f,socialLinks:sl} })} />
                ))}
              </SectionCard>
              <ArrayCard title="Footer Service Links"
                onAdd={() => set('footer', f => ({ ...f, serviceLinks: [...(f.serviceLinks||[]), { label: '', to: 'services' }] }))}
                onSave={() => save('footer')} saving={saving.footer}>
                {(c.footer?.serviceLinks||[]).map((l, i) => (
                  <ItemBlock key={i} index={i} onRemove={() => set('footer', f => ({ ...f, serviceLinks: f.serviceLinks.filter((_,j) => j!==i) }))}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Label" value={l.label} onChange={v => set('footer', f => { const sl=[...f.serviceLinks]; sl[i]={...sl[i],label:v}; return {...f,serviceLinks:sl} })} />
                      <Input label="Scroll target" value={l.to} onChange={v => set('footer', f => { const sl=[...f.serviceLinks]; sl[i]={...sl[i],to:v}; return {...f,serviceLinks:sl} })} />
                    </div>
                  </ItemBlock>
                ))}
              </ArrayCard>
            </div>
          )}

          {/* ACCOUNT SETTINGS */}
          {activeSection === 'account' && (
            <AccountSettings />
          )}

        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm shadow-2xl z-50 flex items-center gap-2">
          {toast}
        </div>
      )}
    </div>
  )
}
