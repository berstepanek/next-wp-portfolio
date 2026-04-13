import { getAllMembers } from "@/services/members";
import MemberCard from "./components/card";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `La compagnie Sang mêlé présente ses membres`,
    description: `La compagnie Sang mêlé s'entoure de talent divers : comédiens, musiciens, metteurs en scène, danseurs`,
  };
}

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <>
      <section className="relative flex justify-center items-center h-screen">
        <h1 className="font-title text-center text-5xl md:text-9xl mb-12 text-red-500 -skew-y-12">
          <span>- Membres -</span>
          <span className="block text-4xl text-white">
            Acteurs / Metteurs en scene / Auteurs
          </span>
        </h1>
        <div className="gradient-bottom"></div>
      </section>

      <section className="py-24 relative -mt-44">
        <div className="flex justify-center">
          <div className="max-w-screen-xl w-full px-4 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
