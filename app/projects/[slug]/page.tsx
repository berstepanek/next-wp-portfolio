/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/services/project";
import Image from "next/image";
import { VARIABLES_WEB_SITE } from "@/lib/variables";
import { ViewTransition } from "react";

type Creations = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Creations): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);
  const variables = VARIABLES_WEB_SITE;
  return {
    title: `${variables.name} présente : ${post.title}`,
    description: `${variables.name} présente ${post.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllProjects();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function CreationPage({ params }: Creations) {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="p-5">
        <div className="relative rounded h-[70vh] sm:h-[100vh] overflow-hidden bg-black">
          {post.projectAcf.projectImage &&
            post.projectAcf.projectImage.sourceUrl && (
              <Image
                src={post.projectAcf.projectImage.sourceUrl}
                alt={post.id}
                width={300}
                height={400}
                loading="lazy"
                placeholder="empty"
                className={"bg-slate-700 w-full h-full object-cover opacity-70"}
              />
            )}
          <div className="absolute bottom-7 w-full bottom-0 left-0">
            <div className="container mx-auto px-7">
              <div className="w-full text-white">
                <h1 className="font-title text-5xl sm:text-9xl mb-7">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-15 px-5">
          <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-3/4 ">
            <div className="w-full sm:w-3/4 text-left sm:text-right">
              <h2 className="text-5xl font-title mb-3">
                {post.projectAcf.projectTitle}
              </h2>
            </div>
            <div className="w-full sm:w-1/4">
              <p className="text-lg">{post.projectAcf.projectDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="flex justify-center">
          <div className="w-full max-w-screen-md text-center px-5">
            <div className="flex flex-col gap-y-4">
              {post.projectAcf.projectImage &&
                post.projectAcf.projectImage.sourceUrl && (
                  <Image
                    src={post.projectAcf.projectImage.sourceUrl}
                    alt={post.id}
                    width={300}
                    height={400}
                    loading="lazy"
                    placeholder="empty"
                    className={"bg-slate-700 w-full h-auto rounded"}
                  />
                )}

              {post.projectAcf.projectGallery.map(
                (image: any, index: number) => (
                  <div key={index}>
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText ? image.altText : post.title}
                      width={400}
                      height={300}
                      loading="lazy"
                      placeholder="empty"
                      className="w-full rounded"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
