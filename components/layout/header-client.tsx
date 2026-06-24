"use client";

import { useEffect, useState } from "react";

export default function HeaderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-8 left-0 w-full z-10">
      <div className="container mx-auto px-7">
        <div
          className={[
            "inline-block p-2 transition-colors duration-300 text-white rounded",
            isScrolled ? "bg-black shadow-sm" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-x-2">{children}</div>
        </div>
      </div>
    </header>
  );
}
