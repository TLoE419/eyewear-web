"use client";

export default function News() {
  return (
    <div className="relative py-8 text-center min-h-[300px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-white/50 to-black/0" />
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-playfair mb-2 tracking-wider text-gray-800 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] mt-20">
          最新消息
        </h2>
        <h3 className="text-2xl md:text-3xl font-playfair text-gray-600 tracking-widest drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
          NEWS
        </h3>
        <div className="w-24 h-1 bg-gray-400 mx-auto mt-4" />
      </div>
    </div>
  );
}
