/*
 * SITE CONTENT — single source of truth
 *
 * WHAT THIS DOES:
 *  All copy, link labels, contact details, solutions, services, team,
 *  and partner data live in this file. Components import what they need
 *  and never hardcode strings.
 *
 * HOW TO TWEAK:
 *  • Update text:           edit the relevant array below
 *  • Add a service:         push a new object into `services`
 *  • Add a team member:     push a new object into `team`
 *  • Update contact:        edit `contact`
 *  • Change footer links:   edit `footer.quickLinks` / `footer.legalLinks`
 *  • Change social handles: edit `footer.socialLinks` (href is the URL)
 */

export const NAV_OFFSET = -64

export const brand = {
  name: 'e2People',
  full: 'e2People Limited',
  tagline: 'Smart Evolution',
  promise: 'Empowering Your Business Through Digital Innovation',
  shortBlurb:
    "e2People Limited is a fast-growing tech-enabled service company delivering smart, scalable, and sustainable solutions to businesses and communities across Bangladesh.",
}

export const navLinks = [
  { label: 'Home',      to: 'hero' },
  { label: 'Services',  to: 'services' },
  { label: 'About',     to: 'about' },
  { label: 'Solutions', to: 'solutions' },
  { label: 'Team',      to: 'team' },
  { label: 'Contact',   to: 'contact' },
]

export const hero = {
  eyebrow: 'Smart Evolution — Digital Partner',
  headline: [
    { text: 'Empowering' },
    { text: 'your business' },
    { text: 'through digital' },
    { text: 'innovation.', accent: true },
  ],
  subtext:
    "We design and deliver software that helps Bangladeshi businesses and public institutions run smarter — from cloud platforms to nationwide management systems.",
  primaryCta: { label: 'Start a project', to: 'contact' },
  secondaryCta: { label: 'Explore services', to: 'services' },
}

export const services = [
  {
    title: 'Enterprise Software',
    description: 'Custom platforms tailored to streamline operations and unlock efficiency at scale.',
    span: 'large',
    icon: 'enterprise',
  },
  {
    title: 'Digital Transformation',
    description: 'End-to-end modernization of processes, systems, and customer experiences.',
    span: 'large',
    icon: 'transform',
  },
  {
    title: 'Customer Engagement',
    description: 'Tools that turn interactions into lasting relationships.',
    span: 'small',
    icon: 'engagement',
  },
  {
    title: 'Data & Analytics',
    description: 'Decisions backed by clear, actionable insight.',
    span: 'small',
    icon: 'analytics',
  },
  {
    title: 'Secure Infrastructure',
    description: 'Robust, hardened foundations for your business and your data.',
    span: 'small',
    icon: 'shield',
  },
  {
    title: 'Cloud Solutions',
    description: 'Flexible, reliable cloud architecture built to grow with you.',
    span: 'small',
    icon: 'cloud',
  },
]

export const about = {
  eyebrow: 'Who We Are',
  title: 'Built for the\nlong game.',
  paragraph:
    "At e2People Limited, we empower businesses and communities through digital innovation. As a fast-growing, tech-enabled service provider, we deliver smart, scalable, and sustainable solutions to clients across various sectors in Bangladesh. Our mission is to lead impactful projects that create real change — both on the ground and in the digital space.",
  mission: 'To lead impactful projects that create real change — on the ground and in the digital space.',
  vision: 'To be the digital innovation partner of choice for businesses and public institutions across South Asia.',
  values: [
    { title: 'Innovation',         desc: 'Forward-thinking by default.' },
    { title: 'Scalability',        desc: 'Designed to grow with you.' },
    { title: 'Sustainability',     desc: 'Built to last, not to leak.' },
    { title: 'Integrity',          desc: 'Honest work, every time.' },
    { title: 'Customer-Centric',   desc: 'Your outcomes drive ours.' },
  ],
}

export const solutions = {
  eyebrow: 'Flagship Platforms',
  title: 'Solutions in production,\nserving Bangladesh.',
  rows: [
    {
      number: '01',
      title: 'Visitor Management System (VMS)',
      description:
        "A cloud platform built for the Department of Prisons, Bangladesh. Secure online visit booking with NID & OTP verification, slot-based scheduling, payment integration, digital pass generation, and real-time admin monitoring.",
    },
    {
      number: '02',
      title: 'PEPMIS',
      description:
        "Primary Education Property Management Information System for the Ministry of Primary and Mass Education, delivered through the DPE in partnership with LGED and DPHE — coordinating property data for primary schools nationwide.",
    },
    {
      number: '03',
      title: 'Textile ERP',
      description:
        "Enterprise Resource Planning for Bangladesh's textile and RMG sector — modular by design, covering HR, supply chain, financials, and stakeholder workflows across the industry.",
    },
  ],
  stats: [
    { value: '03', label: 'Flagship platforms in production' },
    { value: '35+', label: 'Years of leadership experience' },
    { value: '05', label: 'Strategic partners' },
    { value: 'BD', label: 'Designed and built in Bangladesh' },
  ],
}

export const partners = [
  { name: 'Cypheme',                    logo: '/partners/cypheme.webp' },
  { name: 'Bondstein',                  logo: '/partners/bondstein_black_logo.png' },
  { name: 'Spellbound Communications',  logo: '/partners/spellbound communications ltd.png' },
  { name: 'The Earth',                  logo: '/partners/the earth.png' },
  { name: 'Singularity',                logo: '/partners/singularity.png' },
]

export const team = [
  {
    name: 'Major General A K M Muzahid Uddin (Retd.)',
    role: 'Chairman',
    image: '/team/Major General A K M Muzahid Uddin (Retd.).webp',
    bio: "Over 35 years of distinguished service, including Adjutant General of the Bangladesh Army. He brings deep administration and corporate-leadership experience to the company's strategic direction.",
  },
  {
    name: 'Shah Hasibur Rahman',
    role: 'Managing Director',
    image: '/team/Shah Hasibur Rahman.webp',
    bio: "18+ years across brand building, PR, and strategic planning. He is driving adoption of cloud-based medical ERP and shaping the company's sustainable growth.",
  },
  {
    name: 'Mohammad Sadequl Arefeen',
    role: 'Director',
    image: '/team/Mohammad Sadequl Arefeen.webp',
    bio: "20+ years as an entrepreneur, investor, and PR strategist. He is pivotal in shaping strategic direction and expanding the company's footprint.",
  },
]

export const contact = {
  eyebrow: "Let's talk",
  title: "Let's build\nsomething.",
  subtext:
    "Tell us what you're working on. We respond to inquiries within one business day.",
  email:   'contact@e2people.com',
  phone:   { display: '+880 1713 335334', tel: '+8801713335334' },
  address: '3rd Floor, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh',
}

export const footer = {
  tagline: 'Smart Evolution — Digital innovation for Bangladesh.',
  madeWith: 'Made with care in Dhaka.',
  quickLinks: [
    { label: 'Home',      to: 'hero' },
    { label: 'Services',  to: 'services' },
    { label: 'About',     to: 'about' },
    { label: 'Solutions', to: 'solutions' },
    { label: 'Team',      to: 'team' },
    { label: 'Contact',   to: 'contact' },
  ],
  serviceLinks: [
    { label: 'Enterprise Software',   to: 'services' },
    { label: 'Digital Transformation', to: 'services' },
    { label: 'Cloud Solutions',       to: 'services' },
    { label: 'Data & Analytics',      to: 'services' },
    { label: 'Secure Infrastructure', to: 'services' },
  ],
  legalLinks: [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
  ],
  socialLinks: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Twitter',  href: '#', icon: 'twitter' },
    { label: 'GitHub',   href: '#', icon: 'github' },
  ],
}
