import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog/blog-detail-content";
import { API } from "@/lib/api";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
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

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailContent blog={blog} />;
}
