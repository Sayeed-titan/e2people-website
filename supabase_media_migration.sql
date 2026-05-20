-- ─── MEDIA ITEMS TABLE ─────────────────────────────────────────────────────
-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste & run

CREATE TABLE IF NOT EXISTS media_items (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  type          text        NOT NULL CHECK (type IN ('photo', 'video')),
  title         text        DEFAULT '',
  caption       text        DEFAULT '',
  url           text        NOT NULL DEFAULT '',
  thumbnail_url text        DEFAULT '',
  position      integer     DEFAULT 0,
  published     boolean     DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Public can read published items only
CREATE POLICY "Public read published media"
  ON media_items FOR SELECT
  USING (published = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Auth users manage media"
  ON media_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─── SEED HEADER INTO site_content ─────────────────────────────────────────
INSERT INTO site_content (section, data)
VALUES (
  'media',
  '{"eyebrow":"Our Media","title":"Gallery & Videos","intro":"A glimpse into our work, events, and milestones."}'
)
ON CONFLICT (section) DO NOTHING;
