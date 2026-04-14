export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "nextjs-basics",
    title: "Next.js Basics",
    excerpt: "Learn the basics of Next.js App Router.",
    content:
      "This is a sample article about Next.js basics. You can explain routing, layouts, and server components here.",
  },
  {
    slug: "app-router-guide",
    title: "App Router Guide",
    excerpt: "Understand how App Router works in Next.js.",
    content:
      "This post explains folders, nested routes, layouts, loading UI, and dynamic routes.",
  },
  {
    slug: "ssg-with-nextjs",
    title: "SSG with Next.js",
    excerpt: "Static Site Generation with App Router.",
    content:
      "This article introduces static generation and generateStaticParams in Next.js.",
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}