/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProfileProps {
  acf: any;
}
export default function MemberProfile({ acf }: ProfileProps) {
  return (
    <div>
      {acf.memberOrigine && (
        <div>
          <span className="font-title text-yellow-500">Origine : </span>{" "}
          {acf.memberOrigine}
        </div>
      )}
      {acf.memberAge && (
        <div>
          <span className="font-title text-yellow-500">Age : </span>{" "}
          {acf.memberAge}
        </div>
      )}
      {acf.memberSize && (
        <div>
          <span className="font-title text-yellow-500">Taille : </span>{" "}
          {acf.memberSize}
        </div>
      )}
      {acf.memberOrigine && (
        <div>
          <span className="font-title text-yellow-500">Origine : </span>{" "}
          {acf.memberOrigine}
        </div>
      )}
      {acf.membermemberWeightOrigine && (
        <div>
          <span className="font-title text-yellow-500">Poids : </span>{" "}
          {acf.memberWeight}
        </div>
      )}
      {acf.memberEyes && (
        <div>
          <span className="font-title text-yellow-500">Yeux : </span>{" "}
          {acf.memberEyes}
        </div>
      )}
      {acf.memberHair && (
        <div>
          <span className="font-title text-yellow-500">Cheveux : </span>{" "}
          {acf.memberHair}
        </div>
      )}
      {acf.memberShoesize && (
        <div>
          <span className="font-title text-yellow-500">Pointure : </span>{" "}
          {acf.memberShoesize}
        </div>
      )}
      {acf.memberPhone && (
        <div>
          <span className="font-title text-yellow-500">Téléphone : </span>{" "}
          {acf.memberPhone}
        </div>
      )}
      {acf.memberEmail && (
        <div>
          <span className="font-title text-yellow-500">Email : </span>{" "}
          {acf.memberEmail}
        </div>
      )}
    </div>
  );
}
