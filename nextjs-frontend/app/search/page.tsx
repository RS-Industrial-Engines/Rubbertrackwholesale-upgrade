import { Suspense } from "react";
import { Metadata } from "next";
import { SearchContent } from "@/components/search/search-content";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search for rubber tracks by machine model, track size, or brand. Find compatible tracks for your equipment.",
};

function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-secondary rounded w-1/3" />
          <div className="h-6 bg-secondary rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-secondary rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
