/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProjects } from "@/services/project";
import { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Portfolio projets`,
    description: `Portfolio projets`,
  };
}

export default async function CreationsPage() {
  const posts = await getAllProjects();

  return (
    <>
      <section className="relative flex justify-center items-center h-[80vh]">
        <h1 className="font-title text-center text-5xl md:text-9xl mb-12">
          <span>- Projets -</span>
        </h1>
      </section>

      <section className="py-24 relative -mt-44">
        <div className="flex justify-center">
          <div className="max-w-screen-xl w-full px-4 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {posts.map((post) => (
                <Link key={post.id} href={`/projects/${post.slug}`}>
                  {post.projectAcf.projectImage && (
                    <ViewTransition name={`project-image-${post.id}`}>
                      {post.projectAcf.projectImage.sourceUrl && (
                        <Image
                          src={post.projectAcf.projectImage.sourceUrl}
                          alt={post.id}
                          width={300}
                          height={400}
                          loading="lazy"
                          placeholder="empty"
                          className={"bg-slate-700 w-full h-auto"}
                        />
                      )}
                    </ViewTransition>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
