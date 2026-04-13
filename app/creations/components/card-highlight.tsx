import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import CreationCardDate from "./card-date";
import CreationButtonBooking from "./button-booking";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreationCardHighlightProps {
  creation: any;
  title?: string;
}
export default function CreationCardHighlight({
  creation,
  title,
}: CreationCardHighlightProps) {
  return (
    <>
      <section className="container justify-end mx-auto hidden sm:flex">
        <div className="relative w-full sm:w-9/12 sm:rounded-xl overflow-hidden max-h-[540px] lg:h-[80vh]">
          {creation.creation_acf.creationBandeannonce?.mediaItemUrl ? (
            <video
              className="ml-auto"
              preload="auto"
              playsInline
              muted
              loop
              autoPlay
              controls
            >
              <source
                src={creation.creation_acf.creationBandeannonce.mediaItemUrl}
                type="video/mp4"
              />
            </video>
          ) : (
            <Image
              src={creation.creation_acf.creationPhoto.sourceUrl}
              alt={creation.id}
              width={400}
              height={300}
              loading="lazy"
              placeholder="empty"
              className={"bg-slate-950 w-full h-auto"}
            />
          )}

          <div className="gradient-linear-bottom z-10"></div>
        </div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full md:w-4/12 mt-[-0px] sm:mt-[-300px] p-5 sm:p-0">
              {title && (
                <div className="md:absolute md:top-[-150px] md:left-[200px] font-title text-red-500 text-3xl md:text-6xl text-center mb-10">
                  {title}
                </div>
              )}
              <ViewTransition name={`creation-affiche-${creation.id}`}>
                <Image
                  src={creation.creation_acf.creationAffiche.sourceUrl}
                  alt={creation.id}
                  width={724}
                  height={1024}
                  loading="lazy"
                  placeholder="empty"
                  className={"bg-slate-700 w-full h-auto"}
                />
              </ViewTransition>
            </div>
            <div className="flex flex-col gap-y-4 w-full md:w-8/12 p-8">
              <ViewTransition name={`creation-title-${creation.id}`}>
                <h1 className="font-title text-6xl md:text-9xl">
                  {creation.title}
                </h1>
              </ViewTransition>

              <CreationCardDate
                dates={creation.creation_acf.creationDates}
                cssClassInProgress={"font-title text-yellow-400"}
                cssClassFinished={"font-title text-yellow-400"}
              />

              <div
                className="text-4xl"
                dangerouslySetInnerHTML={{
                  __html: creation.creation_acf.creationShortdescription || "",
                }}
              ></div>

              <div className="flex gap-x-4">
                <Link
                  href={`/creations/${creation.slug}`}
                  className="inline-block font-title text-yellow-500 border border-yellow-500 border-solid p-5"
                >
                  Découvrir
                </Link>
                <CreationButtonBooking
                  dates={creation.creation_acf.creationDates}
                  urlBooking={creation.creation_acf.creationBookingLink}
                  cssClass="inline-block font-title text-white bg-red-500 p-5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
