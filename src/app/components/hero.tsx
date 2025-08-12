"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const images = ["/hero-1.jpg", "/hero-2.jpg"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative w-full h-[800px] overflow-hidden bg-black">
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
        style={{ fontFamily: '"Microsoft JhengHei", sans-serif' }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-center">
            <h1
              className="text-5xl font-bold mb-6"
              style={{
                color: "rgb(38, 38, 38)",
                textShadow:
                  "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)",
              }}
            >
              清新風格，剛剛上市
            </h1>
            <p
              className="mb-8 text-xl"
              style={{
                color: "rgb(38, 38, 38)",
                textShadow:
                  "0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.6), 0 0 24px rgba(255,255,255,0.4)",
              }}
            >
              精選鏡框與鏡片，打造最適合你的眼鏡造型
            </p>
            <div className="flex gap-6 justify-center">
              <button
                className="px-8 py-3 rounded-lg transition text-lg transform active:scale-95"
                style={{
                  backgroundColor: "rgb(38, 38, 38)",
                  color: "rgb(227, 208, 165)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(48, 48, 48)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(38, 38, 38)")
                }
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => router.push("/products")}
              >
                選購鏡框
              </button>
              <button
                className="px-8 py-3 rounded-lg transition text-lg transform active:scale-95"
                style={{
                  backgroundColor: "rgb(38, 38, 38)",
                  color: "rgb(227, 208, 165)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(48, 48, 48)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(38, 38, 38)")
                }
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => router.push("/lenses")}
              >
                選購鏡片
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
