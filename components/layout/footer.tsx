"use client";

import { VARIABLES_WEB_SITE } from "@/lib/variables";
export default function Footer() {
  const variables = VARIABLES_WEB_SITE;

  return (
    <footer className="p-2 text-center">
      © {new Date().getFullYear()} – {variables.copyRight}
    </footer>
  );
}
