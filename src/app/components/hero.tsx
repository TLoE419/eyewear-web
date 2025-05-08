"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
      {/* 新圖：底層淡入 */}
      <motion.div
        key={`curr-${index}`}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
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
            initial={{ opacity: 1, filter: "blur(0px)", scale: 1.1 }}
            animate={{ opacity: 0, filter: "blur(8px)", scale: 1.1 }}
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
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              清新風格，剛剛上市
            </h1>
            <p className="mb-6 text-lg drop-shadow">
              精選鏡框與鏡片，打造最適合你的眼鏡造型
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                選購女款
              </button>
              <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                選購男款
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
