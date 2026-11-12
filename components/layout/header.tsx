import { VARIABLES_WEB_SITE } from "@/lib/variables";

import Navigation from "./navigation";
import Menu from "./menu";
import HeaderClient from "./header-client";
import Link from "next/link";

export default function Header() {
  const variables = VARIABLES_WEB_SITE;
  return (
    <HeaderClient>
      <Link className="font-title" href={"/"} rel="home">
        {variables.name}
      </Link>

      <Navigation></Navigation>
      <Menu></Menu>
    </HeaderClient>
  );
}
