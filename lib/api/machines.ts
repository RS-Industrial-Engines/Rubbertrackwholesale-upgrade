import { fetchAPI } from "./client";
import type { MachineModel, PaginatedResponse } from "@/types";
import { generateMachineSlug } from "@/lib/utils";

export async function getMachines(params?: {
  skip?: number;
  limit?: number;
  search?: string;
  brand?: string;
  is_us_supported?: boolean;
}): Promise<PaginatedResponse<MachineModel>> {
  const searchParams = new URLSearchParams();

  if (params?.skip) searchParams.set("skip", params.skip.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.brand) searchParams.set("brand", params.brand);
  if (params?.is_us_supported !== undefined) {
    searchParams.set("is_us_supported", params.is_us_supported.toString());
  }

  const query = searchParams.toString();
  return fetchAPI<PaginatedResponse<MachineModel>>(
    `/machine-models${query ? `?${query}` : ""}`,
    { tags: ["machines"] }
  );
}

export async function getMachineBySlug(
  slug: string
): Promise<MachineModel | null> {
  // Parse slug to get brand and model
  const parts = slug.split("-");
  if (parts.length < 2) return null;

  // Try to find the machine by searching
  const brand = parts[0];
  const model = parts.slice(1).join("-");

  const response = await getMachines({
    search: model,
    limit: 50,
  });

  // Find exact match or closest match
  const machine = response.items.find((m) => {
    const machineSlug = generateMachineSlug(m.brand, m.model_name);
    return machineSlug === slug || machineSlug.includes(slug);
  });

  return machine || null;
}

export async function getMachinesByBrand(
  brand: string,
  limit = 100
): Promise<MachineModel[]> {
  const response = await getMachines({ brand, limit, is_us_supported: true });
  return response.items;
}

export async function getPopularMachines(): Promise<MachineModel[]> {
  // Get machines from popular brands
  const popularBrands = ["Kubota", "Caterpillar", "Bobcat", "John Deere", "Takeuchi"];
  const machines: MachineModel[] = [];

  for (const brand of popularBrands) {
    const response = await getMachines({ brand, limit: 3, is_us_supported: true });
    machines.push(...response.items);
  }

  return machines.slice(0, 12);
}

export async function searchMachines(query: string): Promise<MachineModel[]> {
  const response = await getMachines({ search: query, limit: 20 });
  return response.items;
}
