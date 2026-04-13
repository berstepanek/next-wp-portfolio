// components/FadeImage.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function FadeImage({
  src,
  alt,
  width,
  height,
  cssClass,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  cssClass: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="empty"
      loading="lazy"
      className={`transition-opacity duration-700 ease-in-out ${loaded ? "opacity-100" : "opacity-0"} ${cssClass}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
