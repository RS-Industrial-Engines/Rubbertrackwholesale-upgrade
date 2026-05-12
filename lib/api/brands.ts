import { fetchAPI } from "./client";
import type { Brand, PaginatedResponse } from "@/types";

export async function getBrands(params?: {
  skip?: number;
  limit?: number;
  search?: string;
  is_us_supported?: boolean;
}): Promise<PaginatedResponse<Brand>> {
  const searchParams = new URLSearchParams();
  
  if (params?.skip) searchParams.set("skip", params.skip.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.is_us_supported !== undefined) {
    searchParams.set("is_us_supported", params.is_us_supported.toString());
  }

  const query = searchParams.toString();
  return fetchAPI<PaginatedResponse<Brand>>(
    `/brands${query ? `?${query}` : ""}`,
    { tags: ["brands"] }
  );
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  try {
    return await fetchAPI<Brand>(`/brands/${slug}`, { tags: ["brands", `brand-${slug}`] });
  } catch {
    return null;
  }
}

export async function getUSBrands(): Promise<Brand[]> {
  const response = await getBrands({ is_us_supported: true, limit: 100 });
  return response.items;
}

export async function getPopularBrands(): Promise<Brand[]> {
  // Return top US-supported brands commonly searched for
  const popularSlugs = [
    "kubota",
    "caterpillar",
    "bobcat",
    "john-deere",
    "takeuchi",
    "case",
    "new-holland",
    "komatsu",
    "hitachi",
    "volvo",
  ];
  
  const brands = await getUSBrands();
  return brands.filter((brand) =>
    popularSlugs.includes(brand.slug) ||
    popularSlugs.some((slug) => brand.slug.includes(slug))
  ).slice(0, 10);
}
