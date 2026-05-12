"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API, fetcher, type Blog } from "@/lib/api";

interface BlogsResponse {
  blogs: Blog[];
  total: number;
}

export function BlogListContent() {
  const { data, isLoading } = useSWR<BlogsResponse>(API.blogs, fetcher);

  const blogs = data?.blogs || [];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Expert insights, maintenance tips, and industry news
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Card
                key={post.id}
                className="bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  {post.featured_image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                  <div className="p-6">
                    {post.published_at && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <Calendar className="h-4 w-4" />
                        <time>
                          {new Date(post.published_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No blog posts yet. Check back soon!
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
