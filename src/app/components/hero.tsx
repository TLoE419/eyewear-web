"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePhotosByCategory } from "@/hooks/usePhotoManagement";
import { PhotoCategory } from "@/lib/photoManagement";
import LoadingSpinner from "./LoadingSpinner";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const { photos: heroPhotos, loading } = usePhotosByCategory(PhotoCategory.HERO);

  // 如果沒有照片，使用預設照片
  const images =
    heroPhotos.length > 0
      ? heroPhotos.map((photo) => photo.image_url)
      : ["/hero-1.jpg", "/hero-2.jpg"];

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setPrevIndex((prevIndex) => {
        const currentIndex = prevIndex === null ? index : prevIndex;
        return currentIndex;
      });
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, index]);

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black">
      {loading ? (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <LoadingSpinner size="lg" color="white" text="載入中..." />
        </div>
      ) : (
        <>
          {/* 新圖：優雅的縮放和淡入效果 */}
          <motion.div
            key={`curr-${index}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{
              scale: 1.2,
              opacity: 1,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeInOut" },
            }}
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </>
      )}

      {/* 舊圖：優雅的淡出和縮放效果 */}
      <AnimatePresence>
        {prevIndex !== null && (
          <motion.div
            key={`prev-${prevIndex}`}
            initial={{ scale: 1.2, opacity: 1, filter: "blur(0px)" }}
            animate={{
              scale: 1.25,
              opacity: 0,
              filter: "blur(8px) brightness(0.5)",
            }}
            exit={{ opacity: 0, scale: 1.25 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-10 pointer-events-none will-change-[filter,opacity,transform]"
            style={{
              backgroundImage: `url(${images[prevIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>

      {/* 文字層 */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{
          fontFamily: '"MyCalligraphy", sans-serif',
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <h1
            className="font-bold hero-text"
            style={{
              color: "rgb(38, 38, 38)",
              fontFamily: '"MyCalligraphy", sans-serif',
              lineHeight: "1.5",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              textShadow:
                "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)",
              writingMode: "vertical-rl",
              textOrientation: "upright",
            }}
          >
            　親<span className="adjust-jiu">久</span>炫<span className="adjust-mu">目</span>睛
            <br />
            寶<span className="adjust-jing">鏡</span>如明月
          </h1>
        </div>
      </div>

      {/* 底部漸層 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-black/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
