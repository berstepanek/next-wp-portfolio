/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderSwiper from "@/components/ui/slider-swiper";
import { getHomePage } from "@/services/home";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

export default async function Home() {
  const post = await getHomePage();

  return (
    <>
      {post.homeAcf.homeHighlight && (
        <section className="container mx-auto py-15">
          <div className="mb-10 text-center">
            Last project - {post.homeAcf.homeHighlight.title}
          </div>
          <h1 className="font-title text-center text-5xl md:text-9xl mb-12 text-slate-700 mb-10">
            <span>- {post.homeAcf.homeHighlight.title} -</span>
          </h1>
          <div className="mb-10 text-center">
            <Link href={`/projects/${post.homeAcf.homeHighlight.slug}`}>
              Voir
            </Link>
          </div>
          <div className="bg-slate-700 p-15 rounded flex flex-col gap-y-10">
            <ViewTransition
              name={`project-image-${post.homeAcf.homeHighlight.id}`}
            >
              {post.homeAcf.homeHighlight.projectAcf.projectImage.sourceUrl && (
                <Link href={`/projects/${post.homeAcf.homeHighlight.slug}`}>
                  <Image
                    src={
                      post.homeAcf.homeHighlight.projectAcf.projectImage
                        .sourceUrl
                    }
                    alt={post.homeAcf.homeHighlight.id}
                    width={300}
                    height={400}
                    loading="lazy"
                    placeholder="empty"
                    className={"bg-slate-700 w-full h-auto rounded"}
                  />
                </Link>
              )}
            </ViewTransition>
            <div className="text-white">
              <div className="text-2xl">le projet</div>
              <div className="font-title text-5xl">En image</div>
            </div>
            <div className="">
              <SliderSwiper
                items={post.homeAcf.homeHighlight.projectAcf.projectGallery}
              ></SliderSwiper>
            </div>
          </div>
        </section>
      )}

      {post.homeAcf.homeProjects && (
        <section className="container mx-auto py-15">
          <div className="text-slate-700 mb-10">
            <div className="text-2xl">Les autres</div>
            <div className="font-title text-6xl">Projets</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {post.homeAcf.homeProjects.map((post: any) => (
              <div key={post.id}>
                <Link
                  href={`/projects/${post.slug}`}
                  className="flex flex-col gap-y-2"
                >
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
                  <div className="flex items-center gap-x-2">
                    {post.title}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto">
        {post.content && (
          <div
            className="entry-content wp-block-post-content is-layout-constrained wp-block-post-content-is-layout-constrained"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        )}
      </section>
    </>
  );
}
