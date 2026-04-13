import { getAllPosts, getPostBySlug } from "@/services/posts";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />

      <div
        style={{ marginTop: "2rem" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
