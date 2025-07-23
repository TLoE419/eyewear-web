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
    <div
      className="relative rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Link href={href} className="block">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={`${brandName} brand`}
            fill
            className="object-cover object-bottom"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 py-6 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[rgb(38,38,38)]">
            <h3 className="text-[rgb(227,208,165)] text-3xl font-semibold text-center">
              {brandName}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
