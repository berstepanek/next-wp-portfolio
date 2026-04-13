import { getAllPosts } from "@/services/posts";
import Link from "next/link";

export const revalidate = 60; // ISR

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section>
      <h2>Blog</h2>
      {posts.length === 0 && <p>Aucun article pour le moment.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1.5rem" }}>
            <Link href={`/blog/${post.slug}`}>
              <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
            </Link>

            {post.excerpt && (
              <div
                style={{ color: "#555" }}
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
