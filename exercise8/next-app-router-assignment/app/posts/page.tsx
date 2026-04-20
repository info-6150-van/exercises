import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1>All Posts</h1>

      {posts.map((post) => (
        <div key={post.slug} className="card">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>

          <Link href={`/posts/${post.slug}`}>
            <button style={{ marginTop: "10px" }}>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}