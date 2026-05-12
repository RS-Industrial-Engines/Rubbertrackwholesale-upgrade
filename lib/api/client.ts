const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://rubbertrackwholesale-upgrade-production.up.railway.app";

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

export class APIError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 3600, tags, ...fetchOptions } = options;

  const url = `${API_BASE_URL}/api${endpoint}`;

  const res = await fetch(url, {
    ...fetchOptions,
    next: {
      revalidate: revalidate === false ? 0 : revalidate,
      tags,
    },
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    throw new APIError(`API error: ${res.statusText}`, res.status);
  }

  return res.json();
}

// Client-side fetcher for SWR
export const swrFetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new APIError(`Fetch error: ${res.statusText}`, res.status);
  }
  return res.json();
};
