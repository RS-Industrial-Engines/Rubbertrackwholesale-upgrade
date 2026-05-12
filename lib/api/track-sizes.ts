import { fetchAPI } from "./client";
import type { TrackSize, GroupedTrackSizes } from "@/types";

export async function getTrackSizes(params?: {
  skip?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
}): Promise<{ items: TrackSize[]; total: number }> {
  const searchParams = new URLSearchParams();

  if (params?.skip) searchParams.set("skip", params.skip.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.is_active !== undefined) {
    searchParams.set("is_active", params.is_active.toString());
  }

  const query = searchParams.toString();
  return fetchAPI<{ items: TrackSize[]; total: number }>(
    `/track-sizes${query ? `?${query}` : ""}`,
    { tags: ["track-sizes"] }
  );
}

export async function getTrackSizeBySize(size: string): Promise<TrackSize | null> {
  try {
    return await fetchAPI<TrackSize>(`/track-sizes/${encodeURIComponent(size)}`, {
      tags: ["track-sizes", `track-size-${size}`],
    });
  } catch {
    return null;
  }
}

export async function getGroupedTrackSizes(): Promise<GroupedTrackSizes> {
  return fetchAPI<GroupedTrackSizes>("/track-sizes/grouped", {
    tags: ["track-sizes"],
    revalidate: 86400, // Cache for 24 hours
  });
}

export async function getPopularTrackSizes(): Promise<TrackSize[]> {
  // Popular track sizes for CTLs and mini excavators
  const popularSizes = [
    "400x86x52",
    "450x86x56",
    "320x86x52",
    "400x86x56",
    "300x52.5x84",
    "230x96x33",
    "300x52.5x80",
    "350x52.5x86",
  ];

  const response = await getTrackSizes({ limit: 200, is_active: true });
  
  return response.items
    .filter((ts) => popularSizes.includes(ts.size))
    .sort((a, b) => popularSizes.indexOf(a.size) - popularSizes.indexOf(b.size));
}

export async function searchTrackSizes(query: string): Promise<TrackSize[]> {
  const response = await getTrackSizes({ search: query, limit: 20, is_active: true });
  return response.items;
}
