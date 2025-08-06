"use client";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2x1 font-bold mb-4">購物車</h1>
      {cart.length === 0 ? (
        <p>
          購物車是空的，
          <Link href="/products" className="text-blue-600">
            去逛逛商品
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-4 rounded flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>數量: {item.quantity}</p>
                  <p>價格: NT$ {item.price}</p>
                  <button
                    className="text-sm text-red-500 mt-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    移除
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-lg">總計: NT$ {total}</p>
          <button
            onClick={clearCart}
            className="mt-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            清空購物車
          </button>
        </>
      )}
    </div>
  );
}
