import { Link } from "next-view-transitions";

import { VARIABLES_WEB_SITE } from "@/lib/variables";

import Navigation from "./navigation";
import Menu from "./menu";

export default function Header() {
  const variables = VARIABLES_WEB_SITE;
  return (
    <>
      <header className="fixed top-4 left-0 flex gap-x-8 z-30 w-full">
        <div className="container mx-auto">
          <div className="flex items-center gap-x-2">
            <Link className="font-title text-slate-700" href="/" rel="home">
              {variables.name}
            </Link>
            <Navigation></Navigation>
            <Menu></Menu>
          </div>
        </div>
      </header>
    </>
  );
}
