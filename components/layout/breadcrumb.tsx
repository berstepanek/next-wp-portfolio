import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Breadcrumb({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  return (
    <>
      <div className="fixed w-full top-[80px] z-20">
        <div className="container mx-auto">
          <Link href={url} className="flex g-2 items-center font-title">
            <FontAwesomeIcon icon={faAngleLeft} />
            Retour {label}
          </Link>
        </div>
      </div>
    </>
  );
}
