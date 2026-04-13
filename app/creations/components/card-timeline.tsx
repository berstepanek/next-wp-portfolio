import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import CreationCardDate from "./card-date";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreationCardTimelineProps {
  creation: any;
  index: number;
}
export default function CreationCardSmall({
  creation,
  index,
}: CreationCardTimelineProps) {
  function isEven(n: number): boolean {
    return n % 2 === 0;
  }

  return (
    <>
      <div>
        <div className="font-title text-center text-3xl md:text-4xl mb-12 text-white">
          <CreationCardDate
            dates={creation.creation_acf.creationDates}
            cssClassInProgress={"inline-block text-white"}
            cssClassFinished={"font-title text-yellow-400"}
          />
        </div>

        <div className="relative flex flex-col sm:flex-row justify-center gap-10">
          <div
            className={`w-full sm:w-5/12 py-3 z-10 ${isEven(index) ? "order-1" : "order-3"}`}
          >
            {creation.creation_acf.creationAffiche && (
              <Link
                href={`/creations/${creation.slug}`}
                key={creation.id}
                className={`flex ${isEven(index) ? "justify-end" : "justify-start"}`}
              >
                <ViewTransition name={`creation-affiche-${creation.id}`}>
                  {creation.creation_acf.creationAffiche.sourceUrl && (
                    <Image
                      src={creation.creation_acf.creationAffiche.sourceUrl}
                      alt={creation.id}
                      width={724}
                      height={1024}
                      loading="lazy"
                      placeholder="empty"
                      className={"bg-slate-700 w-full sm:w-[300px] h-auto"}
                    />
                  )}
                </ViewTransition>
              </Link>
            )}
          </div>
          <div className="absolute  top-0 left-[50%] sm:relative sm:left-[0] h-full sm:h-auto order-2 opacity-50">
            <div className="border-1 border-white h-full"></div>
          </div>
          <div
            className={`w-full sm:w-5/12 py-3 hidden sm:flex items-center ${isEven(index) ? "order-3" : "order-1"}`}
          >
            <div
              className={`flex flex-col gap-y-2 ${isEven(index) ? "text-left" : "text-right"}`}
            >
              <div
                className="text-2xl"
                dangerouslySetInnerHTML={{
                  __html: creation.creation_acf.creationShortdescription || "",
                }}
              ></div>
              <Link
                href={`/creations/${creation.slug}`}
                key={creation.id}
                className="text-yellow-500"
              >
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
