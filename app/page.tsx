/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHomePage } from "@/services/home";

export default async function Home() {
  const post = await getHomePage();

  return (
    <div className="container mx-auto">
      {post.id && <section className="my-10">{post.id}</section>}

      {post.title && <section className="my-10">{post.title}</section>}

      {post.content && (
        <section
          className="my-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></section>
      )}
    </div>
  );
}
