-- =============================================
-- Anisa CMS - Database Schema
-- Run this SQL on your cPanel MySQL database
-- =============================================

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key_name` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `hero_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `badge_text` VARCHAR(255) DEFAULT 'Little Star, Big Dreams!',
  `title_line1` VARCHAR(255) DEFAULT 'Hi, I''m',
  `title_line2` VARCHAR(255) DEFAULT 'Precious',
  `title_line3` VARCHAR(255) DEFAULT 'Annisa!',
  `subtitle` TEXT,
  `cta_text1` VARCHAR(100) DEFAULT 'See My Work',
  `cta_link1` VARCHAR(255) DEFAULT '#portfolio',
  `cta_text2` VARCHAR(100) DEFAULT 'Listen Now',
  `cta_link2` VARCHAR(255) DEFAULT '#music',
  `hero_image` VARCHAR(500),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `about_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) DEFAULT 'Meet a shining young star!',
  `description` TEXT,
  `photo` VARCHAR(500),
  `birth_date` VARCHAR(50) DEFAULT 'Feb 2019',
  `height` VARCHAR(20) DEFAULT '110cm',
  `weight` VARCHAR(20) DEFAULT '20kg',
  `domicile` VARCHAR(100) DEFAULT 'Kuala Lumpur & Jakarta',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `talents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `icon` VARCHAR(10) DEFAULT '🎤',
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `portfolios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `category` VARCHAR(50) DEFAULT 'commercial',
  `tags` VARCHAR(255),
  `image` VARCHAR(500),
  `video_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `music` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255),
  `composer` VARCHAR(255),
  `composer_info` TEXT,
  `description` TEXT,
  `cover_image` VARCHAR(500),
  `youtube_url` VARCHAR(500),
  `spotify_url` VARCHAR(500),
  `lyrics` TEXT,
  `is_latest` TINYINT(1) DEFAULT 0,
  `release_date` DATE,
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `media_coverages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `media_name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(500),
  `logo` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `instagram_stats` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(100) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  `sub_label` VARCHAR(100),
  `icon` VARCHAR(10) DEFAULT '📊',
  `color` VARCHAR(50) DEFAULT 'pink',
  `sort_order` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255),
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255),
  `category` VARCHAR(50) DEFAULT 'general',
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `stats_ribbon` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(100) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  `sort_order` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================
-- Seed Data
-- =============================================

-- Admin user (password: admin123) — CHANGE THIS IN PRODUCTION!
-- Password hash generated with bcrypt
INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Admin', 'admin@annisa.com', '$2b$10$8K1p/OZKvOGIWNjXXRK7/.nBqU7Lg0Iv6F//2NKbGMB.RJXkC0Gxm');

-- Hero section
INSERT INTO `hero_section` (`badge_text`, `title_line1`, `title_line2`, `title_line3`, `subtitle`) VALUES
('🌟 Little Star, Big Dreams!', 'Hi, I''m', 'Precious', 'Annisa!', 'A 6-year-old shining star with a heart full of charm ✨ Singer, model, actress & creative artist from Kuala Lumpur & Jakarta.');

-- About section
INSERT INTO `about_section` (`title`, `description`, `birth_date`, `height`, `weight`, `domicile`) VALUES
('Meet a shining young star! ✨', 'Precious Annisa Dalimunthe, affectionately known as Annisa Dalimunthe in Indonesia and Precious Annisa in Malaysia, is a bright and talented kid who continues to capture hearts across social media. Active on Instagram since June 2024, her journey has grown rapidly and organically, reflecting genuine audience connection and love. She has achieved 4,248 organic followers while reaching an impressive 4 million accounts on Instagram.', 'Feb 2019', '110cm', '20kg', 'Kuala Lumpur & Jakarta');

-- Talents
INSERT INTO `talents` (`icon`, `title`, `description`, `sort_order`) VALUES
('🎤', 'Singing', 'Released debut single "Anugerah Terindah" under Aksen Entertainment', 1),
('📸', 'Modelling', 'Professional photo shoots with top brands like Dunkin'' Donut & SP Setia', 2),
('🎭', 'Acting', 'Natural talent for performing in commercial video shoots and events', 3),
('🎨', 'Creative Arts', 'Passionate about drawing, coloring, and all forms of creative expression', 4);

-- Portfolios
INSERT INTO `portfolios` (`title`, `description`, `category`, `tags`, `sort_order`) VALUES
('SP Setia''s 50th Year Anniversary', 'Featured in the official anniversary video campaign for SP Setia, one of Malaysia''s leading property developers.', 'commercial', 'Video Shoot,Commercial', 1),
('Dunkin'' Donut - Chocolate Greentea Launch', 'Star of the new flavor launch campaign featuring photo and video shoots for Dunkin'' Donut''s Chocolate Greentea.', 'commercial', 'Photo Shoot,Video Shoot', 2);

-- Music
INSERT INTO `music` (`title`, `label`, `composer`, `composer_info`, `description`, `is_latest`, `release_date`, `sort_order`) VALUES
('Anugerah Terindah', 'Aksen Entertainment', 'Posan Tobing', 'Former drummer of Kotak band, composer of Allysa Dezek''s "Lagu Untuk Kamu" - 300M+ views on YouTube', 'Launch event hosted by renowned Indonesian kids'' idol Chiquita Meidy with coverage from over 80 media outlets nationwide.', 1, '2025-11-01', 1);

UPDATE `music` SET `lyrics` = 'Verse:
Daddy daddy daddy
Terima kasih sudah menjagaku
Mommy mommy mommy
Terima kasih sudah mengajariku
Beruntungnya diriku daddy
Mendapatkan ayah yang baik sepertimu
Beruntungnya diriku mommy
Mendapatkan ibu yang tulus sepertimu

Bridge:
Kalau kubesar nanti, aku akan berbakti
Dan selalu sayang padamu
Daddy anugerah terindah
Mommy surga duniaku
Yang Tuhan berikan padaku...

Reff:
Kan kuuntai seribu bunga
Untukmu ayah ibuku sayang
Tak akan lekang oleh waktu
Sayangku padamu
Kamulah surgaku
Terima kasih Tuhanku
Atas kau berikan ayah ibuku
Aku bahagia selalu
Didekat, ayah ibuku, sayangku.' WHERE `title` = 'Anugerah Terindah';

-- Stats Ribbon
INSERT INTO `stats_ribbon` (`label`, `value`, `sort_order`) VALUES
('Media Coverage', '80+', 1),
('Instagram Views', '7.3M', 2),
('Accounts Reached', '3M+', 3),
('IG Impressions', '4M', 4);

-- Instagram Stats
INSERT INTO `instagram_stats` (`label`, `value`, `sub_label`, `icon`, `color`, `sort_order`) VALUES
('Total Views', '7.3M', 'Last 90 days', '📊', 'purple', 1),
('Accounts Reached', '3M+', '+21,393%', '👥', 'pink', 2),
('Non-Followers', '98.8%', 'Organic Reach', '🔥', 'orange', 3),
('From Reels', '80%', 'Content Type', '🎬', 'blue', 4);

-- Media Coverage
INSERT INTO `media_coverages` (`media_name`, `url`, `sort_order`) VALUES
('Kompas.com', 'https://kompas.com', 1),
('Tribunnews', 'https://tribunnews.com', 2),
('Detik.com', 'https://detik.com', 3),
('CNN Indonesia', 'https://cnnindonesia.com', 4),
('Liputan6', 'https://liputan6.com', 5),
('Metro TV', 'https://metrotvnews.com', 6),
('Suara.com', 'https://suara.com', 7),
('VOI', 'https://voi.id', 8);

-- Site Settings
INSERT INTO `site_settings` (`key_name`, `value`) VALUES
('site_name', 'Precious Annisa'),
('site_tagline', 'Singer · Model · Actress · Creative Artist'),
('contact_email', 'contact@annisa.com'),
('instagram_url', 'https://instagram.com/annisavoice.official'),
('youtube_url', '#'),
('meta_description', 'Precious Annisa Dalimunthe - A rising young star from Kuala Lumpur & Jakarta. Singer, model, actress, and creative artist.'),
('site_logo', '/logo.png'),
('whatsapp_url', '');
