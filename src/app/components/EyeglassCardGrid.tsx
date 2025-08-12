"use client";
import EyeglassCard from "./EyeglassCard";

const baseBrandLogos = [
  {
    image: "/Logo/rayban.jpg",
    href: "/products?brand=Ray-Ban",
    brandName: "Ray-Ban",
  },
  {
    image: "/Logo/lindberg.jpg",
    href: "/products?brand=LINDBERG",
    brandName: "LINDBERG",
  },
  {
    image: "/Logo/9999.jpg",
    href: "/products?brand=9999",
    brandName: "9999",
  },
  {
    image: "/Logo/bvlgari.jpg",
    href: "/products?brand=BVLGARI",
    brandName: "BVLGARI",
  },
  {
    image: "/Logo/gucci.jpg",
    href: "/products?brand=GUCCI",
    brandName: "GUCCI",
  },
  {
    image: "/Logo/montblanc.jpg",
    href: "/products?brand=MONTBLANC",
    brandName: "MONTBLANC",
  },
  {
    image: "/Logo/Agnès B.jpg",
    href: "/products?brand=AgnesB",
    brandName: "Agnès B",
  },
  {
    image: "/Logo/Brooklyn.jpg",
    href: "/products?brand=Brooklyn",
    brandName: "Brooklyn",
  },
  {
    image: "/Logo/Chloé.jpg",
    href: "/products?brand=Chloe",
    brandName: "Chloé",
  },
  {
    image: "/Logo/Coach.jpg",
    href: "/products?brand=Coach",
    brandName: "Coach",
  },
  {
    image: "/Logo/DonniEYE.jpg",
    href: "/products?brand=DonniEYE",
    brandName: "DonniEYE",
  },
  {
    image: "/Logo/Frank Custom.jpg",
    href: "/products?brand=FrankCustom",
    brandName: "Frank Custom",
  },
  {
    image: "/Logo/Giorgio Armani.jpg",
    href: "/products?brand=GiorgioArmani",
    brandName: "Giorgio Armani",
  },
  {
    image: "/Logo/P+US.jpg",
    href: "/products?brand=PUS",
    brandName: "P+US",
  },
  {
    image: "/Logo/Salvatore Ferragamo.jpg",
    href: "/products?brand=SalvatoreFerragamo",
    brandName: "Salvatore Ferragamo",
  },
  {
    image: "/Logo/Silhouette.jpg",
    href: "/products?brand=Silhouette",
    brandName: "Silhouette",
  },
  {
    image: "/Logo/classico.jpg",
    href: "/products?brand=Classico",
    brandName: "Classico",
  },
  {
    image: "/Logo/projekt_produkt.jpg",
    href: "/products?brand=ProjektProdukt",
    brandName: "Projekt Produkt",
  },
  {
    image: "/Logo/talor_with_respect.jpg",
    href: "/products?brand=TalorWithRespect",
    brandName: "Talor with Respect",
  },
];

// Ensure exactly 20 items (5 x 4). Repeat logos if fewer available.
const eyeglassBrands = Array.from(
  { length: 20 },
  (_, index) => baseBrandLogos[index % baseBrandLogos.length]
);

export default function EyeglassCardGrid() {
  return (
    <section className="w-full py-12 px-4 bg-[rgb(231,229,218)]">
      <div className="max-w-7xl mx-auto">
        {/* 品牌標題 */}
        <div className="relative py-8 text-center mb-12">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-playfair mb-2 tracking-wider text-gray-800 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
              品牌系列
            </h2>
            <h3 className="text-2xl md:text-3xl font-playfair text-gray-600 tracking-widest drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
              BRANDS
            </h3>
            <div className="w-24 h-1 bg-gray-400 mx-auto mt-4" />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
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
