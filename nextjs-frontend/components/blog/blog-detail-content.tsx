import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Blog } from "@/lib/api";

interface BlogDetailContentProps {
  blog: Blog;
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {blog.published_at && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(blog.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground">{blog.excerpt}</p>
            )}
          </header>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          {blog.content && (
            <div
              className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
        </div>
      </article>
    </div>
  );
}
