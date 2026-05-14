import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, Phone, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STATIC_BLOG_POSTS, StaticBlogPost } from "@/lib/data/blog-posts";
import { BUSINESS_INFO, createMachineSlug } from "@/lib/url-utils";
import {
  getSiteUrl,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Get blog post by slug - static-first
function getBlogPost(slug: string): StaticBlogPost | null {
  return STATIC_BLOG_POSTS.find((post) => post.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Rubber Track Wholesale",
    };
  }

  return {
    title: `${post.title} | Rubber Track Wholesale`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at,
      authors: [BUSINESS_INFO.name],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  const articleSchema = generateArticleSchema(post);

  // Get related posts (same category, excluding current)
  const relatedPosts = STATIC_BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
        }}
      />

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
          <li>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-foreground font-medium truncate max-w-[200px]">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Article */}
      <article className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded">
                {post.category}
              </span>
              {post.featured && (
                <span className="text-sm font-semibold px-3 py-1 bg-amber-100 text-amber-800 rounded">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Render markdown content as HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content),
              }}
            />
          </div>

          {/* Related Machines */}
          {post.relatedMachines && post.relatedMachines.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Related Machines
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.relatedMachines.map((machine) => (
                  <Link
                    key={machine.slug}
                    href={`/machines/${machine.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    {machine.name}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Track Sizes */}
          {post.relatedTrackSizes && post.relatedTrackSizes.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Related Track Sizes
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.relatedTrackSizes.map((size) => (
                  <Link
                    key={size}
                    href={`/track-size/${size.toLowerCase()}`}
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors font-mono"
                  >
                    {size}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Need Help Finding the Right Track?
            </h2>
            <p className="text-muted-foreground mb-4">
              Our experts can help you find the perfect rubber tracks for your
              machine. Call now for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/rubber-tracks">Search by Machine</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-4 w-4 mr-2" />
                  {BUSINESS_INFO.phone}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 py-12 lg:py-16 bg-secondary">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <Card className="h-full hover:border-primary transition-colors group">
                  <CardContent className="p-6">
                    <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-3 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
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
    </main>
  );
}

// Simple markdown to HTML renderer
function renderMarkdown(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-4">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
    // Tables (basic)
    .replace(/\|([^|]+)\|([^|]+)\|/g, '<tr><td class="border px-3 py-2">$1</td><td class="border px-3 py-2">$2</td></tr>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="my-4">')
    // Wrap in paragraph
    .replace(/^(?!<[h|l|t])(.+)$/gm, '<p class="my-4">$1</p>')
    // Clean up empty paragraphs
    .replace(/<p class="my-4"><\/p>/g, '')
    .replace(/<p class="my-4">\s*<\/p>/g, '');
}
