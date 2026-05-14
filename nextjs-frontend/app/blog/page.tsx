import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STATIC_BLOG_POSTS } from "@/lib/data/blog-posts";
import { BUSINESS_INFO } from "@/lib/url-utils";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Track Blog | Expert Guides & Maintenance Tips | Rubber Track Wholesale",
  description:
    "Expert insights, maintenance tips, and buying guides for rubber tracks and undercarriage parts. Learn how to measure tracks, choose the right pattern, and maximize track life.",
  openGraph: {
    title: "Rubber Track Blog | Expert Guides & Maintenance Tips",
    description:
      "Expert insights, maintenance tips, and buying guides for rubber tracks and undercarriage parts.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  // Static-first: Always use STATIC_BLOG_POSTS
  // These posts are SEO-optimized and always available
  const posts = STATIC_BLOG_POSTS;
  
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-foreground font-medium">Blog</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Rubber Track Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Expert guides, maintenance tips, and buying advice for rubber tracks
            and undercarriage parts. Learn from{" "}
            {BUSINESS_INFO.name}&apos;s industry experience.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:border-primary transition-colors group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                        {post.category}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">
                        Featured
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center text-sm text-primary mt-4 group-hover:underline">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-primary transition-colors group">
                <CardHeader>
                  <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded w-fit">
                    {post.category}
                  </span>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 mt-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help Finding the Right Track?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experts can help you find the perfect rubber tracks for your
            machine. Search our compatibility database or call for personalized
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/rubber-tracks">Search by Machine</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={BUSINESS_INFO.phoneTel}>
                Call {BUSINESS_INFO.phone}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
