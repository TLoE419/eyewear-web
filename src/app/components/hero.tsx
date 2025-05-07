"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "800px" }}
    >
      {/* 背景圖片 */}
      <Image
        src="/hero.png"
        alt="眼鏡背景"
        fill
        priority
        className="object-cover w-full"
        style={{
          objectPosition: "center 20%", // ✅ 往上切掉圖片上方部分（你可以改這個數字）
        }}
      />

      {/* 文字區塊 */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold mb-4">清新風格，剛剛上市</h1>
            <p className="mb-6">精選鏡框與鏡片，打造最適合你的眼鏡造型</p>
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
