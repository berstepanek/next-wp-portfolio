/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error-error
import "swiper/css";
// @ts-expect-error-error
import "swiper/css/navigation";
// @ts-expect-error-error
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";

export default function SliderSwiper({ items }: { items: any }) {
  return (
    <Swiper
      speed={600}
      pagination={false}
      navigation={true}
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
      }}
      modules={[Autoplay, Parallax, Pagination, Navigation]}
    >
      {items.map((item: any, index: number) => (
        <SwiperSlide key={index} className="!p-0">
          <Image
            src={item.sourceUrl}
            alt={item.altText}
            width={400}
            height={300}
            loading="lazy"
            placeholder="empty"
            className="w-full rounded"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
