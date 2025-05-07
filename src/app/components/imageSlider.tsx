"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function ImageSlider() {
  return (
    <div className="w-[1400px] mx-auto overflow-hidden rounded-xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="w-full h-[800px]" // ← 調整這裡的高度
      >
        <SwiperSlide>
          <Image src="/main.jpg" alt="Slide 1" fill className="object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/main.jpg" alt="Slide 2" fill className="object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/main.jpg" alt="Slide 3" fill className="object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
