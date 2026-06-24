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
      <section className="p-5">
        <div className="relative rounded h-[100vh] overflow-hidden bg-black">
          <div className="absolute p-10 z-1 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="">
              <hr className="bg-white mb-5 opacity-75" />
              <div className="flex justify-center gap-5 w-full text-white">
                <div className="w-2/4">
                  <h2 className="text-5xl font-title mb-3">SEFRIOUI Mehdi</h2>
                </div>
                <div className="w-2/4">
                  <p className="text-lg">Photographe</p>
                </div>
              </div>
            </div>
          </div>
          <video
            className="object-cover w-full h-full opacity-75"
            autoPlay
            loop
            muted
            preload="none"
            data-hero-visual="video"
          >
            <source src="grass-decoration.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      {post.homeAcf.homeHighlight && (
        <section className="container mx-auto py-15">
          <div className="mb-10 text-center">
            Last project - {post.homeAcf.homeHighlight.title}
          </div>
          <h1 className="font-title text-center text-5xl md:text-9xl mb-12 text-primary mb-10">
            <span>- {post.homeAcf.homeHighlight.title} -</span>
          </h1>
          <div className="mb-10 text-center">
            <Link href={`/projects/${post.homeAcf.homeHighlight.slug}`}>
              Voir
            </Link>
          </div>
          <div className="bg-primary p-15 rounded flex flex-col gap-y-10">
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
