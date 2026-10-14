import { Link } from "next-view-transitions";

import { VARIABLES_WEB_SITE } from "@/lib/variables";

import Navigation from "./navigation";
import Menu from "./menu";
import HeaderClient from "./header-client";

export default function Header() {
  const variables = VARIABLES_WEB_SITE;
  return (
    <HeaderClient>
      <span className="font-title">{variables.name}</span>
      <Navigation></Navigation>
      <Menu></Menu>
    </HeaderClient>
  );
}
