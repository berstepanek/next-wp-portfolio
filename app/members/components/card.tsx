import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import MemberSkills from "./skills";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MemberCardProps {
  member: any;
  role?: string;
}
export default function MemberCard({ member, role }: MemberCardProps) {
  return (
    <Link
      href={`/members/${member.slug}`}
      key={member.id}
      className="flex flex-col"
    >
      <div className="relative w-full">
        {role && (
          <span className="absolute top-[-10px] left-0 block text-white bg-red-500 p-3">
            <span className="text-xs">Role :</span>
            <span className="block font-title">{role}</span>
          </span>
        )}
        {member.member_acf.memberPhoto && (
          <ViewTransition name={`member-photo-${member.id}`}>
            {member.member_acf.memberPhoto.sourceUrl && (
              <Image
                src={member.member_acf.memberPhoto.sourceUrl}
                alt={member.id}
                width={300}
                height={400}
                loading="lazy"
                placeholder="empty"
                className={"bg-slate-700 w-full h-auto"}
              />
            )}
          </ViewTransition>
        )}
      </div>
      <div className="relative bg-white w-7/12 -mt-8 p-4 pb-10 text-slate-900 h-full">
        <ViewTransition name={`member-title-${member.id}`}>
          <h2
            className="font-title"
            dangerouslySetInnerHTML={{ __html: member.title }}
          ></h2>
        </ViewTransition>

        <MemberSkills
          civility={member.member_acf.memberCivility}
          skillsMan={member.member_acf.memberCompetencesMan}
          skillsWomen={member.member_acf.memberCompetencesWomen}
        />
        <span
          className="absolute bottom-[-10px] right-[10px] block font-title text-white bg-yellow-500 p-3"
          title="Bérenger Stepanek"
        >
          Plus de détails
        </span>
      </div>
    </Link>
  );
}
