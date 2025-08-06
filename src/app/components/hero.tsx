"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/hero-1.jpg", "/hero-2.jpg"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative w-full h-[800px] overflow-hidden bg-black">
      {/* 新圖：只拉近不淡入，避免亮度問題 */}
      <motion.div
        key={`curr-${index}`}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 6, ease: "easeInOut" }}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 舊圖：上層模糊淡出且保持放大比例 */}
      <AnimatePresence>
        {prevIndex !== null && (
          <motion.div
            key={`prev-${prevIndex}`}
            initial={{ filter: "blur(0px) brightness(1.05)", scale: 1.1 }}
            animate={{
              opacity: 0,
              filter: "blur(8px) brightness(1.05)",
              scale: 1.1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
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
        style={{ fontFamily: '"Microsoft JhengHei", sans-serif' }}
      >
        <div className="container mx-auto px-6">
          <div className="text-white max-w-2xl text-center">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
              清新風格，剛剛上市
            </h1>
            <p className="mb-8 text-xl drop-shadow">
              精選鏡框與鏡片，打造最適合你的眼鏡造型
            </p>
            <div className="flex gap-6 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg">
                選購女款
              </button>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg">
                選購男款
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部漸層 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
