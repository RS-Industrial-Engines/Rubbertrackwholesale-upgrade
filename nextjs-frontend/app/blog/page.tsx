import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights, maintenance tips, and industry news about rubber tracks and heavy machinery undercarriage parts.",
};

export default function BlogPage() {
  return <BlogListContent />;
}
