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
      <section className="bg-gray-200">
        <div className="container mx-auto py-15">
          <div className="relative rounded h-[90vh] overflow-hidden">
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
                    className={"bg-slate-700 w-full h-auto rounded"}
                  />
                )}
              </ViewTransition>
            )}
            <div className="absolute w-[95%] h-[95%] rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-end p-5 bg-gradient-to-t from-black from-0% to-transparent to-50% opacity-50">
              <div className="w-full text-white">
                <h1 className="font-title text-9xl mb-7">{post.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-15">
          <div className="flex justify-center gap-5 w-3/4 ">
            <div className="w-3/4 text-right">
              <h2 className="text-5xl font-title mb-3">
                {post.projectAcf.projectTitle}
              </h2>
            </div>
            <div className="w-1/4">
              <p className="text-lg">{post.projectAcf.projectDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="flex justify-center">
          <div className="w-full max-w-screen-md text-center">
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
                    className={"bg-slate-700 w-full h-auto rounded"}
                  />
                )}
              </ViewTransition>
            )}
          </div>
        </div>
      </section>
      <section className="py-24 relative -mt-44">
        <div className="flex justify-center">
          <div className="w-full max-w-screen-md text-center">
            <div className="flex flex-col  gap-y-4">
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
