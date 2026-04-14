import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function PostDetailPage({ params }: any) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="card">
      <h1>{post.title}</h1>
      <p style={{ marginTop: "16px", lineHeight: "1.6" }}>
        {post.content}
      </p>
    </div>
  );
}