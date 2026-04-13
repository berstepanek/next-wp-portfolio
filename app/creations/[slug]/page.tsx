/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCreations, getCreationBySlug } from "@/services/creations";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import Breadcrumb from "@/components/layout/breadcrumb";
import CreationCardDate from "../components/card-date";
import CreationButtonBooking from "../components/button-booking";
import MemberCard from "@/app/members/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next";

type Creations = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Creations): Promise<Metadata> {
  const { slug } = await params;
  const creation = await getCreationBySlug(slug);

  return {
    title: `La compagnie Sang mêlé présente : ${creation.title}`,
    description: `La compagnie Sang mêlé met en scène ${creation.title} : ${creation.creation_acf.creationShortdescription}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllCreations();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function CreationPage({ params }: Creations) {
  const { slug } = await params;
  const post = await getCreationBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumb url={"/creations"} label={"créations"}></Breadcrumb>
      <section className="container flex justify-end mx-auto py-20 hidden sm:flex">
        <div className="relative w-full sm:w-9/12 sm:rounded-xl overflow-hidden">
          <div className="h-[80vh] overflow-hidden">
            <ViewTransition name={`creation-photo-${post.id}`}>
              <Image
                src={post.creation_acf.creationPhoto?.sourceUrl}
                alt={post.id}
                width={400}
                height={300}
                loading="lazy"
                placeholder="empty"
                className={
                  "bg-slate-950 w-full h-full object-cover absolute top-1/2 left-1/2 -translate-1/2"
                }
              />
            </ViewTransition>
          </div>

          <div className="gradient-linear-bottom z-10"></div>
        </div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full md:w-4/12 sm:mt-[-40vh] p-5 sm:p-0">
              <ViewTransition name={`creation-affiche-${post.id}`}>
                <Image
                  src={post.creation_acf.creationAffiche?.sourceUrl}
                  alt={post.id}
                  width={724}
                  height={1024}
                  loading="lazy"
                  placeholder="empty"
                  className={"w-full shadow-[0_0_100px_0_rgba(0,0,0,1)]"}
                />
              </ViewTransition>
            </div>
            <div className="flex flex-col gap-y-4 w-full md:w-8/12 p-8 sm:mt-[-150px]">
              <ViewTransition name={`creation-title-${post.id}`}>
                <h1
                  className="font-title text-6xl md:text-9xl"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                ></h1>
              </ViewTransition>
              <CreationCardDate
                dates={post.creation_acf.creationDates}
                cssClassInProgress={"font-title text-yellow-400"}
                cssClassFinished={"font-title text-yellow-400"}
              />

              {post.creation_acf.creationTheatre &&
                post.creation_acf.creationTheatre.map(
                  (theatre: any, index: number) => (
                    <div className="flex flex-col" key={index}>
                      <span>{theatre.theatre_acf.theatreName}</span>
                      <span>{theatre.theatre_acf.theatreAddress}</span>
                      <span>
                        {theatre.theatre_acf.theatrePostalcode +
                          " " +
                          theatre.theatre_acf.theatreCity}
                      </span>
                    </div>
                  ),
                )}

              {post.creation_acf.creationShortdescription && (
                <div>
                  <div
                    className="text-4xl"
                    dangerouslySetInnerHTML={{
                      __html: post.creation_acf.creationShortdescription,
                    }}
                  ></div>

                  {post.creation_acf.creationDescription && (
                    <a
                      href="#CreationDescription"
                      className="inline-block text-yellow-500"
                    >
                      ... en savoir plus
                    </a>
                  )}
                </div>
              )}

              {post.creation_acf.creationDisplayauthor && (
                <div className="flex gap-x-4">
                  <span className="font-title text-yellow-500">De : </span>
                  <span>{post.creation_acf.creationAuthor}</span>
                </div>
              )}

              {post.creation_acf.creationEquipes && (
                <ul className="flex flex-col gap-y-4">
                  {post.creation_acf.creationEquipes.map(
                    (equipe: any, index: number) => (
                      <li
                        key={index}
                        className="flex flex-col gap-y-4 leading-none"
                      >
                        <span className="font-title text-yellow-500">
                          {equipe.creationEquipesFunction} :
                        </span>
                        <span>
                          {equipe.creationEquipesMember ? (
                            equipe.creationEquipesMember.map((member: any) => (
                              <Link
                                key={member.id}
                                href={`/members/${member.slug}`}
                                className="text-white"
                              >
                                {member.member_acf.memberName}
                              </Link>
                            ))
                          ) : (
                            <div> {equipe.creationEquipesName}</div>
                          )}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              )}

              {post.creation_acf.creationRoles && (
                <>
                  <div className="font-title text-yellow-500 mt-4">
                    La distribution :
                  </div>
                  <ul className="flex flex-col gap-y-4">
                    {post.creation_acf.creationRoles.map(
                      (role: any, index: number) => (
                        <li key={index} className="flex gap-x-4 leading-none">
                          <span className="font-title text-">
                            {role.creationRolesName}
                          </span>
                          <span>
                            {role.creationRolesActor &&
                              role.creationRolesActor.map((actor: any) => (
                                <Link
                                  key={actor.id}
                                  href={`/members/${actor.slug}`}
                                  className="text-white"
                                >
                                  {actor.member_acf.memberName}
                                </Link>
                              ))}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {post.creation_acf.creationBandeannonce && (
        <section className="py-12 bg-black">
          <div className="flex justify-center">
            <div className="max-w-screen-xl px-4">
              <video
                className=""
                preload="auto"
                playsInline
                poster=""
                muted
                loop
                autoPlay
                controls
              >
                <source
                  src={post.creation_acf.creationBandeannonce.mediaItemUrl}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </section>
      )}

      {post.creation_acf.creationDates && (
        <section className="py-12">
          <h2 className="font-title text-center text-5xl md:text-6xl mb-12 text-red-500">
            Dates des représentations
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-screen-md px-4">
              <div className="flex flex-col gap-2">
                {post.creation_acf.creationDates.map(
                  (date: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 bg-slate-800 border border-black border-solid p-3 rounded"
                    >
                      <div className="w-full sm:w-3/12 font-title">
                        {date.creationDatesDay} à {date.creationDatesHour}
                      </div>
                      <div className="w-full sm:w-3/12">
                        {date.creationDatesLieu}
                      </div>
                      <div className="w-full sm:w-6/12 sm:text-right ">
                        <CreationButtonBooking
                          dates={post.creation_acf.creationDates}
                          urlBooking={post.creation_acf.creationBookingLink}
                          cssclassName="block font-title text-white bg-yellow-500 p-3"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.creation_acf.creationDescription && (
        <section className="py-12" id="CreationDescription">
          <div className="flex justify-center">
            <div className="w-full max-w-screen-lg px-4">
              <div
                className="text-xl md:text-3xl"
                dangerouslySetInnerHTML={{
                  __html: post.creation_acf.creationDescription,
                }}
              ></div>
            </div>
          </div>
        </section>
      )}

      {post.creation_acf.creationEquipes && (
        <section className="py-12">
          <h2 className="font-title text-center text-5xl md:text-6xl mb-12 text-red-500">
            ÉQUIPE ARTISTIQUE
          </h2>
          <div className="flex justify-center">
            <div className="max-w-screen-md px-4 flex flex-col sm:flex-row gap-4">
              {post.creation_acf.creationEquipes.map(
                (equipe: any, index: number) =>
                  equipe.creationEquipesMember ? (
                    equipe.creationEquipesMember.map((member: any) => (
                      <Link
                        key={member.id}
                        href={`/members/${member.slug}`}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={member.member_acf.memberPhoto?.sourceUrl}
                          alt={member.id}
                          width={1200}
                          height={500}
                          loading="lazy"
                          placeholder="empty"
                          className="inline-block size-30 rounded-full ring-1 ring-black outline -outline-offset-1 outline-black/5"
                        />

                        <div>
                          <div className="font-title">
                            {equipe.creationEquipesName}
                          </div>
                          <div>{equipe.creationEquipesFunction}</div>
                          <div className="text-yellow-500">Découvrir</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-slate-700 size-30 rounded-full ring-1 ring-black outline -outline-offset-1 outline-black/5">
                        <FontAwesomeIcon
                          className="text-[50px] text-slate-900"
                          icon={faUserCircle}
                        />
                      </div>
                      <div>
                        <div className="font-title">
                          {equipe.creationEquipesName}
                        </div>
                        <div>{equipe.creationEquipesFunction}</div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </section>
      )}

      {post.creation_acf.creationRoles && (
        <section className="py-12">
          <h2 className="font-title text-center text-5xl md:text-8xl mb-12 text-red-500">
            La distribution
          </h2>
          <div className="flex justify-center">
            <div className="max-w-screen-xl w-full px-4 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {post.creation_acf.creationRoles.map(
                  (role: any) =>
                    role.creationRolesActor &&
                    role.creationRolesActor.map((actor: any) => (
                      <MemberCard
                        key={actor.id}
                        member={actor}
                        role={role.creationRolesName}
                      />
                    )),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {post.creation_acf.creationGallery && (
        <section className="py-12 py-4">
          <h2 className="font-title text-center text-5xl md:text-5xl mb-12 text-red-500">
            Mise en image
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-md text-center">
              <div className="flex flex-col gap-y-4">
                {post.creation_acf.creationGallery.map(
                  (image: any, index: number) => (
                    <div key={index}>
                      <Image
                        src={image.sourceUrl}
                        alt={image.id}
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
