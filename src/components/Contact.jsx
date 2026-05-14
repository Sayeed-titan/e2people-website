import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

// Contact section — warm, inviting layout with minimal icons, editorial form styling,
// and conversational headline "Let's Build Something"
const PHONE_DISPLAY = '+880 1713 335334'
const PHONE_TEL = '+8801713335334'
const EMAIL = 'contact@e2people.com'
const ADDRESS = '3rd Floor, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh'

const initialForm = { name: '', email: '', phone: '', company: '', message: '' }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', text: string }
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (feedback) setFeedback(null)
  }

  const showFeedback = (next, autoClearMs = 5000) => {
    setFeedback(next)
    if (autoClearMs) {
      window.setTimeout(() => {
        setFeedback((current) => (current === next ? null : current))
      }, autoClearMs)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showFeedback({ type: 'error', text: 'Please fill in all required fields.' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      showFeedback({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setFormData(initialForm)
      setSubmitted(true)
      showFeedback({ type: 'success', text: "Message sent! We'll get back to you shortly." }, 3000)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1200)
  }

  const contactInfo = [
    { icon: 'mail', label: 'Email',  value: EMAIL,         link: `mailto:${EMAIL}` },
    { icon: 'phone', label: 'Phone',  value: PHONE_DISPLAY, link: `tel:${PHONE_TEL}` },
    { icon: 'map', label: 'Office', value: ADDRESS,       link: null },
  ]

  // Render icon based on type
  const renderIcon = (type) => {
    const iconProps = 'w-5 h-5 text-brand-700'
    switch (type) {
      case 'mail':
        return <Mail className={iconProps} />
      case 'phone':
        return <Phone className={iconProps} />
      case 'map':
        return <MapPin className={iconProps} />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-white scroll-mt-16 relative overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.13 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — warm, conversational */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-24"
        >
          <span className="text-sm font-bold tracking-editorial text-brand-700 uppercase">Get In Touch</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-800 text-ink-DEFAULT leading-[0.95] mt-4 mb-6">
            Let's Build<br />Something
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-700 to-brand-400 rounded-full" />
          <p className="text-lg md:text-xl text-mute-soft font-light mt-8 max-w-2xl">
            Ready to transform your business? We're here to discuss your project and create tailored solutions.
          </p>
        </motion.div>

        {/* Contact grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left — Contact information */}
          <motion.div variants={slideInVariants} className="space-y-8 md:pr-8">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                variants={itemVariants}
                className="flex gap-6 group"
              >
                <div className="shrink-0 group-hover:text-brand-700 transition-colors duration-300">
                  {renderIcon(info.icon)}
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-editorial text-mute-soft uppercase mb-2">
                    {info.label}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-lg text-ink-DEFAULT font-medium hover:text-brand-700 transition-colors duration-300 break-words"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg text-ink-DEFAULT font-medium leading-relaxed">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Response time note */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-mute-soft font-light leading-relaxed">
                We typically respond to inquiries within 24 business hours. Our team is ready to discuss your vision and craft the perfect solution.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Contact form with editorial styling */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Name field */}
              <div className="relative pb-2">
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 font-medium text-ink-DEFAULT placeholder-transparent focus:outline-none focus:border-brand-700 focus:ring-0 transition-colors duration-300"
                />
                <label
                  htmlFor="contact-name"
                  className="absolute left-0 -top-4 text-xs font-bold tracking-editorial text-mute-soft uppercase transition-all duration-300 pointer-events-none"
                >
                  Name <span className="text-brand-700">*</span>
                </label>
              </div>

              {/* Email field */}
              <div className="relative pb-2">
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 font-medium text-ink-DEFAULT placeholder-transparent focus:outline-none focus:border-brand-700 focus:ring-0 transition-colors duration-300"
                />
                <label
                  htmlFor="contact-email"
                  className="absolute left-0 -top-4 text-xs font-bold tracking-editorial text-mute-soft uppercase transition-all duration-300 pointer-events-none"
                >
                  Email <span className="text-brand-700">*</span>
                </label>
              </div>

              {/* Phone field */}
              <div className="relative pb-2">
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 font-medium text-ink-DEFAULT placeholder-transparent focus:outline-none focus:border-brand-700 focus:ring-0 transition-colors duration-300"
                />
                <label
                  htmlFor="contact-phone"
                  className="absolute left-0 -top-4 text-xs font-bold tracking-editorial text-mute-soft uppercase transition-all duration-300 pointer-events-none"
                >
                  Phone
                </label>
              </div>

              {/* Company field */}
              <div className="relative pb-2">
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 font-medium text-ink-DEFAULT placeholder-transparent focus:outline-none focus:border-brand-700 focus:ring-0 transition-colors duration-300"
                />
                <label
                  htmlFor="contact-company"
                  className="absolute left-0 -top-4 text-xs font-bold tracking-editorial text-mute-soft uppercase transition-all duration-300 pointer-events-none"
                >
                  Company
                </label>
              </div>

              {/* Message textarea */}
              <div className="relative pb-2 pt-6">
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-0 font-medium text-ink-DEFAULT placeholder-transparent focus:outline-none focus:border-brand-700 focus:ring-0 transition-colors duration-300 resize-none"
                />
                <label
                  htmlFor="contact-message"
                  className="absolute left-0 -top-8 text-xs font-bold tracking-editorial text-mute-soft uppercase transition-all duration-300 pointer-events-none"
                >
                  Message <span className="text-brand-700">*</span>
                </label>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    key={feedback.text}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    role={feedback.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                    className={`p-3 text-sm font-medium ${
                      feedback.type === 'success'
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {feedback.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading || submitted}
                className={`w-full py-4 rounded-lg font-semibold text-white text-lg mt-10 transition-all duration-300 hover:shadow-soft ${
                  isLoading || submitted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
                whileHover={!isLoading && !submitted ? { y: -2 } : {}}
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </span>
                ) : submitted ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span>✓ Message Sent</span>
                  </span>
                ) : (
                  'Send Message →'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
