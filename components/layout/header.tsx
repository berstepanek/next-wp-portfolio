"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next-view-transitions";

import { useState } from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { VARIABLES_WEB_SITE } from "@/lib/variables";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const variables = VARIABLES_WEB_SITE;

  return (
    <>
      <header className="fixed top-4 left-0 flex gap-x-8 z-30 w-full">
        <div className="container mx-auto">
          <div className="flex items-center gap-x-2">
            <Link className="font-title text-slate-700" href="/" rel="home">
              {variables.name}
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              className="cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className="hidden sm:flex items-center gap-x-4 ms-4">
              <li>
                <Link href="/projects" className="font-title  opacity-50">
                  Projets
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <nav className={["nav", isOpen ? "isOpen" : ""].join(" ")}>
        <div className={"nav-shadow"} onClick={toggleMenu}></div>

        <div className={"nav-menu"}>
          <div className={"nav-menu-items"}>
            <button
              type="button"
              onClick={toggleMenu}
              className="cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className={"menu"}>
              <ul>
                <li
                  className={
                    "page_item page-item-5 current_page_item font-title"
                  }
                >
                  <Link href="./" onClick={toggleMenu}>
                    Accueil
                  </Link>
                </li>
                <li className={"page_item page-item-21 font-title"}>
                  <Link href="/projects" onClick={toggleMenu}>
                    Projets
                  </Link>
                </li>
              </ul>
            </div>
            <div className={"font-title"}>
              Contact : <br />
              STEPANEK Bérenger
              <br />
              0607170956
              <br />
              sang-mele-compagnie@gmail.com
            </div>
          </div>
          <svg
            version="1.1"
            className="nav-menu-slice"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 3345 60"
            enableBackground="new 0 0 3345 60"
            preserveAspectRatio="none"
          >
            <g>
              <g>
                <polygon
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#ffffff"
                  points="-1,-1 -1,60 3346,-1"
                ></polygon>
              </g>
            </g>
          </svg>
        </div>
      </nav>
    </>
  );
}
