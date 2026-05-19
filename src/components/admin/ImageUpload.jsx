/**
 * ImageUpload
 * Drag-and-drop / click-to-browse image uploader.
 * Uploads to Supabase Storage bucket "blog-images".
 * Returns the public URL via onUpload(url).
 */
import { useState, useRef, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'

const BUCKET = 'blog-images'

function generateFileName(file) {
  const ext  = file.name.split('.').pop()
  const rand = Math.random().toString(36).slice(2, 10)
  const ts   = Date.now()
  return `${ts}-${rand}.${ext}`
}

export default function ImageUpload({
  value,          // current image URL (string)
  onUpload,       // (url: string) => void
  label = 'Upload Image',
  hint  = 'JPG, PNG, WebP or GIF · max 10 MB',
  aspect = 'aspect-video',   // Tailwind aspect class for preview
}) {
  const [uploading, setUploading] = useState(false)
  const [error,     setError]     = useState('')
  const [dragOver,  setDragOver]  = useState(false)
  const inputRef = useRef(null)

  const upload = useCallback(async (file) => {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) { setError('File too large — max 10 MB'); return }

    setUploading(true); setError('')
    const fileName = generateFileName(file)

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (uploadErr) { setError(uploadErr.message); setUploading(false); return }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
    onUpload(data.publicUrl)
    setUploading(false)
  }, [onUpload])

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ''
  }

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) upload(file)
  }

  const remove = () => { onUpload(''); setError('') }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">{label}</label>}

      {value ? (
        /* Preview */
        <div className={`relative ${aspect} rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group`}>
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button onClick={remove}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/90 text-red-600 text-xs font-semibold rounded-lg hover:bg-white transition-colors">
              <X size={13} />Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`${aspect} rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
            ${dragOver
              ? 'border-indigo-400 bg-indigo-50'
              : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50'
            }`}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="text-indigo-500 animate-spin" />
              <p className="text-xs text-slate-400">Uploading…</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Upload size={18} className="text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600">
                  {dragOver ? 'Drop to upload' : 'Click or drag & drop'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={11} />{error}
        </p>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
    </div>
  )
}
