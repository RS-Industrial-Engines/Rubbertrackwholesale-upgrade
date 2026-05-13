"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, ChevronRight, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API, fetcher, type Blog } from "@/lib/api";
import { BUSINESS_INFO } from "@/lib/url-utils";
import { getAllStaticBlogPosts, getFeaturedStaticBlogPosts } from "@/lib/data/blog-posts";

interface BlogsResponse {
  blogs: Blog[];
  total: number;
}

// Get static posts from centralized data file
const STATIC_BLOG_POSTS = getAllStaticBlogPosts();

export function BlogListContent() {
  const { data, isLoading } = useSWR<BlogsResponse>(API.blogs, fetcher);

  const apiBlogs = data?.blogs || [];
  
  // Use API blogs if available, otherwise show static content
  const hasApiContent = apiBlogs.length > 0;
  const featuredPosts = getFeaturedStaticBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Guides & Resources</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Rubber Track{" "}
              <span className="text-primary">Guides & Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Expert guides on rubber track selection, measurement,
              maintenance, and equipment-specific recommendations. Free
              resources to help you make informed purchasing decisions.
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading guides...</p>
          </div>
        </div>
      ) : hasApiContent ? (
        // Show API content if available
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiBlogs.map((post) => (
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
        </div>
      ) : (
        // Show static/fallback content
        <>
          {/* Featured Guides */}
          <section className="py-12 lg:py-16 border-b border-border">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Featured Guides
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                          Read Guide
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* All Guides */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                All Guides
              </h2>
              <div className="grid gap-4">
                {STATIC_BLOG_POSTS.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <ArrowRight className="h-4 w-4 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Need Help Finding the Right Tracks?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our experts are ready to help you choose the perfect rubber tracks
            for your equipment. Call us or search our compatibility database.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/machines">
                <Search className="h-5 w-5 mr-2" />
                Search by Machine
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href={BUSINESS_INFO.phoneTel}>
                <Phone className="h-5 w-5 mr-2" />
                Call: {BUSINESS_INFO.phone}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
