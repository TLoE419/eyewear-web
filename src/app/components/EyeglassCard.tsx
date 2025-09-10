"use client";
import Image from "next/image";
import Link from "next/link";

interface EyeglassCardProps {
  image: string;
  href?: string;
  brandName: string;
}

export default function EyeglassCard({
  image,
  href = "/products",
  brandName,
}: EyeglassCardProps) {
  return (
    <div className="group relative">
      <Link href={href} className="block">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-[rgb(136,99,64)] overflow-hidden">
          <Image
            src={image}
            alt={`${brandName} brand`}
            fill
            className="object-contain p-3 md:p-4 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 20vw"
          />
          {/* Hover overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(136,99,64)]/0 to-[rgb(136,99,64)]/0 group-hover:from-[rgb(136,99,64)]/10 group-hover:to-[rgb(136,99,64)]/20 transition-all duration-300 rounded-full" />

          {/* Brand name tooltip on hover */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[rgb(136,99,64)] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
              {brandName}
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[rgb(136,99,64)] mx-auto"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
