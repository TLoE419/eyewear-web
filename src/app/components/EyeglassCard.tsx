"use client";
import Image from "next/image";
import Link from "next/link";

interface EyeglassCardProps {
  image: string;
  href?: string;
}

export default function EyeglassCard({
  image,
  href = "/products",
}: EyeglassCardProps) {
  return (
    <div
      className="relative rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Link href={href} className="block">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt="Eyeglass brand"
            fill
            className="object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
    </div>
  );
}
