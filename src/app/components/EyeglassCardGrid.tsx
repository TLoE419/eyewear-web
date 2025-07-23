"use client";
import EyeglassCard from "./EyeglassCard";

const eyeglassBrands = [
  {
    image: "/Ray.Ban/RayBan_1.jpg",
    href: "/products?brand=rayban",
    brandName: "Ray-Ban",
  },
  {
    image: "/LINDBERG/Lindberg_1.jpg",
    href: "/products?brand=lindberg",
    brandName: "Lindberg",
  },
  {
    image: "/999.9/999.9_1.jpg",
    href: "/products?brand=9999",
    brandName: "999.9",
  },
  {
    image: "/Test_1.jpg",
    href: "/products?brand=bulgari",
    brandName: "Bvlgari",
  },
  {
    image: "/Test_2.jpg",
    href: "/products?brand=gucci",
    brandName: "Gucci",
  },
  {
    image: "/Test_3.jpg",
    href: "/products?brand=montblanc",
    brandName: "Montblanc",
  },
];

export default function EyeglassCardGrid() {
  return (
    <section className="w-full py-12 px-4 bg-[rgb(231,229,218)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {eyeglassBrands.map((brand, index) => (
            <EyeglassCard
              key={index}
              image={brand.image}
              href={brand.href}
              brandName={brand.brandName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
