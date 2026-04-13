/* eslint-disable @typescript-eslint/no-explicit-any */
interface SkillsProps {
  civility: string;
  skillsMan: any;
  skillsWomen: any;
}
export default function MemberSkills({
  civility,
  skillsMan,
  skillsWomen,
}: SkillsProps) {
  return (
    <>
      {civility === "Monsieur"
        ? skillsMan && (
            <ul>
              {skillsMan.map((value: string, index: number) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          )
        : skillsWomen && (
            <ul>
              {skillsWomen.map((value: string, index: number) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          )}
    </>
  );
}
