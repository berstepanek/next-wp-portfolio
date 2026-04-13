/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCreationsPageAcf } from "@/services/creations";
import CreationCard from "./components/card";
import { Metadata } from "next";
import CreationCardHighlight from "./components/card-highlight";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `La compagnie Sang mêlé présente ses créations théâtrales et cinématographiques`,
    description: `La compagnie Sang mêlé crée et propose des spectacles esthétiques et puissants.`,
  };
}

export default async function CreationsPage() {
  const creations = await getCreationsPageAcf();
  //const creations = await getAllCreations();

  return (
    <>
      <section className="relative flex justify-center items-center h-[80vh]">
        <h1 className="font-title text-center text-5xl md:text-9xl mb-12 text-red-500 -skew-y-12">
          <span>- Créations -</span>
          <span className="block text-4xl text-white">
            Théâtrales / cinématographiques
          </span>
        </h1>
        <div className="gradient-bottom"></div>
      </section>
      {creations.creations_page_acf.creationsPageHighlightingEvent.map(
        (creation: any) => (
          <CreationCardHighlight
            key={creation.id}
            creation={creation}
            title="Prochainement"
          />
        ),
      )}

      <section className="py-24 relative">
        <h2 className="font-title text-center text-5xl md:text-6xl mb-12 text-red-500">
          Les autres créations
        </h2>
        <div className="flex justify-center">
          <div className="max-w-screen-xl w-full px-4 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {creations.creations_page_acf.creationsPageList.map(
                (creation: any) => (
                  <CreationCard key={creation.id} creation={creation} />
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
