// Railway API configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://rubbertrackwholesale-upgrade-production.up.railway.app";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Product {
  id: number;
  sku: string;
  title: string;
  name?: string;
  description?: string;
  price?: number;
  sale_price?: number;
  brand_id?: number;
  brand?: Brand;
  brand_name?: string;
  category_id?: number;
  category?: Category;
  category_name?: string;
  size?: string;
  track_size?: string;
  part_number?: string;
  images?: string[];
  image_url?: string;
  in_stock?: boolean;
  stock_quantity?: number;
  specifications?: Record<string, string>;
  machine_models?: MachineModel[];
  compatible_machines?: string[];
  weight?: number;
  dimensions?: string;
  warranty?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  logo_url?: string;
  description?: string;
  is_us_supported?: boolean;
  website?: string;
  country?: string;
  product_count?: number;
  machine_count?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  image_url?: string;
  product_count?: number;
  seo_title?: string;
  seo_description?: string;
}

export interface MachineModel {
  id: number;
  make: string;
  model: string;
  brand?: string;
  equipment_type?: string;
  year_start?: number;
  year_end?: number;
  track_sizes?: string[];
  compatible_track_sizes?: TrackSize[];
  slug?: string;
  image_url?: string;
  specifications?: Record<string, string>;
}

export interface TrackSize {
  id: number;
  size: string;
  width: number;
  pitch: number;
  links: number;
  is_in_stock?: boolean;
  price?: number;
  compatible_machines?: MachineModel[];
  product_count?: number;
}

export interface TrackSizeGrouped {
  width: number;
  sizes: TrackSize[];
}

export interface Compatibility {
  id: number;
  make: string;
  model: string;
  equipment_type?: string;
  track_sizes?: string[];
  track_size_details?: TrackSize[];
}

export interface CompatibilitySearchResult {
  machine: MachineModel;
  track_sizes: TrackSize[];
  products: Product[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  category_id?: number;
  order?: number;
  is_published?: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  image_url?: string;
  author?: string;
  is_published: boolean;
  published_at?: string;
  category_id?: number;
  category?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  read_time?: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  machine_info?: string;
  message: string;
  subject?: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  machine_make?: string;
  machine_model?: string;
  track_size?: string;
  quantity?: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface SearchParams {
  q?: string;
  brand?: string;
  category?: string;
  track_size?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  page?: number;
  size?: number;
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API = {
  // Products
  products: `${API_BASE_URL}/api/products`,
  product: (id: number | string) => `${API_BASE_URL}/api/products/${id}`,
  productsSearch: `${API_BASE_URL}/api/products/search/advanced`,

  // Brands
  brands: `${API_BASE_URL}/api/brands`,
  brand: (slug: string) => `${API_BASE_URL}/api/brands/${slug}`,

  // Categories
  categories: `${API_BASE_URL}/api/categories`,
  category: (slug: string) => `${API_BASE_URL}/api/categories/${slug}`,

  // Machine Models
  machineModels: `${API_BASE_URL}/api/machine-models`,
  machineModelBrands: `${API_BASE_URL}/api/machine-models/brands`,
  machineModelEquipmentTypes: `${API_BASE_URL}/api/machine-models/equipment-types`,
  machineModelsByBrand: (brand: string) => `${API_BASE_URL}/api/models/${brand}`,
  machineModel: (brand: string, model: string) =>
    `${API_BASE_URL}/api/models/${brand}/${model}`,

  // Track Sizes
  trackSizes: `${API_BASE_URL}/api/track-sizes`,
  trackSizesGrouped: `${API_BASE_URL}/api/track-sizes/grouped`,

  // Compatibility
  compatibility: `${API_BASE_URL}/api/compatibility`,
  compatibilitySearch: `${API_BASE_URL}/api/compatibility/search`,
  compatibilityByMachine: (make: string, model: string) =>
    `${API_BASE_URL}/api/compatibility/by-machine/${encodeURIComponent(make)}/${encodeURIComponent(model)}`,
  compatibilityByTrackSize: (trackSize: string) =>
    `${API_BASE_URL}/api/compatibility/by-track-size/${encodeURIComponent(trackSize)}`,

  // Part Numbers
  partNumberSearch: `${API_BASE_URL}/api/part-numbers/search`,

  // FAQs
  faqs: `${API_BASE_URL}/api/faqs`,

  // Blogs
  blogs: `${API_BASE_URL}/api/blogs`,
  blogBySlug: (slug: string) => `${API_BASE_URL}/api/blogs/slug/${slug}`,

  // Contact
  contact: `${API_BASE_URL}/api/contact`,
  quote: `${API_BASE_URL}/api/quote`,
} as const;

// ============================================================================
// FETCH UTILITIES
// ============================================================================

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic fetcher for SWR
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// Server-side fetch with caching options
export async function serverFetch<T>(
  url: string,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: options?.revalidate ?? 3600, // Default 1 hour cache
      tags: options?.tags,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

// Products
export async function getProducts(params?: SearchParams): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });
  }
  const url = `${API.products}${searchParams.toString() ? `?${searchParams}` : ""}`;
  return serverFetch<Product[]>(url, { tags: ["products"] });
}

export async function getProduct(id: number | string): Promise<Product> {
  return serverFetch<Product>(API.product(id), { tags: ["products", `product-${id}`] });
}

export async function searchProducts(params: SearchParams): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return serverFetch<Product[]>(`${API.productsSearch}?${searchParams}`, {
    tags: ["products"],
  });
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  return serverFetch<Brand[]>(API.brands, { tags: ["brands"] });
}

export async function getBrand(slug: string): Promise<Brand> {
  return serverFetch<Brand>(API.brand(slug), { tags: ["brands", `brand-${slug}`] });
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return serverFetch<Category[]>(API.categories, { tags: ["categories"] });
}

export async function getCategory(slug: string): Promise<Category> {
  return serverFetch<Category>(API.category(slug), {
    tags: ["categories", `category-${slug}`],
  });
}

// Machine Models
export async function getMachineModels(): Promise<MachineModel[]> {
  return serverFetch<MachineModel[]>(API.machineModels, { tags: ["machines"] });
}

export async function getMachineModelBrands(): Promise<string[]> {
  return serverFetch<string[]>(API.machineModelBrands, { tags: ["machines"] });
}

export async function getMachineModelEquipmentTypes(): Promise<string[]> {
  return serverFetch<string[]>(API.machineModelEquipmentTypes, { tags: ["machines"] });
}

export async function getMachineModelsByBrand(brand: string): Promise<MachineModel[]> {
  return serverFetch<MachineModel[]>(API.machineModelsByBrand(brand), {
    tags: ["machines", `machines-${brand}`],
  });
}

export async function getMachineModel(
  brand: string,
  model: string
): Promise<MachineModel> {
  return serverFetch<MachineModel>(API.machineModel(brand, model), {
    tags: ["machines", `machine-${brand}-${model}`],
  });
}

// Track Sizes
export async function getTrackSizes(): Promise<TrackSize[]> {
  return serverFetch<TrackSize[]>(API.trackSizes, { tags: ["track-sizes"] });
}

export async function getTrackSizesGrouped(): Promise<TrackSizeGrouped[]> {
  return serverFetch<TrackSizeGrouped[]>(API.trackSizesGrouped, { tags: ["track-sizes"] });
}

// Compatibility
export async function getCompatibility(): Promise<Compatibility[]> {
  return serverFetch<Compatibility[]>(API.compatibility, { tags: ["compatibility"] });
}

export interface CompatibilitySearchParams {
  make?: string;
  model?: string;
  track_size?: string;
  include_all?: boolean;
}

export async function searchCompatibility(
  params: CompatibilitySearchParams
): Promise<CompatibilitySearchResult[]> {
  const searchParams = new URLSearchParams();
  if (params.make) searchParams.set("make", params.make);
  if (params.model) searchParams.set("model", params.model);
  if (params.track_size) searchParams.set("track_size", params.track_size);
  if (params.include_all) searchParams.set("include_all", "true");
  
  const url = `${API.compatibilitySearch}?${searchParams.toString()}`;
  return serverFetch<CompatibilitySearchResult[]>(url, { tags: ["compatibility"] });
}

export async function getCompatibilityByMachine(
  make: string,
  model: string
): Promise<CompatibilitySearchResult> {
  return serverFetch<CompatibilitySearchResult>(API.compatibilityByMachine(make, model), {
    tags: ["compatibility", `compatibility-${make}-${model}`],
  });
}

export async function getCompatibilityByTrackSize(
  trackSize: string
): Promise<MachineModel[]> {
  return serverFetch<MachineModel[]>(API.compatibilityByTrackSize(trackSize), {
    tags: ["compatibility", `compatibility-track-${trackSize}`],
  });
}

// Part Numbers
export async function searchPartNumbers(query: string): Promise<Product[]> {
  const url = `${API.partNumberSearch}?q=${encodeURIComponent(query)}`;
  return serverFetch<Product[]>(url, { tags: ["products"] });
}

// FAQs
export async function getFAQs(): Promise<FAQ[]> {
  return serverFetch<FAQ[]>(API.faqs, { tags: ["faqs"] });
}

// Blogs
export async function getBlogs(): Promise<Blog[]> {
  return serverFetch<Blog[]>(API.blogs, { tags: ["blogs"] });
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  return serverFetch<Blog>(API.blogBySlug(slug), { tags: ["blogs", `blog-${slug}`] });
}

// Contact
export async function submitContact(data: ContactMessage): Promise<{ success: boolean }> {
  const res = await fetch(API.contact, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new ApiError(res.status, "Failed to submit contact form");
  }

  return res.json();
}

export async function submitQuote(data: QuoteRequest): Promise<{ success: boolean }> {
  const res = await fetch(API.quote, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new ApiError(res.status, "Failed to submit quote request");
  }

  return res.json();
}

// ============================================================================
// URL HELPERS
// ============================================================================

export function createMachineSlug(make: string, model: string): string {
  return `${make.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`;
}

export function parseMachineSlug(slug: string): { make: string; model: string } | null {
  // Common patterns: kubota-svl75, cat-259d, bobcat-t650
  // Try to find the brand prefix
  const brands = [
    "kubota",
    "cat",
    "caterpillar",
    "bobcat",
    "john-deere",
    "takeuchi",
    "case",
    "hitachi",
    "kobelco",
    "komatsu",
    "volvo",
    "hyundai",
    "yanmar",
    "ihi",
    "terex",
    "gehl",
    "mustang",
    "new-holland",
    "jcb",
    "sany",
  ];

  const lowerSlug = slug.toLowerCase();
  for (const brand of brands) {
    if (lowerSlug.startsWith(brand + "-")) {
      const model = slug.slice(brand.length + 1);
      return {
        make: brand.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        model: model.toUpperCase(),
      };
    }
  }

  // Fallback: split on first hyphen
  const firstHyphen = slug.indexOf("-");
  if (firstHyphen > 0) {
    return {
      make: slug.slice(0, firstHyphen).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      model: slug.slice(firstHyphen + 1).toUpperCase(),
    };
  }

  return null;
}

export function formatTrackSize(size: string): string {
  // Ensure consistent format: 400x86x52
  return size.replace(/\s+/g, "").toLowerCase();
}

export function parseTrackSize(size: string): {
  width: number;
  pitch: number;
  links: number;
} | null {
  const match = size.match(/(\d+)x([\d.]+)x(\d+)/i);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      pitch: parseFloat(match[2]),
      links: parseInt(match[3], 10),
    };
  }
  return null;
}
