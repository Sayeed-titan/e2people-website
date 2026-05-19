/*
 * PAGE: Legal
 * WHAT IT DOES: Single page hosting Privacy Policy, Terms & Conditions,
 *               and Cookie Policy each as anchor-linked sections.
 *               Accessed via /legal  (with optional #privacy / #terms / #cookies hash)
 */
import { useEffect } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { brand } from '../constants/data'

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: 'May 2025',
    content: [
      {
        heading: '1. Introduction',
        body: `e2People Limited ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. By using our website at e2people.com, you agree to the terms of this policy.`,
      },
      {
        heading: '2. Information We Collect',
        body: `We collect information you provide directly to us, such as when you fill in our contact form (name, email address, phone number, and project details). We also automatically collect certain technical data including IP address, browser type, pages visited, and time spent on our site through standard web analytics tools. We do not collect sensitive personal data unless explicitly required and consented to.`,
      },
      {
        heading: '3. How We Use Your Information',
        body: `We use collected information to: (a) respond to your enquiries and provide the services you requested; (b) improve and personalise your experience on our website; (c) send service-related communications; (d) comply with legal obligations. We will never sell your personal information to third parties.`,
      },
      {
        heading: '4. Data Storage & Security',
        body: `Your information is stored on secure servers and protected by industry-standard encryption and access controls. We retain personal data only for as long as necessary to fulfil the purposes set out in this policy or as required by law. We take reasonable administrative, technical, and physical safeguards to protect against unauthorised access, disclosure, alteration, or destruction.`,
      },
      {
        heading: '5. Sharing Your Information',
        body: `We do not share your personal data with third parties except: (a) trusted service providers acting on our behalf who are bound by confidentiality; (b) when required by law, regulation, or legal process; (c) to protect the rights and safety of e2People Limited and others. All third-party partners are required to respect the security of your data.`,
      },
      {
        heading: '6. Your Rights',
        body: `You have the right to access, correct, or delete the personal data we hold about you. You may also object to or restrict our processing of your data. To exercise any of these rights, please contact us at info@e2people.com. We will respond to your request within 30 days.`,
      },
      {
        heading: '7. Changes to This Policy',
        body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
      },
      {
        heading: '8. Contact Us',
        body: `For any questions or concerns about this Privacy Policy, please contact:\ne2People Limited\n3rd Floor, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh\nEmail: info@e2people.com\nPhone: +880 1713 335334`,
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    lastUpdated: 'May 2025',
    content: [
      {
        heading: '1. Acceptance of Terms',
        body: `By accessing or using the e2People Limited website (e2people.com), you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our site. These terms apply to all visitors, users, and others who access or use the site.`,
      },
      {
        heading: '2. Services Description',
        body: `e2People Limited provides technology-enabled digital services including website design & development, mobile application development, enterprise software (ERP), CRM solutions, creative design, AI solutions, APIs & integrations, data migration, social media management, and related services. Service delivery is governed by individual contracts agreed separately with each client.`,
      },
      {
        heading: '3. Intellectual Property',
        body: `All content on this website — including text, graphics, logos, icons, images, and software — is the property of e2People Limited or its content suppliers and is protected under applicable copyright and intellectual property laws. Unauthorised reproduction, redistribution, or use of any content from this site is strictly prohibited without prior written consent.`,
      },
      {
        heading: '4. User Obligations',
        body: `When using our website or services, you agree to: (a) provide accurate and complete information; (b) not engage in any unlawful, harmful, or disruptive activity; (c) not attempt to gain unauthorised access to any part of our systems; (d) not use our services to transmit spam, malware, or harmful content. We reserve the right to terminate access for violations of these obligations.`,
      },
      {
        heading: '5. Limitation of Liability',
        body: `To the fullest extent permitted by law, e2People Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service in dispute in the preceding 12 months.`,
      },
      {
        heading: '6. Third-Party Links',
        body: `Our website may contain links to third-party websites for your convenience. We do not control, endorse, or assume responsibility for the content or privacy practices of those sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.`,
      },
      {
        heading: '7. Governing Law',
        body: `These Terms & Conditions are governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.`,
      },
      {
        heading: '8. Modifications',
        body: `e2People Limited reserves the right to modify these Terms & Conditions at any time. Changes take effect immediately upon posting. Your continued use of the website after any changes signifies your acceptance of the updated terms.`,
      },
      {
        heading: '9. Contact',
        body: `For questions about these Terms & Conditions, contact us at info@e2people.com or call +880 1713 335334.`,
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    lastUpdated: 'May 2025',
    content: [
      {
        heading: '1. What Are Cookies',
        body: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, improve user experience, and provide information to site owners. Cookies do not contain personally identifiable information by themselves, but personal data that we store about you may be linked to information obtained from cookies.`,
      },
      {
        heading: '2. How We Use Cookies',
        body: `e2People Limited uses cookies to: (a) ensure our website functions correctly (strictly necessary cookies); (b) remember your preferences and improve your browsing experience; (c) analyse how visitors use our site so we can improve our content and services (analytics cookies); (d) measure the effectiveness of any advertising we may conduct (marketing cookies).`,
      },
      {
        heading: '3. Types of Cookies We Use',
        body: `Strictly Necessary Cookies: Essential for the website to function. They cannot be switched off.\n\nPerformance & Analytics Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously (e.g., Google Analytics).\n\nFunctional Cookies: Enable enhanced functionality and personalisation, such as remembering your language preference.\n\nMarketing Cookies: Used to track visitors across websites to display relevant and engaging advertisements.`,
      },
      {
        heading: '4. Managing Cookies',
        body: `Most browsers allow you to refuse or accept cookies and to delete cookies already placed on your device. To do this, look at the help section of your browser. Please note that blocking cookies may affect the functionality of our website. You can also opt out of Google Analytics by visiting: https://tools.google.com/dlpage/gaoptout`,
      },
      {
        heading: '5. Third-Party Cookies',
        body: `Some cookies on our website may be set by third-party services we use, such as Google Analytics, embedded maps, or social media plugins. These third parties have their own privacy and cookie policies which govern their use of your data. We encourage you to review those policies separately.`,
      },
      {
        heading: '6. Updates to This Policy',
        body: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated date.`,
      },
      {
        heading: '7. Contact',
        body: `For any questions about our use of cookies, please email us at info@e2people.com.`,
      },
    ],
  },
]

export default function Legal() {
  const { hash } = useLocation()

  // Scroll to anchor on mount / hash change
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <RouterLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt={brand.full} className="h-10 w-auto" />
          </RouterLink>
          <RouterLink
            to="/"
            className="text-sm font-medium text-ink/60 hover:text-ink transition-colors flex items-center gap-1"
          >
            ← Back to site
          </RouterLink>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-ink/10 bg-white/60 backdrop-blur sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0 overflow-x-auto">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                  hash === `#${s.id}`
                    ? 'border-brand-700 text-brand-700'
                    : 'border-transparent text-ink/55 hover:text-ink'
                }`}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {sections.map((section) => (
          <article key={section.id} id={section.id} className="scroll-mt-36">
            <div className="mb-10">
              <span className="text-eyebrow uppercase font-semibold text-brand-700 text-xs tracking-widest">
                e2People Limited
              </span>
              <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-ink tracking-tight leading-tight">
                {section.title}
              </h1>
              <p className="mt-3 text-ink/45 text-sm">Last updated: {section.lastUpdated}</p>
              <div className="mt-6 h-px bg-ink/10" />
            </div>

            <div className="space-y-10">
              {section.content.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-semibold text-lg text-ink mb-3">{block.heading}</h2>
                  <p className="text-ink/70 leading-relaxed whitespace-pre-line">{block.body}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Footer bar */}
      <div className="border-t border-ink/10 bg-ink text-white/50 text-xs py-6 text-center">
        © {new Date().getFullYear()} {brand.full}. All rights reserved. &nbsp;·&nbsp;
        <RouterLink to="/" className="hover:text-white transition-colors">Return to home</RouterLink>
      </div>
    </div>
  )
}
