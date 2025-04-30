"use client";

import { db } from "@/lib/firebase";
import { useCart } from "@/context/cartContext";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  createdAt: Date;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">商品列表</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-lg font-bold text-rose-600">
              NT$ {product.price}
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
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              加入購物車
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
