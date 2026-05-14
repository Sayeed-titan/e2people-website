/*
 * COMPONENT: Contact
 * WHAT IT DOES: "Get in Touch." Left column lists email, phone, and
 *               address with thin outline icons. Right column is a
 *               minimal form — bottom-border-only inputs with floating
 *               labels. The submit button shows an arrow that nudges
 *               right on hover and collapses to a ✓ on success.
 * HOW TO TWEAK:
 *  • Copy & contact details: edit `contact` in src/constants/data.js
 *  • Form field styles: `.field` and `.btn-primary` in src/index.css
 *  • Replace simulated submit with a real API call in `handleSubmit`
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contact } from '../constants/data'

const initialForm = { name: '', email: '', phone: '', message: '' }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ContactRow({ icon, label, value, href }) {
  const inner = (
    <>
      <span className="mt-1 inline-flex w-9 h-9 items-center justify-center rounded-full border border-ink/15 text-brand-700">
        {icon}
      </span>
      <span>
        <span className="block text-eyebrow uppercase font-semibold text-ink/50 mb-1.5">
          {label}
        </span>
        <span className="block text-ink leading-snug">{value}</span>
      </span>
    </>
  )

  return href ? (
    <a href={href} className="flex items-start gap-4 group">
      <span className="contents transition-colors group-hover:[&_*]:text-ink">{inner}</span>
    </a>
  ) : (
    <div className="flex items-start gap-4">{inner}</div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorText, setErrorText] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorText('Please fill in your name, email, and message.')
      return
    }
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error')
      setErrorText('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      setFormData(initialForm)
      window.setTimeout(() => setStatus('idle'), 4000)
    }, 1100)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-canvas scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT — title + contact details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="text-eyebrow uppercase font-semibold text-ink/55 mb-5">
              {contact.eyebrow}
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tightest leading-[0.95] whitespace-pre-line">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-md text-ink/65 leading-relaxed font-light">
              {contact.subtext}
            </p>

            <div className="mt-12 space-y-7">
              <ContactRow
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
                icon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                }
              />
              <ContactRow
                label="Phone"
                value={contact.phone.display}
                href={`tel:${contact.phone.tel}`}
                icon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                }
              />
              <ContactRow
                label="Office"
                value={contact.address}
                icon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* RIGHT — editorial form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="field">
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-name">Full name *</label>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="field">
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="contact-email">Email *</label>
                </div>
                <div className="field">
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="contact-phone">Phone</label>
                </div>
              </div>

              <div className="field">
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-message">Tell us about your project *</label>
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    key={errorText}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    role="alert"
                    className="text-sm text-red-600"
                  >
                    {errorText}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                aria-label={contact.ctaLabel}
                className="btn-primary relative w-full rounded-full px-7 py-4 text-sm font-medium tracking-wide inline-flex items-center justify-center gap-3 group"
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.span
                      key="ok"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12l5 5L20 6" />
                      </svg>
                      Sent — we'll be in touch
                    </motion.span>
                  ) : status === 'loading' ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      {contact.ctaLabel}
                      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="text-xs text-ink/45">
                * Required fields. We respond within one business day.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
