/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllMembers, getMemberBySlug } from "@/services/members";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import MemberSkills from "../components/skills";
import MemberProfile from "../components/profile";
import Breadcrumb from "@/components/layout/breadcrumb";
import CreationCard from "@/app/creations/components/card";
import { Metadata } from "next";

type Members = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Members): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  return {
    title: `La compagnie Sang mêlé présente : ${member.title}`,
    description: `La compagnie Sang mêlé collabore avec ${member.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllMembers();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function MemberPage({ params }: Members) {
  const { slug } = await params;
  const post = await getMemberBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumb url={"/members"} label={"membres"}></Breadcrumb>

      <section className="pt-[150px] pb-12 relative">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative w-full md:w-5/12">
              <ViewTransition name={`member-photo-${post.id}`}>
                <Image
                  src={post.member_acf.memberPhoto.sourceUrl}
                  alt={post.id}
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </ViewTransition>
            </div>
            <div className="w-full md:w-7/12 p-8">
              <ViewTransition name={`member-title-${post.id}`}>
                <h1
                  className="relative font-title  text-6xl md:text-9xl ml-0 md:-ml-44 z-10"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                ></h1>
              </ViewTransition>
              <div className="font-title  mt-4">
                <MemberSkills
                  civility={post.member_acf.memberCivility}
                  skillsMan={post.member_acf.memberCompetencesMan}
                  skillsWomen={post.member_acf.memberCompetencesWomen}
                />
              </div>
              <MemberProfile acf={post.member_acf} />
            </div>
          </div>
        </div>
      </section>

      {post.member_acf.memberSpectacles && (
        <section className="py-12">
          <h2 className="font-title text-center text-5xl md:text-8xl mb-12 text-red-500">
            Actualités
          </h2>
          <div className="flex justify-center">
            <div className="max-w-screen-xl w-full p-4 sm:p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {post.member_acf.memberSpectacles.map((creation: any) => (
                  <CreationCard key={creation.id} creation={creation} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberFormation && (
        <section className="py-12 px-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Formations
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
              {post.member_acf.memberFormation.map(
                (formation: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-2 bg-slate-800 border border-black border-solid p-3 rounded"
                  >
                    <div className="w-full sm:w-3/12 font-title">
                      {formation.memberFormationDate}
                    </div>
                    <div className="w-full sm:w-3/12">
                      {formation.memberFormationIntitule}
                    </div>
                    <div className="w-full sm:w-6/12 sm:text-right ">
                      {formation.memberFormationInfos}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberTheatre && (
        <section className="py-12 px-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Théâtre
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
              <div className="flex flex-col gap-2">
                {post.member_acf.memberTheatre.map(
                  (theatre: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 bg-slate-800 border border-black border-solid p-3 rounded"
                    >
                      <div className="w-full sm:w-2/12 font-title">
                        {theatre.memberTheatreDate}
                      </div>
                      <div className="w-full sm:w-5/12">
                        <div className="font-title">
                          {theatre.memberTheatreIntitule}
                        </div>
                        <div>{theatre.memberTheatreInfos}</div>
                      </div>
                      <div className="w-full sm:w-5/12 sm:text-right ">
                        <span className="block">
                          Rôle : {theatre.memberTheatreRole}
                        </span>
                        <span className="block">
                          Auteur : {theatre.memberTheatreAuthor}
                        </span>
                        <span className="block">
                          Metteur en scène :{" "}
                          {theatre.memberTheatreMetteurenscene}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberCinema && (
        <section className="py-12 px-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Cinéma
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
              <div className="flex flex-col gap-2">
                {post.member_acf.memberCinema.map(
                  (cinema: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 bg-slate-800 border border-black border-solid p-3 rounded"
                    >
                      <div className="w-full sm:w-3/12 font-title">
                        {cinema.memberCinemaDate}
                      </div>
                      <div className="w-full sm:w-3/12">
                        {cinema.memberCinemaIntitule}
                      </div>
                      <div className="w-full sm:w-6/12 sm:text-right ">
                        {cinema.memberCinemaInfos}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberTelevision && (
        <section className="py-12 px-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Télévision
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
              <div className="flex flex-col gap-2">
                {post.member_acf.memberTelevision.map(
                  (television: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 bg-slate-800 border border-black border-solid p-3 rounded"
                    >
                      <div className="w-full sm:w-3/12 font-title">
                        {television.memberTelevisionDate}
                      </div>
                      <div className="w-full sm:w-3/12">
                        {television.memberTelevisionIntitule}
                      </div>
                      <div className="w-full sm:w-6/12 sm:text-right ">
                        {television.memberTelevisionInfos}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberLangues && (
        <section className="py-12 px-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Langues
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-screen-md text-center">
              <ul>
                {post.member_acf.memberLangues.map(
                  (language: any, index: number) => (
                    <li key={index}>{language}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {post.member_acf.memberGallery && (
        <section className="py-12 py-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Mise en image
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md text-center">
              <div className="flex flex-col  gap-y-4">
                {post.member_acf.memberGallery.map(
                  (image: any, index: number) => (
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
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
