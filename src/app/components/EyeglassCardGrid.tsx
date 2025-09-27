"use client";
import EyeglassCard from "./EyeglassCard";
import { usePhotosByCategory } from "@/hooks/usePhotoManagement";
import { PhotoCategory } from "@/lib/photoManagement";

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
    image: "/Logo/AgnesB.jpg",
    href: "/products?brand=AgnesB",
    brandName: "Agnès B",
  },
  {
    image: "/Logo/Brooklyn.jpg",
    href: "/products?brand=Brooklyn",
    brandName: "Brooklyn",
  },
  {
    image: "/Logo/Chloe.jpg",
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
  {
    image: "/Logo/YSL.png",
    href: "/products?brand=YSL",
    brandName: "YSL",
  },
];

export default function EyeglassCardGrid() {
  const { photos: brandPhotos } = usePhotosByCategory(PhotoCategory.BRAND_LOGO);

  // 預設品牌陣列（避免每次渲染重新創建）
  const defaultBrands = Array.from(
    { length: 20 },
    (_, index) => baseBrandLogos[index % baseBrandLogos.length]
  );

  // 如果沒有照片，使用預設照片
  const eyeglassBrands =
    brandPhotos.length > 0
      ? brandPhotos.map((photo) => ({
          image: photo.image_url,
          href: `/products?brand=${photo.文字欄1}`,
          brandName: photo.文字欄1 || "品牌",
        }))
      : defaultBrands;

  return (
    <section className="w-full py-12 md:py-16 px-4 bg-[rgb(231,229,218)]">
      <div className="max-w-7xl mx-auto">
        {/* 品牌標題 */}
        <div className="relative py-6 md:py-8 text-center mb-8 md:mb-12">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair mb-2 tracking-wider text-[rgb(136,99,64)] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
              品牌系列
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair text-gray-600 tracking-widest drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
              BRANDS
            </h3>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gray-400 mx-auto mt-3 md:mt-4" />
          </div>
        </div>

        {/* Circular Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-4 md:gap-2 lg:gap-2 xl:gap-4">
          {eyeglassBrands.map((brand, index) => (
            <div key={index} className="flex justify-center">
              <EyeglassCard
                image={brand.image}
                href={brand.href}
                brandName={brand.brandName}
              />
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-[rgb(136,99,64)] text-sm md:text-base">
            <div className="w-8 h-px bg-[rgb(136,99,64)]"></div>
            <span className="font-medium">點擊品牌探索更多</span>
            <div className="w-8 h-px bg-[rgb(136,99,64)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
