import { useState } from 'react'
import { motion } from 'framer-motion'

// Contact section with form and location info
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.')
      return
    }

    // Simulate form submission
    setIsLoading(true)
    setTimeout(() => {
      setSubmitMessage('Thank you! We will get back to you shortly.')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setIsLoading(false)
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'contact@e2people.com',
      link: 'mailto:contact@e2people.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+880 1713 335334',
      link: 'tel:+880173335334',
    },
    {
      icon: '📍',
      label: 'Office',
      value: 'Floor 3rd, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh',
      link: null,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business? Contact us today to discuss your project needs.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Contact content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="+880 1234 567890"
                />
              </div>

              {/* Company field */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Your company"
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {/* Status message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitMessage.includes('Thank you')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-4"
              >
                <div className="text-4xl">{info.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {info.label}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-blue-600 hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Response time message */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                Quick Response
              </h4>
              <p className="text-gray-600 text-sm">
                We typically respond to inquiries within 24 business hours. Our team is ready to discuss your project and provide tailored solutions.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
