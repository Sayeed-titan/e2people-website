-- ============================================================
-- e2People CMS — Supabase Setup
-- Paste this entire file into:
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. Create the content table
CREATE TABLE IF NOT EXISTS public.site_content (
  id         SERIAL PRIMARY KEY,
  section    TEXT NOT NULL UNIQUE,
  data       JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Allow public (website visitors) to READ all content
CREATE POLICY "public_read" ON public.site_content
  FOR SELECT USING (true);

-- 4. Allow authenticated users (admin) to INSERT / UPDATE / DELETE
CREATE POLICY "admin_all" ON public.site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- 5. Seed all initial content
-- ============================================================

INSERT INTO public.site_content (section, data) VALUES

('brand', '{
  "name": "e2People",
  "full": "e2People Limited",
  "tagline": "Empowering Your Business Through Digital Innovation",
  "shortTagline": "Smart Evolution"
}'::jsonb),

('nav', '{
  "NAV_OFFSET": -72,
  "navLinks": [
    {"label": "Home",       "to": "hero"},
    {"label": "About Us",   "to": "about"},
    {"label": "Services",   "to": "services"},
    {"label": "Solutions",  "to": "solutions"},
    {"label": "Portfolio",  "to": "portfolio"},
    {"label": "Blog",       "to": "blog"},
    {"label": "Contact Us", "to": "contact"}
  ]
}'::jsonb),

('hero', '{
  "eyebrow": "Smart Evolution — Digital Partner",
  "subtext": "At e2People Limited, we provide innovative, end-to-end software solutions, helping businesses optimize operations, engage customers, and achieve sustainable growth in a digital-first world.",
  "primaryCta":   {"label": "Get Started", "to": "contact"},
  "secondaryCta": {"label": "Learn More",  "to": "services"}
}'::jsonb),

('services', '{
  "items": [
    {"title": "Website Design & Development",    "icon": "web",        "featured": true,  "description": "Powerful, user-friendly websites that enhance your online presence and engage your audience."},
    {"title": "Android and iOS App Development", "icon": "mobile",     "featured": true,  "description": "Custom Android & iOS apps that deliver seamless experiences, drive engagement, and support business growth."},
    {"title": "Creative Design",                 "icon": "palette",    "featured": false, "description": "Creative, visually appealing graphics that resonate with your brand and communicate clearly."},
    {"title": "Enterprise Software (ERP)",       "icon": "enterprise", "featured": false, "description": "All-in-one ERP that integrates every part of your organisation for greater efficiency."},
    {"title": "CRM Solutions",                   "icon": "crm",        "featured": false, "description": "Scalable CRM tools that strengthen customer relationships and lift business performance."},
    {"title": "Data Migration Services",         "icon": "migrate",    "featured": false, "description": "Safely move business data to modern systems with no loss and minimal downtime."},
    {"title": "Platform Management Systems",     "icon": "platform",   "featured": false, "description": "Robust management systems that keep your digital infrastructure running smoothly."},
    {"title": "Social Media Management",         "icon": "social",     "featured": false, "description": "Expert strategies that grow engagement and build lasting brand loyalty."},
    {"title": "APIs & Integrations",             "icon": "api",        "featured": false, "description": "Custom APIs that connect systems and unify your business workflows."},
    {"title": "Database Design & Management",    "icon": "database",   "featured": false, "description": "Secure, scalable databases that manage your business-critical information."}
  ]
}'::jsonb),

('about', '{
  "eyebrow": "Who We Are",
  "title": "Innovation\nthat means business.",
  "paragraph": "At e2People Limited, we specialize in delivering high-quality, customized software solutions that address the unique challenges businesses face in the digital age. We are passionate about helping organizations transform their operations and grow through innovative digital solutions. Our team brings expertise in web development, mobile apps, graphic design, ERP systems, and more — all focused on delivering tangible results for our clients.",
  "vision": "To be the most trusted partner for businesses seeking innovative, reliable, and scalable digital solutions.",
  "mission": "To empower businesses with tailored solutions that drive efficiency, customer engagement, and growth, while simplifying complex processes through technology.",
  "values": [
    {"title": "Innovation",          "desc": "Forward-thinking by default."},
    {"title": "Integrity",           "desc": "Honest work, every time."},
    {"title": "Collaboration",       "desc": "Better together — always."},
    {"title": "Excellence",          "desc": "Craft over shortcuts."},
    {"title": "Customer-Centricity", "desc": "Your outcomes drive ours."}
  ],
  "cta": {"label": "Meet Our Team", "to": "team"}
}'::jsonb),

('solutions', '{
  "eyebrow": "Comprehensive Solutions",
  "title": "Solutions for every\nbusiness need.",
  "intro": "End-to-end digital solutions for organisations of every size. From your first website to a fully integrated ERP — we have the expertise to deliver.",
  "rows": [
    {"number": "01", "title": "Custom Web Solutions",       "description": "Custom websites designed around your business goals — built to make you stand out in a crowded digital world."},
    {"number": "02", "title": "Mobile App Development",     "description": "Mobile apps that deliver seamless user experiences, drive customer engagement, and support business growth."},
    {"number": "03", "title": "ERP Solutions",              "description": "Streamline your entire organization with enterprise resource planning — integrating finance, HR, inventory, and more into one platform."},
    {"number": "04", "title": "CRM Systems",                "description": "Strengthen customer relationships and lift performance by centralising customer data and improving service delivery."},
    {"number": "05", "title": "API & Integration Solutions","description": "Connect existing systems and applications into a unified ecosystem — improving efficiency and streamlining workflows."},
    {"number": "06", "title": "AI Solutions",               "description": "Leverage the power of artificial intelligence — from intelligent automation and predictive analytics to NLP-driven tools — to help your business make smarter decisions and stay ahead of the competition."}
  ],
  "stats": [
    {"value": "13",  "label": "Service capabilities"},
    {"value": "35+", "label": "Years of leadership"},
    {"value": "05",  "label": "Strategic partners"},
    {"value": "BD",  "label": "Built in Bangladesh"}
  ],
  "cta": {"label": "Learn More About Our Solutions", "to": "contact"}
}'::jsonb),

('portfolio', '{
  "eyebrow": "Selected Work",
  "title": "Our work\nspeaks for itself.",
  "intro": "Over the years, we have helped businesses and public institutions achieve digital transformation through our solutions. A few recent projects:",
  "items": [
    {
      "label": "Project 01",
      "client": "Department of Prisons, Bangladesh",
      "title": "Visitor Management System (VMS)",
      "description": "A cloud platform enabling secure online booking of prison visits with NID & OTP verification, slot-based scheduling, payment integration, digital pass generation, and real-time admin monitoring.",
      "tags": ["Cloud Platform", "Govt. Tech", "Payments"],
      "image": "/products/Visitior Management System (2).jpg"
    },
    {
      "label": "Project 02",
      "client": "Ministry of Primary & Mass Education",
      "title": "PEPMIS",
      "description": "Primary Education Property Management Information System — coordinating property data for primary schools nationwide, delivered through the DPE in partnership with LGED and DPHE.",
      "tags": ["Information System", "Govt. Tech", "Education"],
      "image": "/products/pepmis_dashboard.png"
    },
    {
      "label": "Project 03",
      "client": "Bangladesh RMG sector",
      "title": "Textile ERP",
      "description": "Modular Enterprise Resource Planning for the textile and ready-made-garment industry — covering HR, supply chain, financials, and stakeholder workflows.",
      "tags": ["ERP", "RMG", "Workflow"],
      "image": "/products/textile__erp_dashboard.png"
    }
  ],
  "cta": {"label": "Discuss a Project", "to": "contact"}
}'::jsonb),

('team', '{
  "members": [
    {
      "name": "Major General A K M Muzahid Uddin (Retd.)",
      "role": "Chairman",
      "image": "/team/Major General A K M Muzahid Uddin (Retd.).webp",
      "bio": "Over 35 years of distinguished service, including Adjutant General of the Bangladesh Army. He brings deep administration and corporate-leadership experience to the company strategic direction."
    },
    {
      "name": "Shah Hasibur Rahman",
      "role": "Managing Director",
      "image": "/team/Shah Hasibur Rahman.webp",
      "bio": "18+ years across brand building, PR, and strategic planning. He is driving adoption of cloud-based medical ERP and shaping the company sustainable growth."
    },
    {
      "name": "Mohammad Sadequl Arefeen",
      "role": "Director",
      "image": "/team/Mohammad Sadequl Arefeen.webp",
      "bio": "20+ years as an entrepreneur, investor, and PR strategist. He is pivotal in shaping strategic direction and expanding the company footprint."
    }
  ]
}'::jsonb),

('partners', '{
  "items": [
    {"name": "Cypheme",                   "logo": "/partners/cypheme.webp",                          "href": "https://www.cypheme.com"},
    {"name": "Bondstein",                 "logo": "/partners/bondstein_black_logo.png",               "href": "https://bondstein.com/"},
    {"name": "Spellbound Communications", "logo": "/partners/spellbound communications ltd.png",      "href": "https://spellboundbd.com/"},
    {"name": "The Earth",                 "logo": "/partners/the earth.png",                          "href": "https://theearthbd.org/"},
    {"name": "Singularity",               "logo": "/partners/singularity.png",                        "href": "https://singularitybd.com/"}
  ]
}'::jsonb),

('blog', '{
  "eyebrow": "Insights & Resources",
  "title": "From the journal.",
  "intro": "Industry trends, tips, and best practices from e2People Limited — covering digital transformation and innovative software solutions.",
  "articles": [
    {"number": "01", "category": "Enterprise Systems", "title": "Why Every Business Needs a Custom ERP System",  "excerpt": "ERP systems are no longer optional for businesses that want to scale and optimise operations. Here is why custom matters.", "readTime": "6 min read", "tone": "from-brand-700 to-brand-400"},
    {"number": "02", "category": "Mobile",             "title": "Mobile Apps: The Future of Customer Engagement","excerpt": "How mobile apps are transforming customer experiences and driving business success — and what to design for.",             "readTime": "5 min read", "tone": "from-emerald-700 to-emerald-400"},
    {"number": "03", "category": "Web",                "title": "How to Build a Successful Website",             "excerpt": "Key considerations for creating a website that aligns with your business objectives and engages your audience.",          "readTime": "7 min read", "tone": "from-violet-700 to-violet-400"}
  ],
  "cta": {"label": "Read Our Blog", "to": "contact"}
}'::jsonb),

('contact', '{
  "eyebrow": "Let''s talk",
  "title": "Get in\ntouch.",
  "subtext": "We would love to hear about your project. Whether you are ready to start a new digital solution or simply need advice, we are here to help. Reach out and let us start building your digital future.",
  "email": "info@e2people.com",
  "phone": {"display": "+880 1713 335334", "tel": "+8801713335334"},
  "address": "3rd Floor, House 147, Road 1 (East), Baridhara DOHS, Dhaka, Bangladesh",
  "ctaLabel": "Submit"
}'::jsonb),

('footer', '{
  "tagline": "Empowering Your Business Through Digital Innovation.",
  "madeWith": "Made with care by e2People.",
  "quickLinks": [
    {"label": "Home",       "to": "hero"},
    {"label": "About Us",   "to": "about"},
    {"label": "Services",   "to": "services"},
    {"label": "Solutions",  "to": "solutions"},
    {"label": "Portfolio",  "to": "portfolio"},
    {"label": "Blog",       "to": "blog"},
    {"label": "Contact Us", "to": "contact"}
  ],
  "serviceLinks": [
    {"label": "Web Design & Development",        "to": "services"},
    {"label": "Android and iOS App Development", "to": "services"},
    {"label": "Enterprise Software (ERP)",       "to": "services"},
    {"label": "CRM Solutions",                   "to": "services"},
    {"label": "APIs & Integrations",             "to": "services"}
  ],
  "legalLinks": [
    {"label": "Privacy Policy",     "href": "/legal#privacy"},
    {"label": "Terms & Conditions", "href": "/legal#terms"},
    {"label": "Cookie Policy",      "href": "/legal#cookies"}
  ],
  "socialLinks": [
    {"label": "Facebook",  "href": "#", "icon": "facebook"},
    {"label": "LinkedIn",  "href": "#", "icon": "linkedin"},
    {"label": "Twitter",   "href": "#", "icon": "twitter"},
    {"label": "Instagram", "href": "#", "icon": "instagram"}
  ]
}'::jsonb)

ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

-- Done! All content seeded.
SELECT section, updated_at FROM public.site_content ORDER BY id;
