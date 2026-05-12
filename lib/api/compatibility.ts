import { fetchAPI } from "./client";
import type { CompatibilitySearchResult } from "@/types";

export async function searchCompatibility(params: {
  brand?: string;
  model?: string;
  track_size?: string;
}): Promise<CompatibilitySearchResult[]> {
  const searchParams = new URLSearchParams();

  if (params.brand) searchParams.set("brand", params.brand);
  if (params.model) searchParams.set("model", params.model);
  if (params.track_size) searchParams.set("track_size", params.track_size);

  const query = searchParams.toString();
  return fetchAPI<CompatibilitySearchResult[]>(
    `/compatibility/search${query ? `?${query}` : ""}`,
    { tags: ["compatibility"] }
  );
}

export async function getCompatibilityByMachine(
  make: string,
  model: string
): Promise<CompatibilitySearchResult[]> {
  return fetchAPI<CompatibilitySearchResult[]>(
    `/compatibility/by-machine/${encodeURIComponent(make)}/${encodeURIComponent(model)}`,
    { tags: ["compatibility", `compatibility-${make}-${model}`] }
  );
}

export async function getCompatibilityByTrackSize(
  trackSize: string
): Promise<CompatibilitySearchResult[]> {
  return fetchAPI<CompatibilitySearchResult[]>(
    `/compatibility/by-track-size/${encodeURIComponent(trackSize)}`,
    { tags: ["compatibility", `compatibility-${trackSize}`] }
  );
}

export async function getMachinesForTrackSize(
  trackSize: string
): Promise<{ brand: string; model: string }[]> {
  const results = await getCompatibilityByTrackSize(trackSize);
  
  // Deduplicate and format
  const uniqueMachines = new Map<string, { brand: string; model: string }>();
  
  for (const result of results) {
    const key = `${result.brand}-${result.model}`;
    if (!uniqueMachines.has(key)) {
      uniqueMachines.set(key, { brand: result.brand, model: result.model });
    }
  }

  return Array.from(uniqueMachines.values());
}

export async function getTrackSizesForMachine(
  make: string,
  model: string
): Promise<string[]> {
  const results = await getCompatibilityByMachine(make, model);
  
  // Deduplicate track sizes
  const uniqueSizes = new Set<string>();
  for (const result of results) {
    uniqueSizes.add(result.track_size);
  }

  return Array.from(uniqueSizes);
}
