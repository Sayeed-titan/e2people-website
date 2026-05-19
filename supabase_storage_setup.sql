-- ============================================================
-- e2People — Blog Image Storage Setup
-- Run in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Create public storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  10485760,  -- 10 MB limit per file
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public to VIEW images (anyone can see blog images)
CREATE POLICY "public_read_blog_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Allow authenticated users (admin) to UPLOAD images
CREATE POLICY "admin_upload_blog_images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE / DELETE their images
CREATE POLICY "admin_manage_blog_images" ON storage.objects
  FOR ALL USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Also add cover_image column to blog_posts if not already there
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS cover_image TEXT DEFAULT '';

SELECT 'Storage bucket blog-images created successfully' AS status;
