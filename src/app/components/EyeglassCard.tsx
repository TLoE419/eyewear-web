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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link href={href} className="block">
        <div className="relative w-full h-48 bg-white">
          <Image
            src={image}
            alt={`${brandName} brand`}
            fill
            className="object-contain p-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
    </div>
  );
}
