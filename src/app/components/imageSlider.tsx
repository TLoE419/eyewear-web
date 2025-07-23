"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

export default function ImageSlider() {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none" />
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCreative]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={800}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: ["-120%", 0, -500],
            opacity: 0,
          },
          next: {
            translate: ["120%", 0, -500],
            opacity: 0,
          },
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} bg-white w-3 h-3 opacity-50 hover:opacity-100"></span>`;
          },
        }}
        navigation={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {[1, 2, 3].map((num) => (
          <SwiperSlide key={num}>
            <div className="relative w-full h-full select-none">
              <Image
                src="/main.jpg"
                alt={`Slide ${num}`}
                fill
                priority
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 pointer-events-none">
                <h1 className="text-4xl md:text-6xl lg:text-[120px] font-bold leading-none tracking-wide">
                  Sample
                </h1>
                <p className="text-lg md:text-xl tracking-[0.5em] mt-4">
                  Sample
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
