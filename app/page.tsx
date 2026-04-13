/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHomePage } from "@/services/home";
import MemberCard from "./members/components/card";
import CreationCardTimeline from "./creations/components/card-timeline";
import CreationCardHighlight from "./creations/components/card-highlight";
import SliderExpoEffect from "@/components/ui/slider-expo-effect";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const posts = await getHomePage();

  return (
    <>
      {posts.home_acf.homeHighlightingEvent && (
        <div className="mb-10">
          <SliderExpoEffect
            items={posts.home_acf.homeCarrousel}
          ></SliderExpoEffect>
        </div>
      )}

      <section className="py-12 px-4">
        <h2 className="font-title text-center text-5xl md:text-6xl mb-12 text-red-500">
          Mise en lumiere
          <span className="block text-2xl text-white">
            du dernier spectacle
          </span>
        </h2>
        {posts.home_acf.homeHighlightingEvent.map((creation: any) => (
          <CreationCardHighlight key={creation.id} creation={creation} />
        ))}
      </section>

      <section className="py-12 px-4">
        <h2 className="font-title text-center text-5xl md:text-6xl mb-12 text-red-500">
          Date des prochains spectacles
        </h2>

        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-col gap-y-10">
            {posts.home_acf.homeCreations.map(
              (creation: any, index: number) => (
                <CreationCardTimeline
                  key={creation.id}
                  creation={creation}
                  index={index}
                />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[70vh] flex items-center justify-center my-12">
        <Link
          href={`/creations/`}
          className="font-title text-center text-5xl md:text-9xl mb-12 text-red-500 -skew-y-12 z-10"
        >
          - Créations -
          <span className="block text-4xl text-white">
            Théâtrales / cinématographiques
          </span>
        </Link>

        <div className="absolute top left w-full h-full">
          <Image
            src={posts.home_acf.homeCreationsIllustration.sourceUrl}
            alt="créations"
            width={2000}
            height={620}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </section>

      <section className="py-12">
        <h2 className="font-title text-center text-5xl md:text-8xl mb-12 text-red-500">
          Les membres
        </h2>
        <div className="flex justify-center">
          <div className="max-w-screen-xl w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {posts.home_acf.homeMembers.map((member: any) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
