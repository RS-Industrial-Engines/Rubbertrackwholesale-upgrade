import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API } from "@/lib/api";
import { getStaticBlogPost, getAllStaticBlogPosts, type StaticBlogPost } from "@/lib/data/blog-posts";
import { BUSINESS_INFO } from "@/lib/url-utils";
import { generateBreadcrumbSchema, generateArticleSchema, getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogFromAPI(slug: string) {
  try {
    const res = await fetch(API.blogBySlug(slug), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  // Generate static pages for all our static blog posts
  const staticPosts = getAllStaticBlogPosts();
  return staticPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try API first, fall back to static
  const apiBlog = await getBlogFromAPI(slug);
  const staticBlog = getStaticBlogPost(slug);
  
  const blog = apiBlog || staticBlog;

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Rubber Track Wholesale`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: "article",
      publishedTime: blog.published_at,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  // Try API first, fall back to static
  const apiBlog = await getBlogFromAPI(slug);
  const staticBlog = getStaticBlogPost(slug);
  
  // If API has content, use it; otherwise use static
  if (apiBlog) {
    const { BlogDetailContent } = await import("@/components/blog/blog-detail-content");
    return <BlogDetailContent blog={apiBlog} />;
  }
  
  if (staticBlog) {
    return <StaticBlogContent post={staticBlog} />;
  }

  notFound();
}

// Component for rendering static blog posts with markdown-like content
function StaticBlogContent({ post }: { post: StaticBlogPost }) {
  const otherPosts = getAllStaticBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Guides", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.title,
              description: post.excerpt,
              url: `${SITE_URL}/blog/${post.slug}`,
              datePublished: post.published_at,
              dateModified: post.published_at,
            })
          ),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/blog" className="hover:text-foreground">
                Guides
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-br from-secondary to-background py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guides
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-ul:my-4
                  prose-ol:text-muted-foreground prose-ol:my-4
                  prose-li:my-2
                  prose-table:my-6
                  prose-th:bg-secondary prose-th:text-foreground prose-th:p-3 prose-th:text-left
                  prose-td:p-3 prose-td:border-b prose-td:border-border
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
              />
            </div>
          </div>
        </article>

        {/* Related Links */}
        {(post.relatedMachines || post.relatedTrackSizes) && (
          <section className="py-12 bg-secondary border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Related Resources
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {post.relatedMachines && post.relatedMachines.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Related Machines
                      </h3>
                      <div className="space-y-2">
                        {post.relatedMachines.map((machine) => (
                          <Link
                            key={machine.slug}
                            href={`/machines/${machine.slug}`}
                            className="block p-3 bg-card rounded-lg hover:bg-card/80 transition-colors"
                          >
                            <span className="text-foreground font-medium">
                              {machine.name}
                            </span>
                            <ArrowRight className="inline h-4 w-4 ml-2 text-primary" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {post.relatedTrackSizes && post.relatedTrackSizes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Related Track Sizes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.relatedTrackSizes.map((size) => (
                          <Link
                            key={size}
                            href={`/track-size/${size}`}
                            className="px-4 py-2 bg-card rounded-lg hover:bg-card/80 transition-colors text-foreground font-medium"
                          >
                            {size}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* More Guides */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                More Guides
              </h2>
              <div className="grid gap-4">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-primary font-medium">
                        {otherPost.category}
                      </span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                        {otherPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {otherPost.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/blog">View All Guides</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Order Rubber Tracks?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Search our compatibility database or call for expert assistance
              and wholesale pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/machines">Search by Machine</Link>
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
    </>
  );
}

/**
 * Simple markdown parser for our static content
 * Handles: headers, bold, lists, tables, links
 */
function parseMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive list items
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      return `<ul>${match}</ul>`;
    })
    // Tables (simple parsing)
    .replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((c: string) => c.trim());
      if (cells.every((c: string) => /^-+$/.test(c))) {
        return ''; // Skip separator row
      }
      const isHeader = content.includes('---') === false && 
        cells.every((c: string) => c && !c.includes('---'));
      const tag = isHeader ? 'th' : 'td';
      return `<tr>${cells.map((c: string) => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
    })
    // Wrap table rows
    .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
      return `<table><tbody>${match}</tbody></table>`;
    })
    // Phone numbers - make them links
    .replace(/\*\*?\((\d{3})\) (\d{3})-(\d{4})\)?\*\*?/g, 
      '<a href="tel:+1$1$2$3"><strong>($1) $2-$3</strong></a>')
    // Paragraphs - split by double newlines
    .split(/\n\n+/)
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed; // Already HTML
      return `<p>${trimmed}</p>`;
    })
    .join('\n');
}
