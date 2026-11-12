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

export default async function ProjectsPage() {
  const posts = await getAllProjects();

  return (
    <>
      <section className="h-screen bg-black text-white p-5">
        <div className="container h-full py-15">
          <div className="row h-full items-center">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <hr className="border-white mb-5 opacity-75" />
                </div>
                <div className="col-6">
                  <div className="text-2xl">Les</div>
                  <h2 className="text-5xl font-title mb-3">Projets</h2>
                </div>
                <div className="col-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container">
          <div className="row gap-y-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/projects/${post.slug}`}
                className="col-12 md:col-6 flex flex-col gap-y-2"
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
      </section>
    </>
  );
}
