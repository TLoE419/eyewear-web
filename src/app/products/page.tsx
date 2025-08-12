"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
};

const brandCategories = [
  "Ray-Ban",
  "LINDBERG",
  "9999",
  "BVLGARI",
  "GUCCI",
  "MONTBLANC",
  "CLASSICO",
  "SILHOUETTE",
  "GIORGIO ARMANI",
  "CHLOÉ",
  "COACH",
  "SALVATORE FERRAGAMO",
  "AGNÈS B",
  "BROOKLYN",
  "DONNI EYE",
  "FRANK CUSTOM",
  "P+US",
  "TALOR WITH RESPECT",
  "PROJEKT PRODUKT",
  "SIBAO",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { addToCart } = useCart();

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

    setFilteredProducts(filtered);
  }, [products, selectedBrands]);

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
            {/* Brand Filter */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-[rgb(136,99,64)]">
                品牌篩選
              </h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.brand}
                    </p>

                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: 0,
                          image: product.image,
                          quantity: 1,
                          brand: product.brand,
                        })
                      }
                      className="w-full bg-[rgb(136,99,64)] text-white py-2 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors"
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
