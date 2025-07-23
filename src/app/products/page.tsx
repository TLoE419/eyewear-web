"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
};

const priceRanges = [
  { min: 0, max: 5000, label: "NT$ 0 - 5,000" },
  { min: 5000, max: 10000, label: "NT$ 5,000 - 10,000" },
  { min: 10000, max: 15000, label: "NT$ 10,000 - 15,000" },
  { min: 15000, max: Infinity, label: "NT$ 15,000+" },
];

const brandCategories = [
  "Ray-Ban",
  "LINDBERG",
  "9999",
  "BVLGARI",
  "GUCCI",
  "MONTBLANC",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0, 20000,
  ]);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProducts(productsData as Product[]);
    setFilteredProducts(productsData as Product[]);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1]
    );

    setFilteredProducts(filtered);
  }, [products, selectedBrands, selectedPriceRange]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-[rgb(136,99,64)]">
                品牌篩選
              </h2>
              <div className="space-y-2">
                {brandCategories.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[rgb(136,99,64)]">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-[rgb(136,99,64)]">
                價格範圍
              </h2>
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    min={0}
                    max={20000}
                    step={1000}
                    value={selectedPriceRange}
                    onValueChange={setSelectedPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>NT$ {selectedPriceRange[0]}</span>
                  <span>NT$ {selectedPriceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[rgb(136,99,64)]">
                商品列表
              </h1>
              <p className="text-[rgb(136,99,64)] mt-1">
                共 {filteredProducts.length} 個商品
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{product.brand}</p>
                    <p className="text-lg font-bold text-rose-600 mt-2">
                      NT$ {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                        })
                      }
                      className="mt-3 w-full bg-[rgb(136,99,64)] text-white py-2 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
