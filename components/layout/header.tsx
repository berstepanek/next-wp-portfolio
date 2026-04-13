"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next-view-transitions";

import { useState } from "react";
import { faBars, faBullhorn, faXmark } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-4 left-0 flex gap-x-8 z-30 w-full">
        <div className="container mx-auto">
          <div className="flex items-center gap-x-2">
            <Link
              className="flex items-center gap-x-2 font-title text-white bg-red-500 p-3"
              href="/"
              rel="home"
            >
              <FontAwesomeIcon icon={faBullhorn} />
              Sang Mélé Compagnie
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
                <Link href="/members" className="font-title  opacity-50">
                  Membres
                </Link>
              </li>
              <li>
                <Link href="/creations" className="font-title opacity-50">
                  Creations
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
                  <Link href="/members" onClick={toggleMenu}>
                    Membres
                  </Link>
                </li>
                <li className={"page_item page-item-37 font-title"}>
                  <Link href="/creations" onClick={toggleMenu}>
                    Creations
                  </Link>
                </li>
                <li className={"page_item page-item-37 font-title"}>
                  <Link href="/creations" onClick={toggleMenu}>
                    Theatres
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
