/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/services/project";
import Image from "next/image";

type Creations = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Creations): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  return {
    title: `La compagnie Sang mêlé présente : ${post.title}`,
    description: `La compagnie Sang mêlé met en scène ${post.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllProjects();
  return posts.nodes.map((post) => ({ slug: post.slug }));
}

export default async function CreationPage({ params }: Creations) {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-md text-center">
          <div className="flex flex-col  gap-y-4">
            {post.projectAcf.projectGallery.map((image: any, index: number) => (
              <div key={index}>
                <Image
                  src={image.sourceUrl}
                  alt={image.altText ? image.altText : post.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  placeholder="empty"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
