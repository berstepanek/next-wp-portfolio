/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
//import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Autoplay } from "swiper/modules";
import CreationCardDate from "@/app/creations/components/card-date";
import { Link } from "next-view-transitions";
import { useRef } from "react";
import Image from "next/image";
import { ViewTransition } from "react";

export default function SliderExpoEffect({ items }: { items: any }) {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (
    _s: SwiperClass,
    time: number,
    progress: number,
  ) => {
    progressCircle.current?.style.setProperty(
      "--progress",
      String(1 - progress),
    );
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
    }
  };
  return (
    <>
      <Swiper
        speed={600}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Parallax, Pagination]}
        className="mySwiper bg-slate-900"
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {items.map((item: any, index: number) => (
          <SwiperSlide key={index} className="!p-0">
            <div className="relative bg-black h-full p-5 !py-30 sm:p-10 overflow-hidden">
              <div
                className="parallax-bg opacity-50"
                data-swiper-parallax="300"
              >
                <ViewTransition name={`creation-photo-${item.id}`}>
                  <Image
                    src={item.creation_acf.creationPhoto.sourceUrl}
                    alt={item.title}
                    width={"1250"}
                    height={"800"}
                    placeholder="empty"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </ViewTransition>
              </div>
              <div className="container mx-auto h-full grid h-56 grid-cols-1 content-end sm:content-between gap-4">
                <div className="flex flex-col gap-3">
                  <h2
                    className="text-6xl md:text-9xl font-title opacity-50"
                    data-swiper-parallax="-2000"
                  >
                    {item.title}
                  </h2>
                  <div data-swiper-parallax="-500" className="mb-2">
                    {item.creation_acf.creationTheatre &&
                      item.creation_acf.creationTheatre.map(
                        (theatre: any, index: number) => (
                          <span className="font-title" key={index}>
                            {theatre.theatre_acf.theatreName}
                          </span>
                        ),
                      )}
                  </div>
                  <div
                    className="w-full sm:w-3/12 hidden sm:block"
                    data-swiper-parallax="-1000"
                  >
                    {item.creation_acf.creationShortdescription}
                  </div>
                  <div data-swiper-parallax="-200">
                    <Link
                      href={`/creations/${item.slug}`}
                      className="inline-block font-title text-yellow-500"
                    >
                      Découvrir
                    </Link>
                  </div>
                </div>
                <div
                  data-swiper-parallax="-2000"
                  className="flex justify-between sm:items-center flex-col sm:flex-row gap-2"
                >
                  <CreationCardDate
                    dates={item.creation_acf.creationDates}
                    cssClassInProgress={
                      "font-title text-white text-3xl sm:text-4xl"
                    }
                    cssClassFinished={"font-title text-white"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress hidden sm:flex" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span className="font-title" ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
