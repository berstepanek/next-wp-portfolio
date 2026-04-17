/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Portfolio projets`,
    description: `Portfolio projets`,
  };
}

export default async function CreationsPage() {
  //const creations = await getCreationsPageAcf();
  //const creations = await getAllCreations();

  return (
    <>
      <section className="relative flex justify-center items-center h-[80vh]">
        <h1 className="font-title text-center text-5xl md:text-9xl mb-12 text-red-500 -skew-y-12">
          <span>- Projets -</span>
        </h1>
        <div className="gradient-bottom"></div>
      </section>
    </>
  );
}
