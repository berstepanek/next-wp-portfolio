import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import CreationCardDate from "./card-date";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreationCardSmallProps {
  creation: any;
}
export default function CreationCardSmall({
  creation,
}: CreationCardSmallProps) {
  return (
    <>
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

      <div className="time-line-detail font-title">
        <CreationCardDate
          dates={creation.creation_acf.creationDates}
          cssClassInProgress={"inline-block text-white p-2.5 bg-red-500"}
          cssClassFinished={"font-title text-yellow-400"}
        />
      </div>
    </>
  );
}
