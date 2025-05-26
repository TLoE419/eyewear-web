"use client";
import EyeglassCard from "./EyeglassCard";

const eyeglassBrands = [
  {
    image: "/Logo/RayBan.jpg",
    href: "/products?brand=rayban",
  },
  {
    image: "/Logo/LINDBERG.jpg",
    href: "/products?brand=lindberg",
  },
  {
    image: "/Logo/9999.jpg",
    href: "/products?brand=9999",
  },
  {
    image: "/Logo/BVLGARI.jpg",
    href: "/products?brand=bulgari",
  },
  {
    image: "/Logo/GUCCI.jpg",
    href: "/products?brand=gucci",
  },
  {
    image: "/Logo/MONTBLANC.jpg",
    href: "/products?brand=montblanc",
  },
];

export default function EyeglassCardGrid() {
  return (
    <section className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {eyeglassBrands.map((brand, index) => (
            <EyeglassCard key={index} image={brand.image} href={brand.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
