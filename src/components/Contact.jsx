import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Contact section — validated form with loading/success/error feedback, plus company contact info.
// Phone display and tel: link are kept in sync to avoid mis-dials.
const PHONE_DISPLAY = '+880 1713 335334'
const PHONE_TEL = '+8801713335334'
const EMAIL = 'contact@e2people.com'
const ADDRESS = '3rd Floor, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh'

const initialForm = { name: '', email: '', phone: '', company: '', message: '' }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', text: string }

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
    // Simulated submission — wire to a real endpoint when backend is available.
    window.setTimeout(() => {
      setIsLoading(false)
      setFormData(initialForm)
      showFeedback({ type: 'success', text: 'Thank you! We will get back to you shortly.' })
    }, 1200)
  }

  const contactInfo = [
    { icon: '📧', label: 'Email',  value: EMAIL,         link: `mailto:${EMAIL}` },
    { icon: '📱', label: 'Phone',  value: PHONE_DISPLAY, link: `tel:${PHONE_TEL}` },
    { icon: '📍', label: 'Office', value: ADDRESS,       link: null },
  ]

  const fieldClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-colors'

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business? Contact us today to discuss your project needs.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-700 to-brand-400 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Contact content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-10 lg:gap-14"
        >
          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-gray-900 font-semibold mb-2">
                  Full Name <span className="text-brand-700">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-gray-900 font-semibold mb-2">
                  Email Address <span className="text-brand-700">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-gray-900 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="+880 1234 567890"
                />
              </div>

              <div>
                <label htmlFor="contact-company" className="block text-gray-900 font-semibold mb-2">
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-gray-900 font-semibold mb-2">
                  Message <span className="text-brand-700">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none`}
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Feedback message */}
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
                    className={`p-4 rounded-lg border ${
                      feedback.type === 'success'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {feedback.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 shadow-soft ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-brand-700 hover:bg-brand-800'
                }`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div variants={itemVariants} className="space-y-7">
            {contactInfo.map((info) => (
              <motion.div key={info.label} variants={itemVariants} className="flex gap-4">
                <div className="text-3xl sm:text-4xl shrink-0" aria-hidden="true">{info.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.label}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-brand-700 hover:text-brand-800 hover:underline transition-colors break-words">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Response time message */}
            <motion.div
              variants={itemVariants}
              className="bg-brand-50 p-6 rounded-xl border border-brand-100/60 mt-4"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We typically respond to inquiries within 24 business hours. Our team is ready to discuss your project and provide tailored solutions.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
