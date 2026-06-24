/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProjects } from "@/services/project";
import { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <section className="p-5">
        <div className="relative rounded h-[100vh] overflow-hidden bg-black">
          <div className="absolute z-1 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="container mx-auto px-7">
              <hr className="border-white mb-5 opacity-75" />
              <div className="flex justify-center gap-5 w-full text-white">
                <div className="w-2/4">
                  <div className="text-2xl">Les</div>
                  <h2 className="text-5xl font-title mb-3">Projets</h2>
                </div>
                <div className="w-2/4">
                  <p className="text-lg"></p>
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

      <section className="py-24 relative">
        <div className="flex justify-center">
          <div className="max-w-screen-xl w-full px-4 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/projects/${post.slug}`}
                  className="flex flex-col gap-y-2"
                >
                  {post.projectAcf.projectImage &&
                    post.projectAcf.projectImage.sourceUrl && (
                      <>
                        <Image
                          src={post.projectAcf.projectImage.sourceUrl}
                          alt={post.id}
                          width={300}
                          height={400}
                          loading="lazy"
                          placeholder="empty"
                          className={"bg-slate-700 w-full h-auto rounded"}
                        />
                        <div className="flex items-center gap-x-2">
                          {post.title}
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                      </>
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
