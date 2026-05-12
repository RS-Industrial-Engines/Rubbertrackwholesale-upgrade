// API configuration for the backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// API endpoints
export const API = {
  products: `${API_BASE_URL}/api/products`,
  product: (id: string) => `${API_BASE_URL}/api/products/${id}`,
  brands: `${API_BASE_URL}/api/brands`,
  categories: `${API_BASE_URL}/api/categories`,
  contact: `${API_BASE_URL}/api/contact`,
  faqs: `${API_BASE_URL}/api/faqs`,
  blogs: `${API_BASE_URL}/api/blogs`,
  blogBySlug: (slug: string) => `${API_BASE_URL}/api/blogs/slug/${slug}`,
  machineModels: `${API_BASE_URL}/api/machine-models`,
  trackSizes: `${API_BASE_URL}/api/track-sizes`,
  compatibility: `${API_BASE_URL}/api/compatibility`,
  compatibilitySearch: `${API_BASE_URL}/api/compatibility/search`,
  partNumbers: `${API_BASE_URL}/api/part-numbers/search`,
  sections: `${API_BASE_URL}/api/sections`,
} as const;

// Fetcher for SWR
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
};

// Types for API responses
export interface Product {
  id: string;
  sku?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  brand?: string;
  category?: string;
  size?: string;
  part_number?: string;
  images?: string[];
  in_stock?: boolean;
  specifications?: Record<string, string>;
  machine_models?: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
  description?: string;
  is_us_supported?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface TrackSize {
  id: string;
  size: string;
  width?: number;
  pitch?: number;
  links?: number;
  is_in_stock?: boolean;
  price?: number;
}

export interface Compatibility {
  id: string;
  make: string;
  model: string;
  equipment_type?: string;
  track_sizes?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  is_published: boolean;
  published_at?: string;
  category_id?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}
