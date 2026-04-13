import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import CreationCardDate from "./card-date";
import CreationButtonBooking from "./button-booking";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreationCardProps {
  creation: any;
}
export default function CreationCard({ creation }: CreationCardProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          <Link href={`/creations/${creation.slug}`} key={creation.id}>
            {creation.creation_acf.creationAffiche && (
              <ViewTransition name={`creation-affiche-${creation.id}`}>
                {creation.creation_acf.creationAffiche.sourceUrl && (
                  <Image
                    src={creation.creation_acf.creationAffiche.sourceUrl}
                    alt={creation.id}
                    width={724}
                    height={1024}
                    loading="lazy"
                    placeholder="empty"
                    className={"bg-slate-700 w-full h-auto"}
                  />
                )}
              </ViewTransition>
            )}
          </Link>
        </div>
        <div className="relative bg-white w-full sm:w-7/12 p-4 pb-10 text-slate-900 h-full">
          <ViewTransition name={`creation-title-${creation.id}`}>
            <h2 className="font-title text-xl">{creation.title}</h2>
          </ViewTransition>

          <div className="mb-2">
            <CreationCardDate
              dates={creation.creation_acf.creationDates}
              cssClassInProgress={"font-title text-yellow-400"}
              cssClassFinished={"font-title text-yellow-400"}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: creation.creation_acf.creationShortdescription || "",
            }}
          ></div>

          <div className="absolute bottom-[-10px] left-[10px] flex items-center gap-x-3 justify-end ">
            <Link
              href={`/creations/${creation.slug}`}
              className=" block font-title text-white bg-yellow-500 p-3"
            >
              Plus de détails
            </Link>
            <CreationButtonBooking
              dates={creation.creation_acf.creationDates}
              urlBooking={creation.creation_acf.creationBookingLink}
              cssClass="block font-title text-white bg-red-500 p-3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
