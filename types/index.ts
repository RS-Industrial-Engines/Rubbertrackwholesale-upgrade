// API Types based on Railway backend

export interface Brand {
  _id: { $oid: string };
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_us_supported: boolean;
  created_at: { $date: string };
  updated_at: { $date: string };
}

export interface MachineModel {
  _id: { $oid: string };
  brand: string;
  model_name: string;
  full_name: string;
  equipment_type: string | null;
  description: string | null;
  image_url: string | null;
  model_name_normalized: string;
  is_us_supported: boolean;
  created_at: { $date: string };
  updated_at: { $date: string };
}

export interface TrackSize {
  _id: { $oid: string };
  size: string;
  price: number | null;
  width_variant: string | null;
  inventory_count: number | null;
  is_in_stock: boolean;
  description: string | null;
  is_active: boolean;
  links: number;
  pitch: number;
  width: number;
  created_at: { $date: string };
  updated_at: { $date: string };
}

export interface Category {
  _id: { $oid: string };
  name: string;
  slug: string;
  description: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  created_at: { $date: string };
  updated_at: { $date: string };
}

export interface Compatibility {
  _id: { $oid: string };
  brand: string;
  model: string;
  track_size: string;
  track_type: string;
  source: string;
  created_at: { $date: string };
  updated_at: { $date: string };
}

// API Response types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface CompatibilitySearchResult {
  brand: string;
  model: string;
  track_size: string;
  track_type: string;
}

export interface GroupedTrackSizes {
  [width: string]: TrackSize[];
}

// SEO Helper types
export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images?: { url: string; width: number; height: number; alt: string }[];
    locale: string;
    type: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
