// ============ Database Row Types ============

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: number;
  key_name: string;
  value: string;
  updated_at: string;
}

export interface HeroSection {
  id: number;
  badge_text: string;
  title_line1: string;
  title_line2: string;
  title_line3: string;
  subtitle: string;
  cta_text1: string;
  cta_link1: string;
  cta_text2: string;
  cta_link2: string;
  hero_image: string | null;
  updated_at: string;
}

export interface AboutSection {
  id: number;
  title: string;
  description: string;
  photo: string | null;
  birth_date: string;
  height: string;
  weight: string;
  domicile: string;
  updated_at: string;
}

export interface Talent {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string;
  image: string | null;
  video_url: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Music {
  id: number;
  title: string;
  label: string;
  composer: string;
  composer_info: string;
  description: string;
  cover_image: string | null;
  youtube_url: string | null;
  spotify_url: string | null;
  lyrics: string | null;
  is_latest: number;
  release_date: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface MediaCoverage {
  id: number;
  media_name: string;
  url: string | null;
  logo: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface InstagramStat {
  id: number;
  label: string;
  value: string;
  sub_label: string;
  icon: string;
  color: string;
  sort_order: number;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string | null;
  image_url: string;
  alt_text: string | null;
  category: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface StatsRibbon {
  id: number;
  label: string;
  value: string;
  sort_order: number;
  updated_at: string;
}

// ============ API Response Types ============

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
