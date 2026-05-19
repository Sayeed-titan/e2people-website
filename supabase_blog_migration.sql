-- ============================================================
-- e2People — Blog Posts Table Migration
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL DEFAULT 'General',
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',   -- TipTap HTML output
  cover_tone   TEXT NOT NULL DEFAULT 'from-brand-700 to-brand-400',
  cover_image  TEXT DEFAULT '',
  read_time    TEXT NOT NULL DEFAULT '5 min read',
  published    BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "public_read_published" ON public.blog_posts
  FOR SELECT USING (published = true);

-- Authenticated (admin) can read all and write all
CREATE POLICY "admin_all" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed 3 sample posts (published so they show immediately)
INSERT INTO public.blog_posts (slug, title, category, excerpt, content, cover_tone, read_time, published, published_at) VALUES

('why-every-business-needs-a-custom-erp',
 'Why Every Business Needs a Custom ERP System',
 'Enterprise Systems',
 'ERP systems are no longer optional for businesses that want to scale and optimise operations. Here''s why custom matters.',
 '<h2>The Problem With Off-The-Shelf ERP</h2><p>Most businesses start with generic software — spreadsheets, standalone accounting tools, disconnected HR systems. It works, until it doesn''t. As your team grows and operations expand, the cracks start showing: duplicate data entry, no single source of truth, and hours lost chasing information across five different tools.</p><h2>What a Custom ERP Actually Does</h2><p>A custom Enterprise Resource Planning system is built around <strong>your</strong> workflows — not a generic template. It unifies finance, HR, inventory, procurement, and reporting into a single platform that speaks the language of your business.</p><ul><li>Real-time visibility across every department</li><li>Automated workflows that eliminate manual handoffs</li><li>Reporting dashboards tailored to leadership decisions</li><li>Scalable architecture that grows with you</li></ul><h2>The ROI Case</h2><p>Companies that invest in custom ERP consistently report 20–35% reduction in operational overhead within the first year. The system pays for itself not through magic, but through <em>eliminating waste</em>.</p><h2>Is It Right for You?</h2><p>If your team spends more than 5 hours per week manually moving data between systems, a custom ERP is worth serious consideration. We''d love to walk you through what that could look like for your organisation.</p>',
 'from-brand-700 to-brand-400',
 '6 min read', true, now()),

('mobile-apps-future-of-customer-engagement',
 'Mobile Apps: The Future of Customer Engagement',
 'Mobile',
 'How mobile apps are transforming customer experiences and driving business success — and what to design for.',
 '<h2>Why Mobile-First Is Now Just "First"</h2><p>Over 60% of all web traffic now comes from mobile devices. But a responsive website is not the same as a native mobile app. Apps offer something websites cannot: <strong>presence on the home screen</strong>, push notifications, offline access, and deeply personalised experiences.</p><h2>What Separates Good Apps from Great Ones</h2><p>The best mobile apps share three qualities:</p><ol><li><strong>Speed</strong> — Users abandon apps that take more than 3 seconds to load a screen.</li><li><strong>Clarity</strong> — Every screen should have one primary action. Complexity kills engagement.</li><li><strong>Personalisation</strong> — The app should feel like it was built for the individual user.</li></ol><h2>Business Outcomes We''ve Seen</h2><p>Across our client projects, mobile apps have driven measurable results: increased repeat purchase rates, higher customer satisfaction scores, and significantly reduced support overhead through self-service features.</p><h2>Android vs iOS — Do You Need Both?</h2><p>In most markets, yes. With modern cross-platform frameworks, building for both simultaneously adds only 20–30% to development cost while doubling your reach. We build native-quality Android and iOS apps that share a single codebase — giving you the best of both worlds.</p>',
 'from-emerald-700 to-emerald-400',
 '5 min read', true, now()),

('how-to-build-a-successful-website',
 'How to Build a Successful Website',
 'Web',
 'Key considerations for creating a website that aligns with your business objectives and engages your audience.',
 '<h2>Your Website Is Your Most Important Sales Tool</h2><p>Before a prospect calls you, emails you, or walks through your door — they''ve already visited your website. In that visit, they formed an opinion. Research shows users judge a website''s credibility in <strong>under 50 milliseconds</strong>.</p><h2>The Four Pillars of a Successful Website</h2><h3>1. Clear Purpose</h3><p>Every page should answer one question for the visitor: "What do I do next?" Unclear websites bleed conversions. Define the single most important action you want visitors to take and design toward it.</p><h3>2. Fast Performance</h3><p>A one-second delay in page load time causes a 7% reduction in conversions. Performance is not a technical detail — it''s a business requirement. Optimise images, minimise code, use a CDN.</p><h3>3. Mobile Excellence</h3><p>Design mobile-first, not as an afterthought. If your website is painful to use on a phone, you are turning away the majority of your potential customers.</p><h3>4. Trust Signals</h3><p>Client testimonials, case studies, team photos, certifications — these elements transform a good-looking website into one that <em>converts</em>. People buy from people they trust.</p><h2>Working With a Development Partner</h2><p>The best websites are built collaboratively. Bring your business knowledge; we bring technical and design expertise. The result is a website that is authentically yours and strategically sharp.</p>',
 'from-violet-700 to-violet-400',
 '7 min read', true, now())

ON CONFLICT (slug) DO NOTHING;

SELECT id, slug, title, published FROM public.blog_posts ORDER BY id;
